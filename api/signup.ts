import type { IncomingMessage, ServerResponse } from "http";
import { submitToCRM } from "./lib/crm";
import { getUsers, saveUsers, User } from "./lib/blobDb";

async function parseJsonBody(req: IncomingMessage): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const body = await parseJsonBody(req);
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Name, email, and phone are required" }));
      return;
    }

    // 1. Submit to CRM first
    try {
      await submitToCRM({
        name,
        email,
        phone,
        description: "Signup Lead",
        outlineYourCase: "Signup Lead",
      });
    } catch (crmError) {
      const errMsg = (crmError as Error).message || "";
      if (errMsg.toLowerCase().includes("already exist")) {
        console.warn("CRM lead already exists, continuing with signup flow:", crmError);
      } else {
        console.error("CRM Submission failed during signup:", crmError);
        throw new Error(`CRM Submission failed: ${errMsg}`);
      }
    }

    // 2. Continue with Blob / Vercel Signup Flow
    const users = await getUsers();
    const existingUserIndex = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());

    const updatedUser: User = {
      email: email.toLowerCase(),
      name: name,
      phone: phone, // Signup should store the updated phone number entered by the user
      createdAt:
        existingUserIndex >= 0 ? users[existingUserIndex].createdAt : new Date().toISOString(),
    };

    if (existingUserIndex >= 0) {
      // User exists, update details (only store the updated phone number entered by the user / updating details)
      users[existingUserIndex] = updatedUser;
    } else {
      // New user
      users.push(updatedUser);
    }

    await saveUsers(users);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: true, user: updatedUser }));
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Signup failed:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: err.message || "Internal server error" }));
  }
}

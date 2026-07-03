
export function formatSwissPhone(phoneInput: string): string {
  let phone = (phoneInput || "").replace(/[^\d+]/g, "").trim();

  if (phone) {
    if (phone.startsWith("+")) {
      phone = "00" + phone.slice(1);
    }

    if (phone.startsWith("41") && !phone.startsWith("0041")) {
      phone = "00" + phone;
    }

    if (phone.startsWith("0") && !phone.startsWith("00")) {
      phone = "0041" + phone.slice(1);
    }

    if (!phone.startsWith("0041") && !phone.startsWith("00")) {
      phone = "0041" + phone;
    }
  } else {
    phone = "0000000000";
  }

  return phone;
}

export function parseName(fullName: string): { first_name: string; last_name: string } {
  const [first_name, ...lastNameParts] = (fullName || "Unknown").trim().split(" ");
  const last_name = lastNameParts.join(" ") || "Lead";
  return { first_name, last_name };
}

export interface CRMLeadData {
  name: string;
  email: string;
  phone: string;
  description: string;
  outlineYourCase?: string;
}

export async function submitToCRM(leadData: CRMLeadData) {
  const crmEndpoint =
    process.env.CRM_ENDPOINT || "https://inwo.crmcore.me/api/lead_management/api/affiliates";
  const crmToken = process.env.CRM_TOKEN || "AFF_1_92cbc1bc76284e19b711bab22587d75f";

  const { first_name, last_name } = parseName(leadData.name);
  const formattedPhone = formatSwissPhone(leadData.phone);

  const payload = {
    country_name: "ch",
    description: leadData.description,
    phone: formattedPhone,
    email: leadData.email,
    first_name: first_name,
    last_name: last_name,
    custom_fields: {
      Source_ID: "website",
      How_Much_Invested: "0",
      Outline_Your_Case: leadData.outlineYourCase || "",
    },
  };

  const response = await fetch(crmEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${crmToken}`,
      "x-token": crmToken, // Just in case CRM token is checked as custom header too
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`CRM API request failed: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

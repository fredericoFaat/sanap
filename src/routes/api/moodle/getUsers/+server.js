// @ts-nocheck
import { MOODLE_BASE_URL, WSTOKEN_MOODLE, PROXY_AGENT } from "$env/static/private"
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { error, json } from "@sveltejs/kit"

export const POST = async ({ request }) => {
  const proxyAgent = new HttpsProxyAgent(PROXY_AGENT);
  const { key, value } = await request.json()
  const formData = new FormData();
  formData.append("wstoken", WSTOKEN_MOODLE);
  formData.append("wsfunction", "core_user_get_users");
  formData.append("moodlewsrestformat", "json");
  formData.append("criteria[0][key]", key);
  formData.append("criteria[0][value]", value);
  const response = await fetch(MOODLE_BASE_URL, {
    method: "POST",
    body: formData,
    // agent: proxyAgent  
  

  })
  if (response.ok) {
    const responseJSON = await response.json()
    return json(responseJSON)
  }
  throw error(response.error.status, response.error.message)
}
// @ts-nocheck
import { MOODLE_BASE_URL, WSTOKEN_MOODLE, PROXY_AGENT } from "$env/static/private"
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { error, json } from "@sveltejs/kit"

export const POST = async ({ request }) => {
    const proxyAgent = new HttpsProxyAgent(PROXY_AGENT);
    const selecao = await request.json()
    const formData = new FormData();
    console.log(selecao.id)
    formData.append("wstoken", WSTOKEN_MOODLE);
    formData.append("wsfunction", "core_course_get_contents");
    formData.append("moodlewsrestformat", "json");
    formData.append("courseid", selecao.id);

    const response = await fetch(MOODLE_BASE_URL, {
        method: "POST",
        body: formData,
        // agent: proxyAgent  
  

    })
    if (response.ok) {
        let responseJSON = await response.json()
        return json(responseJSON)
    }
    throw error(response.error.status, response.error.message)
}
// @ts-nocheck
import { MOODLE_BASE_URL, WSTOKEN_MOODLE, PROXY_AGENT } from "$env/static/private"
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { error, json } from "@sveltejs/kit"

export const POST = async ({ request }) => {
    const proxyAgent = new HttpsProxyAgent(PROXY_AGENT);
    const selecao = await request.json()
    const formData = new FormData();
    formData.append("wstoken", WSTOKEN_MOODLE);
    formData.append("wsfunction", "core_competency_list_competency_frameworks");
    formData.append("moodlewsrestformat", "json");
    formData.append("context[contextid]", 0);
    formData.append("context[contextlevel]", "user");
    formData.append("context[instanceid]", 1);
    const response = await fetch(MOODLE_BASE_URL, {
        method: "POST",
        body: formData,
        // agent: proxyAgent  
  

    })
    const responseJSON = await response.json()
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message)
    }
    return json(responseJSON)
}
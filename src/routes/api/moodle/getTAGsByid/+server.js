// @ts-nocheck
import { MOODLE_BASE_URL, WSTOKEN_MOODLE, PROXY_AGENT } from "$env/static/private"
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { error, json } from "@sveltejs/kit"

export const POST = async ({ request }) => {
    const proxyAgent = new HttpsProxyAgent(PROXY_AGENT);
    const componenteSelecionado = await request.json()
    const formData = new FormData();
    formData.append("wstoken", WSTOKEN_MOODLE);
    formData.append("wsfunction", "core_tag_get_tagindex");
    formData.append("moodlewsrestformat", "json");
    formData.append("tagindex[tag]", "cp001");
    formData.append("tagindex[tc]", 1);
    formData.append("tagindex[ta]", 6);
    // formData.append("tags[0][id]", 1);
    const response = await fetch(MOODLE_BASE_URL, {
        method: "POST",
        body: formData,
        // agent: proxyAgent  
  

    })
    if (response.ok) {
        const responseJSON = await response.json()
        console.log(responseJSON)
        return json(responseJSON)
    }
    throw error(response.error.status, response.error.message)
} 

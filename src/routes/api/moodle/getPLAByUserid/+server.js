// @ts-nocheck
import { MOODLE_BASE_URL, WSTOKEN_MOODLE, PROXY_AGENT } from "$env/static/private"
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { error, json } from "@sveltejs/kit"

export const POST = async ({ request }) => {
    const usuarioSelecionado = await request.json()
    const formData = new FormData();
    formData.append("wstoken", WSTOKEN_MOODLE);
    formData.append("wsfunction", "core_competency_list_user_plans");
    formData.append("moodlewsrestformat", "json");
    formData.append("userid", usuarioSelecionado.id);
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

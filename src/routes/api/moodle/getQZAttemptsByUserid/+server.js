// @ts-nocheck
import { MOODLE_BASE_URL, WSTOKEN_MOODLE, PROXY_AGENT } from "$env/static/private"
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { error, json } from "@sveltejs/kit"

export const POST = async ({ request }) => {
    const proxyAgent = new HttpsProxyAgent(PROXY_AGENT);
    const { quizzSelecionadoID, userid } = await request.json()
    const formData = new FormData();
    formData.append("wstoken", WSTOKEN_MOODLE);
    formData.append("wsfunction", "mod_quiz_get_user_attempts");
    formData.append("moodlewsrestformat", "json");
    formData.append("quizid", quizzSelecionadoID);
    formData.append("userid", userid);
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
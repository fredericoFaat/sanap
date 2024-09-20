
// @ts-nocheck
import { MOODLE_BASE_URL, WSTOKEN_MOODLE, PROXY_AGENT } from "$env/static/private"
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { error, json } from "@sveltejs/kit"

export const POST = async ({ request }) => {
    const proxyAgent = new HttpsProxyAgent(PROXY_AGENT);
    const { user, course } = await request.json()
    console.log(user.id)
    console.log(course.id)
    const formData = new FormData();
    formData.append("wstoken", WSTOKEN_MOODLE);
    formData.append("wsfunction", "gradereport_user_get_grade_items");
    formData.append("moodlewsrestformat", "json");
    formData.append("courseid", course.id);
    formData.append("userid", user.id);
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

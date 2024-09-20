// @ts-nocheck
import { error, json } from "@sveltejs/kit"

export const POST = async ({ fetch, request }) => {
    const dataAI = await request.json()
    const response = await fetch('http://127.0.0.1:3000/ai', {
        method: "POST",
        headers:{
            'Content-type':'application/json', 
        },
        body: JSON.stringify({'dataAI': dataAI}),
    })
    if (response.ok) {
        const responseJSON = await response.json()
        return json(responseJSON)
    }
    throw error(response.error.status, response.error.message)
}
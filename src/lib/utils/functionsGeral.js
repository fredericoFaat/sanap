export async function getFuncoesCognitivas() {
        const response = await fetch('/api/moodle/getFuncoesCognitivas');
        const responseJSON = await response.json();
        if (responseJSON.error) {
            throw error(responseJSON.error.status, responseJSON.error.message);
        }    
    return responseJSON;
};


function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export async function getTAGsByid(selecao) {
    let respostaFRDPs = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getTAGsByid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selecao[i])
        });
        const responseJSON = await response.json();
        if (responseJSON.error) {
            throw error(responseJSON.error.status, responseJSON.error.message);
        }
        respostaFRDPs = [...respostaFRDPs, responseJSON.posts]
    }
    return respostaFRDPs;
};


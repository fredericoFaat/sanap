function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export async function getJournalEntryByid(selecao) {
    let respostaJNLs = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getJournalEntryByid', {
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
        respostaJNLs = [...respostaJNLs, responseJSON]
    }
    return respostaJNLs;
};


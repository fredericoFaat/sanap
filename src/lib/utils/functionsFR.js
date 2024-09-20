function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export async function getFRsByCourseid(selecao, selecaotipo) {
    let respostaFRs = [];
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getFRsByCourseid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selecao[i].id)
        });
        const responseJSON = await response.json();
        if (responseJSON.length > 0) {
            for (let x = 0; x < responseJSON.length; x++) {
                let divisao1;
                let tipo;
                let divisao2;
                let divisao3;
                let docente;
                let semestre;
                let ano;
                if (getSafe(() => responseJSON[x].name.split(':'), 'não é').length > 1) {
                    divisao1 = responseJSON[x].name.split(':');
                    tipo = divisao1[0].replace(' ', '');
                    if (tipo == selecaotipo) {
                        if (getSafe(() => divisao1[1].split('-'), 'não é').length > 1) {
                            divisao2 = divisao1[1].split('-');
                            docente = divisao2[1].replace(' ', '');
                            if (getSafe(() => divisao2[0].split('/'), 'não é').length > 1) {
                                divisao3 = divisao2[0].split('/');
                                semestre = +divisao3[0].replace(' ', '');
                                ano = +divisao3[1].replace(' ', '');
                                let obj = {
                                    cc: selecao[i].shortname,
                                    tipo,
                                    docente,
                                    semestre,
                                    ano,
                                    FR: responseJSON[x]
                                };
                                respostaFRs = [...respostaFRs, obj];
                            }
                        }
                    } else {
                        console.log('não é ' + selecaotipo);
                    }
                }
            }
        }
        if (responseJSON.error) {
            throw error(responseJSON.error.status, responseJSON.error.message);
        }
    }
    return respostaFRs;
}

export async function getFRDsByFRid(selecao) {
    let respostaFRDs = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getFRDsByFRid', {
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
        respostaFRDs = [...respostaFRDs, responseJSON.discussions]
    }
    return respostaFRDs;
};


export async function getFRDPsByFRDid(selecao) {
    let respostaFRDPs = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getFRDPsByFRDid', {
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

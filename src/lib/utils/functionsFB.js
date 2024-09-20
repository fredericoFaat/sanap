function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}
export async function getFBsByCourseid(selecao, selecaotipo) {
    let FBs = [];
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getFBsByCourseid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selecao[i].id)
        });
        const responseJSON = await response.json();
        if (responseJSON.feedbacks.length > 0) {
            for (let x = 0; x < responseJSON.feedbacks.length; x++) {
                let divisao1;
                let tipo;
                let divisao2;
                let divisao3;
                let docente;
                let semestre;
                let ano;
                if (getSafe(() => responseJSON.feedbacks[x].name.split(':'), 'não é').length > 1) {
                    divisao1 = responseJSON.feedbacks[x].name.split(':');
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
                                    FB: responseJSON.feedbacks[x]
                                };
                                FBs = [...FBs, obj];
                            }
                        }
                    } else { console.log('não é ' + selecaotipo) }
                }
            }
        }
        if (responseJSON.error) {
            throw error(responseJSON.error.status, responseJSON.error.message);
        }
    }
    return FBs;
};

export async function getFBAnalysisByFBid(fbSelecionado, aspFB) {
    let mediasMedAIE = [];
    let totalComentAIE = [];
    let totalResAIE = [];
    let file = [];
    let enviosColetivo = 0;
    for (let i = 0; i < fbSelecionado.length; i++) {
        const response = await fetch('/api/moodle/getFBAnalysisByFBid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fbSelecionado[i])
        });
        const responseJSON = await response.json();
        if (responseJSON.error) {
            throw error(responseJSON.error.status, responseJSON.error.message);
        }
        let totalEnviosIndividualanonimo = await responseJSON.totalanonattempts;
        let totalEnviosIndividualnominal = await responseJSON.totalattempts;
        // enviosColetivo += totalEnviosIndividualanonimo;
        let grauAspecto = [];
        let grauSeparados = [];
        let comentariosAIE = [];
        let mediasAIEIndividual = [];
        let resultadoAIEIndividual = [];
        if (totalEnviosIndividualnominal > 0) {
            for (let i = 0; i < totalEnviosIndividualnominal; i++) {
                grauAspecto = [];
                for (let x = 0; x < aspFB.length; x++) {
                    grauAspecto = [...grauAspecto, responseJSON.attempts[i].responses[x].rawval];
                }
                grauSeparados = [...grauSeparados, grauAspecto];
            }
        }
        else if (totalEnviosIndividualanonimo > 0) {
            for (let i = 0; i < totalEnviosIndividualanonimo; i++) {
                grauAspecto = [];
                for (let x = 0; x < aspFB.length; x++) {
                    grauAspecto = [...grauAspecto, responseJSON.anonattempts[i].responses[x].rawval];
                }
                grauSeparados = [...grauSeparados, grauAspecto];
            }
            let somaInd = [];
            aspFB.forEach(() => {
                somaInd.push(0);
            });
            for (let i = 0; i < grauSeparados.length; i++) {
                let jsonFile = {};
                for (let x = 0; x < grauSeparados[i].length; x++) {
                    somaInd[x] = somaInd[x] + +grauSeparados[i][x];
                    jsonFile[aspFB[x]] = grauSeparados[i][x].toString();
                    if (x == grauSeparados[i].length - 1) {

                        comentariosAIE = [...comentariosAIE, grauSeparados[i][x]];
                    }
                }
                file = [...file, jsonFile];
            }

            function media(item, index, arr) {
                arr[index] = +(item / totalEnviosIndividualanonimo).toFixed(2);
            }
            somaInd.forEach(media);
            mediasAIEIndividual = somaInd;
            resultadoAIEIndividual = [];
            for (let i = 0; i < mediasAIEIndividual.length; i++) {
                let resultado = {
                    aspecto: aspFB[i],
                    valor: mediasAIEIndividual[i]
                };
                resultadoAIEIndividual = [...resultadoAIEIndividual, resultado];
            }
        } else {
            alert('Nenhuma avaliação realizada');
            mediasAIEIndividual = [];
            resultadoAIEIndividual = [];
            comentariosAIE = [];
        }
        totalResAIE = [...totalResAIE, resultadoAIEIndividual];
        mediasMedAIE = [...mediasMedAIE, mediasAIEIndividual];
        totalComentAIE = [...totalComentAIE, comentariosAIE];
    }
    let obj = [
        {
            totalResAIE,
            mediasMedAIE,
            totalComentAIE
        }
    ];
    return { obj, file };
};

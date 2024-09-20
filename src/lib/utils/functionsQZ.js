import { getCompsByField } from '$utils/functionsComp.js';

function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export async function getQZsByCourseid(selecao, tipoSelecao) {
    let QZsRes = []
    for (let w = 0; w < selecao.length; w++) {
        const response = await fetch('/api/moodle/getQZsByCourseid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selecao[w].id)
        });
        const responseJSON = await response.json();
        if (responseJSON.error) {
            throw error(responseJSON.error.status, responseJSON.error.message);
        }
        if (responseJSON.quizzes.length > 0) {
            for (let x = 0; x < responseJSON.quizzes.length; x++) {
                let divisao1 = ''
                let tipo = ''
                let divisao2 = ''
                let divisao3 = ''
                let docente = ''
                let semestre = ''
                let ano = ''
                if (getSafe(() => responseJSON.quizzes[x].name.split(':'), 'não é').length > 1) {
                    divisao1 = responseJSON.quizzes[x].name.split(':');
                    tipo = divisao1[0].replace(' ', '');
                    if (tipo == tipoSelecao) {
                        if (getSafe(() => divisao1[1].split('-'), 'não é').length > 1) {
                            divisao2 = divisao1[1].split('-');
                            docente = divisao2[1].replace(' ', '');
                            if (getSafe(() => divisao2[0].split('/'), 'não é').length > 1) {
                                divisao3 = divisao2[0].split('/');
                                semestre = +divisao3[0].replace(' ', '');
                                ano = +divisao3[1].replace(' ', '');
                                let obj = { ...responseJSON }
                                obj.cc = selecao[w]
                                obj.tipo = tipo
                                obj.doc = docente
                                obj.sem = semestre
                                obj.ano = ano
                                obj.quiz = responseJSON.quizzes[x]
                                obj.count = 1
                                QZsRes = [...QZsRes, obj];
                            } else {
                                QZsRes = [{ cc: selecao[w], quiz: {}, count: 0 }]
                            }
                        } else {
                            QZsRes = [{ cc: selecao[w], quiz: {}, count: 0 }]
                        }
                    } else {
                        QZsRes = [{ cc: selecao[w], quiz: {}, count: 0 }]
                    }
                } else {
                    QZsRes = [{ cc: selecao[w], quiz: {}, count: 0 }]
                }
            }
        } else {
            QZsRes = [{ cc: selecao[w], quiz: {}, count: 0 }]
        }
    }
    return QZsRes;
}

export async function getQZAttemptsByUserid(selecao, usuarios) {
    let QZAsRes = [];
    for (let i = 0; i < selecao.length; i++) {
        for (let y = 0; y < usuarios.length; y++) {
            if (selecao[i].count > 0) {
                const response = await fetch('/api/moodle/getQZAttemptsByUserid', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quizzSelecionadoID: selecao[i].quiz.id, userid: usuarios[y].id })
                });
                const responseJSON = await response.json();
                if (responseJSON.error) {
                    throw error(responseJSON.error.status, responseJSON.error.message);
                }
                if (responseJSON.attempts.length > 0) {
                    let obj1 = {}
                    for (let w = 0; w < responseJSON.attempts.length; w++) {
                        obj1 = { ...responseJSON.attempts[w] }
                        obj1.quiz = selecao[i].quiz
                        obj1.user = usuarios[y]
                        obj1.count = 1
                        obj1.cc = selecao[i].cc
                    }
                    QZAsRes = [...QZAsRes, obj1];
                } else {
                    let obj1 = {}
                    obj1.quiz = selecao[i].quiz
                    obj1.user = usuarios[y]
                    obj1.count = 0
                    obj1.cc = selecao[i].cc
                    QZAsRes = [...QZAsRes, obj1];
                }
            } else {
                QZAsRes = [{ cc: selecao[i].cc, quiz: selecao[i].quiz, user: usuarios[y], count: 0 }]
            }
        }
    }
    return QZAsRes;
}

export async function getQZAttemptData(selecao) {
    // let QZADs = []
    // let questoesTodasRes = []
    // let questoesNum = []
    // let numeroQuestoesRes = []
    // let questoesAnalisesRes = []
    let questoesAnalisesRes = []
    // let soma1 = 0
    // let arr1 = []
    let arr11 = []

    // let porcentagemRes = []
    // let obj2 = {}
    // let usersIDRes = []
    // let userQuestoes = []

    // console.log(selecao)
    for (let i = 0; i < selecao.length; i++) {
        if (selecao[i].count > 0) {
            arr11 = []
            const response = await fetch('/api/moodle/getQZAttemptData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ attemptID: selecao[i].id })
            });
            const responseJSON = await response.json();
            if (responseJSON.error) {
                throw error(responseJSON.error.status, responseJSON.error.message);
            }
            let obj1 = { ...responseJSON }
            obj1.quiz = selecao[i].quiz
            obj1.user = selecao[i].user
            for (let z = 0; z < obj1.questions.length; z++) {
                let docHTML = document.createElement('html');
                docHTML.innerHTML = obj1.questions[z].html;
                let contsHTML = docHTML.querySelector('p').innerHTML
                let conts = contsHTML.split(',')
                let conteudos = []
                for (let w = 0; w < conts.length; w++) {
                    let desc = await getCompsByField('idnumber', conts[w])
                    let conteudo = desc[0]
                    let clean1 = conteudo.description.replace('<p>', '')
                    let clean2 = clean1.replace('</p>', '')
                    let split1 = clean2.split('|')
                    let competencias = split1[0].replace('[', '').replace(']', '').replace(' ', '').replace(' ', '').split(',')
                    let atitudes = split1[1].replace('[', '').replace(']', '').replace(' ', '').replace(' ', '').split(',')
                    let funcoescognitivas = split1[2].replace('[', '').replace(']', '').replace(' ', '').replace(' ', '').split(',')
                    let tipoconteudo = split1[3].replace('[', '').replace(']', '').replace(' ', '').replace(' ', '')

                    let obj2 = { ...conteudo }
                    obj2.competencias = competencias
                    obj2.atitudes = atitudes
                    obj2.funcoescognitivas = funcoescognitivas
                    obj2.tipoconteudo = tipoconteudo
                    obj2.question = obj1.questions[z]
                    obj2.quiz = obj1.quiz
                    obj2.user = obj1.user
                    obj2.cc = selecao[i].cc
                    obj2.mark = +obj1.questions[z].mark.replace(',', '.')
                    conteudos = [...conteudos, obj2]
                }
                let contsHTML3 = docHTML.getElementsByClassName('qtext');
                let arr3 = []
                let contsHTML2 = contsHTML3[0].getElementsByTagName('p');
                for (let y = 1; y < contsHTML2.length; y++) {
                    arr3 = [...arr3, contsHTML2[y].innerText]
                }
                let texto = arr3.join('\n')
                let obj = {
                    html: obj1.questions[z].html,
                    textoQuestao: texto,
                    slot: obj1.questions[z].slot,
                    status: obj1.questions[z].status,
                    mark: +obj1.questions[z].mark.replace(',', '.'),
                    conteudos: conteudos,
                    question: obj1.questions[z]
                }
                arr11 = [...arr11, obj]
            }
            obj1.questions = arr11
            obj1.cc = selecao[i].cc
            obj1.count = 1
            questoesAnalisesRes = [...questoesAnalisesRes, obj1]
        } else {
            questoesAnalisesRes = [{ cc: selecao[i].cc, count: 0 }]
        }

    }
    // questoesTodasRes.forEach(e => {
    //     questoesNum = [...questoesNum, e.slot]
    // });

    // questoesTodasRes.forEach(e => {
    //     userQuestoes = [...userQuestoes, (e.userid)
    //         // .toString()
    //     ]
    // });

    // numeroQuestoesRes = [...new Set(questoesNum)];
    // usersIDRes = [...new Set(userQuestoes)];

    // for (let i = 0; i < numeroQuestoesRes.length; i++) {
    //     arr1 = []
    //     for (let x = 0; x < questoesTodasRes.length; x++) {
    //         if (questoesTodasRes[x].slot == numeroQuestoesRes[i]) {
    //             let docHTML = document.createElement('html');
    //             docHTML.innerHTML = questoesTodasRes[x].html;
    //             let contsHTML = docHTML.querySelector('p').innerHTML
    //             let conts = contsHTML.split(',')
    //             let conteudos = []
    //             for (let w = 0; w < conts.length; w++) {
    //                 let desc = await getCompsByField('id', conts[w])
    //                 conteudos = [...conteudos, desc[0]]
    //             }
    //             let contsHTML3 = docHTML.getElementsByClassName('qtext');
    //             let arr3 = []
    //             let contsHTML2 = contsHTML3[0].getElementsByTagName('p');
    //             for (let i = 1; i < contsHTML2.length; i++) {
    //                 arr3 = [...arr3, contsHTML2[i].innerText]
    //             }
    //             let texto = arr3.join('\n')
    //             let obj = {
    //                 userID: questoesTodasRes[x].userid,
    //                 html: questoesTodasRes[x].html,
    //                 textoQuestao: texto,
    //                 slot: questoesTodasRes[x].slot,
    //                 status: questoesTodasRes[x].status,
    //                 mark: questoesTodasRes[x].mark,
    //                 conteudos: conteudos
    //             }
    //             arr1 = [...arr1, obj]
    //         }
    //     }
    //     questoesAnalisesRes = [...questoesAnalisesRes, arr1]
    // }

    // for (let i = 0; i < questoesAnalisesRes.length; i++) {
    //     soma1 = 0
    //     for (let x = 0; x < questoesAnalisesRes[i].length; x++) {
    //         let hlp = questoesAnalisesRes[i][x].mark.replace(',', '.');
    //         soma1 = soma1 + +hlp
    //     }
    //     obj2 = {
    //         porcentagem: (((soma1) * 100) / questoesAnalisesRes.length - 1).toFixed(2)
    //     }
    //     porcentagemRes = [...porcentagemRes, obj2]
    // }
    // for (let i = 0; i < porcentagemRes.length; i++) {
    //     porcentagemRes[i].slot = numeroQuestoesRes[i]
    // }
    return questoesAnalisesRes
    // return { QZADs, questoesTodasRes, questoesAnalisesRes, porcentagemRes, numeroQuestoesRes, usersIDRes };
}

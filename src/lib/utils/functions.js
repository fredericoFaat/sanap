// function getSafe(fn, defaultVal) {
//     try {
//         return fn();
//     } catch (e) {
//         return defaultVal;
//     }
// }

// export async function getCategories() {
//     const response = await fetch('/api/moodle/getCategories');
//     const responseJSON = await response.json();
//     if (responseJSON.error) {
//         throw error(responseJSON.error.status, responseJSON.error.message);
//     }
//     return responseJSON;
// };


// export async function getUsers() {
//     const response = await fetch('/api/moodle/getUsers');
//     const responseJSON = await response.json();
//     if (responseJSON.error) {
//         throw error(responseJSON.error.status, responseJSON.error.message);
//     }
//     return responseJSON.users;
// };

// export async function getUsersByCourseid(selecao) {
//     let usersBID = []
//     let arr1 = []
//     for (let i = 0; i < selecao.length; i++) {
//         const response = await fetch('/api/moodle/getUsersByCourseid', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(selecao[i])
//         });
//         const responseJSON = await response.json();
//         if (responseJSON.error) {
//             throw error(responseJSON.error.status, responseJSON.error.message);
//         }
//         arr1 = [...arr1, ...responseJSON];
//     }
//     usersBID = arr1.filter(
//         (user, index) => index === arr1.findIndex(
//             other => user.id === other.id
//         ));
//     return usersBID;
// };

// export async function getCoursesByField(categoriaSelecionada, field) {
//     const response = await fetch('/api/moodle/getCoursesByField', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ categoriaSelecionada, field })
//     });
//     const responseJSON = await response.json();
//     if (responseJSON.error) {
//         throw error(responseJSON.error.status, responseJSON.error.message);
//     }
//     return responseJSON.courses;
// };

// export async function getCoursesByUserid(usuarioSelecionado) {
//     const response = await fetch('/api/moodle/getCoursesByUserid', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(usuarioSelecionado)
//     });
//     const responseJSON = await response.json();
//     if (responseJSON.error) {
//         throw error(responseJSON.error.status, responseJSON.error.message);
//     }
//     return responseJSON;
// };

// export async function getFRDsByFRid(selecao) {
//     let respostaFRDs = []
//     for (let i = 0; i < selecao.length; i++) {
//         const response = await fetch('/api/moodle/getFRDsByFRid', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(selecao[i])
//         });
//         const responseJSON = await response.json();

//         if (responseJSON.error) {
//             throw error(responseJSON.error.status, responseJSON.error.message);
//         }
//         respostaFRDs = [...respostaFRDs, responseJSON.discussions]
//     }
//     return respostaFRDs;
// };


// export async function getQZsByCourseid(selecao, tipoSelecao) {
//     let QZs = [];
//     for (let i = 0; i < selecao.length; i++) {
//         const response = await fetch('/api/moodle/getQZsByCourseid', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(selecao[i].id)
//         });
//         const responseJSON = await response.json();
//         if (responseJSON.quizzes.length > 0) {
//             for (let x = 0; x < responseJSON.quizzes.length; x++) {
//                 let divisao1;
//                 let tipo;
//                 let divisao2;
//                 let divisao3;
//                 let docente;
//                 let semestre;
//                 let ano;
//                 if (getSafe(() => responseJSON.quizzes[x].name.split(':'), 'não é').length > 1) {
//                     divisao1 = responseJSON.quizzes[x].name.split(':');
//                     tipo = divisao1[0].replace(' ', '');
//                     if (tipo == tipoSelecao) {
//                         if (getSafe(() => divisao1[1].split('-'), 'não é').length > 1) {
//                             divisao2 = divisao1[1].split('-');
//                             docente = divisao2[1].replace(' ', '');
//                             if (getSafe(() => divisao2[0].split('/'), 'não é').length > 1) {
//                                 divisao3 = divisao2[0].split('/');
//                                 semestre = +divisao3[0].replace(' ', '');
//                                 ano = +divisao3[1].replace(' ', '');
//                                 let obj = {
//                                     cc: selecao[i].shortname,
//                                     tipo,
//                                     docente,
//                                     semestre,
//                                     ano,
//                                     id: selecao[i].id,
//                                     QZ: responseJSON.quizzes[x]
//                                 };
//                                 QZs = [...QZs, obj];
//                             }
//                         }
//                     } else {
//                         console.log('não é Prova');
//                     }
//                 }
//             }
//         }
//         if (responseJSON.error) {
//             throw error(responseJSON.error.status, responseJSON.error.message);
//         }
//     }
//     return QZs;
// }

// export async function getQZAttemptsByUserid(selecao, usuarios) {
//     let QZAs = [];
//     for (let y = 0; y < selecao.length; y++) {
//         for (let i = 0; i < usuarios.length; i++) {
//             const response = await fetch('/api/moodle/getQZAttemptsByUserid', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ quizzSelecionadoID: selecao[y].QZ.id, userid: usuarios[i].id })
//             });
//             const responseJSON = await response.json();
//             if (responseJSON.error) {
//                 throw error(responseJSON.error.status, responseJSON.error.message);
//             }
//             if (responseJSON.attempts.length > 0) {
//                 QZAs = [...QZAs, responseJSON.attempts];

//             }
//         }
//     }
//     return QZAs;
// }

// export async function getQZAttemptData(selecao) {
//     let QZADs = []
//     let questoesTodasRes = []
//     let questoes = []
//     let numeroQuestoesRes = []
//     let questoesAnalisesRes = []
//     for (let i = 0; i < selecao.length; i++) {
//         for (let x = 0; x < selecao[i].length; x++) {
//             const response = await fetch('/api/moodle/getQZAttemptData', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ attemptID: selecao[i][x].id })
//             });
//             const responseJSON = await response.json();
//             if (responseJSON.error) {
//                 throw error(responseJSON.error.status, responseJSON.error.message);
//             }
//             questoesTodasRes = [...questoesTodasRes, ...responseJSON.questions]
//             QZADs = [...QZADs, responseJSON];
//         }
//     }
//     questoes = QZADs[0].questions

//     questoes.forEach(e => {
//         numeroQuestoesRes = [...numeroQuestoesRes, ...Object.values(e['questionnumber'])]
//     });
//     let soma1 = 0
//     let arr1 = []
//     for (let i = 0; i < numeroQuestoesRes.length; i++) {
//         arr1 = []
//         for (let x = 0; x < questoesTodasRes.length; x++) {
//             if (questoesTodasRes[x].questionnumber == numeroQuestoesRes[i]) {
//                 let obj = {
//                     questionnumber: questoesTodasRes[x].questionnumber,
//                     status: questoesTodasRes[x].status,
//                     mark: questoesTodasRes[x].mark
//                 }
//                 arr1 = [...arr1, obj]
//             }
//         }
//         questoesAnalisesRes = [...questoesAnalisesRes, arr1]
//     }
//     let porcentagemRes = []
//     let obj2
//     for (let i = 0; i < questoesAnalisesRes.length; i++) {
//         soma1 = 0
//         for (let x = 0; x < questoesAnalisesRes[i].length; x++) {
//             let hlp = questoesAnalisesRes[i][x].mark.replace(',', '.');
//             soma1 = soma1 + +hlp
//         }
//         obj2 = {
//             porcentagem: (((soma1) * 100) / questoesAnalisesRes.length - 1).toFixed(2)
//         }
//         porcentagemRes = [...porcentagemRes, obj2]
//     }
//     for (let i = 0; i < porcentagemRes.length; i++) {
//         porcentagemRes[i].questionnumber = numeroQuestoesRes[i]
//     }


//     return { QZADs, questoesTodasRes, questoesAnalisesRes, porcentagemRes, numeroQuestoesRes };
// }

// export async function getFBsByCourseid(selecao, selecaotipo) {
//     let FBs = [];
//     for (let i = 0; i < selecao.length; i++) {
//         const response = await fetch('/api/moodle/getFBsByCourseid', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(selecao[i].id)
//         });
//         const responseJSON = await response.json();
//         if (responseJSON.feedbacks.length > 0) {
//             for (let x = 0; x < responseJSON.feedbacks.length; x++) {
//                 let divisao1;
//                 let tipo;
//                 let divisao2;
//                 let divisao3;
//                 let docente;
//                 let semestre;
//                 let ano;
//                 if (getSafe(() => responseJSON.feedbacks[x].name.split(':'), 'não é').length > 1) {
//                     divisao1 = responseJSON.feedbacks[x].name.split(':');
//                     tipo = divisao1[0].replace(' ', '');
//                     if (tipo == selecaotipo) {
//                         if (getSafe(() => divisao1[1].split('-'), 'não é').length > 1) {
//                             divisao2 = divisao1[1].split('-');
//                             docente = divisao2[1].replace(' ', '');
//                             if (getSafe(() => divisao2[0].split('/'), 'não é').length > 1) {
//                                 divisao3 = divisao2[0].split('/');
//                                 semestre = +divisao3[0].replace(' ', '');
//                                 ano = +divisao3[1].replace(' ', '');
//                                 let obj = {
//                                     cc: selecao[i].shortname,
//                                     tipo,
//                                     docente,
//                                     semestre,
//                                     ano,
//                                     FB: responseJSON.feedbacks[x]
//                                 };
//                                 FBs = [...FBs, obj];
//                             }
//                         }
//                     } else { console.log('não é ' + selecaotipo) }
//                 }
//             }
//         }
//         if (responseJSON.error) {
//             throw error(responseJSON.error.status, responseJSON.error.message);
//         }
//     }
//     return FBs;
// };

// export async function getFBAnalysisByFBid(fbSelecionado, aspFB) {
//     let mediasMedAIE = [];
//     let totalComentAIE = [];
//     let totalResAIE = [];
//     let file = [];
//     let enviosColetivo = 0;
//     for (let i = 0; i < fbSelecionado.length; i++) {
//         const response = await fetch('/api/moodle/getFBAnalysisByFBid', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(fbSelecionado[i])
//         });
//         const responseJSON = await response.json();
//         if (responseJSON.error) {
//             throw error(responseJSON.error.status, responseJSON.error.message);
//         }
//         let totalEnviosIndividualanonimo = await responseJSON.totalanonattempts;
//         let totalEnviosIndividualnominal = await responseJSON.totalattempts;
//         // enviosColetivo += totalEnviosIndividualanonimo;
//         let grauAspecto = [];
//         let grauSeparados = [];
//         let comentariosAIE = [];
//         let mediasAIEIndividual = [];
//         let resultadoAIEIndividual = [];
//         if (totalEnviosIndividualnominal > 0) {
//             for (let i = 0; i < totalEnviosIndividualnominal; i++) {
//                 grauAspecto = [];
//                 for (let x = 0; x < aspFB.length; x++) {
//                     grauAspecto = [...grauAspecto, responseJSON.attempts[i].responses[x].rawval];
//                 }
//                 grauSeparados = [...grauSeparados, grauAspecto];
//             }
//         }
//         else if (totalEnviosIndividualanonimo > 0) {
//             for (let i = 0; i < totalEnviosIndividualanonimo; i++) {
//                 grauAspecto = [];
//                 for (let x = 0; x < aspFB.length; x++) {
//                     grauAspecto = [...grauAspecto, responseJSON.anonattempts[i].responses[x].rawval];
//                 }
//                 grauSeparados = [...grauSeparados, grauAspecto];
//             }
//             let somaInd = [];
//             aspFB.forEach(() => {
//                 somaInd.push(0);
//             });
//             for (let i = 0; i < grauSeparados.length; i++) {
//                 let jsonFile = {};
//                 for (let x = 0; x < grauSeparados[i].length; x++) {
//                     somaInd[x] = somaInd[x] + +grauSeparados[i][x];
//                     jsonFile[aspFB[x]] = grauSeparados[i][x].toString();
//                     if (x == grauSeparados[i].length - 1) {

//                         comentariosAIE = [...comentariosAIE, grauSeparados[i][x]];
//                     }
//                 }
//                 file = [...file, jsonFile];
//             }

//             function media(item, index, arr) {
//                 arr[index] = +(item / totalEnviosIndividualanonimo).toFixed(2);
//             }
//             somaInd.forEach(media);
//             mediasAIEIndividual = somaInd;
//             resultadoAIEIndividual = [];
//             for (let i = 0; i < mediasAIEIndividual.length; i++) {
//                 let resultado = {
//                     aspecto: aspFB[i],
//                     valor: mediasAIEIndividual[i]
//                 };
//                 resultadoAIEIndividual = [...resultadoAIEIndividual, resultado];
//             }
//         } else {
//             alert('Nenhuma avaliação realizada');
//             mediasAIEIndividual = [];
//             resultadoAIEIndividual = [];
//             comentariosAIE = [];
//         }
//         totalResAIE = [...totalResAIE, resultadoAIEIndividual];
//         mediasMedAIE = [...mediasMedAIE, mediasAIEIndividual];
//         totalComentAIE = [...totalComentAIE, comentariosAIE];
//     }
//     let obj = [
//         {
//             totalResAIE,
//             mediasMedAIE,
//             totalComentAIE
//         }
//     ];
//     return { obj, file };
// };

// export async function getFRsByCourseid(selecao, selecaotipo) {
//     let respostaFRs = [];
//     for (let i = 0; i < selecao.length; i++) {
//         const response = await fetch('/api/moodle/getFRsByCourseid', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(selecao[i].id)
//         });
//         const responseJSON = await response.json();
//         if (responseJSON.length > 0) {
//             for (let x = 0; x < responseJSON.length; x++) {
//                 let divisao1;
//                 let tipo;
//                 let divisao2;
//                 let divisao3;
//                 let docente;
//                 let semestre;
//                 let ano;
//                 if (getSafe(() => responseJSON[x].name.split(':'), 'não é').length > 1) {
//                     divisao1 = responseJSON[x].name.split(':');
//                     tipo = divisao1[0].replace(' ', '');
//                     if (tipo == selecaotipo) {
//                         if (getSafe(() => divisao1[1].split('-'), 'não é').length > 1) {
//                             divisao2 = divisao1[1].split('-');
//                             docente = divisao2[1].replace(' ', '');
//                             if (getSafe(() => divisao2[0].split('/'), 'não é').length > 1) {
//                                 divisao3 = divisao2[0].split('/');
//                                 semestre = +divisao3[0].replace(' ', '');
//                                 ano = +divisao3[1].replace(' ', '');
//                                 let obj = {
//                                     cc: selecao[i].shortname,
//                                     tipo,
//                                     docente,
//                                     semestre,
//                                     ano,
//                                     FR: responseJSON[x]
//                                 };
//                                 respostaFRs = [...respostaFRs, obj];
//                             }
//                         }
//                     } else {
//                         console.log('não é ' + selecaotipo);
//                     }
//                 }
//             }
//         }
//         if (responseJSON.error) {
//             throw error(responseJSON.error.status, responseJSON.error.message);
//         }
//     }
//     return respostaFRs;
// }

// export async function getFRDsByFRid(selecao) {
//     let respostaFRDs = []
//     for (let i = 0; i < selecao.length; i++) {
//         const response = await fetch('/api/moodle/getFRDsByFRid', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(selecao[i])
//         });
//         const responseJSON = await response.json();

//         if (responseJSON.error) {
//             throw error(responseJSON.error.status, responseJSON.error.message);
//         }
//         respostaFRDs = [...respostaFRDs, responseJSON.discussions]
//     }
//     return respostaFRDs;
// };


// export async function getFRDPsByFRDid(selecao) {
//     let respostaFRDPs = []
//     for (let i = 0; i < selecao.length; i++) {
//         const response = await fetch('/api/moodle/getFRDPsByFRDid', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(selecao[i])
//         });
//         const responseJSON = await response.json();
//         if (responseJSON.error) {
//             throw error(responseJSON.error.status, responseJSON.error.message);
//         }
//         respostaFRDPs = [...respostaFRDPs, responseJSON.posts]
//     }
//     return respostaFRDPs;
// };

// export async function getTAGsByid(selecao) {
//     let respostaFRDPs = []
//     for (let i = 0; i < selecao.length; i++) {
//         const response = await fetch('/api/moodle/getTAGsByid', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(selecao[i])
//         });
//         const responseJSON = await response.json();
//         if (responseJSON.error) {
//             throw error(responseJSON.error.status, responseJSON.error.message);
//         }
//         respostaFRDPs = [...respostaFRDPs, responseJSON.posts]
//     }
//     return respostaFRDPs;
// };


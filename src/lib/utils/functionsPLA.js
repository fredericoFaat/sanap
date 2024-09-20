function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export async function getPLAByUserid(selecao) {
    let plaDataRes = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getPLAByUserid', {
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
        let obj = {}
        let arr1 = []
        for (let i = 0; i < responseJSON.length; i++) {
            obj = { ...responseJSON[i] }
            obj.user = selecao[i]
            arr1 = [...arr1, obj]
        }
        plaDataRes = [...plaDataRes, arr1]
    }
    return plaDataRes;
};

export async function getPLAdataByPLAid(selecao) {
    let plaUserRes = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getPLAdataByPLAid', {
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
        let obj1 = {}
        obj1 = { ...responseJSON }
        obj1.user = selecao[i].user
        plaUserRes = [...plaUserRes, obj1];
    }
    return plaUserRes;
};

// export async function getCohorts() {
//     const response = await fetch('/api/moodle/getCohorts');
//     const responseJSON = await response.json();
//     if (responseJSON.error) {
//         throw error(responseJSON.error.status, responseJSON.error.message);
//     }
//     return responseJSON;
// };


// export async function getCohortsMembers(selecao) {
//     let cohortsRes = []
//     for (let i = 0; i < selecao.length; i++) {
//         const response = await fetch('/api/moodle/getCohortsMembers', {
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
//         cohortsRes = [...cohortsRes, responseJSON]
//     }
//     return cohortsRes;
// };

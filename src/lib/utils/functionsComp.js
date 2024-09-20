function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export async function getCompFWs(selecao) {
    const response = await fetch('/api/moodle/getCompFWs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selecao)
    });
    const responseJSON = await response.json();
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message);
    }
    return responseJSON;
};

export async function getPLAusuario(user) {
    const response = await fetch('/api/moodle/getPLAByUserid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const responseJSON = await response.json();
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message);
    }
    return responseJSON;
};

export async function getCompsByPLAid(selecao) {
    const response = await fetch('/api/moodle/getCompsByPLAid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selecao)
    });
    const responseJSON = await response.json();
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message);
    }
    return responseJSON;
};


export async function getCompsByCourseModuleid(selecao) {
    let respostaCNComps = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getCompsByCourseModuleid', {
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
        let obj = {
            module: selecao[i],
            comps: responseJSON
        }
        respostaCNComps = [...respostaCNComps, obj]
    }
    return respostaCNComps;
};


export async function getCompsByFWid(selecao) {
    let CEByFWRes = []
    let compsByFWRes = []
    let contsByFWRes = []
    const response = await fetch('/api/moodle/getCompsByFWid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selecao)
    });
    const responseJSON = await response.json();
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message);
    }
    const uniqueCEs = [];
    const visitedCEs = new Set();
    for (let i = 0; i < responseJSON.length; ++i) {
        if (responseJSON[i].path.split('/').filter((e) => e != '').length == 1) {
            if (!visitedCEs.has(responseJSON[i].idnumber)) {
                uniqueCEs.push(responseJSON[i]);
                visitedCEs.add(responseJSON[i].idnumber);
            }
        }
    }
    CEByFWRes = uniqueCEs;
    const uniqueComps = [];
    const visitedComps = new Set();
    for (let i = 0; i < responseJSON.length; ++i) {
        if (responseJSON[i].path.split('/').filter((e) => e != '').length == 2) {
            if (!visitedComps.has(responseJSON[i].idnumber)) {
                uniqueComps.push(responseJSON[i]);
                visitedComps.add(responseJSON[i].idnumber);
            }
        }
    }
    compsByFWRes = uniqueComps;

    const uniqueConts = [];
    const visitedConts = new Set();
    for (let i = 0; i < responseJSON.length; ++i) {
        if (responseJSON[i].path.split('/').filter((e) => e != '').length == 3) {
            if (!visitedConts.has(responseJSON[i].idnumber)) {
                uniqueConts.push(responseJSON[i]);
                visitedConts.add(responseJSON[i].idnumber);
            }
        }
    }
    contsByFWRes = uniqueConts;

    return { CEByFWRes, compsByFWRes, contsByFWRes };
};
export function getCompsByCE(selecao, compsByFW) {
    const uniqueComps = [];
    const visitedComps = new Set();
    for (let i = 0; i < compsByFW.length; ++i) {
        if (compsByFW[i].parentid == selecao.id) {
            if (!visitedComps.has(compsByFW[i].idnumber)) {
                uniqueComps.push(compsByFW[i]);
                visitedComps.add(compsByFW[i].idnumber);
            }
        }
    }
    return uniqueComps;
};

export function getContsByComp(selecao, contsByFW) {
    const uniqueConts = [];
    const visitedConts = new Set();
    for (let i = 0; i < contsByFW.length; ++i) {
        if (contsByFW[i].parentid == selecao.id) {
            if (!visitedConts.has(contsByFW[i].idnumber)) {
                uniqueConts.push(contsByFW[i]);
                visitedConts.add(contsByFW[i].idnumber);
            }
        }
    }
    return uniqueConts;
};

export async function getCompsByField(column, value) {
    const response = await fetch('/api/moodle/getCompsByField', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({column, value})
    });
    const responseJSON = await response.json();
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message);
    }
    return responseJSON;
};

export async function getCompsUsingByCourse(selecao) {
    const response = await fetch('/api/moodle/getCompsUsingByCourse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selecao)
    });
    const responseJSON = await response.json();
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message);
    }
    return responseJSON;
};

function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export async function getUsers(key, value) {
    let usersRes = []
    for (let i = 0; i < value.length; i++) {
        const response = await fetch('/api/moodle/getUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key, value: value[i] })
        });
        const responseJSON = await response.json();
        if (responseJSON.error) {
            throw error(responseJSON.error.status, responseJSON.error.message);
        }
        let obj1 = {}
        for (let i = 0; i < responseJSON.users.length; i++) {
            obj1 = { ...responseJSON.users[i] }
            usersRes = [...usersRes, obj1]
        }
    }
    return usersRes;
};

export async function getUsersByCourseid(selecao) {
    let usersBID = []
    let arr1 = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getUsersByCourseid', {
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
        arr1 = [...arr1, ...responseJSON];
    }
    usersBID = arr1.filter(
        (user, index) => index === arr1.findIndex(
            other => user.id === other.id
        ));
    return usersBID;
};

export async function getCohorts() {
    const response = await fetch('/api/moodle/getCohorts');
    const responseJSON = await response.json();
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message);
    }
    return responseJSON;
};


export async function getCohortsMembers(selecao) {
    let cohortsRes = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getCohortsMembers', {
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
        cohortsRes = [...cohortsRes, responseJSON]
    }
    return cohortsRes;
};


export async function getGradeByUserId(selecaoUser, selecaoCourse) {
    let cohortsRes = []
    console.log(selecaoUser)
    console.log(selecaoCourse)
    for (let i = 0; i < selecaoUser.length; i++) {
        for (let x = 0; x < selecaoCourse.length; x++) {
            const response = await fetch('/api/moodle/getGradeByUserId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: selecaoUser[i], course: selecaoCourse[x] })
            });
            const responseJSON = await response.json();
            if (responseJSON.error) {
                throw error(responseJSON.error.status, responseJSON.error.message);
            }
            cohortsRes = [...cohortsRes, responseJSON]
        }
    }

    return cohortsRes;
};

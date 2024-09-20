function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

export async function getCategories() {
    const response = await fetch('/api/moodle/getCategories');
    const responseJSON = await response.json();
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message);
    }
    return responseJSON;
};

export async function getCourses() {
    const response = await fetch('/api/moodle/getCourses');
    const responseJSON = await response.json();
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message);
    }
    return responseJSON;
};

export async function getCoursesByField(categoriaSelecionada, field) {
    const response = await fetch('/api/moodle/getCoursesByField', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ categoriaSelecionada, field })
    });
    const responseJSON = await response.json();
    if (responseJSON.error) {
        throw error(responseJSON.error.status, responseJSON.error.message);
    }
    return responseJSON.courses;
};

export async function getCoursesByUserid(selecao) {
    let coursesByUserIDsRes = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getCoursesByUserid', {
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
        for (let w = 0; w < responseJSON.length; w++) {
            obj1 = { ...responseJSON[w] }
            obj1.user = selecao[i]
            coursesByUserIDsRes = [...coursesByUserIDsRes, obj1];
        }
    }
    return coursesByUserIDsRes;
};


export async function getContentsByCourseid(selecao) {
    let respostaCNs = []
    for (let i = 0; i < selecao.length; i++) {
        const response = await fetch('/api/moodle/getContentsByCourseid', {
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
            course: selecao[i],
            contents: responseJSON
        }
        respostaCNs = [...respostaCNs, obj]
    }
    return respostaCNs;
};
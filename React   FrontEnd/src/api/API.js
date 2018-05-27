const api = "http://54.67.118.67:5000";

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/usersignup/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res;
    })
    .catch(error => {
        console.log("This is error: "+error);
        return error;
});

export const doAdminLogin = (payload) =>
fetch(`${api}/loginAdmin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    console.log(res);
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});


export const doSignup = (payload) =>
fetch(`${api}/signup`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const updateUserInfo = (payload) =>
fetch(`${api}/updateUserInfo`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const getReviewID = (payload) =>
fetch(`${api}/usersignup/getReviewID`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },

}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});


export const doSignOut = (payload) =>
fetch(`${api}/logout`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

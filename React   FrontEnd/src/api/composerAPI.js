const api = "http://54.193.74.177:3000/api";

const headers = {
    'Accept': 'application/json'
};

export const getManager = () =>
    fetch(`${api}/Manager`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res);
        return res;
    })
    .catch(error => {
        console.log("This is error: "+error);
        return error;
});

export const getHR = () =>
fetch(`${api}/HR`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    }
}).then(res => {
    console.log(res);
    return res;
})
.catch(error => {
    console.log("This is error: "+error);
    return error;
});

export const getTeamLead = () =>
fetch(`${api}/TeamLead`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    }
}).then(res => {
    console.log(res);
    return res;
})
.catch(error => {
    console.log("This is error: "+error);
    return error;
});

export const getEmployee = () =>
fetch(`${api}/Employee`, {
    method: 'GET',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    }
}).then(res => {
    console.log(res);
    return res;
})
.catch(error => {
    console.log("This is error: "+error);
    return error;
});



export const getReview = () =>
fetch(`${api}/AddReview`, {
    method: 'GET',
    headers: {
        ...headers,
    'Content-Type': 'application/json'
}
}).then(res => {
    console.log(res);
return res;
})
.catch(error => {
    console.log("This is error: "+error);
return error;
});


export const postReview = (payload) =>
fetch(`${api}/AddReview`, {
        method: 'POST',
        headers: {
            ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
.catch(error => {
    console.log("This is error");
return error;
});

export const postInitialReview = (payload) =>
fetch(`${api}/Review`, {
        method: 'POST',
        headers: {
            ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
.catch(error => {
    console.log("This is error");
return error;
});

export const getReviewHistory = (url) =>

fetch(`${api}/`+url, {
    method: 'GET',
    headers: {
        ...headers,
    'Content-Type': 'application/json'
}
}).then(res => {
    console.log(res);
return res;
})
.catch(error => {
    console.log("This is error: "+error);
return error;
});


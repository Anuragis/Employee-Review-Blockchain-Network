export const changeValue=(event) => {
    return(
    {
        type:"CHANGE_VALUE_LOGIN",
        data: event
    }
    );
}


export const loginSuccess=(user) => {
    return(
    {
        type:"LOGIN_SUCCESS",
        data: user
    }
    );
}
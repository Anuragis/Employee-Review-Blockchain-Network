export const currentEmployee=(employee) => {
    return(
    {
        type:"CURRENT_EMPLOYEE",
        data: employee
    }
    );
}
export const  validateEmailForGmail = ( email ): boolean => {
    const pattern = new RegExp("^[a-z0-9](\.?[a-z0-9]){1,}@g(oogle)?mail\.com$");
    return pattern.test(email) ? true : false
}



export const validateEmail = (text: string) => {
    // Basic email format check
    const isValid = /^\S+@\S+\.\S+$/.test(text);
    return isValid;
};


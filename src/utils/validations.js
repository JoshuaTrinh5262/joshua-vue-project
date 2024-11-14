export const validateAgencyForm = (data) => {
    const errors = {};

    if (!data.agency_name || data.agency_name.trim().length === 0) {
        errors.agency_name = "Agency Name is required.";
    }

    return errors;
};

export const validateTalentForm = (data) => {
    const errors = {};

    if (!data.name || data.name.trim().length === 0) {
        errors.name = "Talent Name is required.";
    }

    return errors;
};

export const validateUserForm = (data) => {
    const errors = {};

    if (!data.email || data.email.trim().length === 0) {
        errors.email = "User email is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
        errors.email = "Please enter a valid email format.";
    }

    if (!data.password || data.password.trim().length === 0) {
        errors.password = "User password is required.";
    }

    if (!data.confirm_password || data.confirm_password.trim().length === 0) {
        errors.confirm_password = "User confirm password is required.";
    } else if (data.password !== data.confirm_password) {
        errors.confirm_password = "Password and confirm password must match.";
    }

    return errors;
};
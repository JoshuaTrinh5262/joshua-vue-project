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
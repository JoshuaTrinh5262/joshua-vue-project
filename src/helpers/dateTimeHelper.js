export function isEmptyDate(value) {
    return value === "__/__/____";
}

export function getCurrentYear() {
    return new Date().getFullYear();
}

export function getCurrentMonth() {
    return new Date().getMonth() + 1;
}

export function getCurrentDate() {
    return new Date().getDate();
}

export function getCurrentTime() {
    return new Date().toLocaleTimeString();
}

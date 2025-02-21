function formatString(str) {
    if(str == null) {
        return '';
    }
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default formatString

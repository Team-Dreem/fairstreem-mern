const getLetterAvatar = (string) => {
    if (string && string.length) {
        return string.slice(0, 1).toUpperCase();
    } else {
        return null;
    }
};

export default getLetterAvatar;
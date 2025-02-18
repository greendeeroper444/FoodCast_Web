export const handleClickOutside = (ref, callback) => {
    return (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    };
}

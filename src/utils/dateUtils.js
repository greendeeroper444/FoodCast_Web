export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export const formatDate2 = (dateString, interval) => {
    const date = new Date(dateString);
    if (interval === 'monthly') {
        //full month name for the 'Monthly' interval
        const options = {month: 'long'}; // E.g., January
        return date.toLocaleDateString('en-US', options);
    } else {
        //short month and day for the 'Daily' interval
        const options = {month: 'short', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    }
};


export const getUniqueDates = (items, dateKey) => {
    return [...new Set(items.map(item => {
        const utcDate = new Date(item[dateKey]).toISOString().split('T')[0];
        return formatDate(utcDate);
    }))];
};

export const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {weekday: 'long'});
};


//function to remove the year from date headers
export const removeYearFromHeaders = (headers) => {
    return headers.map(header => {
        if (/\b[A-Za-z]{3} \d{1,2}, \d{4}\b/.test(header)) {
            return header.replace(/, \d{4}/, ''); //remove the year part
        }
        return header;
    });
};



//format a timestamp as relative time
export const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const timeDiff = now - postDate;

    if (isNaN(postDate.getTime())) {
        //return a fallback if the timestamp is invalid
        return 'Invalid date';
    }

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} sec${seconds > 1 ? 's' : ''} ago`;
    }
};
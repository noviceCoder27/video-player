export const formatPlaybackTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let remainingSeconds = Math.floor(seconds - (hours * 3600) - (minutes * 60));
    remainingSeconds = (remainingSeconds < 10) ? "0" + remainingSeconds : remainingSeconds;
    let timeString;
    if(hours > 0) {
        timeString = hours + ":" + minutes + ":" + remainingSeconds;
    } else {
        timeString = minutes + ":" + remainingSeconds;
    }
    return timeString;
}

export const formatTimestamp = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let remainingSeconds = Math.floor(seconds - (hours * 3600) - (minutes * 60));
    remainingSeconds = (remainingSeconds < 10) ? "0" + remainingSeconds : remainingSeconds;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    hours = (hours < 10) ? "0" + hours : hours;
    let timeString;
    if(hours > 0) {
        timeString = hours + ":" + minutes + ":" + remainingSeconds;
    } else {
        timeString = minutes + ":" + remainingSeconds;
    }
    return timeString;
}

export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const months = ["January","February","March","April","May","June","July","August","September","October","Novemeber","December"];
    const day = date.getDate();
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const str = `${day} ${month} ${year}`;
    return str; 
}
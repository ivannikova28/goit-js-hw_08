import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

//
const iframe = document.querySelector('iframe');
//
const player = new Player(iframe);

const localstorageKEY = "videoplayer-current-time";
const saveCurrentTime = getLocalStorage(localstorageKEY);
// console.log(saveCurrentTime)


playSaveTime(saveCurrentTime);

player.on('timeupdate', throttle(saveCurrentTimeToLocalStorage, 1000));
player.off("timeupdate", saveCurrentTimeToLocalStorage)

function playSaveTime(currentTime) {
    console.log(currentTime)
    if (!currentTime) {
        return
    }
    try {
        const { seconds } = saveCurrentTime;
        player.setCurrentTime(seconds)
    } catch (error) {
        console.log(error)
        console.log(error.message)
    }
}


function saveCurrentTimeToLocalStorage(currentTime) {
    setLocalStorage(localstorageKEY, currentTime)
}

function getLocalStorage(key) {
    return transformtoJSObj(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
    return localStorage.setItem(key, transformToJson(data));
}


function transformToJson(data) { 
    return JSON.stringify(data);
}

function transformtoJSObj(data) {
    return JSON.parse(data);
}
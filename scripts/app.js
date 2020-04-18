let myVar;
let isSession = true;
let isRunning = false;
let isPaused = false;
const sessionTime = document.querySelector('#session-time');
const breakTime = document.querySelector('#break-time');
const timer = document.querySelector('#clock');
const activity = document.querySelector('#activity');

document.querySelector('#session-inc').addEventListener('click', () => incrementTime(sessionTime));
document.querySelector('#session-dec').addEventListener('click', () => decrementTime(sessionTime));
document.querySelector('#break-inc').addEventListener('click', () => incrementTime(breakTime));  
document.querySelector('#break-dec').addEventListener('click', () => decrementTime(breakTime));  
document.querySelector('#start').addEventListener('click', start);
document.querySelector('#pause').addEventListener('click', pause);
document.querySelector('#stop').addEventListener('click', stop);
document.querySelector('#reset').addEventListener('click', reset);

function decrementTime(element) {
    if (element.textContent > 1 && !isPaused && !isRunning) {
        let time = Number(element.textContent) - 1;
        element.textContent = time;
        if (element.id === 'session-time') {
            timer.textContent = `${time}:${'00'}`; 
        }
    }
}

function incrementTime(element) {
    if (element.textContent < 60 && !isPaused && !isRunning) {
        let time = Number(element.textContent) + 1;
        element.textContent = time;
        if (element.id === 'session-time') {
            timer.textContent = `${time}:${'00'}`; 
        }
    }
}

function start() {
    if (!isRunning) {
        startCountdown();
    }
}

function pause() {
    clearInterval(myVar);
    isRunning = false;
    isPaused = true;
}

function stop() {
    clearInterval(myVar);
    isRunning = false;
    isPaused = false;
    setSession();
}

function reset() {
    clearInterval(myVar);
    isRunning = false;
    isPaused = false;
    sessionTime.textContent = '25';
    setSession();
}

function setBreak() {
    isSession = false;
    activity.textContent = 'Break';
    timer.textContent = `${breakTime.textContent}:${'00'}`; 
}

function setSession() {
    isSession = true;
    activity.textContent = 'Session';
    timer.textContent = `${sessionTime.textContent}:${'00'}`; 
}

function startCountdown() {
    isRunning = true;
    let minutes = timer.textContent;
    minutes = minutes.slice(0,minutes.indexOf(':'));
    let seconds = timer.textContent;
    seconds = seconds.slice(seconds.indexOf(':') + 1);
    isPaused = false;

    myVar = setInterval( () => {
        if(Number(seconds) === 0) {
            if(Number(minutes) > 0) {
                minutes -= 1;
                seconds = 59;
                timer.textContent = `${minutes}:${seconds}`; 
            } else {
                clearInterval(myVar);
                (isSession) ? setBreak() : setSession();
                startCountdown();
            }
        } else {
            seconds = '0' + --seconds;
            seconds = seconds.slice(-2);
            timer.textContent = `${minutes}:${seconds}`;
        }
    }, 1000);
}
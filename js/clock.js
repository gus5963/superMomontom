const div = document.querySelector(".js-clock"),
clock = div.querySelector(".clock");


function getTime(){
    const date = new Date();
    const years = date.getFullYear();
    const months = date.getMonth();
    const dates = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clock.innerHTML = `${years}. ${months+1}. ${dates} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds <10 ? `0${seconds}` : seconds}`
}


function init(){
    getTime();
    setInterval(getTime, 1000)
}
init();
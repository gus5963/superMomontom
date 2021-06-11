const form = document.querySelector(".js-name"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greeting");

const USER_NAME = "User name";

function saveName(text){
    localStorage.setItem(USER_NAME, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintName(currentValue);
    saveName(currentValue);
}

function askName(){
    form.addEventListener("submit", handleSubmit);
}

function paintName (currentValue){
    form.classList.add("greeting");
    greeting.classList.remove("greeting");
    greeting.innerHTML = `Hello~ Good to see you, ${currentValue}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_NAME);
    if(currentUser !== null){
        paintName(currentUser);
    }else{
        askName();
    }
}

function init(){
loadName();
}
init();
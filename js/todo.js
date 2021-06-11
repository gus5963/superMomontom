const todoForm = document.querySelector(".js-todoForm"),
todoInput = todoForm.querySelector("input"),
todoList = document.querySelector(".js-todoList"),
finList = document.querySelector(".js-finList");

const TODOS_LS = "toDos",
FIN_LS = "finished";

let toDos = [];
let finToDos = [];

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintToDo(currentValue);
    todoInput.value = "";
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveTodos();
}
function deleteFinToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    finList.removeChild(li);
    const cleanFinToDos = finToDos.filter(function(fin){
        return fin.id !== parseInt(li.id);
    });
    finToDos = cleanFinToDos;
    saveFinTodos();
}
function finishToDo(event){
    deleteToDo(event);
    const btn = event.target,
    li = btn.parentNode,
    value = li.childNodes[2],
    finValue = value.innerText;
    paintFinToDo(finValue);
}

function backToDo(event){
    deleteFinToDo(event);
    const btn = event.target,
    li = btn.parentNode,
    value = li.childNodes[2],
    toDoValue = value.innerText;
    paintToDo(toDoValue);
}

function paintFinToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    delBtn.innerText = "❌";
    delBtn.addEventListener('click', deleteFinToDo);
    backBtn.innerText = "↩";
    backBtn.addEventListener('click', backToDo);
    span.innerText = text;
    li.id = newId;
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    li.appendChild(span);
    finList.appendChild(li);
    const finToDoObj = {
        text : text,
        id : newId
    }
    finToDos.push(finToDoObj)
    saveFinTodos();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    delBtn.innerText = "❌";
    delBtn.addEventListener('click', deleteToDo);
    finBtn.innerText = "✔";
    finBtn.addEventListener('click', finishToDo);
    span.innerText = text;
    li.id = newId;
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    li.appendChild(span);
    todoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    }
    toDos.push(toDoObj)
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveFinTodos(){
    localStorage.setItem(FIN_LS, JSON.stringify(finToDos))
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function loadFin(){
    const loadedFin = localStorage.getItem(FIN_LS);
    if(loadedFin !== null){
        const parsedFin = JSON.parse(loadedFin);
        parsedFin.forEach(function(todo){
            paintFinToDo(todo.text);
        });
    }
}

function init(){
loadToDos();
loadFin()
todoForm.addEventListener("submit", handleSubmit);
}
init()
const form = document.querySelector(".form");
const input = form.querySelector("input");
const pending = document.querySelector(".pending");
const finished = document.querySelector(".finished");

let pendingTasks = [];
let finishedTasks = [];

function deleteFromPending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pending.removeChild(li);

    const cleanTask = pendingTasks.filter(function(task) {
        return task.id !== parseInt(li.id);
    });

    pendingTasks = cleanTask;
    savePendingTasks();
}

function deleteFromFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finished.removeChild(li);

    const cleanTask = finishedTasks.filter(function(task) {
        return task.id !== parseInt(li.id);
    });

    finishedTasks = cleanTask;
    saveFinishedTasks();
}

function saveFinishedTasks() {
    localStorage.setItem("currentFinished", JSON.stringify(finishedTasks));
}

function savePendingTasks() {
    localStorage.setItem("currentPending", JSON.stringify(pendingTasks));
}

function paintOnPending(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    const xBtn = document.createElement("button");
    xBtn.innerHTML = "❌"
    xBtn.addEventListener("click", deleteFromPending);
    const yBtn = document.createElement("button");
    yBtn.innerHTML = "✅"
    yBtn.addEventListener("click", function(){paintOnFinished(text)});
    yBtn.addEventListener("click", deleteFromPending);

    li.appendChild(span);
    li.appendChild(xBtn);
    li.appendChild(yBtn);
    pending.appendChild(li);

    const newId = pendingTasks.length + 1;
    li.id = newId;
    const pendingObj = {
        text: text,
        id: newId
    }

    pendingTasks.push(pendingObj);

    savePendingTasks();

}

function paintOnFinished(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    const xBtn = document.createElement("button");
    xBtn.innerHTML = "❌"
    xBtn.addEventListener("click", deleteFromFinished);
    const yBtn = document.createElement("button");
    yBtn.innerHTML = "🔙"
    yBtn.addEventListener("click", function(){paintOnPending(text)});
    yBtn.addEventListener("click", deleteFromFinished);

    li.appendChild(span);
    li.appendChild(xBtn);
    li.appendChild(yBtn);
    finished.appendChild(li);

    const newId = finishedTasks.length + 1;
    li.id = newId;
    const finishedObj = {
        text: text,
        id: newId
    }

    finishedTasks.push(finishedObj);

    saveFinishedTasks();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintOnPending(currentValue);
    input.value = "";
}

function loadPending() {
    const currentPending = localStorage.getItem("currentPending");
    if (currentPending !== null) {
        const parsedTasks = JSON.parse(currentPending);
        parsedTasks.forEach(function(task) {
            paintOnPending(task.text);
        })
    }
}

function loadFinished() {
    const currentFinished = localStorage.getItem("currentFinished");
    if (currentFinished !== null) {
        const parsedTasks = JSON.parse(currentFinished);
        parsedTasks.forEach(function(task) {
            paintOnFinished(task.text);
        })
    }
}

function init() {
    loadPending();
    loadFinished();
    form.addEventListener("submit",handleSubmit);
}

init();
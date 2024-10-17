let tasks = [];

document.addEventListener("DOMContentLoaded",()=>{
    
    let storedList = JSON.parse(localStorage.getItem("tasks"))
    
    storedList.forEach((storageList)=>{
        tasks.push(storageList)
    })

    updateList()
    
})

let addTask = document.getElementById("addTask");

addTask.addEventListener("click", (e) => {
    e.preventDefault()

    let userInput = document.getElementById("userInput");

    let inputText = userInput.value.trim();

    tasks.push({ task: inputText, completed: false })

    if (inputText) {
        updateList()
    }

    userInput.value = ""

})

let updateList = () => {

    let todoList = document.querySelector(".todo-list");

    todoList.innerHTML = ""

    tasks.forEach((task, index) => {
        
        let listItem = document.createElement("li");
        listItem.classList.add("list-item");
        
        let template = `<div class="list-name ${task.completed ? "completed" : ""} ">
                            <input type="checkbox" ${task.completed ? "checked" : ""}>
                            <p>${task.task}</p>
                        </div>
                        <div class="list-icons">
                            <div class="list-edit" onclick="editItem(${index})">
                                <i class='bx bx-edit'></i>
                            </div>
                            <div class="list-delete" onclick="deleteItem(${index})">
                                <i class='bx bx-trash'></i>
                            </div>
                        </div>`

        listItem.innerHTML = template;
        todoList.append(listItem)

        listItem.addEventListener("change", ()=>{
            taskComplete(index)
        })
        updateStats(index)

    })

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

let taskComplete = (index)=>{
    tasks[index].completed = !tasks[index].completed;
    updateList()
}

let deleteItem = (index)=>{
    tasks.splice(index, 1)
    updateList()
    updateStats()
}

let editItem = (index)=>{
    let userInput = document.getElementById("userInput");
    userInput.value = tasks[index].task;
    tasks.splice(index, 1)
    updateList()
    updateStats()
}

let updateStats = ()=>{
    let totalTasks = tasks.length;

    let completedTask = tasks.filter((task)=>{
        return task.completed
    })
    
    let progress = (completedTask.length/totalTasks)*100;

    let progressBar = document.querySelector(".progress");

    progressBar.style.width = `${progress}%`;

    let statsNumber = document.querySelector(".stats-number p")

    if(completedTask.length == 0 && totalTasks == 0){
        progressBar.style.width = "0%";
    }

    statsNumber.innerHTML = `${completedTask.length}/${totalTasks}`

    if(completedTask.length == totalTasks){
        blast()
    }
    
}

let blast = () =>{
    var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}


import List from "./list";

const projectContainer = document.querySelector(".projects-list");
const newProjectForm = document.querySelector("[data-new-project-form]");
const newProjectInput = document.querySelector("[data-new-project-input]");
const taskContainer = document.querySelector("[data-tasks]");
const taskTitle = document.querySelector(".task-list-title");
const taskCounter = document.querySelector(".task-list-counter");
const tasks = document.querySelector(".tasks");
const taskListBody = document.querySelector(".task-list")
const taskTemplate = document.getElementById("task-template");
const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");
const list = Object.assign(new List(), JSON.parse(localStorage.getItem("project.list"))) || new List();
let selectedProjectId = localStorage.getItem("project-selected")

projectContainer.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "li") {
        selectedProjectId = e.target.dataset.projectId;
        save(list);
        render();
    }
})

taskContainer.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "input") {
        const selectedProject = list.projects.find(project => project.id == selectedProjectId)
        const selectedTask = selectedProject.tasks.find(task => task.id == e.target.id)
        selectedTask.complete = e.target.checked;
        console.log(selectedTask);
        save(list);
        renderTaskCounter(selectedProject);
    }
})


newProjectForm.addEventListener("submit", e => {
    e.preventDefault();
    const projectName = newProjectInput.value; 
    if (projectName == null || projectName === "") return;
    list.addProject(list.randomID(), projectName);
    newProjectInput.value = "";
    save(list);
    render();
})

newTaskForm.addEventListener("submit", e => {
    e.preventDefault();
    const taskName = newTaskInput.value; 
    if (taskName == null || taskName === "") return;
 
    for (let i = 0; i < list.projects.length; i++) {
        if (selectedProjectId == list.projects[i].id) {
            list.addTaskToProject(i, taskName);
        }
    }
    newTaskInput.value = "";
    save(list);
    render();
})

function save(data) {
    localStorage.setItem("project.list", JSON.stringify(data));
}


function render() {
    clearElements(projectContainer);
    renderProjects();
    const selectedProject = list.projects.find(project => project.id == selectedProjectId);
    if (selectedProjectId == null) {
        taskListBody.style.display = "none";
    } 
    else {
        taskListBody.style.display = "";
        taskTitle.innerHTML = selectedProject.name;
        renderTaskCounter(selectedProject);
        clearElements(tasks);
        renderTasks(selectedProject);
    }
    initButtons();
}

function renderTaskCounter(selectedProject) {
    const counter = selectedProject.tasks.filter(task => !task.complete).length
    const counterString = counter === 1 ? "task" : "tasks";
    taskCounter.innerHTML = `${counter} ${counterString} remaining`
}

function renderTasks(selectedProject) {
    selectedProject.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector("input");
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector("label");
        label.htmlFor = task.id;
        label.append(task.name);
        const button = taskElement.querySelector("button");
        button.classList.add("task-delete");
        taskContainer.appendChild(taskElement);
    })
}

function renderProjects() {
    list.projects.forEach(project => {
        const projectElement = document.createElement("li");
        projectElement.dataset.projectId = project.id;
        projectElement.classList.add("project-name");
        projectElement.innerHTML = project.name;
        const projectButton = document.createElement("button");
        projectButton.classList.add("project-delete");
        projectButton.innerHTML = "X";
        projectElement.appendChild(projectButton);
        if (project.id == selectedProjectId) {
             projectElement.classList.add("active-project-item");
        }
        projectContainer.appendChild(projectElement);

    })
}

function clearElements(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function initButtons() {
    const removeProjectButtons = document.querySelectorAll(".project-delete");
    removeProjectButtons.forEach(button => {
        button.addEventListener("click", e => {
            const id = e.target.parentNode.dataset.projectId;
            for (let i = 0; i < list.projects.length; i++) {
                if (id == list.projects[i].id) {
                    list.projects.splice(i, 1);
                }
            }
            selectedProjectId = null;
            save(list);
            render();
        })

    })

    const removeTaskButtons = document.querySelectorAll(".task-delete")
    removeTaskButtons.forEach(button => {
        button.addEventListener("click", e => {
            const id = e.target.parentNode.firstElementChild.id
            const selectedProject = list.projects.find(project => project.id == selectedProjectId);
            for (let i = 0; i < selectedProject.tasks.length; i++) {
                console.log(selectedProject.tasks[i].id)
                if (id == selectedProject.tasks[i].id) {
                    selectedProject.tasks.splice(i, 1);
                }
            }
            save(list);
            render();    
        })
    }) 
}

render();

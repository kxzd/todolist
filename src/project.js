import Task from "./task";

class Project {

    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.tasks = []
    }

    getTasks() {
        return this.tasks;
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.id;
    }

    setID(id) {
        this.id = id;
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    setSpecificTask(index, name) {
        this.task[index] = name;
    }

    getSpecificTask(index) {
        return this.task[index];
    }

    setName(name) {
        this.name = name;
    }

    addTask(name) {
        this.tasks.push(new Task(this.randomID, name, false));
    }

}

export default Project;
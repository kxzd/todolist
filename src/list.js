import Project from "./project";
import Task from "./task";

class List {
    constructor() {
        this.projects = [];
        this.projects.push(new Project(this.randomID(), "General"));
        this.projects[0].tasks.push(new Task(this.randomID(), "Wash dishes", true));
        this.projects[0].tasks.push(new Task(this.randomID(), "Fix bathroom lightbulb", false));
        this.projects.push(new Project(this.randomID(), "Work"));
        this.projects[1].tasks.push(new Task(this.randomID(), "Meeting with John at 9:30am", false));
    }

    getProjects() {
        return this.projects;
    }

    setProjects(project) {
        this.projects = project;
    }

    getSpecificProject(index) {
        return this.projects[index];
    }

    setSpecificProject(name, index) {
        this.projects[index] = name;
    }

    addProject(id, name) {
        this.projects.push(new Project(id, name));
    }

    addTaskToProject(index, name) {
        this.projects[index].tasks.push(new Task(this.randomID(), name, false));
    }

    randomID() {
        return Math.floor(Math.random() * 10000);
    }
}

export default List;
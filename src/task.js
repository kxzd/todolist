class Task {
    constructor(id, name, complete) {
        this.id = id;
        this.name = name;
        this.complete = complete;
    }

    getId() {
        return this.id;
    }

    getComplete() {
        return this.complete
    }

    getName() {
        return this.name;
    }

    setId(id) {
        this.id = id;
    }

    setComplete(complete) {
        this.complete = complete;
    }

    setName(name) {
        this.name = name;
    }
}

export default Task;
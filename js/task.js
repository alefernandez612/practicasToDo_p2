export default class Task {
    constructor({title, priority, important, completed} = {important: false, completed: false}) {
        this._id = Date.now();
        this.title = title;
        this.priority = priority;
        this.important = important;
        this.completed = completed;
    }

    get id() {
        this.id;
    }
    get title() {
        this.title;
    }
    get priority() {
        this.priority;
    }
    get important() {
        this.important;
    }
    get completed() {
        this.completed;
    }
    set title(title) {
        title = title.trim();
        if (!title) {
            throw new Error("Title cannot be empty.");
        }
        this._title = title;
    }
    set priority(priority) {
        if (!priority) {
            throw new Error("Priority cannot be empty.");
        }
        this._priority = priority;
    }
    set important(important) {
        if (typeof important !== 'boolean') {
            throw new Error("Important must be boolean.");
        }
        this._important = important;
    }
    set completed(completed) {
        if (typeof completed !== 'boolean') {
            throw new Error("Completed must be boolean.");
        }
        this._completed = completed;
    }
}
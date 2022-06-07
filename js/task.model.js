class Task {
    constructor({title, priority, important, completed} = {important: false, completed: false}) {
        this.id = Date.now();
        this.title = title;
        this.priority = priority;
        this.important = important;
        this.completed = completed;
    }
}
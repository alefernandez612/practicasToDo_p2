class TaskService {
    constructor() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.tasks = tasks.map(task => new Task(task));
    }

    bindTaskListChanged(callback) {
        this.onTaskListChanged = callback;
    }
    _commit(tasks) {
        this.onTaskListChanged(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    add(task) {
        this.tasks.push(new Task(task));
        this._commit(this.tasks);
    }
    edit(_task) {
        this.tasks = this.tasks.map(task => task.id === _task.id ? new Task(_task) : task);
        this._commit(this.tasks);
    }
    remove(_id) {
        this.tasks = this.tasks.filter(({id}) => id !== _id);
        this._commit(this.tasks);
    }
    complete(_id) {
        this.tasks = this.tasks.map(task => task.id === _task.id ? new Task(_task) : task);
        this._commit(this.tasks);
    }
    important(_id) {
        this.tasks = this.tasks.map(task => task.id === _task.id ? new Task(_task) : task);
        this._commit(this.tasks);
    }
}

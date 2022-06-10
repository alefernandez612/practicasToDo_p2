class TaskService {
    constructor() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.tasks = tasks.map((task) => new Task(task));
        let copyTask = this.tasks;
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
    edit(id, _task) {
        this.tasks = this.tasks.map((task) =>
            task.id === id ? new Task({...task, ..._task}) : task
        );
        this._commit(this.tasks);
    }
    delete(_id) {
        this.tasks = this.tasks.filter(({id}) => id !== _id);
        this._commit(this.tasks);
    }
    complete(_id) {
        this.tasks = this.tasks.map((task) =>
            task.id === _id ? new Task({...task, complete: !task.complete}) : task
        );
        this._commit(this.tasks);
    }
    important(_id) {
        this.tasks = this.tasks.map((task) =>
            task.id === _id ? new Task({...task, important: !task.important}) : task
        );
        this._commit(this.tasks);
    }
    search(value) {
        if (value) this.copyTask = this.tasks.filter((task) => task.title.includes(value));
        this.onTaskListChanged(this.copyTask);
    }
    filterByImportant = () => this.copyTask = this.tasks.filter((task) => task.important);
    filterByComplete = () => this.copyTask = this.tasks.filter((task) => task.complete);
    filterByDaily = () => this.copyTask = this.tasks.filter((task) => task.priority === 'daily');
    filterByMontly = () => this.copyTask = this.tasks.filter((task) => task.priority === 'monthly');
    filterBy(nameFilter) {
        const filteredTasks = {
            important: this.filterByImportant,
            complete: this.filterByComplete,
            daily: this.filterByDaily,
            monthly: this.filterByMontly
        };
        this.copyTask = filteredTasks[nameFilter] ? filteredTasks[nameFilter]() : this.tasks;
        this.onTaskListChanged(this.copyTask);
    }
}

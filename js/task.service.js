class TaskService {
    constructor() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.tasks = tasks.map(task => new Task(task));
    }

    add(task) {
        this.tasks.push(new Task(task));
        localStorage.setItem('tasks', this.tasks);
    }
    edit(_task) {
        this.tasks = this.tasks.map(task => task.id === _task.id ? new Task(_task) : task);
        localStorage.setItem('tasks', this.tasks);
    }
    remove(_id) {
        this.tasks = this.tasks.filter(({id}) => id !== _id);
        localStorage.setItem('tasks', this.tasks);
    }

}

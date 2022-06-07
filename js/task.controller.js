class TaskController {
    constructor(taskService, taskView) {
        this.taskService = taskService;
        this.taskView = taskView;

        // Explicit this binding
        this.taskService.bindTaskListChanged(this.onTaskListChanged);
        this.taskView.bindAddTask(this.handleAddTask);
        // this.taskView.bindEditTask(this.handleEditTask);
        // this.taskView.bindDeleteTask(this.handleDeleteTask);
        this.taskView.bindCompletedTask(this.handleCompletedTask);
        console.log(this.taskService.tasks);
        // Display initial tasks
        this.onTaskListChanged(this.taskService.tasks);
    }

    onTaskListChanged = tasks => {
        this.taskView.display(tasks);
    };

    handleAddTask = task => {
        console.log(task);
        this.taskService.add(task);
    };

    // handleEditTask = (id) => {
    //     this.taskService.edit(id);
    // };

    // handleDeleteTask = id => {
    //     this.taskService.delete(id);
    // };

    handleCompletedTask = id => {
        console.log(id);
        this.taskService.completed(id);
    };
}
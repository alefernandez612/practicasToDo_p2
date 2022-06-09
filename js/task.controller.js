class TaskController {
    constructor(taskService, taskView) {
        this.taskService = taskService;
        this.taskView = taskView;

        // Explicit this binding
        this.taskService.bindTaskListChanged(this.onTaskListChanged);
        this.taskView.bindAddTask(this.handleAddTask);
        this.taskView.bindEditTask(this.handleEditTask);
        this.taskView.bindDeleteTask(this.handleDeleteTask);
        this.taskView.bindCompleteTask(this.handleCompleteTask);
        this.taskView.bindImportantTask(this.handleImportantTask);
        this.taskView.bindSearchTask(this.handleSearchTask);
        this.taskView.bindFilterTask(this.handleFilterTask);
        // Display initial tasks
        this.onTaskListChanged(this.taskService.tasks);
    }

    onTaskListChanged = (tasks) => {
        this.taskView.display(tasks);
    };

    handleAddTask = (task) => {
        this.taskService.add(task);
    };

    handleEditTask = (id, task) => {
        this.taskService.edit(id, task);
    };

    handleDeleteTask = (id) => {
        this.taskService.delete(id);
    };

    handleCompleteTask = (id) => {
        this.taskService.complete(id);
    };
    handleImportantTask = (id) => {
        this.taskService.important(id);
    };
    handleSearchTask = (value) => {
        this.taskService.search(value);
    };
    handleFilterTask = (nameFilter) => {
        this.taskService.filterBy(nameFilter);
    };
}
class TaskView {
    constructor() {
        this.ulTasks = this.getElement('#seeTask');
        this.taskInput = this.getElement('#task');
        this.selectPriority = this.getElement('#selectPriority');
        this.form = this.getElement('#formAdd');

    }
    get _taskName() {
        return this.taskInput.value;
    }
    get _selectPriorityValue() {
        return this.selectPriority.value;
    }
    _resetInput() {
        this.taskInput.value = '';
        this.selectPriority.value = '';
    }

    createInput(
        {key, type, placeholder, name, className} = {
            key: 'default',
            type: 'text',
            placeholder: 'default',
            name: 'default',
            className: 'default'
        }
    ) {
        this[key] = this.createElement('input');
        this[key].type = type;
        this[key].placeholder = placeholder;
        this[key].name = name;
        if (className) this[key].classList.add(...className);
    }

    createElement(tag, className, idName) {
        const element = document.createElement(tag);

        if (className) element.classList.add(...className);
        if (idName) element.id = idName;
        return element;
    }

    getElement(selector) {
        return document.querySelector(selector);
    }
    display(tasks) {
        tasks.forEach(task => {
            let li = this.createElement('li', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start']);
            li.id = task.id;
            let mainDiv = this.createElement('div', ['input-group']);
            let subDiv = this.createElement('div', ['input-group-text']);
            let subInput = this.createInput('inputTask');
            let inputmainDiv = this.createInput();
            let spanImportant = this.createElement('span', ['material-symbols-rounded', 'p-1'], 'important');
            let spanEdit = this.createElement('span', ['material-symbols-rounded', 'p-1'], 'edit');
            let spanDelete = this.createElement('span', ['material-symbols-rounded', 'p-1'], 'delete');
            subDiv.append(subInput);
            mainDiv.append(subDiv, inputmainDiv);
            li.append(mainDiv, spanImportant, spanEdit, spanDelete);
            this.ulTasks.appendChild(li);
        });
    }
    bindCompletedTask(handler) {
        this.ulTasks.addEventListener('click', event => {
            if (event.target.id === 'important') {
                const id = event.target.parentElement.id;
                handler(id);
            }
        });
    }
    bindAddTask(handler) {
        this.form.addEventListener('submit', event => {
            console.log(event);
            event.preventDefault();

            if (this._taskName) {
                console.log(this._taskName);
                handler({
                    title: this._taskName,
                    priority: this._selectPriorityValue
                });
                this._resetInput();
            }
        });
    }

    bindDeleteTask(handler) {
        this.ulTasks.addEventListener('click', event => {
            if (event.target.id === 'delete') {
                const id = event.target.parentElement.id;
                handler(id);
            }
        });
    }

    bindEditTask(handler) {
        this.ulTasks.addEventListener('focusout', event => {
            if (this._temporaryAgeText) {
                const id = event.target.parentElement.id;
                const key = 'age';

                handler(id, {[key]: this._temporaryAgeText});
                this._temporaryAgeText = '';
            }
        });
    }


}
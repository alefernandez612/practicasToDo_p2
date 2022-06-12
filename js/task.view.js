class TaskView {
    constructor() {
        this.ulTasks = this.getElement('#seeTask');
        this.taskInput = this.getElement('#task');
        this.taskSearch = this.getElement('#search');
        this.selectPriority = this.getElement('#selectPriority');
        this.ulFilter = this.getElement('#ulFilter');
        this.form = this.getElement('#formAdd');
        this.btnSave = this.getElement('#saveTask');
    }
    get _taskName() {
        return this.taskInput.value;
    }
    get _taskSearch() {
        return this.taskSearch.value;
    }
    get _selectPriorityValue() {
        return this.selectPriority.value;
    }
    _resetInput() {
        this.taskInput.value = '';
        this.taskSearch.value = '';
        this.selectPriority.value = '';
    }

    createElement(
        {tag, className, idName} = {
            tag: 'default',
            className: 'default',
            idName: 'default',
        }
    ) {
        const element = document.createElement(tag);

        if (className) element.classList.add(...className);
        if (idName) element.id = idName;
        return element;
    }

    getElement(selector) {
        return document.querySelector(selector);
    }
    display(tasks) {
        while (this.ulTasks.firstChild) {
            this.ulTasks.removeChild(this.ulTasks.firstChild);
        }
        if (tasks.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'Nothing to do! Add a task?';
            this.ulTasks.append(p);
        } else {
            tasks.forEach((task) => {
                const li = this.createElement({
                    tag: 'li',
                    className: ['list-group-item',
                        'd-flex',
                        'justify-content-between',
                        'align-items-start',
                    ],
                    idName: task.id,
                });
                const mainDiv = this.createElement({
                    tag: 'div',
                    className: ['input-group'],
                });
                const subDiv = this.createElement({
                    tag: 'div',
                    className: ['input-group-text'],
                });
                const checkboxSubDiv = this.createElement({
                    tag: 'input',
                    className: ['form-check-input', 'me-1', 'rounded-circle'],
                });
                checkboxSubDiv.type = 'checkbox';
                checkboxSubDiv.checked = task.complete;
                const inputMainDiv = this.createElement({
                    tag: 'input',
                    className: ['form-control', 'border-0', 'displayTask'],
                });
                inputMainDiv.type = 'text';
                inputMainDiv.value = task.title;
                inputMainDiv.disabled = true;
                task.priority === 'daily' ? inputMainDiv.style.color = '#05a650' : inputMainDiv.style.color = '#f38f5b';
                if (checkboxSubDiv.checked) {
                    inputMainDiv.style.textDecoration = 'line-through';
                    inputMainDiv.style.color = 'gray';
                }
                const spanImportant = this.createElement({
                    tag: 'span',
                    className: ['material-symbols-rounded', 'p-1'],
                    idName: 'important',
                });
                spanImportant.textContent = 'star';
                if (task.important) spanImportant.style.color = '#0d6efd';
                const spanEdit = this.createElement({
                    tag: 'span',
                    className: ['material-symbols-rounded', 'p-1'],
                    idName: 'edit',
                });
                spanEdit.textContent = 'edit_note';
                const spanDelete = this.createElement({
                    tag: 'span',
                    className: ['material-symbols-rounded', 'p-1'],
                    idName: 'delete',
                });
                spanDelete.textContent = 'delete';
                subDiv.appendChild(checkboxSubDiv);
                mainDiv.append(subDiv, inputMainDiv);
                li.appendChild(mainDiv);
                li.appendChild(spanImportant);
                li.appendChild(spanEdit);
                li.appendChild(spanDelete);
                this.ulTasks.appendChild(li);
            });
        }
    }
    bindImportantTask(handler) {
        this.ulTasks.addEventListener('click', (event) => {
            if (event.target.id === 'important') {
                const id = event.target.parentElement.id;
                handler(id);
            }
        });
    }
    bindCompleteTask(handler) {
        this.ulTasks.addEventListener('change', (event) => {
            if (event.target.type === 'checkbox') {
                const id = event.target.parentElement.parentElement.parentElement.id;
                handler(id);
            }
        });
    }
    bindAddTask(handler) {
        this.btnSave.addEventListener('click', () => {
            if (this._taskName) {
                handler({
                    title: this._taskName,
                    priority: this._selectPriorityValue,
                });
            }
            this._resetInput();
        });
    }

    bindDeleteTask(handler) {
        this.ulTasks.addEventListener('click', (event) => {
            if (event.target.id === 'delete') {
                const id = event.target.parentElement.id;
                handler(id);
            }
        });
    }

    bindEditTask(handler) {
        this.ulTasks.addEventListener('click', (event) => {
            if (event.target.id === 'edit') {
                event.target.previousElementSibling.previousElementSibling.childNodes[1].disabled = false;
                event.target.previousElementSibling.previousElementSibling.childNodes[1].focus();
            }
        });
        this.ulTasks.addEventListener('focusout', (event) => {
            if (event.target.value) {
                const id = event.target.parentElement.parentElement.id;
                const key = 'title';
                handler(id, {[key]: event.target.value});
            }
        });
    }
    bindSearchTask(handler) {
        this.taskSearch.addEventListener('input', (event) => {
            handler(event.target.value);
        });
    }
    bindFilterTask(handler) {
        this.ulFilter.addEventListener('click', (event) => {
            handler(event.target.id);
        });
    }
}
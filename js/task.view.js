class TaskView {
    constructor() {
        this.ulTasks = this.getElement('#seeTask');
        this.taskInput = this.getElement('#task');
        this.selectPriority = this.getElement('#selectPriority');
        this.form = this.getElement('#formAdd');
        this._temporaryText = '';
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
        tasks.forEach((task) => {
            const li = this.createElement({
                tag: 'li',
                className: [
                    'list-group-item',
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
                className: ['form-check-input', 'me-1'],
            });
            checkboxSubDiv.type = 'checkbox';
            console.log(task);
            checkboxSubDiv.checked = task.complete;
            const inputMainDiv = this.createElement({
                tag: 'input',
                className: ['form-control', 'border-0', 'displayTask'],
            });
            inputMainDiv.type = 'text';
            inputMainDiv.value = task.title;
            inputMainDiv.disabled = true;
            task.priority === '1' ? inputMainDiv.style.color = '#05a648' : inputMainDiv.style.color = '#f38f5b';
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
            if (task.important) spanImportant.style.color = '#1c375f';
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
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this._taskName) {
                handler({
                    title: this._taskName,
                    priority: this._selectPriorityValue,
                });
                this._resetInput();
            }
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
}
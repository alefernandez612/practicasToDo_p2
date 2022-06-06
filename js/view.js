class TaskView {
    constructor() {

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

    createElement(tag, className) {
        const element = document.createElement(tag);

        if (className) element.classList.add(...className);

        return element;
    }

    getElement(selector) {
        return document.querySelector(selector);
    }
    display(tasks) {
        const ulTasks = this.getElement('#seeTask');
        tasks.forEach(task => {
            let li = this.createElement('li', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-start']);
            li.id = task.id;
            let mainDiv = this.createElement('div', ['input-group']);
            let subDiv = this.createElement('div', ['input-group-text']);
            let subInput = this.createInput('inputTask');
        });
    }

}
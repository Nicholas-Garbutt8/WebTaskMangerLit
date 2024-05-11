import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';


class CreateTask extends LitElement {

    static properties = {
        _task: { state: true },
        category: {}
    };

    static styles = css`
        form {
            display: flex;
            flex-direction: column;
        }
        form div {
            display: flex;
            justify-content:space-between;
            padding:0.5em;
        }
        input {
            width: 100%;
        }

        :host{
            width:100%;
        }

        #main-button{
            padding:0;
            margin:0;
            display:flex;
            border:none;
            width:100%;
            height:1em;
            border-radius:20px;
            color: rgba(201, 206, 243, 1);
            background-color:rgb(6, 12, 52);
            justify-content:center;
            align-items:center;
            font-size:2em;
            transition:100ms;
        }

        #main-button:hover{
            box-shadow: 0px 0px 10px 1px white;
            background-color: rgb(12, 22, 83);
        }

        #create-task-dialog {
            background-color:rgb(6, 12, 52);
            border-radius:20px;
            border: none;
        }

        label{
            color:white;
            padding-right:2em;
        }

        input,textarea,select{
            padding-inline:1em;
            width:200px; 
            background-color: rgb(26, 43, 100);
            color:white;
            border:none;
            border-radius:15px;
            height:3em;
          }

        .button{
            color:white;
            background-color: rgb(26, 43, 100);
            border:none;
            border-radius: 15px;
            padding:0.5em;
            transition:150ms;
            height:2.5em;
            width:5em;
        }

        .button:hover{
        background-color: rgb(26, 43, 150);
        }

    `;

    connectedCallBack() {
        super.connectedCallBack();
    }

    _submit(event) {
        console.log('create button clicked!')
        const formData = new FormData(event.target);
        const due = new Date(formData.get('due'));
        var newTask = {
            category: formData.get('category'),
            summary: formData.get('summary'),
            text: formData.get('text'),
            priority: formData.get('priority'),
            due: due.valueOf(),
          };
        event.preventDefault();
        TaskModel.createTask(newTask);
        this._hideModal(event);
    }

    _showModal() {
        const dialog = this.renderRoot.querySelector('#create-task-dialog');
        dialog.showModal();
    }

    _hideModal(event) {
        event.preventDefault();
        const dialog = this.renderRoot.querySelector('#create-task-dialog');
        dialog.close();
    }

    render() {
        // convert due date from milliseconds time to an ISO string
        // suitable for the datetime-local form input
        const isoString = new Date().toISOString();
        const due = isoString.substring(0, isoString.indexOf('T') + 6);
        return html`
        <button id="main-button" @click=${this._showModal}>+</button>
        <dialog id="create-task-dialog">
            <form @submit=${this._submit}>
                <div class="form-row">
                    <label for="category">Category</label>  
                    <select name="category" id="category-select">
                    <option value=${this.category}>--Select a category--</option>
                    <option value="ToDo">ToDo</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                    </select>
                </div>
                <div class="form-row">
                    <label for="summary">Summary</label>
                    <input name="summary">
                </div>
                <div class="form-row">
                    <label for="text">Text</label>
                    <textarea name="text"></textarea> 
                </div>
                <div class="form-row">
                    <label for="priority">Priority</label>
                    <input name="priority" type="number"> 
                </div>
                <div class="form-row">
                    <label for="due">Due</label>
                    <input name="due" type="datetime-local" value=${due}>
                </div>
                <div class="form-row">
                    <button class='button' @click="${this._hideModal}">Cancel</button>
                    <input class='button' value='Create' type=submit>
                </div>
            </form>
        </dialog>
        `
    }

    /* 
    Based on edit-task
    function will call a popup window similar to edit-task, with fields to define
    the content of the task with a cancel button and a create input element, which will
    an additional function updates the database to create a new task such that an extra
    task card will be rendered upon refresh.

    EDIT: possibly make create-task its seperate button on the top of each of the task boards.
    */


}

customElements.define('create-task', CreateTask);
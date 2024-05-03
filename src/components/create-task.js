import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';


class CreateTask extends LitElement {

    static properties = {

    }

    static styles = css`

        :host{
            padding-bottom:1em;
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

    `;

    connectedCallBack(){
    super.connectedCallBack();

    }

    _submit(event){
        console.log('create button clicked!')
        event.preventDefault();
        TaskModel.createTask();
    }

    render(){
        return html`
        <button id="main-button" @click=${this._submit}>+</button>
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
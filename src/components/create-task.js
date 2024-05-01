import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';


class CreateTask extends LitElement {

    static properties = {

    }

    static styles = css`

    `;

    connectedCallBack(){
    super.connectedCallBack();

    }

    _submit(event){

    }

    render(){
        return html`
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
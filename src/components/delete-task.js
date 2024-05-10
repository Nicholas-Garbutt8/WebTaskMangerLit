import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

class DeleteTask extends LitElement{

    /* 
    - to be added right next to edit-task or possibly
    be inserted inside the form of edit (more likely beside)
    
    psuedo: simply use id of the given task card that we are on
    in the DELETE fetch request to delete the specific task.
    
    */

    static properties = {
        id: 0
    }

    static styles = css`

    #delete-button{
        color:white;
        background-color: rgb(26, 43, 100);
        border:none;
        border-radius: 15px;
        padding:0.5em;
        transition:150ms;
    }

    #delete-button:hover {
        background-color: rgb(26, 43, 150);
    }
    
    `
    connectedCallback() {
        super.connectedCallback();
    }

    _delete(){
        TaskModel.deleteTask(this.id);
    }

    render(){
        return html`
        <button id="delete-button" @click=${this._delete}>Delete</button>
        `
    }

}

customElements.define('delete-task',DeleteTask);
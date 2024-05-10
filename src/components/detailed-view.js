import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';



//show a dialog to see the detailed view of the a task card if the 
//inner text content is too long. Only insert the element, if the
//text content is too long and ensure that the content is cut off.

class DetailedView extends LitElement {

    static properties = {
        id: 0,
        _task: {state:true},
    };

    static styles = css`

    #main-button{
        color:white;
        background-color: rgb(26, 43, 100);
        border:none;
        border-radius: 15px;
        padding:0.5em;
        transition:150ms;
        width:10em;
        height:2.5em;
    }

    #main-button:hover {
        background-color: rgb(26, 43, 150);
    }
    
    #icon{
        height:1em;
        width:1em;
    }

    p{
        color:white;
    }

    #detailed-view-dialog {
        background-color: rgb(26, 43, 100);
        border-radius:20px;
        border: none;
    }

    #summary{
        font-size:1.5em;
        font-weight:bold;
    }
    
    .content-container{
        padding:1em;
        border-radius:20px;
        background-color: rgb(12, 22, 83);
        margin-bottom:1em;
    }

    #exit-button{
        padding:0;
        margin:0;
        height:2.5em;
        width:6em;
        border:none;
        border-radius:15px;
        color:white;
        background-color: rgb(12, 22, 83);
        transition:150ms;
    }

    #exit-button:hover{
        background-color: rgb(26, 43, 150);
    }

    `;

    connectedCallback() {
        super.connectedCallback();
        this._task = TaskModel.getTask(this.id);
    }

    /**
     * click handler for the button to show the editor dialog
     */
    _showModal() {
        const dialog = this.renderRoot.querySelector('#detailed-view-dialog');
        dialog.showModal();
    }

    /**
     * click handler to close the editor dialog
     * @param {Object} event - the click event
     */
    _hideModal(event) {
        event.preventDefault();
        const dialog = this.renderRoot.querySelector('#detailed-view-dialog');
        dialog.close();
    }

    render() {
        const ts = new Date(parseInt(this._task.timestamp));
        const due = new Date(parseInt(this._task.due));
        return html`
        <button id="main-button" @click="${this._showModal}"><img id="icon" alt="expand icon" src="icons/expand_icon.png"></button>
        <dialog id="detailed-view-dialog">
            <div class="container">
                <p id='summary'>${this._task.summary}</p>
                <div class="content-container">
                    <p id='task-timestamp'>Date Made: ${ts.toDateString()}</p>
                    <p id='task-due'>Due Date: ${due.toDateString()}</p>
                    <p id='task-content'>${this._task.text}</p>
                    <p id='task-priority'>Priority: ${this._task.priority}</p>
                    <edit-task id=${this.id}>edit</edit-task>
                </div>
                <button id='exit-button' @click="${this._hideModal}">Exit</button>
            </div>
        </dialog>
        `
    }

}

customElements.define('detailed-view',DetailedView);
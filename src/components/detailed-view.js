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
                <p class='summary'>Summary: ${this._task.summary}</p>
                <p class='task-timestamp'>Date Made: ${ts.toDateString()}</p>
                <p class='task-due'>Due Date: ${due.toDateString()}</p>
                <p class='task-content'>${this._task.text}</p>
                <p class='task-priority'>${this._task.priority}</p>
                <button @click="${this._hideModal}">Exit</button>
                <edit-task id=${this.id}>edit</edit-task>
            </div>
        </dialog>
        `
    }

}

customElements.define('detailed-view',DetailedView);
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';



//show a dialog to see the detailed view of the a task card if the 
//inner text content is too long. Only insert the element, if the
//text content is too long and ensure that the content is cut off.

class DetailedView extends LitElement {

    static properties = {
        id: 0
    }

    static styles = css`

    #main-button{
        color:white;
        background-color:black;
        border:none;
        border-radius: 15px;
        padding:0.5em;
        transition:150ms;
        width:10em;
    }

    #main-button:hover {
        background-color: rgb(20, 20, 20);
    }
    
    #icon{
        height:1em;
        width:1em;
    }
    `;

    connectedCallBack() {
        super.connectedCallBack();
    }

    render() {
        return html`
        <button id="main-button" @click="${this._showModal}"><img id="icon" alt="expand icon" src="icons/expand_icon.png"></button>
        `
    }

}

customElements.define('detailed-view',DetailedView);
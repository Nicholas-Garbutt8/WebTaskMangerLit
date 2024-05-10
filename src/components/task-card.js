import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './edit-task.js';

/**
 * TaskCard <task-card id=N>
 * Display the details of the task with id N in a 'card'
 * as part of the task board
 */
class TaskCard extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
    text: ''
  };

  static styles = css`

    :host{
      border-radius:20px;
      display: block;
      width: 100%;
      background-color:rgb(6, 12, 52);
      color: rgba(201, 206, 243, 1);
      margin-bottom:1em;
    }

    .main-container{
      border-radius:20px;
      transition:150ms;
    }

    .main-container:hover{
      border-radius:20px;
      box-shadow: 0px 0px 10px 1px white;
      background-color: rgb(12, 22, 83);
    }
    :host input {
        width: 5em;
    }
    h2{
      word-wrap: break-word;
    }
    .main-container{
      padding:1em;
    }

    p {
      color: white;
      word-wrap: break-word;
    }

  `;

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
    // set up an event listener to load new tasks when they change
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
  }

  //implement a function that provides a popup,
  //(dialog perhaps similar to edit task)
  //that gives the full view of each of the fields
  //and all of their content. on the main view task cards
  //will have their text and summary cut from the nearest
  //word followed by ... to indicate more content

  shortenText(){
    var cutText;
    var cutSummary;
    if(this._task.text.length>30){
      cutText = this._task.text.substring(0,31) + '...';
    }
    if(this._task.summary.length>20){
      cutSummary = this._task.summary.substring(0,21) + '...';
    }
    return {cutText,cutSummary};
  }

  //if task card text is too long, hide the rest after 30 characters with an added ...
  //and a new button to expand the view of the task.
  //possible have a variable that is the new element and if there is no shortening then
  //the variable is undefined and wont appear in the html return.

  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));

      //if shortenText has done something and returned true
      //return html that includes the detailed view button element
      //else do not.
      
      if(this.shortenText()){
        return html`
        <div class ='main-container'>
            <h2>${this.shortenText().cutSummary}</h2>
            <p class='task-timestamp'>Date Made: ${ts.toDateString()}</p>
            <p class='task-due'>Due Date: ${due.toDateString()}</p>
            <p class='task-content'>${this.shortenText().cutText}</p>
            <p class='task-priority'>Priority: ${this._task.priority}</p>
          <delete-task id=${this.id}></delete-task>
          <edit-task id=${this.id}></edit-task>
        </div>
        `;
      }else{
        return html`
        <div class ='main-container'>
            <h2>${this._task.summary}</h2>
            <p class='task-timestamp'>Date Made: ${ts.toDateString()}</p>
            <p class='task-due'>Due Date: ${due.toDateString()}</p>
            <p class='task-content'>${this._task.text}</p>
            <p class='task-priority'>Priority: ${this._task.priority}</p>
          <delete-task id=${this.id}></delete-task>
          <edit-task id=${this.id}></edit-task>
        </div>
        `;
      }

    } else {
      return html`<div>Loading...</div>`;
    }
  }
}
customElements.define('task-card', TaskCard);

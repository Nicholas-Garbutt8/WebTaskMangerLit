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
  };

  static styles = css`
    :host {
      margin:0.2em;
      margin-top:1em;
      padding:0.5em;
      border-radius: 20px;
      background-color:rgb(6, 12, 52);
      display: flex;
      flex-direction: column;
      transition: 150ms;
      overflow: auto;
    }
    :host input {
        width: 5em;
    }
    h2 {
      background-color: red;
      font-size: large;
      font-variant: small-caps;
      background-color: rgb(6, 12, 52);
      margin:0.2em;
      padding:0.9em;
      border-radius: 20px;
      transition: 150ms;
      color: white;
    }

    p {
      color: white;
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

  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));
      return html`
      <div>
        <h2>${this._task.summary}</h2>
        <p class='task-timestamp'>${ts.toDateString()}</p>
        <p class='task-due'>${due.toDateString()}</p>
        <p class='task-content'>${this._task.text}</p>
        <p class='task-priority'>${this._task.priority}</p>

        <edit-task id=${this.id}></edit-task>
      </div>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }
}
customElements.define('task-card', TaskCard);

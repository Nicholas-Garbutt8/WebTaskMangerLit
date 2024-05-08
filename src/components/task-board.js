import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-card.js';

/**
 * TaskBoard <task-board category="XXX">
 * Display tasks in the given category
 */
class TaskBoard extends LitElement {
  static properties = {
    category: {},
    _tasks: {state: true},
    _message: {state: true},
  };

  static styles = css`
    :host{
      color:rgba(201, 206, 243, 0);
      display:flex;
      justify-content:center;
    }

    :host input {
        width: 5em;
    }

    .background {
      display: block;
      background-color: rgb(16, 23, 74);
      color: rgba(201, 206, 243, 1);
      border-radius:30px;
      padding: 1em;
      margin: 10px;
      height: min-content;
      transition:150ms;
    }

    .background:hover{
      background-color: rgb(24, 32, 100);
      color:white;
    }

    .task-actions {
      display: block;
    }
    .task-actions li {
      display: inline-block;
    }
    .task-board-container{
      display:flex;
      flex-direction:column;
      align-items:center;
    }
    h3{
      width:100%;
      display:flex;
      text-align:left;
    }
    .card-list {
      width:100%;
    }
  `;

  constructor() {
    super();
    // set an event listener to refresh the display when the data is ready
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    // get the up to date task list
    this._tasks = TaskModel.getTasks(this.category);
    this.render();
  }

  render() {
    console.log('task-board render called')
    if (this._message) {
      return html`<h3>${this.category}</h3> <p>${this._message}</p>`;
    } else if (this._tasks) {
      return html`
        <div class="background">
          <div class="task-board-container">
            <h3>${this.category}</h3>
            <create-task category=${this.category}></create-task>
            <div class="card-list">
              ${this._tasks.map((task) => {
                  return html`<task-card id=${task.id}></task-card>`;
                })}
            </div>
          </div>
        </div>
        `;
    } else {
      return html`<h3>${this.category}</h3><p>Loading....</p>`;
    }
  }
}

customElements.define('task-board', TaskBoard);

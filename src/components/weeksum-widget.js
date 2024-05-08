import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-card.js';

class WeekSummary extends LitElement {
  static properties = {
    date: {attribute: false},

    category: {},
    _task: {state: true},
    _tasks: {state: true},
    _message: {state: true},
    id: 0,
  };

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: rgb(0, 225, 223);;
        border: 1px solid black;
    }
    p {
      font-size: 12px;
    }
  `;

  constructor() {
    super();
    this.date = new Date();

    TaskModel.loadData();
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
    this._tasks = TaskModel.getTasks(this.category);
    this.render();
  }

  render() {
    const region = 'en-au';
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    //Task.getTasksForDay(${this.date.toLocaleDateString(region, options)});
    
    if (this._message) {
      return html`
      <h3>${this.category}</h3> <p>${this._message}</p>
      `;
    } else {
      return html`
        <h3>Due this Week</h3>
        <p>Today is: ${this.date.toLocaleDateString(region, options)}</p>
        <p></p>
        
        `;
    }
    
  }
}

customElements.define('weeksum-widget', WeekSummary);

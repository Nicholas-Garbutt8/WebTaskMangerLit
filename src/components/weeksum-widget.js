import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './weeksum-card.js';

class WeekSummary extends LitElement {
  static properties = {
    date: {attribute: false},
    category: {},
    _tasks: {state: true},
  };

  static styles = css`
    :host {
        display: block;
        margin-block-start: 0.2em;
        margin-block-end: 0.2em;
        width: 250px;
        height: auto;
        background-color: rgb(0, 225, 223);
        border: 1px solid black;
        color: black;
        border-radius: 20px;
    }
    p {
      font-size: 12px;
      font-weight: bold;
      color: darkblue;
    }
  `;

  constructor() {
    super();
    this.date = new Date();

    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    this._tasks = TaskModel.getTasks(this.category);
    this.render();
  }

  render() {
    const region = 'en-au';
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    if (this._message) {
      return html`
        <h3>${this.category}</h3> <p>${this._message}</p>`;
    } else {
      return html`
        <h3>Due this Week</h3>
        <p>Today is: ${this.date.toLocaleDateString(region, options)}</p>
        
        ${this._tasks.map((task) => {
                  return html`<weeksum-card id=${task.id}></weeksum-card>`;
                })}
        `;
    }
  }
}

customElements.define('weeksum-widget', WeekSummary);
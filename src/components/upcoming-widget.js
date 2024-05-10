import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './upcoming-card.js';

class UpcomingWidget extends LitElement {
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
        background-color: rgba(24,20,89,1);
        border: 2px solid white;
        color: black;
        border-radius: 20px;
    }
    p {
      font-size: 12px;
      font-weight: bold;
      color: white;
    }
    h3 {
      color: white;
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
        <h3>Upcoming Tasks</h3>
        <p>Today is: ${this.date.toLocaleDateString(region, options)}</p>
        
        ${this._tasks.map((task) => {
                  return html`<upcoming-card id=${task.id}></upcoming-card>`;
                })}
        `;
    }
  }
}

customElements.define('upcoming-widget', UpcomingWidget);
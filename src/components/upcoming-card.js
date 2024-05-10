import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

class UpcomingCard extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
  };

  static styles = css`
    :host {
        display: inherit;
        width: 250px;
    }
    h2 {
      background-color: rgba(100,60,200,1);
      font-size: small;
      font-variant: small-caps;
      color: white;
    }
    p {
      font-size: 12px;
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
    const region = 'en-au';
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    if (this._task) {
      const due = new Date(parseInt(this._task.due));
      return html`
        <h2>${this._task.summary}</h2>
        <p class='task-due'>Due On: ${due.toLocaleDateString(region, options)}</p>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }
}
customElements.define('upcoming-card', UpcomingCard);
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './task-card.js';

class Timer extends LitElement {
  static properties = {
    category: {},
    _task: { state: true },
    _tasks: { state: true },
    _message: { state: true },
  };

  static styles = css`
    :host {
      width: 250px;
      height: 250px;
      background-color: rgb(255, 255, 255);;
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

  `;

  constructor() {
    super();
    this.category = '';
    this.startTime = 900; 
    this.currTime = this.startTime; 
    this.status = false; 
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._countDownInterval);
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
    this._tasks = TaskModel.getTasks(this.category);
    this.render();
  }

  _toggleTimer() {
    if (this.status) {
      clearInterval(this._countDownInterval);https://www.youtube.com/watch?v=15ydPmg6MKE
      this.status = false;
    } else {
      this._countDownInterval = setInterval(() => {
        this.currTime--;
        this.requestUpdate('currTime');
        if (this.currTime == 0 || this.currTime < 1) {
          this._endCount();
          clearInterval(this._countDownInterval);
        }
      }, 1000);
      this.status = true; 
    }
  }

  

  render() {
    return html`
      <h3>${this.category}</h3>
      ${this._message ? html`<p>${this._message}</p>` : html`<p>Time Remaining: ${this.currtime(this.currTime)}</p>`}
    
      <button @click="${this._toggleTimer}">${this.status ? 'Pause || Resume Timer' : 'Start Timer'}</button>
      <button @click="${this._resetTimer}">Reset Timer</button>
      <button @click="${this._setTimerLength}""${this.status}">Set Timer</button>
    `;
  }

  
  currtime(second) {
    let min = Math.floor(second / 60);
    let sec = Math.floor(second % 60);
  
    return `${min}:${sec}`;
  }
}

customElements.define('timer-widget', Timer);

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
      margin-block-start: 0.2em;
      margin-block-end: 0.2em;
      width: 250px;
      height: 250px;
      background-color: rgb(255, 255, 255);;
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-radius: 20px;
      background: linear-gradient(90deg, rgba(24,20,89,1) 0%, rgba(33,60,200,1) 31%, rgba(122,110,232,1) 100%);
      color: white;
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
    clearInterval(this.countSpeed);
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
    this._tasks = TaskModel.getTasks(this.category);
    this.render();
  }

  toggle() {
    if (this.status) {
      clearInterval(this.countSpeed);
      this.status = false;
    } else {
      this.countSpeed = setInterval(() => {
        this.currTime--;
        this.requestUpdate('currTime');
        if (this.currTime == 0) {
          this.end();
        }
      }, 1000);
      this.status = true; 
    }
  }

  reset() {
    this.status = false; 
    this.currTime = this.startTime; 
    this._message = null;
    clearInterval(this.countSpeed);
  }

  length() {
    let newTime = prompt("Timer length:");
    this.startTime = parseInt(newTime); 
    this.reset();
    this.requestUpdate('currTime'); 
  }

  end() {
    this._message = "Beep Beep timer done";
  }

  render() {
    return html`
      <h3>Timer</h3>
      ${this._message ? html`<p>${this._message}</p>` : html`<p>Time Remaining: ${this.currtime(this.currTime)}</p>`}
    
      <button @click="${this.toggle}">${this.status ? 'Pause || Resume Timer' : 'Start Timer'}</button>
      <break>
      <button @click="${this.reset}">Reset Timer</button>
      <button @click="${this.length}""${this.status}">Set Timer</button>
    `;
  }

  
  currtime(second) {
    let min = Math.floor(second / 60);
    let sec = Math.floor(second % 60);
  
    return `${min}:${sec}`;
  }
}

customElements.define('timer-widget', Timer);

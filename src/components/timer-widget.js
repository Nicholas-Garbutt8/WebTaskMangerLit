import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './task-card.js';

class Timer extends LitElement {
  static properties = {
    category: {},

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
    this.message = null;
    clearInterval(this.countSpeed);
    this.requestUpdate('currTime');
  }

  length() {
    let newTime = prompt("Timer length:");
    this.startTime = parseInt(newTime); 
    this.reset();
    this.requestUpdate('currTime'); 
  }

  end() {
    this.message = "Beep Beep timer done";
    let alarm = new Audio('alarm.mp3');
    alarm.play();
  } 

  render() {
    return html`
      <h3>Timer</h3>
      ${this.message ? html`<p>${this.message}</p>` : html`<p>Time Remaining: ${this.currtime(this.currTime)}</p>`}
    
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

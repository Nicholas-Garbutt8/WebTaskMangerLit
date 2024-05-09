import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-container.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/task-manager.js';
import "./components/bmi-widget.js";
//Avi's Widget(s)
import './components/weeksum-widget.js';
import './components/weeksum-card.js';
//Nick's Widget
import './components/timer-widget.js';
//Noah's Widget(s)
import './components/create-task.js';
import './components/delete-task.js';

//Matthew's Widget
import "./components/gameWidget.js";

/**
 * Comp2110TaskManager component constructs the main UI of the application
 */
class Comp2110TaskManager extends LitElement {
  static properties = {
    header: { type: String },
  };

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
    }

    header{
      position:fixed;
      top:0;
      padding:1em;
      background-color: rgba(17, 16, 32, 0.974);
      display:flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width:100%;
      margin-bottom: 1em;
    }

    header > * {
      margin-inline: 1em;
      margin-block: 0.5em;
  }

  header{
    top:0;
    padding:1.5em;
    background-color: rgba(17, 16, 32, 0.974);
    display:flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width:100%;
    margin-bottom: 1em;
    color: white;
}

    main {
      margin-top: 10em;
      display: flex;
      justify-content: space-around;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }

    header {
      display:flex;
      justify-content: space-around;
    }

    h1{
      color: rgba(201, 206, 243, 1);
    }

    login-widget {
      display:flex;
      justify-content: space-between;
      align-items:center;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Task Manager';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>      
        <task-manager></task-manager>     
        <widget-container header="Widgets">
          <ad-widget></ad-widget>
          <weeksum-widget category='ToDo'></weeksum-widget>
          <timer-widget></timer-widget>
          <game-widget></game-widget>
        </widget-container>
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}

customElements.define('comp2110-task-manager', Comp2110TaskManager);

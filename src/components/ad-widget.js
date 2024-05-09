import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {BASE_URL} from '../config.js';

/**
 * AdWidget <ad-widget> displays an advert from the backend server
 */
class AdWidget extends LitElement {
  static properties = {
    adUrl: {type: String},
  };

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
    }
    
    .container{
      border-radius: 20px;
    }

    img { 
      border-radius: 20px;
    }

  `;

  constructor() {
    super();
    this.adUrl = `${BASE_URL}adserver`;
  }

  render() {
    return html`
  <div class="container">
        <img src=${this.adUrl} alt="Advertisment">
  </div>
    `;
  }
}

customElements.define('ad-widget', AdWidget);

import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


/**
 * WidgetBlock <widget-block header="Sample Widget">
 * Base example for a widget, used as a placeholder in design for unimplemented
 * widgets
 */
class gameWidget extends LitElement {
  static properties = {
    header: {type: String},
    numRange: {state: true},
    guessedNum: {state: true},
    setChange: {type: true},
    guessChances: {type: String},
    guess: {state: true},
    guessAnswer: {type: String},
    Numbers: {type: String},
    correctNum: {state: true},
    hasWonORLost: {state: true},
  };

  static styles = css`
    :host {
        display: block;
        margin-block-start: 0.2em;
        margin-block-end: 0.2em;
        width: 250px;
        height: 350px;
        background-color: #535C5F;
        border: 1px solid black;
        color: white; 
        border-radius: 20px;
    }

    :host input {
      width: 5em;
    }

    :host input:hover {
      background-color: rgb(24, 32, 100);
      color:white;
      box-shadow: 0px 0px 10px 1px white;
    }

    h3 {
      color: black;
    }

    #SubmitGuess {
      background-color: rgb(24, 32, 100);
      box-shadow: 0px 0px 10px 1px white;
    }
  `;

  constructor() {
    super();
    this.header = 'Guess The Number!';
    this.guessAnswer = "Submit?";
    this.Numbers = "0 - ?";
    this.guessChances = 3;
    this.setChange = true;
    this.correctNum = 0;
    this.hasWonORLost = false;
  }
  SetRandomNum() {
    this.correctNum = Math.Range(0, this.numRange);
    return this.correctNum;
  }

  updateRange(event) {
    if (this.setChange == true) {
      this.header = "Guess The Number!";
      this.numRange = event.target.value;
      //console.log(this.numRange); Uncomment if testing :)
      this.setChange = false; // Won't change if the person puts a new number.
      this.hasWonORLost = false;
      
      // Set the number that needs to be guessed between 0, and the inputted number :) 
      this.correctNum = Math.round(Math.random()*this.numRange);
      this.Numbers = "0 - " + this.numRange;
      //console.log(this.correctNum); Uncomment if testing :)
      return this.numRange;
    }
  }

  numGuessed(event) {
    this.guess = event.target.value;
      //console.log(this.guess); Uncomment if testing :)
      return this.guess;
  }

  submitGuess() {
    //console.log("Button Pressed!"); Uncomment if testing :)
    
    if (this.hasWonORLost == false) { 
      if (this.guess == this.correctNum) {
        this.header = "Correct! YOU WIN!" + " " +  " | Try With A New Range!" ;
        this.hasWonORLost = true;
        this.setChange = true;
        this.guessChances = 3; 
      }   else {
        this.guessChances --;
    }

    if (this.guessChances == 0) {
      this.hasWonORLost = true;
      this.header = "Incorrect! Correct Answer: " + this.correctNum + " " + " | Try With A New Range!";
      this.setChange = true; // Resets the form to allow for a new number.
      this.guessChances = 3;
    }
  }
  }

  render() {
    return html`
        <h3>${this.header}</h3>
        <p>Guesses Left: ${this.guessChances} </p>
        <form>
          <p>
            Number Range: 
            <input @change=${this.updateRange} name="Range" type=number value=${this.numRange}>
          </p>

          <p>Numbers: ${this.Numbers} </p>

          <p>
            Guessed Number: 
            <input @change=${this.numGuessed} name="GuessedNum" type=number value=${this.guess}>
          </p>

        </form>

        <div class="SubmitGuess">
        <button @click=${this.submitGuess}>${this.guessAnswer}</>
        </div>
    `;
  }
}

customElements.define('game-widget', gameWidget);

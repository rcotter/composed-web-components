import { html, LitElement } from 'https://unpkg.com/@polymer/lit-element@0.6.1/lit-element.js?module';


class IAmLitComponent1 extends LitElement {
  constructor() {
    super();
    
    // this.mood = 'happy';
  }
  
  // TODO let them initialize/select via attribute
  // TODO replace dumb-component-1 with this one
  
  static get properties() {
    return {
      mood: {
        type: {
          fromAttribute: val => {
            console.log(val);
            return val;
          }
        },
        attribute: 'my-mood',
        reflect: false
      }
    };
  }
  
  moodSelectedHandler(option) {
    // alert('moodSelectedHandler');
    console.log(`${option.text} selected. Was ${this.mood}`);
    
    this.mood = option.text;
    
    const values = option.value.split(':');
    this.moodColor = values[0];
    this.moodWeight = values[1];
    this.moodStyle = values[2];
  }
  
  get isNone() {
    console.log(`isNone: ${this.mood}`);
    return !this.mood;
  }
  
  get isHappy() {
    // alert('isHappy')
    console.log(`isHappy: ${this.mood}`);
    return this.mood === 'happy';
  }
  
  get isSad() {
    // alert('isSad')
    console.log(`isSad: ${this.mood}`);
    return this.mood === 'sad';
  }
  
  get isMeh() {
    // alert('isMeh')
    console.log(`isMeh: ${this.mood}`);
    return this.mood === 'meh';
  }
  
  render() {
    console.log(`render: ${this.mood}`);
    
    return html`
      <style>
        :host {
          color: purple;
        }
    
        .container {
          border: 5px solid;
          padding: 10px;
        }
        
        .mood {
          color: ${this.moodColor};
          font-weight: ${this.moodWeight};
          font-style: ${this.moodStyle};
        }
      </style>
      
      <div class="container">
        <p>This is a lit-html templated component (lighter & faster than VDOM)</p>
        
        <p class="mood">I am ${this.mood}</p>
        
        <label for="mood-select">Select your new mood</label>
        <select
          id="mood-select"
          @change="${e => this.moodSelectedHandler(e.target.options[e.target.selectedIndex])}"
        >
          <option value="none" ?selected="${this.isNone}" disabled style="display:none;"></option>
          <option value="red:normal:italic" ?selected="${this.isHappy}">happy</option>
          <option value="blue:bold:normal" ?selected="${this.isSad}">sad</option>
          <option value="green:normal:normal" ?selected="${this.isMeh}">meh</option>
        </select>
      </div>
    `;
  }
}

window.customElements.define('i-am-lit-component-1', IAmLitComponent1);

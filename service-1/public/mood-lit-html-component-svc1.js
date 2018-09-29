// Web component using LitElement (lit-html templating)
// See https://github.com/Polymer/lit-element

import { html, LitElement } from 'https://unpkg.com/@polymer/lit-element@0.6.1/lit-element.js?module';

const MOOD_UNCERTAIN = 'uncertain';
const MOOD_HAPPY = 'happy';
const MOOD_SAD = 'sad';
const MOOD_MEH = 'meh';
const MOODS = [MOOD_UNCERTAIN, MOOD_HAPPY, MOOD_SAD, MOOD_MEH];
const MOODS_REGEX = new RegExp(/^`uncertain|happy|sad|meh`$/);

class MoodLitHtmlComponentSvc1 extends LitElement {
  constructor() {
    super();
    
    this.mood = MOOD_UNCERTAIN;
  }
  
  static get properties() {
    return {
      mood: {
        type: {
          fromAttribute: val => {
            if ((val || '').match(MOODS_REGEX)) return val;
            return MOOD_UNCERTAIN;
          }
        },
        attribute: 'my-mood',
        reflect: true
      }
    };
  }
  
  render() {
    return html`
      <style>
        :host {
          color: purple;
        }
    
        .container {
          border: 5px solid;
          padding: 10px;
        }
        
        .uncertain {
          color: black;
        }
        
        .happy {
          color: red;
          font-style: italic;
        }
        
        .sad {
          color: blue;
          font-weight: bold;
        }
        
        .meh {
          color: green;
        }
      </style>
      
      <div class="container">
        <h2>Pick your mood</h2>
        
        <p>
        This is a super
        <a href="https://medium.com/@lucamezzalira/a-night-experimenting-with-lit-html-585a8c69892a" target="_blank">performant</a>
        native web component using
        <a href="https://polymer.github.io/lit-html/" target="_blank">lit-html</a>
        templating. No framework. No build tool chain whatsoever.
        </p>
        
        <p class=${this.mood}>
          <!-- Slick little bit of straight up JS -->
          ${ this.mood === MOOD_UNCERTAIN ? html`I haven't picked my mood yet` : html`I am ${this.mood}` }
        </p>
        
        <label for="mood-select">Your reality is a choice.</label>
        <select
          id="mood-select"
          @change=${e => this.mood = e.target.options[e.target.selectedIndex].value}
        >
        
          <!-- Slightly contrived excuse to use JS to construct nested template pieces. However, watch it re-render just as efficiently on mood selection. -->
          
          ${
            MOODS.map(mood => {
              return html`<option value=${mood} ?selected=${this.mood === mood}>${mood.toUpperCase()}</option>`;
            })
          }
        </select>
        
        <p>
        Open your DOM inspector, expand this component, and watch updates as you select a mood.
        Alternatively, directly edit the 'my-mood' attribute
        and notice that the mood selector stays synced. <br />
        Try 'happy', 'sad', 'meh', 'uncertain', or some garbage input.
        </p>
        
        <p>
        <small>
          Although lit-html comes from the <a href="https://www.polymer-project.org/" target="_blank">Polymer</a> team this is not a Polymer generated component.</small>
        </small>
        <p>
      </div>
    `;
  }
}

window.customElements.define('mood-lit-html-component-svc1', MoodLitHtmlComponentSvc1);

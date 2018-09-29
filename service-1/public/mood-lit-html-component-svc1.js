// Web component using LitElement (lit-html templating)
// See https://github.com/Polymer/lit-element

import { html, LitElement } from 'https://unpkg.com/@polymer/lit-element@0.6.1/lit-element.js?module';

const MOOD_UNCERTAIN = 'uncertain';
const MOOD_HAPPY = 'happy';
const MOOD_SAD = 'sad';
const MOOD_MEH = 'meh';

const mapMoodToSettings = {
  'uncertain': { color: 'black', weight: 'normal', style: 'normal' },
  'happy': { mood: MOOD_HAPPY, color: 'red', weight: 'normal', style: 'italic' },
  'sad': { color: 'blue', weight: 'bold', style: 'normal' },
  'meh': { color: 'green', weight: 'normal', style: 'normal' }
};

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
            if (mapMoodToSettings[val]) return val;
            return MOOD_UNCERTAIN;
          }
        },
        attribute: 'my-mood',
        reflect: true
      }
    };
  }
  
  syncSettingsToMood() {
    this.moodSettings = mapMoodToSettings[this.mood];
  }
  
  render() {
    this.syncSettingsToMood();
    
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
          color: ${this.moodSettings.color};
          font-weight: ${this.moodSettings.weight};
          font-style: ${this.moodSettings.style};
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
        
        <p class="mood">I am ${this.mood}</p>
        
        <label for="mood-select">Your reality is a choice.</label>
        <select
          id="mood-select"
          @change="${e => this.mood = e.target.options[e.target.selectedIndex].value}"
        >
          <option value="none" ?selected="${this.mood === MOOD_UNCERTAIN}" style="display:none;" disabled>Pick One</option>
          <option value="happy" ?selected="${this.mood === MOOD_HAPPY}">HAPPY</option>
          <option value="sad" ?selected="${this.mood === MOOD_SAD}">SAD</option>
          <option value="meh" ?selected="${this.mood == MOOD_MEH}">MEH</option>
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

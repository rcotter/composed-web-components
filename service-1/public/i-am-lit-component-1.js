// Web component using LitElement (lit-html templating)

import { html, LitElement } from 'https://unpkg.com/@polymer/lit-element@0.6.1/lit-element.js?module';

const MOOD_UNCERTAIN = 'uncertain';
const MOOD_HAPPY = 'happy';
const MOOD_SAD = 'sad';
const MOOD_MEH = 'meh';

const moodSettingsDefaults = {
  color: 'black', weight: 'normal', style: 'normal'
};

const mapMoodToSettings = [
  { mood: MOOD_UNCERTAIN },
  { mood: MOOD_HAPPY, color: 'red', style: 'italic' },
  { mood: MOOD_SAD, color: 'blue', weight: 'bold' },
  { mood: MOOD_MEH, color: 'green' }
]
  .reduce((lookup, settings) => {
      lookup[settings.mood] = Object.assign({}, moodSettingsDefaults, settings);
      return lookup
    },
    {}
  );


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
        <p>
        This is a <a href="https://polymer.github.io/lit-html" target="_blank">lit-html</a>
        templated native web component (lighter & faster than VDOM).
        </p>
        
        <p>
        Open your DOM inspector and select a mood. Alternatively, directly edit the 'my-mood' attribute in
        the DOM and watch the mood selector stay synced. <br />
        Try 'happy', 'sad', 'meh', 'uncertain', or some garbage input.
        </p>
        
        <p class="mood">I am ${this.mood}</p>
        
        <label for="mood-select">Pick a new mood. Your reality is a choice.</label>
        <select
          id="mood-select"
          @change="${e => this.mood = e.target.options[e.target.selectedIndex].value}"
        >
          <option value="none" ?selected="${this.mood === MOOD_UNCERTAIN}" style="display:none;" disabled>Pick One</option>
          <option value="happy" ?selected="${this.mood === MOOD_HAPPY}">HAPPY</option>
          <option value="sad" ?selected="${this.mood === MOOD_SAD}">SAD</option>
          <option value="meh" ?selected="${this.mood == MOOD_MEH}">MEH</option>
        </select>
      </div>
    `;
  }
}

window.customElements.define('mood-lit-html-component-svc1', MoodLitHtmlComponentSvc1);

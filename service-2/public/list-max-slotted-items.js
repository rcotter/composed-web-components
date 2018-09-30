// Web component using LitElement (lit-html templating)
// See https://github.com/Polymer/lit-element

import { html, LitElement } from 'https://unpkg.com/@polymer/lit-element@0.6.1/lit-element.js?module';

class ListMaxSlottedItems extends LitElement {
  constructor() {
    super();
    
    this.visibleCount = Number.MAX_SAFE_INTEGER;
  }
  
  static get properties() {
    return {
      visibleCount: {
        type: {
          fromAttribute: val => (parseInt(val) || 0) + 1 // CSS nth functions are 0 based. Translate by adding 1.
        },
        attribute: 'visible-count',
        reflect: true
      }
    };
  }
  
  setVisibleCount(rawCount) {
    rawCount = parseInt(rawCount);
    if (isNaN(rawCount)) return;
    this.visibleCount = rawCount + 1;
  }
  
  render() {
    return html`
      <style>
        ::host {
          color: aqua;
        }
        
        .container {
          border: #339988 solid 5px;
          padding: 10px;
        }
        
        /*
          Manipulation of visible items here
        */
        ::slotted(*:nth-child(n + ${this.visibleCount})) {
          display:none;
        }
        
        ::slotted(*) {
         margin-top: 5px;
         padding: 2px;
        }
        
        ::slotted(*:nth-of-type(odd)) {
          border: #88eedd solid 3px;
        }
        
        ::slotted(*:nth-of-type(even)) {
          border: #88ccbb solid 3px;
        }
        
        #controls {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        #controls label {
          margin-right: 3px;
        }
      </style>
      
      <div class="container">
        <div id="controls">
          <h2>Dynamically manipulate CSS to hide slotted items</h2>
          <label for="count">Show first</label>
          <input
            id="count"
            name="count"
            type="number"
            min="0"
            value=${this.visibleCount - 1}
            oninput="validity.valid||(value='');"
            @input=${e => this.setVisibleCount(e.target.value)}
          />
          <label for="count">
            modifies
            <i>::slotted(*:nth-child(n + ${this.visibleCount})) { display:none; }</i>
          </label>
        </div>
        
        <p>
          Open your DOM inspector, expand this component, and watch updates as you edit
          the count of items to display. Alternatively, directly edit the 'visible-count'
          attribute and notice that the input stays synced.
        </p>
        
        <slot class="slot">default slot content</slot>
      </div>
    `;
  }
}

window.customElements.define('list-max-slotted-items', ListMaxSlottedItems);
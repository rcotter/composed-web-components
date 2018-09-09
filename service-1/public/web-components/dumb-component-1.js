(function () {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
  <style>
    :host {
      color: blue;
    }
    
    .container {
      border: 5px solid;
      padding: 10px;
    }

    .slot {
      border: 2px solid;
      padding: 2px;
    }
  </style>
  
  <div class="container">
    <p>This is a dumb web component from Service 1</p>
    <div class="slot">
        <slot name="child">child slot is unoccupied</slot>
    </div>
  </div>
`;
  
  window.customElements.define('dumb-component-1', class extends HTMLElement {
    constructor() {
      super();
      
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
  });
})();

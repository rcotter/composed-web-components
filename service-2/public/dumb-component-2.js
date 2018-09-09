(function () {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
  <style>
    :host {
      color: green;
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
    <p>This is a public, dumb web component from Service 2</p>
    <div class="slot">
        <slot name="child">child slot is unoccupied</slot>
    </div>
  </div>
`;
  
  window.customElements.define('dumb-component-2', class extends HTMLElement {
    constructor() {
      super();
      
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
  });
})();

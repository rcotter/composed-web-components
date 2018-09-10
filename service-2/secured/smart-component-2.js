(function () {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
  <style>
    :host {
      color: limegreen;
    }
    
    #data {
      border: 2px solid;
      padding: 5px;
      margin-bottom: 2px;
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
    <p>This is a secured, smart web component from Service 2</p>
    
    <div id="data">
      Loading...
    </div>
    
    <div class="slot">
        <slot name="child">child slot is unoccupied</slot>
    </div>
  </div>
`;
  
  window.customElements.define('smart-component-2', class extends HTMLElement {
    constructor() {
      super();
      
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
  
    connectedCallback() {
      const dataEl = this.shadowRoot.getElementById('data');
    
      fetch('http://localhost:3002/api/data')
        .then(response => {
          response
            .json()
            .then(function (data) {
              dataEl.innerHTML = '';
            
              const pre = document.createElement('pre');
              pre.textContent = data.data;
              dataEl.appendChild(pre);
            });
        })
        .catch(console.error);
    }
  });
})();

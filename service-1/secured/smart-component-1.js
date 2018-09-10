(function () {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
  <style>
    :host {
      color: deepskyblue;
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
    <p>This is a secured, smart web component from Service 1</p>
    
    <div id="data">
      Loading...
    </div>
    
    <div class="slot" hidden>
        <slot name="child">child slot is unoccupied</slot>
    </div>
  </div>
`;
  
  window.customElements.define('smart-component-1', class extends HTMLElement {
    constructor() {
      super();
      
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
    
    connectedCallback() {
      fetch('http://localhost:3001/api/data')
        .then(res => {
          res.json().then(data => {
              this.showData(data.data);
              this.showChildren();
            });
        })
        .catch(console.error);
    }
    
    showData(data) {
      const dataEl = this.shadowRoot.getElementById('data');
      dataEl.innerHTML = '';
  
      const pre = document.createElement('pre');
      pre.textContent = data;
      dataEl.appendChild(pre);
    }
    
    showChildren() {
      const dataEl = this.shadowRoot.querySelector('.slot');
      dataEl.removeAttribute('hidden');
    }
  });
})();

import {LitElement, css} from 'lit';
import {FBP} from '@furo/fbp';

/**
 * `remote-content`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-remote-content
 * @appliesMixin FBP
 */
class RemoteMessage extends FBP(LitElement) {

  constructor() {
    super();

    // store the breakpoints
    this._breakpoints = {};
  }


  _FBPReady() {
    super._FBPReady();

    window.addEventListener('message', event => {
      // expect {type:"render-request", data: html}
      if (event.data.type && event.data.type === 'RENDER_REQUEST') {
        /**
         * @event content
         * Fired when remote content was received
         * detail payload: html
         */
        const customEvent = new Event('content', {composed: true, bubbles: true});
        customEvent.detail = event.data;
        this.dispatchEvent(customEvent);
      }

      // reconnecting
      if (event.data === "PARENT_REFRESHING") { // STEP 1
        console.log("PARENT_REFRESHING")
        setTimeout(() => {
          window.opener.postMessage( // STEP 3
            {type: "PARENT_REFRESHED", url: window.location.href, breakpoints: this._breakpoints},
            '*'
          );
        }, 5500);
      }

    });

    this.updateComplete.then(() => {
      if (window.opener) {
        window.opener.postMessage({type: 'ANALYZER_READY'}, '*');
      }
    });
  }

  /**
   * this is needed to set the breakpoint
   * @param conponent
   */
  setCurrentComponent(conponent) {
    this.currentComponent = conponent
  }

  addBreakpoint(data) {

    if (window.opener) {
      window.opener.postMessage({
        type: 'ADD_BREAKPOINT',
        component: this.currentComponent,
        wire: data.edge.wirename
      }, '*');

      if(this._breakpoints[this.currentComponent]){
        this._breakpoints[this.currentComponent].wires.push(data.edge.wirename);
      }else{
        this._breakpoints[this.currentComponent] = {wires:[data.edge.wirename]};
      }

      this._notifyBPChanges()
    }
  }

  removeBreakpoint(data) {
    if (window.opener) {
      window.opener.postMessage({
        type: 'REMOVE_BREAKPOINT',
        component: this.currentComponent,
        wire: data.edge.wirename
      }, '*');

      if(this._breakpoints[this.currentComponent]){
        this._breakpoints[this.currentComponent].wires = this._breakpoints[this.currentComponent].wires.filter(wire=>{
          return wire !== data.edge.wirename
        })
      }

      this._notifyBPChanges()
    }
  }

  // eslint-disable-next-line class-methods-use-this
  requestComponent(node) {
    if (node.label.includes('-') && window.opener) {
      window.opener.postMessage({type: 'COMPONENT_REQUEST', component: node.label}, '*');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  requestComponentByName(component) {
    if (  window.opener) {
      window.opener.postMessage({type: 'COMPONENT_REQUEST', component}, '*');
      setTimeout(()=>{
        this._notifyBPChanges()
      },100)

    }
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      css`
        :host {
          display: none;
        }
      `
    );
  }

  _notifyBPChanges() {
    /**
     * @event cc-breakpoints-changed
     * Fired when breakpoints changed
     * detail payload:
     */
    const bp = new Event('breakpoints-changed', {composed:true, bubbles: true});
    bp.detail = this._breakpoints;
    this.dispatchEvent(bp)

    /**
     * @event cc-breakpoints-changed
     * Fired when breakpoints changed
     * detail payload:
     */
    const customEvent = new Event('cc-breakpoints-changed', {composed:true, bubbles: true});
    customEvent.detail = this._breakpoints[this.currentComponent];
    this.dispatchEvent(customEvent)
  }
}

window.customElements.define('remote-message', RemoteMessage);

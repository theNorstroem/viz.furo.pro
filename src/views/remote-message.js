import { LitElement, css } from 'lit';
import { FBP } from '@furo/fbp';

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
        const customEvent = new Event('content', { composed: true, bubbles: true });
        customEvent.detail = event.data;
        this.dispatchEvent(customEvent);
      }

      // reconnecting
      if (event.data === "PARENT_REFRESHING") { // STEP 1
        console.log("PARENT_REFRESHING")
        setTimeout(() => {
          window.opener.postMessage( // STEP 3
            { type: "PARENT_REFRESHED", url:window.location.href},
            '*'
          );
        }, 2500);
      }

    });

    this.updateComplete.then(() => {
      if(window.opener){
        window.opener.postMessage({ type: 'ANALYZER_READY' }, '*');
      }
    });
  }

  /**
   * this is needed to set the breakpoint
   * @param conponent
   */
  setCurrentComponent(conponent){
    this.currentComponent = conponent
  }

  addBreakpoint(data){
    window.opener.postMessage({ type: 'ADD_BREAKPOINT', component: this.currentComponent, wire: data.edge.wirename }, '*');
  }

  removeBreakpoint(data){
    window.opener.postMessage({ type: 'REMOVE_BREAKPOINT', component: this.currentComponent, wire: data.edge.wirename }, '*');
  }

  // eslint-disable-next-line class-methods-use-this
  requestComponent(node) {
    if (node.label.includes('-') && window.opener) {
      window.opener.postMessage({ type: 'COMPONENT_REQUEST', component: node.label }, '*');
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
}

window.customElements.define('remote-message', RemoteMessage);

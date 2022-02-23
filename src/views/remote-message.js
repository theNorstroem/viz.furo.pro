import { LitElement, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme.js';
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
      if (event.data.type && event.data.type === 'render-request') {
        /**
         * @event content
         * Fired when remote content was received
         * detail payload: html
         */
        const customEvent = new Event('content', { composed: true, bubbles: true });
        customEvent.detail = event.data;
        this.dispatchEvent(customEvent);
      }
    });

    this.updateComplete.then(() => {
      if(window.opener){
        window.opener.postMessage({ type: 'analyzer-ready' }, '*');
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  requestComponent(node) {
    if (node.label.includes('-') && window.opener) {
      window.opener.postMessage({ type: 'component-request', component: node.label }, '*');
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
      Theme.getThemeForComponent('RemoteMessage') ||
      css`
        :host {
          display: none;
        }
      `
    );
  }
}

window.customElements.define('remote-message', RemoteMessage);

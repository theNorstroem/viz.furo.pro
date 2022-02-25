import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp';

import './main-stage.js';

import './components/furo-tooltip-display.js';
import '@furo/fbp/src/vizConnector.js';

/**
 * `main-app`
 *
 * @customElement
 * @appliesMixin FBP
 */
class AppShell extends FBP(LitElement) {
  /**
   *
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return [
      css`
        :host {
          display: block;
          overflow: hidden;
          height: 100vh;
        }
      `,
    ];
  }

  /**
   * @private
   * @returns {TemplateResult}
   */
  render() {
    // language=HTML
    return html`
      <main-stage
        @-app-flow="--flowEvent"
        @-response-error-401="--unauthorized"
        @-unauthorized="--unauthorized"
        @-navigate-back-clicked="--navBack"
      ></main-stage>
      <furo-tooltip-display></furo-tooltip-display>

    `;
  }
}

window.customElements.define('app-shell', AppShell);

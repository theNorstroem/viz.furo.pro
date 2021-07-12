import { LitElement, html, css } from 'lit-element';
import { FBP } from '@furo/fbp';
import './configs/init.js';
import './main-stage.js';
import '@furo/config/src/furo-config-loader.js';
import '@furo/route/src/furo-app-flow-router.js';
import '@furo/app/src/furo-tooltip-display.js';

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
      <furo-app-flow-router
        ƒ-.config="--flowConfigLoaded"
        ƒ-trigger="--flowEvent"
        ƒ-back="--navBack"
      ></furo-app-flow-router>
      <furo-app-flow
        event="unauthorized"
        ƒ-trigger="--unauthorized"
        @-app-flow="--flowEvent"
      ></furo-app-flow>
      <furo-config-loader
        src="../src/configs/flowConfig.json"
        section="flow"
        @-config-loaded="--flowConfigLoaded"
      ></furo-config-loader>
    `;
  }
}

window.customElements.define('app-shell', AppShell);

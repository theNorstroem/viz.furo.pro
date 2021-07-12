import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme';
import { FBP } from '@furo/fbp';
import '@furo/fbp/src/flow-repeat';
import '@furo/input/src/furo-button';
import '@furo/icon/src/furo-icon';
import '@furo/util/src/furo-get-clipboard';
import '@furo/util/src/furo-key-filter';
import '@furo/util/src/furo-keydown';
import '@furo/logic/src/furo-forth-stack';
import './viz-nav.js';
import './remote-message.js';
import '../custom-graph/furo-show-flow.js';

/**
 * `view-viz`
 * Visualize your flow
 *
 * @customElement
 * @appliesMixin FBP
 */
class ViewViz extends FBP(LitElement) {
  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // describe view-viz itself
    this._FBPTriggerWire('--stackChanged', this.shadowRoot.innerHTML);
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent('ViewViz') ||
      css`
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        furo-show-flow {
          height: 100vh;
          background: var(--surface);
        }

        viz-nav {
          position: absolute;
          left: 24px;
          top: 16px;
          right: 24px;
        }
      `
    );
  }

  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <!-- The navigation bar on top of the screen -->
      <viz-nav
        @-arrow-right="--arrowRight"
        @-arrow-left="--arrowLeft"
        @-delete-current="--deleteCurrentViz"
        @-clipboard-requested="--clipboardContentRequested"
      ></viz-nav>

      <!-- Even the stack was built for mathematical operation, we use the stack as storage for clipboard contents -->
      <furo-forth-stack
        ƒ-put="--clipboardContent"
        ƒ-rot="--arrowLeft"
        ƒ-rrot="--arrowRight"
        ƒ-drop="--deleteCurrentViz"
        @-stack-changed="--stackChanged"
      ></furo-forth-stack>

      <!-- This component shows the graphed flow of the injected content. -->
      <furo-show-flow
        id="flow"
        ƒ-request-fullscreen="--keyF"
        ƒ-parse-html="--stackChanged"
        @-component-clicked="--componentClicked"
      ></furo-show-flow>

      <!-- read the content from clipboard -->
      <furo-get-clipboard
        ƒ-trigger="--clipboardContentRequested"
        @-content="--clipboardContent"
      ></furo-get-clipboard>

      <!-- Listen to the f key to turn on fullscreen -->
      <furo-keydown key="f" @-key="--keyF"></furo-keydown>

      <!-- receive content from opener -->
      <remote-message
        @-content="--clipboardContent"
        ƒ-request-component="--componentClicked"
      ></remote-message>
    `;
  }
}

window.customElements.define('view-viz', ViewViz);
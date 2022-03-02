import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp';
import '@furo/fbp/src/flow-repeat';

import '@furo/util/src/furo-get-clipboard';
import '@furo/util/src/furo-key-filter';
import '@furo/util/src/furo-keydown';
import '@furo/util/src/furo-forth-stack';
import './viz-nav.js';
import './remote-message.js';
import './breakpoint-list.js';
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

    /**
     * Register hook on wire |--clipboardContent to
     * pack it in the correct structure
     */
    this._FBPAddWireHook('|--clipboardContent', e => {
      this._FBPTriggerWire('|--wrappedClipboardContent', { data: e, component: 'from clipboard' });
    });
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return css`
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none;
      }

      furo-show-flow {
        height: 100vh;
      }

      viz-nav {
        position: absolute;
        left: 24px;
        top: 16px;
        right: 24px;
      }
      breakpoint-list {
        position: absolute;
        left: 24px;
        bottom: 16px;
      }
    `;
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
        ƒ-set-title="--remoteContent(*.path)"
        @-clipboard-requested="--clipboardContentRequested"
        @-escape="--zoomOutClicked"
      ></viz-nav>

      <breakpoint-list
        ƒ-set-list="--breakPoints"
        @-breakpoint-updated="--bpChanges"
        @-breakpoint-deleted="--bpChanges"
        @-component-requested="--componentPath"
      ></breakpoint-list>

      <!-- This component shows the graphed flow of the injected content. -->
      <furo-show-flow
        id="flow"
        ƒ-parse-html="|--wrappedClipboardContent(*.data), --remoteContent(*.data)"
        @-component-dblclick="--componentDblClicked"
        @-add-breakpoint-requested="--breakpoint"
        @-remove-breakpoint-requested="--breakpointRemover"
        ƒ-update-breakpoints="--currentComponentBreakpoints"
      ></furo-show-flow>

      <!-- read the content from clipboard -->
      <furo-get-clipboard
        ƒ-trigger="--clipboardContentRequested"
        @-content="|--clipboardContent"
      ></furo-get-clipboard>

      <!-- receive content from opener -->
      <remote-message
        @-content="--remoteContent"
        @-breakpoints-changed="--breakPoints"
        @-cc-breakpoints-changed="--currentComponentBreakpoints"
        ƒ-request-component-by-path="--componentPath"
        ƒ-request-component="--componentDblClicked"
        ƒ-request-parent-component="--zoomOutClicked"
        ƒ-add-breakpoint="--breakpoint"
        ƒ-remove-breakpoint="--breakpointRemover"
        ƒ-notify-bp-changes="--bpChanges"
      ></remote-message>
    `;
  }
}

window.customElements.define('view-viz', ViewViz);

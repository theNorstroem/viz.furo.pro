import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp';
import './breakpoint-list-item.js';

/**
 * `breakpoint-list`
 * ```
 * {
 *   path: "body > app-shell::shadow > main-stage::shadow > furo-pages > view-echo",
 *   wire: "--responseEcho",
 *   kind: "CONDITIONAL",
 *   condition: "this.getAttribute('name')==='echo-service'",
 *   enabled: true
 * }
 *
 * @summary todo shortdescription
 * @customElement
 * @appliesMixin FBP
 */
class BreakpointList extends FBP(LitElement) {
  /**
   * setList set breakpoints
   * @public
   * @param breakpoints
   */
  setList(breakpoints) {
    this.breakpoints = breakpoints;
    this._FBPTriggerWire('|--list', breakpoints);
  }

  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires()
    /**
     * Register hook on wire --deleteRequested to
     * delete breakpoints
     */
    this._FBPAddWireHook('--deleteRequested', index => {
      this.breakpoints.splice(index, 1);
      this._FBPTriggerWire('|--list', this.breakpoints);

      const customEvent = new Event('breakpoint-deleted', { composed: true, bubbles: true });
      customEvent.detail = this.breakpoints;
      this.dispatchEvent(customEvent);
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

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      span {
        cursor: pointer;
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
      <small>Breakpoints</small>
      <ul @-delete-request="--deleteRequested">
        <flow-repeat ƒ-inject-items="|--list">
          <template>
            <li>
              <breakpoint-list-item set-index="--index" ƒ-inject="--init"></breakpoint-list-item>
            </li>
          </template>
        </flow-repeat>
      </ul>
    `;
  }
}

window.customElements.define('breakpoint-list', BreakpointList);

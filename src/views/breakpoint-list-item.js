import {LitElement, html, css} from 'lit';
import {FBP} from "@furo/fbp";

/**
 * `breakpoint-list-item`
 *
 *  ```
 *  {
 *   path: "body > app-shell::shadow > main-stage::shadow > furo-pages > view-echo",
 *   wire: "--responseEcho",
 *   kind: "CONDITIONAL",
 *   condition: "this.getAttribute('name')==='echo-service'",
 *   enabled: true
 * }
 * ```
 *
 * @summary todo shortdescription
 * @customElement
 * @appliesMixin FBP
 */
class BreakpointListItem extends FBP(LitElement) {


  /**
   * @private
   * @return {Object}
   */
  static get properties() {
    return {
      /**
       * Description
       */
      myBool: {type: Boolean}
    };
  }

  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires()
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
        display: inline;
        cursor: pointer;
        background: white;
      }

      :host([hidden]) {
        display: none;
      }
    `
  }

  inject(d) {
    this.path = d.path
    this.wire = d.wire
    this.kind = d.kind

  }

  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <input type="checkbox">
      <select name="" id="">
        <option value="BREAKPOINT">BREAKPOINT</option>
        <option value="TRACE">TRACE</option>
        <option value="CONDITIONAL">CONDITIONAL</option>

      </select>
    <span @-click="^^component-requested(path)">${this.path} <small>${this.wire}</small> </span>

    `;
  }
}

window.customElements.define('breakpoint-list-item', BreakpointListItem);

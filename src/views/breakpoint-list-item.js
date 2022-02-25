import {LitElement, html, css} from 'lit';
import {FBP} from "@furo/fbp";

/**
 * `breakpoint-list-item`
 * todo Describe your element
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
    this.component = d.component
    this.wire = d.wire

  }

  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <span @-click="^^component-requested(component)">${this.component} <small>${this.wire}</small></span>
    `;
  }
}

window.customElements.define('breakpoint-list-item', BreakpointListItem);

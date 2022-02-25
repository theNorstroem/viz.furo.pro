import {LitElement, html, css} from 'lit';
import {FBP} from "@furo/fbp";
import './breakpoint-list-item.js';

/**
 * `breakpoint-list`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @appliesMixin FBP
 */
class BreakpointList extends FBP(LitElement) {


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
  * setList set breakpoints
  * @public
  * @param breakpoints
  */
  setList(breakpoints) {
      const list = []
      Object.keys(breakpoints).forEach(component => {
        breakpoints[component].wires.forEach(wire=>{
          list.push({component, wire})
        })
      })
      this._FBPTriggerWire('|--list', list);
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
            display: block;
        }

        :host([hidden]) {
            display: none;
        }
        ul
        {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        span{
          cursor: pointer;
        }
    `
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
      <ul>
        <flow-repeat ƒ-inject-items="|--list">
          <template>
            <li><breakpoint-list-item ƒ-inject="--init"></breakpoint-list-item> </li>
          </template>
        </flow-repeat>
      </ul>
    `;
  }
}

window.customElements.define('breakpoint-list', BreakpointList);

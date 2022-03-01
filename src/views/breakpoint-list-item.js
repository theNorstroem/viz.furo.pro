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
    /**
     * Register hook on wire --kindChanged to
     * handle kind changes
     */
    this._FBPAddWireHook("--kindChanged", (e) => {
       this.breakpoint.kind =  e.composedPath()[0].value;
      this.kind = this.breakpoint.kind;
      this.requestUpdate();
       this._notifyChanges()
    });

    this._FBPAddWireHook("--enabledChanged", (e) => {
      this.breakpoint.enabled = e.composedPath()[0].checked;
      this._notifyChanges()
    });

    /**
     * Register hook on wire --conditionChangedDebounced to
     * update the condition
     */
    this._FBPAddWireHook("--conditionChanged",(e)=>{
      this.breakpoint.condition = e.composedPath()[0].value;
      this._notifyChanges()
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
        display: inline;
        cursor: pointer;
        background: white;
      }

      :host([hidden]) {
        display: none;
      }

      *[hidden] {
        display: none;
      }
      .condition{
        padding-left: 42px;
        padding-bottom: 3px;
        box-sizing: border-box;
      }
      .condition input{
        width: 30%;
      }
    `
  }

  inject(d) {
    this.breakpoint = d;
    this.path = d.path
    this.wire = d.wire
    this.kind = d.kind
    this.enabled = d.enabled
    this.condition = d.condition

  }

  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <span @-click="^^delete-request(index)">🗑</span>
      <input type="checkbox" ?checked="${this.enabled}" @-change="--enabledChanged(*)">
      <select name="" id="kind" @-change="--kindChanged(*)">
        <option value="CONDITIONAL" ?selected="${this.kind === 'CONDITIONAL'}">CONDITIONAL</option>
        <option value="TRACE" ?selected="${this.kind === 'TRACE'}">TRACE</option>
        <option value="BREAKPOINT" ?selected="${this.kind === 'BREAKPOINT'}">BREAKPOINT</option>
      </select>

      <span @-click="^^component-requested(path)">${this.path} <small>${this.wire}</small> </span>
      <div class="condition" ?hidden="${! (this.kind === 'CONDITIONAL')}">
        <input type="text" @-change="--conditionChanged(*)" value="${this.condition}">
        <small>"this" contains the host component, "data" contains the wire data.</small>
      </div>

    `;
  }

  _notifyChanges() {
    /**
     * @event breakpoint-updated
     * Fired when a breakpoint gets updated (disable, enable,...
     * detail payload:
     */
    const customEvent = new Event('breakpoint-updated', {composed:true, bubbles: true});
    customEvent.detail = this.breakpoint ;
    this.dispatchEvent(customEvent)
  }
}

window.customElements.define('breakpoint-list-item', BreakpointListItem);

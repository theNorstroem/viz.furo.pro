import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp';

/**
 * `man-page`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo/man-page.html
 * @appliesMixin FBP
 */
class ManPage extends FBP(LitElement) {
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
        background: var(--surface);
        padding: 16px 140px 24px 24px;

        height: 100%;
        overflow: auto;
        box-sizing: border-box;
      }

      :host([hidden]) {
        display: none;
      }

      a.close {
        position: absolute;
        right: 24px;
        top: 16px;
        outline: none;
      }

      h1 {
        margin-top: 0;
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
      <h1>viz.furo.pro</h1>
      <p><strong>requires a client with @furo/fbp ^6.3.0</strong></p>
      <p>
        With viz.furo.pro you can inspect fbp flows and also set breakpoints.
      </p>
      <p>Click on a wire to set a breakpoint.</p>

      <h2>Breakpoint Options</h2>
      <p>You can switch the behaviour of a set breakpoint as following: </p>
      <p><strong>BREAKPOINT</strong> will stop in the dev console of your client.</p>
      <p><strong>TRACE</strong> will log the wire in to  the dev console of your client.</p>
      <p><strong>CONDITIONAL</strong> will stop in the dev console of your client if the given condition resolves to true.
       The variable "this" contains the host component and the variable "data" contains the wire data.
      </p>

      <h2>Mouse controls</h2>

      <p><strong>double click</strong> opens the component.</p>
      <p><strong>scroll down</strong> zooms the flow in.</p>
      <p><strong>scroll up</strong> zooms the out.</p>
      <p><strong>moving the mouse with mousedown</strong> pans the flow.</p>


      <h2>How to read the flow graph</h2>
      <p>
        If you are familiar with fbp, you should not have any problem to read the graph. Otherwise
        we recommend to read
        <a target="_blank" rel="noreferrer" href="https://fbp.furo.pro/">the guide</a>
        to learn more about
      </p>
      <p>The <strong>boxes</strong> represent the used components.</p>
      <p>
        Boxes with <strong>dashed lines</strong> have a comment in the source. Hover on the box to
        read the comment
      </p>
      <p>
        The <strong>blue lines</strong> are the wires. Hover on them to read the wire name, like
        --clipboardContent.
      </p>
      <p>
        The <strong>small blue boxes</strong> with an <strong>@-</strong> are the catched events.
        Hover on them to read the used name and more.
      </p>
      <p>
        The <strong>small green boxes</strong> with an <strong>ƒ-</strong> are the triggerer for the
        methods of the component.
      </p>
      <p>
        The <strong>small black boxes</strong> are <strong>boolean</strong> flags of the component
        which are setted.
      </p>
      <p>
        The <strong>small orange boxes</strong> are <strong>string</strong> attributes of the
        component which are setted. Hover on them to read the setted string.
      </p>

      <p>
        The <strong>orange dots</strong> are indicating a wire from nowhere or a wire which was
        triggered from the source (like
        <strong>this._FBPTriggerWire("--dataReceived",data)</strong>) or from outside (like
        <strong>--pageEntered</strong>
        from furo-pages).
      </p>
      <p>
        The <strong>orange dots</strong> are indicating a wire which goes nowhere or a wire which is
        cathced in the source (like
        <strong>this._FBPAddWireHook("--wireName",(e)=>{ ... });</strong>
      </p>




      <h2>Touch controls</h2>
      <p><strong>pinch in</strong> zooms the flow in.</p>
      <p><strong>pinch out</strong> zooms the flow out.</p>
      <p><strong>paning</strong> (with 2 fingers) pans the flow.</p>

      <a class="close" href="/">
        <button>close help</button>
      </a>
    `;
  }
}

window.customElements.define('man-page', ManPage);

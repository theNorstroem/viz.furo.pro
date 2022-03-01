import {LitElement, css} from 'lit';
import {FBP} from '@furo/fbp';

/**
 * `remote-content`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-remote-content
 * @appliesMixin FBP
 */
class RemoteMessage extends FBP(LitElement) {

  constructor() {
    super();

    // store the breakpoints
    this._breakpoints = [{
      path: "body > app-shell::shadow > main-stage::shadow > furo-pages > view-echo",
      wire: "--responseEcho",
      kind: "CONDITIONAL",
      condition: "data.data.message==='Ping Pong'",
      enabled: true
    }, {
      path: "body > app-shell::shadow > main-stage::shadow > furo-pages > view-echo",
      wire: "--responseEcho",
      kind: "CONDITIONAL",
      condition: "this.getAttribute('name')==='echo-service'",
      enabled: true
    }, {
      path: "body > app-shell::shadow > main-stage",
      wire: "--locationChanged",
      kind: "BREAKPOINT",
      enabled: true
    }];


  }


  _FBPReady() {
    super._FBPReady();

    window.addEventListener('message', event => {
      // expect {type:"render-request", data: html}
      if (event.data.type && event.data.type === 'RENDER_REQUEST') {
        /**
         * @event content
         * Fired when remote content was received
         * detail payload: html
         */
        const customEvent = new Event('content', {composed: true, bubbles: true});
        customEvent.detail = event.data;
        this.dispatchEvent(customEvent);
        this.path = event.data.path

        setTimeout(() => {
          this._notifyBPChanges()
        }, 200)
      }

      // reconnecting
      if (event.data === "PARENT_REFRESHING") { // STEP 1
        console.log("PARENT_REFRESHING")
        setTimeout(() => {
          window.opener.postMessage( // STEP 3
            {type: "PARENT_REFRESHED", url: window.location.href},
            '*'
          );
        }, 1000);
      }

      // receive breakpoints
      if (event.data && event.data.type === "BREAKPOINTS") {
        this._breakpoints = event.data.breakpoints
      }



    });

    this.updateComplete.then(() => {
      if (window.opener) {
        window.opener.postMessage({type: 'ANALYZER_READY'}, '*');
      }
    });
  }

  /**
   * this is needed to set the breakpoint
   * @param conponent
   */
  setCurrentComponent(conponent) {
    this.currentComponent = conponent
  }

  addBreakpoint(data) {
    if (window.opener) {


      this._breakpoints.push({path: this.path, wire: data.edge.wirename, kind: "BREAKPOINT", enabled: true});

      window.opener.postMessage({
        type: 'BREAKPOINTS',
        breakpoints: this._breakpoints
      }, '*');

      this._notifyBPChanges()
    }
  }

  removeBreakpoint(data) {

    if (window.opener) {
      this._breakpoints = this._breakpoints.filter(bp => !(bp.path === this.path && bp.wire === data.edge.wirename));
      window.opener.postMessage({
        type: 'BREAKPOINTS',
        breakpoints: this._breakpoints
      }, '*');

      this._notifyBPChanges()
    }
  }

  // eslint-disable-next-line class-methods-use-this
  requestComponent(node) {
    if (node.label.includes('-') && window.opener) {
      let {path} = this

      if (this.path !== "body") {
        path = `${this.path}::shadow`
      }
      window.opener.postMessage({
        type: 'COMPONENT_REQUEST', path: `${path} > ${node.label.toLowerCase()}`

      }, '*');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  requestParentComponent() {
    window.opener.postMessage({
      type: 'PARENT_COMPONENT_REQUEST', path: `${this.path}`
    }, '*');

  }

  // eslint-disable-next-line class-methods-use-this
  requestComponentByPath(path) {
    if (window.opener) {
      window.opener.postMessage({type: 'COMPONENT_REQUEST', path}, '*');
      setTimeout(() => {
        this._notifyBPChanges()
      }, 200)

    }
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      css`
        :host {
          display: none;
        }
      `
    );
  }

  _notifyBPChanges() {
    /**
     * @event cc-breakpoints-changed
     * Fired when breakpoints changed
     * detail payload:
     */
    if (this._breakpoints) {
      const bp = new Event('breakpoints-changed', {composed: true, bubbles: true});
      bp.detail = this._breakpoints;
      this.dispatchEvent(bp)
    }

    /**
     * @event cc-breakpoints-changed
     * Fired when breakpoints for the current component changed
     * detail payload:
     */

    const customEvent = new Event('cc-breakpoints-changed', {composed: true, bubbles: true});
    customEvent.detail = this._breakpoints.filter((bp) => bp.path === this.path);

    this.dispatchEvent(customEvent)


  }
}

window.customElements.define('remote-message', RemoteMessage);

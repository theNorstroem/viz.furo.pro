import { LitElement, html, css } from 'lit-element';
import { FBP } from '@furo/fbp';
import { Theme } from '@furo/framework/src/theme';
import { Styling } from './configs/styling.js';

import './views/view-viz.js';
import './views/man-page.js';
import '@furo/layout/src/furo-vertical-flex';
import '@furo/route/src/furo-location';
import '@furo/route/src/furo-pages';
import '@furo/route/src/furo-app-flow';
import '@furo/fbp/src/flow-bind';

import '@furo/notification/src/furo-snackbar-display.js';

/**
 * `main-stage`
 *
 * @customElement
 * @appliesMixin FBP
 */
class MainStage extends FBP(LitElement) {
  _FBPReady() {
    super._FBPReady();
  }

  /**
   *
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    const theme = Theme.getThemeForComponent('MainStage');
    if (theme) {
      return [theme, Styling.theme];
    }
    // language=CSS
    return [
      css`
        :host {
          height: 100%;
          display: block;
          margin: 0;
          color: #212121;
          background-color: var(--background);
          font-family: 'Roboto', 'Noto', sans-serif;
          line-height: 1.5;
          overflow-x: hidden;
        }

        furo-pages {
          overflow: hidden;
          height: 100%;
        }
      `,
      Styling.theme,
    ];
  }

  /**
   * @private
   * @returns {TemplateResult}
   */
  render() {
    // language=HTML
    return html`
      <furo-pages flex ƒ-inject-location="--locationChanged" default="viz">
        <view-viz name="viz"></view-viz>
        <man-page name="man"></man-page>
      </furo-pages>
      <furo-snackbar-display></furo-snackbar-display>
      <furo-location @-location-changed="--locationChanged"></furo-location>
    `;
  }
}

window.customElements.define('main-stage', MainStage);
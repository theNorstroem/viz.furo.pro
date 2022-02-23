/* eslint-disable lit-a11y/no-autofocus */
import { LitElement, html, css } from 'lit-element';
import { Theme } from '@furo/framework/src/theme';
import { FBP } from '@furo/fbp';
import '@furo/layout';


/**
 * `viz-nav`
 * main navigation
 *
 * @customElement
 * @appliesMixin FBP
 */
class VizNav extends FBP(LitElement) {
  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent('VizNav') ||
      css`
        :host {
          display: block;
          --spacing-xs: 2px;
        }

        :host([hidden]) {
          display: none;
        }

        .nav {
          min-width: 30px;
          padding: 0;
        }
        .title{
          background: white;
          box-sizing: border-box;
        }
      `
    );
  }

  setTitle(title){
   this.componentTitle = title;
   this.requestUpdate();
  }

  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <furo-horizontal-flex space>
        <!-- This is the button, you see on the top left corner of the app. Everything starts with pressing this button (as long you have some content in your clipboard) -->
        <button class="nav"  @-click="-^arrow-left">◀</button>
        <button class="nav"  @-click="-^arrow-right">▶</button>
        <button class="nav"  @-click="-^delete-current">✘</button>

        <div class="title"> ${this.componentTitle}</div>
        <furo-empty-spacer></furo-empty-spacer>
        <!-- The help button ot the top right side just links to /man. Thats all. -->
        <button autofocus     @-click="-^clipboard-requested">ctrl-v</button>
        <a href="/man">
          <button outline>help</button>
        </a>
      </furo-horizontal-flex>

      <furo-keydown global key="v" @-key="-^clipboard-requested"></furo-keydown>
      <furo-keydown global key="ArrowLeft" @-key="-^arrow-left"></furo-keydown>
      <furo-keydown global key="ArrowRight" @-key="-^arrow-right"></furo-keydown>
      <furo-keydown global key="Backspace" @-key="-^delete-current"></furo-keydown>
    `;
  }
}

window.customElements.define('viz-nav', VizNav);

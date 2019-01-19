/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */
import {
  register
} from '@shopify/theme-sections';
import $ from 'jquery';

/**
 * Featured collection constructor
 * Executes on page load as well as Theme Editor `section:load` events.
 *
 * @param {string} container - selector for the section container DOM element
 */
register('featured-collection', {

  init() {
    window.console.log('Initialising featured collection section');

    this._addEventListeners();
  },
  _addEventListeners() {
    $('span[js-ajax-cart]').on('click', (e) => {
      const $this = $(e);
      const action = $this.attr('js-ajax-cart');
      const quantity = $this.attr('data-quantity');
      const variantId = $this.attr('data-variant-id');
      switch (action) {
        case 'addToCart':
          this._ajaxAddProductToCart(quantity, variantId, (lineItem) => {
            // eslint-disable-next-line no-undef
            console.log('addedToCart', lineItem);
          });
          break;
        default:
          break;
      }
    });
  },
  _ajaxAddProductToCart(quantity, variantId, callback) {
    const params = {
      type: 'POST',
      url: '/cart/add.js',
      data: `quantity=${quantity}&id=${variantId}`,
      dataType: 'json',
      success: (lineItem) => {
        if ((typeof callback) === 'function') {
          callback(lineItem);
        } else {
          Shopify.onItemAdded(lineItem);
        }
      },
      error: (XMLHttpRequest, textStatus) => {
        Shopify.onError(XMLHttpRequest, textStatus);
      },
    };
    $.ajax(params);
  },

  // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad() {
    // Do something when a section instance is loaded
    this.init();
  },

  // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
  onUnload() {
    // Do something when a section instance is unloaded
  },

  // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
  onSelect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
  onDeselect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
  onBlockSelect() {
    // Do something when a section block is selected
  },

  // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
  onBlockDeselect() {
    // Do something when a section block is deselected
  },
});
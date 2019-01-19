import $ from 'jquery';
import showSnackbar from './snackbar';

$('span[js-ajax-cart="addToCart"]').on('click', (event) => {
  event.preventDefault();
  const $this = $(event.target);
  const quantity = $this.attr('data-quantity');
  const variantId = $this.attr('data-variant-id');
  ajaxAddProductToCart(quantity, variantId, (success, lineItem) => {
    if (success) {
      showSnackbar(`Added ${lineItem.title} to your cart`);
    } else {
      showSnackbar('Error while adding product to cart\nPlease contact support if this issue persists', 5000);
    }
  });
});

function ajaxAddProductToCart(quantity, variantId, callback) {
  const params = {
    type: 'POST',
    url: '/cart/add.js',
    data: `quantity=${quantity}&id=${variantId}`,
    dataType: 'json',
    success: (lineItem) => {
      if ((typeof callback) === 'function') {
        callback(true, lineItem);
      } else {
        Shopify.onItemAdded(lineItem);
      }
    },
    error: (XMLHttpRequest, textStatus) => {
      if ((typeof callback) === 'function') {
        callback(false, null);
      } else {
        Shopify.onError(XMLHttpRequest, textStatus);
      }
    },
  };
  $.ajax(params);
}
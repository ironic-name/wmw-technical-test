import {load} from '@shopify/theme-sections';
import '../sections/featured-collection';
import '../snippets/product-card';

document.addEventListener('DOMContentLoaded', () => {
  load('*');
});

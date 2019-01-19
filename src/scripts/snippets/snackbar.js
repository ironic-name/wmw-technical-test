export default function showSnackbar(message, duration) {
  const snackbar = document.getElementById('snackbar');
  snackbar.innerHTML = message;
  snackbar.className = 'show';
  // eslint-disable-next-line no-undef
  setTimeout(() => {
    snackbar.className = snackbar.className.replace('show', '');
  }, duration || 3000);
}

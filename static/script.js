const radioBtns = document.querySelectorAll('input[type="radio"]');
const output = document.getElementById('text');
const auswahl = document.querySelector('#auswahl');
const originalText = output.innerHTML;

radioBtns.forEach(radioBtn => {
  radioBtn.addEventListener('change', () => {
    const selectedValue = document.querySelector('input[type="radio"]:checked');

    if (selectedValue.value === 'capital') {
      auswahl.innerHTML = 'You selected capital';
      output.innerHTML = originalText.toUpperCase();
    } else if (selectedValue.value === 'lowercase') {
      auswahl.innerHTML = 'You selected lowercase';
      output.innerHTML = originalText.toLowerCase();
    } else if (selectedValue.value === 'normal') {
      auswahl.innerHTML = 'You selected normal';
      output.innerHTML = originalText;
    }
  });
});

radioBtnFormat = document.querySelectorAll('input[name="radioBtnFormat"]');
radioBtnFlow = document.querySelectorAll('input[name="radioBtnFlow"]');
textElement = document.getElementById('text');

const changeTextSettings = () => {
  const selectedFormat = document.querySelector('input[name="radioBtnFormat"]:checked').value;
  const selectedFlow = document.querySelector('input[name="radioBtnFlow"]:checked').value;
  
  let words = textElement.getAttribute('data-words');
  let syllables = textElement.getAttribute('data-syllables');

  let displayText = selectedFlow === 'syllables' ? syllables : words;
  
  
  if (selectedFormat === 'uppercase') {
    displayText = displayText.toUpperCase();
  } else if (selectedFormat === 'lowercase') {
    displayText = displayText.toLowerCase();
  } else if (selectedFormat === 'normal') {
    displayText = selectedFlow === 'syllables' ? syllables : words;
  }

  textElement.innerHTML = displayText;

}

radioBtnFormat.forEach(radioBtn => radioBtn.addEventListener('change', changeTextSettings));
radioBtnFlow.forEach(radioBtn => radioBtn.addEventListener('change', changeTextSettings));



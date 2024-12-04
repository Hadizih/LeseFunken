const radioBtnFormat = document.querySelectorAll('input[name="radioBtnFormat"]');
const radioBtnFlow = document.querySelectorAll('input[name="radioBtnFlow"]');
const textElement = document.getElementById('text');
const btnStart = document.getElementById('btnStart');
const btnPause = document.getElementById('btnPause');
const textField = document.getElementById('text');
let animationPaused = false;
let index = 0;
let words = [];
let timeoutId;

const start = () => {
  btnPause.hidden = false;
  if (index === 0) {
      words = textField.textContent.split(" ");
  }

  animationPaused = false; 

  const highlightNextWord = () => {
      if (animationPaused) return; 

      textField.innerHTML = words
          .map((word, i) => {
              if (i === index) {
                  return `<span class="highlight">${word}</span>`;
              }
              return word;
          })
          .join(" ");

      index++; 

      if (index < words.length) {
          timeoutId = setTimeout(highlightNextWord, 1500); 
      }
  };

  highlightNextWord();
};

const pause = () => {
  animationPaused = true; 
  clearTimeout(timeoutId);
  index -= 1; 
};

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



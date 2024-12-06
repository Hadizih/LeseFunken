const radioBtnFormat = document.querySelectorAll('input[name="radioBtnFormat"]');
const radioBtnFlow = document.querySelectorAll('input[name="radioBtnFlow"]');
const textElement = document.querySelector('#text');
const btnStart = document.querySelector('#btnStart');
const btnPause = document.querySelector('#btnPause');
const btnStop = document.querySelector('#btnStop');
const textField = document.querySelector('#text');
const speedChanger = document.querySelector('#speedchanger');
const speedValue = document.querySelector('#speedValue');

let pauseActive = false;
let animationPaused = false;
let index = 0;
let words = [];
let timeoutId;

// start und pause der Textanimation
const start = () => {
  btnPause.hidden = false;
  btnStop.hidden = false;
  btnStart.hidden = true;

  if (index === 0) {
      words = textField.textContent.split(" ");
  }

  animationPaused = false; 

  const highlightNextWord = () => {
      if (animationPaused) {
        btnStart.hidden = false;   
        return; 
      }
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
          timeoutId = setTimeout(highlightNextWord, calculateSpeed()); 
      }
  };

  const highlightedWord = document.querySelector('.highlight');
  if (highlightedWord) {
    highlightedWord.classList.remove('paused');
  }
  highlightNextWord();
};

const calculateSpeed = () => {
  const speed = speedChanger.value;
  return 5000 - (speed)*30;
}

const stop = () => {
  animationPaused = true; 
  clearTimeout(timeoutId);
  index = 0; 
  textField.innerHTML = words.join(" ");
  btnPause.hidden = true;
  btnStop.hidden = true;
  btnStart.hidden = false;
}

const pause = () => {
  animationPaused = true; 
  clearTimeout(timeoutId);
  const highlightedWord = document.querySelector('.highlight');

  if (pauseActive) {
    highlightedWord.classList.remove('paused');
    btnPause.innerHTML = 'Pause';
  } else {
    if (highlightedWord) {
      highlightedWord.classList.add('paused');
      pauseActive = true;
      btnPause.innerHTML = 'Weiter';
    }
  }
  
  
  index -= 1; 
};
// text settings
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

// speedchanger

speedChanger.oninput = function() {
  speedValue.innerHTML = this.value;
  if (!animationPaused && index < words.length) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => start(), calculateSpeed());
  }
};

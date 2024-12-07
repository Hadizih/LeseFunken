const radioBtnFormat = document.querySelectorAll('input[name="radioBtnFormat"]');
const radioBtnFlow = document.querySelectorAll('input[name="radioBtnFlow"]');
const textElement = document.querySelector('#text');
const btnStart = document.querySelector('#btnStart');
const btnPause = document.querySelector('#btnPause');
const btnStop = document.querySelector('#btnStop');
const textField = document.querySelector('#text');
const speedChanger = document.querySelector('#speedchanger');
const speedValue = document.querySelector('#speedValue');
const textArea = document.querySelector('#eingabeText');
const charCount = document.querySelector('#charCount');

let pauseActive = false;
let animationPaused = false;
let index = 0;
let words = [];
let timeoutId;
let settings_disabled = false;


const validateText = () => {
  const text = textArea.value.trim();
  const currentLength = text.length;

  if (currentLength < 20 || currentLength > 2500) {
    alert('Text muss mindestens 50 und maximal 2500 Zeichen lang sein');
    return false;
  }
  return true;
};

const disable_settings  = () => {
  settings_disabled = !settings_disabled;
  const settings = document.querySelectorAll('.settings');

  settings.forEach((setting)=>{
    if (settings_disabled) {
      setting.setAttribute("disabled", "true");
    } else {
      setting.removeAttribute("disabled");
    }
  })
 
};
// start und pause der Textanimation
const start = () => {
  disable_settings();
  clearTimeout(timeoutId);
  
  btnPause.hidden = false;
  btnStop.hidden = false;
  btnStart.hidden = true;

  if (index === 0) {
    words = textField.textContent.split(" ");
  }

  animationPaused = false;

  const highlightedWord = document.querySelector('.highlight');
  if (highlightedWord) {
    highlightedWord.classList.remove('paused');
  }
  
  highlightNextWord(); 
};

const highlightNextWord = () => {
  if (animationPaused ) {
    return; 
  }

  if (index >= words.length) {
    btnPause.hidden = true;
    btnStop.hidden = true;
    btnStart.hidden = false;
    index = 0;
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

  
  timeoutId = setTimeout(highlightNextWord, calculateSpeed());
};



const calculateSpeed = () => {
  const speed = speedChanger.value;
  return  Math.max(500, 4000 - speed * 30);
}

const stop = () => {
  animationPaused = true; 
  clearTimeout(timeoutId);
  index = 0; 
  textField.innerHTML = words.join(" ");
  btnPause.hidden = true;
  btnStop.hidden = true;
  btnStart.hidden = false;
  disable_settings();
  
}

const pause = () => {
  if (animationPaused) {
   
    animationPaused = false;
    btnPause.innerHTML = 'Pause';
    highlightNextWord();
  } else {
    
    animationPaused = true;
    clearTimeout(timeoutId); 
    const highlightedWord = document.querySelector('.highlight');
    if (highlightedWord) {
      highlightedWord.classList.add('paused');
    }
    btnPause.innerHTML = 'Weiter';
  }
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




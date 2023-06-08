function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

refs.btnStop.disabled = true;

let timerId = null;

refs.btnStart.addEventListener('click', () => {
    timerId = setInterval(changeBgColor, 1000);
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
});

refs.btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
});


function changeBgColor() {
    document.body.style.backgroundColor = getRandomHexColor();   
}



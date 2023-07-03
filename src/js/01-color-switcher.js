const page = document.querySelector('body');
let timerId = null;
page.children[2].disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

page.addEventListener('click', changeColor);
page.addEventListener('click', stopChangeColor);

function changeColor(evt) {
  if (evt.target.dataset.hasOwnProperty('start')) {
    page.style.backgroundColor = getRandomHexColor();
    page.children[2].disabled = false;
    page.children[1].disabled = true;

    timerId = setInterval(() => {
      page.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
}

function stopChangeColor(evt) {
  if (evt.target.dataset.hasOwnProperty('stop')) {
    clearInterval(timerId);
    page.children[2].disabled = true;
    page.children[1].disabled = false;
  }
}
0
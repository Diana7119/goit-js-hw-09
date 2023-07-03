import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStartEl = document.querySelector('[data-start]');
const dataDaysEl = document.querySelector('[data-days]');
const dataHoursEl = document.querySelector('[data-hours]');
const dataMinutesEl = document.querySelector('[data-minutes]');
const dataSecondsEl = document.querySelector('[data-seconds]');

btnStartEl.disabled = true;
let selectedDate;
let timer;
let timerId;
const dateNow = new Date().getTime();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0].getTime();
    if (selectedDate >= dateNow) {
      btnStartEl.disabled = false;
      timer = selectedDate - dateNow;
    } else {
      btnStartEl.disabled = true;
      window.alert('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function timerStart() {
  const dateObj = convertMs(timer);
  if (timerId) {
    clearInterval(timerId);
  }

  dataDaysEl.textContent = addLeadingZero(`${dateObj.days}`);
  dataHoursEl.textContent = addLeadingZero(`${dateObj.hours}`);
  dataMinutesEl.textContent = addLeadingZero(`${dateObj.minutes}`);
  dataSecondsEl.textContent = addLeadingZero(`${dateObj.seconds}`);

  timerId = setInterval(() => {
    dataDaysEl.textContent = addLeadingZero(`${dateObj.days}`);
    if (dataDaysEl.textContent === '-1') {
      dataDaysEl.textContent = '00';
    }

    dataHoursEl.textContent = addLeadingZero(`${dateObj.hours}`);
    if (dataHoursEl.textContent === '-1') {
      dataHoursEl.textContent = '23';
    }

    dataMinutesEl.textContent = addLeadingZero(`${dateObj.minutes}`);
    if (dataMinutesEl.textContent === '-1') {
      dataMinutesEl.textContent = '59';
    }

    dataSecondsEl.textContent = addLeadingZero(
      (dataSecondsEl.textContent - 1).toString()
    );
    if (dataSecondsEl.textContent === '-1') {
      dataSecondsEl.textContent = '59';
    }

    if (
      dataDaysEl.textContent === '00' &&
      dataHoursEl.textContent === '00' &&
      dataMinutesEl.textContent === '00' &&
      dataSecondsEl.textContent === '00'
    ) {
      clearInterval(timerId);
    }
  }, 1000);
  console.log(timerId);
}

btnStartEl.addEventListener('click', timerStart);

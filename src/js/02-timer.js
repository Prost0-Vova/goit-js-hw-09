import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateTimePicker: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
Notiflix.Report.info('Reminder', 'Please select a date and press Start', 'Okay');

let targetDate = null;
let countInterval = null;


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}



const startTimer = () => {
  const currentDate = new Date();
  const remainingTime = targetDate - currentDate;

  if (remainingTime < 0) {
    clearInterval(countInterval);
    refs.startBtn.disabled = true;
    refs.dateTimePicker.disabled = false;

    Notiflix.Notify.failure('Please choose a date in the future');
    return;

 }
  const time = convertMs(remainingTime);
  const { days, hours, minutes, seconds } = time;

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

const startCount = () => {
  targetDate = new Date(refs.dateTimePicker.value);
  countInterval = setInterval(startTimer, 1000)
  refs.startBtn.disabled = true;
  refs.dateTimePicker.disabled = true;

}


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





flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
  },
});


refs.startBtn.addEventListener('click', startCount);
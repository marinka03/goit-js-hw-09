import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputDate = document.querySelector("input[type='text']");
const btn = document.querySelector("button[data-start]");

const days = document.querySelector("span[data-days]");
const hours = document.querySelector("span[data-hours]");
const minutes = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");

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


btn.addEventListener("click", onClick);
btn.setAttribute("disabled", "true");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < Date.now()){
            console.log(selectedDates[0]);
            return window.alert("Please choose a date in the future")
        }else{
            btn.removeAttribute("disabled");
            console.dir("Date from input " + inputDate.value );//Date from input
        }
    },
  };

flatpickr(inputDate, options);

let timerId;
let inputTimeFuture;
let distance;


function addLeadingZero(object){
    return Object.keys(object).reduce((acc, item, id, array)=> {
        return {...acc, [item]: String(object[item]).padStart(2, "0")}
    }, {})
}


function onClick(evt){
    btn.setAttribute("disabled", "true");
    inputDate.setAttribute("disabled", "true");

    timerId = setInterval(() => {
        let currentTime = new Date();
        inputTimeFuture = new Date(inputDate.value).getTime();

        distance = inputTimeFuture - currentTime;

        days.textContent = addLeadingZero(convertMs(distance)).days;
        hours.textContent = addLeadingZero(convertMs(distance)).hours;
        minutes.textContent = addLeadingZero(convertMs(distance)).minutes;
        seconds.textContent = addLeadingZero(convertMs(distance)).seconds

        if(distance < 1000){
            seconds.textContent = "0";
            btn.removeAttribute("disabled");
            inputDate.removeAttribute("disabled");
            window.alert("The countdown is complete");

            clearInterval(timerId);
        }
    }, 1000);

}
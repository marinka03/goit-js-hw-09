function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const body = document.querySelector("body");
const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");

btnStop.setAttribute("disabled", "true");
btnStart.addEventListener("click", onClickStart);

let changeColor;

function onClickStart(evt){
    btnStart.setAttribute("disabled", "true");
    btnStop.removeAttribute("disabled");
    
    changeColor = setInterval(()=> {
        let color = getRandomHexColor();
        body.style.backgroundColor = color;
    },1000);
}

btnStop.addEventListener("click", () => {
    clearInterval(changeColor);
    btnStart.removeAttribute("disabled");
    btnStop.setAttribute("disabled", "true");
});

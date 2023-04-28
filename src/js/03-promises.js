import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener("submit", onSubmit);

function createPromise(position, currentDelay, step) {
  const shouldResolve = Math.random() > 0.3;
  let delay = currentDelay + step * position;

  const promise = new Promise((resolve, reject) => {
    setTimeout(()=>{
      if (shouldResolve) {
        resolve ({position, delay})
      } else {
        reject ({position, delay})
      }
    }, delay);
  });

  promise.then(({position, delay}) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay} ms`);
  })
  .catch(({position, delay}) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position + 1} in ${delay} ms`);
  });
}

function onSubmit(evt){
  evt.preventDefault();
  const arrayInput = [...form].filter((item)=>{
    return item.type === "number"
  });

  const obj = {};

  for (const item of arrayInput) {
    obj[item.name] = item.value;
  }
    
  const {delay, step, amount} = obj;
  let currentDelay = +delay;
  let currentStep = +step;
  
  for(let i = 0; i < amount; i++){
    createPromise(i, currentDelay, currentStep);
  }
}
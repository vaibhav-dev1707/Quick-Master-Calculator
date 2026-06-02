function press(val) {
  document.getElementById("display").value += val;
}

function calculate(){
  let result = document.getElementById("display").value;

  try{
    result = result.replace(/÷/g, '/');
    result = result.replace(/%/g, '/100');

    result = result.replace(/sin/g, 'Math.sin');
    result = result.replace(/cos/g, 'Math.cos');
    result = result.replace(/tan/g, 'Math.tan');

    result = result.replace(/cosec/g, '1/Math.sin');
    result = result.replace(/sec/g, '1/Math.cos');
    result = result.replace(/cot/g, '1/Math.tan');

    document.getElementById("display").value = eval(result);
  }
  catch{
    document.getElementById("display").value = "Error";
  }
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function backspace(){
  let current = document.getElementById("display").value;
  document.getElementById("display").value = current.slice(0, -1);
}

function addBracket() {
  let display = document.getElementById("display");
  let value = display.value;

  let open = (value.match(/\(/g) || []).length;
  let close = (value.match(/\)/g) || []).length;

  if (open > close) {
    display.value += ")";
  } else {
    display.value += "(";
  }
}

function toggleSign(){
  let display = document.getElementById("display");

  if(display.value !== "") {
    display.value = eval(display.value) * -1;
  }
}

function squareRoot(){
  let display = document.getElementById("display");

  if(display.value !== ""){
    display.value = Math.sqrt(eval(display.value));
  }
}

function toggleScientific() {
  let sci = document.getElementById("scientific");
  let btn = document.querySelector(".toggle-btn");

  sci.classList.toggle("show");

  if(sci.classList.contains("show")){
    btn.innerText = "⌃";
  }else{
    btn.innerText = "⌄";
  }
}
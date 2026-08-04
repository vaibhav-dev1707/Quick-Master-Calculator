const display = document.getElementById("display");

let memory = 0;
let lastAnswer = 0;
let degreeMode = true;

function press(value) {

    if (display.value === "0" || display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "0";
}

function backspace() {

    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } 
    else {
        display.value = "0";
    }

}

function answer() {

    display.value += lastAnswer;

}

function toggleSign() {

    if (display.value.startsWith("-")) {
        display.value = display.value.substring(1);
    } else {
        display.value = "-" + display.value;
    }


    let value = Number(display.value);

    display.value = (-value).toString();


}

function randomNumber() {

    display.value = Math.random();

}

function memoryAdd() {

    memory += Number(display.value);

}


function memorySub() {

    memory -= Number(display.value);

}

function memoryRecall() {

    display.value = memory;

}

function memoryClear() {

    memory = 0;

}

function addBracket() {
    let openCount = (display.value.match(/\(/g) || []).length;
    let closeCount = (display.value.match(/\)/g) || []).length;

    if (openCount > closeCount) {
        display.value += ")";
    } else {
        display.value += "(";
    }
}

const radios = document.querySelectorAll('input[name="mode"]');


radios.forEach(radio => {

    radio.addEventListener("change", () => {

        degreeMode = radios[0].checked;

    });

});


function toRadians(value) {

    return degreeMode ? value * Math.PI / 180 : value;

}

document.addEventListener("keydown", function(event){

    let key = event.key;


    if (!isNaN(key)) {

        press(key);
        return;

    }


    switch(key){

        case "+":
        case "-":
        case "*":
        case "/":
        case ".":
        case "(":
        case ")":

            press(key);
            break;


        case "Backspace":

            backspace();
            break;


        case "Delete":

            clearDisplay();
            break;


        case "Enter":

            calculate();
            break;

    }

});

function factorialInline(n) {

function factorial(n){

    n = Number(n);

    if(n < 0)
        return NaN;

    let result = 1;

    for(let i = 1; i <= n; i++){

        result *= i;

    }

    return result;

}

function calculate(){

    try{

        let exp = display.value;

        exp = exp.replace(/×/g,"*");
        exp = exp.replace(/÷/g,"/");
        exp = exp.replace(/\^/g,"**");

        exp = exp.replace(/π/g,Math.PI);
        exp = exp.replace(/\be\b/g,Math.E);

        exp = exp.replace(/sin\((.*?)\)/g,
            (_,x)=>Math.sin(toRadians(Number(x)))
        );

        exp = exp.replace(/cos\((.*?)\)/g,
            (_,x)=>Math.cos(toRadians(Number(x)))
        );

        exp = exp.replace(/tan\((.*?)\)/g,
            (_,x)=>Math.tan(toRadians(Number(x)))
        );

        exp = exp.replace(/sqrt\((.*?)\)/g,
            (_,x)=>Math.sqrt(Number(x))
        );

        exp = exp.replace(/log\((.*?)\)/g,
            (_,x)=>Math.log10(Number(x))
        );

        exp = exp.replace(/ln\((.*?)\)/g,
            (_,x)=>Math.log(Number(x))
        );

        exp = exp.replace(/(\d+)!/g,
            (_,x)=>factorial(x)
        );

        exp = exp.replace(/cbrt\(([^()]*)\)/g,
            (_, x) => Math.cbrt(Number(x))
        );

        exp = exp.replace(/log\(([^()]*)\)/g,
            (_, x) => Math.log10(Number(x))
        );

        exp = exp.replace(/ln\(([^()]*)\)/g,
            (_, x) => Math.log(Number(x))
        );

        exp = exp.replace(/(\d+(\.\d+)?)²/g,
            (_, x) => Math.pow(Number(x), 2)
        );

        exp = exp.replace(/(\d+(\.\d+)?)³/g,
            (_, x) => Math.pow(Number(x), 3)
        );

        exp = exp.replace(/(\d+)!/g,
            (_, x) => factorialInline(Number(x))
        );

        exp = exp.replace(/1\/(\d+(\.\d+)?)/g,
            (_, x) => 1 / Number(x)
        );

        exp = exp.replace(/10\^([^)]+)/g,
            (_, x) => Math.pow(10, Number(x))
        );

        exp = exp.replace(/exp\(([^()]*)\)/g,
            (_, x) => Math.exp(Number(x))
        );

        exp = exp.replace(/(\d+)yroot(\d+)/g,
            (_, y, x) => Math.pow(Number(x), 1 / Number(y))
        );

        exp = exp.replace(
            /(\d+(\.\d+)?)EXP(-?\d+)/g,
            (_, value, d, exponent) =>
                Number(value) * Math.pow(10, Number(exponent))
        );

        let result = eval(exp);

        display.value = result;

        lastAnswer = result;


    }

    catch{

        display.value="Error";

    }

}

function squareRoot() {
    try {
        display.value = Math.sqrt(eval(display.value));
    } catch {
        display.value = "Error";
    }
}

function power() {

function squareRoot(){

    display.value = Math.sqrt(Number(display.value));

}

function power(){

    display.value += "**";

}

function addBracket(){

    display.value += "()";

}

function toggleScientific() {

function toggleScientific(){

    let sci = document.getElementById("scientific");

    if(sci.style.display==="none"){

        sci.style.display="grid";

    }
    else{

        sci.style.display="none";

            }

        }

      }
   }
}
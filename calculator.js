const display = document.getElementById("display");

function press(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function addBracket() {
    let value = display.value;

    let open = (value.match(/\(/g) || []).length;
    let close = (value.match(/\)/g) || []).length;

    if (open > close) {
        display.value += ")";
    } else {
        display.value += "(";
    }
}

function toggleSign() {
    if (display.value !== "") {
        display.value = eval(display.value) * -1;
    }
}

function squareRoot() {
    if (display.value !== "") {
        display.value = Math.sqrt(eval(display.value));
    }
}

function factorial() {

    if (display.value === "") return;

    let n = Number(eval(display.value));

    if (n < 0 || !Number.isInteger(n)) {
        display.value = "Error";
        return;
    }

    let fact = 1;

    for (let i = 2; i <= n; i++) {
        fact *= i;
    }

    display.value = fact;
}

function calculate() {

    let result = display.value;

    try {

        result = result.replace(/÷/g, "/");
        result = result.replace(/×/g, "*");

        result = result.replace(/%/g, "/100");

        // Scientific Functions
        result = result.replace(/cosec\(/g, "(1/Math.sin(");
        result = result.replace(/sec\(/g, "(1/Math.cos(");
        result = result.replace(/cot\(/g, "(1/Math.tan(");

        result = result.replace(/sin\(/g, "Math.sin(");
        result = result.replace(/cos\(/g, "Math.cos(");
        result = result.replace(/tan\(/g, "Math.tan(");

        result = result.replace(/ln\(/g, "Math.log(");
        result = result.replace(/log\(/g, "Math.log10(");

        display.value = eval(result);

    }

    catch {

        display.value = "Error";

    }

}

function toggleScientific() {

    let sci = document.getElementById("scientific");
    let btn = document.querySelector(".toggle-btn");

    sci.classList.toggle("show");

    if (sci.classList.contains("show")) {

        btn.innerText = "⌃";

    }

    else {

        btn.innerText = "⌄";

    }

}
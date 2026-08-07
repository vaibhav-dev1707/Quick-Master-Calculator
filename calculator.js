let expression = "0";
let memory = 0;
let lastAnswer = 0;

const display = () => document.getElementById('display');

function updateDisplay() {
  display().value = expression;
}

function sinD(x) { return Math.sin(x * Math.PI / 180); }
function cosD(x) { return Math.cos(x * Math.PI / 180); }
function tanD(x) { return Math.tan(x * Math.PI / 180); }
function asinD(x) { return Math.asin(x) * 180 / Math.PI; }
function acosD(x) { return Math.acos(x) * 180 / Math.PI; }
function atanD(x) { return Math.atan(x) * 180 / Math.PI; }

function factorial(n) {
  n = Math.round(n);
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function isDegreeMode() {
  const radios = document.querySelectorAll('input[name="mode"]');

  return radios.length > 0 ? radios[0].checked : true;
}

function formatNumber(num) {
  if (!isFinite(num)) return "Error";
  if (Number.isInteger(num)) return num.toString();
  return parseFloat(num.toPrecision(12)).toString();
}

function preprocess(expr) {
  let s = expr;

  s = s.replace(/([0-9]*\.?[0-9]+)ʸ√([0-9]*\.?[0-9]+)/g, "Math.pow($2,1/($1))");

  s = s.split('Ans').join('(' + lastAnswer + ')');

  s = s.split('exp(').join('§EXPFN§');

  s = s.replace(/e/g, 'Math.E');

  s = s.split('§EXPFN§').join('Math.exp(');

  s = s.split('EXP').join('e');

  s = s.split('π').join('Math.PI');

  const deg = isDegreeMode();
  s = s.split('asin(').join(deg ? 'asinD(' : 'Math.asin(');
  s = s.split('acos(').join(deg ? 'acosD(' : 'Math.acos(');
  s = s.split('atan(').join(deg ? 'atanD(' : 'Math.atan(');
  s = s.split('sin(').join(deg ? 'sinD(' : 'Math.sin(');
  s = s.split('cos(').join(deg ? 'cosD(' : 'Math.cos(');
  s = s.split('tan(').join(deg ? 'tanD(' : 'Math.tan(');

  s = s.split('sqrt(').join('Math.sqrt(');
  s = s.split('cbrt(').join('Math.cbrt(');
  s = s.split('ln(').join('Math.log(');
  s = s.split('log(').join('Math.log10(');

  s = s.split('^').join('**');

  s = s.split('²').join('**2');
  s = s.split('³').join('**3');

  s = s.replace(/([0-9]*\.?[0-9]+)!/g, 'factorial($1)');

  s = s.replace(/([0-9]*\.?[0-9]+)%/g, '($1/100)');

  return s;
}

function safeEval(expr) {
  const s = preprocess(expr);

  const fn = new Function(
    'Math', 'sinD', 'cosD', 'tanD', 'asinD', 'acosD', 'atanD', 'factorial',
    `"use strict"; return (${s});`
  );
  const result = fn(Math, sinD, cosD, tanD, asinD, acosD, atanD, factorial);
  if (typeof result !== 'number' || isNaN(result)) throw new Error('Math Error');
  return result;
}

function press(val) {
  if (expression === "Error") expression = "0";

  let token = val;
  if (val === 'yroot') token = 'ʸ√';

  if (expression === "0" && !"+-*/^".includes(token[0])) {
    expression = token;
  } else {
    expression += token;
  }
  updateDisplay();
}

function calculate() {
  try {
    const result = safeEval(expression);
    lastAnswer = result;
    expression = formatNumber(result);
  } catch (e) {
    expression = "Error";
  }
  updateDisplay();
}

function clearDisplay() {
  expression = "0";
  updateDisplay();
}

function backspace() {
  if (expression === "Error" || expression.length <= 1) {
    expression = "0";
  } else {
    expression = expression.slice(0, -1);
    if (expression === "") expression = "0";
  }
  updateDisplay();
}

function toggleSign() {
  if (expression === "0") return;
  if (expression.startsWith('-')) {
    expression = expression.slice(1);
  } else {
    expression = '-' + expression;
  }
  updateDisplay();
}

function randomNumber() {
  expression = Math.random().toString();
  updateDisplay();
}

function answer() {
  if (expression === "0") {
    expression = "Ans";
  } else {
    expression += "Ans";
  }
  updateDisplay();
}

function memoryAdd() {
  try {
    memory += safeEval(expression);
  } catch (e) {}
}

function memorySub() {
  try {
    memory -= safeEval(expression);
  } catch (e) {}
}

function memoryRecall() {
  const val = formatNumber(memory);
  if (expression === "0") {
    expression = val;
  } else {
    expression += val;
  }
  updateDisplay();
}

document.addEventListener('DOMContentLoaded', updateDisplay);
let screen = document.getElementById("screen");
let buttons = document.querySelectorAll("button");

function appendValue(value) {
screen.value += value;
}

function calculate() {
try {
let expression = screen.value;
if (!expression) return;
if (!/^[0-9+\-*/.() ]+$/.test(expression)) throw Error();
let result = Function("return " + expression)();
if (result === Infinity || result === -Infinity) throw Error();
screen.value = result;
} catch {
screen.value = "Error";
setTimeout(() => screen.value = "", 1000);
}
}

function clearScreen() {
screen.value = "";
}

buttons.forEach(btn => {
btn.addEventListener("click", () => {
let value = btn.getAttribute("data-value");
if (btn.id === "equals") calculate();
else if (btn.id === "clear") clearScreen();
else if (value) appendValue(value);
});
});

document.addEventListener("keydown", (e) => {
if ((e.key >= "0" && e.key <= "9") || "+-*/.".includes(e.key)) {
appendValue(e.key);
} else if (e.key === "Enter") {
calculate();
} else if (e.key === "Backspace") {
screen.value = screen.value.slice(0, -1);
} else if (e.key === "Escape") {
clearScreen();
}
});
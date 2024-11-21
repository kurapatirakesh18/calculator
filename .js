// script.js
document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".current-input");
  let currentInput = "0";
  let operator = null;
  let previousValue = null;

  const updateDisplay = () => {
    display.textContent = currentInput;
  };

  const handleNumber = (number) => {
    if (currentInput === "0" || operator === "=") {
      currentInput = number;
    } else {
      currentInput += number;
    }
    updateDisplay();
  };

  const handleOperator = (op) => {
    if (operator && previousValue !== null) {
      currentInput = calculate();
      updateDisplay();
    }
    operator = op;
    previousValue = currentInput;
    currentInput = "0";
  };

  const handleDelete = () => {
    currentInput = currentInput.slice(0, -1) || "0";
    updateDisplay();
  };

  const handleReset = () => {
    currentInput = "0";
    operator = null;
    previousValue = null;
    updateDisplay();
  };

  const calculate = () => {
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentInput);

    switch (operator) {
      case "+":
        return (prev + curr).toString();
      case "-":
        return (prev - curr).toString();
      case "*":
        return (prev * curr).toString();
      case "/":
        return curr !== 0 ? (prev / curr).toString() : "Error";
      default:
        return currentInput;
    }
  };

  const handleEqual = () => {
    if (operator && previousValue !== null) {
      currentInput = calculate();
      operator = "=";
      previousValue = null;
      updateDisplay();
    }
  };

  // Event Listeners for buttons
  document.querySelector(".keypad").addEventListener("click", (event) => {
    const target = event.target;
    const action = target.getAttribute("data-action");

    if (!action) return;

    if (action === "number") {
      handleNumber(target.textContent);
    } else if (action === "operator") {
      handleOperator(target.textContent);
    } else if (action === "delete") {
      handleDelete();
    } else if (action === "reset") {
      handleReset();
    } else if (action === "equal") {
      handleEqual();
    }
  });
});

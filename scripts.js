const buttonValues = [
    "AC", "+/-", "%", "÷", 
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
];
const rightSymbols = ["÷", "×", "-", "+", "="];
const topSymbols = ["AC", "+/-", "%"];

const display = document.getElementById("display");

//A+B, A×B, A-B, A÷B
let A = 0;               // Stores the first number (e.g., 7 in "7 + 3"). Starts as 0 for default safety.
let operator = null;     // Stores the chosen operator (+, -, ×, ÷). Starts as null because nothing's selected yet.
let B = null;            // Stores the second number (e.g., 3 in "7 + 3"). Will be set after the operator is chosen.

function clearAll() {
    A=0;
    operator=null;
    B=null;
}

for (let i = 0; i < buttonValues.length; i++) {  // Loop through all button values in the array
    let value = buttonValues[i];                 // Get the current value (e.g., "7", "+", "=")
    let button = document.createElement("button"); // Create a new <button> element in HTML
    button.innerText = value;                    // Set the text shown on the button

    // --- Styling the buttons ---
    if (value == "0") {                          // Special styling for the "0" button
        button.style.width = "180px";            // Make it wider
        button.style.gridColumn = "span 2";      // Make it take up 2 columns in the layout
    }

    if (rightSymbols.includes(value)) {          // If it's an operator like "+", "-", "="
        button.style.backgroundColor = "#FF9500"; // Make it orange
    } 
    else if (topSymbols.includes(value)) {       // If it's a top function like "AC", "+/-", "%"
        button.style.backgroundColor = "#D4D4D2"; // Light gray background
        button.style.color = "#1C1C1C";          // Dark text color
    }

    // --- Add click event to each button ---
    button.addEventListener("click", function() {
        if (rightSymbols.includes(value)) {       // If user clicked an operator or "="
            if (value == "=") {                   // If "=" was clicked
                if (A != null) {                  // Only calculate if A is set
                    B = display.value;            // Get second number from the display
                    let numA = Number(A);         // Convert A to number
                    let numB = Number(B);         // Convert B to number

                    // Perform the math based on the selected operator
                    if (operator == "÷") {
                        display.value = numA / numB;
                    }
                    else if (operator == "×") {
                        display.value = numA * numB;
                    }
                    else if (operator == "-") {
                        display.value = numA - numB;
                    }
                    else if (operator == "+") {
                        display.value = numA + numB;
                    }

                    clearAll(); // Reset A, B, and operator after calculation
                }
            } 
            else {                                // If an operator (not "=") was clicked
                operator = value;                 // Store the operator
                A = display.value;                // Store the first number
                display.value = "";               // Clear the display for the second number
            }
        }

        else if (topSymbols.includes(value)) {    // If user clicked "AC", "+/-", or "%"
            if (value == "AC") {                  // Clear button
                clearAll();                       // Reset all values
                display.value = "";               // Clear the display
            }
            else if (value == "+/-") {            // Change sign button
                if (display.value != "" && display.value != "0") {
                    if (display.value[0] == "-") {       // If number is negative
                        display.value = display.value.slice(1); // Remove "-"
                    }
                    else {                                // If number is positive
                        display.value = "-" + display.value;    // Add "-"
                    }
                }
            }
            else if (value == "%") {              // Percentage button
                display.value = Number(display.value) / 100; // Divide by 100
            }    
        }

        else { // --- If it's a number or a decimal point ---
            if (value == ".") {                   // Handle decimal point
                if (display.value != "" && !display.value.includes(value)) {
                    display.value += value;       // Add "." if not already there
                }
            }
            else if (display.value == "0") {      // If display shows "0"
                display.value = value;            // Replace with new number
            }
            else {
                display.value += value;           // Append number to current input
            }
        }
    });

    //add buttons to calculator 
    document.getElementById("buttons").appendChild(button); // Find the element with id "buttons" and insert the new button element into it
}


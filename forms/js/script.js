// ASSIGN GLOBAL VARIABLES
// !-----------EMAIL CONFIG------------------

const form = document.querySelector("form");

// Basic Info Elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameHint = document.getElementById("name-hint");
const emailErrorHint = document.getElementById("email-hint");
const selectJobRole = document.getElementById("title");
const inputOtherJobRole = document.getElementById("other-job-role");

// T-shirt Info Elements
const selectDesign = document.getElementById("design");
const selectColor = document.getElementById("color");
const colorOptions = selectColor.getElementsByTagName("option");

// Activities Elements
const activitiesFieldset = document.getElementById("activities");
const activitiesBox = document.getElementById("activities-box");
const activitiesCheckbox = document.querySelectorAll("#activities input");
const activitiesTotalCost = document.getElementById("activities-cost");
const activitiesLegend = document.getElementsByTagName("legend");


// Payment Info Elements
const paymentSelect = document.getElementById("payment");
const creditCardInfo = document.getElementById("credit-card");
const inputCreditCard = document.getElementById("cc-num");
const inputZip = document.getElementById("zip");
const inputCVV = document.getElementById("cvv");
const infoBitcoin = document.getElementById("bitcoin");
const infoPaypal = document.getElementById("paypal");
/************************************************
 * SET DEFAULT OPTIONS AND SETTING ON PAGE LOAD *
 ************************************************/

window.addEventListener("load", () => {
  //Set focus on Name field
  nameInput.focus();
  // Hide other job role input
  inputOtherJobRole.style.visibility = "hidden";
  // Disable color selection until after a Design is selected
  selectColor.disabled = true;
  // Auto select Credit Card option as default
  paymentSelect[1].selected = true;
  // Auto hide Paypal and Bitcoin information until selected
  creditCardInfo.style.display = "block";
  infoBitcoin.style.display = "none";
  infoPaypal.style.display = "none";
  // Set max number of characters for Name field to 30
  emailInput.setAttribute("maxLength", 30);
  // Set max number of characters for CVV field to 3
  inputCVV.setAttribute("maxLength", 3);
  // Set max number of characters for ZIP field to 5
  inputZip.setAttribute("maxLength", 5);
  // Set max number of characters for Credit Card input to 16
  inputCreditCard.setAttribute("maxLength", 16);
});

/*********************
 * BASIC INFO SECTION *
 *********************/

// Event Listener to toggle Other Role input field on request

selectJobRole.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    inputOtherJobRole.style.visibility = "visible";
  } else {
    inputOtherJobRole.style.visibility = "hidden";
  }
});

/*********************
 * T - SHIRT SECTION *
 *********************/

// Event listener for T-Shirt Info changes
selectDesign.addEventListener("change", (e) => {
  //Enable color selection after Design is selected
  selectColor.disabled = false;

  //Loop through colors and select only Design specific colors
  //Auto select a color from the Design specific color for placeholder
  for (let i = 0; i < colorOptions.length; i++) {
    if (e.target.value == colorOptions[i].dataset.theme) {
      colorOptions[i].hidden = false;
      colorOptions[i].selected = true;
    } else {
      colorOptions[i].hidden = true;
      colorOptions[i].selected = false;
    }
  }
});

/**********************
 * ACTIVITIES SECTION *
 **********************/

let totalCost = 0; // Set variable to hold total cost

// Add change event listener on activities fieldset
activitiesFieldset.addEventListener("change", (e) => {
  const selectedActivity = e.target;
  const selectedActivityCost = +e.target.dataset.cost;
  const selectedActivityTime = e.target.dataset.dayAndTime;
  const selectedActivityName = e.target.getAttribute("name");

  for (let i = 0; i < activitiesCheckbox.length; i++) {
    const activity = activitiesCheckbox[i];
    const activityName = activity.getAttribute("name");
    const activityTime = activity.dataset.dayAndTime;

    // Do not include selected activity
    if (selectedActivityName != activityName) {
      // Check for any time conflicts with other activities
      if (selectedActivityTime === activityTime) {
        // Dynamic handling of diabling conflicts
        if (selectedActivity.checked) {
          activity.disabled = true;
          activity.parentElement.classList.add("disabled");
        } else {
          activity.disabled = false;
          activity.parentElement.classList.remove("disabled");
        }
      }
    }
  }

  // Add conditions to add or remove cost and render total amount
  if (e.target.checked) {
    totalCost += selectedActivityCost;
    activitiesTotalCost.textContent = `Total: Rs.${totalCost}`;
  } else if (!e.target.checked) {
    totalCost -= selectedActivityCost;
    activitiesTotalCost.textContent = `Total: Rs.${totalCost}`;
  }
  isActivitySelected();
});

/************************
 * PAYMENT INFO SECTION *
 ************************/

// Show only Bitcoin or Paypal info if Selected
paymentSelect.addEventListener("change", (e) => {
  if (e.target.value === "paypal") {
    creditCardInfo.style.display = "none";
    infoBitcoin.style.display = "none";
    infoPaypal.style.display = "block";
  } else if (e.target.value === "bitcoin") {
    creditCardInfo.style.display = "none";
    infoBitcoin.style.display = "block";
    infoPaypal.style.display = "none";
  } else if (e.target.value === "credit-card") {
    creditCardInfo.style.display = "block";
    infoBitcoin.style.display = "none";
    infoPaypal.style.display = "none";
  }
});

/***************************
 * FORM VALIDATION SECTION *
 ***************************/

// ** GENERAL FORM VALIDATION ** HELPER FUNCTIONS

function validated(e) {
  // Remove error messages and alerts
  e.parentElement.classList.add("valid");
  e.parentElement.classList.remove("not-valid");
  e.parentElement.lastElementChild.style.display = "none";
}

function notValidated(e) {
  // Add error messages and alers
  e.parentElement.classList.add("not-valid");
  e.parentElement.classList.remove("valid");
  e.parentElement.lastElementChild.style.display = "block";
}
// ** ACTIVITIES SECTION ONLY ** HELPER FUNCTIONS

function activitiesValidated(e) {
  // Remove error messages and alerts
  activitiesLegend[2].classList.add("valid");
  activitiesLegend[2].classList.remove("not-valid");
  e.parentElement.lastElementChild.style.display = "none";
}

function activitiesNotValidated(e) {
  // Add error messages and alerts
  activitiesLegend[2].classList.add("not-valid");
  activitiesLegend[2].classList.remove("valid");
  e.parentElement.lastElementChild.style.display = "block";
}

// ** NAME VALIDATION ** HELPER FUNCTION

function isNameValid() {
  const regexName = /^[a-zA-Z ]{1,30}$/.test(nameInput.value);
  if (!regexName) {
    notValidated(nameInput);
  } else {
    validated(nameInput);
  }
  return regexName;
}

// ** EMAIL VALIDATION ** HELPER FUNCTION

function isEmailValid() {
  const validated = /^[^@]+@[^@]+\.[a-z]+$/i.test(emailInput.value);

  if (!validated) {
    emailInput.parentElement.classList.add("not-valid");
    emailInput.parentElement.classList.remove("valid");

    if (emailInput.value === "") {
      emailErrorHint.innerHTML = "A valid email address is required";
    } else if (!emailInput.value.includes("@")) {
      emailErrorHint.innerHTML =
        "An @ symbol is required for a valid email address";
    } else {
      emailErrorHint.innerHTML =
        "Email must be properly formated (i.e user@somewhere.com)";
    }

    emailErrorHint.style.display = "block";
    return validated;
  } else if (validated) {
    emailInput.parentElement.classList.add("valid");
    emailInput.parentElement.classList.remove("not-valid");
    emailErrorHint.style.display = "none";
  }
  return validated;
}

// ** ACTIVITIES VALIDATION ** HELPER FUNCTION
// If total cost of activities is greater than 0 an activity has been selected.

let activitySelected = false;
function isActivitySelected() {
  if (!totalCost) {
    activitiesNotValidated(activitiesBox);
    activitySelected = false;
  } else {
    activitiesValidated(activitiesBox);
    activitySelected = true;
  }
  return activitySelected;
}

// ** CREDIT CARD VALIDATION ** HELPER FUNCTION
// Check Credit Card number validation only if Credit Card option selected

function isCreditCardValid() {
  let isValid = true;
  const regexName = /^\d{13,16}$/.test(inputCreditCard.value);
  if (paymentSelect[1].selected === true) {
    if (!regexName || inputCreditCard.value === null) {
      notValidated(inputCreditCard);
      isValid = false;
    } else {
      validated(inputCreditCard);
      isValid = true;
    }
  }
  return isValid;
}

//** ZIP CODE VALIDATION ** HELPER FUNCTION */
// Check "Zip Code" field has only 5 digits

function isZipValid() {
  let isValid = true;
  const regexZip = /^\d{5}$/.test(inputZip.value);
  if (paymentSelect[1].selected === true) {
    if (!regexZip || inputZip.value === null) {
      notValidated(inputZip);
      isValid = false;
    } else {
      validated(inputZip);
      isValid = true;
    }
  }
  return isValid;
}

//** CCV VALIATION ** HELPER FUNCTION */
// Check "CVV" field has 3 digits
function isCVVValid() {
  let isValid = true;
  const regexCVV = /^\d{3}$/.test(inputCVV.value);
  if (paymentSelect[1].selected === true) {
    if (!regexCVV || inputCVV.value === null) {
      notValidated(inputCVV);
      isValid = false;
    } else {
      validated(inputCVV);
      isValid = true;
    }
  }
  return isValid;
}

/*****************************************************
 * SET EVENT LISTENERS FOR REAL TIME FORM VALIDATION *
 *****************************************************/

// Set realtime input validation for NAME

nameInput.addEventListener("input", () => {
  isNameValid();
});

// Set realtime input validation for EMAIL

emailInput.addEventListener("input", () => {
  isEmailValid();
});

// Set realtime input validation for ACTIONS
// Check validation for Activities to have at least one checked

activitiesTotalCost.addEventListener("change", () => {
  isActivitySelected();
});

// Set realtime input validation for CREDIT CARD

inputCreditCard.addEventListener("input", () => {
  isCreditCardValid();
});

// Set realtime input validation for ZIP CODE
inputZip.addEventListener("input", () => {
  isZipValid();
});

// Sest realtime input validation for CVV
inputCVV.addEventListener("input", () => {
  isCVVValid();
});

/*****************
 * ACCESSIBILITY *
 *****************/

/*
 * Add listener for focus and blur on checkboxes
 * to apply focus class on parent elment
 */

// Loop through all input checkboxes
for (let i = 0; i < activitiesCheckbox.length; i++) {
  const input = activitiesCheckbox[i];
  input.addEventListener("focus", () => {
    // Apply "focus" class when element is in focus
    input.parentElement.classList.add("focus");
  });
  input.addEventListener("blur", () => {
    // Remove "focus" class on blur
    input.parentElement.classList.remove("focus");
  });
}

/********************************
 * FINAL FORM SUBMIT VALIDATION *
 ********************************/

// Get selected payment option
form.addEventListener("submit", (e) => {
  let validated = true;

  // Execute validation helper functions on all changes
  isNameValid();
  isEmailValid();
  isActivitySelected();
  isCreditCardValid();
  isZipValid();
  isCVVValid();

  // Prevent button default if any fields fail validation
  if (
    !isNameValid() ||
    !isEmailValid() ||
    !isActivitySelected() ||
    !isCreditCardValid() ||
    !isZipValid() ||
    !isCVVValid()
  ) {
    e.preventDefault();
  }

  validated = // check if all validation checks passed
    isNameValid() &&
    isEmailValid() &&
    isActivitySelected() &&
    isCreditCardValid() &&
    isZipValid() &&
    isCVVValid();

  if (validated) {
    // refresh the screen automatically if all validations passed
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }

  // Console log for development testing only (Remove for Production)
  console.log("Name Valid : ", isNameValid());
  console.log("Email Valid : ", isEmailValid());
  console.log("Activity Valid : ", isActivitySelected());
  console.log("Credit Card Valid : ", isCreditCardValid());
  console.log("Zip Valid : ", isZipValid());
  console.log("CVV Valid : ", isCVVValid());
});

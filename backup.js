// ASSIGN GLOBAL VARIABLES

const form = document.querySelector('form');

// Basic Info Elements
const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const nameHint = document.getElementById('name-hint');
const selectJobRole = document.getElementById('title');
const inputOtherJobRole = document.getElementById('other-job-role');

// T-shirt Info Elements
const selectDesign = document.getElementById('design');
const selectColor = document.getElementById('color');
const colorOptions = selectColor.getElementsByTagName('option');

// Register for Activities Elements
const activitiesFieldset = document.getElementById('activities');
const activitiesBox = document.getElementById('activities-box');
const activities = document.querySelectorAll('#activities input');
const activitiesTotalCost = document.getElementById('activities-cost');

// Payment Info Elements
const paymentType = document.getElementById('payment');
const infoCreditCard = document.getElementById('credit-card');
const inputCreditCard = document.getElementById('cc-num');
const inputZip = document.getElementById('zip');
const inputCVV = document.getElementById('cvv');
const infoBitcoin = document.getElementById('bitcoin');
const infoPaypal = document.getElementById('paypal');

//BASIC INFO SECTION

//Set focus on Name field
inputName.focus();

// Hide Other Job Role input until selected by user
inputOtherJobRole.style.visibility = 'hidden';
selectJobRole.addEventListener('change', e => {
	if (e.target.value === 'other') {
		inputOtherJobRole.style.visibility = 'visible';
	} else {
		inputOtherJobRole.style.visibility = 'hidden';
	}
});

/*********************
 * T - SHIRT SECTION *
 *********************/

// Disable color selection until after a Design is selected
selectColor.disabled = true;

//Add a change event listener to Design selector
selectDesign.addEventListener('change', e => {
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
activitiesFieldset.addEventListener('change', e => {
	let activityCost = +e.target.dataset.cost;

	// Add conditions to add or remove cost and render total amount
	let totalCost = 0;
	if (e.target.checked) {
		totalCost += activityCost;
		activitiesTotalCost.textContent = `Total: $${totalCost}`;
	} else {
		totalCost -= activityCost;
		activitiesTotalCost.textContent = `Total: $${totalCost}`;
	}
});

/************************
 * PAYMENT INFO SECTION *
 ************************/

// Auto select Credit Card option as default
paymentType[1].selected = true;

// Auto hide Paypal and Bitcoin information until each option is selected
infoBitcoin.style.display = 'none';
infoPaypal.style.display = 'none';

// Show only Bitcoin or Paypal info if Selected
paymentType.addEventListener('change', e => {
	if (e.target.value === 'paypal') {
		infoCreditCard.style.display = 'none';
		infoBitcoin.style.display = 'none';
		infoPaypal.style.display = 'block';
	} else if (e.target.value === 'bitcoin') {
		infoCreditCard.style.display = 'none';
		infoBitcoin.style.display = 'block';
		infoPaypal.style.display = 'none';
	} else {
		infoCreditCard.style.display = 'block';
		infoBitcoin.style.display = 'none';
		infoPaypal.style.display = 'none';
	}
});

/***************************
 * FORM VALIDATION SECTION *
 ***************************/

// Helper Functions

function validated(e) {
	// Remove error messages and alerts
	e.parentElement.classList.add('valid');
	e.parentElement.classList.remove('not-valid');
	e.parentElement.lastElementChild.style.display = 'none';
}

function notValidated(e) {
	// Add error messages and alerts
	e.parentElement.classList.add('not-valid');
	e.parentElement.classList.remove('valid');
	e.parentElement.lastElementChild.style.display = 'block';
}

// Check Validation for Name input (Realtime Validation)

inputName.addEventListener('input', () => {
	isNameValid();
});

function isNameValid() {
	const regexName = /\w/i.test(inputName.value);
	if (!regexName) {
		notValidated(inputName);
	} else {
		validated(inputName);
	}
	return regexName;
}

// Check Validation for Email input (Realtime Validation)
inputEmail.addEventListener('input', () => {
	isEmailValid();
});

function isEmailValid() {
	const regexName = /^[^@]+@[^@]+\.[a-z]+$/i.test(inputEmail.value);
	if (!regexName) {
		notValidated(inputEmail);
	} else {
		validated(inputEmail);
	}
	return regexName;
}

// Check Validation for Activities to have at least one checked
// If total cost of activities is greater than 0 an activity has been selected.
let activitySelected = totalCost > 0;
function isActivitySelected() {
	if (!totalCost) {
		notValidated(activitiesBox);
	} else {
		validated(activitiesBox);
	}
	return activitySelected;
}

// CREDIT CARD VALIDATION

// Add event listener to check realtime input validation
inputCreditCard.addEventListener('input', () => {
	isCreditCardValid();
});
// Check Credit Card number validation only if Credit Card option selected
function isCreditCardValid() {
	const regexName = /^\d{13,16}$/.test(inputCreditCard.value);
	if ((paymentType[1].selected = true)) {
		if (!regexName) {
			notValidated(inputCreditCard);
		} else if (inputCreditCard.value === null) {
			notValidated(inputCreditCard);
		} else {
			validated(inputCreditCard);
		}
	}
	return regexName;
}

// Add event Listener for real time validation of "Zip Code" input
inputZip.addEventListener('input', e => {
	isZipValid(e);
});
// Check "Zip Code" field has only 5 digits
function isZipValid() {
	const regexZip = /^\d{5}$/.test(inputZip.value);
	if (!regexZip || inputZip.value === null) {
		notValidated(inputZip);
	} else {
		validated(inputZip);
	}
	return regexZip;
}

// Add event Listener for real time validation of "CVV" input
inputZip.addEventListener('input', e => {
	isCVVValid(e);
});
// Check "CVV" field has only 3 digits
function isCVVValid() {
	const regexCVV = /^\d{3}$/.test(inputCVV.value);
	if (!regexZip || inputCVV.value === null) {
		notValidated(inputCVV);
	} else {
		validated(inputCVV);
	}
	return regexCVV;
}

// FINAL FORM SUBMIT VALIDATION

// Get selected payment option
form.addEventListener('submit', e => {
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
});

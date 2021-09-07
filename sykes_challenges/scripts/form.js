// GLOBAL VARIABLES
const choices = document.querySelector("#choices");
const promoCheck = document.querySelector("#promo-check");
const modal = document.querySelector("#terms-modal");
const form = document.querySelector("#entry-form");
const success = document.querySelector(".confirmation-msg");

// add novalidate attribute to form when script loads
// if js fails to load html will validate
form.setAttribute("novalidate", true);

// FUNCTIONS

// validate input fields using constraint api
const getErrors = (field) => {
	if (field.button || field.submit) {
		return;
	}

	let isValid = field.validity;

	if (isValid.valid) {
		return;
	}

	if (isValid.valueMissing) {
		return `This is a required field`;
	}

	if (isValid.patternMismatch) {
		if (field.hasAttribute("title")) {
			return field.getAttribute("title");
		} else {
			return `Invalid format`;
		}
	}

	if (isValid.tooShort) {
		return `This field must contain at least ${field.getAttribute("minLength")} characters`;
	}

	if (isValid.tooLong) {
		return `This field can contain a maximum ${field.getAttribute("minLength")} characters`;
	}
};

// if field has error(s) create div and display error message
// if error message already exists it will be updated
const displayError = (field, error) => {
	let fieldName = field.name || field.id;
	let message = field.form.querySelector(".error-msg#error-for-" + fieldName);

	field.classList.add("error");

	if (!fieldName) {
		return;
	}

	if (!message) {
		message = document.createElement("div");
		message.className = "error-msg";
		message.id = "error-for-" + fieldName;
		field.parentNode.insertBefore(message, field.nextSibling);
	}

	message.innerHTML = error;
	message.style.display = "block";
	message.style.visibility = "visible";
};

// if field is corrected, error message is hidden
const hideError = (field) => {
	let fieldName = field.name || field.id;
	let message = field.form.querySelector(".error-msg#error-for-" + fieldName);

	field.classList.remove("error");

	if (!fieldName) {
		return;
	}

	if (!message) {
		return;
	}

	message.innerHTML = "";
	message.style.display = "none";
	message.style.visibility = "hidden";
};

// EVENT LISTENERS

// hide event terms and conditions modal
document
	.querySelector(".modal-btn")
	.addEventListener("click", (e) => (modal.style.display = "none"));

// show event terms and conditions modal
document
	.querySelector(".terms-link")
	.addEventListener("click", (e) => (modal.style.display = "block"));

// if promo code is entered checkbox is not required
// if checkbox checked, promo code not required
promoCheck.addEventListener("click", (e) => {
	const promoInput = document.querySelector(".promo-input");
	const promoCode = document.querySelector("#promo-code");

	if (promoCheck.checked) {
		promoInput.classList.add("hidden");
		promoCode.required = false;
		promoCode.value = "";
	} else {
		promoInput.classList.remove("hidden");
		promoCode.required = true;
	}
});

// if checkbox = checked, dropdown appears
// and dropdown becomes required field
promoCheck.addEventListener("change", (e) => {
	const showDrop = document.querySelector(".hidden-controls");
	const choices = document.querySelector("#choices");
	const label = document.querySelector(".choice-label");

	if (promoCheck.checked) {
		showDrop.style.display = "block";
		choices.required = true;
		label.classList.add("required");
	} else {
		showDrop.style.display = "none";
		choices.required = false;
		choices.value = "";
		label.classList.remove("required");
	}
});

// if "other" is chosen, textbox is required
choices.addEventListener("change", (e) => {
	const textRow = document.querySelector(".text-row");
	const newLabel = document.querySelector(".other-label");
	const textBox = document.querySelector("#other");

	if (choices.value === "other") {
		textRow.style.display = "block";
		newLabel.classList.add("required");
		textBox.required = true;
	} else {
		textRow.style.display = "none";
		newLabel.classList.remove("required");
		textBox.required = false;
		textBox.value = "";
	}
});

// event listener to hide/display error messages on input fields
document.addEventListener(
	"blur",
	(e) => {
		const error = getErrors(e.target);

		if (error) {
			displayError(e.target, error);
			return;
		}

		hideError(e.target);
	},
	true
);

document.addEventListener(
	"submit",
	(e) => {
		e.preventDefault();
		let fields = e.target.elements;
		let error, hasErrors;
		for (let i = 0; i < fields.length; i++) {
			error = getErrors(fields[i]);
			if (error) {
				displayError(fields[i], error);
				if (!hasErrors) {
					hasErrors = fields[i];
				}
			}
		}
		success.style.display = "block";
		setTimeout(() => document.submit(), 5000);

		if (hasErrors) {
			hasErrors.focus();
		}
	},
	false
);

const calculateButton = document.querySelector("#submit");

calculateButton.addEventListener('click', function (e) {

    const imgDiv = document.querySelector('.imgLoader');
    imgDiv.style.display = "block";
    setTimeout(calculateFunction, 2000);
    e.preventDefault();
});

function calculateFunction() {
    //Make it appear again
    const resultsDiv = document.querySelector('.results');
    const imgDiv = document.querySelector('.imgLoader');
    resultsDiv.style.display = "block";
    imgDiv.style.display = "none";
    //UI variables
    const loanAmount = document.querySelector("#loan-amount");
    const interest = document.querySelector("#interest");
    const numberOfYears = document.querySelector("#numberOfYears");
    const monthlyPayment = document.querySelector("#monthlyPayment");
    const totalPayment = document.querySelector("#totalPayment");
    const totalInterest = document.querySelector("#totalInterest");

    const principal = parseFloat(loanAmount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(numberOfYears.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) { //NOT infinity or -infinity or NaN
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError();
    }
}

function showError() {
    //Make it appear again
    const resultsDiv = document.querySelector('.results');
    resultsDiv.style.display = "none";
    const divElement = document.createElement("div");
    divElement.className = "alert alert-danger";
    divElement.role = "alert";
    divElement.innerHTML = `<strong>Please check your numbers!</strong>`;
    divElement.style.textAlign = "center";
    const loanCalcHeading = document.querySelector('.heading');
    const card = document.querySelector('.card-body');
    //insert inside of card .. this element ..  "before" loanCalcHeading
    card.insertBefore(divElement, loanCalcHeading);
    setTimeout(clearError, 2000);
}

function clearError() {
    document.querySelector('.alert').remove();
}
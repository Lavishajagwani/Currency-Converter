const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// adding all the country codes from countryList in the select element
for(let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD") {
            newOption.selected = "selected";
        }
        if(select.name === "to" && currcode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    // adding eventlistener to change the flag on select element
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// changing the flag icon according to the country code
const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// adding eventlistener on button
btn.addEventListener("click", ( evt) => {
    evt.preventDefault(); // to prevent from reloading everytime
    updateExchangeRate();
});

// function to access the amount value and display result
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`; 
    let response = await fetch(URL); // returns a promise 
    let data = await response.json(); // gives the required data
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; // gives the required exchange rate from entire data
    
    let finalAmount = Math.round((amtVal * rate) * 100) / 100;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

// adding event listener to show result on first reload
window.addEventListener("load", () => {
    updateExchangeRate();
})

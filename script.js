const charValues = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "W",
  8: "U",
  9: "Y",
  0: "X"
};

const reverseCharValues = Object.fromEntries(
  Object.entries(charValues).map(([key, value]) => [value, key])
);

let generatedCode = document.getElementById("generatedCode");
let priceInput = document.getElementById("priceInput");
let alphaCodeInput = document.getElementById("alphaCodeInput");
let decodedPrice = document.getElementById("decodedPrice");

alphaCodeInput.addEventListener('input', function () {
    this.value = this.value.toUpperCase();
});

function generatePriceCode(price) {
    let code = "";
    let remainingPrice = price.toString();
    for (let char of remainingPrice) {
        code += charValues[parseInt(char)];
    }
    let randomNumber1 = Math.floor(Math.random() * 10) + 1;
    let randomNumber2 = Math.floor(Math.random() * 10) + 1;
    code = randomNumber1 + code + randomNumber2;
    return code;
}

function generateCode() {
    let price = priceInput.value;
    generatedCode.textContent = "";

    if (!price || isNaN(price) || price <= 0) {
        alert("Please enter a valid price.");
        return;
    }

    let priceCode = generatePriceCode(price);
    generatedCode.textContent = priceCode;
    toggleSpanClass(generatedCode);
}

function decodeCode() {
    let alphaCode = alphaCodeInput.value;
    decodedPrice.textContent = "";

    if (!alphaCode) {
        alert("Please enter a valid alpha code.");
        return;
    }

    let alphaCodeWithoutRandom = alphaCode;
    let decodedPriceValue = "";
    for (let char of alphaCodeWithoutRandom) {
        if (reverseCharValues[char]) {
            decodedPriceValue += reverseCharValues[char];
        } else {
            alert("Invalid character in the code.");
            return;
        }
    }

    decodedPrice.textContent = decodedPriceValue;
    toggleSpanClass(decodedPrice);
}

function toggleSpanClass(element) {
    if (element.textContent.trim() !== "") {
        element.classList.add("highlighted-text");
    } else {
        element.classList.remove("highlighted-text");
    }
}

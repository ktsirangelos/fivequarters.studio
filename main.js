// Imports
import { STATIC_PRICE as staticPrice } from "./rates.js";
import { PRICE_PER_QUARTER as pricePerQuarter } from "./rates.js";
import { INCREMENT_OF_SET as incrementOfSet } from "./rates.js";
import { ENG } from "./lang.js";

// Bindings
let btw = 1; //btw 0% = price * 1

const prices = document.getElementById("prices");
const upTo21 = document.getElementById("up-to-21");
const from21 = document.getElementById("from-21");

let single,
  classes,
  of = "";

if (document.documentElement.lang == "nl") {
  single = "losse";
  classes = "lessen";
  of = "van";
} else {
  single = "single";
  classes = "classes";
  of = "of";
}

// Functions
const getRoundNumber = function (num, length) {
  const number = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
  return number.toFixed(length);
};

const getPricePerQuarter = function (set) {
  let increment = 3;
  if (set === 4) {
    increment = 2;
  } else if (set === 8) {
    increment = 1;
  } else if (set === 16) {
    increment = 0;
  }
  const price = pricePerQuarter + increment * incrementOfSet;
  return price;
};

const getPrice = function (set, quarters) {
  const finalPrice = getRoundNumber(
    (staticPrice + getPricePerQuarter(set) * quarters) * btw,
    2
  )
    .toString()
    .replace("00", "-")
    .replace(".", ",");
  return finalPrice;
};

const loadPrices = function () {
  prices.innerHTML = `
    <ul class="block-column-4">
    <li><h3>${single}<br>${classes}</h3></li>
    <li>60' – &euro;${getPrice(1, 4)}</li>
    <li>45' – &euro;${getPrice(1, 3)}</li>
    <li>30' – &euro;${getPrice(1, 2)}</li>
    </ul>
    <ul class="block-column-4">
    <li><h3>set ${of}<br>4 ${classes}</h3></li>
    <li>60' – &euro;${getPrice(4, 4)}</li>
    <li>45' – &euro;${getPrice(4, 3)}</li>
    <li>30' – &euro;${getPrice(4, 2)}</li>
    </ul>
    <ul class="block-column-4">
    <li><h3>set ${of}<br>8 ${classes}</h3></li>
    <li>60' – &euro;${getPrice(8, 4)}</li>
    <li>45' – &euro;${getPrice(8, 3)}</li>
    <li>30' – &euro;${getPrice(8, 2)}</li>
    </ul>
    <ul class="block-column-4">
    <li><h3>set ${of}<br>16 ${classes}</h3></li>
    <li>60' – &euro;${getPrice(16, 4)}</li>
    <li>45' – &euro;${getPrice(16, 3)}</li>
    <li>30' – &euro;${getPrice(16, 2)}</li>
    </ul>
    `;
};

const changeLanguage = function (languageObject) {};

// Event Listeners
upTo21.addEventListener("click", function () {
  btw = 1; // btw 0% = price * 1
  loadPrices();
});

from21.addEventListener("click", function () {
  btw = 1.21; // btw 21% = price * 1.21
  loadPrices();
});

// Init
loadPrices();

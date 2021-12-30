const appData = {
    title: "",
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrice: 0,
    userInput: function() {
        do {
            appData.title = prompt(
                "Как называется ваш проект",
                "Калькулятор верстки"
            );
        } while (!(typeof appData.title === "string"));

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt("Какие типы экранов нужно разработать?");
            } while (!(typeof name === "string"));
            let price = 0;

            do {
                price = prompt("Сколько будет стоить данная работа?");
            } while (!appData.isNumber(price));

            appData.screens.push({ id: i, name: name, price: price });
        }

        for (let i = 0; i < 2; i++) {
            let name;
            do {
                name = prompt("Какой дополнительный тип услуги нужен?");
            } while (!(typeof name === "string"));
            let price = 0;
            do {
                price = prompt("Сколько это будет стоить?");
            } while (!appData.isNumber(price));
            appData.services[name] = +price;
        }
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    addPrice: function() {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },

    getServicePercentPrices: function() {
        appData.servicePercentPrice =
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
    },

    getFullPrice: function() {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    getTitle: function() {
        appData.title =
            appData.title.trim().charAt(0).toUpperCase() +
            appData.title.trim().substr(1).toLowerCase();
    },
    getRollbackMessage: function(price) {
        if (price >= 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даем скидку в 5%";
        } else if (price >= 0 && price < 15000) {
            return "Скидка не предусмотрена";
        } else if (price < 0) {
            return "Что-то пошло не так";
        }
    },
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    logger: () => {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    },
    start: () => {
        appData.userInput();
        appData.addPrice();
        appData.isNumber();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.getRollbackMessage();
        appData.logger();
    },
};

appData.start();

//Получить заголовок "Калькулятор верстки" через метод getElementsByTagName. (тэг h1, получить именно элемент, а не коллекцию)
const title = document.getElementsByTagName("h1")[0];

//Получить кнопки "Рассчитать" и "Сброс" через метод getElementsByClassName. (класс handler_btn)
const btnStart = document.getElementsByClassName("handler_btn")[0];
const btnReset = document.getElementsByClassName("handler_btn")[1];


//Получить кнопку "+" под выпадающим списком через метод querySelector. (класс screen-btn)
const plusBtn = document.querySelector(".screen-btn");

//Получить все элементы с классом other-items в две разные переменные. В первую элементы у которых так же присутствует класс percent, во вторую элементы у которых так же присутствует класс number через метод querySelectorAll

const otherItemPercentAdded = document.querySelectorAll(".other-items.percent");
const otherItemNumberAdded = document.querySelectorAll(".other-items.number");

//Получить input type=range через его родителя с классом rollback одним запросом через метод querySelector
let userRollback = document.querySelector(
    ".rollback > main-controls__range.input[type='range']"
);
let userInputs = document.querySelectorAll(".rollback");

//Получить span с классом range-value через его родителя с классом rollback одним запросом через метод querySelector.
let spanRollback = document.querySelector(".rollback > range-value");

//Получить все инпуты с классом total-input справа через метод getElementsByClassName. (класс total-input, получить именно элементы, а не коллекции)
const price = document.getElementsByClassName("total-input")[0];
const screenAmount = document.getElementsByClassName("total-input")[1];
const addServicesCost = document.getElementsByClassName("total-input")[2];
const totalCost = document.getElementsByClassName("total-input")[3];
const vendorTips = document.getElementsByClassName("total-input")[4];

//Получить все блоки с классом screen в изменяемую переменную ( let ) через метод querySelectorAll (далее мы будем переопределять ее значение)
let screens = document.querySelectorAll(".screen");

console.log(title);
console.log(plusBtn);
console.log(otherItemPercentAdded);
console.log(otherItemNumberAdded);
console.log(userRollback);
console.log(spanRollback);
console.log(screens);
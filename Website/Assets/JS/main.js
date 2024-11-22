var leftNumElement, middleNumElement, rightNumElement;
var spinButton;
var waitTime = 200;

window.onload = function () {
    leftNumElement = document.getElementById('LeftNum');
    middleNumElement = document.getElementById('MiddleNum');
    rightNumElement = document.getElementById('RightNum');
    spinButton = document.querySelector('.spin-button');

    guideText = document.getElementById('gtext');
}

function OpenImg(path) {
    window.open(path, "_blank");
}

function GiveMoney(type) {
    const moneyElement = document.querySelector(".money");
    let currentMoney = parseInt(moneyElement.textContent.replace("Money: 💶", ""), 10);

    if (type == '1' || type == '2' || type == '3' || type == '4') {
        currentMoney += 150;
    } else if (type == '5') {
        currentMoney += 1000;
    } else if (type == '♥' || type == '♦' || type == '♣' || type == '♠') {
        currentMoney += 450;
    } else if (type == "red" || type == "green" || type == "yellow" || type == "blue") {
        currentMoney += 200;
    } else if (type == 'pink') {
        currentMoney += 1000;
    }

    moneyElement.textContent = `Money: 💶${currentMoney}`;
}

function RemoveMoney(num) {
    const moneyElement = document.querySelector(".money");
    let currentMoney = parseInt(moneyElement.textContent.replace("Money: 💶", ""), 10);
    let newMoney = currentMoney - num;
    moneyElement.textContent = `Money: 💶${newMoney}`
}

function CanPlay(cost) {
    const moneyElement = document.querySelector(".money");
    let currentMoney = parseInt(moneyElement.textContent.replace("Money: 💶", ""), 10);
    let newMoney = currentMoney - cost;

    return newMoney >= 0;
}


function CheckWinnings(num1, num2, num3, color1, color2, color3) {
    if (num1 == num2 && num2 == num3) {
        if (num1 == 1 || num1 == 2 || num1 == 3 || num1 == 4 || num1 == '♥' || num1 == '♦' || num1 == '♣' || num1 == '♠') {
            OpenImg("./Assets/Images/YouWin.jpg")
            GiveMoney(num1);
        } else if (num1 == 5) {
            OpenImg("./Assets/Images/JackPot.jpg")
            GiveMoney(num1);
        }
    }

    if (color1 == color2 && color2 == color3) {
        GiveMoney(color1);
    }
}

function GenerateRandomColor() {
    const colors = ["red", "green", "yellow", "blue", "pink"];

    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
}

function GenerateRandomNum() {
    const spinCost = 5;

    if (!CanPlay(spinCost)) {
        alert("You don't have enough money to spin!");
        return;
    }

    spinButton.disabled = true;
    RemoveMoney(spinCost);

    let count = 0;
    let finalLeftNum, finalMiddleNum, finalRightNum;

    const emojis = ["♥", "♦", "♣", "♠"];

    const interval = setInterval(function () {
        if (count < 10) {
            var leftNum = Math.floor(Math.random() * 6) + 1;
            var middleNum = Math.floor(Math.random() * 6) + 1;
            var rightNum = Math.floor(Math.random() * 6) + 1;

            if (leftNum == 6) {
                leftNum = emojis[Math.floor(Math.random() * emojis.length)];
            }
            if (middleNum == 6) {
                middleNum = emojis[Math.floor(Math.random() * emojis.length)];
            }
            if (rightNum == 6) {
                rightNum = emojis[Math.floor(Math.random() * emojis.length)];
            }

            const leftColor = GenerateRandomColor();
            const middleColor = GenerateRandomColor();
            const rightColor = GenerateRandomColor();

            leftNumElement.textContent = leftNum;
            leftNumElement.style.backgroundColor = leftColor;

            middleNumElement.textContent = middleNum;
            middleNumElement.style.backgroundColor = middleColor;

            rightNumElement.textContent = rightNum;
            rightNumElement.style.backgroundColor = rightColor;

            if (count === 9) {
                finalLeftNum = leftNum;
                finalMiddleNum = middleNum;
                finalRightNum = rightNum;

                finalLeftColor = leftColor;
                finalMiddleColor = middleColor;
                finalRightColor = rightColor;
            }

            count++;
        } else {
            clearInterval(interval);
            spinButton.disabled = false;
            CheckWinnings(finalLeftNum, finalMiddleNum, finalRightNum, finalLeftColor, finalMiddleColor, finalRightColor);
        }
    }, waitTime);
}


function ShowGuide() {
    if (guideText.style.display === "none") {
        guideText.style.display = "block";
    } else {
        guideText.style.display = "none";
    }
}
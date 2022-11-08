const clickCat = document.getElementById("click");
const game = document.getElementById("game");
const clicksText = document.getElementById("clicks");
const intro = document.getElementById("intro");

setTimeout(() => {
    intro.style.opacity = "0";
    setTimeout(() => {
        intro.remove();
        addAchievement('welcome');
    }, 3000);
}, 1250);


let data = {
    score: 0,
    clickPower: 1,
    cps: 0,
    cpcCost: 500,
    cpcStage: 0,
    clicks: 0,
    items: {
        'cursor': {
            price: 50,
            owned: 0,
            cps: 1
        },
        'bee': {
            price: 250,
            owned: 0,
            cps: 5
        },
        'burgerbot': {
            price: 5000,
            owned: 0,
            cps: 25
        },
        'abicrab': {
            price: 25000,
            owned: 0,
            cps: 100
        },
        'smile': {
            price: 100000,
            owned: 0,
            cps: 500
        }
    },
    achievements:{
        'welcome': {
            description: 'open abooby clicker',
            completed: false,
            image: 'welcome.png'
        },
        'getting started': {
            description: 'click 100 times',
            completed: false,
            image: 'getting_started.png'
        },
        'meet bosley': {
            description: 'click 1000 times',
            completed: false,
            image: 'meet_bosley.png'
        },
        'lily' : {
            description: 'click lily',
            completed: false,
            image: 'lily.png'
        },
        'catch farrah': {
            description: 'catch farrah for 1000 points',
            completed: false,
            image: 'catch_farrah.png'
        },
        'what have you done': {
            description: 'click 100000 times',
            completed: false,
            image: 'what_have_you_done.png'
        }
    }
};

function updateDisabledUpgrades() {
    for (let i in data.items) {
        const item = data.items[i];
        if (item.price > data.score) {
            document.getElementById(`upgrade${i}`).classList.add("disabled");
        } else {
            document.getElementById(`upgrade${i}`).classList.remove("disabled");
        }
    }
    if(data.cpcCost > data.score) {
        upgradeCpc.classList.add("disabled");
    }else{
        upgradeCpc.classList.remove("disabled");
    }
}

function updateClicks() {
    clicksText.innerHTML = Math.round(data.score);
}

function clickFeedback(num) {
    const feedback = document.createElement("div");
    feedback.innerText = `+${num}`;
    feedback.className = "feedback";
    feedback.style.left = `${Math.random() * 50 + 25}%`;
    game.appendChild(feedback);
    setTimeout(() => {
        feedback.remove();
    }, 1000);
}

clickCat.addEventListener("click", () => {
    data.score += data.clickPower;
    data.clicks++;
    if(data.clicks == 100) {
        addAchievement('getting started');
    } else if(data.clicks == 1000) {
        bosley()
        setTimeout(() => {
            addAchievement('meet bosley');
        }, 3000); 
    }
    clickFeedback(data.clickPower);
    updateDisabledUpgrades();
    updateClicks();
});

const buyButtons = document.getElementsByClassName("buyButton");
for (let i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener("click", (event) => {
        const upgrade = event.target.parentElement.parentElement;
        const id = upgrade.id.replace("upgrade", "");
        const item = data.items[id];
        if (data.score >= item.price) {
            data.score -= item.price;
            item.owned++;
            item.price = Math.round(item.price * 1.15);
            data.cps += item.cps;
            upgrade.querySelector('.upgradeInfo').innerHTML = `<b>Cost</b>: ${formatNumber(item.price.toString())} - <b>Owned</b>: ${item.owned}`;
            updateClicks();
            updateDisabledUpgrades();

        }
    });
}

setInterval(() => {
    if (data.cps > 0) {
        const c = data.cps;
        data.score += data.cps;
        clickFeedback(data.cps);
        updateClicks();
        updateDisabledUpgrades();
    }
}, 1000);

const upgradeCpc = document.getElementById("upgradeCpc");
const stageCpc = document.getElementById("stageCpc");

upgradeCpc.addEventListener("click", () => {
    if (data.score >= data.cpcCost) {
        data.score -= data.cpcCost;
        data.cpcCost = Math.round(data.cpcCost * 1.15);
        data.cpcStage++;
        data.clickPower += 1;
        upgradeCpc.innerText = `${data.cpcCost} points`;
        stageCpc.innerText = `upgrade cps (stage ${data.cpcStage + 1})`;
        updateClicks();
        updateDisabledUpgrades();
    }
});

//Lily
setInterval(() => {
    const lily = document.createElement("div");
    lily.className = "lily";
    game.appendChild(lily);
    lily.addEventListener("click", () => {
        data.score += 250;
        clickFeedback(250);
        updateClicks();
        updateDisabledUpgrades();
        lily.remove();
        addAchievement('lily');
    });
    setTimeout(() => {
        lily.style.bottom = "-100px";
        setTimeout(() => {
            lily.remove();
        }, 1000);
    }, 3000);
}, 120000);

//Farrah
setInterval(() => {
    const farrah = document.createElement("div");
    farrah.className = "farrah";
    document.body.appendChild(farrah);
    farrah.addEventListener("click", () => {
        addAchievement('catch farrah');
        data.score += 1000;
        clickFeedback(1000);
        updateClicks();
        updateDisabledUpgrades();
        farrah.remove();
    });
    setTimeout(() => {
        farrah.remove()
    }, 1500);
}, 240000);

//jumpscare
function bosley() {
    const bosley = document.createElement("div");
    bosley.className = "bosley";
    document.body.appendChild(bosley);
    const dun = new Audio("/ac/assets/dun.mp3");
    dun.play();
    setTimeout(() => {
        bosley.remove();
    }, 3000);
};


/*Buy Amount
let buyAmount = 1;
const buyAmountElem = document.getElementById("buyAmount");


buyAmountElem.addEventListener("change", (event) => {
    buyAmount = Math.pow(10, event.target.value - 1);
    updateDisabledUpgrades();
    for (let i = 0; i < buyButtons.length; i++) {
        const button = buyButtons[i];
        button.innerText = `buy ${buyAmount}`;
        const item = data.items[button.parentElement.parentElement.id.replace("upgrade", "")];
        button.parentElement.querySelector('.upgradeInfo').innerHTML = `<b>Cost</b>: ${item.price * buyAmount} - <b>Owned</b>: ${item.owned}`;
    }
});*/

//abooby made this, im a theif
function formatNumber(num, other) {
    if (num >= Math.pow(10, 303)) return ((Math.abs(num) / Math.pow(10, 303)).toFixed(1)) + 'H'
    if (num >= Math.pow(10, 63)) return ((Math.abs(num) / Math.pow(10, 63)).toFixed(1)) + 'G'
    if (num >= Math.pow(10, 60)) return ((Math.abs(num) / Math.pow(10, 60)).toFixed(1)) + 'C'
    if (num >= Math.pow(10, 57)) return ((Math.abs(num) / Math.pow(10, 57)).toFixed(1)) + 'X'
    if (num >= Math.pow(10, 54)) return ((Math.abs(num) / Math.pow(10, 54)).toFixed(1)) + 'S'
    if (num >= Math.pow(10, 51)) return ((Math.abs(num) / Math.pow(10, 51)).toFixed(1)) + 'D'
    if (num >= Math.pow(10, 48)) return ((Math.abs(num) / Math.pow(10, 48)).toFixed(1)) + 'U'
    if (num >= Math.pow(10, 45)) return ((Math.abs(num) / Math.pow(10, 45)).toFixed(1)) + 'V'
    if (num >= Math.pow(10, 42)) return ((Math.abs(num) / Math.pow(10, 42)).toFixed(1)) + 'I'
    if (num >= Math.pow(10, 39)) return ((Math.abs(num) / Math.pow(10, 39)).toFixed(1)) + 'R'
    if (num >= Math.pow(10, 36)) return ((Math.abs(num) / Math.pow(10, 36)).toFixed(1)) + 'J'
    if (num >= Math.pow(10, 33)) return ((Math.abs(num) / Math.pow(10, 33)).toFixed(1)) + 'L'
    if (num >= Math.pow(10, 30)) return ((Math.abs(num) / Math.pow(10, 30)).toFixed(1)) + 'F'
    if (num >= Math.pow(10, 27)) return ((Math.abs(num) / Math.pow(10, 27)).toFixed(1)) + 'A'
    if (num >= Math.pow(10, 24)) return ((Math.abs(num) / Math.pow(10, 24)).toFixed(1)) + 'Y'
    if (num >= Math.pow(10, 21)) return ((Math.abs(num) / Math.pow(10, 21)).toFixed(1)) + 'Z'
    if (num >= Math.pow(10, 18)) return ((Math.abs(num) / Math.pow(10, 18)).toFixed(1)) + 'E'
    if (num >= Math.pow(10, 15)) return ((Math.abs(num) / Math.pow(10, 15)).toFixed(1)) + 'P'
    if (num >= Math.pow(10, 12)) return ((Math.abs(num) / Math.pow(10, 12)).toFixed(1)) + 'T'
    if (num >= Math.pow(10, 9)) return ((Math.abs(num) / Math.pow(10, 9)).toFixed(1)) + 'B'
    if (num >= Math.pow(10, 6)) return ((Math.abs(num) / Math.pow(10, 6)).toFixed(1)) + 'M'
    if (num >= 1000) return ((Math.abs(num) / 1000).toFixed(1)) + 'K'
    if (other != undefined) {
        return num.toFixed(other)
    } else {
        return parseInt(num)
    }
}

function addAchievement(achievement) {
    const achievementData = data.achievements[achievement];
    if(achievementData.completed) return;
    const achievementElem = document.createElement("div");
    achievementElem.className = "achievement";
    achievementElem.innerHTML = `<div><h2>${achievement}</h2><p>${achievementData.description}</p></div><img src="/ac/assets/achievements/${achievementData.image}">`;
    achievementElem.addEventListener("click", showAchievementPopup);
    achievementData.completed = true;
    game.appendChild(achievementElem);
    setTimeout(() => {
        achievementElem.style.right = "-300px";
        setTimeout(() => {
            achievementElem.remove();
        }, 300);
    }, 3000);
}

function showAchievementPopup() {
    const popup = document.createElement("div");
    popup.className = "achievementPopup";
    const achievements = data.achievements;
    for(let i in achievements) {
        const achievement = achievements[i];
        popup.innerHTML += `<div class="achievementPopupachievement" ${!achievement.completed ? `style="opacity: 0.5"` : ""}><div><h2>${i}</h2><p>${achievement.completed ? achievement.description : "???"}</p></div><img src="/ac/assets/achievements/${achievement.image}"></div>`;
    }
    document.body.appendChild(popup);
}

game.addEventListener("click", event => {
    if(event.target != game)return;
    let popup = document.querySelector(".achievementPopup")
    if (popup) {
        popup.style = "opacity: 0; transform: translate(-50%, -50%) scale(0);"
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
});

const showAchievements = document.getElementById("showAchievements");
showAchievements.addEventListener("click", () => {
    if(!document.querySelector(".achievementPopup"))showAchievementPopup();
});


//save data and stuff
if(localStorage.getItem("saveData")){
    loadData(JSON.parse(atob(localStorage.getItem("saveData"))));
}

function loadData(saveData){
    data = saveData;
    clicksText.innerText = data.score;
    for(let i in data.items){
        const item = data.items[i];
        const itemElem = document.getElementById(`upgrade${i}`).querySelector('.upgradeInfo');
        itemElem.innerHTML = `<b>Cost</b>: ${formatNumber(item.price.toString())} <b>Owned</b>: ${item.owned}`;
    }
    stageCpc.innerText = `upgrade cps (stage ${data.cpcStage+1})`;
    upgradeCpc.innerText = `${data.cpcCost} points`
}

window.onbeforeunload = function() {
    localStorage.setItem("saveData", btoa(JSON.stringify(data)));
}

var prize = null;
var emptyBoxes = null;
var boxChosen = null;
var emptyOpened = null;
var gameEnded = false;
var previouslyChosen = null;

var simulationIntervalId = null;

function rollPrizeBox() {
    return Math.round(Math.random() * 2); // [0;2]
}

function initBoxes() {
    prize = rollPrizeBox();
    emptyBoxes = [];
    for (let i = 0; i < 3; ++i) {
        if (i !== prize) {
            emptyBoxes.push(i);
        }
    }

}

function showEmpty() {
    if (gameEnded || emptyOpened != null) return;
    if (boxChosen == null) {
        alert('No box chosen!');
        return;
    }
    var emptyToBeOpened = computeEmptyToBeOpened();
    openBox(emptyBoxes[emptyToBeOpened]);
    emptyOpened = emptyBoxes[emptyToBeOpened];
    document.getElementById('switchOrStay').style.visibility = 'visible';
}

function computeEmptyToBeOpened() {
    var emptyChosen = null;
    for (let i = 0; i < 2; ++i) {
        if (boxChosen === emptyBoxes[i]) {
            emptyChosen = i;
        }
    }
    var emptyToBeOpened = null;
    if (emptyChosen == null) {
        emptyToBeOpened = Math.round(Math.random()); // [0;1] ; if prize box chosen - open one of 2 empty
    } else {
        emptyToBeOpened = emptyChosen === 0 ? 1 : 0; // if empty box chosen - open other empty
    }
    return emptyToBeOpened;
}

function switchBox() {
    if (gameEnded) {
        alert('Game already ended!');
        return;
    }
    var switched = computeSwitchedBox();
    choseBox(switched, true);
    endGame();
}

function computeSwitchedBox() {
    var switched;
    for (let i = 0; i < 3; ++i) {
        if (i !== boxChosen && i !== emptyOpened) { // chose other than previously chosen and already opened
            switched = i;
            break;
        }
    }
    return switched;
}

function endGame() {
    if (gameEnded) {
        alert('Game already ended! Please clear!');
        return;
    }
    gameEnded = true;
    openAll();
    updateStats(() => alert('You won!!!'), () => alert('You lost :('));
}

function simOneStayFlow() {
    initBoxes();
    boxChosen = getRandomBox();
    updateStats();
    addSimulationEntry();
}

function simOneSwitchFlow() {
    initBoxes();
    boxChosen = getRandomBox();
    emptyOpened = emptyBoxes[computeEmptyToBeOpened()];
    var switched = computeSwitchedBox();
    previouslyChosen = boxChosen
    boxChosen = switched;
    updateStats();
    addSimulationEntry();
}

function simulateSwitch() {
    disableSimulateButtons();
    document.getElementById('simStopBtn').disabled = false;
    simulationIntervalId = setInterval(() => {
        simOneSwitchFlow();
    }, 200);
    document.getElementById('simLogBtn').disabled = false;
}

function simulateStay() {
    previouslyChosen = null;
    disableSimulateButtons();
    document.getElementById('simStopBtn').disabled = false;
    simulationIntervalId = setInterval(() => {
        simOneStayFlow();
    }, 200);
    document.getElementById('simLogBtn').disabled = false;
}

function stopSimulation() {
    clearInterval(simulationIntervalId);
    document.getElementById('simStopBtn').disabled = true;
    document.getElementById('simLogBtn').disabled = false;
    enableSimulateButtons();
}

function simulateNTimesStay() {
    var n = document.getElementById('simN').value;
    n = n ? parseInt(n) : 0;
    for (let i = 0; i < n; ++i) {
        simOneStayFlow();
    }
    document.getElementById('simLogBtn').disabled = false;
}

function simulateNTimesSwitch() {
    var n = document.getElementById('simN').value;
    n = n ? parseInt(n) : 0;
    for (let i = 0; i < n; ++i) {
        simOneSwitchFlow();
    }
    document.getElementById('simLogBtn').disabled = false;
}

doClear();
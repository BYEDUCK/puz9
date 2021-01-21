var wonCount = 0;
var lostCount = 0;
var simulationEntries = [];

function clickOne() {
    unselectChosen();
    choseBox(0);

}

function clickTwo() {
    unselectChosen();
    choseBox(1);
}

function clickThree() {
    unselectChosen();
    choseBox(2);
}

function doClear() {
    unchoseBox(0);
    unchoseBox(1);
    unchoseBox(2);

    closeAll();

    document.getElementById('simulation_entries').innerHTML = '';
    document.getElementById('simulation_entries').style.visibility = 'hidden';
    document.getElementById('switchOrStay').style.visibility = 'hidden';
    document.getElementById('sim').style.visibility = 'hidden';
    document.getElementById('simLogBtn').disabled = true;
    initBoxes();
    boxChosen = null;
    emptyOpened = null;
    gameEnded = false;
    simulationEntries = []
    updateStats();
}

function openAll() {
    openBox(0);
    openBox(1);
    openBox(2);
}

function closeAll() {
    closeBox(0);
    closeBox(1);
    closeBox(2);
}

function getBoxById(boxId) {
    return document.getElementById('b' + boxId);
}

function unselectChosen() {
    if (boxChosen != null) {
        getBoxById(boxChosen).classList.remove('chosen');
        boxChosen = null;
    }
}

function unchoseBox(boxId) {
    var box = getBoxById(boxId);
    if (box.classList.contains('chosen')) {
        box.classList.remove('chosen');
    }
    if (box.classList.contains('switched')) {
        box.classList.remove('switched');
    }
}

function choseBox(boxId, switched = false) {
    var box = getBoxById(boxId);
    if (switched) {
        if (!box.classList.contains('switched')) {
            box.classList.add('switched');
            boxChosen = boxId;
        }
    } else {
        if (!box.classList.contains('chosen')) {
            box.classList.add('chosen');
            boxChosen = boxId;
        }
    }
}

function closeBox(boxId) {
    getBoxById(boxId).src = './images/box-closed.jpg';
}

function openBox(boxId) {
    var box = getBoxById(boxId);
    if (boxId === prize) {
        box.src = './images/box-prize.jpg';
    } else {
        box.src = './images/box-empty.jpg';
    }
}

function updateStats(wonCallback, loseCallback) {
    if (boxChosen != null) {
        if (boxChosen === prize) {
            wonCount++;
            if (wonCallback) wonCallback();
        } else {
            lostCount++;
            if (loseCallback) loseCallback();
        }
    }

    document.getElementById('wonTxt').innerHTML = 'Won: ' + wonCount;
    document.getElementById('lostTxt').innerHTML = 'Lost: ' + lostCount;
    var gamesCount = wonCount + lostCount;
    document.getElementById('wonPercentageTxt').innerHTML = wonCount !== 0 ? 'Won %: ' + Math.round((wonCount / gamesCount) * 100) : 'Won %: --';
}

function addSimulationEntry() {
    var entryTxt = previouslyChosen == null ?
        `${boxChosen} : ${prize} (${boxChosen === prize ? "won" : "lost"})`
        : `${previouslyChosen} -> ${boxChosen} : ${prize} (${boxChosen === prize ? "won" : "lost"})`;

    simulationEntries.push(entryTxt);
}

function showSimulationLog() {
    var entriesList = document.getElementById('simulation_entries');
    entriesList.innerHTML = '';
    entriesList.style.visibility = 'visible';
    for (let i = 0; i < simulationEntries.length && i < 1000; ++i) {
        var entryTxt = simulationEntries[i];
        var entry = document.createElement('li');
        entry.innerHTML = entryTxt;
        entriesList.appendChild(entry);
    }
    document.getElementById('simLogBtn').disabled = true;
    document.getElementById('clearLogBtn').disabled = false;
}

function getRandomBox() {
    return Math.round(Math.random() * 2);
}

function disableSimulateButtons() {
    document.getElementById('simStayBtn').disabled = true;
    document.getElementById('simSwitchBtn').disabled = true;
}

function enableSimulateButtons() {
    document.getElementById('simStayBtn').disabled = false;
    document.getElementById('simSwitchBtn').disabled = false;
}

function enableSimulation() {
    document.getElementById('sim').style.visibility = 'visible';
}

function clearSimulationLog() {
    simulationEntries = [];
    showSimulationLog();
    document.getElementById('clearLogBtn').disabled = true;
}

function reset() {
    wonCount = 0;
    lostCount = 0;
    boxChosen = null;
    doClear();
}
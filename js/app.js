const cards = Array.from(document.querySelectorAll('.card'));
const deck = document.querySelector('.deck');
const stars = document.querySelector('.stars');
const moveCount = document.querySelector('.moves');
const move = document.querySelector('#move');
const timer = document.querySelector('.timer');
let timeKeeper = [0, 0, 0, 0];
let isTimerRunning = false;
let interval;
let open = [];
let count = 0;

restart();

document.querySelectorAll('.restart').forEach(function(button) {
    button.addEventListener('click', restart);
});

cards.forEach(function(card) {
    // if all cards matchMedia, display modal and statistics
    document.querySelector('.deck').addEventListener('click', ifWin);

    card.addEventListener('click', function() {
        // display the card's symbol
        this.classList.add('open');

        // add the cards to a list of open cards
        open.push(this);

        // start timer when first card is clicked
        if (open[0] && isTimerRunning === false) {
            isTimerRunning = true;
            interval = setInterval(runTimer, 10);
        }

        // no changes when a matched card is clicked
        if (this.classList.contains('match')) {
            this.classList.value = 'card match';
            open.pop();
        }

        if (open.length > 2) {
            // no more than two cards can be clicked at a time
            resetOpen();
        } else {
            if (open.length === 2) {
                if (this === open[0]) {
                    // same card cannot be clicked twice
                    resetOpen();
                } else if (this.children[0].classList.value === open[0].children[0].classList.value) {
                    open.forEach(function(variable) {
                        // change card style if two cards match
                        variable.classList.value = 'card match';
                    });
                    resetOpen();
                } else if (open[0] !== open[1]) {
                    // remove card pair if they don't match
                    setTimeout(resetOpen, 300);
                }
            }
        }
        updateCount();
        setStars();
        moveSpell();
    });
});

// FUNCTION DECLARATIONS

// resets the whole board, timer, move counter and stars
function restart() {
    let currentIndex = cards.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    deck.innerHTML = '';

    for (let index = 0; index < cards.length; index++) {
        deck.appendChild(cards[index]);
        cards[index].classList.value = 'card';
    }

    document.querySelectorAll('.stars li').forEach(function(star) {
        star.style.opacity = '1';
    });

    resetOpen();
    resetCount();
    timerReset();

    document.querySelector('.modal').style.cssText = ' opacity: 0; top: -100%';
}

// resets the list of open cards
function resetOpen() {
    open.forEach(function(variable) {
        variable.classList.remove('open');
    });
    open = [];
}

// updates the move counter
function updateCount() {
    count++;
    moveCount.innerHTML = count;
}

// resets the move counter
function resetCount() {
    count = 0;
    moveCount.innerHTML = count;
}

// star awarding logic
function setStars() {
    if (count > 28) {
        stars.children[2].style.opacity = '0';
        if (count > 40) {
            stars.children[1].style.opacity = '0';
        }
    }
}

// for correct grammer
function moveSpell() {
    if (count === 1) {
        move.innerHTML = 'Move';
    } else {
        move.innerHTML = 'Moves';
    }
}

// stars running the timer
function runTimer() {
    let currentTime = `${leadingZero(timeKeeper[0])}:${leadingZero(timeKeeper[1])}:${leadingZero(timeKeeper[2])}`;
    timer.innerHTML = currentTime;
    timeKeeper[3]++;
    timeKeeper[0] = Math.floor((timeKeeper[3] / 100) / 60);
    timeKeeper[1] = Math.floor((timeKeeper[3] / 100) - (timeKeeper[0] * 60));
    timeKeeper[2] = Math.floor(timeKeeper[3] - (timeKeeper[1] * 100) - (timeKeeper[0] * 6000));
}

function leadingZero(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

// if all cards matchMedia, implement this
function ifWin() {
    if (document.querySelectorAll('.match').length === 16 && isTimerRunning === true) {
        clearInterval(interval);
        isTimerRunning = false;

        document.querySelector('.time-taken').innerHTML = returnTime();

        document.querySelector('.modal').style.cssText = 'top: 50%; opacity:1';

        document.querySelector('.stars-received').innerHTML = numberStars();

        document.querySelector('.moves-count').innerHTML = document.querySelector('.moves').innerHTML;
    }
}

// to display number of stars after winning
function numberStars() {
    let starCount = 0;
    document.querySelectorAll('.stars li').forEach(function(each) {
        if (each.style.opacity === '1') {
            starCount++;
        }
    });
    return starCount;
}

// to display time taken after winning
function returnTime() {
    let timeArray = document.querySelector('.timer').innerHTML.split(':');
    return (timeArray[0] + ' minute and ' + timeArray[1] + ' seconds ');
}

// to reset the timer
function timerReset() {
    timeKeeper = [0, 0, 0, 0];
    isTimerRunning = false;
    clearInterval(interval);
    document.querySelector('.timer').innerHTML = '00:00:00';
}
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
})

cards.forEach(function(card) {

    document.querySelector('.deck').addEventListener('click', ifWin);

    card.addEventListener('click', function() {

        this.classList.add('open');
        open.push(this);

        if (open[0] && isTimerRunning === false) {
            isTimerRunning = true;
            interval = setInterval(runTimer, 10);
        }


        if (this.classList.contains('match')) {
            this.classList.value = 'card match';
            count--;
            resetOpen();
        }

        if (open.length > 2) {
            resetOpen();
        } else {
            if (open.length === 2) {
                if (this === open[0]) {
                    resetOpen();
                } else if (this.children[0].classList.value === open[0].children[0].classList.value) {
                    open.forEach(function(variable) {
                        variable.classList.value = 'card match';
                    });
                    resetOpen();
                } else if (open[0] !== open[1]) {
                    setTimeout(resetOpen, 300);
                }
            }
        }
        updateCount();
        setStars();
        moveSpell();
    });
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function restart() {
    var currentIndex = cards.length,
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

function resetOpen() {
    open.forEach(function(variable) {
        variable.classList.remove('open');
    });
    open = [];
}

function updateCount() {
    count++;
    moveCount.innerHTML = count;
}

function resetCount() {
    count = 0;
    moveCount.innerHTML = count;
}

function setStars() {
    if (count > 28) {
        stars.children[2].style.opacity = '0';
        if (count > 40) {
            stars.children[1].style.opacity = '0';
        }
    }
}

function moveSpell() {
    if (count === 1) {
        move.innerHTML = 'Move';
    } else {
        move.innerHTML = 'Moves';
    }
}

function runTimer() {
    let currentTime = leadingZero(timeKeeper[0]) + ":" + leadingZero(timeKeeper[1]) + ":" + leadingZero(timeKeeper[2]);
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

function ifWin() {
    if (document.querySelectorAll('.match').length === 16 && isTimerRunning === true) {
        clearInterval(interval);
        isTimerRunning = false;

        document.querySelector('#time-taken').innerHTML = returnTime();

        document.querySelector('.modal').style.cssText = 'top: 50%; opacity:1';

        document.querySelector('#stars-received').innerHTML = numberStars();

        document.querySelector('#moves-count').innerHTML = document.querySelector('.moves').innerHTML;
    }
}

function numberStars() {
    let starCount = 0;
    document.querySelectorAll('.stars li').forEach(function(each) {
        if (each.style.opacity === '1') {
            starCount++;
        }
    })
    return starCount;
}

function returnTime() {
    let timeArray = document.querySelector('.timer').innerHTML.split(':');
    return (timeArray[0] + ' minute and ' + timeArray[1] + ' seconds ');
}

function timerReset() {
    timeKeeper = [0, 0, 0, 0];
    isTimerRunning = false;
    clearInterval(interval);
    document.querySelector('.timer').innerHTML = '00:00:00';
}
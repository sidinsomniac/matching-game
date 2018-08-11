const cards = Array.from(document.querySelectorAll('.card'));
let open = [];
let count = 0;

shuffle();

document.querySelector('.restart').addEventListener('click', shuffle);


cards.forEach(function(card){
    card.addEventListener('click',function(){
        this.classList.add('open');
        open.push(this);
        

        if(this.classList.contains('match')){
            this.classList.value = 'card match';
            count--;
            resetOpen();
        }

        if(open.length > 2){
            resetOpen();
        }
        else{
            if(open.length === 2){
                if(this === open[0]){
                    resetOpen();
                }
                else if(this.children[0].classList.value === open[0].children[0].classList.value){
                    open.forEach(function(variable){
                        variable.classList.value = 'card match';
                    });
                    resetOpen();
                }
                else if(open[0] !== open[1]){
                    setTimeout(resetOpen,300);
                }
            }
        }        
        updateCount();
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

function shuffle() {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    document.querySelector('.deck').innerHTML = '';
    for (let index = 0; index < cards.length; index++) {
        document.querySelector('.deck').appendChild(cards[index]);
        cards[index].classList.value = 'card';
    }
    resetOpen();
    resetCount();
}

function resetOpen(){
    open.forEach(function(variable){
        variable.classList.remove('open');
    });
    open = [];
}

function updateCount(){
    count++;
    document.querySelector('.moves').innerHTML = count;
}

function resetCount(){
    count = 0;
    document.querySelector('.moves').innerHTML = count;    
}
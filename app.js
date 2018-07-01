function init(){
    scores = [0,0]; 
    roundScore = 0; 
    activePlayer = 0; 

    gamePlaying = true; 


    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2'; 

    player0DOM.classList.remove('winner');
    player1DOM.classList.remove('winner');

    player0DOM.classList.remove('active');
    player1DOM.classList.remove('active');

    player0DOM.classList.add('active');

}


function switchPlayer(){

    activePlayer === 0? activePlayer = 1 : activePlayer = 0; 
    roundScore = 0; 

    document.getElementById('current-0').textContent = 0; 
    document.getElementById('current-1').textContent = 0;

    player0DOM.classList.toggle('active');
    player1DOM.classList.toggle('active');

    diceDOM.style.display = 'none';

}



function rollDice(){

    if(gamePlaying){
        // Creates random dice roll 
        var dice = Math.ceil(Math.random() * 6);

        // Displays Dice Block
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM.style.display = 'block';

        // If dice does not roll a 1 it adds to the player's current score 
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        /* If dice rolls a 1 it switches to the next player, and the current player loses 
           thier current score.  
        */
        else {
            switchPlayer();
        }
    }};


    
function hold(){

    if(gamePlaying){
        // Update Global Score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = "Winner!"
            diceDOM.style.display = 'none';

            if (activePlayer === 0) {
                player0DOM.classList.add('winner');
                player0DOM.classList.toggle('active');
            }

            else {
                player1DOM.classList.add('winner');
                player1DOM.classList.toggle('active');
            }
        }

        else {
            switchPlayer();
        }
    }
}




var scores, gamePlaying, roundScore, activePlayer, diceDOM, player0DOM, player1DOM;


player0DOM = document.querySelector('.player-0-panel');
player1DOM = document.querySelector('.player-1-panel');
diceDOM = document.querySelector('.dice');


init();

document.querySelector('.btn-roll').addEventListener('click', rollDice); 
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-new').addEventListener('click', init);
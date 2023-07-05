'use strict';


// ELEMENTS 
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const dicEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');

let scores, currentscore, activeplayer, playing;

//INITILIZATION AN INIT FUNCTION TO START GAME
const init = function(){
    
     scores = [0,0];
      currentscore = 0;
      activeplayer = 0;
      playing =true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0el.textContent = 0;
    current1el.textContent = 0;

    dicEl.classList.add('hidden');
    player0el.classList.remove('player--winner');
    player1el.classList.remove('player--winner');
    player0el.classList.add('player--active');
    player1el.classList.remove('player--active');
};

//CALLING INIT FUNCTION SO IT START GAME AND SET VARIBLES TO INITILIZATION LEVEL
init();



// sWITCH FUCTION IT WILL HELP TO CHANGE PLAYER AFTER HOLDING A SCORE OR GETIING A DICE FOR ONE POINT
const switchPlayer = function(){
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    currentscore=0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player1el.classList.toggle('player--active');
    player0el.classList.toggle('player--active');

    playing=true;

};


// dICE ROLLING FUNCTION
btnRoll.addEventListener('click', function(){

    if(playing) {
    // generating random dice roll
    const dice = Math.trunc(Math.random()*6) +1;
    console.log(dice);

    //display dice
    dicEl.classList.remove('hidden');
    dicEl.src = `dice-${dice}.png`;

    //check for rolled AND CHECK FOR 1
    if(dice !== 1){
        // ADDING DICE TO CURRENT SCORE
        currentscore += dice;
        document.getElementById(`current--${activeplayer}`).textContent = currentscore;
    
    }else{
        
        // SWITCH TO NEXT PLAYER
      switchPlayer();


    }
}

});

btnHold.addEventListener('click', function(){

    if(playing){
        // ADD CURRENT SCORE TO ACTIVE PLAYERS SCORE
    scores[activeplayer] += currentscore;

    document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];
    
// CHECKING FOR SCORE MUST BE LESS OR EQUAL TO 100
    if(scores[activeplayer] >= 100 ){
        playing = false;
        dicEl.classList.add('hidden');
        document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
    
    } else{
        switchPlayer();

    }

}

});

btnNew.addEventListener('click', init);



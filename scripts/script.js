const ROCK = 'Rock';
const PAPER = 'Paper';
const SCISSORS = 'Scissors';

const SCORE = 'Score';

const WIN = 'You win.';
const LOSE = 'You lose.';
const DRAW = 'Tie.';


let score = JSON.parse(localStorage.getItem(SCORE));
if(!score){
    score = {
        wins: 0,
        draws: 0,
        loses: 0
    }
}

updateScoreElement();


function getComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';

    if(randomNumber >= 0 && randomNumber < 1 / 3){
        computerMove = ROCK;
    }else if(randomNumber >= 1 / 3 && randomNumber < 2 / 3){
        computerMove = PAPER;
    }else{
        computerMove = SCISSORS;
    }
    return computerMove;
}

function playGame(playerMove){
    let computerMove = getComputerMove();
    let result = '';

    if(playerMove == ROCK){

        if(computerMove == ROCK){
            result = 'Tie.';
        }else if(computerMove == PAPER){
            result = 'You lose.';
        }else if(computerMove == SCISSORS){
            result = 'You win.';
        }

    }else if(playerMove == PAPER){

        if(computerMove == ROCK){
            result = 'You win.';
        }else if(computerMove == PAPER){
            result = 'Tie.';
        }else if(computerMove == SCISSORS){
            result = 'You lose.';
        }

    }else if(playerMove == SCISSORS){
        result = 'You lose.';
        if(computerMove == ROCK){
        }else if(computerMove == PAPER){
            result = 'You win.';
        }else if(computerMove == SCISSORS){
            result = 'Tie.';
        }

    }

    if(result == WIN){
        score.wins++;
    }else if(result == LOSE){
        score.loses++;
    }else if(result == DRAW){
        score.draws++;
    }

    localStorage.setItem(SCORE,JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = `You <img src="Images/${playerMove}-emoji.png" class="move-icon"> vs <img src="Images/${computerMove}-emoji.png" class="move-icon"> Computer`
    document.querySelector('.js-moves').innerHTML = `You ${playerMove} vs Computer ${computerMove}`;
}

function resetScore(){
    score.wins = 0;
    score.loses = 0;
    score.draws = 0;

    localStorage.removeItem(SCORE);
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';

}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = 
            `<span class="js-wins">Wins: ${score.wins}</span>, <span class="js-draws">Draws: ${score.draws}</span>, <span class="js-loses">Loses: ${score.loses}</span>`;
    
    if(score.wins === score.loses && score.wins === score.draws){
        return;
    }
    let max = score.wins;
    let result = '.js-wins';
    if(max < score.draws){
        max = score.draws;
        result = '.js-draws';
    }
    if(max < score.loses){
        max = score.loses;
        result = '.js-loses';
    }
    document.querySelector(result).classList.add('js-max-score');
}
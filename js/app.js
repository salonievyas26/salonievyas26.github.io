/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll(".card");
console.log(cards);

/*
 * set up the event listener for a card. If a card is clicked:
 * display the card's symbol (put this functionality in another function that you call from this one)
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*/
const deck = document.querySelector('.deck');
	deck.addEventListener('click' , event => {
	const clickTarget = event.target;
	if(isClickValid(clickTarget))
	{
		toggleCard(clickTarget);
		addtoggleCard(clickTarget);
		if(clockoff)
		{
			startClock();
			clockoff=false;
		}
		
	}
	if(togglecards.length===2)
	{
		console.log("Already have 2 cards");
		checkforMatch();
		addMoves();
		checkScores();
	}
});

function isClickValid(clickTarget)
{
	return(clickTarget.classList.contains('card') && 
	togglecards.length < 2 && 
	!togglecards.includes(clickTarget) && 
	!clickTarget.classList.contains('match'));
}	

function toggleCard(card)
{
		card.classList.toggle('open');
		card.classList.toggle('show');
}


/* 

*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)

*/

let togglecards = [];
function addtoggleCard(clickTarget)
{
	togglecards.push(clickTarget);
	console.log(togglecards);
}

/*
 *  - if the list already has another card, check to see if the two cards match
*/

function checkforMatch()
{
	if(togglecards[0].firstElementChild.className === togglecards[1].firstElementChild.className)
	{
		console.log("cards Match !");
		togglecards[0].classList.toggle('match');
		togglecards[1].classList.toggle('match');
		togglecards=[];
		matched++;
		console.log('match count',matched);
		
		
	}else
	{
		console.log("cards do not match");
		setTimeout(() => {
		toggleCard(togglecards[0]);
		toggleCard(togglecards[1]);
		togglecards=[];
		
				
		},1000);
		
		
 
	}
	if(matched===TOTAL_PAIRS)
		{
			
			gameOver();
		}
	
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function shuffleDeck()
{
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	console.log('cards to Shuffle:',cardsToShuffle);
	const shuffledCards = shuffle(cardsToShuffle);
	for(card of shuffledCards)
	{
		deck.appendChild(card);
	}
}
shuffleDeck();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
 let moves = 0;
 function addMoves()
 {
	 moves++;  //increments the moves
	 const movesText = document.querySelector('.moves');
	 movesText.innerHTML=moves;
 }
 
 function checkScores()
 {
	 if(moves===16 || moves ===24)
	 {
		 hideStar();
	 }
 }
 function hideStar()
 {
	 const starList = document.querySelectorAll('.stars li');
	 for (star of starList)
	 {
		 if(star.style.display!=='none')
		 {
			star.style.display='none';
			break;
		 }
	 }
 }
 //hideStar();
 //hideStar();
 //hideStar();
 
 /* Adding Time Element*/
 
 let clockoff = true;
 let time = 0;
 let clockId;
 
 function startClock()
 {
	 
	 clockId = setInterval(()=>
	 {
		 time++;
		  displayTime();
		 console.log(time);
		 
	 },1000);
	
 }

 function displayTime()
 {
	const mins = Math.floor(time/60);
	const sec = Math.floor(time%60);
	const clock = document.querySelector('.clock');
	 console.log(clock);
	 if (sec < 10) {
		clock.innerHTML = `${mins}:0${sec}`;
	} else {
		clock.innerHTML = `${mins}:${sec}`
}
 }
 function stopClock()
 {
	 clearInterval(clockId);
 }



/*RESET */

function resetClockandTime()
{
	stopClock();
	clockoff=true;
	time=0;
	displayTime();
}

function resetMoves()
{
	moves=0;
	document.querySelector('.moves').innerHTML=moves;
}

function resetStars()
{
	const starList = document.querySelectorAll('.stars li');
	for (star in starList)
	{
		star.style.display='inline';
	}
}
 
 function resetGame()
 {
	 resetClockandTime();
	 resetMoves();
	 resetCards();
	 shuffleDeck();
 }
 
 function resetCards()
 {
	 const cards = document.querySelectorAll('.deck li');
	 for( let card of cards)
	 {
		 card.className='card';
	 }
 }

 document.querySelector('.restart').addEventListener('click',resetGame);
 
 /*Adding Modal */
 document.querySelector('.replay_button').addEventListener('click',replayGame);
 
 let matched = 1;
 const TOTAL_PAIRS = 8;
 
 function gameOver()
 {
	 stopClock();
	 writeModalStats();
	 console.log("I'm in gamover function");
	 toggleModal();
 }
 function replayGame()
 {
	 resetGame();
	 toggleModal();
 }
 function toggleModal()
 {
	 const modal = document.querySelector('.modal_background');
	 modal.classList.toggle('hide');
	 
 }
  //toggleModal();
  //toggleModal();
 //Close Modal
 
 //Modal Stats

 
 function writeModalStats()
 {
	 const timestat= document.querySelector('.modal_time');
	 const movesstat= document.querySelector('.modal_moves');
	 const starstat= document.querySelector('.modal_stars');
	 const clockstat= document.querySelector('.clock').innerHTML;
	 const stars = getStars();
	 
	 timestat.innerHTML=`Time : ${clockstat}`;
	 movesstat.innerHTML=`Moves : ${moves}`;
	 starstat.innerHTML=`Stars : ${stars}`;
 }
 
 function getStars()
 {
	 const stars = document.querySelectorAll('.stars li');
	 let starcount = 0;
	 for (let star of stars)
	 {
		 if(star.style.display!=='none')
		 {
			starcount++;
		 }
	 }
	 return starcount;
 } 
 
 document.querySelector('.cancel_button').addEventListener('click', () => {
	 
	toggleModal();
 });
 
  document.querySelector('.modal_close').addEventListener('click', () => {
	 
	toggleModal();
 });
 
 

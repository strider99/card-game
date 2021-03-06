		var suits = ['spades', 'hearts', 'clubs', 'diams'];
		var cardFace = ['2', '3', '4','5','6','7','8','9','10','J','Q','K','A'];
		var cards = [];
		// to store cards dealt to players a 2d Array
		var players = [[],[]];
		var gameover = false;
		var timer;
		var r = 0; //number of rounds remaining
		var firstrun = true;
		var fightButton = document.querySelector("#btnBattle");
		var fightButton10 = document.querySelector("#btnBattle10");
		var fightButton50 = document.querySelector("#btnBattle50");
		var p1 = document.querySelector("#player1 .hand");
		var p2 = document.querySelector("#player2 .hand");
		var s1 = document.querySelector("#player1 .score");
		var s2 = document.querySelector("#player2 .score");
		

		

		// Event Listeners

		fightButton.addEventListener('click', battle);
		fightButton10.addEventListener('click', function(){
			rounds(10);
		});
		fightButton50.addEventListener('click', function(){
			rounds(50);
		});

		// functions
		function rounds(a){
			r = a;
			timer = setInterval(function() {
				battle()
			},100);
		}

		function battle() {
			if(timer){
				r--;
				outputMessage(`Rounds left ${r} `);
				if(r < 1){
					window.clearInterval(timer);
				}
			}
			if(firstrun){
				firstrun = false;
				buildCards();
				shuffleArray(cards);
				dealCards(cards);
			}
			attack();
		}

		function attack() {
			if(!gameover){
				var card1 = players[0].shift();
				var card2 = players[1].shift();
				var pot = [card1, card2];
				// update the html
				p1.innerHTML = showCard(card1, 0);
				p2.innerHTML = showCard(card2, 0);
				// check winners
				checkWinner(card1, card2, pot);

				// update scores
				s1.innerHTML = players[0].length;
				s2.innerHTML = players[1].length;;


			}
			else{
				outputMessage("Game Over");
				
			}
		}

		function outputMessage(message) {
			document.querySelector('#message').innerHTML = message; 
		}

		function checkWinner(card1, card2, pot){
			if((players[0].length <= 4) || (players[1].length <= 4)){
				gameover = true;
				return;
			}
			if(card1.cardvalue > card2.cardvalue){
				outputMessage("Hand 1 wins");
				players[0] = players[0].concat(pot);
			}
			else if(card1.cardvalue < card2.cardvalue){
				outputMessage("Hand 2 wins");
				players[1] = players[1].concat(pot);
			}
			else {
				outputMessage("Tie occured. Going to Battle Mode");
				// Enter the battle mode
				battlemode(pot);
			}
			console.log(players);
		}

	function battlemode(pot){
		var card1,card2;
		var pos = (pot.length/2);
		// check if each player has enough cards to play battlemode
		if((players[0].length < 4) || (players[1].length < 4)){
			return;

		}else{
			for(var i = 0; i < 4; i++){
				card1 = players[0].shift();
				pot = pot.concat(card1);
				// pos + i to increment and show cards on top of each other
				p1.innerHTML += showCard(card1,(pos+i));
			}
			for(var i = 0; i < 4; i++){
				card2 = players[1].shift();
				pot = pot.concat(card2);
				// pos + i to increment and show cards on top of each other
				p2.innerHTML += showCard(card2,(pos+i));
			}
			checkWinner(card1, card2, pot);
		}
	}

		// show the card. returns data to be updated to html to display cards
		function showCard(c,p){
			var move = p * 40;
			 //var bgColor = (c.icon == "H" || c.icon == "D") ? "red" : "black";
			 var bCard = '<div class="icard '+c.suit+' " style="left:'+move+'px">';
			 bCard += '<div class="cardtop suit">' + c.num + '<br></div>';
			 bCard += '<div class="cardmid suit"></div>';
			 bCard += '<div class="cardbottom suit">' + c.num + '<br></div></div>';
			 console.log(c, move);
			 return bCard;
		}

		// Build the deck of cards
		function buildCards() {
			cards = [];
			for(var s in suits) {
				// first letter in uppercase of the suit
				var suitNew = suits[s][0].toUpperCase();
				for( var n in cardFace){
					var card = {
						suit: suits[s],
						num: cardFace[n],
						cardvalue: parseInt(n) + 2,
						icon: suitNew

					};
					cards.push(card);
				}
			}
			// console.log(cards);

		}

		// Deal the cards to both the players
		function dealCards(array) {
			for(var i = 0; i < array.length; i++){
				var m = i % 2;
				players[m].push(array[i]);
			}
		}

		// Shuffle all the cards. Done whenver a new game starts after building the deck

		function shuffleArray (array) {
			for(var x = array.length - 1 ; x > 0; x--) {
				var ii = Math.floor(Math.random() * (x+1));
				var temp = array[x];
				array[x] = array[ii];
				array[ii] = temp; 

			}
			console.log(array);

			return array;

			
		}

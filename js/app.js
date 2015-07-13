var cards = [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12];
var player1 = [];
var player2= [];
var turn = true;
var display;

function shuffle(hand) {
	for (var i=hand.length-1; i>0; i--) {
		var j = Math.floor(Math.random()*(i + 1));
		var t = hand[i];
		hand[i] = hand[j];
		hand[j] = t;
	}
	return hand;
}

//function to shuffle cards and create the board
function gameStart(){
	display = $('#display');
	display.html('Player 1 Turn');

	var board = shuffle(cards);
	var items = "";
	for(var i = 0; i<board.length; i++){
		items +=  '<li class="flip-container" data-card="card-'+ board[i] +'" >' + '<div class="flipper">' + '<div class="front">' + board[i] +'</div>'+ 
		'<div class="card card-'+ board[i] +'" >' + '</div>' +'</div>'+ '</li>';
	}

	$('#board').html(items);
	$('li.flip-container').on('click', turnCard);

	player1=[];
	player2=[];
}
//function to turn cards during turn or return the winner.
function turnCard(){
	// The class of active is used to compare the two cards...
	$(this).addClass('active flipped');

	if($('.active').length %2 === 0){
		getPair();
	} else if(player1.length + player2.length === 24){
		getWinner();
	} else{
		// alert("turn another card")
	}
}

function getPair(){
	if($('.active:eq(0)').attr('data-card') == $('.active:eq(1)').attr('data-card')){
		alert("Match found")
		if (turn == true) {
			player1.length++;
			$('.p1score').html("<p class='score'>" + 'Player 1 pairs found' + "</p>" + " " +'<h2>' + player1.length + '</h2>');
			$('.active').addClass('p1-pair').off('click');
		} else {
			player2.length++;
			$('.p2score').html("<p class='score'>" +'player 2 pairs found' + "</p>" + " " + '<h2>' + player2.length + '</h2>');
			$('.active').addClass('p2-pair').off('click');
		}
	} else{
		// alert('match not found')
		$('.active').removeClass('flipped');
		if(turn) {
			display.html('Player 2 Turn');
			turn = false;
		} else {
			display.html('Player 1 Turn');
			turn = true;
		}
	}
	$('.flip-container').removeClass('active');
}
//compare the arrays of the player to see who win
function getWinner(){
	if (player1.length > player2.length){
		$('#display').html("player1 Wins")
	}
	else if(player1.length == player2.length){
		$('#display').html("it's a tie");
	}
	else{
		$('#display').html("player 2 wins");
	}
}

$(document).ready(function(){
	$('#newGame').on('click', gameStart)
});

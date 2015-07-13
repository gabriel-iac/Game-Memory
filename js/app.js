var cards = [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12];
var player1 = [];
var player2= [];
var turn = true;
var playerTurn = $('#display');
//function to shuffle cards and create the board
function gameStart(){
	function shuffle(hand) {
		for (var i=hand.length-1; i>0; i--) {
			var j = Math.floor(Math.random()*(i + 1));
			var t = hand[i];
			hand[i] = hand[j];
			hand[j] = t;
		}

		return hand;
	}
	var board = shuffle(cards);
	var items = "";
	for(var i = 0; i<board.length; i++){
		items +=  '<li class="flip-container" data-card="card-'+ board[i] +'">' + '<div class="flipper">' + '<div class="front">' + board[i] +'</div>'+ 
		'<div class="card card-'+ board[i] +'" >' + '</div>' +'</div>'+ '</li>';
	}

	$('#board').html(items);
	$('li.flip-container').on('click',function(){
$('.flipper .front').removeClass('front');
	}, turnCard);
	console.log(shuffle(cards));
	player1=[0];
	player2=[0];
}
//function to turn cards during turn or return the winner.
function turnCard(){

	$(this).addClass('active');
	if($('.active').length %2 === 0){
		getPair();
	}
	else if(player1.length + player2.length === 24){
		getWinner();
	}
	else{
		alert("turn another card")
	}
}

function getPair(){
	if($('.active:eq(0)').attr('data-card') == $('.active:eq(1)').attr('data-card')){
		alert("Match found")
		if (turn == true){
			player1.length++;
			$('.p1score').html('player 1' + " " +player1.length);
			$('.active').addClass('p1-pair').off('click');
			$('.card').removeClass('active');

		}
		else
		{
			player2.length++;
			$('.p2score').html('player 2' + " " +player2.length);
			$('.active').addClass('p2-pair').off('click');
			$('.flip-container').removeClass('active');
		}
	}
	else{
		alert('match not found')
		if(turn == true){
			$('.flip-container').removeClass('active');
			$('#display').html('Player 1 Turn');
			turn=false;
		}
		else{
			$('#display').html('Player 2 Turn');
			$('.flip-container').removeClass('active');
			turn = true;
		}
	}
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
//
$(document).ready(function(){
	var playerTurn = $('#display');
	$('#newGame').on('click', function(){
		playerTurn.html('Player 1 Turn');

		gameStart()
		turn=true;

	})
});

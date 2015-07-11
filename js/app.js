var cards = [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12];
var player1 = [];
var player2= [];
var turn = true;
var playerTurn = $('.playerTurn');
var gameStart = function(){
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
		items += '<li class="card card-'+ board[i] +'" data-card="card-'+ board[i] +'">'+ board[i] +'</li>'
	}

	$('#board').html(items);
	$('.card').on('click', turnCard);
	console.log(shuffle(cards));
}

function turnCard(){
	$(this).addClass('active');
	if($('.active').length %2 === 0){
		getPair();
	}
	else{
		alert("turn another card")
			}
}

function getPair(){
	if($('.active:eq(0)').attr('data-card') === $('.active:eq(1)').attr('data-card')){
		alert("Match found")
		if (turn == true){
			player1.length++;
			$('P1score').html('player 1' + " " + player1.length)
		}
		else
		{
			player2.length++;
			$('.P2score').html('player 2' + " " +player2.length)
		}
	}
	else{
		alert('match not found')
		if(turn == true){
			$('.card').removeClass('active')
			playerTurn.html('Player 1 Turn')
			turn=false;
		}
		else{
			playerTurn.html('Player 2 Turn')
		$('.card').removeClass('active')
		turn = true;
}
	}
}
$(document).ready(function(){
	$('#newGame').on('click', function(){
		gameStart()

	})
});

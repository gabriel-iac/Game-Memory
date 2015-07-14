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
var timer;
//function to shuffle cards and create the board
function gameStart(){
	turn = true;
	display = $('#display');
	display.removeClass('p2Turn').addClass('p1Turn').html('Player 1 Turn');
	var board = shuffle(cards);
	var items = "";
	for(var i = 0; i<board.length; i++){
		items +=  '<li class="flip-container animated bounceInUp hvr-bob" data-card="card-'+ board[i] +'" >' + '<div class="flipper">' + '<div class="front">' +'</div>'+ 
		'<div class="card card-'+ board[i] +'" >' + '</div>' +'</div>'+ '</li>';
	}
	$('.p2score').html("");
	$('.p1score').html("");
	player1=[];
	player2=[];
	// clearTimeout(timer);
	// $('#board').html("");
	// $(items).each(function(index, item){
	// 	timer = setTimeout(function(){

	// 		$('#board').append(item) ;
	// 	}, 300*index);			
	// })
	$('.flip-container').removeClass('animated bounceInUp');
	
	$('#board').html(items);
	$('li.flip-container').removeClass('animated bounceInLeft')
	$('li.flip-container').on('click', turnCard);

	
}
//function to turn cards during turn or return the winner.
function turnCard(){
	// The class of active is used to compare the two cards...
	$(this).addClass('active flipped');

	if($('.active').length % 2 === 0){
		setTimeout(function() {
			if(player1.length + player2.length == 11){
				
				getWinner(); 
			}
			else{
				getPair();
			}
			
		}, 1000)
	}  
} 


function getPair(){
	if($('.active:eq(0)').attr('data-card') == $('.active:eq(1)').attr('data-card')){
		// alert("Match found")
		if (turn == true) {
			player1.length++;
			$('.p1score').html("<p class='score'>" + 'Player 1 pairs found' + "</p>" + " " +'<h2>' + player1.length + '</h2>');
			$('.p1score h2').addClass('animated flip');
			$('.active').addClass('p1-pair').off('click');
			setTimeout(function () {
				$('.p1score h2').removeClass('animated flip')
			}, 1000);
			
		} else {
			player2.length++;
			$('.p2score').html("<p class='score'>" +'player 2 pairs found' + "</p>" + " " + '<h2>' + player2.length + '</h2>');
			$('.p2score h2').addClass('animated flip');
			$('.active').addClass('p2-pair').off('click');
			setTimeout(function () {
				$('.p2score h2').removeClass('animated flip')
			}, 1000);

		}
	} else{
		// alert('match not found')
		$('.active').removeClass('flipped');
		if(turn) {
			display.removeClass('p1Turn').addClass('p2Turn animated zoomIn').html('Player 2 Turn');
			turn = false;
		} else {

			display.removeClass('p2Turn').addClass('p1Turn animated zoomIn').html('Player 1 Turn');
			turn = true;
		}
		setTimeout(function(){
			display.removeClass('animated zoomIn')
		}, 1000)
	}
	$('.flip-container').removeClass('active');
}
//compare the arrays of the player to see who win
function getWinner(){
	
	if (player1.length > player2.length){
		display.html("Player 1 Wins")
	}
	else if(player1.length == player2.length){
		display.html("it's a tie");
	}
	else{
		display.html("Player 2 Wins");
	}
}

$(document).ready(function(){
	$('#newGame').on('click', gameStart)
});

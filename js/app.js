var cards = [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12];
var player1 = [];
var player2= [];
var turn = true;
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
	if($('.active').length === 2){
		getPair();
	}
	else{
		alert("turn another card")
	}
}

function getPair(){
	if($('.active:eq(0)').attr('data-card') === $('.active:eq(1)').attr('data-card')){
alert("Match found")
}
else{

	$('.card').removeClass('active')

alert('no match found')

}
}
$(document).ready(function(){
	$('#newGame').on('click', function(){
		gameStart()

	})
});

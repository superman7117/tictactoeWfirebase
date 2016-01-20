'use strict';

var ref = new Firebase('https://ozanneredbutton.firebaseio.com/');
var playerNumRef = ref.child('playerNum');
var playerTurnRef = ref.child('playerTurn')
var iconsRef = ref.child('icons')
var playerNumLocal;
var win = false;
var selectedSquares = [];
$(document).ready(init);

function init(){
goHoe()

}

function goHoe(){
  playerNumRef.once('value', function(snapshot){
    var data = snapshot.val();
    console.log(data);
    if(!data || data === 1){
      var playerNum = data + 1;
      goLocal(playerNum)

      console.log(playerNum, "playerNum");
      $('<div>').prepend('You are player '+playerNum).appendTo('.mydiv');
      ref.update({
        playerNum: playerNum,
        playerTurn: true
      })
    }
    else{
      $('<div>').append('We already have two players. Check again later.').appendTo('.mydiv');
      return;
    }
  })
}
function goLocal(playerNum){
  playerNumLocal = playerNum;
}

ref.on('value', function(snapshot){
  var data = snapshot.val()
  console.log(playerNumLocal, 'data');
  if(data.playerNum === 2 && data.playerTurn === true &&
     playerNumLocal === 1 || data.playerNum === 2 &&
     data.playerTurn === false && playerNumLocal === 2 ){
       $('div').addClass('turn').text("Your Turn").appendTo('.row')
       $('.container').on('click', '.box', addIconLocal)
     }
  else {$('.turn').remove()}
})

function addIconLocal(){
  var squareClicked = $(this).data('num');
  console.log(squareClicked, "sq");
  if (squareClicked.attr('data-icon') !== 'true'){
    if (firstPlayer === 'true'){
      x.attr('data-icon', true).attr('data-who', 'first').children().text('X');
      ref.update({
        squareClicked: squareClicked,
        playerTurn: false
      })
    }
    else if (firstPlayer === 'false'){
      x.attr('data-icon', true).attr('data-who', 'second').children().text('O');
      $('.lo :nth-child(2)').css('color', '#333').next().remove();
      $('.lo :nth-child(1)').css('color', 'yellow');
      firstPlayer = 'true';
    }
  }
  winning($(this));
}


function winning(newThis){

  for (var i = 0; i < selectedSquares.length; i++) {
    for (var j = i + 1; j < selectedSquares.length; j++) {
        for (var k = j + 1; k < selectedSquares.length; k++) {
            if (selectedSquares[i] + selectedSquares[j] + selectedSquares[k] == 15) {
              win = true;
              $('.btn').on('click', replay);
            }
        }
    }


  }
  else if($(".container").find('[data-icon="true"]').length === 9){
    $('.mydiv').append('<div class="win"><div><div class="cat"></div> is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
    win = true;
    $('.btn').on('click', replay);

  }
}

function replay(){
  newBucket = $.merge([], bucket);
  firstPlayer = 'true';
  icons = [];
  win = false;
  $('.mydiv').parent().nextAll().remove();
  $('.btn').remove();
  $('.win').remove();
  init();
}
















// 'use strict';
//
// var ref = new Firebase('https://ozanneredbutton.firebaseio.com/');
// var readyToPlay= false;
// var playerTurn= 0;
// $(document).ready(function(){
// var playerNum = 1;
//
//   ref.set({
//     playerNum: '',
//     playerTurn: '',
//     readyToPlay: ''
//   })
//   ref.on('child_added', function(snapshot){
//     var message = snapshot.val()
//     console.log(message);
//     readyToPlay = true;
//     playerNum = parseInt(message.playerNum) + 1;
//     if (message.playerNum > 2){
//       $('div').text('Already two players').appendTo('body');
//       return;
//     }
//     else if(message.playerNum ===2){
//       readyToPlay = true
//       $('#turntracker').append("You are Player #" + playerNum+". It is Player "+playerTurn+"'s turn!");
//       ref.update({
//         playerNum: playerNum,
//         playerTurn: 1,
//         readyToPlay: readyToPlay
//       })
//     }
//     else {
//       readyToPlay = false;
//       $('#turntracker').append("You are Player #" + playerNum+". It is Player "+playerTurn+"'s turn!");
//
//       ref.update({
//         playerNum: playerNum,
//         playerTurn: 1,
//         readyToPlay: readyToPlay
//       })
//     }
//
//   })
// $('.magic').on('click' myclick)
// var playerNum = 0
// function myclick(){
//   if()
//
//
// }
//






// })

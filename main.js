'use strict';

var ref = new Firebase('https://ozanneredbutton.firebaseio.com/');
var playerNumRef = ref.child('playerNum');
var playerTurnRef = ref.child('playerTurn')
var iconsRef = ref.child('icons')
var playerNum;
var win = false;
var firstPlayer = 'true';
var icons = [];
$(document).ready(init);

function init(){
  $('.container').append('<div class="row lo"><span class="glyphicon '+ icons[0]+' aria-hidden="true"></span> V. <span class="glyphicon '+ icons[1] +' aria-hidden="true"></span></div>');
  $('.container').append(boardBinder);
  $('.col-xs-4').on('click', markSquare);
  $('.lo :nth-child(1)').css('color', 'yellow');
goHoe()

}

function goHoe(){
  playerNumRef.once('value', function(snapshot){
    var data = snapshot.val();
    console.log(data);
    if(!data || data === 1){
      playerNum = data + 1;
      console.log(playerNum, "playerNum");
      $('<div>').prepend('You are player '+playerNum).appendTo('.mydiv');
      bucketPicker();
      ref.update({
        icons: icons,
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

console.log(playerNum)
function boardBinder(){
  var boardSize = 9;
  var boardArray = [];
  var rowArray = [];
  var addingUp = 0;
  for (var i = 0; i < boardSize; i++){
    addingUp++
    rowArray.push('<div class="col-xs-4 c'+addingUp+'"><span class="glyphicon" aria-hidden="true"></span></div>');
  }
  var num = 0;
  for (var n = 0; n < boardSize; n++){
    num++
    boardArray.push('<div class="row r'+num+'">'+rowArray.join('')+'</div>');
  }
  return boardArray.join('');
}


function markSquare(){


  if ($(this).attr('data-icon') !== 'true' && win !== true){
    addIcon($(this));
    var $dataWho = $(this).attr('data-who')
    console.log($(this).attr('data-who'));
    console.log($('.r1').children().attr('data-icon').length)
    winning($(this));
  }
}
else {
  return;}
})
}

function addIcon(x){
  if (x.attr('data-icon') !== 'true'){
    if (firstPlayer === 'true'){
      x.attr('data-icon', true).attr('data-who', 'first').children().addClass(icons[0]);
      $('.lo :nth-child(1)').css('color', '#333');
      $('.lo :nth-child(2)').css('color', 'yellow');
      firstPlayer = 'false';
    }
    else if (firstPlayer === 'false'){
      x.attr('data-icon', true).attr('data-who', 'second').children().addClass(icons[1]);
      $('.lo :nth-child(2)').css('color', '#333').next().remove();
      $('.lo :nth-child(1)').css('color', 'yellow');
      firstPlayer = 'true';
    }
  }
}

var bucket = ['glyphicon-plus','glyphicon-pencil','glyphicon-cloud','glyphicon-envelope',
'glyphicon-glass', 'glyphicon-music', 'glyphicon-search', 'glyphicon-heart', 'glyphicon-star-empty',
'glyphicon-user', 'glyphicon-film','glyphicon-th-list', 'glyphicon-ok', 'glyphicon-off',
'glyphicon-signal', 'glyphicon-home', 'glyphicon-road', 'glyphicon-qrcode'];
var newBucket = $.merge([], bucket);

function bucketPicker(){
  for (var i = 0; i < 2; i++){
    var num = Math.floor(Math.random()*newBucket.length);
    icons.push(newBucket[num]);
    newBucket.splice(num,1);
  }
}

function winning(newThis){
  if($('.r1>[data-who="first"]').length === 3 ||
  ($('.r1>[data-who="second"]').length === 3)||
  ($('.r2>[data-who="first"]').length === 3)||
  ($('.r2>[data-who="second"]').length === 3) ||
  ($('.r3>[data-who="first"]').length === 3)||
  ($('.r3>[data-who="second"]').length === 3)||
  ($('.c1[data-who="first"]').length === 3)||
  ($('.c1[data-who="second"]').length === 3) ||
  ($('.c2[data-who="first"]').length === 3) ||
  ($('.c2[data-who="second"]').length === 3)||
  ($('.c3[data-who="first"]').length === 3)||
  ($('.c3[data-who="second"]').length === 3) ||
  ($('.r1>.c1[data-who="first"], .r2>.c2[data-who="first"], .r3>.c3[data-who="first"]').length === 3)||
  ($('.r1>.c1[data-who="second"], .r2>.c2[data-who="second"], .r3>.c3[data-who="second"]').length === 3)||
  ($('.r1>.c3[data-who="first"], .r2>.c2[data-who="first"], .r3>.c1[data-who="first"]').length === 3)||
  ($('.r1>.c3[data-who="second"], .r2>.c2[data-who="second"], .r3>.c1[data-who="second"]').length === 3)){
    $('.mydiv').append('<div class="win"><div><span class="'+ $(newThis).children().attr("class")+'" aria-hidden="true"></span>is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
    win = true;
    $('.btn').on('click', replay);
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

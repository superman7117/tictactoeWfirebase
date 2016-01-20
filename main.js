'use strict';

var ref = new Firebase('https://ozanneredbutton.firebaseio.com/');
var playerNumRef = ref.child('playerNum');
var playerTurnRef = ref.child('playerTurn')
var winRef = ref.child('win')
var playerNumLocal;
var win = false;
var gameState = true;
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
  console.log(data.win, 'data');
  if(data){
    if(data.win === "CAT" ){
      $('.mydiv').append('<div class="win"><div><div class="cat"></div> is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
      $('.btn').on('click', replay);
    }
    else if (data.win === "Player 1"){
      $('.mydiv').append('<div class="win"><div>'+data.win+' is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
      $('.btn').on('click', replay);
    }
    else if (data.win === "Player 2"){
      $('.mydiv').append('<div class="win"><div>'+data.win+' is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
      $('.btn').on('click', replay);
    }
  }
  if(data.playerNum === 2 && data.playerTurn === true &&
    playerNumLocal === 1){
      // clickable()
      $('<div>').addClass('yourTrun').prepend('Your Turn!!').appendTo('.mydiv');
      addIconNonLocal(data.squareClicked)
      $('.container').on('click', '.box', addIconLocalTrue)
      // unclickable()
    }
    else if (data.playerNum === 2 &&
      data.playerTurn === false && playerNumLocal === 2 ){
        // clickable()
        $('<div>').addClass('yourTrun').prepend('Your Turn!!').appendTo('.mydiv');
        addIconNonLocal(data.squareClicked)
        $('.container').on('click', '.box', addIconLocalFalse);
        // unclickable()
      }
      else {
        $('.yourTrun').remove();
      return;}
      })

      function clickable(){
        gameState = true;
      }

      function unclickable(){
        gameState = false;
      }

      function addIconNonLocal(x){
        console.log('x', x);
        $('.container').find('[data-num="'+x+'"]').attr('data-icon', true).text('O');
      }

      function addIconLocalTrue(){
        if (gameState === false){
          return;
        }
        var squareClicked = $(this).data('num');
        selectedSquares.push(squareClicked);
        console.log(squareClicked, "sq");
        if ($(this).attr('data-icon') !== 'true'){
          $(this).attr('data-icon', true).text('X');
          ref.update({
            squareClicked: squareClicked,
            playerTurn: false
          })
        }
        else {return;}
        winningPlayer1();
      }

      function addIconLocalFalse(){
        if (gameState === false){
          return;
        }
        var squareClicked = $(this).data('num');
        selectedSquares.push(squareClicked);
        console.log(squareClicked, "sq");
        if ($(this).attr('data-icon') !== 'true'){
          $(this).attr('data-icon', true).text('X');
          ref.update({
            squareClicked: squareClicked,
            playerTurn: true
          })
        }
        else {return;}
        winningPlayer2();
      }

      function winningPlayer1(){
        for (var i = 0; i < selectedSquares.length; i++) {
          for (var j = i + 1; j < selectedSquares.length; j++) {
            for (var k = j + 1; k < selectedSquares.length; k++) {
              if (selectedSquares[i] + selectedSquares[j] + selectedSquares[k] == 15) {
                ref.update({
                  win: 'Player 1',
                })
                $('.mydiv').append('<div class="win"><div><div class="cat"></div> is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
                $('.btn').on('click', replay);
              }
              else if($(".container").find('[data-icon="true"]').length === 9){
                $('.mydiv').append('<div class="win"><div><div class="cat"></div> is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
                ref.update({
                  win: "CAT",
                })
                $('.btn').on('click', replay);
              }
            }
          }
        }
      }

      function winningPlayer2(){
        for (var i = 0; i < selectedSquares.length; i++) {
          for (var j = i + 1; j < selectedSquares.length; j++) {
            for (var k = j + 1; k < selectedSquares.length; k++) {
              if (selectedSquares[i] + selectedSquares[j] + selectedSquares[k] == 15) {
                ref.update({
                  win: 'Player 2',
                })
              }
              else if($(".container").find('[data-icon="true"]').length === 9){
                $('.mydiv').append('<div class="win"><div><div class="cat"></div> is the Winner!!!</div><button type="button" class="btn btn-success">Play Again!!</button>');
                ref.update({
                  win: "CAT",
                })
              }
            }
          }
        }
      }

      function replay(){
        selectedSquares = [];
        ref.set({
          playerNum: 2,
          playerTurn: true,
          squareClicked: '',
          win: ''
        })
        $('.box').removeAttr('data-icon').empty();
        $('.btn').remove();
        $('.win').remove();

      }

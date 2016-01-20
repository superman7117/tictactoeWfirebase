'use strict';

var ref = new Firebase('https://ozanneredbutton.firebaseio.com/');
var readyToPlay= false;
var playerTurn= 0;
$(document).ready(function(){
var playerNum = 1;

  ref.set({
    // playerNum: '',
    playerTurn: '',
    readyToPlay: ''
  })
  ref.on('child_added', function(snapshot){
    var message = snapshot.val()
    console.log(message);
    readyToPlay = true;
    playerNum = parseInt(message.playerNum) + 1;
    if (message.playerNum > 2){
      $('div').text('Already two players').appendTo('body');
      return;
    }
    else if(message.playerNum ===2){
      readyToPlay = true
      $('#turntracker').append("You are Player #" + playerNum+". It is Player "+playerTurn+"'s turn!");
      ref.update({
        playerNum: playerNum,
        playerTurn: 1,
        readyToPlay: readyToPlay
      })
    }
    else {
      readyToPlay = false;
      $('#turntracker').append("You are Player #" + playerNum+". It is Player "+playerTurn+"'s turn!");

      ref.update({
        playerNum: playerNum,
        playerTurn: 1,
        readyToPlay: readyToPlay
      })
    }

  })
// $('.magic').on('click' myclick)
// var playerNum = 0
// function myclick(){
//   if()
//
//
// }
//






})

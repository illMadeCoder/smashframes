var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1rdz4i8qbE9mi44lkW2_ByQZODiwU4UUF--ZizCFdIHo/pubhtml';
var character_selection = null
var move_selection = null
var scene = null
var data_obj = {}
var char_list = []
var move_list = []

function new_frame_element(_element,_class="") {
  return $('<li style="text-align:center" class="list-group-item ' +_class + '"></li>').append(_element)
}
function parse_move(_move_name,_move) {
  let move = $('<ul class="list-group"><h3 class="list-group-item-heading">' + _move_name + '</h3></ul>')
  let move_gif = $('<img src="' + _move[0] + '" class="img-thumbnail" alt="Responsive image"></img>')
  move.append($('<li style="text-align:center" class="list-group-item"></li>').append(move_gif))
  for (let i = 1; i < _move.length; i++) {
    move.append($('<li class="list-group-item">' + _move[i] + '</li>'))
  }
  return move
}
function new_frame(_char) {
  let frame = $('<ul class="list-group col-md-4"></ul>')
  frame.append(new_frame_element($('<h3 style="font-weight:bold">' + _char + '</h3>')))
  frame.append(new_frame_element($('<a href=' +data_obj[_char].source + '>DATA SOURCE</a>')))
  move_selection.children('button').each(function () {
    if ($(this).hasClass('active')) {
      frame.append(new_frame_element(parse_move($(this).text(),data_obj[_char].moves[$(this).text()])))
    }
  })
  return frame
}
function update_scene() {
  scene.empty()
  gifs = []
  character_selection.children('button').each(function () {
    if ($(this).hasClass("active")) {
      scene.append(new_frame($(this).text()))
    }
  })
}

function init(_character_selection,_move_selection) {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: process_data,
                   simpleSheet: true } )
}
function process_moves(_moves) {
  for (var move in _moves) {
    _moves[move] = _moves[move].replace(/(^[ \t]*\n)/gm, "").trim().split('\n')
  }
  return _moves
}
function process_data(_data,_tabletop) {
  //Import melee spreadsheet data, and make jquery buttons
  for (let i = 0; i < _data.length; i++) {
    //setup
    let char = _data[i].Character
    char_list.push(char)
    data_obj[char] = {source:_data[i].Source}
    delete _data[i].Character
    delete _data[i].Source
    //process move
    data_obj[char].moves = process_moves(_data[i])
    //buttons
    //chars
    let char_button = $('<button type="button" class="btn-lg btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">' + char + '</button>&nbsp;')
    char_button.on('click', function () {
      char_button.button('toggle')
      update_scene("char",char_button.button().hasClass('active'),char)
    })
    character_selection.append(char_button)
    //moves, only need to do first time in loop
    if (i == 0) {
      for (var move in data_obj[char].moves) {
        move_list.push(move)
        let move_button = $('<button type="button" class="btn-lg btn-warning" data-toggle="button" aria-pressed="false" autocomplete="off">' + move + '</button>&nbsp;')
        move_button.on('click', function () {
          move_button.button('toggle')
          update_scene("move",move_button.button().hasClass('active'),move)
        })
        move_selection.append(move_button)
      }
    }
  }
}
$(document).ready(function () {
  character_selection = $("#character_selection")
  move_selection = $("#move_selection")
  scene = $("#scene")
  init(character_selection,move_selection)

});

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1rdz4i8qbE9mi44lkW2_ByQZODiwU4UUF--ZizCFdIHo/pubhtml';
var headers = [];
var characters = {};
var moves = {};
var frame_view_container = $(".frame_data");
var selected_color = "#4286f4"
var scene = null

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: process,
                   simpleSheet: true } )
}

function new_move(_move,_move_name) {
  let move_data = _move.split("\n")
  let move = $("<ul class=\"frame_list\">" + _move_name + "</ul>")
  for (let i = 0; i < move_data.length; i++) {
    if (i == 0) {
      move.append($("<li><img src=\"" + move_data[i] + "\" title=\"source: imgur.com\" /></a></li>"))
    } else {
      move.append($("<li>" + move_data[i] + "</li>"))
    }
  }
  return move
}

function new_frame(_character_name,_moves) {
  var frame_view = $("<td class = \"frame\"><ul class = \"frame_list\"><li class=\"frame_name\">" + _character_name + "</li>" + "<li><a class = \"frame_source\" href=\"" + _moves.Source + "\">DATA SOURCE</a></li>" + "</ul></td>")
  for (var move in _moves) {
    if (moves[move] && moves[move].selected == true) {
      frame_view.append(new_move(_moves[move], move))
    }
  }
  return frame_view
}

function new_scene() {
  scene.empty()
  for (var char in characters) {
    if (characters[char].selected == true) {
      scene.append(new_frame(char,characters[char].moves))
    }
  }

}

function selection_table(_obj,_row_size,_td_class) {
  let html_string = ""
  let i = 0
  for (var k in _obj) {
    let html_start = ""
    let html_end = ""
    if (i % _row_size == 0) {
      html_start += "<tr>"
    }
    if (i % _row_size == _row_size-1) {
      html_end += "</tr>"
    }
    html_start += "<td class=\"" + _td_class + "\">"
    html_end = "</td>" + html_end
    html_string += html_start + k + html_end
    i++;
  }
  return html_string
}

function process(_data, _tabletop) {
  headers = _tabletop.models.Raw.columnNames
  for (let i = 0; i < _data.length; i++) {
    characters[_data[i].Character] = {}
    characters[_data[i].Character].name = _data[i].Character
    characters[_data[i].Character].moves = _data[i]
    characters[_data[i].Character].selected = false
  }
  for (let i = 2; i < headers.length; i++) {
    moves[headers[i]] = {}
    moves[headers[i]].name = headers[i]
    moves[headers[i]].selected = false;
  }
  let select_characters = $(".select_characters table");
  select_characters.append($(selection_table(characters,5,"character")))
  let select_moves = $(".select_moves table")
  select_moves.append($(selection_table(moves,6,"move")))
  $("." + "character").each(function () {
    $(this).on("click", function () {
      if (characters[$(this).text()].selected != true) {
        characters[$(this).text()].selected = true
        $(this).addClass("selected")
        $(this).css("background-color",selected_color)
      } else {
        characters[$(this).text()].selected = false
        $(this).removeClass("selected")
        $(this).css("background-color","")
      }
      new_scene()
    })
  })
  $("." + "move").each(function () {
    $(this).on("click", function () {
      if (moves[$(this).text()].selected != true) {
        moves[$(this).text()].selected = true
        $(this).addClass("selected")
        $(this).css("background-color",selected_color)
      } else {
        moves[$(this).text()].selected = false
        $(this).removeClass("selected")
        $(this).css("background-color","")
      }
      new_scene()
    })
  })
}

$(document).ready(function () {
  init()
  scene = $(".scene")
});

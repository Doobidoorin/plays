$(function(){

/* Opening lines the bot plays (or the user practices) when
   "Play the Opening" is selected. */
var OPENINGS = {
  white: [
    { family:"Italian Game", variations:[
      { name:"Giuoco Piano", moves:["e4","e5","Nf3","Nc6","Bc4","Bc5","c3","Nf6","d3","d6","O-O","O-O","Re1","a6","Bb3","Ba7","h3","h6"] },
      { name:"Fried Liver Attack", moves:["e4","e5","Nf3","Nc6","Bc4","Nf6","Ng5","d5","exd5","Nxd5","Nxf7","Kxf7","Qf3+","Ke6","Nc3","Nb4","Qe4","c6","a3","Na6","d4"] },
      { name:"Evans Gambit", moves:["e4","e5","Nf3","Nc6","Bc4","Bc5","b4","Bxb4","c3","Ba5","d4","exd4","O-O","d6","cxd4","Bb6","Nc3","Na5"] }
    ]},
    { family:"Ruy Lopez", variations:[
      { name:"Main Line (Closed Defense)", moves:["e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Be7","Re1","b5","Bb3","d6","c3","O-O","h3","Nb8","d4","Nbd7"] },
      { name:"Exchange Variation", moves:["e4","e5","Nf3","Nc6","Bb5","a6","Bxc6","dxc6","O-O","f6","d4","exd4","Nxd4","c5","Ne2","Qxd1","Rxd1","Bd7"] }
    ]},
    { family:"London System", variations:[
      { name:"London System", moves:["d4","d5","Nf3","Nf6","Bf4","e6","e3","Bd6","Bg3","O-O","Nbd2","c5","c3","Nc6","Bd3","Bxg3","hxg3","Qb6"] }
    ]},
    { family:"Vienna Gambit", variations:[
      { name:"Main Line", moves:["e4","e5","Nc3","Nf6","f4","d5","fxe5","Nxe4","Nf3","Be7","d4","O-O","Bd3","f5","exf6","Nxf6","O-O"] },
      { name:"Max Lange Defense", moves:["e4","e5","Nc3","Nf6","f4","d5","fxe5","Nxe4","Qf3","Nc6","Bb5","Nd6","Bxc6+","bxc6","d3","Nf5","d4"] },
      { name:"Steinitz Variation", moves:["e4","e5","Nc3","Nf6","f4","d5","fxe5","Nxe4","d3","Qh4+","g3","Nxg3","Nf3","Qh5","hxg3","Qxf3","Qxf3"] }
    ]}
  ],
  black: [
    { family:"Caro-Kann", variations:[
      { name:"Classical", moves:["e4","c6","d4","d5","Nc3","dxe4","Nxe4","Bf5","Ng3","Bg6","h4","h6","Nf3","Nd7","h5","Bh7","Bd3","Bxd3","Qxd3"] },
      { name:"Advance Variation", moves:["e4","c6","d4","d5","e5","Bf5","Nf3","e6","Be2","c5","c3","Nc6","O-O","Qb6","a3","Nge7"] },
      { name:"Exchange Variation", moves:["e4","c6","d4","d5","exd5","cxd5","Bd3","Nc6","c3","Nf6","Bf4","Bg4","Qb3","Qd7","Nd2"] },
      { name:"Fantasy Variation", moves:["e4","c6","d4","d5","f3","dxe4","fxe4","e5","Nf3","Bg4","c3","Nd7","Bc4","exd4","Qb3"] },
      { name:"Panov Attack", moves:["e4","c6","d4","d5","exd5","cxd5","c4","Nf6","Nc3","e6","Nf3","Be7","c5","O-O","Bd3","b6","O-O"] },
      { name:"Two Knights Variation", moves:["e4","c6","Nc3","d5","Nf3","Bg4","h3","Bxf3","Qxf3","Nf6","d3","e6","Bd2","Nbd7"] }
    ]},
    { family:"Sicilian Defense", variations:[
      { name:"Najdorf Variation", moves:["e4","c5","Nf3","d6","d4","cxd4","Nxd4","Nf6","Nc3","a6","Be2","e5","Nb3","Be7","O-O","O-O","Be3","Be6"] }
    ]},
    { family:"King's Indian Defense", variations:[
      { name:"King's Indian Defense", moves:["d4","Nf6","c4","g6","Nc3","Bg7","e4","d6","Nf3","O-O","Be2","e5","O-O","Nc6","d5","Ne7"] }
    ]},
    { family:"Dutch Defense", variations:[
      { name:"Leningrad Variation", moves:["d4","f5","g3","Nf6","Bg2","g6","Nf3","Bg7","O-O","O-O","c4","d6","Nc3","Qe8"] },
      { name:"Classical Variation", moves:["d4","f5","g3","Nf6","Bg2","e6","Nf3","Be7","O-O","O-O","c4","d6","Nc3","Qe8"] },
      { name:"Stonewall Variation", moves:["d4","f5","g3","Nf6","Bg2","e6","Nf3","d5","O-O","Bd6","c4","c6","Nc3","O-O"] },
      { name:"Staunton Gambit", moves:["d4","f5","e4","fxe4","Nc3","Nf6","Bg5","c6","f3","exf3","Nxf3","e6"] }
    ]}
  ]
};

/* Counter-repertoire for "Play Against the Opening" mode. White
   families are keyed per exact variation since the best defense
   differs line by line; Black families are keyed per family since
   the counter setup doesn't depend on the sub-line chosen. */
var COUNTERS_WHITE = {
  "Italian Game::Giuoco Piano": [
    { label:"The Giuoco Piano (Symmetrical Variation)", moves:["e4","e5","Nf3","Nc6","Bc4","Bc5","c3","Nf6","d3","d6","O-O","O-O","Re1","a6","Bb3","Ba7","h3","h6"] }
  ],
  "Italian Game::Fried Liver Attack": [
    { label:"The Two Knights Defense: Polerio Defense", moves:["e4","e5","Nf3","Nc6","Bc4","Nf6","Ng5","d5","exd5","Na5","Bb5+","c6","dxc6","bxc6","Be2","h6","Nf3","e4","Ne5","Bd6","d4","exd3"] }
  ],
  "Italian Game::Evans Gambit": [
    { label:"The Evans Gambit Accepted", moves:["e4","e5","Nf3","Nc6","Bc4","Bc5","b4","Bxb4","c3","Ba5","d4","exd4","O-O","d6","cxd4","Bb6","Nc3","Na5"] }
  ],
  "Ruy Lopez::Main Line (Closed Defense)": [
    { label:"The Morphy Defense (Closed Variation)", moves:["e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Be7","Re1","b5","Bb3","d6","c3","O-O","h3","Nb8","d4","Nbd7"] }
  ],
  "Ruy Lopez::Exchange Variation": [
    { label:"The Exchange Variation (Alapin / Lasker Counter-Setup)", moves:["e4","e5","Nf3","Nc6","Bb5","a6","Bxc6","dxc6","O-O","f6","d4","exd4","Nxd4","c5","Ne2","Qxd1","Rxd1","Bd7"] }
  ],
  "London System::London System": [
    { label:"The Queen's Pawn Game (Immediate C-Pawn Counter-Strike)", moves:["d4","Nf6","Nf3","c5","Bf4","e6","e3","cxd4","exd4","d5","c3","Nc6","Bd3","Bd6","Bxd6","Qxd6","O-O","O-O"] },
    { label:"The King's Indian Defense", moves:["d4","Nf6","Nf3","g6","Bf4","Bg7","e3","O-O","Be2","d6","O-O","Nbd7","h3","e5","Bh2","Re8"] }
  ],
  "Vienna Gambit::Main Line": [
    { label:"The Falkbeer Counter-Gambit", moves:["e4","e5","Nc3","Nf6","f4","d5","fxe5","Nxe4","Nf3","Be7","d4","O-O","Bd3","f5","exf6","Nxf6","O-O"] }
  ],
  "Vienna Gambit::Max Lange Defense": [
    { label:"The Max Lange Gambit Accepted (Cunningham Defense)", moves:["e4","e5","Nc3","Nf6","f4","d5","fxe5","Nxe4","Qf3","Nc6","Bb5","Nd6","Bxc6+","bxc6","d3","Nf5","d4"] }
  ],
  "Vienna Gambit::Steinitz Variation": [
    { label:"The Steinitz Gambit Counter-Attack (Zukertort Defense)", moves:["e4","e5","Nc3","Nf6","f4","d5","fxe5","Nxe4","d3","Qh4+","g3","Nxg3","Nf3","Qh5","hxg3","Qxf3","Qxf3"] }
  ]
};

var COUNTERS_BLACK = {
  "Caro-Kann": [
    { label:"The Advance Variation", moves:["e4","c6","d4","d5","e5","Bf5","Nf3","e6","Be2","c5","c3","Nc6","O-O","Qb6","a3","Nge7"] },
    { label:"The Fantasy Variation", moves:["e4","c6","d4","d5","f3","dxe4","fxe4","e5","Nf3","Bg4","c3","Nd7","Bc4","exd4","Qb3"] }
  ],
  "King's Indian Defense": [
    { label:"The Orthodox Variation", moves:["d4","Nf6","c4","g6","Nc3","Bg7","e4","d6","Nf3","O-O","Be2","e5","O-O","Nc6","d5","Ne7","Ne1","Nd7"] },
    { label:"The S\u00e4misch Variation", moves:["d4","Nf6","c4","g6","Nc3","Bg7","e4","d6","f3","O-O","Be3","e5","Nge2","Nc6","d5","Ne7","Qd2","Nd7"] }
  ],
  "Dutch Defense": [
    { label:"The Staunton Gambit", moves:["d4","f5","e4","fxe4","Nc3","Nf6","Bg5","c6","f3","exf3","Nxf3","e6"] },
    { label:"The Hopton Attack", moves:["d4","f5","Bg5","Nf6","Nd2","d5","e3","e6","Bd3","Be7","Ngf3","O-O","O-O","c5"] }
  ],
  "Sicilian Defense": [
    { label:"The Open Sicilian", moves:["e4","c5","Nf3","d6","d4","cxd4","Nxd4","Nf6","Nc3","a6","Be2","e5","Nb3","Be7","O-O","O-O"] },
    { label:"The Alapin Sicilian", moves:["e4","c5","c3","d5","exd5","Qxd5","d4","Nf6","Nf3","Bg4","Be2","e6","O-O","Nc6","h3","Bh5"] }
  ]
};

function getCounterOptions(sideName, family, variationName){
  if(sideName === "white"){
    return COUNTERS_WHITE[family + "::" + variationName] || null;
  }
  return COUNTERS_BLACK[family] || null;
}

var USERS_KEY = "openingTrainerUsers";
var CHESS_GLYPHS = ["\u2654","\u2655","\u2656","\u2657","\u2658","\u2659","\u265A","\u265B","\u265C","\u265D","\u265E","\u265F"];
var PIECE_FULL_NAMES = { p:"pawn", n:"knight", b:"bishop", r:"rook", q:"queen", k:"king" };

/* Custom vector piece set, space themed:
   Pawn = comet, Knight = UFO, Bishop = rocket,
   Rook = space station, Queen = star, King = ringed planet.
   Built as distinct silhouettes rather than font glyphs so each
   piece type stays legible and unmistakable at board size. */
function pieceSVGBody(type, fill, stroke, sw){
  switch(type){

    case "P": // Comet
      return '<path d="M27 11 L41 2 L31.5 15 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+(sw*0.85)+'" stroke-linejoin="round"/>'+
             '<circle cx="21" cy="17" r="7" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<path d="M15.5 22 Q21 19 26.5 22 L29 30 Q21 33.5 13 30 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>'+
             '<rect x="11" y="32.5" width="22" height="5" rx="1.5" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';

    case "N": // UFO
      return '<path d="M15 22 Q15 9 22.5 9 Q30 9 30 22 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>'+
             '<circle cx="19" cy="15" r="1" fill="'+stroke+'"/>'+
             '<circle cx="26" cy="15" r="1" fill="'+stroke+'"/>'+
             '<ellipse cx="22.5" cy="23" rx="17" ry="5" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<circle cx="10" cy="23" r="1.3" fill="'+stroke+'"/>'+
             '<circle cx="22.5" cy="25.5" r="1.3" fill="'+stroke+'"/>'+
             '<circle cx="35" cy="23" r="1.3" fill="'+stroke+'"/>'+
             '<path d="M17 27.5 L14.5 34" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linecap="round"/>'+
             '<path d="M28 27.5 L30.5 34" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linecap="round"/>'+
             '<rect x="11.5" y="34" width="22" height="4.5" rx="1.5" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';

    case "B": // Rocket
      return '<path d="M22.5 3 Q29 10 28 18 L17 18 Q16 10 22.5 3 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>'+
             '<circle cx="22.5" cy="14.5" r="2.6" fill="'+stroke+'"/>'+
             '<circle cx="22.5" cy="14.5" r="1.4" fill="'+fill+'"/>'+
             '<path d="M17 18 L28 18 L26.5 29 L18.5 29 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>'+
             '<path d="M17 22 L11 29 L17 27.5 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>'+
             '<path d="M28 22 L34 29 L28 27.5 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>'+
             '<path d="M19 29 L26 29 L24.5 33.5 L20.5 33.5 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>'+
             '<rect x="11.5" y="33.5" width="22" height="4.5" rx="1.5" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';

    case "R": // Space station
      return '<circle cx="22.5" cy="10" r="1.4" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<line x1="22.5" y1="11.3" x2="22.5" y2="14.5" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<rect x="18" y="14.5" width="9" height="15" rx="2.5" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<rect x="14.5" y="19.5" width="4" height="4" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<rect x="26.5" y="19.5" width="4" height="4" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<rect x="3.5" y="17" width="11" height="9" rx="1" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<line x1="7.3" y1="17" x2="7.3" y2="26" stroke="'+stroke+'" stroke-width="'+(sw*0.7)+'"/>'+
             '<line x1="11" y1="17" x2="11" y2="26" stroke="'+stroke+'" stroke-width="'+(sw*0.7)+'"/>'+
             '<rect x="30.5" y="17" width="11" height="9" rx="1" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<line x1="34.3" y1="17" x2="34.3" y2="26" stroke="'+stroke+'" stroke-width="'+(sw*0.7)+'"/>'+
             '<line x1="38" y1="17" x2="38" y2="26" stroke="'+stroke+'" stroke-width="'+(sw*0.7)+'"/>'+
             '<rect x="17" y="29.5" width="11" height="4.5" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<rect x="11" y="34" width="23" height="4.5" rx="1" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';

    case "Q": // Star
      return '<path d="M22.5 3 L26 14 L38 14 L28.5 21 L32 33 L22.5 26 L13 33 L16.5 21 L7 14 L19 14 Z" '+
             'fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>'+
             '<rect x="12.5" y="31" width="20" height="4.5" rx="1" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';

    case "K": // Ringed planet
      return '<rect x="21" y="1.5" width="3" height="6" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<rect x="18.5" y="4" width="8" height="3" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<ellipse cx="22.5" cy="21" rx="16.5" ry="5" fill="none" stroke="'+stroke+'" stroke-width="'+sw+'" transform="rotate(-12 22.5 21)"/>'+
             '<circle cx="22.5" cy="21" r="9" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<rect x="12" y="32" width="21" height="4.5" rx="1" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';
  }
  return "";
}

function pieceThemeSVG(piece){
  var isWhite = piece[0] === "w";
  var type = piece[1];
  /* Dark strokes read fine for white pieces, but a plain dark stroke
     on black pieces would nearly vanish against the near-black
     square, so black gets a thicker gold outline instead. */
  var fill = isWhite ? "#f5f2ea" : "#241a17";
  var stroke = isWhite ? "#241a17" : "#e8d9a8";
  var sw = isWhite ? 1.6 : 2.4;
  var inner = pieceSVGBody(type, fill, stroke, sw);
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width="45" height="45">' + inner + '</svg>';
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function describeMove(fenBefore, san){
  var temp = new Chess(fenBefore);
  var mv = temp.move(san);
  if(!mv){
    return san;
  }
  var flags = mv.flags || "";
  if(flags.indexOf("k") !== -1){
    return "castle kingside";
  }
  if(flags.indexOf("q") !== -1){
    return "castle queenside";
  }
  var pieceName = PIECE_FULL_NAMES[mv.piece] || "piece";
  var isCapture = flags.indexOf("c") !== -1 || flags.indexOf("e") !== -1;
  var desc;
  if(mv.piece === "p"){
    if(isCapture){
      var fromFile = mv.from.charAt(0);
      var toFile = mv.to.charAt(0);
      desc = "move the pawn on " + fromFile + " file to " + toFile + " file";
    } else {
      desc = "move the pawn to " + mv.to;
    }
  } else {
    if(isCapture){
      var capturedName = PIECE_FULL_NAMES[mv.captured] || "piece";
      desc = pieceName + " takes the " + capturedName + " on " + mv.to;
    } else {
      desc = "move the " + pieceName + " to " + mv.to;
    }
  }
  if(mv.promotion){
    desc += " and promotes to " + (PIECE_FULL_NAMES[mv.promotion] || mv.promotion);
  }
  return desc;
}

var currentUser = null;
var currentUserData = null;

var board = null;
var game = null;
var sequence = [];
var ply = 0;
var userColor = "w";
var trainingMode = "practice";
var side = "white";
var currentVariationKey = "";
var currentVariationLabel = "";
var sessionEnded = false;
var botThinking = false;
var freePlay = false;
var pendingVariation = null;
var selectedRole = "play";
var selectedMode = "practice";
var selectedCounterIndex = 0;
var currentCounterOptions = null;
var selectedSquare = null;

/* ---------------- Auth ---------------- */

function loadUsers(){
  try{
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  }catch(e){
    return {};
  }
}
function saveUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

$("#loginForm").on("submit", function(e){
  e.preventDefault();
  var username = $("#usernameInput").val().trim();
  var password = $("#passwordInput").val();
  if(!username || !password){ return; }
  var users = loadUsers();
  if(users[username]){
    if(users[username].password !== password){
      $("#loginError").removeClass("hidden").text("Incorrect password for that username.");
      return;
    }
  } else {
    users[username] = { password: password, learned: {} };
    saveUsers(users);
  }
  $("#loginError").addClass("hidden").text("");
  currentUser = username;
  currentUserData = users[username];
  enterApp();
});

function enterApp(){
  $("#loginModal").addClass("hidden");
  $("#app").removeClass("hidden");
  $("#userLabel").text(currentUser);
  $("#usernameInput").val("");
  $("#passwordInput").val("");
  goToMenu();
}

$("#logoutBtn").on("click", function(){
  currentUser = null;
  currentUserData = null;
  destroyBoard();
  $("#app").addClass("hidden");
  $("#loginModal").removeClass("hidden");
});

/* ---------------- Menu ---------------- */

$(".tab-btn").on("click", function(){
  var tab = $(this).data("tab");
  $(".tab-btn").removeClass("active");
  $(this).addClass("active");
  if(tab === "white"){
    $("#whitePanel").removeClass("hidden");
    $("#blackPanel").addClass("hidden");
  } else {
    $("#blackPanel").removeClass("hidden");
    $("#whitePanel").addClass("hidden");
  }
});

function variationKey(family, name){
  return family + "::" + name;
}

function renderMenu(){
  renderPanel("white", $("#whitePanel"));
  renderPanel("black", $("#blackPanel"));
}

function renderPanel(sideName, $panel){
  $panel.empty();
  var learned = (currentUserData && currentUserData.learned) || {};
  OPENINGS[sideName].forEach(function(group){
    var $family = $('<div class="opening-family open"></div>');
    var $header = $('<button type="button" class="family-header"><span>'+escapeHtml(group.family)+'</span><span class="chevron">&#9656;</span></button>');
    var $rows = $('<div class="family-variations"></div>');
    group.variations.forEach(function(v){
      var key = variationKey(group.family, v.name);
      var isLearned = !!learned[key];
      var $row = $('<div class="variation-row"></div>');
      $row.append('<span class="variation-name">'+escapeHtml(v.name)+'</span>');
      $row.append(isLearned
        ? '<span class="badge badge-learned">Learned</span>'
        : '<span class="badge badge-pending">Not learned</span>');
      $row.on("click", function(){
        openModePicker(sideName, group.family, v);
      });
      $rows.append($row);
    });
    $header.on("click", function(){
      $family.toggleClass("open");
      $rows.toggleClass("closed");
    });
    $family.append($header).append($rows);
    $panel.append($family);
  });
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, function(c){
    return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
  });
}

/* ---------------- Mode picker modal ---------------- */

function openModePicker(sideName, family, variation){
  pendingVariation = { side: sideName, family: family, name: variation.name, moves: variation.moves };
  selectedRole = "play";
  selectedMode = "practice";
  $("#roleButtons .option-btn").removeClass("active");
  $('#roleButtons .option-btn[data-role="play"]').addClass("active");
  $("#modeButtons .option-btn").removeClass("active");
  $('#modeButtons .option-btn[data-mode="practice"]').addClass("active");
  $("#modeModalTitle").text(family + ": " + variation.name);
  renderCounterOptions();
  $("#modeModal").removeClass("hidden");
}

$("#modeModalClose").on("click", function(){
  $("#modeModal").addClass("hidden");
});

$("#roleButtons").on("click", ".option-btn", function(){
  $("#roleButtons .option-btn").removeClass("active");
  $(this).addClass("active");
  selectedRole = $(this).data("role");
  renderCounterOptions();
});

$("#modeButtons").on("click", ".option-btn", function(){
  $("#modeButtons .option-btn").removeClass("active");
  $(this).addClass("active");
  selectedMode = $(this).data("mode");
});

function renderCounterOptions(){
  var opts = null;
  if(selectedRole === "against" && pendingVariation){
    opts = getCounterOptions(pendingVariation.side, pendingVariation.family, pendingVariation.name);
  }
  currentCounterOptions = opts;
  var $group = $("#counterGroup");
  var $buttons = $("#counterButtons");
  $buttons.empty();
  if(!opts || opts.length === 0){
    $group.addClass("hidden");
    return;
  }
  $group.removeClass("hidden");
  selectedCounterIndex = 0;
  opts.forEach(function(opt, idx){
    var $btn = $('<button type="button" class="option-btn"></button>').text(opt.label);
    if(idx === 0) $btn.addClass("active");
    $btn.on("click", function(){
      $("#counterButtons .option-btn").removeClass("active");
      $btn.addClass("active");
      selectedCounterIndex = idx;
    });
    $buttons.append($btn);
  });
}

$("#beginTrainingBtn").on("click", function(){
  if(!pendingVariation) return;
  $("#modeModal").addClass("hidden");
  startGame(pendingVariation, selectedRole, selectedMode);
});

/* ---------------- Game screen ---------------- */

function startGame(variation, role, mode){
  selectedSquare = null;
  side = variation.side;
  trainingMode = mode;
  currentVariationKey = variationKey(variation.family, variation.name);
  currentVariationLabel = variation.family + ": " + variation.name;

  var counterLabel = null;
  if(role === "against"){
    var opts = getCounterOptions(variation.side, variation.family, variation.name);
    if(opts && opts.length){
      var idx = (selectedCounterIndex >= 0 && selectedCounterIndex < opts.length) ? selectedCounterIndex : 0;
      sequence = opts[idx].moves.slice();
      counterLabel = opts[idx].label;
    } else {
      sequence = variation.moves.slice();
    }
  } else {
    sequence = variation.moves.slice();
  }

  var baseColor = (side === "white") ? "w" : "b";
  userColor = (role === "play") ? baseColor : (baseColor === "w" ? "b" : "w");

  ply = 0;
  sessionEnded = false;
  botThinking = false;
  freePlay = false;

  if(typeof Chess !== "function"){
    alert("The chess rules library did not load. Check your internet connection and reload the page.");
    return;
  }
  game = new Chess();

  $("#menuScreen").addClass("hidden");
  $("#gameScreen").removeClass("hidden");
  $("#backArrowBtn").removeClass("hidden");
  $("#gameTitle").text(currentVariationLabel);

  var roleLabel = (role === "play") ? "Playing the opening" : "Playing against the opening";
  var modeLabel = (mode === "practice") ? "Practice Mode" : "Test Mode";
  var colorLabel = (userColor === "w") ? "You are White" : "You are Black";
  var tagsHtml = '<span class="tag">'+roleLabel+'</span>' +
    '<span class="tag">'+modeLabel+'</span>' +
    '<span class="tag">'+colorLabel+'</span>';
  if(counterLabel){
    tagsHtml += '<span class="tag">Counter: '+escapeHtml(counterLabel)+'</span>';
  }
  $("#gameTags").html(tagsHtml);

  resetStatusClasses();
  $("#moveList").empty();

  destroyBoard();
  if(typeof Chessboard !== "function"){
    resetStatusClasses();
    $("#statusPanel").addClass("status-error");
    updateStatus("The chessboard library did not load. Check your internet connection and reload the page.");
    return;
  }
  try{
    board = Chessboard("board", {
      position: "start",
      draggable: true,
      pieceTheme: pieceThemeSVG,
      orientation: (userColor === "w") ? "white" : "black",
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd
    });
  }catch(err){
    resetStatusClasses();
    $("#statusPanel").addClass("status-error");
    updateStatus("The board failed to load: " + err.message);
    return;
  }

  maybeScheduleBot();
}

function destroyBoard(){
  if(board){
    board.destroy();
    board = null;
  }
}

$("#restartLineBtn").on("click", function(){
  if(!pendingVariation) return;
  startGame(pendingVariation, selectedRole, trainingMode);
});

$("#backArrowBtn").on("click", function(){
  goToMenu();
});

function goToMenu(){
  destroyBoard();
  $("#gameScreen").addClass("hidden");
  $("#backArrowBtn").addClass("hidden");
  $("#menuScreen").removeClass("hidden");
  renderMenu();
}

/* ---------------- Move handling ---------------- */

function onDragStart(source, piece){
  if(sessionEnded || botThinking) return false;
  if(game.game_over()) return false;
  var pieceColor = piece[0];
  if(pieceColor !== userColor) return false;
  if(game.turn() !== userColor) return false;
  return true;
}

/* Applies (or rejects) a move from source to target. Shared by the
   drag-and-drop handler and the tap-to-select handler below so both
   input styles behave identically. Returns true if the move was
   applied, false otherwise (invalid move, or a deviation from the
   trainer line — which already shows its own status message). */
function evaluateMove(source, target){
  if(sessionEnded || botThinking) return false;

  if(freePlay){
    if(game.turn() !== userColor) return false;
    var freeMove = game.move({ from: source, to: target, promotion: "q" });
    if(freeMove === null) return false;
    board.position(game.fen(), false);
    handleMoveApplied(freeMove);
    afterFreePlayMove();
    return true;
  }

  if(game.turn() !== userColor) return false;

  var expected = sequence[ply];
  var temp = new Chess(game.fen());
  var expMove = temp.move(expected);
  if(!expMove){
    sessionEnded = true;
    resetStatusClasses();
    $("#statusPanel").addClass("status-error");
    updateStatus("This line could not continue due to a data error. Please restart the line.");
    return false;
  }

  if(expMove.from === source && expMove.to === target){
    var applied = game.move(expected);
    board.position(game.fen(), false);
    handleMoveApplied(applied);
    ply++;
    resetStatusClasses();
    updateMoveList();
    if(ply === sequence.length){
      completeLine();
    } else {
      maybeScheduleBot();
    }
    return true;
  }

  if(trainingMode === "practice"){
    showDeviation(expected);
  } else {
    failTest(expected);
  }
  return false;
}

/* chessboard.js fires onDrop for every completed drag, including a
   plain stationary tap (reported as source === target). That's what
   drives tap-to-select here rather than a separate click listener,
   since the library's own touch handling can otherwise swallow a
   bare tap before it turns into a native click event. */
function onDrop(source, target){
  if(sessionEnded || botThinking) return "snapback";

  if(source === target){
    handleSquareTapped(source);
    return "snapback";
  }

  clearSelection();
  var applied = evaluateMove(source, target);
  if(!applied) return "snapback";
}

function onSnapEnd(){
  board.position(game.fen(), false);
}

/* ---------------- Tap-to-select / tap-to-move ---------------- */

function squareNameFromElement($el){
  var classes = ($el.attr("class") || "").split(/\s+/);
  for(var i=0;i<classes.length;i++){
    if(/^square-[a-h][1-8]$/.test(classes[i])){
      return classes[i].replace("square-", "");
    }
  }
  return null;
}

function clearSelection(){
  selectedSquare = null;
  $("#board .square-55d63").removeClass("selected-square legal-target legal-capture");
}

/* Real legal destinations for the selected piece (chess.com-style
   move dots), independent of what the trainer line expects next —
   a legal but off-line move is still rejected in evaluateMove. */
function computeClickTargets(square){
  if(sessionEnded || botThinking) return [];
  if(game.turn() !== userColor) return [];
  return game.moves({ square: square, verbose: true });
}

function selectSquare(square){
  selectedSquare = square;
  $("#board .square-55d63").removeClass("selected-square legal-target legal-capture");
  $("#board .square-" + square).addClass("selected-square");
  var targets = computeClickTargets(square);
  targets.forEach(function(m){
    var isCapture = !!m.captured || (m.flags && m.flags.indexOf("e") !== -1);
    var $sq = $("#board .square-" + m.to);
    $sq.addClass("legal-target");
    if(isCapture) $sq.addClass("legal-capture");
  });
}

function handleSquareTapped(square){
  if(selectedSquare === square){
    clearSelection();
    return;
  }
  selectSquare(square);
}

/* A plain native click still fires for squares chessboard.js never
   takes over: empty squares (nothing to drag) and opponent pieces
   (onDragStart declines the gesture). Those are exactly the two
   cases needed to finish a move once a piece is already selected
   via a tap, handled in onDrop above. */
$(document).on("click", "#board .square-55d63", function(){
  if(!board || !game || !selectedSquare) return;
  if(sessionEnded || botThinking) return;
  var square = squareNameFromElement($(this));
  if(!square || square === selectedSquare) return;
  var piece = game.get(square);
  if(piece && piece.color === userColor) return;
  var from = selectedSquare;
  clearSelection();
  evaluateMove(from, square);
});

function handleMoveApplied(moveObj){
  highlightLast(moveObj.from, moveObj.to);
}

function highlightLast(from, to){
  $("#board .square-55d63").removeClass("last-move");
  $("#board .square-" + from).addClass("last-move");
  $("#board .square-" + to).addClass("last-move");
}

function maybeScheduleBot(){
  if(sessionEnded) return;
  if(ply >= sequence.length) return;
  if(game.turn() !== userColor){
    var isFinalMove = (ply === sequence.length - 1);
    if(isFinalMove){
      botMove();
    } else {
      botThinking = true;
      resetStatusClasses();
      updateStatus("Bot is thinking.");
      setTimeout(botMove, 550);
    }
  } else {
    if(trainingMode === "practice"){
      showHint(sequence[ply]);
    } else {
      resetStatusClasses();
      updateStatus("Your move. No hints in Test Mode.");
    }
  }
}

function botMove(){
  clearSelection();
  botThinking = false;
  var sanStr = sequence[ply];
  var moveObj = game.move(sanStr);
  if(!moveObj){
    sessionEnded = true;
    resetStatusClasses();
    $("#statusPanel").addClass("status-error");
    updateStatus("This line could not continue due to a data error. Please restart the line.");
    return;
  }
  board.position(game.fen(), false);
  highlightLast(moveObj.from, moveObj.to);
  ply++;
  updateMoveList();
  if(ply === sequence.length){
    completeLine();
  } else {
    maybeScheduleBot();
  }
}

function resetStatusClasses(){
  $("#statusPanel").removeClass("status-warning status-error status-success status-hint");
}

function showHint(expectedSan){
  var desc = describeMove(game.fen(), expectedSan);
  resetStatusClasses();
  $("#statusPanel").addClass("status-hint");
  $("#statusText").html("Your move: " + escapeHtml(desc) + ".");
}

function showDeviation(expectedSan){
  var desc = describeMove(game.fen(), expectedSan);
  resetStatusClasses();
  $("#statusPanel").addClass("status-warning");
  $("#statusText").html("Not quite. The trainer line continues with: " + escapeHtml(desc) + ". Try again.");
}

function failTest(expectedSan){
  var desc = describeMove(game.fen(), expectedSan);
  sessionEnded = true;
  resetStatusClasses();
  $("#statusPanel").addClass("status-error");
  $("#statusText").html("Test failed. The correct move was to " + escapeHtml(desc) + ". Restart the line from the beginning to try again.");
}

function updateStatus(text){
  $("#statusText").text(text);
}

function updateMoveList(){
  var hist = game.history();
  var html = "";
  for(var i = 0; i < hist.length; i += 2){
    var num = (i / 2) + 1;
    var w = hist[i] || "";
    var b = hist[i+1] || "";
    html += '<div class="move-row"><span class="move-num">'+num+'.</span><span class="move-w">'+escapeHtml(w)+'</span><span class="move-b">'+escapeHtml(b)+'</span></div>';
  }
  var $list = $("#moveList");
  $list.html(html);
  $list.scrollTop($list[0].scrollHeight);
}

/* ---------------- Line completion ---------------- */

function completeLine(){
  if(trainingMode === "test"){
    markLearned();
    resetStatusClasses();
    $("#statusPanel").addClass("status-success");
    updateStatus("Test passed. This line is marked as learned.");
    $("#postLineTitle").text("Test Passed");
    $("#postLineMessage").text("You played the full line correctly. " + currentVariationLabel + " is now marked Learned in your profile.");
    $("#goForTestBtn").addClass("hidden");
    launchChessConfetti();
  } else {
    resetStatusClasses();
    $("#statusPanel").addClass("status-success");
    updateStatus("Line complete.");
    $("#postLineTitle").text("Line Complete");
    $("#postLineMessage").text("You reached the end of the line. Continue playing, or go for a test to mark it as learned.");
    $("#goForTestBtn").removeClass("hidden");
  }
  $("#postLineModal").removeClass("hidden");
}

function markLearned(){
  var users = loadUsers();
  if(!users[currentUser]){
    users[currentUser] = { password: "", learned: {} };
  }
  users[currentUser].learned[currentVariationKey] = true;
  saveUsers(users);
  currentUserData = users[currentUser];
}

$("#goForTestBtn").on("click", function(){
  $("#postLineModal").addClass("hidden");
  if(pendingVariation){
    startGame(pendingVariation, selectedRole, "test");
  }
});

$("#continuePlayBtn").on("click", function(){
  $("#postLineModal").addClass("hidden");
  freePlay = true;
  resetStatusClasses();
  updateStatus("Free play. The opponent replies with random legal moves from here.");
  if(game.turn() !== userColor && !game.game_over()){
    botThinking = true;
    setTimeout(botFreeMove, 500);
  }
});

$("#returnMenuBtn").on("click", function(){
  $("#postLineModal").addClass("hidden");
  goToMenu();
});

function botFreeMove(){
  clearSelection();
  botThinking = false;
  var moves = game.moves();
  if(moves.length === 0){
    checkGameOverFreePlay();
    return;
  }
  var pick = moves[Math.floor(Math.random() * moves.length)];
  var moveObj = game.move(pick);
  board.position(game.fen(), false);
  highlightLast(moveObj.from, moveObj.to);
  updateMoveList();
  afterFreePlayMove();
}

function afterFreePlayMove(){
  if(checkGameOverFreePlay()) return;
  if(game.turn() !== userColor){
    botThinking = true;
    updateStatus("Bot is thinking.");
    setTimeout(botFreeMove, 500);
  } else {
    updateStatus("Free play. Your move.");
  }
}

function checkGameOverFreePlay(){
  if(game.game_over()){
    var msg = "Game over.";
    if(game.in_checkmate()){
      if(game.turn() === userColor){
        msg = "Checkmate. The bot wins.";
      } else {
        msg = "Checkmate. You win.";
        showCheckmateOverlay();
      }
    } else if(game.in_stalemate()){
      msg = "Draw by stalemate.";
    } else if(game.in_threefold_repetition()){
      msg = "Draw by repetition.";
    } else if(game.insufficient_material()){
      msg = "Draw by insufficient material.";
    } else if(game.in_draw()){
      msg = "Draw.";
    }
    updateStatus(msg);
    return true;
  }
  return false;
}

/* ---------------- Reward effects ---------------- */

function showCheckmateOverlay(){
  $("#checkmateOverlay").removeClass("hidden");
  playCheckmateSound();
}

$("#checkmateCloseBtn").on("click", function(){
  $("#checkmateOverlay").addClass("hidden");
});

function playCheckmateSound(){
  try{
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var now = ctx.currentTime;
    var freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach(function(f, i){
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = f;
      var start = now + i * 0.09;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.28, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.32);
    });
  }catch(e){
    /* Audio unavailable; fail silently. */
  }
}

function launchChessConfetti(){
  var canvas = document.getElementById("confettiCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";
  var ctx = canvas.getContext("2d");
  var particles = [];
  var count = 46;
  for(var i = 0; i < count; i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 2.4,
      vy: 2 + Math.random() * 2.5,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      size: 20 + Math.random() * 16,
      glyph: CHESS_GLYPHS[Math.floor(Math.random() * CHESS_GLYPHS.length)],
      color: Math.random() < 0.5 ? "#ffffff" : "#1a1a1a",
      strokeColor: Math.random() < 0.5 ? "#7a2333" : "#c9a227"
    });
  }
  var duration = 2600;
  var startTime = null;
  function frame(ts){
    if(!startTime) startTime = ts;
    var elapsed = ts - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p){
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.font = p.size + "px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 2;
      ctx.strokeStyle = p.strokeColor;
      ctx.fillStyle = p.color;
      ctx.strokeText(p.glyph, 0, 0);
      ctx.fillText(p.glyph, 0, 0);
      ctx.restore();
    });
    if(elapsed < duration){
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = "none";
    }
  }
  requestAnimationFrame(frame);
}

$(window).on("resize", function(){
  if(board) board.resize();
});

});

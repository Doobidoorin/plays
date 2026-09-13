/* Chess Opening Trainer - Main Application Script */
/* Design & Development by RIN | Brand: Doobidoorin */

$(document).ready(function() {

/* ===============================================
   OPENING DATA & CONSTANTS
   =============================================== */

/* Opening lines the bot plays (or the user practices) when
   "Play the Opening" is selected. */
var OPENINGS = {
  white: [
    { family:"Italian Game", variations:[
      { name:"Giuoco Piano", moves:["e4","e5","Nf3","Nc6","Bc4","Bc5","c3","Nf6","d4","exd4","cxd4","Bb4+","Bd2","Bxd2+","Nbxd2","d5","exd5","Qxd5","Qxd5","Nxd5","O-O","O-O","Re1","Bg4","h3","Bh5","g4","Bg6"] },
      { name:"Two Knights Defense", moves:["e4","e5","Nf3","Nc6","Bc4","Nf6","Ng5","d5","exd5","Na5","Bb5+","c6","dxc6","bxc6","Be2","h6","Nf3","e4","Ne1","Bc5"] }
    ]},
    { family:"Ruy Lopez", variations:[
      { name:"Closed Defense", moves:["e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Be7","Re1","b5","Bb3","d6","c3","Na5","Bc2","c5","h3","O-O","Nbd2","Qc7"] },
      { name:"Open Defense", moves:["e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Nxe4","d4","b5","Bb3","d5","dxe5","Be6","c3","Be7","Nbd2","O-O"] }
    ]},
    { family:"French Defense", variations:[
      { name:"Winawer Variation", moves:["e4","e6","d4","d5","Nc3","Bb4","e5","c5","a3","Bxc3+","bxc3","Ne7","Qg4","cxd4","cxd4","O-O","Bg5","Nf5","Qh4"] },
      { name:"Classical Variation", moves:["e4","e6","d4","d5","Nc3","Nf6","Bg5","Be7","e5","Nfd7","Bxe7","Qxe7","f4","O-O","Nf3","c5","O-O"] }
    ]}
  ],
  black: [
    { family:"Sicilian Defense", variations:[
      { name:"Najdorf Variation", moves:["e4","c5","Nf3","d6","d4","cxd4","Nxd4","Nf6","Nc3","a6","Bg5","e6","f4","Be7","Qf3","Nbd7","O-O-O","b5","Bxf6","Nxf6","g4"] },
      { name:"Classical Variation", moves:["e4","c5","Nf3","d6","d4","cxd4","Nxd4","Nf6","Nc3","Nc6","Be2","e5","Nb3","Be7","O-O","O-O","a4"] }
    ]},
    { family:"Caro-Kann", variations:[
      { name:"Classical Variation", moves:["e4","c6","d4","d5","Nc3","Nf6","Bg5","Be7","e5","Nfd7","Bxe7","Qxe7","Nf3","O-O","Bd3","dxe4","Nxe4"] },
      { name:"Main Line", moves:["e4","c6","d4","d5","Nc3","Nf6","Cxd5","cxd5","Bd3","Nc6","Nf3","Bg4","Ne5","Bh5"] }
    ]},
    { family:"Scandinavian Defense", variations:[
      { name:"Main Line", moves:["e4","d5","exd5","Qxd5","Nc3","Qa5","d4","Nf6","Nf3","Bg4","Be2","c6","O-O","Nbd7","a3","O-O-O","h3","Bh5"] }
    ]}
  ]
};

/* Counter-repertoire for "Play Against the Opening" mode. White
   families are keyed per exact variation since the best defense
   differs line by line; Black families are keyed per family since
   a single counter works broadly. */
var COUNTERS_WHITE = {
  "Italian Game::Giuoco Piano": [
    { label:"The Solid 5.exd5", moves:["e4","e5","Nf3","Nc6","Bc4","Bc5","c3","Nf6","d4","exd4","cxd4"] }
  ],
  "Italian Game::Two Knights Defense": [
    { label:"The Fried Liver", moves:["e4","e5","Nf3","Nc6","Bc4","Nf6","Ng5","d5","exd5","Na5","Bb5+","c6","dxc6","bxc6","Qf3"] }
  ],
  "Ruy Lopez::Closed Defense": [
    { label:"The Aggressive 10.d4", moves:["e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Be7","Re1","b5","Bb3","d6","c3","Na5","Bc2","c5","h3"] }
  ],
  "Ruy Lopez::Open Defense": [
    { label:"The Attacking 5.O-O", moves:["e4","e5","Nf3","Nc6","Bb5","a6","Ba4","Nf6","O-O","Nxe4","d4","b5","Bb3","d5"] }
  ],
  "French Defense::Winawer Variation": [
    { label:"The Positional Approach", moves:["e4","e6","d4","d5","Nc3","Bb4","e5","c5","a3","Bxc3+","bxc3","Ne7","Qg4"] }
  ],
  "French Defense::Classical Variation": [
    { label:"The Classical Setup", moves:["e4","e6","d4","d5","Nc3","Nf6","Bg5","Be7","e5","Nfd7","Bxe7","Qxe7","f4"] }
  ]
};

var COUNTERS_BLACK = {
  "Caro-Kann": [
    { label:"The Advance Variation", moves:["e4","c6","d4","d5","e5","Bf5","Nf3","e6","Be2","c5","c3","Nc6","O-O","Qb6","a3","Nge7"] },
    { label:"The Fantasy Variation", moves:["e4","c6","d4","d5","f3","e5","dxe5","Qa5","Nc3","Qxe5","Qe2"] }
  ],
  "Sicilian Defense": [
    { label:"The 6.Be3 Defense", moves:["e4","c5","Nf3","d6","d4","cxd4","Nxd4","Nf6","Nc3","a6","Be3","e5","Nb3","Be7","f3"] },
    { label:"The English Attack", moves:["e4","c5","Nf3","d6","d4","cxd4","Nxd4","Nf6","Nc3","a6","Be3","e5","Nb3","Be7","f3"] }
  ],
  "Scandinavian Defense": [
    { label:"The Solid Setup", moves:["e4","d5","exd5","Qxd5","Nc3","Qa5","d4","Nf6","Nf3","Bg4","Be2","c6","O-O","Nbd7"] }
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

/* ===============================================
   PIECE RENDERING (SVG)
   =============================================== */

/* Custom vector piece set, space themed:
   Pawn = comet, Knight = UFO, Bishop = rocket,
   Rook = space station, Queen = star, King = ringed planet.
   Built as distinct silhouettes rather than filled shapes. */

function svgPiece(type, isWhite){
  var fill = isWhite ? "#e0e0e0" : "#1a1a1a";
  var stroke = isWhite ? "#1a1a1a" : "#e0e0e0";
  var sw = 1.2;

  switch(type){
    case "P": // Comet
      return '<path d="M27 11 L41 2 L31.5 15 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+(sw*0.85)+'" stroke-linejoin="round"/>'+
             '<circle cx="27" cy="11" r="2.5" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<path d="M25 14 Q27 18 29 14" fill="none" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linecap="round"/>';

    case "N": // UFO
      return '<path d="M15 22 Q15 9 22.5 9 Q30 9 30 22 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>'+
             '<circle cx="18" cy="16" r="1" fill="'+stroke+'"/><circle cx="22.5" cy="15" r="1" fill="'+stroke+'"/><circle cx="27" cy="16" r="1" fill="'+stroke+'"/>'+
             '<line x1="15" y1="22" x2="30" y2="22" stroke="'+stroke+'" stroke-width="'+sw+'"/>';

    case "B": // Rocket
      return '<path d="M22.5 3 Q29 10 28 18 L17 18 Q16 10 22.5 3 Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>'+
             '<circle cx="22.5" cy="8" r="1.5" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<path d="M16 20 L19 25 M22.5 20 L22.5 26 M29 20 L26 25" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linecap="round"/>';

    case "R": // Space station
      return '<circle cx="22.5" cy="10" r="1.4" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<line x1="22.5" y1="11.3" x2="22.5" y2="30" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<line x1="10" y1="20.5" x2="35" y2="20.5" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<circle cx="10" cy="20.5" r="1.2" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<circle cx="35" cy="20.5" r="1.2" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>';

    case "Q": // Star
      return '<path d="M22.5 3 L26 14 L38 14 L28.5 21 L32 33 L22.5 26 L13 33 L16.5 21 L7 14 L19 14 Z" '+
             'fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'" stroke-linejoin="round"/>';

    case "K": // Ringed planet
      return '<rect x="21" y="1.5" width="3" height="6" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<circle cx="22.5" cy="12" r="6" fill="'+fill+'" stroke="'+stroke+'" stroke-width="'+sw+'"/>'+
             '<ellipse cx="22.5" cy="12" rx="9" ry="3" fill="none" stroke="'+stroke+'" stroke-width="'+sw+'"/>';

    default:
      return '';
  }
}

function pieceThemeSVG(piece){
  var isWhite = piece[0] === "w";
  var type = piece[1];

  /* Dark strokes read fine for white pieces, but a plain dark stroke
     on black pieces would nearly vanish on the dark board. Use light
     strokes for black pieces instead. */
  var svg = '<svg width="45" height="45" viewBox="0 0 45 45">'+
            svgPiece(type, isWhite)+
            '</svg>';
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

/* ===============================================
   MOVE DESCRIPTIONS
   =============================================== */

function describeMove(fenBefore, san){
  var temp = new Chess(fenBefore);
  var mv = temp.move(san);
  if(!mv){
    return san;
  }
  var flags = mv.flags || "";
  if(flags.indexOf("k") !== -1){
    return "castles kingside";
  }
  if(flags.indexOf("q") !== -1){
    return "castles queenside";
  }
  var fromSquare = mv.from;
  var toSquare = mv.to;
  var piece = mv.piece;
  var capture = mv.capture ? " captures " : " to ";
  var pieceName = PIECE_FULL_NAMES[piece] || piece;
  return pieceName + capture + toSquare;
}

/* ===============================================
   GLOBAL STATE
   =============================================== */

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
var selectedSquare = null;
var selectedRole = "play";
var selectedMode = "practice";
var selectedCounter = 0;
var pendingVariation = null;

/* ===============================================
   AUTH
   =============================================== */

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
  if(users[username] && users[username].password === password){
    currentUser = username;
    currentUserData = users[username];
    enterApp();
  } else {
    // Create new account
    users[username] = { password: password, learned: {} };
    currentUser = username;
    currentUserData = users[username];
    saveUsers(users);
    enterApp();
  }
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

/* ===============================================
   MENU
   =============================================== */

$(".tab-btn").on("click", function(){
  var tab = $(this).data("tab");
  $(".tab-btn").removeClass("active");
  $(this).addClass("active");
  if(tab === "white"){
    $("#whitePanel").removeClass("hidden");
    $("#blackPanel").addClass("hidden");
  } else {
    $("#whitePanel").addClass("hidden");
    $("#blackPanel").removeClass("hidden");
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
    var $family = $('<div class="opening-family"></div>');
    var $header = $('<div class="family-header"></div>').html(
      '<span class="family-name">'+escapeHtml(group.family)+'</span>'+
      '<span class="family-toggle-icon">▼</span>'
    );
    var $content = $('<div class="family-content hidden"></div>');
    
    group.variations.forEach(function(var_){
      var key = variationKey(group.family, var_.name);
      var isLearned = learned[key];
      var $item = $('<div class="variation-item"></div>');
      if(isLearned){
        $item.append('<span class="variation-badge">✓ Learned</span>');
      }
      $item.append(
        '<span class="variation-label">'+escapeHtml(var_.name)+'</span>'+
        '<button class="play-btn" data-family="'+escapeHtml(group.family)+'" '+
                'data-variation="'+escapeHtml(var_.name)+'">Play</button>'
      );
      $content.append($item);
    });
    
    $header.on("click", function(){
      $content.toggleClass("hidden");
      $header.find(".family-toggle-icon").toggleClass("hidden");
    });
    
    $family.append($header).append($content);
    $panel.append($family);
  });
  
  $panel.on("click", ".play-btn", function(){
    var family = $(this).data("family");
    var varName = $(this).data("variation");
    var side = $panel.attr("id") === "whitePanel" ? "white" : "black";
    var variation = null;
    
    OPENINGS[side].forEach(function(g){
      if(g.family === family){
        g.variations.forEach(function(v){
          if(v.name === varName){
            variation = v;
          }
        });
      }
    });
    
    if(variation){
      openModePicker(side, family, variation);
    }
  });
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, function(c){
    return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
  });
}

/* ===============================================
   MODE PICKER MODAL
   =============================================== */

function openModePicker(sideName, family, variation){
  pendingVariation = { side: sideName, family: family, name: variation.name, moves: variation.moves };
  selectedRole = "play";
  selectedMode = "practice";
  selectedCounter = 0;
  
  $("#modeModalTitle").text(family + " - " + variation.name);
  $("#modeModal").removeClass("hidden");
  
  renderCounterOptions();
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
  
  var $counterGroup = $("#counterOptionsGroup");
  if(!opts || opts.length === 0){
    $counterGroup.addClass("hidden");
    return;
  }
  
  $counterGroup.removeClass("hidden");
  var $buttons = $counterGroup.find(".option-buttons");
  $buttons.empty();
  
  opts.forEach(function(opt, idx){
    var $btn = $('<button class="option-btn" data-counter="'+idx+'">'+escapeHtml(opt.label)+'</button>');
    if(idx === 0) $btn.addClass("active");
    $buttons.append($btn);
  });
  
  $buttons.on("click", ".option-btn", function(){
    $buttons.find(".option-btn").removeClass("active");
    $(this).addClass("active");
    selectedCounter = parseInt($(this).data("counter"));
  });
}

$("#beginTrainingBtn").on("click", function(){
  if(!pendingVariation) return;
  $("#modeModal").addClass("hidden");
  startGame(pendingVariation, selectedRole, selectedMode);
});

/* ===============================================
   GAME SCREEN
   =============================================== */

function startGame(variation, role, mode){
  selectedSquare = null;
  side = variation.side;
  trainingMode = mode;
  currentVariationKey = variationKey(variation.family, variation.name);
  currentVariationLabel = variation.family + " - " + variation.name;
  sequence = variation.moves;
  
  var counterLabel = null;
  if(role === "against"){
    var opts = getCounterOptions(variation.side, variation.family, variation.name);
    if(opts && opts.length){
      var idx = (selectedCounter !== undefined) ? selectedCounter : 0;
      counterLabel = opts[idx].label;
      sequence = opts[idx].moves;
    }
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
  var colorLabel = (userColor === "w") ? "White" : "Black";
  var subtitle = roleLabel + " as " + colorLabel + " — " + modeLabel;
  if(counterLabel) subtitle += " (" + counterLabel + ")";
  $("#gameSubtitle").text(subtitle);
  
  resetStatusClasses();
  $("#moveList").empty();
  
  destroyBoard();
  if(typeof Chessboard !== "function"){
    resetStatusClasses();
    $("#statusPanel").addClass("status-error");
    updateStatus("The chessboard library did not load. Check your internet connection.");
    return;
  }
  
  var config = {
    position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    orientation: userColor === "w" ? "white" : "black",
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    pieceTheme: pieceThemeSVG,
    draggable: true
  };
  
  board = ChessBoard("board", config);
  
  updateMoveList();
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

/* ===============================================
   MOVE HANDLING
   =============================================== */

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
   input styles behave identically. Returns true if the move succeeded. */
function evaluateMove(source, target){
  if(freePlay){
    if(game.turn() !== userColor) return false;
    var freeMove = game.move({ from: source, to: target, promotion: "q" });
    if(freeMove === null) return false;
    board.position(game.fen(), false);
    handleMoveApplied(freeMove);
    updateMoveList();
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
    updateStatus("Opening line ended unexpectedly at move " + (ply+1) + ".");
    return false;
  }
  
  if(expMove.from === source && expMove.to === target){
    var applied = game.move(expected);
    board.position(game.fen(), false);
    handleMoveApplied(applied);
    ply++;
    resetStatusClasses();
    updateMoveList();
    
    if(ply >= sequence.length){
      completeLine();
      return true;
    }
    
    maybeScheduleBot();
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
   drives tap-to-select here rather than a separate click listener. */
function onDrop(source, target){
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

/* ===============================================
   TAP-TO-SELECT / TAP-TO-MOVE
   =============================================== */

function squareNameFromElement($el){
  var classes = ($el.attr("class") || "").split(/\s+/);
  for(var i=0;i<classes.length;i++){
    if(/^square-[a-h][1-8]$/.test(classes[i])){
      return classes[i].slice(7);
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
function selectSquare(square){
  selectedSquare = square;
  $("#board .square-55d63").removeClass("selected-square legal-target legal-capture");
  $("#board .square-" + square).addClass("selected-square");
  
  var moves = game.moves({ square: square, verbose: true });
  moves.forEach(function(m){
    var $sq = $("#board .square-" + m.to);
    if(m.flags.indexOf("c") !== -1){
      $sq.addClass("legal-capture");
    } else {
      $sq.addClass("legal-target");
    }
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
   (onDragStart declines the gesture). Those are exactly the two cases
   where we want tap-to-move behavior. */
$("#board").on("click", ".square-55d63", function(){
  var square = squareNameFromElement($(this));
  if(!square) return;
  
  if(!selectedSquare){
    handleSquareTapped(square);
  } else {
    clearSelection();
    evaluateMove(selectedSquare, square);
  }
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
      resetStatusClasses();
      updateStatus("One more move from the opponent...");
    } else {
      botThinking = true;
      updateStatus("Bot is thinking.");
    }
    setTimeout(botMove, 500);
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
    updateStatus("Bot could not move. Opening line ended.");
    return;
  }
  board.position(game.fen(), false);
  handleMoveApplied(moveObj);
  ply++;
  updateMoveList();
  
  if(ply >= sequence.length){
    completeLine();
  } else {
    resetStatusClasses();
    updateStatus("Your move.");
  }
}

function resetStatusClasses(){
  $("#statusPanel").removeClass("status-warning status-error status-success status-hint");
}

function showHint(expectedSan){
  var desc = describeMove(game.fen(), expectedSan);
  resetStatusClasses();
  $("#statusPanel").addClass("status-hint");
  $("#statusText").html("Your move: " + escapeHtml(desc));
}

function showDeviation(expectedSan){
  var desc = describeMove(game.fen(), expectedSan);
  resetStatusClasses();
  $("#statusPanel").addClass("status-warning");
  $("#statusText").html("Not quite. The book move is: " + escapeHtml(desc));
}

function failTest(expectedSan){
  var desc = describeMove(game.fen(), expectedSan);
  sessionEnded = true;
  resetStatusClasses();
  $("#statusPanel").addClass("status-error");
  $("#statusText").html("Test failed. The book move is: " + escapeHtml(desc));
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
    html += '<span class="move-number">'+num+'.</span> '+escapeHtml(w)+' ';
    if(b) html += escapeHtml(b)+' ';
  }
  $("#moveList").html(html);
}

/* ===============================================
   LINE COMPLETION
   =============================================== */

function completeLine(){
  if(trainingMode === "test"){
    markLearned();
    resetStatusClasses();
    $("#statusPanel").addClass("status-success");
    updateStatus("Test passed. This line is marked as learned.");
    sessionEnded = true;
    
    $("#postLineTitle").text("Test Passed!");
    $("#postLineMessage").text("You have successfully learned this opening line.");
    $("#goForTestBtn").addClass("hidden");
    $("#postLineModal").removeClass("hidden");
  } else {
    resetStatusClasses();
    $("#statusPanel").addClass("status-success");
    updateStatus("Excellent! You've completed the opening line. Choose next step:");
    sessionEnded = true;
    
    $("#postLineTitle").text("Line Complete!");
    $("#postLineMessage").text("What would you like to do next?");
    $("#goForTestBtn").removeClass("hidden");
    $("#postLineModal").removeClass("hidden");
  }
  
  launchChessConfetti();
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
  updateStatus("Free play. The opponent replies with random legal moves.");
  maybeScheduleBot();
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
  handleMoveApplied(moveObj);
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
    resetStatusClasses();
    updateStatus("Your move. Play freely; no line to follow.");
  }
}

function checkGameOverFreePlay(){
  if(game.game_over()){
    var msg = "Game over.";
    if(game.in_checkmate()){
      if(game.turn() === userColor){
        msg = "Checkmate. The bot wins.";
      } else {
        msg = "Checkmate. You win!";
        showCheckmateOverlay();
      }
    } else if(game.in_draw()){
      msg = "Draw.";
    } else if(game.in_stalemate()){
      msg = "Stalemate.";
    }
    sessionEnded = true;
    resetStatusClasses();
    $("#statusPanel").addClass("status-success");
    updateStatus(msg);
    return true;
  }
  return false;
}

/* ===============================================
   REWARD EFFECTS
   =============================================== */

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
    
    freqs.forEach(function(freq, idx){
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.3, now + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.15 + 0.2);
      osc.start(now + idx * 0.15);
      osc.stop(now + idx * 0.15 + 0.2);
    });
  }catch(e){}
}

function launchChessConfetti(){
  var canvas = document.getElementById("confettiCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";
  
  var ctx = canvas.getContext("2d");
  var particles = [];
  
  for(var i = 0; i < 60; i++){
    particles.push({
      x: Math.random() * canvas.width,
      y: -10,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 4 + 2,
      angle: Math.random() * Math.PI * 2,
      angVel: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 8 + 4,
      color: ["#d4a574", "#e0e0e0", "#52c41a"][Math.floor(Math.random() * 3)]
    });
  }
  
  var duration = 3000;
  var start = Date.now();
  
  function frame(){
    var elapsed = Date.now() - start;
    var progress = elapsed / duration;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(function(p){
      p.y += p.vy;
      p.x += p.vx;
      p.vy += 0.1;
      p.vx *= 0.99;
      p.angle += p.angVel;
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = Math.max(0, 1 - progress);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
      ctx.restore();
    });
    
    if(progress < 1){
      requestAnimationFrame(frame);
    } else {
      canvas.style.display = "none";
    }
  }
  
  requestAnimationFrame(frame);
}

$(window).on("resize", function(){
  if(board) board.resize();
});

}); // End document.ready

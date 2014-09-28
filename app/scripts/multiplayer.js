var url = "http://tiny-pizza-server.herokuapp.com/collections/the-iron-brawl/";

var gameList = new Template({
    id: 'gameList-template',
    where: 'game-list',
    method: "append"
});

var gameInfo = {
	active: true,
	player1:{},
	player2:{},
	date: new Date()
};


/* ------------------------------------
Get list of open games
*/

function getActiveGames(){
	$(".game-list").html("");
	console.log("Getting active games");
$.ajax({
    url: url,
    type: "GET",
    dataType: "json"
}).done(function(games) {

    _.chain(games).
    filter(function(game) {
        return game.active === "true";
    })
    .each(function(game) {
        gameList.render({
            id: game._id,
            player1: game.player1.name,
            character: game.player1.character,

            //player2: game.players[1].name
        });
    });
});
displayPlayers(playerTypes.User, userSelect);

}
getActiveGames();

// var getGames = setInterval(getActiveGames, 10000);

/* ------------------------------------
Create Game
*/

function createGame(gameInfo) {

    $.ajax({
        url: url,
        data: gameInfo,
        type: "POST",
        dataType: "json"
    }).done(function() {
        console.log("Game Added");
    });
}



/* ------------------------------------
Join Game
*/

function joinGame(gameID, name) {
	console.log(gameID, name);
    $.ajax({
        url: url + gameID,
        data: {player2: name},
        type: "PUT",
        dataType: "json"
    }).done(function() {
        console.log("Joined game");
    });

}

/* ------------------------------------
Deactivate Games
*/

function deactivateGame(gameID){
	$.ajax({
        url: url + gameID,
        data: {
            active: false
        },
        type: "PUT",
        dataType: "json"
    }).done(function() {
        console.log("Game Added");
    });
}


/* ------------------------------------
DELETE
*/

function deleteGame(id) {
    $.ajax({
        url: url + game._id,
        type: "DELETE",
    }).done(function() {
        console.log("Game " + id + " Deleted");
    });
}


function deleteAllGames() {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
    }).done(function(data) {
        _.each(data, function(game) {
            $.ajax({
                url: url + game._id,
                type: "DELETE",
            }).done(function() {
                console.log("Games Deleted");
            });
        });
    });
}


/* ------------------------------------
Click Events
*/

$(document).on("click", ".create", function(e) {
    e.preventDefault();
    console.log("clicked");
    gameInfo.player1["name"] = $(".name").val();
    gameInfo.player1["character"] = $(this).siblings(".user-select").val();
    createGame(gameInfo);
});



$(document).on("click", ".join", function(e) {
	console.log("join");
    e.preventDefault();
    var gameID = $(this).attr("gameID");
    var name = $(this).siblings(".name").val();
    joinGame(gameID, name);
});

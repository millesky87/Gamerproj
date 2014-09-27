var url = "http://tiny-pizza-server.herokuapp.com/collections/the-iron-brawl/";

var gameList = new Template({
    id: 'gameList-template',
    where: 'game-list',
    players: [
    {},{}
    ]
});


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
            player1: game.players[0].name,
        });
    });

});


gameInfo = {
    active: true,
    players: [],
    date: new Date(),
};

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

$(document).on("click", ".create", function(e) {
    e.preventDefault();
    console.log("clicked");
    var name = $(".name").val();
    gameInfo.players.push({
        "name": name
    });
    createGame(gameInfo);
})



$(document).on("click", ".join", function(e) {
	console.log("join")
    e.preventDefault();
    var gameID = $(this).attr("gameID");
    joinGame(gameID, name);
});

function deleteGame() {

}

function joinGame(gameID, name) {
    data = {};
    data.players["name"].push(name);
    $.ajax({
        url: url + gameID,
        data: data,
        type: "PUT",
        dataType: "json"
    }).done(function() {
        console.log("Joined game");
    });

}

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
                url: url + "/" + game._id,
                type: "DELETE",
            }).done(function() {
                console.log("Games Deleted");
            });
        })
    });
}
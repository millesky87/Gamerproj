


gameInfo = {
	gameID: Math.floor(Math.rand()*100000000000),
	active: true,
	players: [
		{name: "One"},
		{name: "Two"}
		],
	date: new Date(),
};

$.ajax({
	url: "http://tiny-pizza-server.herokuapp.com/collections/the-iron-brawl",
	data: gameInfo,
	type: "POST",
	dataType: "json"
}).done(function(){
	console.log("Game Added");
});
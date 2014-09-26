//console.log('The Iron Yard Rocks');

function Template(options){
	this.id = options.id;
	this.where = options.where;
	this.method = options.method || "append"; 
}

Template.prototype.render = function(data){
	var template = _.template($("#"+this.id).text());
	$("."+this.where)[this.method](template(data));
};


function Ring(){}

Ring.prototype.render = function(data){
	
}
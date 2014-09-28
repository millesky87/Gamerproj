/* ------------------------------------------------
    Player types and players
*/
var url = "http://tiny-pizza-server.herokuapp.com/collections/the-iron-brawl/",
    playerTypes = {
        "User": [{
            name: "Mady",
            weapons: [{
                type: 'animalMimicry',
                points: 5
            }],
            power: 600
        }, {
            name: "Jonathan",
            weapons: [{
                type: 'psychicBlast',
                points: 5
            }],
            power: 200
        }, {
            name: "Skylar",
            weapons: [{
                type: 'biologicalManipulation',
                points: 5
            }],
            power: 900
        }, ],
        "Computer": [{
            name: "Mason",
            weapons: [{
                type: 'intellectualStare',
                points: 5
            }],
            power: 1000
        }, {
            name: "Jake",
            weapons: [{
                type: 'deathWishCoffee',
                points: 5
            }],
            power: 800
        }, {
            name: "Matt",
            weapons: [{
                type: 'zenKoan',
                points: 5
            }],
            power: 600
        }]
    },
    user,
    computer;

function randomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function buildConstructors(playerType) {
    _.each(playerTypes[playerType], function(player) {
        if (playerType == "User")
            window[player.name.toLowerCase()] = new User(player);
        else if (playerType == "Computer")
            window[player.name.toLowerCase()] = new Computer(player);
    });
}

/* ------------------------------------------------
    Create Players
*/

function Player(options) {
    options = options || {};
    this.health = 100 || options.health;
    this.id = 1 || options.id;
    this.name = "" || options.name;
    this.voodooFactor = "100" || options.voodooFactor;
    this.weapons = [{
        type: 'sword',
        points: 3
    }, {
        type: 'handslap',
        points: 2
    }];
    this.power = 1000 || options.power;
}

// Attack prototype
Player.prototype.attack = function(attacked) {
    var hitPoints = randomNum(0, 10);
    attacked.health = attacked.health - hitPoints;
    if (this instanceof User) {
        $(".human .attack-history").html("<li>Attacked and took " + hitPoints + " health points from " + computer.name + "</li>");
    } else
        $(".computer .attack-history").html("<li>Attacked and took " + hitPoints + " health points from " + user.name + "</li>");
};


/* ------------------------------------------------
    Create Users (human)
*/

function User(options) {
    options = options || {};
    Player.apply(this, arguments);
    this.weapons = _.union(options.weapons, this.weapons) || "";
    this.power = options.power || "";
    this.name = options.name || "";
}
User.prototype = Object.create(Player.prototype);

buildConstructors("User");


/* ------------------------------------------------
    Create Computers (enemies)
*/

function Computer(options) {
    options = options || {};
    Player.apply(this, arguments);
    this.weapons = _.union(options.weapons, this.weapons) || "";
    this.power = options.power || "";
    this.name = options.name || "";
}
Computer.prototype = Object.create(Player.prototype);

buildConstructors("Computer");



function displayPlayers(data, constructor) {
    _.chain(data).each(function(type) {
        constructor.render({
            "name": type.name
        });
    });
}

function updateHealthBar() {

    $(".human .health span").css({
        width: user.health + "%"
    });
    $(".computer .health span").css({
        width: computer.health + "%"
    });

}

function checkHealth(userHealth, computerHealth) {
    if (userHealth <= 0 && userHealth < computerHealth) {
        $(".attack").addClass("hide");
        $(".main-wrap").addClass("hide");
        $(".you-lose").removeClass("hide");
    }

    if (computerHealth <= 0 && computerHealth < userHealth) {
        $(".attack").addClass("hide");
        $(".main-wrap").addClass("hide");
        $(".you-win").removeClass("hide");
    }
}

/* ------------------------------------------------
    Add player choices to DOM
*/

userSelect = new Template({
    id: 'select-template',
    where: 'user-select'
});

displayPlayers(playerTypes.User, userSelect);


var renderWeapons = new Template({
    id: "weapon-options",
    where: "human-weapons"
});

function addWeapons(user) {
    _.each(user.weapons, function(weapon) {
        renderWeapons.render({
            weapon: weapon.type,
            points: weapon.points,
            where: "human-weapons",
        });
    });
    // _.each(computer.weapons, function(weapon) {
    //     renderWeapons.render({
    //         weapon: weapon.type,
    //         points: weapon.points
    //     });
    // });
}


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

function animatePlayers() {
    $('#human-image').toggleClass('human-attack');
    $('#computer-image').toggleClass('computer-attack');
    $('#human-image').toggleClass('human-idle');
    $('#computer-image').toggleClass('computer-idle');


    setTimeout(function() {
        $('#human-image').toggleClass('human-attack');
        $('#computer-image').toggleClass('computer-attack');
        $('#human-image').toggleClass('human-idle');
        $('#computer-image').toggleClass('computer-idle');
    }, 1000);
}

function conjureMagic() {

    var magicAffectTime = 5,
        i = 0,
        magicInterval;
    magicInterval = setInterval(function() {
        console.log("Using magic - reduction", computer);
        computer.health = computer.health - 5;
        updateHealthBar();
        if (++i === magicAffectTime) {
            window.clearInterval(magicInterval);
        }
    }, 2000);
}

function stagePlayers(userName, computerName){
    userSelection = new Template({
        id: 'human-name',
        where: 'human-area'
    });

    userSelection.render({
        "name": userName
    });

    computerSelection = new Template({
        id: 'computer-name',
        where: 'computer-area'
    });

    computerSelection.render({
        "name": computerName
    });
}

function getEngageOption(){
    var points = $(".options-list").find("selected").attr("points");
    console.log(points);
    return points;
}

function giveLife(){
    var w = randomNum(0, 100);
    if (w > 50)
        user.health += 5;
    else 
        computer.health += 5;

}


// First aid kits
function firstAid(){

    var waitTime = randomNum(6000, 10000);

    setInterval(setTimeout(giveLife, waitTime), 10000);

}

/* ------------------------------------------------
  Click Events
*/

// Play
$(document).on("click", ".play", function(e) {
    e.preventDefault();
    var userName = $(".user-select").val();
    var computerName = playerTypes.Computer.map(function(player) {
        return (player.name);
    });

    computerName = computerName[Math.floor(Math.random() * computerName.length)];

    stagePlayers(userName, computerName);

    user = window[userName.toLowerCase()];
    computer = window[computerName.toLowerCase()];

    addWeapons(user);

    $(".human h2").html("<p>" + user.name + "</p>");
    $(".computer h2").html("<p>" + computer.name + "</p>");

    $(".main-wrap").removeClass("hide");
    $("#home").addClass("hide");

    //createGame(user);
});


// Attack method
$(document).on("click", ".attack", function(e) {
    e.preventDefault();

    var pointSub = getEngageOption();
    console.log(pointSub);

    user.attack(computer);
    computer.attack(user);

    checkHealth(user.health, computer.health);

    updateHealthBar();

    animatePlayers();

});


$(document).on("click", ".weapon", function(e) {
    e.preventDefault();
    $(this).parent().siblings().find(".weapon").removeClass("selected");
    $(this).addClass("selected");

});


// Magic button
$(document).on("click", ".magic", function(e) {
    e.preventDefault();
    conjureMagic();
});


$(function(){
    firstAid();
})
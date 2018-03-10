var svgc = document.getElementById("one");
var clearB = document.getElementById("clear");
var svgns = "http://www.w3.org/2000/svg";
var aniID;

// Stores emotes in the format [emoji, vX, vY]
var emotes = [];

var resetAniInt = function () {
    clearInterval(aniID);
    aniID = setInterval(animateEmoji, 10);
};

var newEmoji = function (x, y) {
    resetAniInt();

    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var emoji = document.createElementNS(svgns, "image");
    emoji.setAttributeNS(null, "x", x - 25);
    emoji.setAttributeNS(null, "y", y - 25);
    emoji.setAttributeNS(null, "width", 50);
    emoji.setAttributeNS(null, "height", 50);
    emoji.setAttributeNS(null, "href", "./emotes/"+ getRandomInt(0, 8) + ".svg");
    emoji.setAttributeNS(null, "style", "pointer-events: none;")
    svgc.appendChild(emoji);

    var velX = getRandomInt(-10, 10);
    var velY = getRandomInt(-10, 10);

    emotes.push([emoji, velX, velY]);
};

var animateEmoji = function () {
    var maxX = parseInt(svgc.getAttribute("width"));
    var maxY = parseInt(svgc.getAttribute("height"));
    for (var i in emotes) {
        var emote = emotes[i][0];
        var xPos = parseInt(emote.getAttribute("x"));
        var yPos = parseInt(emote.getAttribute("y"));
        var emoteW = parseInt(emote.getAttribute("width"));
        var emoteH = parseInt(emote.getAttribute("height"));
        var vX = emotes[i][1];
        var vY = emotes[i][2];

        var newX = xPos + vX;
        var newY = yPos + vY;

        var invertVX = function () {
            emotes[i][1] *= -1;
        };

        var invertVY = function () {
            emotes[i][2] *= -1;
        };

        var tryInvert = function () {
            if (newX + emoteW >= maxX || newX <= 0) invertVX();
            if (newY + emoteH >= maxY || newY <= 0) invertVY();
        };

        emote.setAttributeNS(null, "x", newX);
        emote.setAttributeNS(null, "y", newY);

        tryInvert();
    }
};

var clicky = function (e) {
    newEmoji(e.offsetX, e.offsetY);
};

svgc.addEventListener("click", clicky);

var cleary = function () {
    while (svgc.firstChild) {
        svgc.removeChild(svgc.firstChild);
    }

    clearInterval(aniID);

    emotes = [];
};

clearB.addEventListener("click", cleary);
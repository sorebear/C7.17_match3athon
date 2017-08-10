/**
 * Created by sorenbaird on 8/9/17.
 */

var game = {
    //METHOD FOR SETTING UP THE GAME UPON LOAD
    init: function() {
        //Will map out the Emoji objects onto the map
        game.clickHandler(); //Initializes the clickHandler on game start.
        for (var startColumn = 7; startColumn > -1; startColumn--) {
            for (var startRow = 0; startRow < 8; startRow++) {
                var newEmoji = game.generateRandomEmoji();
                game.gameMap[startRow][startColumn] = newEmoji;
                var newDiv = $("<div>").addClass("emojiContainer").attr("position", startRow +"x"+ startColumn);
                var newImg = $("<img>").attr("src", "images/" + newEmoji.name + ".png").addClass("emojiImg");
                newDiv.append(newImg);
                $('#iphoneScreen').append(newDiv);
            }
        }
    },
    emojiArray: ["cool", "happy", "evil", "hearteyes", "laugh"], //This will hold all of the different types of Emoji's
    specialEmojiArray:[],
    //DESIGN SYNCH UP REQUIRED - Make sure the image names and the names in the Emoji Array are the same
    generateEmoji: function(name) {
        var generatedEmoji = new Emoji(name); //Creates a new Emoji Object
        return generatedEmoji;  //Returns the newly created Emoji Object
    },
    generateRandomEmoji: function() {
        var randomNumber = Math.floor(Math.random() * game.emojiArray.length); //Randomly selects an Emoji from the Emoji Array
        return game.generateEmoji(game.emojiArray[randomNumber]); //Calls the generateEmoji Method, passing in the randomly selected Emoji
    },
    gameMap: [[], [], [], [], [], [], [], []], //This will be a multi-dimensional array (8x8) to hold the Emoji objects.
    //DESIGN SYNCH UP REQUIRED - Make sure the Object positions and the DIV class names synch up.


    //VARIABLES AND METHODS FOR HANDLING EMOJI CLICKS
    firstEmojiSelected: null,
    secondEmojiSelected: null,//A Boolean to track whether a click is the 1st or 2nd Emoji selected
    clickHandler: function() {
        $('#iphone').on('click', '.emojiContainer', function() {
            console.log('Emoji was clicked');
            game.emojiSelector(this); //A click handler that will call the emojiSelection Method on click
        })
    },
    emojiSelector: function(emoji) {
        //Checks to see if this is the first or second emoji clicked
        console.log('in emoji Selector');
        if (game.firstEmojiSelected === null) {
            game.firstSelection(emoji); //If there is already a first selection, launch the secondSelection Method
            game.firstEmojiSelected = $(emoji).attr("position");
            console.log('firstEmojiSelected assigned: ' + game.firstEmojiSelected);
            //game.firstSelection(this.firstEmojiSelected); //If there is already a first selection, launch the secondSelection Method

        } else {
            //check if second Emoji is a valid selection
            //game.secondEmojiSelected = emoji;
            console.log('second emoji assigned:  ' + game.secondEmojiSelected);
            //game.secondSelection(); //Otherwise, launch the firstSelection Method
            game.secondEmojiSelected = $(emoji).attr("position");
            //game.secondSelection(); //Otherwise, launch the firstSelection Method ;;;secondEmojiSelected

        }
    },
    firstSelection: function(emoji) {
        //1. Highlight the selected Emoji on the DOM in some way


        $(emoji).css('box-shadow', '0 0 2px  1px red');





        //2. Highlight all of the adjacent Emojis on the Dom in another way

    },
    secondSelection: function() {
        //Swap the two emojis on the DOM and in the array
        //game.checkForMatches(); //Check to see if a match was made.
        //If no check was made, swap the two Emojis back.
        //game.firstEmojiSelected = null; //Re-Initialize the firstSelection boolean
    },
    checkForMatches: function() {
        var tempHoldImg = null;
        var tempHoldImg2 = null;
        for (var rowCounter = 7; rowCounter > 1; rowCounter--) {
            for (var columnCounter = 0; columnCounter < 8; columnCounter++) {
                var currentPositionImg = game.gameMap[rowCounter][columnCounter].name;
                if (currentPositionImg === tempHoldImg2) {
                    console.log("I found a horizontal match of 3 from position " + rowCounter + "x" + (columnCounter - 2) + " to " + rowCounter + "x" + columnCounter);
                    game.setMatchedToBeDestroyed(rowCounter, columnCounter, currentPositionImg, "horizontal");
                } else if (currentPositionImg === tempHoldImg) {
                    tempHoldImg2 = currentPositionImg;
                } else {
                    tempHoldImg = currentPositionImg;
                    tempHoldImg2 = null;
                }
                var oneBelowImg = game.gameMap[rowCounter - 1][columnCounter].name;
                if (currentPositionImg === oneBelowImg) {
                    var twoBelowImg = game.gameMap[rowCounter - 2][columnCounter].name;
                    if (oneBelowImg === twoBelowImg) {
                        console.log("I found a vertical match of 3 from position " + rowCounter + "x" + columnCounter + " to " + (rowCounter - 2) + "x" + columnCounter);
                        game.setMatchedToBeDestroyed(rowCounter, columnCounter, currentPositionImg, "vertical");
                    }
                }
            }
            tempHoldImg=null;
            tempHoldImg2=null;
        }
        for (rowCounter = 1; rowCounter > -1; rowCounter++) {
            for (columnCounter = 0; columnCounter < 8; columnCounter++) {
                currentPositionImg = game.gameMap[rowCounter][columnCounter].name;
                if (currentPositionImg === tempHoldImg2) {
                    console.log("I found a horizontal match of 3 from position " + rowCounter + "x" + columnCounter + " to " + rowCounter + "x" + (columnCounter + 2));
                    game.setMatchedToBeDestroyed(rowCounter, columnCounter, currentPositionImg, "horizontal");
                } else if (currentPositionImg === tempHoldImg) {
                    tempHoldImg2 = currentPositionImg;
                } else {
                    tempHoldImg = currentPositionImg;
                    tempHoldImg2 = null;
                }
            }
        }
    },
    setMatchedToBeDestroyed: function(startingRow, startingColumn, matchingEmoji, direction) {
        if (direction === 'vertical') {
            $("div[position=" + startingRow + "x" + startingColumn + "]").addClass('readyToDestroy');
            game.gameMap[startingRow].splice(startingColumn, 1);
            $("div[position=" + (startingRow + 1) + "x" + startingColumn + "]").addClass('readyToDestroy');
            game.gameMap[startingRow + 1].splice(startingColumn, 1);
            var nextImage = matchingEmoji;
            var nextImagePosition = 2;
            while (nextImage === matchingEmoji && nextImagePosition < 8) {
                $("div[position=" + (startingRow + nextImagePosition) + "x" + startingColumn + "]").addClass('readyToDestroy');
                game.gameMap[startingRow + nextImagePosition].splice(startingColumn, 1);
                nextImagePosition++;
                if (startingRow+nextImagePosition < 8) {
                    nextImage = game.gameMap[startingRow + nextImagePosition][startingColumn].name;
                }
            }
        } else {
            $("div[position=" + startingRow + "x" + (startingColumn-2) + "]").addClass('readyToDestroy');
            game.gameMap[startingRow].splice(startingColumn-2, 1);
            $("div[position=" + startingRow + "x" + (startingColumn-1) + "]").addClass('readyToDestroy');
            game.gameMap[startingRow].splice(startingColumn-1, 1);
            nextImage = matchingEmoji;
            nextImagePosition = 0;
            while (nextImage === matchingEmoji && nextImagePosition < 8) {
                $("div[position=" + startingRow + "x" + (startingColumn+nextImagePosition) + "]").addClass('readyToDestroy');
                game.gameMap[startingRow].splice(startingColumn+nextImagePosition, 1);
                nextImagePosition++;
                if (startingColumn+nextImagePosition < 8) {
                    nextImage = game.gameMap[startingRow][startingColumn+nextImagePosition].name;
                }
            }

        }
        setTimeout(function(){game.destroyEmojis()}, 500);
    },
    destroyEmojis: function() {
        $(".readyToDestroy").empty();
    },
    collapse: function() {


        game.generateRandomEmoji();  //Call the Method to create a random Emoji to fill in the newly created space
        //game.checkForMatches() //Call the checkForMatches Method to see if any new matches were made
    },


    currentScore: 0,
    highScore: 0,
    displayCurrentScore: function() {},
    updateScore: function() {
        displayCurrentScore();
    }
};

function Emoji(name) {
    this.name = name;
}
$(document).ready(function () {

    $('#playButton').click(function () {
        $('#initialOverlay').hide();
        game.init();
    });
});
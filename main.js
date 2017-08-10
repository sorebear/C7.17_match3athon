/**
 * Created by sorenbaird on 8/9/17.
 */

var game = {
    //METHOD FOR SETTING UP THE GAME UPON LOAD
    init: function() {
        //Will map out the Emoji objects onto the map
        game.clickHandler(); //Initializes the clickHandler on game start.
        for (var startRow = 7; startRow > -1; startRow--) {
            for (var startColumn = 0; startColumn < 8; startColumn++) {
                var newEmoji = game.generateRandomEmoji();
                game.gameMap[startColumn][startRow] = newEmoji;
                var newDiv = $("<div>").addClass("emojiContainer").attr("position", startRow +"x"+ startColumn);
                var newImg = $("<img>").attr("src", "images/" + newEmoji.name + ".png").addClass("emojiImg");
                newDiv.append(newImg);
                $('#iphoneScreen').append(newDiv);
            }
        }
    },
    emojiArray: ["cool", "happy", "evil", "hearteyes"], //This will hold all of the different types of Emoji's
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
    objectsToDestroyFromGameMap: [],
    //VARIABLES AND METHODS FOR HANDLING EMOJI CLICKS
    firstEmojiSelected: null,
    secondEmojiSelected: null,//A Boolean to track whether a click is the 1st or 2nd Emoji selected
    firstEmojiSelectedPosition: null,
    secondEmojiSelectedPosition: null,
    firstPosition: '',
    secondPosition: '',
    thirdPosition: '',
    fourthPositon: '',

    clickHandler: function() {
        $('#iphoneScreen').on('click', '.emojiContainer', function() {
            console.log('Emoji was clicked');
            game.emojiSelector(this); //A click handler that will call the emojiSelection Method on click
        })
    },
    emojiSelector: function(emoji) {
        //Checks to see if this is the first or second emoji clicked
        console.log('in emoji Selector');
        if (game.firstEmojiSelected === null) {
            game.firstEmojiSelected = $(emoji);//.attr("position");
            game.firstEmojiSelectedPosition = $(emoji).attr("position");
            game.firstSelection(emoji); //If there is already a first selection, launch the secondSelection Method

             //If there is already a first selection, launch the secondSelection Method

        } else {
            //check if second Emoji is a valid selection

            game.secondEmojiSelected = $(emoji);//.attr("position");
            game.secondEmojiSelectedPosition = $(emoji).attr("position");
            game.secondSelection(emoji); //Otherwise, launch the firstSelection Method

            //game.secondEmojiSelectedPosition = $(emoji).attr("position");


        }
    },
    firstSelection: function(emoji) {
        //1. Highlight the selected Emoji on the DOM in some way


        $(emoji).addClass('selected');
        console.log('first selcetion  '+ emoji);


        //2. Highlight all of the adjacent Emojis on the Dom in another way

        var tempRow = parseInt(game.firstEmojiSelectedPosition.substr(0,1));
        var tempColumn = parseInt(game.firstEmojiSelectedPosition.substr(2,1));
        console.log(tempRow + "x" + tempColumn);

        if (tempRow < 7) {
            $("[position=" + (tempRow + 1) + "x" + tempColumn + "]").addClass('to_be_selected');
            game.firstPosition = (tempRow + 1) + "x" + tempColumn;
        }
        if (tempRow > 0) {
            $("[position=" + (tempRow - 1) + "x" + tempColumn + "]").addClass('to_be_selected');
            game.secondPosition = (tempRow - 1) + "x" + tempColumn;
        }
        if (tempColumn < 7) {
            $("[position=" + tempRow + "x" + (tempColumn + 1) + "]").addClass('to_be_selected');
            //game.thirdPosition =  $("[position=" + tempRow + "x" + (tempColumn + 1) + "]".attr("position"));
        }
        if (tempColumn > 0) {
            $("[position=" + tempRow + "x" + (tempColumn - 1) + "]").addClass('to_be_selected');
            //game.fourthPositon = $("[position=" + tempRow + "x" + (tempColumn - 1) + "]").attr("position");

        }
    },
    secondSelection: function(emoji) {
        // var tempRow = parseInt(game.secondEmojiSelectedPosition.substr(0,1));
        // var tempColumn = parseInt(game.secondEmojiSelectedPosition.substr(2,1));
        console.log('in second selection function');

        console.log(game.firstPosition);

            // if (tempRow < 7) {
            //     $("[position=" + (tempRow + 1) + "x" + tempColumn + "]");
            //     var firstPosition =  $("[position=" + (tempRow + 1) + "x" + tempColumn + "]");
            // }
            // if (tempRow > 0) {
            //     $("[position=" + (tempRow - 1) + "x" + tempColumn + "]");
            //     firstPosition =  $("[position=" + (tempRow - 1) + "x" + tempColumn + "]");
            // }
            // if (tempColumn < 7) {
            //     $("[position=" + tempRow + "x" + (tempColumn + 1) + "]");
            //     firstPosition =  $("[position=" + tempRow + "x" + (tempColumn + 1) + "]");
            // }
            // if (tempColumn > 0) {
            //     $("[position=" + tempRow + "x" + (tempColumn - 1) + "]");
            //     firstPosition = $("[position=" + tempRow + "x" + (tempColumn - 1) + "]");
            //
            // }

            if(firstPosition === game.firstPosition || firstPosition === game.secondPosition || firstPosition === game.thirdPosition || firstPosition === game.fourthPositon){
                console.log('true');

            }else if(firstPosition){

            }
            else {
                console.log(tempRow + "x" + tempColumn);
                $(game.firstPosition).removeClass('to_be_selected');
                $(game.secondPosition).removeClass('to_be_selected');
                $(game.thirdPosition).removeClass('to_be_selected');
                $(game.fourthPositon).removeClass('to_be_selected');
                $(game.firstEmojiSelected).removeClass('selected');
                game.firstEmojiSelected = null;
            }




        //Swap the two emojis on the DOM and in the array



        }

        //game.checkForMatches(); //Check to see if a match was made.

        //game.firstEmojiSelected = null; //Re-Initialize the firstSelection boolean
    ,
    checkForMatches: function() {
        var tempHoldImg = null;
        var tempHoldImg2 = null;
        // var argumentsToPass = [];
        for (var rowCounter = 7; rowCounter > 1; rowCounter--) {
            for (var columnCounter = 0; columnCounter < 8; columnCounter++) {
                var currentPositionImg = game.gameMap[columnCounter][rowCounter].name;
                if (currentPositionImg === tempHoldImg2) {
                    console.log("I found a horizontal match of 3 from position " + rowCounter + "x" + (columnCounter - 2) + " to " + rowCounter + "x" + columnCounter);
                    // argumentsToPass.push([rowCounter, columnCounter, currentPositionImg, "horizontal"])
                    game.setMatchedToBeDestroyed(rowCounter, columnCounter, currentPositionImg, "horizontal");
                } else if (currentPositionImg === tempHoldImg) {
                    tempHoldImg2 = currentPositionImg;
                } else {
                    tempHoldImg = currentPositionImg;
                    tempHoldImg2 = null;
                }
                var oneBelowImg = game.gameMap[columnCounter][rowCounter - 1].name;
                if (currentPositionImg === oneBelowImg) {
                    var twoBelowImg = game.gameMap[columnCounter][rowCounter - 2].name;
                    if (oneBelowImg === twoBelowImg) {
                        console.log("I found a vertical match of 3 from position " + (rowCounter-2) + "x" + columnCounter + " to " + rowCounter + "x" + columnCounter);
                        //argumentsToPass.push([rowCounter, columnCounter, currentPositionImg, "vertical"])
                        game.setMatchedToBeDestroyed(rowCounter, columnCounter, currentPositionImg, "vertical");
                    }
                }
            }
            tempHoldImg=null;
            tempHoldImg2=null;
        }
        for (rowCounter = 1; rowCounter > -1; rowCounter--) {
            for (columnCounter = 0; columnCounter < 8; columnCounter++) {
                currentPositionImg = game.gameMap[columnCounter][rowCounter].name;
                if (currentPositionImg === tempHoldImg2) {
                    console.log("I found a horizontal match of 3 from position " + rowCounter + "x" + columnCounter + " to " + rowCounter + "x" + (columnCounter + 2));
                    game.setMatchedToBeDestroyed(rowCounter, columnCounter, currentPositionImg, "horizontal");
                    //argumentsToPass.push([rowCounter, columnCounter, currentPositionImg, "horizontal"])
                } else if (currentPositionImg === tempHoldImg) {
                    tempHoldImg2 = currentPositionImg;
                } else {
                    tempHoldImg = currentPositionImg;
                    tempHoldImg2 = null;
                }
            }
            tempHoldImg=null;
            tempHoldImg2=null;
        }
        setTimeout(function(){
            game.destroyEmojis();
            for (var i = 0; i < game.objectsToDestroyFromGameMap.length; i++) {
                game.gameMap[game.objectsToDestroyFromGameMap[i][0]].splice(game.objectsToDestroyFromGameMap[i][1], 1);
            }
            game.objectsToDestroyFromGameMap = [];
        }, 500);
    },
    setMatchedToBeDestroyed: function(startingRow, startingColumn, matchingEmoji, direction) {
        if (direction === 'vertical') {
            if (!($("div[position=" + startingRow + "x" + startingColumn + "]").hasClass('readyToDestroy'))) {
                game.objectsToDestroyFromGameMap.push([startingColumn, startingRow]);
                game.score.tempScore += 10;
                $("div[position=" + startingRow + "x" + startingColumn + "]").addClass('readyToDestroy');
            } else {
                game.score.tempScoreMultiplyer += 1;
            }
            if (!($("div[position=" + (startingRow - 1) + "x" + startingColumn + "]").hasClass('readyToDestroy'))) {
                game.objectsToDestroyFromGameMap.push([startingColumn, (startingRow-1)]);
                game.score.tempScore += 10;
                $("div[position=" + (startingRow - 1) + "x" + startingColumn + "]").addClass('readyToDestroy');
            }
            var nextImage = matchingEmoji;
            var nextImagePosition = 2;
            while (nextImage === matchingEmoji && startingRow-nextImagePosition > -1) {
                if (!($("div[position=" + (startingRow - nextImagePosition) + "x" + startingColumn + "]").hasClass('readyToDestroy'))) {
                    $("div[position=" + (startingRow - nextImagePosition) + "x" + startingColumn + "]").addClass('readyToDestroy');
                    game.score.tempScore += 10;
                    game.objectsToDestroyFromGameMap.push([startingColumn, (startingRow - nextImagePosition)]);
                }
                nextImagePosition++;
                if (startingRow-nextImagePosition > -1) {
                    nextImage = game.gameMap[startingColumn][startingRow - nextImagePosition].name;
                }
            }
            //game.score.tempScoreMultiplyer += (nextImagePosition - 3)
        } else {
            if (!($("div[position=" + startingRow + "x" + (startingColumn-2) + "]").hasClass('readyToDestroy'))) {
                $("div[position=" + startingRow + "x" + (startingColumn-2) + "]").addClass('readyToDestroy');
                game.objectsToDestroyFromGameMap.push([(startingColumn-2), (startingRow)]);
                game.score.tempScore += 10;
            } else {
                game.score.tempScoreMultiplyer += 1;
            }
            if (!($("div[position=" + startingRow + "x" + (startingColumn-1) + "]").hasClass('readyToDestroy'))) {
                $("div[position=" + startingRow + "x" + (startingColumn-1) + "]").addClass('readyToDestroy');
                game.objectsToDestroyFromGameMap.push([(startingColumn-1), (startingRow)]);
                game.score.tempScore += 10;
            }
            nextImage = matchingEmoji;
            nextImagePosition = 0;
            while (nextImage === matchingEmoji && startingColumn+nextImagePosition < 8) {
                if (!($("div[position=" + startingRow + "x" + (startingColumn+nextImagePosition) + "]").hasClass('readyToDestroy'))) {
                    $("div[position=" + startingRow + "x" + (startingColumn + nextImagePosition) + "]").addClass('readyToDestroy');
                    game.objectsToDestroyFromGameMap.push([(startingColumn + nextImagePosition), (startingRow)]);
                    game.score.tempScore += 10;
                }
                nextImagePosition++;
                if (startingColumn+nextImagePosition < 8) {
                    nextImage = game.gameMap[startingColumn+nextImagePosition][startingRow].name;
                }
            }
            //game.score.tempScoreMultiplyer += (nextImagePosition - 1)
        }
    },
    destroyEmojis: function() {
        $(".readyToDestroy").empty();
        game.score.updateScore();
    },
    collapse: function() {


        game.generateRandomEmoji();  //Call the Method to create a random Emoji to fill in the newly created space
        //game.checkForMatches() //Call the checkForMatches Method to see if any new matches were made
    },
    score: {
        tempScore: 0,
        tempScoreMultiplyer: 1,
        currentScore: 0,
        highScore: 0,
        updateScore: function() {
            game.score.currentScore += game.score.tempScore * game.score.tempScoreMultiplyer;
            game.score.tempScore = 0;
            game.score.tempScoreMultiplyer = 1;
            $('#scoreSection').text("Score: " + game.score.currentScore);
        }
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
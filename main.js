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
                var newImg = $("<img>").attr("src", "images/" + newEmoji.name + ".png").addClass("emojiImg").addClass("h" + startRow +"x"+ startColumn);
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

            console.log('first emoji assigned:  ' + emoji);
             //If there is already a first selection, launch the secondSelection Method

        } else {
            //check if second Emoji is a valid selection


            game.secondSelection(); //Otherwise, launch the firstSelection Method
            game.secondEmojiSelected = $(emoji);//.attr("position");
            //game.secondEmojiSelectedPosition = $(emoji).attr("position");
            console.log('second emoji assigned:  ' + game.secondEmojiSelected);

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
        }
        if (tempRow > 0) {
            $("[position=" + (tempRow - 1) + "x" + tempColumn + "]").addClass('to_be_selected');
        }
        if (tempColumn < 7) {
            $("[position=" + tempRow + "x" + (tempColumn + 1) + "]").addClass('to_be_selected');
        }
        if (tempColumn > 0) {
            $("[position=" + tempRow + "x" + (tempColumn - 1) + "]").addClass('to_be_selected');
        }





    },
    secondSelection: function() {

        console.log('in second selection function');

        //Swap the two emojis on the DOM and in the array
        // switch(game.firstEmojiSelected.position){
        //     case '7x0':
        //         if(game.secondEmojiSelected === '7x1' || game.secondEmojiSelected === '6x0'){
        //             //its the position qualifies for a swap so swap it
        //             //and do a checkForMatches()
        //             //game.checkForMatches();
        //             console.log('first emoji position: '+ game.firstEmojiSelected.outerHTML());
        //             console.log('secod emoji position: '+ game.secondEmojiSelected);
        //             //$(firstEmoji).attr("7x1").removeClass('to_be_selected');
        //             //$(firstEmoji).attr("6x0").removeClass('to_be_selected');
        //         }else{
        //             //no swap necessary reset first and second emoji var
        //             console.log('no swap');
        //             console.log('first emoji position: '+ firstEmoji);
        //             console.log('secod emoji position: '+ game.secondEmojiSelected);
        //             //$(firstEmoji).attr("7x1").removeClass('to_be_selected');
        //             //$(firstEmoji).attr("6x0").removeClass('to_be_selected');
        //         }
        //
        //         break;
        //     case '7x1':
        //         $(emoji).attr("7x0").removeClass('to_be_selected');
        //         $(emoji).attr("7x2").removeClass('to_be_selected');
        //         $(emoji).attr("6x1").removeClass('to_be_selected');
        //         break;
        //     case '7x2':
        //         $(emoji).attr("7x1").removeClass('to_be_selected');
        //         $(emoji).attr("7x3").removeClass('to_be_selected');
        //         $(emoji).attr("6x2").removeClass('to_be_selected');
        //         break;
        //     case '7x3':
        //         $(emoji).attr("7x2").removeClass('to_be_selected');
        //         $(emoji).attr("7x4").removeClass('to_be_selected');
        //         $(emoji).attr("6x3").removeClass('to_be_selected');
        //         break;
        //     case '7x4':
        //         $(emoji).attr("7x3").removeClass('to_be_selected');
        //         $(emoji).attr("7x5").removeClass('to_be_selected');
        //         $(emoji).attr("6x4").removeClass('to_be_selected');
        //         break;
        //     case '7x5':
        //         $(emoji).attr("7x4").removeClass('to_be_selected');
        //         $(emoji).attr("7x6").removeClass('to_be_selected');
        //         $(emoji).attr("6x5").removeClass('to_be_selected');
        //         break;
        //     case '7x6':
        //         $(emoji).attr("7x5").removeClass('to_be_selected');
        //         $(emoji).attr("7x7").removeClass('to_be_selected');
        //         $(emoji).attr("6x6").removeClass('to_be_selected');
        //         break;
        //     case '7x7':
        //         $(emoji).attr("7x6").removeClass('to_be_selected');
        //         $(emoji).attr("6x7").removeClass('to_be_selected');
        //         break;
        //
        //
        //
        //     case '6x0':
        //         $(emoji).attr("7x0").removeClass('to_be_selected');
        //         $(emoji).attr("6x1").removeClass('to_be_selected');
        //         $(emoji).attr("5x0").removeClass('to_be_selected');
        //         break;
        //     case '6x1':
        //         $(emoji).attr("7x1").removeClass('to_be_selected');
        //         $(emoji).attr("6x0").removeClass('to_be_selected');
        //         $(emoji).attr("6x2").removeClass('to_be_selected');
        //         $(emoji).attr("5x1").removeClass('to_be_selected');
        //         break;
        //     case '6x2':
        //         $(emoji).attr("7x2").removeClass('to_be_selected');
        //         $(emoji).attr("6x1").removeClass('to_be_selected');
        //         $(emoji).attr("6x3").removeClass('to_be_selected');
        //         $(emoji).attr("5x2").removeClass('to_be_selected');
        //         break;
        //     case '6x3':
        //         $(emoji).attr("7x3").removeClass('to_be_selected');
        //         $(emoji).attr("6x2").removeClass('to_be_selected');
        //         $(emoji).attr("6x4").removeClass('to_be_selected');
        //         $(emoji).attr("5x3").removeClass('to_be_selected');
        //         break;
        //     case '6x4':
        //         $(emoji).attr("7x4").removeClass('to_be_selected');
        //         $(emoji).attr("6x3").removeClass('to_be_selected');
        //         $(emoji).attr("6x5").removeClass('to_be_selected');
        //         $(emoji).attr("5x4").removeClass('to_be_selected');
        //         break;
        //     case '6x5':
        //         $(emoji).attr("7x5").removeClass('to_be_selected');
        //         $(emoji).attr("6x4").removeClass('to_be_selected');
        //         $(emoji).attr("6x6").removeClass('to_be_selected');
        //         $(emoji).attr("5x5").removeClass('to_be_selected');
        //         break;
        //     case '6x6':
        //         $(emoji).attr("7x6").removeClass('to_be_selected');
        //         $(emoji).attr("6x5").removeClass('to_be_selected');
        //         $(emoji).attr("6x7").removeClass('to_be_selected');
        //         $(emoji).attr("5x6").removeClass('to_be_selected');
        //         break;
        //     case '6x7':
        //         $(emoji).attr("7x7").removeClass('to_be_selected');
        //         $(emoji).attr("6x6").removeClass('to_be_selected');
        //         $(emoji).attr("5x7").removeClass('to_be_selected');
        //         break;
        //
        //
        //     case '5x0':
        //         $(emoji).attr("4x0").removeClass('to_be_selected');
        //         $(emoji).attr("5x1").removeClass('to_be_selected');
        //         $(emoji).attr("6x0").removeClass('to_be_selected');
        //         break;
        //     case '5x1':
        //         $(emoji).attr("6x1").removeClass('to_be_selected');
        //         $(emoji).attr("5x0").removeClass('to_be_selected');
        //         $(emoji).attr("5x2").removeClass('to_be_selected');
        //         $(emoji).attr("4x1").removeClass('to_be_selected');
        //         break;
        //     case '5x2':
        //         $(emoji).attr("6x2").removeClass('to_be_selected');
        //         $(emoji).attr("5x1").removeClass('to_be_selected');
        //         $(emoji).attr("5x3").removeClass('to_be_selected');
        //         $(emoji).attr("4x2").removeClass('to_be_selected');
        //         break;
        //     case '5x3':
        //         $(emoji).attr("6x3").removeClass('to_be_selected');
        //         $(emoji).attr("5x2").removeClass('to_be_selected');
        //         $(emoji).attr("5x4").removeClass('to_be_selected');
        //         $(emoji).attr("4x3").removeClass('to_be_selected');
        //         break;
        //     case '5x4':
        //         $(emoji).attr("6x4").removeClass('to_be_selected');
        //         $(emoji).attr("5x3").removeClass('to_be_selected');
        //         $(emoji).attr("5x5").removeClass('to_be_selected');
        //         $(emoji).attr("4x4").removeClass('to_be_selected');
        //         break;
        //     case '5x5':
        //         $(emoji).attr("6x5").removeClass('to_be_selected');
        //         $(emoji).attr("5x4").removeClass('to_be_selected');
        //         $(emoji).attr("5x6").removeClass('to_be_selected');
        //         $(emoji).attr("4x5").removeClass('to_be_selected');
        //         break;
        //     case '5x6':
        //         $(emoji).attr("6x6").removeClass('to_be_selected');
        //         $(emoji).attr("5x5").removeClass('to_be_selected');
        //         $(emoji).attr("5x7").removeClass('to_be_selected');
        //         $(emoji).attr("4x6").removeClass('to_be_selected');
        //         break;
        //     case '5x7':
        //         $(emoji).attr("6x7").removeClass('to_be_selected');
        //         $(emoji).attr("5x6").removeClass('to_be_selected');
        //         $(emoji).attr("4x7").removeClass('to_be_selected');
        //         break;
        //
        //
        //
        //
        //
        //     case '4x0':
        //         $(emoji).attr("5x0").addClass('to_be_selected');
        //         $(emoji).attr("4x1").addClass('to_be_selected');
        //         $(emoji).attr("3x0").addClass('to_be_selected');
        //         break;
        //     case '4x1':
        //         $(emoji).attr("5x1").addClass('to_be_selected');
        //         $(emoji).attr("4x0").addClass('to_be_selected');
        //         $(emoji).attr("4x2").addClass('to_be_selected');
        //         $(emoji).attr("3x1").addClass('to_be_selected');
        //         break;
        //     case '4x2':
        //         $(emoji).attr("5x2").addClass('to_be_selected');
        //         $(emoji).attr("4x1").addClass('to_be_selected');
        //         $(emoji).attr("4x3").addClass('to_be_selected');
        //         $(emoji).attr("3x2").addClass('to_be_selected');
        //         break;
        //     case '4x3':
        //         $(emoji).attr("5x3").addClass('to_be_selected');
        //         $(emoji).attr("4x2").addClass('to_be_selected');
        //         $(emoji).attr("4x4").addClass('to_be_selected');
        //         $(emoji).attr("3x3").addClass('to_be_selected');
        //         break;
        //     case '4x4':
        //         $(emoji).attr("5x4").addClass('to_be_selected');
        //         $(emoji).attr("4x3").addClass('to_be_selected');
        //         $(emoji).attr("4x5").addClass('to_be_selected');
        //         $(emoji).attr("3x4").addClass('to_be_selected');
        //         break;
        //     case '4x5':
        //         $(emoji).attr("5x5").addClass('to_be_selected');
        //         $(emoji).attr("4x4").addClass('to_be_selected');
        //         $(emoji).attr("4x6").addClass('to_be_selected');
        //         $(emoji).attr("3x5").addClass('to_be_selected');
        //         break;
        //     case '4x6':
        //         $(emoji).attr("5x6").addClass('to_be_selected');
        //         $(emoji).attr("4x5").addClass('to_be_selected');
        //         $(emoji).attr("4x7").addClass('to_be_selected');
        //         $(emoji).attr("3x6").addClass('to_be_selected');
        //         break;
        //     case '4x7':
        //         $(emoji).attr("7x7").addClass('to_be_selected');
        //         $(emoji).attr("4x6").addClass('to_be_selected');
        //         $(emoji).attr("5x7").addClass('to_be_selected');
        //         break;
        //
        //
        //
        //
        //     case '3x0':
        //         $(emoji).attr("4x0").addClass('to_be_selected');
        //         $(emoji).attr("3x1").addClass('to_be_selected');
        //         $(emoji).attr("2x0").addClass('to_be_selected');
        //         break;
        //     case '3x1':
        //         $(emoji).attr("4x1").addClass('to_be_selected');
        //         $(emoji).attr("3x0").addClass('to_be_selected');
        //         $(emoji).attr("3x2").addClass('to_be_selected');
        //         $(emoji).attr("2x1").addClass('to_be_selected');
        //         break;
        //     case '3x2':
        //         $(emoji).attr("4x2").addClass('to_be_selected');
        //         $(emoji).attr("3x1").addClass('to_be_selected');
        //         $(emoji).attr("3x3").addClass('to_be_selected');
        //         $(emoji).attr("2x2").addClass('to_be_selected');
        //         break;
        //     case '3x3':
        //         $(emoji).attr("4x3").addClass('to_be_selected');
        //         $(emoji).attr("3x2").addClass('to_be_selected');
        //         $(emoji).attr("3x4").addClass('to_be_selected');
        //         $(emoji).attr("2x3").addClass('to_be_selected');
        //         break;
        //     case '3x4':
        //         $(emoji).attr("4x4").addClass('to_be_selected');
        //         $(emoji).attr("3x3").addClass('to_be_selected');
        //         $(emoji).attr("3x5").addClass('to_be_selected');
        //         $(emoji).attr("2x4").addClass('to_be_selected');
        //         break;
        //     case '3x5':
        //         $(emoji).attr("4x5").addClass('to_be_selected');
        //         $(emoji).attr("3x4").addClass('to_be_selected');
        //         $(emoji).attr("3x6").addClass('to_be_selected');
        //         $(emoji).attr("2x5").addClass('to_be_selected');
        //         break;
        //     case '3x6':
        //         $(emoji).attr("4x6").addClass('to_be_selected');
        //         $(emoji).attr("3x5").addClass('to_be_selected');
        //         $(emoji).attr("3x7").addClass('to_be_selected');
        //         $(emoji).attr("2x6").addClass('to_be_selected');
        //         break;
        //     case '3x7':
        //         $(emoji).attr("4x7").addClass('to_be_selected');
        //         $(emoji).attr("3x6").addClass('to_be_selected');
        //         $(emoji).attr("2x7").addClass('to_be_selected');
        //         break;
        //
        //
        //
        //
        //     case '2x0':
        //         $(emoji).attr("3x0").addClass('to_be_selected');
        //         $(emoji).attr("2x1").addClass('to_be_selected');
        //         $(emoji).attr("1x0").addClass('to_be_selected');
        //         break;
        //     case '2x1':
        //         $(emoji).attr("3x1").addClass('to_be_selected');
        //         $(emoji).attr("2x0").addClass('to_be_selected');
        //         $(emoji).attr("2x2").addClass('to_be_selected');
        //         $(emoji).attr("1x1").addClass('to_be_selected');
        //         break;
        //     case '2x2':
        //         $(emoji).attr("3x2").addClass('to_be_selected');
        //         $(emoji).attr("2x1").addClass('to_be_selected');
        //         $(emoji).attr("2x3").addClass('to_be_selected');
        //         $(emoji).attr("1x2").addClass('to_be_selected');
        //         break;
        //     case '2x3':
        //         $(emoji).attr("3x3").addClass('to_be_selected');
        //         $(emoji).attr("2x2").addClass('to_be_selected');
        //         $(emoji).attr("2x4").addClass('to_be_selected');
        //         $(emoji).attr("1x3").addClass('to_be_selected');
        //         break;
        //     case '2x4':
        //         $(emoji).attr("3x4").addClass('to_be_selected');
        //         $(emoji).attr("2x3").addClass('to_be_selected');
        //         $(emoji).attr("2x5").addClass('to_be_selected');
        //         $(emoji).attr("1x4").addClass('to_be_selected');
        //         break;
        //     case '2x5':
        //         $(emoji).attr("3x5").addClass('to_be_selected');
        //         $(emoji).attr("2x4").addClass('to_be_selected');
        //         $(emoji).attr("2x6").addClass('to_be_selected');
        //         $(emoji).attr("1x5").addClass('to_be_selected');
        //         break;
        //     case '2x6':
        //         $(emoji).attr("3x6").addClass('to_be_selected');
        //         $(emoji).attr("2x5").addClass('to_be_selected');
        //         $(emoji).attr("2x7").addClass('to_be_selected');
        //         $(emoji).attr("1x6").addClass('to_be_selected');
        //         break;
        //     case '2x7':
        //         $(emoji).attr("3x7").addClass('to_be_selected');
        //         $(emoji).attr("2x6").addClass('to_be_selected');
        //         $(emoji).attr("1x7").addClass('to_be_selected');
        //         break;
        //
        //
        //
        //
        //     case '1x0':
        //         $(emoji).attr("2x0").addClass('to_be_selected');
        //         $(emoji).attr("1x1").addClass('to_be_selected');
        //         $(emoji).attr("0x0").addClass('to_be_selected');
        //         break;
        //     case '1x1':
        //         $(emoji).attr("2x1").addClass('to_be_selected');
        //         $(emoji).attr("1x0").addClass('to_be_selected');
        //         $(emoji).attr("1x2").addClass('to_be_selected');
        //         $(emoji).attr("0x1").addClass('to_be_selected');
        //         break;
        //     case '1x2':
        //         $(emoji).attr("2x2").addClass('to_be_selected');
        //         $(emoji).attr("1x1").addClass('to_be_selected');
        //         $(emoji).attr("1x3").addClass('to_be_selected');
        //         $(emoji).attr("0x2").addClass('to_be_selected');
        //         break;
        //     case '1x3':
        //         $(emoji).attr("2x3").addClass('to_be_selected');
        //         $(emoji).attr("1x2").addClass('to_be_selected');
        //         $(emoji).attr("1x4").addClass('to_be_selected');
        //         $(emoji).attr("0x3").addClass('to_be_selected');
        //         break;
        //     case '1x4':
        //         $(emoji).attr("2x4").addClass('to_be_selected');
        //         $(emoji).attr("1x3").addClass('to_be_selected');
        //         $(emoji).attr("1x5").addClass('to_be_selected');
        //         $(emoji).attr("0x4").addClass('to_be_selected');
        //         break;
        //     case '1x5':
        //         $(emoji).attr("2x5").addClass('to_be_selected');
        //         $(emoji).attr("1x4").addClass('to_be_selected');
        //         $(emoji).attr("1x6").addClass('to_be_selected');
        //         $(emoji).attr("0x5").addClass('to_be_selected');
        //         break;
        //     case '1x6':
        //         $(emoji).attr("2x6").addClass('to_be_selected');
        //         $(emoji).attr("1x5").addClass('to_be_selected');
        //         $(emoji).attr("1x7").addClass('to_be_selected');
        //         $(emoji).attr("0x6").addClass('to_be_selected');
        //         break;
        //     case '1x7':
        //         $(emoji).attr("2x7").addClass('to_be_selected');
        //         $(emoji).attr("1x6").addClass('to_be_selected');
        //         $(emoji).attr("0x7").addClass('to_be_selected');
        //         break;
        //
        //
        //     case '0x0':
        //         $(emoji).attr("0x1").addClass('to_be_selected');
        //         $(emoji).attr("1x0").addClass('to_be_selected');
        //         break;
        //     case '0x1':
        //         $(emoji).attr("0x0").addClass('to_be_selected');
        //         $(emoji).attr("0x2").addClass('to_be_selected');
        //         $(emoji).attr("1x1").addClass('to_be_selected');
        //         break;
        //     case '0x2':
        //         $(emoji).attr("0x1").addClass('to_be_selected');
        //         $(emoji).attr("0x3").addClass('to_be_selected');
        //         $(emoji).attr("1x2").addClass('to_be_selected');
        //         break;
        //     case '0x3':
        //         $(emoji).attr("0x2").addClass('to_be_selected');
        //         $(emoji).attr("0x4").addClass('to_be_selected');
        //         $(emoji).attr("1x3").addClass('to_be_selected');
        //         break;
        //     case '0x4':
        //         $(emoji).attr("0x3").addClass('to_be_selected');
        //         $(emoji).attr("0x5").addClass('to_be_selected');
        //         $(emoji).attr("1x4").addClass('to_be_selected');
        //         break;
        //     case '0x5':
        //         $(emoji).attr("0x4").addClass('to_be_selected');
        //         $(emoji).attr("0x6").addClass('to_be_selected');
        //         $(emoji).attr("1x5").addClass('to_be_selected');
        //         break;
        //     case '0x6':
        //         $(emoji).attr("0x5").addClass('to_be_selected');
        //         $(emoji).attr("0x7").addClass('to_be_selected');
        //         $(emoji).attr("1x6").addClass('to_be_selected');
        //         break;
        //     case '0x7':
        //         $(emoji).attr("0x6").addClass('to_be_selected');
        //         $(emoji).attr("1x7").addClass('to_be_selected');
        //         break;


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
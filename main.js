/**
 * Created by sorenbaird on 8/9/17.
 */

var game = {
    //METHOD FOR SETTING UP THE GAME UPON LOAD
    init: function() {
        //Will map out the Emoji objects onto the map
        game.clickHandler() //Initializes the clickHandler on game start.
    },
    emojiArray: [], //This will hold all of the different types of Emoji's
    specialEmojiArray:[],
    //DESIGN SYNCH UP REQUIRED - Make sure the image names and the names in the Emoji Array are the same
    generateEmoji: function(name) {
        var generatedEmoji = new Emoji(name); //Creates a new Emoji Object
        return generatedEmoji;  //Returns the newly created Emoji Object
    },
    generateRandomEmoji: function() {
        var randomNumber = Math.floor(Math.random() * emojiArray.length); //Randomly selects an Emoji from the Emoji Array
        generateEmoji(emojiArray[randomNumber]); //Calls the generateEmoji Method, passing in the randomly selected Emoji
    },
    gameMap: [], //This will be a multi-dimensional array (8x8) to hold the Emoji objects.
    //DESIGN SYNCH UP REQUIRED - Make sure the Object positions and the DIV class names synch up.


    //VARIABLES AND METHODS FOR HANDLING EMOJI CLICKS
    firstEmojiSelected: null, //A Boolean to track whether a click is the 1st or 2nd Emoji selected
    clickHandler: function() {
        $('.gameBoard').on('click', 'emoji', function() {
            emojiSelector(); //A click handler that will call the emojiSelection Method on click
        })
    },
    emojiSelector: function() {
        //Checks to see if this is the first or second emoji clicked
        if (firstEmojiSelected === null) {
            game.firstSelection(); //If there is already a first selection, launch the secondSelection Method
        } else if ( ) { //check if second Emoji is a valid selection
            game.secondSelection(); //Otherwise, launch the firstSelection Method
        }
    },
    firstSelection: function() {
        //Do Stuff
        //1. Highlight the selected Emoji on the DOM in some way
        //2. Highlight all of the adjacent Emojis on the Dom in another way
        game.firstEmojiSelected = this; //Mark that a first emoji has been selected
    },
    secondSelection: function() {
        //Swap the two emojis on the DOM and in the array
        checkForMatches(); //Check to see if a match was made.
        //If no check was made, swap the two Emojis back.
        game.firstEmojiSelected = null; //Re-Initialize the firstSelection boolean
    },
    checkForMatches: function() {
        //Check to see if there are any matches
        destroyMatched() // If matches were made, execute the destroyMatched() Method
    },
    destroyMatched: function() {
        //destroy all of the matching Emojis
        game.collapse(); //After the Emojis are destroyed, call the collapse function
    },
    collapse: function() {
        //Shift down all of the Emojis above the collapsed space
        game.generateRandomEmoji()  //Call the Method to create a random Emoji to fill in the newly created space
        game.checkForMatches() //Call the checkForMatches Method to see if any new matches were made
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
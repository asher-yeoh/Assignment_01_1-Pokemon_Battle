import { question } from 'readline-sync'

//Function to display Tic Tac Toe UI.
function displayUI(array) {
    console.log("\n[" + array[0] + "] " + "[" + array[1] + "] " + "[" + array[2] + "]")
    console.log("[" + array[3] + "] " + "[" + array[4] + "] " + "[" + array[5] + "]")
    console.log("[" + array[6] + "] " + "[" + array[7] + "] " + "[" + array[8] + "]\n")
}

//Function to check on matching flags.
function matchingFlags(array){
    if (
        //Horizontal matching flags.
        (array[0] === array[1] && array[1] === array[2]) || (array[3] === array[4] && array[4] === array[5]) || (array[6] === array[7] && array[7] === array[8]) ||
        //Vertical matching flags
        (array[0] === array[3] && array[3] === array[6]) || (array[1] === array[4] && array[4] === array[7]) || (array[2] === array[5] && array[5] === array[8]) ||
        //Diagonal matching flags.
        (array[0] === array[4] && array[4] === array[8]) || (array[2] === array[4] && array[4] === array[6])
        ){
        //End the game if there is a winner.
        let game = false
        return {game}
    }

    else {
        return {game}
    }
}

//Define Tic Tac Toe UI positions.
const ticTacToe = ["0","1","2","3","4","5","6","7","8"]

//Initialize players' flag symbols.
const player1Flag = "X"
const player2Flag = "O"

//Initialize variables.
let isMyTurn = true
let game = true
let counter = 1

console.log("----------------------------------------------")

//Input Player1's and Player2's name.
let player1Name = question("Please enter Player1's name:\n")
let player2Name = question("\nPlease enter Player2's name:\n")

while (counter < 10) {
    //Change turn after each run of the while loop.
    let playerName = isMyTurn ? player1Name : player2Name
    let flag = isMyTurn ? player1Flag : player2Flag

    //Display round counter.
    console.log("----------------------------------------------")
    console.log("Round: " + counter)

    //Display Tic Tac Toe UI before player insert flag.
    displayUI(ticTacToe)

    if (isMyTurn) {
        //Player1's turn to place X flag.
        console.log("It is " + playerName + "'s turn.")
        let position = question('\nSelect a number position to place X flag: ')

        //Insert X flag into the number position.
        ticTacToe[position] = flag

        //Run the function to check on matching flags.
        let {game} = matchingFlags(ticTacToe)

        //Display Tic Tac Toe UI after player insert flag.
        displayUI(ticTacToe)
     
        //Break while loop if Player1 wins.
        if (game == false) {
            console.log(playerName + " wins this game!\n")
            console.log("----------------------------------------------")
            break
        }
    }

    else {
        //Player2's turn to place O flag.
        console.log("It is " + playerName + "'s turn.")
        let position = question('\nSelect a number position to place O flag: ')

        //Insert O flag into the number position.
        ticTacToe[position] = flag

        //Run the function to check on matching flags.
        let {game} = matchingFlags(ticTacToe)

        //Display Tic Tac Toe UI after player insert flag.
        displayUI(ticTacToe)
        
        //Break while loop if Player2 wins.
        if (game == false) {
            console.log(playerName + " wins this game!\n")
            console.log("----------------------------------------------")
            break
        }
    }

    //If after 9 rounds still no winner then it is a draw.
    if (counter == 9){
        console.log("This game is a draw.\n")
        console.log("----------------------------------------------")
    }

    isMyTurn = !isMyTurn
    counter += 1
}

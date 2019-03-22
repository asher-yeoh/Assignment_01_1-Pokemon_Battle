import { question } from 'readline-sync'

function displayOptions(array) {
    console.log("-------------------------------------------------------------------------------------------------")
    let i = 0
    while (i < 3) {
        console.log("[" + i + "] " + array[i].name + " - " + array[i].damage + " damage.")
        i += 1 
    }
console.log("-------------------------------------------------------------------------------------------------")
}


// const myPokemon = "Charmander"
// const myOpponent = "Pidgey"

const myPokemon = [
    {
        name: "Charmander",
        hp: 160,
    },
    {
        name: "Squirtle",
        hp: 185,
    },
]

const myOpponent = [
    {
        name: "Pidgey",
        hp: 100,
    },
]

const attOptions = [
    {
        name: "Shadow Ball",
        damage: 10,
        def: 3
    },
    {
        name: "Tackle",
        damage: 5,
        def: 1
    },
    {
        name: "Ember",
        damage: 8,
        def: 2
    },
    {
        name: "Tail Whip",
        damage: 15,
        def: 4
    },
    {
        name: "Harden",
        damage: 20,
        def: 5
    },
]

let myHP = myPokemon[0].hp 
let oppHP = myOpponent[0].hp 

// To get random damage
//const damage = Math.floor(Math.random() * 10)

// const myDamage = 30
// const oppDamage = 50

const exp = 50

let isMyTurn = true


console.log("-------------------------------------------------------------------------------------------------")
// 1. You have encounter your opponent Mr Mine.
console.log("You have encountered a wild " + myOpponent[0].name + ".")

// // 2. Choose your pokemon
// displayOptions(moveOptions)
// let ansMove = question('Select a move:\n')


console.log("You have summoned " + myPokemon[0].name + ".")
// TODO: 3. You can choose one of Gengar's skills
// how much HP each pokemon has
console.log(myPokemon[0].name + " has " + myPokemon[0].hp + " HP.")
console.log(myOpponent[0].name + " has " + myOpponent[0].hp + " HP.")


while (myHP > 0 && oppHP > 0) {
    console.log("-------------------------------------------------------------------------------------------------")

    let attackerName = isMyTurn ? myPokemon[0].name : myOpponent[0].name
    let defenderName = isMyTurn ? myOpponent[0].name : myPokemon[0].name

    //variable will reset whenever the loop runs
    //let attackerHP = isMyTurn ? myHP : oppHP
    let defenderHP = isMyTurn ? oppHP : myHP

    //Display defender's HP
    console.log(defenderName + "'s HP is " + defenderHP + ".")

    
    if (isMyTurn) {

        //Choose movement
        displayOptions(attOptions)
        let ansMove = question('Select a move:\n')

        //Pokemon attacks.
        console.log(attackerName + " uses " + attOptions[ansMove].name + " to hit.")

        console.log(attOptions[ansMove].name + " hits for " + attOptions[ansMove].damage + " damage.")

        let totalDamage = attOptions[ansMove].damage - attOptions[ansMove].def

        oppHP = oppHP - totalDamage

        console.log("DEF point is " + attOptions[ansMove].def + " for " + attOptions[ansMove].name +  ". Total damage is " + totalDamage)
      

        if (oppHP < 0) {
            oppHP = 0
        }

        console.log(defenderName + "'s HP is reduced to " + oppHP + ".")
    }

    else {

        //Opponent attacks.
        console.log(attackerName + " uses " + attOptions[1].name + " to hit.")

        console.log(attOptions[1].name + " hits for " + attOptions[1].damage + " damage.")

        
        let totalDamage = attOptions[1].damage - attOptions[1].def

        myHP = myHP - totalDamage

        console.log("DEF point is " + attOptions[1].def + " for " + attOptions[1].name + ". Total damage is " + totalDamage)

        if (myHP < 0) {
            myHP = 0
        }

        console.log(defenderName + "'s HP is reduced to " + myHP + ".")
    }

    isMyTurn = !isMyTurn
}


// 4. Enemy fainted because health reduced to 0/
// 5. You have earned experience points.
if (oppHP <= 0) {
    console.log("-------------------------------------------------------------------------------------------------")
    console.log(myOpponent[0].name + "'s HP is 0 and fainted.")
    console.log(myPokemon[0].name + " has gained "+ exp + " EXP.")
    console.log("-------------------------------------------------------------------------------------------------")
}

if (myHP <= 0) {
    console.log("-------------------------------------------------------------------------------------------------")
    console.log(myPokemon[0].name + "'s HP is 0 and fainted.")
    console.log("GAME OVER")
    console.log("-------------------------------------------------------------------------------------------------")
}



//console.log(myPokemon + " has gained "+ exp + " EXP.")
// TODO: 6. if your pokemon levels up, might learn new skills.

import { question } from 'readline-sync'

function displaypokemons(array) {
    let i = 0
    while (i < pokemons.length) {
        console.log("[" + i + "] " + array[i].name + " - HP: " + array[i].hp)
        i += 1 
    }
}

function displayAttOptions(array) {
    let i = 0
    while (i < attOptions.length) {
        console.log("[" + i + "] " + array[i].move + " - Damage: " + array[i].damage + " - DEF: " + array[i].def + " - Effect: " + array[i].effect)
        i += 1 
    }
console.log("-------------------------------------------------------------------------------------------------")
}

// function totalDamageCal(array, move) {

//     if (array[move].effect = "Poison"){

//         //let hp = hp - (hp * 0.1)
//         console.log("Current effect: " + array[move].effect + "\n")

//         let damageHP = 0.1
//         let counterPoison = 5
//         console.log("Current damageHP: " + damageHP + "\n")
//         console.log("counterPoison: " + counterPoison + "\n")
//         return {counterPoison, damageHP}
//     }
//     else {
//         console.log("Current damageHP: " + damageHP + "\n")
//         console.log("counterPoison: " + counterPoison + "\n")
//         return {counterPoison, damageHP}
    
//     }
        
// }

const pokemons = [
    {
        name: "Pidgey",
        hp: 60,
    },
    {
        name: "Gengar",
        hp: 75,
    },
    {
        name: "Charmander",
        hp: 95,
    },
    {
        name: "Squirtle",
        hp: 85,
    },
    {
        name: "Meloetta",
        hp: 65,
    },
]

const attOptions = [
    {
        move: "Shadow Ball",
        damage: 10,
        def: 3,
        effect:"none",
    },
    {
        move: "Tackle",
        damage: 15,
        def: 4,
        effect:"none",
    },
    {
        move: "Ember",
        damage: 8,
        def: 2,
        effect:"none",
    },
    {
        move: "Tail Whip",
        damage: 4,
        def: 1,
        effect:"none",
    },
    {
        move: "Harden",
        damage: 20,
        def: 5,
        effect:"none",
    },
    {
        move: "Smog",
        damage: 10,
        def: 6,
        effect: "Poison",
    },
    {
        move: "Relic Song",
        damage: 10,
        def: 6,
        effect: "Sleep",
    },  
]

//Declare EXP points.
const exp = 50

//Initialize isMyTurn = true
let isMyTurn = true

// //Initialize counterPoison
// let counterPoison = 0
// let damageHP = 0

//To get random damage
//const damage = Math.floor(Math.random() * 10)

//Initialize sleep effect.
let oppSleep = false          
let counterSleep = 0

console.log("-------------------------------------------------------------------------------------------------")

//Declare opponent's Pokemon name & HP.
let oppPokemon = pokemons[0].name
let oppHP = pokemons[0].hp 

//Display opponent's name.
console.log("You have encountered a wild " + oppPokemon + ".\n")

//Choose a pokemon to summon.
displaypokemons(pokemons)
let ansPokemon = question('\nSelect a Pokemon to summon: ')

//Declare player's Pokemon's name & HP.
let myPokemon = pokemons[ansPokemon].name
let myHP = pokemons[ansPokemon].hp

console.log("You have summoned " + myPokemon + ".")

//Display both Pokemon's and opponent's HP.
console.log(myPokemon + " has " + myHP + " HP.")
console.log(oppPokemon + " has " + oppHP + " HP.")

console.log("-------------------------------------------------------------------------------------------------")

while (myHP > 0 && oppHP > 0) {

    //Change turn after each run of the while loop.
    let attackerName = isMyTurn ? myPokemon :oppPokemon
    let defenderName = isMyTurn ? oppPokemon : myPokemon

    //Variable will reset each time the while loop runs.
    let defenderHP = isMyTurn ? oppHP : myHP

    //Display attacker's turn.
    console.log("It is " + attackerName + "'s turn.")
    //Display defender's current HP.
    console.log(defenderName + "'s current HP is " + defenderHP + ".\n")

    // if (counterPoison != 0){
    //     //Display how many times left for Poison effect.
    //     console.log("Poison effect left for: " + counterPoison + " turn(s).\n")

    //     defenderHP = defenderHP - (defenderHP * damageHP)
        
    //     //Display current HP after effect
    //     console.log("Current HP after Poison effect " + defenderHP + "\n")

    //     counterPoison -= 1

    //     //
    //     console.log("Poison effect left for next round: " + counterPoison + " turn(s).\n")
    // }
    
    if (isMyTurn) {
  
        //Choose movement
        displayAttOptions(attOptions)
        let ansMove = question('Select a move to attack: ')

        //Pokemon attacks.
        console.log(attackerName + " uses " + attOptions[ansMove].move + " to hit.\n")

        //Call function if there is effect.
        //let {counterPoison, damageHP} = totalDamageCal(attOptions, ansMove)
        
        //Check if sleep effect is enabled.
        if (attOptions[ansMove].effect == "Sleep"){
             oppSleep = true            
             counterSleep = 5

             console.log("Sleep effect is cast to " + defenderName + ".\n")
            //  console.log("oppSleep: " + oppSleep)
            //  console.log("counterSleep: " + counterSleep)
        }

        console.log(attOptions[ansMove].move + " hits for " + attOptions[ansMove].damage + " damage.")
             
        let totalDamage = attOptions[ansMove].damage - attOptions[ansMove].def

        oppHP = oppHP - totalDamage

        console.log("DEF point is " + attOptions[ansMove].def + " for " + attOptions[ansMove].move +  ". Total damage is " + totalDamage)
      

        if (oppHP < 0) {
            oppHP = 0
        }

        console.log(defenderName + "'s HP is reduced to " + oppHP + ".")
    }

    else {

        // console.log("CP1 - oppSleep: " + oppSleep)
        // console.log("CP1 - counterSleep: " + counterSleep)

        if (oppSleep){

            console.log(defenderName + " is under Sleep effect hence unable to attack.")
            counterSleep -= 1
            console.log("Sleep effect counter stil left: " + counterSleep + " times.\n")

            if (counterSleep == 0){
                oppSleep = !oppSleep
            }

        }

        else {
            //Opponent attacks.
            console.log(attackerName + " uses " + attOptions[1].move + " to hit.")

            console.log(attOptions[1].move + " hits for " + attOptions[1].damage + " damage.")

            
            let totalDamage = attOptions[1].damage - attOptions[1].def

            myHP = myHP - totalDamage

            console.log("DEF point is " + attOptions[1].def + " for " + attOptions[1].move + ". Total damage is " + totalDamage)

            if (myHP < 0) {
                myHP = 0
            }

            console.log(defenderName + "'s HP is reduced to " + myHP + ".")
        }
    }

    // console.log("CP2 - oppSleep: " + oppSleep)
    // console.log("CP2 - counterSleep: " + counterSleep)

    isMyTurn = !isMyTurn

    // console.log("CP3 - oppSleep: " + oppSleep)
    // console.log("CP3 - counterSleep: " + counterSleep)
    console.log("-------------------------------------------------------------------------------------------------") 
}

//Opponent has fainted due to HP is reduced to 0.
//Player earned EXP points.
if (oppHP <= 0) {
    console.log("-------------------------------------------------------------------------------------------------")
    console.log(oppPokemon + "'s HP is now 0 and fainted.")
    console.log(myPokemon + " has gained "+ exp + " EXP.")
    console.log("-------------------------------------------------------------------------------------------------")
}

//Player's Pokemon has fainted due to HP is reduced to 0.
//GAME OVER.
if (myHP <= 0) {
    console.log("-------------------------------------------------------------------------------------------------")
    console.log(myPokemon + "'s HP is now 0 and fainted.")
    console.log("GAME OVER")
    console.log("-------------------------------------------------------------------------------------------------")
}

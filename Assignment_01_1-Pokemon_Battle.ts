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

const pokemons = [
    {
        name: "Pidgey",
        hp: 160,
    },
    {
        name: "Gengar",
        hp: 175,
    },
    {
        name: "Charmander",
        hp: 195,
    },
    {
        name: "Squirtle",
        hp: 185,
    },
    {
        name: "Meloetta",
        hp: 165,
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

//To get random damage.
//const damage = Math.floor(Math.random() * 10)

//Declare EXP points.
const exp = 50

//Initialize isMyTurn.
let isMyTurn = true

//Initialize Poison effect.
let oppPoison = false          
let counterPoison = 0

//Initialize Sleep effect.
let oppSleep = false          
let counterSleep = 0

console.log("-------------------------------------------------------------------------------------------------")

//Declare opponent's Pokemon name & HP.
let oppPokemon = pokemons[0].name
let oppHP = pokemons[0].hp 

//Display opponent's name.
console.log("You have encountered a wild " + oppPokemon + ".\n")

//Select a pokemon to summon.
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
    let attackerHP = isMyTurn ? myHP : oppHP
    let defenderHP = isMyTurn ? oppHP : myHP

    //Display attacker's turn.
    console.log("It is " + attackerName + "'s turn.")
    //Display defender's current HP.
    console.log(defenderName + "'s current HP is " + defenderHP + ".\n")

    //Player's turn.
    if (isMyTurn) {
  
        //Choose movement
        displayAttOptions(attOptions)
        let ansMove = question('Select a move to attack: ')

        //Pokemon attacks.
        console.log("\n" + attackerName + " uses " + attOptions[ansMove].move + " to hit.")
        console.log(attOptions[ansMove].move + " hits for " + attOptions[ansMove].damage + " damage.")
             
        let totalDamage = attOptions[ansMove].damage - attOptions[ansMove].def

        defenderHP = defenderHP - totalDamage

        console.log("DEF point is " + attOptions[ansMove].def + " for " + attOptions[ansMove].move +  ". Total damage is " + totalDamage + ".")
      
        if (defenderHP < 0) {
            defenderHP = 0
        }

        console.log("\n" + defenderName + "'s HP is reduced to " + defenderHP + ".")

        myHP = attackerHP
        oppHP = defenderHP

        //Check if Poison effect is enabled.
        if (attOptions[ansMove].effect == "Poison"){
            oppPoison = true            
            counterPoison = 5
        
            console.log("\nPoison effect is cast to " + defenderName + ".\n")
        }
        //Check if Sleep effect is enabled.
        if (attOptions[ansMove].effect == "Sleep"){
            oppSleep = true            
            counterSleep = 5
        
            console.log("\nSleep effect is cast to " + defenderName + ".\n")
        }
    }

    //Opponent's turn.
    else {
        if(oppPoison){
            console.log(attackerName + " is under Poison effect hence 10% of current HP will be damaged.")

            //Display attacker's current HP.
            console.log(attackerName + "'s current HP is " + attackerHP + ".")

            //Round up to 0 decimal.
            let poisonDamage = Math.ceil(attackerHP * 0.1)

            console.log("Total damage from Poison effect is " + poisonDamage + ".")

            attackerHP = attackerHP - poisonDamage

            console.log(attackerName + "'s HP is reduced to " + attackerHP + ".")

            counterPoison -= 1
            console.log("Poison effect counter still left: " + counterPoison + " times.\n")

            if (counterPoison == 0){
                oppPoison = !oppPoison
            }
        }

        if (oppSleep){

            console.log(attackerName + " is under Sleep effect hence unable to attack.")
            counterSleep -= 1
            console.log("Sleep effect counter still left: " + counterSleep + " times.\n")

            if (counterSleep == 0){
                oppSleep = !oppSleep
            }

        }

        else {
            //Opponent attacks.
            console.log(attackerName + " uses " + attOptions[1].move + " to hit.")

            console.log(attOptions[1].move + " hits for " + attOptions[1].damage + " damage.")

            let totalDamage = attOptions[1].damage - attOptions[1].def

            defenderHP = defenderHP - totalDamage

            console.log("DEF point is " + attOptions[1].def + " for " + attOptions[1].move + ". Total damage is " + totalDamage + ".")

            if (defenderHP < 0) {
                defenderHP = 0
            }

            console.log("\n" + defenderName + "'s HP is reduced to " + defenderHP + ".")
        }

        oppHP = attackerHP
        myHP = defenderHP

    }

    isMyTurn = !isMyTurn

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

import { question } from 'readline-sync'

//Declare function to display Pokemon list.
function displaypokemons(array) {
    let i = 0
    while (i < pokemons.length) {
        console.log("[" + i + "] " + array[i].name + " - [HP: " + array[i].hp + "] - [Type: " + array[i].type + "] - [ATT: " + array[i].att + "] - [DEF: " + array[i].def + "]")
        i += 1 
    }
}

//Declare function to display move options.
function displayAttOptions(array) {
    let i = 0
    while (i < attOptions.length) {
        console.log("[" + i + "] " + array[i].move + " - [Type: " + array[i].type + "] - [Status Effect: " + array[i].status + "] - [Damage: " + array[i].damage + "]")
        i += 1 
    }
    console.log("-------------------------------------------------------------------------------------------------")
}

//Declare function for attacker to attack.
function attack(attackerName, defenderName, attackerATT, defenderDEF, move, moveDamage) {
    //Attacker attacks.
    console.log("\n" + attackerName + " uses " + move + " to hit.\n")
    console.log(move + " hits for " + moveDamage + " damage.")
    
    console.log(attackerName + "'s ATT value is " + attackerATT + ".")
    console.log(defenderName + "'s DEF value is " + defenderDEF + ".")

    let damage = (moveDamage + attackerATT) - defenderDEF

    return damage
}

//Declare function to calculate where water attacks will do 50% more damage if Rain Dance has been used by attacker during the battle.
function rainDance(defenderName, defenderRainDance, moveType, damage) {
    if (defenderRainDance === true && moveType == "Water"){
        let rainDanceDamage = Math.ceil(damage * 1.5)

        console.log("\nRain Dance has been used on " + defenderName +  " during the battle. Hence all water attacks will do 50% more damage.\n") 

        return rainDanceDamage
    }
    else {
        let rainDanceDamage = damage
        return rainDanceDamage
    }
}

//Declare function to calculate total damage according to effectiveness.
function effectiveness(damage, defenderName, move, defenderType, moveType, defenderRainDance) {
    if (
        (defenderType == "Fire" && moveType == "Grass") ||
        (defenderType == "Water" && moveType == "Fire") ||
        (defenderType == "Grass" && moveType == "Water") ||
        (defenderType == "Poison" && moveType == "Grass") ||
        (defenderType == "Psychic" && moveType == "Poison") ||
        (defenderType == "Ghost" && moveType == "Phychic")
        ) {
        let totalDamage = Math.ceil(damage / 2)

        console.log("\n" + defenderName + "'s elemental type is " + defenderType + ".")
        console.log(move + "'s elemental type is " + moveType)
        console.log(moveType + " elemental type is resistant to " + defenderType + " elemental type. Hence, halves the damage.")

        //Call out function to calculate where water attacks will do 50% more damage if Rain Dance has been used by attacker during the battle.
        totalDamage = rainDance(defenderName, defenderRainDance, moveType, totalDamage)

        return totalDamage
    }
    else if (
        (defenderType == "Grass" && moveType == "Fire") ||
        (defenderType == "Fire" && moveType == "Water") ||
        (defenderType == "Water" && moveType == "Grass") ||     
        (defenderType == "Grass" && moveType == "Poison") ||
        (defenderType == "Poison" && moveType == "Phychic") ||
        (defenderType == "Phychic" && moveType == "Ghost") ||
        (defenderType == "Ghost" && moveType == "Ghost")
        ) {
        let totalDamage = Math.ceil(damage * 2)

        console.log("\n" + defenderName + "'s elemental type is " + defenderType + ".")
        console.log(move + "'s elemental type is " + moveType)
        console.log(moveType + " elemental type is effective against " + defenderType + " elemental type. Hence, the damage is doubled.")   

        //Call out function to calculate where water attacks will do 50% more damage if Rain Dance has been used by attacker during the battle.
        totalDamage = rainDance(defenderName, defenderRainDance, moveType, totalDamage)

        return totalDamage
    }
    else {
        let totalDamage = damage

        console.log("\n" + defenderName + "'s elemental type is " + defenderType)
        console.log(move + "'s elemental type is " + moveType)
        console.log(moveType + " elemental type has no effect against " + defenderType + " elemental type. Hence, no changes on damage.")

        //Call out function to calculate where water attacks will do 50% more damage if Rain Dance has been used by attacker during the battle.
        totalDamage = rainDance(defenderName, defenderRainDance, moveType, totalDamage)

        return totalDamage
    }
}

//Declare function to display total damage.
function defenderDamage(defenderName, defenderHP, totalDamage) {
    defenderHP = defenderHP - totalDamage

    console.log("Total damage is " + totalDamage + ".")

    if (defenderHP < 0) {
        defenderHP = 0
    }

    console.log("\n" + defenderName + "'s HP is reduced to " + defenderHP + ".")
    
    return defenderHP
}

//Declare function to display that only one status effect can be casted to defender at a time.
function restrictStatus(defenderName, moveStatus, defenderStatusEffect, defenderCounterStatus) {
    if (moveStatus !== "None" && defenderCounterStatus !== 0) {
        console.log("\nUnable to cast " + moveStatus + " status effect to " + defenderName + " as " + defenderName + " is still under " + defenderStatusEffect + " status effect.\n")
    }
}

//Declare function to check if any status effect is casted to defender.
function checkStatusEffect(defenderName, moveStatus, defenderStatusEffect, defenderStatusFlag, defenderCounterStatus) {
    //Check if Poison status effect is casted to defender - will take effect for 5 turns.
    if (moveStatus == "Poison" && defenderStatusFlag === false) {
        let statusEffect = moveStatus
        let statusFlag = true            
        let counterStatus = 5

        console.log("\n" + moveStatus + " status effect is casted to " + defenderName + ".\n")

        return [statusEffect, statusFlag, counterStatus]
    }

    //Check if Sleep status effect is casted to defender - will take effect for 3 turns.
    else if (moveStatus == "Sleep" && defenderStatusFlag === false) {
        let statusEffect = moveStatus
        let statusFlag = true            
        let counterStatus = 3

        console.log("\n" + moveStatus + " status effect is casted to " + defenderName + ".\n")

        return [statusEffect, statusFlag, counterStatus]
    }

    //Check if Paralysis status effect is casted to defender - will take effect for 1 turn.
    else if (moveStatus == "Paralysis" && defenderStatusFlag === false) {
        let statusEffect = moveStatus
        let statusFlag = true            
        let counterStatus = 1

        console.log("\n" + moveStatus + " status effect is casted to " + defenderName + ".\n")

        return [statusEffect, statusFlag, counterStatus]
    }
    else {
        let statusEffect = defenderStatusEffect
        let statusFlag = defenderStatusFlag            
        let counterStatus = defenderCounterStatus

        return [statusEffect, statusFlag, counterStatus]
    }
}

//Declare function to check if attacker is in Poison status effect.
function statusPoison(attackerName, attackerHP, attackerStatusEffect, attackerStatusFlag, attackerCounterStatus) {

    //Display attacker is under Poison status effect.
    console.log(attackerName + " is under Poison status effect. Hence, 10% of current HP will be drained.")

    //Display attacker's current HP.
    console.log(attackerName + "'s current HP is " + attackerHP + ".")

    //Round up to 0 decimal.
    let poisonDamage = Math.ceil(attackerHP * 0.1)

    console.log("Total damage from " + attackerStatusEffect + " status effect is " + poisonDamage + ".")

    attackerHP = attackerHP - poisonDamage

    console.log(attackerName + "'s HP is reduced to " + attackerHP + ".")

    attackerCounterStatus -= 1
    
    console.log(attackerStatusEffect + " status counter still left: " + attackerCounterStatus + " turn(s).\n")

    if (attackerCounterStatus == 0) {
        attackerStatusFlag = !attackerStatusFlag
        attackerStatusEffect = "None"
    }
    return [attackerHP, attackerStatusEffect, attackerStatusFlag, attackerCounterStatus]
}

//Declare function to check if attacker is in Sleep status effect.
function statusSleep(attackerName, attackerStatusEffect, attackerStatusFlag, attackerCounterStatus) {

    //Display attacker is under Sleep status effect.
    console.log(attackerName + " is under " + attackerStatusEffect + " status effect. Hence, unable to attack.")

    attackerCounterStatus -= 1
    
    console.log(attackerStatusEffect + " status counter still left: " + attackerCounterStatus + " turn(s).\n")
    
    if (attackerCounterStatus == 0) {
        attackerStatusFlag = !attackerStatusFlag
        attackerStatusEffect = "None"
    }
    return [attackerStatusEffect, attackerStatusFlag, attackerCounterStatus]
}

//Declare function to check if attacker is in Paralysis status effect.
function statusParalysis(attackerName, attackerStatusEffect, attackerStatusFlag, attackerCounterStatus) {
    //Display attacker is under Paralysis status effect.
    console.log(attackerName + " is under " + attackerStatusEffect + " status effect. Hence, unable to attack.")

    attackerCounterStatus -= 1
    
    console.log(attackerStatusEffect + " status counter still left: " + attackerCounterStatus + " turn(s).\n")

    if (attackerCounterStatus == 0) {
        attackerStatusFlag = !attackerStatusFlag
        attackerStatusEffect = "None"
    }
    return [attackerStatusEffect, attackerStatusFlag, attackerCounterStatus]
}

//Declare Pokemons' attributes.
const pokemons = [
    {
        name: "Pidgey",
        hp: 160,
        type: "Water",
        att: 10,
        def: 3,
    },
    {
        name: "Weezing",
        hp: 175,
        type: "Poison",
        att: 15,
        def: 5,
    },
    {
        name: "Gengar",
        hp: 135,
        type: "Ghost",
        att: 8,
        def: 2,
    },
    {
        name: "Charmander",
        hp: 195,
        type: "Fire",
        att: 17,
        def: 4,
    },
    {
        name: "Squirtle",
        hp: 185,
        type: "Water",
        att: 12,
        def: 1,
    },
    {
        name: "Ivysaur",
        hp: 125,
        type: "Grass",
        att: 19,
        def: 5,
    },
    {
        name: "Meloetta",
        hp: 165,
        type: "Psychic",
        att: 20,
        def: 10,
    },
    {
        name: "Raticate",
        hp: 180,
        type: "Normal",
        att: 15,
        def: 3,
    },
]

//Declare moves' attributes.
const attOptions = [
    {
        move: "Shadow Ball",
        type: "Ghost",
        status: "None",
        damage: 10,
    },
    {
        move: "Tackle",
        type: "Normal",
        status: "None",
        damage: 15,
    },
    {
        move: "Hypnosis",
        type: "Psychic",
        status: "Sleep",
        damage: 11,
    },
    {
        move: "Ember",
        type: "Fire",
        status: "None",
        damage: 8,
    },
    {
        move: "Grass Whistle",
        type: "Grass",
        status: "Sleep",
        damage: 19,
    },
    {
        move: "Splishy Splash",
        type: "Water",
        status: "Paralysis",
        damage: 14,
    },
    {
        move: "Tail Whip",
        type: "Normal",
        status: "Paralysis",
        damage: 4,
    },
    {
        move: "Harden",
        type: "Normal",
        status: "None",
        damage: 20,
    },
    {
        move: "Smog",
        type: "Poison",
        status: "Poison",
        damage: 30,
    },
    {
        move: "Relic Song",
        type: "Normal",
        status: "Sleep",
        damage: 10,
    },
    {
        move: "Dream Eater",
        type: "Phychic",
        status: "None",
        damage: 10,
    },
    {
        move: "Rain Dance",
        type: "Water",
        status: "None",
        damage: 16,
    },
]

//Declare EXP points.
const exp = 50

//Initialize isMyTurn.
let isMyTurn = true

//Initialize status effect attributes for player.
let myStatusEffect = "None"
let myStatusFlag = false          
let myCounterStatus = 0
let myRainDance = false

//Initialize status effect attributes for opponent.
let oppStatusEffect = "None"
let oppStatusFlag = false          
let oppCounterStatus = 0
let oppRainDance = false

console.log("-------------------------------------------------------------------------------------------------")

//Declare the attributes for opponent's Pokemon.
let oppPokemon = pokemons[0].name
let oppHP = pokemons[0].hp
let oppType = pokemons[0].type
let oppATT = pokemons[0].att
let oppDEF = pokemons[0].def

//Display opponent's Pokemon.
console.log("You have encountered a wild " + oppPokemon + ".\n")

//Select a pokemon to summon.
displaypokemons(pokemons)
let ansPokemon = question('\nSelect a Pokemon to summon: ')

//Declare the attributes for player's Pokemon.
let myPokemon = pokemons[ansPokemon].name
let myHP = pokemons[ansPokemon].hp
let myType = pokemons[ansPokemon].type
let myATT = pokemons[ansPokemon].att
let myDEF = pokemons[ansPokemon].def

//Display player's Pokemon.
console.log("You have summoned " + myPokemon + ".")

//Display both Pokemon's and opponent's HP.
console.log(myPokemon + " has " + myHP + " HP.")
console.log(oppPokemon + " has " + oppHP + " HP.")

console.log("-------------------------------------------------------------------------------------------------")

while (myHP > 0 && oppHP > 0) {
    //Change turn after each run of the while loop.
    let attackerName = isMyTurn ? myPokemon :oppPokemon
    let defenderName = isMyTurn ? oppPokemon : myPokemon

    let attackerHP = isMyTurn ? myHP : oppHP
    let defenderHP = isMyTurn ? oppHP : myHP

    let defenderType = isMyTurn ? oppType : myType

    let attackerATT = isMyTurn ? myATT : oppATT
  
    let defenderDEF = isMyTurn ? oppDEF : myDEF 

    let attackerStatusEffect = isMyTurn ? myStatusEffect : oppStatusEffect
    let defenderStatusEffect = isMyTurn ? oppStatusEffect : myStatusEffect
    let attackerStatusFlag = isMyTurn ? myStatusFlag : oppStatusFlag
    let defenderStatusFlag = isMyTurn ? oppStatusFlag : myStatusFlag
    let attackerCounterStatus = isMyTurn ? myCounterStatus : oppCounterStatus
    let defenderCounterStatus = isMyTurn ? oppCounterStatus : myCounterStatus

    let defenderRainDance = isMyTurn ? oppRainDance : myRainDance

    //Display attacker's turn.
    console.log("It is " + attackerName + "'s turn.")
    //Display defender's current HP.
    console.log(defenderName + "'s current HP is " + defenderHP + ".\n")

    //Player's turn.
    if (isMyTurn) {
        if (attackerStatusEffect == "Poison") {
            //Call out function to check if attacker is in Poison status effect.
            let outputStatusPoison = statusPoison(attackerName, attackerHP, attackerStatusEffect, attackerStatusFlag, attackerCounterStatus)

            attackerHP = outputStatusPoison[0]
            attackerStatusEffect = outputStatusPoison[1]
            attackerStatusFlag = outputStatusPoison[2]
            attackerCounterStatus = outputStatusPoison[3]
        }
        if (attackerStatusEffect == "Sleep") {
            //Call out function to check if attacker is in Sleep status effect.
            let outputStatusSleep = statusSleep(attackerName, attackerStatusEffect, attackerStatusFlag, attackerCounterStatus)

            attackerStatusEffect = outputStatusSleep[0]
            attackerStatusFlag = outputStatusSleep[1]
            attackerCounterStatus = outputStatusSleep[2]
        }
        else if (attackerStatusEffect == "Paralysis") {
            //Call out function to check if attacker is in Paralysis status effect.
            let outputStatusParalysis = statusParalysis(attackerName, attackerStatusEffect, attackerStatusFlag, attackerCounterStatus)

            attackerStatusEffect = outputStatusParalysis[0]
            attackerStatusFlag = outputStatusParalysis[1]
            attackerCounterStatus = outputStatusParalysis[2]
        }
        else {
            //Player attacks.
            //Choose movement
            displayAttOptions(attOptions)
            let ansMove = question('Select a move to attack: ')

            let move = attOptions[ansMove].move
            let moveDamage = attOptions[ansMove].damage
            let moveType = attOptions[ansMove].type
            let moveStatus = attOptions[ansMove].status

            //If attacker chooses Dream Eater as move, only will take effect if target is in Sleep status effect.
            if (move == "Dream Eater" && defenderStatusEffect != "Sleep") {
                console.log("\nDream Eater will only take effect on " + defenderName + " if " + defenderName + " is sleeping.")
                console.log(defenderName + "'s HP remains at " + defenderHP + ".")
            }
            else {
                //If attacker chooses Rain Dance as move, all subsequent water attacks will do 50% more damage during the battle.
                if (move == "Rain Dance" && defenderRainDance === false){
                    defenderRainDance = true
                }

                //Call out function for attacker to attack.
                let damage = attack(attackerName, defenderName, attackerATT, defenderDEF, move, moveDamage)

                //Call out function to calculate total damage according to effectiveness.
                let totalDamage = effectiveness(damage, defenderName, move, defenderType, moveType, defenderRainDance)

                //Call out function to display total damage.
                defenderHP = defenderDamage(defenderName, defenderHP, totalDamage)

                //Call out function to display that only one status effect can be casted to defender at a time.
                restrictStatus(defenderName, moveStatus, defenderStatusEffect, defenderCounterStatus)

                //Call out function to check if any status effect is casted to defender.
                let outputCheckStatusEffect = checkStatusEffect(defenderName, moveStatus, defenderStatusEffect, defenderStatusFlag, defenderCounterStatus)
                
                defenderStatusEffect = outputCheckStatusEffect[0]
                defenderStatusFlag = outputCheckStatusEffect[1]
                defenderCounterStatus = outputCheckStatusEffect[2]
            }
        }
            
        myHP = attackerHP
        oppHP = defenderHP

        myStatusEffect = attackerStatusEffect
        oppStatusEffect = defenderStatusEffect
        myStatusFlag = attackerStatusFlag
        oppStatusFlag = defenderStatusFlag
        myCounterStatus = attackerCounterStatus
        oppCounterStatus = defenderCounterStatus

        oppRainDance = defenderRainDance
    }
    //Opponent's turn.
    else {
        if (attackerStatusEffect == "Poison") {
            //Call out function to check if attacker is in Poison status effect.
            let outputStatusPoison = statusPoison(attackerName, attackerHP, attackerStatusEffect, attackerStatusFlag, attackerCounterStatus)

            attackerHP = outputStatusPoison[0]
            attackerStatusEffect = outputStatusPoison[1]
            attackerStatusFlag = outputStatusPoison[2]
            attackerCounterStatus = outputStatusPoison[3]
        }
        if (attackerStatusEffect == "Sleep") {
            //Call out function to check if attacker is in Sleep status effect.
            let outputStatusSleep = statusSleep(attackerName, attackerStatusEffect, attackerStatusFlag, attackerCounterStatus)

            attackerStatusEffect = outputStatusSleep[0]
            attackerStatusFlag = outputStatusSleep[1]
            attackerCounterStatus = outputStatusSleep[2]
        }
        else if (attackerStatusEffect == "Paralysis") {
            //Call out function to check if attacker is in Paralysis status effect.
            let outputStatusParalysis = statusParalysis(attackerName, attackerStatusEffect, attackerStatusFlag, attackerCounterStatus)

            attackerStatusEffect = outputStatusParalysis[0]
            attackerStatusFlag = outputStatusParalysis[1]
            attackerCounterStatus = outputStatusParalysis[2]
        }
        else {
            //Opponent attacks.
            //Randomly choose opponent's move.
            const oppMove = Math.floor(Math.random() * 12)
            
            let move = attOptions[oppMove].move
            let moveDamage = attOptions[oppMove].damage
            let moveType = attOptions[oppMove].type
            let moveStatus = attOptions[oppMove].status

            //If attacker chooses Dream Eater as move, only will take effect if target is in Sleep status effect.
            if (move == "Dream Eater" && defenderStatusEffect != "Sleep") {
                console.log("\nDream Eater will only take effect on " + defenderName + " if " + defenderName + " is sleeping.")
                console.log(defenderName + "'s HP remains at " + defenderHP + ".")
            }
            else {
                //If attacker chooses Rain Dance as move, all subsequent water attacks will do 50% more damage during the battle.
                if (move == "Rain Dance" && defenderRainDance === false){
                    defenderRainDance = true
                }

                //Call out function for attacker to attack.
                let damage = attack(attackerName, defenderName, attackerATT, defenderDEF, move, moveDamage)
                
                //Call out function to calculate total damage according to effectiveness.
                let totalDamage = effectiveness(damage, defenderName, move, defenderType, moveType, defenderRainDance)
            
                //Call out function to display total damage.
                defenderHP = defenderDamage(defenderName, defenderHP, totalDamage)

                //Call out function to display that only one status effect can be casted to defender at a time.
                restrictStatus(defenderName, moveStatus, defenderStatusEffect, defenderCounterStatus)

                //Call out function to check if any status effect is casted to defender.
                let outputCheckStatusEffect = checkStatusEffect(defenderName, moveStatus, defenderStatusEffect, defenderStatusFlag, defenderCounterStatus)
                
                defenderStatusEffect = outputCheckStatusEffect[0]
                defenderStatusFlag = outputCheckStatusEffect[1]
                defenderCounterStatus = outputCheckStatusEffect[2]
            }
        }

        oppHP = attackerHP
        myHP = defenderHP

        oppStatusEffect = attackerStatusEffect
        myStatusEffect = defenderStatusEffect
        oppStatusFlag = attackerStatusFlag
        myStatusFlag = defenderStatusFlag
        oppCounterStatus = attackerCounterStatus
        myCounterStatus = defenderCounterStatus

        myRainDance = defenderRainDance
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
const myPokemon = "Squirtle"
const myOpponent = "Ivysaur"

const attackMove = "Shadow Ball"

let myHP = 100
let oppHP = 200

// To get random damage
//const damage = Math.floor(Math.random() * 10)

const myDamage = 30
const oppDamage = 50

const exp = 50

let isMyTurn = true

console.log("-------------------------------------------------------")
// 1. You have encounter your opponent Mr Mine.
console.log("You have encountered a wild " + myOpponent + ".")

// 2. You send in Gengar.
console.log("You have summoned " + myPokemon + ".")
// TODO: 3. You can choose one of Gengar's skills
// how much HP each pokemon has
console.log(myPokemon + " has " + myHP + " HP.")
console.log(myOpponent + " has " + oppHP + " HP.")


while (myHP > 0 && oppHP > 0) {
    console.log("-------------------------------------------------------")

    let attackerName = isMyTurn ? myPokemon : myOpponent
    let defenderName = isMyTurn ? myOpponent : myPokemon

    //variable will reset whenever the loop runs
    //let attackerHP = isMyTurn ? myHP : oppHP
    //let defenderHP = isMyTurn ? oppHP : myHP

    //Pokemon attacks.
    console.log(attackerName + " uses " + attackMove + " to hit.")
    //console.log(attackMove + " hits for " + damage + " damage.")
    
    if (isMyTurn) {

        console.log(attackMove + " hits for " + oppDamage + " damage.")
        oppHP = oppHP -  oppDamage

        if (oppHP < 0) {
            oppHP = 0
        }

        console.log(defenderName + "'s HP is reduced to " + oppHP + ".")
    }

    else {

        console.log(attackMove + " hits for " + myDamage + " damage.")
        myHP = myHP -  myDamage

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
    console.log("-------------------------------------------------------")
    console.log(myOpponent + "'s HP is 0 and fainted.")
    console.log(myPokemon + " has gained "+ exp + " EXP.")
    console.log("-------------------------------------------------------")
}

if (myHP <= 0) {
    console.log("-------------------------------------------------------")
    console.log(myPokemon + "'s HP is 0 and fainted.")
    console.log("GAME OVER")
    console.log("-------------------------------------------------------")
}



//console.log(myPokemon + " has gained "+ exp + " EXP.")
// TODO: 6. if your pokemon levels up, might learn new skills.

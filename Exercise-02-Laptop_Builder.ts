import { question } from 'readline-sync'

function displayOptions(array) {
    console.log("-------------------------------------------------------------------------------------------------")
    let i = 0
    while (i < 3) {
        console.log("[" + i + "] " + array[i].label + " - Price: RM " + array[i].price)
        i += 1 
    }
console.log("-------------------------------------------------------------------------------------------------")
}

// function getPrice(option) {
//     return parseInt(option.split('RM ')[1])
// }


//Resolution
console.log("Choose your Resolution.")

const resOptions = [
    {
      label: "1920 x 1080",
      price: 300,
    },
    {
      label: "2560 x 1440",
      price: 560,
    },
    {
      label: "3280 x 1680",
      price: 900,
    },
]

displayOptions(resOptions)
let ansRes = question('Select resOptions index:\n')

console.log("-------------------------------------------------------------------------------------------------")



//Video Card
console.log("Choose your Video Card.")

const vidCardOptions = [
    {
      label: "nVdia",
      price: 600,
    },
    {
      label: "AMD Radeon",
      price: 550,
    },
    {
      label: "Intel",
      price: 500,
    },
]

displayOptions(vidCardOptions)
let ansVC = question('Select resVC index:\n')
console.log("-------------------------------------------------------------------------------------------------")

//Processor
console.log("Choose your Processor.")

const processorOptions = [
    {
      label: "i3",
      price: 100,
    },
    {
      label: "i5",
      price: 300,
    },
    {
      label: "Ii7",
      price: 700,
    },
]

displayOptions(processorOptions)
let ansProcessor = question('Select ansProcessor index:\n')
console.log("-------------------------------------------------------------------------------------------------")

//Hard Disk
console.log("Choose your Hard Disk.")


const hddOptions = [
    {
      label: "128GB",
      price: 100,
    },
    {
      label: "256GB",
      price: 200,
    },
    {
      label: "1TB",
      price: 300,
    },
]


displayOptions(hddOptions)
let ansHDD = question('Select ansHDD index:\n')
console.log("-------------------------------------------------------------------------------------------------")




const prices = [
    resOptions[ansRes].price,
    vidCardOptions[ansVC].price,
    processorOptions[ansProcessor].price,
    hddOptions[ansHDD].price,
]

let totalPrice = 0

//Equals to [for (let i = 0; i < 3; i++)]
for (let i in prices){
    totalPrice = totalPrice + prices[parseInt(i)]
}

console.log("-------------------------------------------------------------------------------------------------")
console.log("You have chosen the following options:\n")
console.log("Resolution of your choice:\n" + resOptions[ansRes].label + " - RM " + resOptions[ansRes].price + "\n")
console.log("Video Card of your choice:\n" + vidCardOptions[ansVC].label + " - RM " + resOptions[ansVC].price + "\n")
console.log("Processor of your choice:\n" + processorOptions[ansProcessor].label + " - RM " + resOptions[ansProcessor].price + "\n")
console.log("Hard Disk of your choice:\n" + hddOptions[ansHDD].label + " - RM " + resOptions[ansHDD].price + "\n")
console.log("TOTAL PRICE: RM " + totalPrice)

console.log("-------------------------------------------------------------------------------------------------")

import ancientsData from './data/ancients.js'
import difficulties from './data/difficulties.js'
import cardsDataBlue from './assets/MythicCards/blue/index.js'
import cardsDataBrown from './assets/MythicCards/brown/index.js'
import cardsDataGreen from './assets/MythicCards/green/index.js'

const card = document.querySelector('.play-card')
const gods = document.querySelectorAll('.gods-img')
const firstGreen = document.querySelector('.first-green')
const firstBlue = document.querySelector('.first-blue')
const firstBrown= document.querySelector('.first-brown')
const secondGreen = document.querySelector('.second-green')
const secondBlue = document.querySelector('.second-blue')
const secondBrown= document.querySelector('.second-brown')
const thirdGreen = document.querySelector('.third-green')
const thirdBlue = document.querySelector('.third-blue')
const thirdBrown= document.querySelector('.third-brown')
const modeSection = document.querySelector('.btn-wrapper')
const modeTitle = document.querySelector('.mode-title')
let cardsforAzatoth

gods.forEach((item, index) => {
//  item.src = ancientsData[index].cardFace

 item.addEventListener('click', (event) =>  {     
    modeSection.classList.add('visible')    
    modeTitle.classList.add('visible')    
 const target = event.target
 if(target.classList.contains(ancientsData[index].name)) {
    cardsforAzatoth = getAllCards(index)

    for(let i = 0; i < gods.length; i++) {       
       gods[i].classList.remove('active-img');
      }
    target.classList.add('active-img') 
      
    getRoundCard (index)
 } 
 })
})

function getRoundCard (index) {
    firstGreen.textContent = ancientsData[index].firstStage.greenCards
    firstBlue.textContent = ancientsData[index].firstStage.blueCards
    firstBrown.textContent = ancientsData[index].firstStage.brownCards
    secondGreen.textContent = ancientsData[index].secondStage.greenCards
    secondBlue.textContent = ancientsData[index].secondStage.blueCards
    secondBrown.textContent = ancientsData[index].secondStage.brownCards
    thirdGreen.textContent = ancientsData[index].thirdStage.greenCards
    thirdBlue.textContent = ancientsData[index].thirdStage.blueCards
    thirdBrown.textContent = ancientsData[index].thirdStage.brownCards
}

function shuffle(arr){	
	for(let i = arr.length - 1; i > 0; i--){
		let j = Math.floor(Math.random()*(i + 1));
		let temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

let blueDeck = shuffle(cardsDataBlue)
let brownDeck = shuffle(cardsDataBrown)
let greenDeck = shuffle(cardsDataGreen)

function pushRound (index, stage) {
    const greenArr = []   
    const brownArr = []
    const blueArr = []
    let roundArr = []
    
    for (let i = 0; i < ancientsData[index][stage].greenCards; i++) { 
       greenDeck = shuffle(cardsDataGreen)         
        greenArr.push(greenDeck[i])
    }
    
    for (let i = 0; i < ancientsData[index][stage].brownCards; i++) { 
        brownDeck = shuffle(cardsDataBrown)         
        brownArr.push(brownDeck[i])
    }

    for (let i = 0; i < ancientsData[index][stage].blueCards; i++) { 
        blueDeck = shuffle(cardsDataBlue)         
        blueArr.push(blueDeck[i])
    }         
    roundArr = roundArr.concat(greenArr, brownArr, blueArr)

 return shuffle(roundArr)
}

function getAllCards(index) {
const firstRound = pushRound (index, 'firstStage')
const secondRound = pushRound (index, 'secondStage')
const thirdRound = pushRound (index, 'thirdStage')
let allRounds = []
console.log(allRounds.concat(firstRound, secondRound, thirdRound))
return allRounds.concat(firstRound, secondRound, thirdRound)
}

const back = document.querySelector('.game-deck')
back.addEventListener('click', () => {
      deck()  
} )
   
function deck () {               
    card.src = cardsforAzatoth[0].cardFace

    if(cardsforAzatoth[0].color == 'brown') { 
        if (firstBrown.textContent > 0) {
            firstBrown.textContent -= 1 
        } else if (secondBrown.textContent > 0){
            secondBrown.textContent -= 1
        } else {
           thirdBrown.textContent -= 1
        }  
    }

    if(cardsforAzatoth[0].color == 'blue') { 
        if (firstBlue.textContent > 0) {
            firstBlue.textContent -= 1 
        } else if (secondBlue.textContent > 0){
            secondBlue.textContent -= 1
        } else {
           thirdBlue.textContent -= 1
        }  
    }

    if(cardsforAzatoth[0].color == 'green') { 
        if (firstGreen.textContent > 0) {
            firstGreen.textContent -= 1 
        } else if (secondGreen.textContent > 0){
            secondGreen.textContent -= 1
        } else {
           thirdGreen.textContent -= 1
        }  
    }

    if(cardsforAzatoth.length > 0) {
        cardsforAzatoth = cardsforAzatoth.slice(1, cardsforAzatoth.length)
    } 

    if (cardsforAzatoth.length == 0) {
        alert("It's done")
    } 
    changeColor()
}

const firstTitle = document.querySelector(".first-step-title")
const secondTitle = document.querySelector(".second-step-title")
const thirdTitle = document.querySelector(".third-step-title")

function changeColor() {
    if (firstBrown.textContent == 0 && firstBlue.textContent == 0 && firstGreen.textContent == 0) {
        firstTitle.classList.add('done')
    }
    if (secondBrown.textContent == 0 && secondBlue.textContent == 0 && secondGreen.textContent == 0) {
        secondTitle.classList.add('done')
    }
    if (thirdBrown.textContent == 0 && thirdBlue.textContent == 0 && thirdGreen.textContent == 0) {
        thirdTitle.classList.add('done')
    }
}

const shuffleBtn = document.querySelector('.shuffle-btn')

modeSection.addEventListener('click', () => {
    shuffleBtn.classList.add('visible')
})

const game = document.querySelector('.game')

shuffleBtn.addEventListener('click', () => {
    game.classList.add('visible')
})

const resetBtn = document.querySelector('.reset-btn')

resetBtn.addEventListener('click', () => {
    window.location.reload()
} )
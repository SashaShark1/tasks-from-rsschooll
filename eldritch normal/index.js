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
const modeSection = document.querySelector('.mode')
gods.forEach((item, index) => {
 item.src = ancientsData[index].cardFace
 item.addEventListener('click', (event) =>  {
    modeSection.classList.add('visible')
 const target = event.target
 if(target.classList.contains(ancientsData[index].name)) {
   let nameGods = ancientsData[index].name
   nameGods = nameGods.toUpperCase()
   alert(`You choose ${nameGods}`)
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
 })
})

function shuffle(arr){	
	for(let i = arr.length - 1; i > 0; i--){
		let j = Math.floor(Math.random()*(i + 1));
		let temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

const blueDeck = shuffle(cardsDataBlue)
const brownDeck = shuffle(cardsDataBrown)
const greenDeck = shuffle(cardsDataGreen)

function pushRound (index, stage) {
    const greenArr = []   
    const brownArr = []
    const blueArr = []
    let roundArr = []
    
    for (let i = 0; i < ancientsData[index][stage].greenCards; i++) {          
        greenArr.push(greenDeck[i])
    }
    
    for (let i = 0; i < ancientsData[index][stage].brownCards; i++) {          
        brownArr.push(brownDeck[i])
    }

    for (let i = 0; i < ancientsData[index][stage].blueCards; i++) {          
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
return allRounds.concat(firstRound, secondRound, thirdRound)

}
// card.src = cardsDataGreen[0].cardFace

console.log(getAllCards(3))
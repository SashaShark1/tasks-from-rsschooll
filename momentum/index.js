import playList  from './playList.js';

const body = document.querySelector('body')
const langEnBtn = document.querySelector('.lang-en')
const langBelBtn = document.querySelector('.lang-bel')
// TIME START
function showTime() {
    const time = document.querySelector('.time')
    const date = new Date()
    const currentTime = date.toLocaleTimeString()
    time.textContent = currentTime;
    setTimeout(showTime, 1000)
    showDate()
    showGreeting() 
}
showTime()

function showDate() {
    const day = document.querySelector('.date')
    const date= new Date()
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = langEnBtn.classList.contains('active-lang')? date.toLocaleDateString('en-Br', options) : date.toLocaleDateString('uk', options)
    day.textContent = currentDate
}
// TIME END


// GREETING START
function getTime() {
    const date = new Date()
    const hours = date.getHours()  

    if(hours >= 6 && hours < 12 ) {                
        return 'morning'       
    } else if (hours >= 12 && hours < 18)  {
        return 'afternoon'
    }   else if (hours >= 18 && hours < 24)  {
        return 'evening'
    }   else {
        return 'night'
    }
}

function getTimeBel() {
    const date = new Date()
    const hours = date.getHours()  

    if(hours >= 6 && hours < 12 ) {
       return 'Добрай раніцы'
    } else if (hours >= 12 && hours < 18)  {
        return  'Добры дзень'
        }   else if (hours >= 18 && hours < 24)  {
            return   'Добры вечар'
        }   else {
            return  'Дабранач'
      }    
}

function showGreeting() {
const greetingText = document.querySelector('.greeting')
const timeOfDay = getTime()
const timeOfDayBel = getTimeBel()
greetingText.textContent = langEnBtn.classList.contains('active-lang')? `Good ${timeOfDay},` : `${timeOfDayBel}, `
}

const userName = document.querySelector('.name') 

function setName() {   
localStorage.setItem('name', userName.value)
}
 window.addEventListener('beforeunload', setName)

 function showName() {
    if(localStorage.getItem('name')) {
        userName.value = localStorage.getItem('name')
    }
 }
window.addEventListener('load', showName)
// GREETING END


// BG START
 let randomNum;

 function getRandomNum() { 
 return randomNum = Math.floor(Math.random() * 20 + 1)    
}

// console.log(randomNum)

let numBg = getRandomNum()
const timeOfDay = getTime()


function setBg() {
    numBg = numBg.toString().padStart(2, '0')
 const img = new Image() 
 img.src = `https://raw.githubusercontent.com/SashaShark14/stage1-tasks/assets/images/${timeOfDay}/${numBg}.jpg`
img.onload = () => {
 body.style.backgroundImage = `url(${img.src})`
}   
// body.style.backgroundImage =`url('https://raw.githubusercontent.com/SashaShark14/stage1-tasks/assets/images/${timeOfDay}/${numBg}.jpg')`
}
setBg()

const prevArrow = document.querySelector('.slide-prev')
const nextArrow = document.querySelector('.slide-next')

function getNextSlide() {
if (numBg == 20) {
    numBg = 1
} else {
   numBg = +numBg + 1 
}
setBg()
}
nextArrow.addEventListener('click',  getNextSlide)

function getPrevSlide() {
    if (numBg == 1) {
        numBg = 20
    } else {
       numBg = +numBg - 1 
    }   
    setBg()
}
prevArrow.addEventListener('click',  getPrevSlide)

// BG END

// WEATHER START

const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDesc = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
const weatherErr = document.querySelector('.weather-error')

async function getWeather() {
const url = langEnBtn.classList.contains('active-lang')? `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=72a3f02274750fe5107d209c82deee73&units=metric` : `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=be&appid=72a3f02274750fe5107d209c82deee73&units=metric`
const res = await fetch(url)
const data = await res.json()

if(city.value === '') {
    city.value = 'Minsk'
}

if(res.status == 404) {
    weatherErr.classList.remove('unvisible')
    weatherErr.textContent = langEnBtn.classList.contains('active-lang')? `Error! Weather not found for '${city.value}'` :  `Увага! Інфармацыя аб '${city.value}' адсутнічае`
    temperature.classList.add('unvisible')
    weatherIcon.classList.add('unvisible')
    weatherDesc.classList.add('unvisible')
    wind.classList.add('unvisible')
    humidity.classList.add('unvisible')
    city.value = ''           
} else {
    weatherErr.classList.add('unvisible')    
    temperature.classList.remove('unvisible')
    weatherIcon.classList.remove('unvisible')
    weatherDesc.classList.remove('unvisible')
    wind.classList.remove('unvisible')
    humidity.classList.remove('unvisible')
}

weatherIcon.className = 'weather-icon owf'
weatherIcon.classList.add(`owf-${data.weather[0].id}`)
temperature.textContent = `${Math.round(data.main.temp)}°C`
weatherDesc.textContent = data.weather[0].description
wind.textContent = langEnBtn.classList.contains('active-lang')? `Wind speed: ${Math.round(data.wind.speed)} m/s` : `Хуткасць ветру: ${Math.round(data.wind.speed)} м/с`
humidity.textContent = langEnBtn.classList.contains('active-lang')? `Humidity: ${data.main.humidity}%` : `Вільготнасць: ${data.main.humidity}%`


}
document.addEventListener('DOMContentLoaded', getWeather);

city.addEventListener('change', () => {
    getWeather();
} )



function setCity() {   
localStorage.setItem('city', city.value)
}
window.addEventListener('beforeunload', setCity)
    
function showCity() {
if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city')
}
}
city.value = showCity() ?? 'Minsk'
window.addEventListener('load', showCity)
window.addEventListener('load', getWeather)


// WEATHER END

//  QUOTE START
const quoteBtn = document.querySelector('.change-quote')
const qouteText = document.querySelector('.quote')
const author = document.querySelector('.author')

function getNum (min, max) {
 return Math.floor(Math.random() * max + min)
}


async function getQuotes() {
   const quotes = './assets/quotes.json'
    const res = await fetch(quotes)
    const data = await res.json()

    const randomQuote = getNum(1, data.length)

    qouteText.textContent = data[randomQuote].quote
    author.textContent = data[randomQuote].author
    if(author.textContent == 'Unknown') {
        author.textContent = ''
    }    
}

window.addEventListener('load', getQuotes)
// quoteBtn.addEventListener('click', getQuotes)

//  QUOTE END


//  AUDIO START
const playBtn = document.querySelector('.play')
const audioPrev = document.querySelector('.play-prev')
const audioNext = document.querySelector('.play-next')
const playListCont= document.querySelector('.play-list')

const audio = new Audio()
let isPlay = false
let playNum = 0

playList.forEach((item, index) => {
    const li = document.createElement('li')
    li.classList.add('play-item')
    playListCont.append(li)
    li.textContent = item.title
    })
const itemLi = document.querySelectorAll('li')
    


function playAudio() {
    audio.src = playList[playNum].src
    audio.currentTime = 0 
    itemLi[playNum].classList.add('item-active')   
    if(!isPlay) {       
        isPlay = true
        playBtn.classList.add('pause')
         audio.play() 
    } else {      
        isPlay = false
        playBtn.classList.remove('pause')
        audio.pause()
    } 
   
    }
playBtn.addEventListener('click', playAudio)


function playNext() {
itemLi[playNum].classList.remove('item-active')
playNum++
if(playNum > (playList.length - 1)) {
    playNum = 0
}
itemLi[playNum].classList.add('item-active')
isPlay = false
 playAudio()
}

function playPrev() {
itemLi[playNum].classList.remove('item-active')
playNum--
if(playNum < 0) {
    playNum = playList.length - 1
}
itemLi[playNum].classList.add('item-active')
isPlay = false
playAudio()
}

audioNext.addEventListener('click', playNext)
audioPrev.addEventListener('click', playPrev)

audio.addEventListener('ended', playNext);
//  AUDIO END


//  SETTINGS START

const settingsBtn = document.querySelector('.settings-icon')
const settContainer = document.querySelector('.settings-container')

settingsBtn.addEventListener('click', showSettings)

function showSettings() {
    settContainer.classList.toggle('show-settings')
}

window.addEventListener('click', e => {
    const targ = e.target

if(!targ.closest('.settings-container') && !targ.closest('.settings-icon')){
    settContainer.classList.remove('show-settings')
    }
})
//  SETTINGS END

//  LANGUAGE START
const i18Obj = {
    'en': {
        "enter": "[Enter name]",
        "settings": "Settings:",
        "language": "Language:",
        "player": "Player",
        "weather": "Weather",
        "quotes": "Quotes",
        "time": "Time",
        "date": "Date",
        "greeting": "Greeting",
        "todo": "Todo",
        "todo-title": "To-do list",
        "type-task": "Type your task",
        "add": "Add",
        "clear": "Clear",
        "delete": "Delete"

    },
    'be': {
        "enter": "[Увядзіце імя]",
        "settings": "Налады:",
        "language": "Мова:",
        "player": "Песьні",
        "weather": "Надвор'е",
        "quotes": "Цытаты",
        "time": "Час",
        "date": "Дзень",
        "greeting": "Вітанне",
        "todo": "Спіс",
        "todo-title": "Спіс спраў",
        "type-task": "Увядзіце справы",
        "add": "Дадаць",
        "clear": "Пачысціць",
        "delete": "Выдаліць"
    },
}


const dataList  = document.querySelectorAll('[data-i18]')

function translate(lang) {
    dataList.forEach(item => {
      item.textContent = i18Obj[lang][item.dataset.i18]
      item.placeholder = i18Obj[lang][item.dataset.i18]
    })
  }

  async function getBelQuotes() {
    const quotes = './assets/belarusian_quotes.json'
     const res = await fetch(quotes)
     const data = await res.json()
 
     const randomQuote = getNum(1, data.length)
 
     qouteText.textContent = data[randomQuote].text
     author.textContent = data[randomQuote].author
     if(author.textContent == 'Unknown') {
         author.textContent = ''
     }    
 } 

 quoteBtn.addEventListener('click', () => {
    langEnBtn.classList.contains('active-lang')? getQuotes() : getBelQuotes()  
 } )

 function translateBel() {
    getBelQuotes()
    translate('be') 
    langEnBtn.classList.remove('active-lang')
    langBelBtn.classList.add('active-lang')
    getWeather()
    showGreeting()
 }

 function translateEn() {
    getQuotes()
    translate('en')
    langBelBtn.classList.remove('active-lang')
    langEnBtn.classList.add('active-lang')
    getWeather()
    showGreeting()
 }

  langBelBtn.addEventListener('click', translateBel)
  langEnBtn.addEventListener('click', translateEn)  

  window.addEventListener('DOMContentLoaded', () => {
    langEnBtn.classList.add('active-lang')
  })

//  LANGUAGE END

//  HIDDEN ELEMENTS START
const checkOff = document.querySelectorAll('.check-off')

const playerSection = document.querySelector('.player')
const weatherSection = document.querySelector('.weather')
const quoteSection = document.querySelector('.quote-content')
const timeSection = document.querySelector('.time')
const dateSection = document.querySelector('.date')
const greetingSection = document.querySelector('.greeting-container')
const toDoSection = document.querySelector('.todo-content')
const SectionArr = [playerSection, weatherSection, quoteSection, timeSection,
    dateSection, greetingSection, toDoSection]

    checkOff.forEach((item, index) =>  {
        item.addEventListener('change', () => {
            SectionArr[index].classList.toggle('opacity-off')
    })
})
//  HIDDEN ELEMENTS END


//  TODO START
const notepadBtn = document.querySelector('.notepad-logo')
const toDoContainer = document.querySelector('.todo-container')

notepadBtn.addEventListener('click', showtoDo)

function showtoDo() {
    toDoContainer.classList.toggle('show-todo')
}

window.addEventListener('click', e => {
    const targ = e.target

if(!targ.closest('.todo-container') && !targ.closest('.notepad-logo')){
    toDoContainer.classList.remove('show-todo')
    }
})


const todoInput = document.querySelector('.todo-input')
const todos = document.querySelector('.todos')
const clearBtn = document.querySelector('.clear')
const addBtn = document.querySelector('.save')

clearBtn.addEventListener('click',() => todoInput.value = '')

const todoList = []

function createTodoItem ()  {
    const todoItem = document.createElement('li')   
    const deleteBtn = document.createElement('button')
    const spanToDo = document.createElement('span')

    spanToDo.textContent = todoInput.value
    deleteBtn.textContent = 'Delete'
    todoItem.classList.add('todos-text')    
    deleteBtn.classList.add('todo-btn', 'delete', 'cursor')   

    todoItem.append(spanToDo)
    todoItem.append(deleteBtn)
   todos.append(todoItem)
   
   todoList.push(todoInput.value)
   
deleteTodo(deleteBtn)

}
function deleteTodo(element) {
    element.addEventListener("click", (event) => {
        element.parentElement.remove();
        event.stopPropagation();
    });
}

function setTodo() {   
localStorage.setItem('todo', JSON.stringify(todos.innerHTML))
}
window.addEventListener('beforeunload', setTodo)

function loadTodos() {
const data = JSON.parse(localStorage.getItem("todo"));
if (data) {
return  todos.innerHTML = data;
}
}


window.addEventListener("DOMContentLoaded", loadTodos)  

addBtn.addEventListener('click', () => {
    createTodoItem()
    setTodo()   
    todoInput.value = ''    
} )

const deleteAllBtn = document.querySelector('.deleteall')
deleteAllBtn.addEventListener('click', () => {
    localStorage.removeItem('todo')   
    todos.innerHTML = ''
})




//  TODO END


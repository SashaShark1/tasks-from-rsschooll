console.log(`Слайдер изображений в секции destinations +50
на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20
Три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20
Анимации плавного перемещения для слайдера +10
Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50
логин попап соответствует верстке его закрытие происходит при клике вне попапа +25
логин попап имеет 2 инпута (email и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25
Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25
Итоговая отметка - 100баллов`)

const allBtn = document.querySelectorAll('.all-btn');

// BURGER START
const burgerBtn = document.querySelector('.hamburger-menu')
const navSection = document.querySelector('.nav')
const account = document.querySelector('.account')
const navLink = document.querySelectorAll('.nav-link')


function closeNavMenu() {
    navSection.classList.toggle('change')
}

burgerBtn.addEventListener('click', closeNavMenu)

account.addEventListener('click', closeNavMenu)

document.addEventListener('click', event => {
    const target = event.target
    const menu = target == navSection || navSection.contains(target)
    const burger = target == burgerBtn

    if(!menu && !burger && navSection.classList.contains('change')) {
        closeNavMenu()
    }
})

navLink.forEach(item => {
    item.addEventListener('click', closeNavMenu )
})

// BURGER END   

// SIGN-IN START




document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.querySelector('.log-btn')
    const signIn = document.querySelector('.login')
    const accLink = document.querySelector('.account-link')

    loginBtn.addEventListener('click', () => {
        signIn.classList.add('show-from-top')
    })

    accLink.addEventListener('click', () => {
        signIn.classList.add('show-from-top')
    })

    window.addEventListener('click', e => {
        const targ = e.target

        if(!targ.closest('.login') && !targ.closest('.log-btn') && !targ.closest('.account-link')){
            signIn.classList.remove('show-from-top')
        }
    } )

})


const emailInput = document.querySelector('.email-input')
const passwordInput = document.querySelector('.pass-input')
const signInBtn = document.querySelector('.sign-in-btn')

signInBtn.addEventListener('click', () => {
    alert(`Your email: ${emailInput.value}
Your password: ${passwordInput.value}`)
emailInput.value = ''
passwordInput.value = ''
})

// SIGN-IN END


// SIGN-UP START
const register = document.querySelector('.register')
const facebookBtn = document.querySelector('.login-facebook')
const googleBtn = document.querySelector('.login-google')
const or = document.querySelector('.login-text')
const forgot = document.querySelector('.forgot-pass')
const logIn = document.querySelector('.login')
const logTitle = document.querySelector('.login-title')
const accText = document.querySelector('.account')

 register.addEventListener('click', toggleSignUp)

 function toggleSignUp() {
    googleBtn.classList.toggle('hide')
    facebookBtn.classList.toggle('hide')
    or.classList.toggle('hide')
    forgot.classList.toggle('hide')
    logIn.classList.toggle('sign-up')
    signInBtn.classList.toggle('marg-bottom')
    signInBtn.innerHTML == 'Sign In'? signInBtn.innerHTML ='Sign Up': signInBtn.innerHTML ='Sign In'
   register.innerHTML == 'Register'? register.innerHTML ='Log In': register.innerHTML ='Register'
   logTitle.innerHTML == 'Log in to your account'? logTitle.innerHTML ='Create account': logTitle.innerHTML ='Log in to your account'
   accText.innerHTML == 'Dont have an account?' ? accText.innerHTML ='Already have an account?' : accText.innerHTML ='Dont have an account?'  
}
// SIGN-UP END


// SLIDER DESCTOP START


const spain = document.querySelector('.spain-item')
const japan = document.querySelector('.japan-item')
const usa = document.querySelector('.usa-item')
const sliderContent = document.querySelector('.destination-content')
const radioBtn1 = document.querySelector('#btn1')
const radioBtn2 = document.querySelector('#btn2')
const radioBtn3 = document.querySelector('#btn3')

document.addEventListener('click', (event) => {
    const target = event.target

    if(target.closest('.spain-item')) {
        showSpain()
    } else if(target.closest('.japan-item')) {
        showJapan()
    } else if(target.closest('.usa-item')) {
        showUSA()
    }

})

function showSpain() {
    sliderContent.classList.remove('transition-right')  
    sliderContent.classList.remove('transition-centre')
    sliderContent.classList.remove('transition-usa')
    sliderContent.classList.remove('slider-japan')
    sliderContent.classList.remove('slider-usa')  
    sliderContent.classList.add('slider-spain')      
    sliderContent.classList.add('transition-left')
    radioBtn2.classList.remove('radio-active')
    radioBtn3.classList.remove('radio-active')
    radioBtn1.classList.add('radio-active')
}

function showUSA() {
     sliderContent.classList.remove('transition-left')
    sliderContent.classList.remove('transition-centre')
    sliderContent.classList.remove('transition-usa')
    sliderContent.classList.remove('slider-japan')
    sliderContent.classList.remove('slider-spain') 
    sliderContent.classList.add('slider-usa')   
    sliderContent.classList.add('transition-right')
    radioBtn1.classList.remove('radio-active')
    radioBtn2.classList.remove('radio-active')
    radioBtn3.classList.add('radio-active')
}

function showJapan() {
    sliderContent.classList.remove('slider-spain')
    sliderContent.classList.remove('slider-usa')    
    if(sliderContent.classList.contains('transition-left')){
         sliderContent.classList.remove('transition-left')
         sliderContent.classList.remove('transition-usa')

         sliderContent.classList.add('transition-centre')
    }
    if(sliderContent.classList.contains('transition-right')){
        sliderContent.classList.remove('transition-right')
        sliderContent.classList.remove('transition-left')
        sliderContent.classList.add('transition-usa')
   }
   sliderContent.classList.add('slider-japan') 
   radioBtn1.classList.remove('radio-active')
   radioBtn3.classList.remove('radio-active')
   radioBtn2.classList.add('radio-active') 
}

radioBtn1.addEventListener('click', showSpain)
radioBtn2.addEventListener('click', showJapan)
radioBtn3.addEventListener('click', showUSA)

// SLIDER DESCTOP END



// SLIDER MOBILE START

const mobileContent = document.querySelector('.mobile-content')
const leftBtn = document.querySelector('.left-arr-btn')
const rightBtn = document.querySelector('.right-arr-btn')


if(mobileContent.style.width <= 390){
    leftBtn.classList.add('arrow-opacity')
    radioBtn2.classList.remove('radio-active')
    radioBtn1.classList.add('radio-active')
}



rightBtn.addEventListener('click', () => {
    leftBtn.classList.remove('arrow-opacity')
mobileContent.classList.contains('japan-margin')?  mobileContent.classList.add('usa-margin') : mobileContent.classList.add('japan-margin')
mobileContent.classList.contains('japan-margin')? activeSecond() :  activeSecond()



if(mobileContent.classList.contains('usa-margin')) {
    rightBtn.classList.add('arrow-opacity')
    activeThird()
}
})

leftBtn.addEventListener('click', () => {
if(mobileContent.classList.contains('japan-margin')) {
    mobileContent.classList.remove('japan-margin')    
    rightBtn.classList.remove('arrow-opacity')
    activeSecond()
}

if(mobileContent.classList.contains('usa-margin')) {      
mobileContent.classList.remove('usa-margin')
 mobileContent.classList.add('japan-margin')
 activeSecond()
}
if(!mobileContent.classList.contains('japan-margin') && !mobileContent.classList.contains('usa-margin')) {
    leftBtn.classList.add('arrow-opacity')
    activeFirst()
}

})

radioBtn1.addEventListener('click', () => {
    leftBtn.classList.add('arrow-opacity')
    rightBtn.classList.remove('arrow-opacity')
    mobileContent.classList.remove('japan-margin')
    mobileContent.classList.remove('usa-margin')
    mobileContent.classList.add('spain-margin')})
radioBtn2.addEventListener('click', () => {
    leftBtn.classList.remove('arrow-opacity')
    rightBtn.classList.remove('arrow-opacity')
    mobileContent.classList.remove('spain-margin')
    mobileContent.classList.remove('usa-margin')
    mobileContent.classList.add('japan-margin')})
radioBtn3.addEventListener('click', () => {
    rightBtn.classList.add('arrow-opacity')
    leftBtn.classList.remove('arrow-opacity')
    mobileContent.classList.remove('japan-margin')
    mobileContent.classList.remove('spain-margin')
    mobileContent.classList.add('usa-margin')})
    
function activeFirst() {
    radioBtn2.classList.remove('radio-active')
   radioBtn3.classList.remove('radio-active')
   radioBtn1.classList.add('radio-active') 
}

function activeSecond() {
    radioBtn1.classList.remove('radio-active')
    radioBtn3.classList.remove('radio-active')
    radioBtn2.classList.add('radio-active') 
}

function activeThird() {
    radioBtn1.classList.remove('radio-active')
    radioBtn2.classList.remove('radio-active')
    radioBtn3.classList.add('radio-active') 
}






// SLIDER MOBILE END
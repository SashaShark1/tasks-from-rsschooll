const topBtn = document.querySelector('.back-to-top')

window.addEventListener('scroll', trackScroll)
topBtn.addEventListener('click', backToTop)

function trackScroll() {
    let scrolled = window.pageYOffset
    let coords = document.documentElement.clientHeight

    if(scrolled > coords) {
        topBtn.classList.add('back-to-top-show')
    } 

    if(scrolled < coords) {
        topBtn.classList.remove('back-to-top-show')
    }
}

function backToTop() {
    if(window.pageYOffset > 0) {
        window.scrollTo(0, 0)
    }
}

console.log(`Студент засабмитил в rs app ссылку на своё CV, задеплоенное на gh-pages +10  
Вёрстка валидная +10 
Вёрстка семантическая +20 
В footer есть ссылка на гитхаб автора работы, год создания приложения, логотип курса со ссылкой на курс +10 
Для оформления СV используются css-стили +10
При уменьшении масштаба страницы браузера вёрстка размещается по центру по горизонтали, а не сдвигается в сторону +10
На странице СV есть фото или аватарка автора, пропорции изображения не искажены, у изображения есть атрибут alt +10
Навигация, контакты для связи и перечень навыков оформлены в виде списка ul > li или ul > li > a +10
Содержание CV +30
CV выполнено на английском языке +10
Итого: 120 баллов`)
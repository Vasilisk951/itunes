export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');

    const audio = new Audio();
    audio.type = 'audio/aac';

    //заблокировали кнопку пока радио не работает
    radioStop.disabled = true;


    //настраиваем кнупку паузы и запуска
    const changIconPlay = () => {
        if (audio.paused/*pause - метод; paused - свойство(или true или false) */) { 
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));//убираем обводку с прошлого выбранного
        elem.classList.add('select');//добавляем обводку окну радио
    };

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);//вызов функции selectItem

        const title = parrent.querySelector('.radio-name').textContent; //получили название станции
        radioHeaderBig.textContent = title; //заменили главный текст на название станции
    
        const urlImg = parrent.querySelector('.radio-img').src; //получаем путь к картике станции
        radioCoverImg.src = urlImg; //меняем путь у диска на путь выбранной станции

        radioStop.disabled = false; //разблокировка кнопки

        audio.src = target.dataset.radioStantion; //путь к атрибуту data со ссылкой на радиостанцию

        audio.play(); //запуск радио
        changIconPlay(); //вызов функции смены кнопки
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changIconPlay();
    });
};
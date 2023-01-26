//=======OUT-OF-BOX CARDS=======
const initialCards = [
    {
      name: 'Мань-Пупу-нёр',
      link: 'https://4tololo.ru/sites/default/files/images/20141705171812.jpg'
    },
    {
      name: 'Губаха',
      link: 'https://tripplanet.ru/wp-content/uploads/europe/russia/perm-region/ladeinaya-mountain.jpg'
    },
    {
      name: 'Вишера',
      link: 'https://i01.fotocdn.net/s128/4c4eab7908867d84/public_pin_l/2903084121.jpg'
    },
    {
      name: 'Кунгур',
      link: 'https://gamerwall.pro/uploads/posts/2022-07/thumbs/1657905415_38-gamerwall-pro-p-osennii-kungur-oboi-39.jpg'
    },
    {
      name: 'Усьва',
      link: 'https://mtdata.ru/u11/photo1235/20458738616-0/original.jpg'
    },
    {
      name: 'Александровск',
      link: 'https://pibig.info/uploads/posts/2021-05/1622072993_51-pibig_info-p-ozera-permskogo-kraya-priroda-krasivo-foto-52.jpg'
    }
  ]; 

//=======ПЕРЕМЕННЫЕ=======

//Элементы на странице
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupPic = document.querySelector(".popup_type_pic");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const gallery = document.querySelector(".gallery");

const galleryTemplate = document.querySelector(".gallery__template").content;

//Формы
const formProfile = popupEdit.querySelector(".popup__form");
const formPic = popupAdd.querySelector(".popup__form");

const inputName = formProfile.querySelector(".popup__input_type_name");
const inputJob = formProfile.querySelector(".popup__input_type_job");

const inputPicName = formPic.querySelector(".popup__input_type_pic-name");
const inputPicLink = formPic.querySelector(".popup__input_type_pic-link");

//Кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeEditPopup = popupEdit.querySelector(".popup__close");
const closeAddPopup = popupAdd.querySelector(".popup__close");
const closePicPopup = popupPic.querySelector(".popup__close");


//=======ФУНКЦИИ=======

//Открытие попапа
const popupOpened = (popupType) => {
    popupType.classList.add('popup_opened');

    //Копируем изначальное описание в форму
    inputName.value = profileName.textContent.trim();
    inputJob.value = profileAbout.textContent.trim();
}

//Закрытие попапа
const popupClosed = (popupType) => {
    popupType.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
const profileFormSubmit = (evt) => {
    const popupType = evt.target.closest(".popup");
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let name = inputName.value;
    let job = inputJob.value;
    profileName.textContent = name;
    profileAbout.textContent = job;
    popupClosed(popupType);
}

const picFormSubmit = (evt) => {
    const popupType = evt.target.closest(".popup");
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let picName = inputPicName.value;
    let picLink = inputPicLink.value;
    if (picName !== "" && picLink !== "") {
        let newCard ={name: picName, link: picLink}
        postCard(addCard(newCard), true);
    }
    popupClosed(popupType);
    evt.currentTarget.reset();
}

//Удалить карту
const removeCard = (evt) => {
    const cardToRemove = evt.target.closest(".gallery__card");
    cardToRemove.remove();
}

//Убрать лайк
const unlikeCard = (evt) => {
    evt.target.style.backgroundImage = "url(../../../images/heart.svg)";
    evt.currentTarget.removeEventListener('click', unlikeCard);
    evt.currentTarget.addEventListener('click', likeCard);
}

//Залайкать карту
const likeCard = (evt) => {
    evt.target.style.backgroundImage = "url(../../../images/heartactive.svg)";
    evt.currentTarget.removeEventListener('click', likeCard);
    evt.currentTarget.addEventListener('click', unlikeCard);
}

const fullsizeCard = (evt) => {
    popupOpened(popupPic);

    const picFullScreen = popupPic.querySelector(".popup__pic");
    const textToPic = popupPic.querySelector(".popup__text");
    const link = evt.target.closest(".gallery__card").querySelector(".gallery__pic").getAttribute("src");
    const name = evt.target.closest(".gallery__card").querySelector(".gallery__text").textContent;

    picFullScreen.setAttribute("alt", name);
    picFullScreen.setAttribute("src", link);
    textToPic.textContent = name;
}

//Добавить карту на сайт
const addCard = (img) => {
    
    //Клонируем
    const galleryCard = galleryTemplate.querySelector(".gallery__card").cloneNode(true);
    const galleryPic = galleryCard.querySelector(".gallery__pic");
    const galleryText = galleryCard.querySelector(".gallery__text");

    //Наполняем
    galleryPic.setAttribute("alt", img.name);
    galleryPic.setAttribute("src", img.link);
    galleryText.textContent = img.name;

    return galleryCard;
}


const postCard = (cardObject, place = false) => {

    //Клонируем
    const galleryCard = cardObject;
    const galleryPic = galleryCard.querySelector(".gallery__pic");
    const galleryTextCont = galleryCard.querySelector(".gallery__text-cont");
    const galleryText = galleryCard.querySelector(".gallery__text");
    const galleryHeart = galleryCard.querySelector(".gallery__heart");
    const galleryDelete = galleryCard.querySelector(".gallery__delete");

    //Размещаем
    if (place) {
        gallery.prepend(galleryCard);
        galleryCard.prepend(galleryPic, galleryTextCont, galleryDelete);
        galleryTextCont.prepend(galleryText, galleryHeart);
    } else {
        gallery.append(galleryCard);
        galleryCard.append(galleryPic, galleryTextCont, galleryDelete);
        galleryTextCont.append(galleryText, galleryHeart);
    }
    
    //Вешаем слушателей
    galleryDelete.addEventListener('click', removeCard);
    galleryHeart.addEventListener('click', likeCard);
    galleryPic.addEventListener('click', fullsizeCard);
} 


//=======СКРИПТ=======

//Задаем начальные карты
initialCards.forEach( item => postCard(addCard(item), false) );

//Слушаем события - открытие, закрытие, сабмит
editButton.addEventListener('click', () => {popupOpened(popupEdit)});
addButton.addEventListener('click', () => {popupOpened(popupAdd)});

closeEditPopup.addEventListener('click', () => {popupClosed(popupEdit)});
closeAddPopup.addEventListener('click', () => {popupClosed(popupAdd)});
closePicPopup.addEventListener('click', () => {popupClosed(popupPic)});

formProfile.addEventListener('submit', profileFormSubmit);
formPic.addEventListener('submit', picFormSubmit);



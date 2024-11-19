// Получаем элемент иконки редактирования профиля
const editProfileIcon = document.querySelector('.profile__editor')
// Кнопка "Редактировать профиль", по клику открывает popup редактирования профиля


// Получаем элемент иконки добавления места
const addCardIcon = document.querySelector('.profile__add-mesto')
// Кнопка "Добавить место", открывает popup добавления новой карточки


// Получаем popup редактирования профиля
const popupProfile = document.querySelector('#profile-popup')
// Модальное окно редактирования профиля


// Получаем popup добавления карточки
const popupCards = document.querySelector('#cards-popup')
// Модальное окно добавления новой карточки


// Получаем popup увеличения картинки
const popupImageZoom = document.querySelector('#image-popup')
// Модальное окно для увеличенного отображения изображения


/* Элементы закрытия popup */

const popupProfileCloseIcon = popupProfile.querySelector('.popup__close')
// Кнопка закрытия popup редактирования профиля

const popupCardsCloseIcon = popupCards.querySelector('.popup__close')
// Кнопка закрытия popup добавления карточки

const popupImageZoomCloseIcon = popupImageZoom.querySelector('.popup__close')
// Кнопка закрытия popup увеличенного изображения


/* Элементы профиля */

const profileName = document.querySelector('.profile__name')
// Имя пользователя в профиле

const profileDescription = document.querySelector('.profile__description')
// Описание профиля пользователя


/* Поля ввода в формах */

const nameInput = popupProfile.querySelector('.popup__input_item_name')
// Поле ввода имени в popup редактирования профиля

const nameCardInput = popupCards.querySelector('.popup__input_item_name')
// Поле ввода названия карточки в popup добавления карточки

const descriptionInput = popupProfile.querySelector('.popup__input_item_description')
// Поле ввода описания профиля в popup редактирования профиля

const linkCardInput = popupCards.querySelector('.popup__input_item_description')
// Поле ввода ссылки на изображение в popup добавления карточки


/* Секция для размещения карточек */

const cardsArea = document.querySelector('.cards')
// Контейнер, в котором отображаются все карточки


// Функция открытия popup
const popupOpen = function (popupName) {
  popupName.classList.add('popup_opened')
  // Добавляем класс `popup_opened` для отображения модального окна
  
  nameInput.value = profileName.textContent
  // При открытии popup редактирования профиля заполняем поле имени текущим значением
  
  descriptionInput.value = profileDescription.textContent
  // Заполняем поле описания текущим значением
}


// Функция закрытия popup
const popupClose = function (popupName) {
  popupName.classList.remove('popup_opened')
  // Убираем класс `popup_opened`, закрывая модальное окно
}


// Функция добавления карточки
const addCards = function (name, link) {
  const contentCardTemplate = document.querySelector('#card-template').content
  // Достаём содержимое шаблона карточки

  const copyCardTemplate = contentCardTemplate.querySelector('.cards__item').cloneNode(true)
  // Создаём копию шаблона карточки для наполнения

  copyCardTemplate.querySelector('.cards__description').textContent = name
  // Устанавливаем название карточки

  copyCardTemplate.querySelector('.cards__image').src = link
  // Устанавливаем ссылку на изображение карточки

  // Добавляем возможность лайкать карточку
  copyCardTemplate.querySelector('.cards__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like_active')
    // Переключаем состояние кнопки "лайк"
  })

  // Добавляем возможность удалять карточку по клику
  copyCardTemplate.querySelector('.cards__delete').addEventListener('click', function (evt) {
    evt.target.closest('.cards__item').remove()
    // Удаляем карточку из DOM
  })

  // Добавляем возможность увеличения картинки при клике
  const getZoomImages = function () {
    popupImageZoom.querySelector('.popup__description').textContent = name
    // Устанавливаем подпись для увеличенного изображения
    
    popupImageZoom.querySelector('.popup__image').src = link
    // Устанавливаем ссылку на изображение

    popupOpen(popupImageZoom)
    // Открываем popup увеличения изображения
  }

  copyCardTemplate.querySelector('.cards__image').addEventListener('click', getZoomImages)
  // Назначаем обработчик клика на изображение карточки

  return copyCardTemplate
  // Возвращаем готовую карточку
}


// Функция сохранения карточек
const integrationCard = function (evt) {
  evt.preventDefault()
  // Предотвращаем стандартное поведение формы (перезагрузку страницы)

  cardsArea.prepend(addCards(nameCardInput.value, linkCardInput.value))
  // Добавляем новую карточку в начало списка карточек

  popupClose(popupCards)
  // Закрываем popup добавления карточки
}


// Функция наполнения страницы начальными карточками
const integrationInitialCards = function () {
  initialCards.forEach(function (card) {
    cardsArea.append(addCards(card.name, card.link))
    // Добавляем каждую начальную карточку на страницу
  })
}


// Вызываем функцию для добавления начальных карточек при загрузке страницы
integrationInitialCards()


// Функция сохранения введённых в форму данных (имени и описания)
const formSubmitHandler = function (evt) {
  evt.preventDefault()
  // Предотвращаем стандартное поведение формы (перезагрузку страницы)

  profileName.textContent = nameInput.value
  // Обновляем имя пользователя

  profileDescription.textContent = descriptionInput.value
  // Обновляем описание профиля

  popupClose(popupProfile)
  // Закрываем popup редактирования профиля
}


// Обработчики событий для открытия/закрытия popup и обработки данных
editProfileIcon.addEventListener('click', () => popupOpen(popupProfile))
// Открываем popup редактирования профиля

addCardIcon.addEventListener('click', () => popupOpen(popupCards))
// Открываем popup добавления карточки

popupProfileCloseIcon.addEventListener('click', () => popupClose(popupProfile))
// Закрываем popup редактирования профиля

popupCardsCloseIcon.addEventListener('click', () => popupClose(popupCards))
// Закрываем popup добавления карточки

popupImageZoomCloseIcon.addEventListener('click', () => popupClose(popupImageZoom))
// Закрываем popup увеличенного изображения

popupProfile.addEventListener('submit', formSubmitHandler)
// Сохраняем данные профиля при отправке формы

popupCards.addEventListener('submit', integrationCard)
// Добавляем новую карточку при отправке формы

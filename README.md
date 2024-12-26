# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack, JavaScript, TypeScript

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с компонентами модели
- src/components/view/ — папка с View компонентами
- src/components/common/ — папка с переиспользуемыми компонентами
- src/components/model/ — папка с компонентами Модели
- src/components/base/ — папка с базовым кодом
- src/types/ — папка с типами

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами
- src/components/LarekAPI.ts — файл с функциями API

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовый код
Архитектура проекта реализована через централизованный брокер событий IEvents.

### Абстрактный Класс Component
Описывает контейнер для объектов отображения.
* ``render(data?: Partial<T>): HTMLElement`` - Обновление контейнера модели отображения

### Класс EventEmitter
Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков
о наступлении события.
 * ``on(): void`` - подписка на событие,
 * ``off(): void`` - снятие слушателя с события,
 * ``emit(): void`` - уведомления подписчиков о наступлении события,
 * ``trigger(): Product`` - открыть карточку Продукта,

### Класс Modal
Описывает контейнер для модальных окон.
 * ``open`` - Открытие модального окна,
 * ``close`` - Закрытие модального окна, 
 * ``closeButtonElement: HTMLButtonElement`` - Кнопка закрытия модального окна
 * ``events: IEvents`` - экземпляр Брокера событий
 * ``handleEscUp(evt: KeyboardEvent)`` - обработчик Escape

### Класс Api
Описывает базовый класс для работы с сервером.
* ``baseUrl: string`` - Базовая часть url
* ``options: RequestInit;`` - Параметры запроса,
* ``handleResponse(response: Response): Promise`` - Обработка полученного ответа от сервера
* ``post(uri: string, data: object, method)`` - post запрос
* ``get(uri: string)`` - get запрос


## Компоненты модели данных (бизнес-логика)

### 1.Класс Card
Используется для описания сущности Продукта, который можно купить.  
 * ``id: string`` - Уникальный идентификатор,  
 * ``description: string`` - Описание продукта,  
 * ``image: string`` - Фотография продукта,  
 * ``title: string`` - Заголовок продукта,  
 * ``category: string`` - Категория продукта,  
 * ``price: number`` - Цена продукта;   

### 2. Класс CardsData  
Описывает профиль пользователя, оформляющего заказ на покупку товара(ов)  
В качестве данных профиля пользователя используются:  


### 3. Класс Order  
Описывает заказ оформленный на портале.   
Связан с Классом Card   
Содержит данные по пользователю, оформляющего заказ и данные по продуктам добавленные в корзину,  
 * ``productList: Product[]`` - Список продуктов,   
 * ``totalCost: number`` - Общая стоимость товаров в корзине,   
 * ``payType: PayType`` - Тип доставки;    
 *  ``deliveryAddress: string`` - Адрес доставки,
 * ``phoneNumber: number`` - Номер телефона пользователя,
 * ``email: string`` - Электронный почтовый ящик пользователя;

Описывает методы:
* ``enterDeliveryAddress() string`` - Ввести адрес доставки,
* ``enterPhoneNumber(): string`` - Указать номер телефона пользователя,
* ``enterEmail(): string`` - Указать электронный адрес пользователя;
 * ``removeProduct(id:string): boolean`` - Удалить добавленный продукт из заказа,  
 * ``selectPayType(type: PayType): void`` - Указать тип оплаты, при оформлении заказа; 


## Компоненты представления
CardsContainer +
ModalWithConfirm +
ModalWithPayment +
ModalWithUserInfo +
CardView +
ModalWithCard +
ModalWithOrder ?


### Класс CardsContainer
Отвечает за отображение карточек на главной странице
 * ``_items: Partial<CardView>`` - Список карточек
 * ``_catalog: HTMLElement`` - Контейнер, в который будут помещены карточки

### Класс CardView
Класс отвечает за отображение карточки
* ``events: IEvents;`` - Слушатель событий
* ``_image?: HTMLImageElement`` - Изображение Карточки
* ``_title: HTMLElement`` - Заголовок Карточки
* ``_category?: HTMLElement`` - Категория Карточки
* ``_description?: HTMLElement`` - Описание Карточки
* ``_price: HTMLElement`` - Цена Карточки
* ``_id: string`` - id Карточки 
* ``removeCard()`` - Удалить элемент Карточки 
* ``render(cardData?: Partial<`ICard`>): HTMLElement`` - Родительский метод перерисовки Карточки 
* ``render(cardData: Partial<`ICard`> | undefined): HTMLElement`` - Перегруженный метод перерисовки Карточки

### Класс ModalWithCard  
Отвечает за отображение поп-ап формы c карточкой
* ``_card: HTMLElement``- Элемент самой Карточки
* ``_image: HTMLImageElement``- Элемент отображения картинки Карточки
* ``_category: HTMLElement`` - Элемент отображения категории Карточки
* ``_title: HTMLElement``- Элемент отображения заголовка Карточки
* ``_description: HTMLElement`` - Элемент отображения описания Карточки
* ``_price: HTMLElement`` - Элемент отображения цены Карточки
* `_id: string` - id Карточки
* * `_placeToBasketButton: HTMLButtonElement` - Кнопка помещения Карточки в Корзину
* ``toggleButtonSubmitStatus(valid: boolean)`` - Активирование/ Деактивирование кнопки подтверждения
* ``set currentCard({id, image, category, title, description, price})`` - Установить параметры Карточки отображения
* ``getInputValues()`` - Получить данные выбранной Карточки, для отображения
* ``close()`` - Закрытие формы;

### Класс ModalWithOrder  
Отвечает за отображение текущей корзины пользователя. Отображение связано с данными Карточки
* ``_items: NodeListOf<`HTMLElement`>`` - Список элементов отображения Карточек в корзине  
* ``_total: HTMLElement`` - Элемент отображения общей стоимости корзины
* ``_index: HTMLElement``- Элемент отображения нумерации Карточек в корзине
* ``_orderButtonElement: HTMLButtonElement`` - Кнопка для оформления Заказа
* ``events: IEvents`` - Слушатель событий
* ``_basket: HTMLElement`` - Элемент корзины, хранящий список карточек
* ``_basketCount: HTMLElement`` - Элемент отображения количества товаров в Корзине
* ``_removeButtonElement: HTMLButtonElement`` - Элемент удаления Карточки из Корзины
* ``updateButtonSubmitStatus()`` - Метод для обновления состояния Кнопки оформления Заказа
* ``get basketCount()`` - Метод получение актуального количества Карточек в Корзине 
* ``updateIndex() `` - Метод проставления актуальной нумерации Карточек в Корзине
* ``set items(items: HTMLElement)`` - Метод установки Карточек в Корзине
* ``getOrder()`` - Метод получения информации по Заказу

### Класс ModalWithPayment  
Отвечает за отображение поп-ап формы, для заполнения адреса и выбора типа оплаты заказа.
Отображение вязано с данными Заказа.
*  ``_address: HTMLElement`` - Адрес покупателя
*  ``_paymentTypeButtonElement: NodeListOf<`HTMLButtonElement`>`` - Кнопки выбора типа оплаты
*  ``inputs: NodeListOf<`HTMLInputElement`>`` - Формы ввода в блоке формы
*  ``errors: Record<string, HTMLElement>`` - Ошибка ввода
*  ``formName: string`` - Имя формы
*  ``submitButton: HTMLButtonElement`` - Кнопка подтверждения введенных значений
*  ``_form: HTMLFormElement`` - форма окна
*  ``_buttonActive: HTMLElement`` - кнопка с выбранным типом оплаты
*  ``close(): void`` - Кнопка закрытия формы;
*  ``getDefaultPayment()`` - Получить значение типа оплаты по умолчанию
*  ``getPaymentValue()`` - Получить значение типа оплаты
*  ``getInputValues()`` - Получить значение адреса


### Класс ModalWithUserInfo
Отвечает за отображение поп-ап формы c карточкой
*  ``_email: HTMLElement`` - Email покупателя
*  ``_phone: HTMLElement`` - Номер телефона покупателя
*  ``_fields: HTMLElement`` - Блоки формы
*  ``inputs: NodeListOf<`HTMLInputElement`>`` - Формы ввода в блоке формы
*  ``errors: Record<string, HTMLElement>`` - Ошибка ввода
*  ``formName: string`` - Имя формы
*  ``submitButton: HTMLButtonElement`` - Кнопка подтверждения введенных значений
*  ``_form: HTMLFormElement`` - форма окна
*  ``getInputValues()`` - получить заполненные данные
*  ``set inputValues(data: Record<string, string>)`` - установить значения полей
*  ``close(): void`` - Кнопка закрытия формы;

### Класс ModalWithConfirm  
Отвечает за отображение поп-ап формы успешного совершения заказа
* ``_description: HTMLImageElement`` - Итоговая стоимость заказа 
* ``successButtonElement: HTMLButtonElement`` - Кнопка завершения покупки
* ``_form: HTMLElement`` - Форма окна

## Состояние приложения: 
 * ``initialData:loaded`` - Карточки загружены на главную страницу
 * ``cards:changed`` - Состав карточек изменился
 * ``card:select`` - Открыт попап карточки
 * ``card:delete`` - Карточка удалена из корзины
 * ``card:submit`` - Карточка добавлена в корзину заказа
 * ``order:submit`` - Изменены состав корзины
 * ``order:itemsCountUpdate`` - Обновлено количество карточек в корзине
 * ``order:complete`` - Заказ успешно завершен
 * ``payment:paymentTypeSelect`` - Выбран тип оплаты
 * ``payment:addressEntered`` - Выбран адрес доставки
 * ``payment:submit`` - Утвержден тип оплаты и адрес доставки
 * ``user-info:input`` - Введены данные пользователя (телефон, email)
 * ``user-info:submit`` - Утверждены данные пользователя






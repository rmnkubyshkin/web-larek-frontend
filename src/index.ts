import './scss/styles.scss';
import {EventEmitter} from "./components/base/events";
import {CardData} from "./components/model/CardsData";
import {Order} from "./components/model/Order";
import {LarekAPI} from "./components/LarekAPI";
import {IApi} from "./types";
import {Api} from "./components/base/api";
import {API_URL, settings, state} from "./utils/constants";
import {CardView} from "./components/view/CardView";
import {CardsContainer} from "./components/view/CardsContainer";
import {cloneTemplate} from "./utils/utils";

import {ModalWithConfirm} from "./components/view/ModalWithConfirm";
import {ModalWithPayment} from "./components/view/ModalWithPayment";
import {ModalWithOrder} from "./components/view/ModalWithOrder";
import {ModalWithCard} from "./components/view/ModalWithCard";
import {ModalWithUserInfo} from "./components/view/ModalWithUserInfo";


const baseApi: IApi = new Api(API_URL, settings);
const api = new LarekAPI(baseApi);
const events = new EventEmitter();
const cardBasket: HTMLTemplateElement = document.querySelector('#card-basket');
const cardCatalogTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const cardContainer = new CardsContainer(document.querySelector('.gallery'));
const headerBasket = document.querySelector('.header__basket');

const modalConfirm = new ModalWithConfirm(document.querySelector('#modal-success'), events);
const modalPayment = new ModalWithPayment(document.querySelector('#modal-payment'), events);
const modalOrder = new ModalWithOrder(document.querySelector('#modal-order'), events);
const modalCard = new ModalWithCard(document.querySelector('#modal-card'), events);
const modalUserinfo = new ModalWithUserInfo(document.querySelector('#modal-user-info'), events);
const cardData = new CardData(events);
const orderData = new Order(events);

headerBasket.addEventListener('click', () => {
    modalOrder.open();
})

//Получаем карточки с сервера
api.getCards()
    .then(r =>  {
        cardData.items = r;
        events.emit(state.initialDateLoaded, cardData.items);
    })
    .catch((err) => {
        console.error(err);
    });

events.on(state.initialDateLoaded, () => {
    const arrayCards: HTMLElement[] = [];
    cardData.items.map((card) => {
        const cardInstant = new CardView(cloneTemplate(cardCatalogTemplate), events);
        arrayCards.push(cardInstant.render(card));
    });
    return cardContainer.render({catalog: arrayCards});
});

events.on(state.cardSelect, (data: {card: CardView}) => {
    const {card} = data;
    const {id, image, price, category, title, description} = cardData.getCard(card.id);
    cardData.preview = card.id;
    const currentCard = {id, image, price, category, title, description};
    modalCard.render({currentCard});
});

let currentAddress: string ="";
let currentPayment: string ="";
let currentPhone: string ="";
let currentEmail: string ="";

events.on(state.paymentTypeSelect, (data: {name:string, value:string}) => {
    currentPayment = data.value;
});

events.on(state.paymentAddressEntered, (data: {field:string, value:string}) => {
    currentAddress = data.value;
    const error = {
        field: data.field,
        value: currentAddress,
        message: "Необходимо заполнить адрес доставки"
    };
    modalPayment.valid = !currentAddress;
    modalPayment.render({error});
});

events.on(state.paymentSubmit, () => {
    orderData.address = currentAddress;
    if (currentPayment) {
        orderData.payment = currentPayment;
    } else {
        orderData.payment = modalPayment.getDefaultPayment();
    }
});

events.on(state.userInfoInput, (data: {field:string, value:string}) => {
    let error = {}
    if (data.field == "email") {
        currentEmail = data.value;
        error = {
            field: data.field,
            value: currentEmail,
            message: "Необходимо ввести email"
        }
    } else if (data.field == "phone") {
        currentPhone = data.value;
        error = {
            field: data.field,
            value: currentPhone,
            message: "Необходимо ввести номер телефона"
        }
    }
    modalUserinfo.valid = currentPhone && currentEmail != "";
    modalUserinfo.render({error});
});

events.on(state.userInfoSubmit, () => {
    modalUserinfo.close();
    orderData.phone = currentPhone;
    orderData.email = currentEmail;
    orderData.updateNanCostCard();
    api.placeAnOrder(orderData).then((response) => {
        modalConfirm.description = response.total;
        modalConfirm.container.classList.add('modal_active');
    })

});

events.on(state.cardSubmit, () => {
    modalCard.close();
    const {id, price, title } = cardData.getCard(cardData.preview);
    orderData.addCard(cardData.getCard(cardData.preview));
    const currentCard = {id, price, title};
    const basketCard = new CardView(cloneTemplate(cardBasket), events);
    const elementBasketCard = basketCard.render(currentCard);
    const  order = {items: elementBasketCard, total: orderData.total};
    modalOrder.render(order);
    modalOrder.open();
});

events.on(state.cardDelete, (data: {card: CardView}) => {
    orderData.removeCard(cardData.getCard(data.card.id));
    modalOrder.basketCount = orderData.count;
    modalOrder.render({cards: orderData.items, total: orderData.total});
});

events.on(state.orderSubmit, () => {
    modalOrder.close();
    modalPayment.open();
    modalPayment.render()
});

events.on(state.paymentSubmit, () => {
    const defaultPayment = document.querySelector('.button_alt_active');
    orderData.payment = defaultPayment.textContent;

    modalPayment.close();
    modalUserinfo.open();
})

events.on(state.orderItemsCountUpdate, () => {
    modalOrder.basketCount = orderData.count;
});

events.on(state.orderComplete, () => {
    orderData.items = [];
    orderData.buyingCards = [];
    modalOrder.render();
    location.reload();
});
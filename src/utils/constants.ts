export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
    headers: {
        authorization: `${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
    },
};

export const state = {
    initialDateLoaded :"initialData:loaded",
    cardsChanged: "cards:changed",
    cardSelect: "card:select",
    cardDelete: "card:delete",
    cardSubmit: "card:submit",
    orderSubmit: "order:submit",
    orderItemsCountUpdate: "order:itemsCountUpdate",
    orderComplete: "order:complete",
    paymentTypeSelect: "payment:paymentTypeSelect",
    paymentAddressEntered: "payment:addressEntered",
    paymentSubmit: "payment:submit",
    userInfoInput: "user-info:input",
    userInfoSubmit: "user-info:submit",
}







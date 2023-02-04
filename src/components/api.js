import {request} from "../utils/utils";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'd4f12ba4-cfb9-42d3-9303-686a046acbd3',
    'Content-Type': 'application/json'
  }
}

export const getUser = () => request(`${config.baseUrl}/users/me`, {headers: config.headers})
export const editAvatar = (avatar) => request(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify(avatar)
})
export const editUser = (user) => request(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify(user)
})
export const getInitialCards = () => request(`${config.baseUrl}/cards`, {headers: config.headers})
export const sendCard = (card) => request(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify(card)
})
export const likeCard = (cardID) => request(`${config.baseUrl}/cards/likes/${cardID}`, {
  method: 'PUT',
  headers: config.headers,
})
export const unlikeCard = (cardID) => request(`${config.baseUrl}/cards/likes/${cardID}`, {
  method: 'DELETE',
  headers: config.headers,
})
export const deleteCard = (cardID) => request(`${config.baseUrl}/cards/${cardID}`, {
  method: 'DELETE',
  headers: config.headers,
})

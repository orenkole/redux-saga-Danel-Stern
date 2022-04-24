import { fork, put, take } from "@redux-saga/core/effects";
import fetch from "isomorphic-fetch";

import { setItemDetails, SET_CART_ITEMS } from "../actions";

export function* loadItemDetails(item) {
  console.log(' ---- ITEM ---- ', item);
  const {id} = item;
  const response = yield fetch(`http://localhost:8081/items/${id}`)
  const data = yield response.json();
  const info = data[0];
  yield put(setItemDetails(info))
}

export function* itemDetailsSaga() {
  const {items} = yield take(SET_CART_ITEMS)

  yield items.map(item => {
    console.log(' --- ITEM 0 --- ', item)
    return fork(loadItemDetails, item)
  })
}
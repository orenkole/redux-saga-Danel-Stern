import { put, select, takeLatest } from "@redux-saga/core/effects";
import fetch from "isomorphic-fetch";

import {
  DECREASE_ITEM_QUANTITY,
  INCREASE_ITEM_QUANTITY,
  SET_CART_ITEMS,
  FETCHING,
  FETCHED,
  setShippingCost,
} from "../actions"
import { setShippingFetchStatus } from "../actions/setShippingFetchStatus"
import { cartItemsSelector } from "../selectors"

function* shipping() {
  yield put(setShippingFetchStatus(FETCHING))
  const items = yield select(cartItemsSelector);

  const itemRequestString = items.reduce((string, item) => {
    for (let i = 0; i < item.get('quantity'); i++) {
      string += item.get('id') + ",";
    }
    return string;
  }, "").replace(/,\s*$/,'');
  console.info("Made item request string", itemRequestString)

  const response = yield fetch(`http://localhost:8081/shipping/${itemRequestString}`)
  const {total} = yield response.json();
  yield put(setShippingCost(total));
  yield put(setShippingFetchStatus(FETCHED));
}

export function* shippingSaga() {
  yield takeLatest([
    SET_CART_ITEMS,
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY
  ],
  shipping)
}
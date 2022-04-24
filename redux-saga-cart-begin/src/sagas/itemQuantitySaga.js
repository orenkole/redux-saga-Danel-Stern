import { takeLatest } from "@redux-saga/core/effects";
import { decreaseItemQuantity, DECREASE_ITEM_QUANTITY, FETCHED, FETCHING, INCREASE_ITEM_QUANTITY, setItemQuantityFetchStatus } from "../actions";
import { currentUserSelector } from "../selectors";

export function* handleDecreaseItemQuantity({id}) {
  yield put(setItemQuantityFetchStatus(FETCHING))
  const user = yield select(currentUserSelector);
  const response = yield call(fetch, `http://localhost:8081/cart/remove/${user.get('id')}/${id}}`)
  console.info("Get response", response);

  if(response.status !== 200) {
    yield put(decreaseItemQuantity(id, true))
    alert("Sorry, there weren't enought items in stock to complete your request")
  }

  yield put(setItemQuantityFetchStatus(FETCHED))
}

export function* handleIncreaseItemQuantity({id}) {
  yield put(setItemQuantityFetchStatus(FETCHING))
  const user = yield select(currentUserSelector);
  const response = yield call(fetch, `http://localhost:8081/cart/add/${user.get('id')}/${id}}`)
  console.info("Get response", response);

  if(response.status !== 200) {
    yield put(decreaseItemQuantity(id, true))
    alert("Received non 200 status")
  }

  yield put(setItemQuantityFetchStatus(FETCHED))
}

export function* itemQuantitySaga () {
  yield [
    takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
    takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity)
  ]
}
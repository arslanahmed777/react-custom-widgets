import { all, call } from "redux-saga/effects";
import { userSagas } from "./User/UserSagas";

export function* rootSaga() {
  yield all([call(userSagas)]);
}

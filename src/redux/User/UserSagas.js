import { takeLatest, all, put, call } from "redux-saga/effects";
import { userActionTypes } from "./UserActionTypes";
import {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
} from "./UserActions";

import { callPublicApi } from "../../utils/call-api";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    yield put(signInSuccess("df"));
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}
export function* signInWithEmail(data) {
  console.log("signInWithEmail saga run", data);
  try {
    const user = null;
    yield call(callPublicApi, "signin", "post", data)
  } catch (e) {
    // yield put(signInFailure(e.message));
  }
}

export function* signOut() {
  try {
    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(e.message));
  }
}

export function* signUp({ payload: { displayName, email, password } }) {
  try {
    yield put(signUpSuccess("SD"));
  } catch (e) {
    yield put(signUpFailure(e.message));
  }
}
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}
export function* checkIfUserIsAuthenticated() {
  try {
    const userAuth = "dsf";
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}
/////////**********    WATCHET SAGAS ****************   */
export function* onCheckUserSession() {
  yield takeLatest(
    userActionTypes.CHECK_USER_SESSION,
    checkIfUserIsAuthenticated
  );
}
export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}

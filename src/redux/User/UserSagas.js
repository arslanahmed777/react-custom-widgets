import { takeLatest, all, put, call } from "redux-saga/effects";
import { userActionTypes } from "./UserActionTypes";
import {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
} from "./UserActions";

import { callPublicApi } from "../../utils/call-api";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    yield put(signInSuccess("df"));
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}
export function* signInWithEmail({ payload }) {
  try {
    const response = yield call(callPublicApi, "signin", "post", payload);
    if (response.error) {
      yield put(signInFailure(response.error));
    } else {
      yield put(signInSuccess(response));
    }
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}



export function* signUp({ payload }) {
  try {
    const response = yield call(callPublicApi, "signup", "post", payload);
    console.log(response);
    if (response.error) {
      yield put(signInFailure(response.error));
    } else {
      yield put(signInSuccess(response));
    }
  } catch (e) {
    yield put(signUpFailure(e.message));
  }
}
export function* signInAfterSignUp(data) {
  yield signInWithEmail(data);
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

export function* signOut() {
  try {
    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(e.message));
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

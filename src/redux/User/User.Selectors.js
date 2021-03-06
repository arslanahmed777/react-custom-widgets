import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);

export const selectUserLoadingState = createSelector(
    [selectUser],
    user => user.loading
);

export const selectUserErrors = createSelector(
    [selectUser],
    user => user.error
);
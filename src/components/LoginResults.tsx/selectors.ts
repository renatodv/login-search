import { createSelector } from "reselect";

import type { StateT } from "../../providers/LoginProvider";

type LoginT = {
  avatarUrl: string;
  login: string;
  type: string;
};

export type LoginsT = Array<LoginT>;

const getItems = (state: StateT) => state.results?.items || [];
export const getTotalCount = (state: StateT) => state.results?.total_count;
export const getPage = (state: StateT) => state.page;
export const getLogin = (state: StateT) => state.login;
export const getLoading = (state: StateT) => state.loading;
export const getError = (state: StateT) => state.error;

export const getLogins = createSelector(getItems, (items): LoginsT => {
  return items.map((item: any) => ({
    avatarUrl: item.avatar_url,
    login: item.login,
    type: item.type,
  }));
});

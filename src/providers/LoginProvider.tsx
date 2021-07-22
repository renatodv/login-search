import React from "react";

type LoginProviderT = {
  children: React.ReactNode;
};

type LoginT = {
  avatar_url: string;
  login: string;
  type: string;
};

export type StateT = {
  results: {
    items: Array<LoginT>;
    total_count: number;
  };
  loading: boolean;
  error?: string;
  page: number;
  login: string;
};

export type GetResultsT = (
  login: string,
  page?: number
) => Promise<void> | undefined;

export const ITEMS_PER_PAGE = 9;

export const initialState = {
  state: {
    results: {
      items: [],
      total_count: 0,
    },
    loading: false,
    page: 0,
    login: "",
  },
  getResults: () => undefined,
};

export const LoginContext = React.createContext<{
  state: StateT;
  getResults: GetResultsT;
}>(initialState);

const fetchLogins = async (login: string, page: number) => {
  const apiRequiredPage = page + 1;
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${login}&per_page=${ITEMS_PER_PAGE}&page=${apiRequiredPage}`
    );
    if (!response.ok) {
      throw new Error("The response is not OK.");
    }
    const results = await response.json();
    return results;
  } catch (error) {
    throw error.message;
  }
};

const LoginProvider = ({ children }: LoginProviderT) => {
  const [state, setState] = React.useState(initialState.state);
  const getResults = React.useCallback(
    async (login: string, page: number = 0) => {
      setState((prevState) => ({ ...prevState, loading: true }));
      try {
        const results = await fetchLogins(login, page);
        setState((prevState) => ({ results, loading: false, page, login }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error: error }));
      }
    },
    []
  );
  return (
    <LoginContext.Provider value={{ state, getResults }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

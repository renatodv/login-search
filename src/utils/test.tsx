import { LoginContext } from "../providers/LoginProvider";
import type { StateT, GetResultsT } from "../providers/LoginProvider";

type TestProvidersT = {
  children: React.ReactNode;
  loginProvider: {
    state: StateT;
    getResults: GetResultsT;
  };
};

/**
 * This is a mocked provider that allows to pass a custom state to create unit tests.
 * @param {object} props
 * @param {React.ReactNode} props.children - content to be rendered inside the provider
 * @param {object} props.loginProvider - the login provider custom state.
 */
export const TestProviders = ({ children, loginProvider }: TestProvidersT) => {
  return (
    <LoginContext.Provider value={loginProvider}>
      {children}
    </LoginContext.Provider>
  );
};

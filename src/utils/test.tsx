import { LoginContext } from "../providers/LoginProvider";
import type { StateT, GetResultsT } from "../providers/LoginProvider";

type TestProvidersT = {
  children: React.ReactNode;
  loginProvider: {
    state: StateT;
    getResults: GetResultsT;
  };
};

export const TestProviders = ({ children, loginProvider }: TestProvidersT) => {
  return (
    <LoginContext.Provider value={loginProvider}>
      {children}
    </LoginContext.Provider>
  );
};

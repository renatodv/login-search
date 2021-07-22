import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import LoginResults from "./index";
import { TestProviders } from "../../utils/test";
import { initialState } from "../../providers/LoginProvider";

const mockedItems = [
  {
    avatar_url: "https://avatars.githubusercontent.com/u/383316?v=4",
    login: "beta",
    type: "User",
  },
  {
    avatar_url: "https://avatars.githubusercontent.com/u/383316?v=4",
    login: "alpha",
    type: "User",
  },
];

describe("<LoginResults />", () => {
  it("should display the correct message when there are not results", () => {
    render(
      <TestProviders loginProvider={initialState}>
        <LoginResults />
      </TestProviders>
    );
    expect(
      screen.getByText("There are no results at the moment.")
    ).toBeInTheDocument();
  });
  it("should display the progress bar when the data is loading", () => {
    const loginProvider = {
      ...initialState,
      state: {
        ...initialState.state,
        loading: true,
      },
    };
    render(
      <TestProviders loginProvider={loginProvider}>
        <LoginResults />
      </TestProviders>
    );
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
  it("should display the erorr alert when there is an error", () => {
    const loginProvider = {
      ...initialState,
      state: {
        ...initialState.state,
        error: "this is an error",
      },
    };
    render(
      <TestProviders loginProvider={loginProvider}>
        <LoginResults />
      </TestProviders>
    );
    expect(screen.getByText("this is an error")).toBeInTheDocument();
  });
  it("should display the records when there are results", () => {
    const loginProvider = {
      ...initialState,
      state: {
        ...initialState.state,
        results: {
          items: mockedItems,
          total_count: 1,
        },
      },
    };
    render(
      <TestProviders loginProvider={loginProvider}>
        <LoginResults />
      </TestProviders>
    );
    expect(screen.getByText("alpha")).toBeInTheDocument();
  });
  it("should call getResults when using the next pagination", async () => {
    const getResults = jest.fn();
    let items = [];
    for (let i = 0; i <= 8; i++) {
      items.push({
        avatar_url: "https://avatars.githubusercontent.com/u/383316?v=4",
        login: `testlogin${i}`,
        type: "User",
      });
    }
    const loginProvider = {
      ...initialState,
      state: {
        ...initialState.state,
        results: {
          items,
          total_count: 100,
        },
        login: "test",
      },
      getResults,
    };
    render(
      <TestProviders loginProvider={loginProvider}>
        <LoginResults />
      </TestProviders>
    );
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(await waitFor(() => getResults)).toHaveBeenCalledWith("test", 1);
  });
  it("should call getResults when using the back pagination", async () => {
    const getResults = jest.fn();
    let items = [];
    for (let i = 0; i <= 8; i++) {
      items.push({
        avatar_url: "https://avatars.githubusercontent.com/u/383316?v=4",
        login: `testlogin${i}`,
        type: "User",
      });
    }
    const loginProvider = {
      ...initialState,
      state: {
        ...initialState.state,
        results: {
          items,
          total_count: 100,
        },
        login: "test",
        page: 1,
      },
      getResults,
    };
    render(
      <TestProviders loginProvider={loginProvider}>
        <LoginResults />
      </TestProviders>
    );
    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(await waitFor(() => getResults)).toHaveBeenCalledWith("test", 0);
  });
  it("should sort results asc by default", () => {
    const loginProvider = {
      ...initialState,
      state: {
        ...initialState.state,
        results: {
          items: mockedItems,
          total_count: 2,
        },
      },
    };
    render(
      <TestProviders loginProvider={loginProvider}>
        <LoginResults />
      </TestProviders>
    );
    expect(
      screen.getByTestId("login-results-span-login-index-0")
    ).toHaveTextContent("alpha");
    expect(
      screen.getByTestId("login-results-span-login-index-1")
    ).toHaveTextContent("beta");
  });
  it("should sort the results by desc when clicking on the login column", () => {
    const loginProvider = {
      ...initialState,
      state: {
        ...initialState.state,
        results: {
          items: mockedItems,
          total_count: 2,
        },
      },
    };
    render(
      <TestProviders loginProvider={loginProvider}>
        <LoginResults />
      </TestProviders>
    );
    fireEvent.click(screen.getByTestId("login-results-sort-span"));
    expect(
      screen.getByTestId("login-results-span-login-index-0")
    ).toHaveTextContent("beta");
    expect(
      screen.getByTestId("login-results-span-login-index-1")
    ).toHaveTextContent("alpha");
  });
  it("should sort back the results when clicking twice the sorting column", () => {
    const loginProvider = {
      ...initialState,
      state: {
        ...initialState.state,
        results: {
          items: mockedItems,
          total_count: 2,
        },
      },
    };
    render(
      <TestProviders loginProvider={loginProvider}>
        <LoginResults />
      </TestProviders>
    );
    fireEvent.click(screen.getByTestId("login-results-sort-span"));
    fireEvent.click(screen.getByTestId("login-results-sort-span"));
    expect(
      screen.getByTestId("login-results-span-login-index-0")
    ).toHaveTextContent("alpha");
    expect(
      screen.getByTestId("login-results-span-login-index-1")
    ).toHaveTextContent("beta");
  });
});

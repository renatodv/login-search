import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import LoginProvider, { LoginContext } from "./LoginProvider";

afterEach(() => {
  jest.restoreAllMocks();
});

const LoginConsumer = () => {
  const { state, getResults } = React.useContext(LoginContext);
  return (
    <div>
      <div>Items: {state.results.items.length}</div>
      <div>Error: {state.error}</div>
      <button onClick={() => getResults("test", 1)}>Get Results</button>
    </div>
  );
};

const LoginConsumerInitialValues = () => {
  const { getResults } = React.useContext(LoginContext);
  return <button onClick={() => getResults("test", 1)}>Get Results</button>;
};

describe("<LoginProvider />", () => {
  it("getResults should be initialized", () => {
    render(<LoginConsumerInitialValues />);
    fireEvent.click(screen.getByText("Get Results"));
    expect(screen.getByText("Get Results")).toBeInTheDocument();
  });
  it("should initialize with empty array of items", () => {
    render(
      <LoginProvider>
        <LoginConsumer />
      </LoginProvider>
    );
    expect(screen.getByText("Items: 0")).toBeInTheDocument();
  });
  it("should call fetch when calling getResults", async () => {
    const fetch = jest.fn();
    jest.spyOn(global, "fetch").mockImplementation((url) => fetch(url));
    render(
      <LoginProvider>
        <LoginConsumer />
      </LoginProvider>
    );
    fireEvent.click(screen.getByText("Get Results"));
    expect(await waitFor(() => fetch)).toHaveBeenLastCalledWith(
      "https://api.github.com/search/users?q=test&per_page=9&page=2"
    );
  });
  it("should assign an error when fetch failed", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("this is an error."));
    render(
      <LoginProvider>
        <LoginConsumer />
      </LoginProvider>
    );
    fireEvent.click(screen.getByText("Get Results"));
    expect(await screen.findByText(/this is an error./)).toBeInTheDocument();
  });
  it("should assign an error when fetch response is not ok", async () => {
    // not require since it's just a mocked response
    // @ts-ignore"
    jest.spyOn(global, "fetch").mockResolvedValueOnce({ ok: false });
    render(
      <LoginProvider>
        <LoginConsumer />
      </LoginProvider>
    );
    fireEvent.click(screen.getByText("Get Results"));
    expect(
      await screen.findByText(/The response is not OK./)
    ).toBeInTheDocument();
  });
  it("should have items when the response from fetch is successful", async () => {
    // not require since it's just a mocked response
    // @ts-ignore"
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => new Promise((resolve) => resolve({ items: [1] })),
    });
    render(
      <LoginProvider>
        <LoginConsumer />
      </LoginProvider>
    );
    fireEvent.click(screen.getByText("Get Results"));
    expect(await screen.findByText("Items: 1")).toBeInTheDocument();
  });
});

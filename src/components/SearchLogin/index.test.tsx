import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import SearchLogin from "./index";
import { TestProviders } from "../../utils/test";
import { initialState } from "../../providers/LoginProvider";

describe("<SearchLogin />", () => {
  it("should display the search button and the text input", () => {
    render(
      <TestProviders loginProvider={initialState}>
        <SearchLogin />
      </TestProviders>
    );
    expect(screen.getByTestId("search-login-input")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });
  it("should not allow to submit the form when the input value is empty", async () => {
    render(
      <TestProviders loginProvider={initialState}>
        <SearchLogin />
      </TestProviders>
    );
    fireEvent.click(screen.getByText("Search"));
    expect(await screen.findByText("Login is required.")).toBeInTheDocument();
  });
  it("should call getResults when the form is submited with a valid value", async () => {
    const getResults = jest.fn();
    const logingProvider = {
      ...initialState,
      getResults,
    };
    render(
      <TestProviders loginProvider={logingProvider}>
        <SearchLogin />
      </TestProviders>
    );
    fireEvent.change(screen.getByTestId("search-login-input"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByText("Search"));
    expect(await waitFor(() => getResults)).toHaveBeenLastCalledWith("test");
  });
});

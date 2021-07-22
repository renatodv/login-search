import { render, screen } from "@testing-library/react";

import IndexPage from "./index";
import { TestProviders } from "../utils/test";
import { initialState } from "../providers/LoginProvider";

describe("<IndexPage />", () => {
  it("should display the header title", () => {
    render(
      <TestProviders loginProvider={initialState}>
        <IndexPage />
      </TestProviders>
    );
    expect(screen.getByText("Search for github logins")).toBeInTheDocument();
  });
});

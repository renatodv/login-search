import { render, screen } from "@testing-library/react";

import App from "./App";
import { TestProviders } from "./utils/test";
import { initialState } from "./providers/LoginProvider";

describe("<IndexPage />", () => {
  it("should display app title", () => {
    render(
      <TestProviders loginProvider={initialState}>
        <App />
      </TestProviders>
    );
    expect(screen.getByText("Login Search")).toBeInTheDocument();
  });
});

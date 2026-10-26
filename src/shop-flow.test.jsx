import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "./routes";

const fakeProducts = [
  { id: 1, title: "Backpack", price: 109.95, image: "backpack.jpg" },
  { id: 2, title: "T-Shirt", price: 22.3, image: "tshirt.jpg" },
];

function renderApp(startAt = "/shop") {
  const router = createMemoryRouter(routes, { initialEntries: [startAt] });
  return render(<RouterProvider router={router} />);
}

describe("shopping flow", () => {
  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => fakeProducts,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the products from the API", async () => {
    renderApp();

    expect(
      await screen.findByRole("heading", { name: "Backpack" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "T-Shirt" }),
    ).toBeInTheDocument();
  });

  it("updates the navbar count when adding to the cart", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByRole("heading", { name: "Backpack" });
    expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /increase quantity of backpack/i }),
    );
    await user.click(
      screen.getAllByRole("button", { name: /add to cart/i })[0],
    );

    expect(screen.getByRole("link", { name: "Cart (2)" })).toBeInTheDocument();
  });

  it("shows the item and total on the cart page", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByRole("heading", { name: "Backpack" });
    await user.click(
      screen.getByRole("button", { name: /increase quantity of backpack/i }),
    );
    await user.click(
      screen.getAllByRole("button", { name: /add to cart/i })[0],
    );
    await user.click(screen.getByRole("link", { name: "Cart (2)" }));

    expect(
      screen.getByRole("heading", { name: "Your cart" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Backpack" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Total: $219.90")).toBeInTheDocument();
  });

  it("shows the empty message after removing the last item", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByRole("heading", { name: "Backpack" });
    await user.click(
      screen.getAllByRole("button", { name: /add to cart/i })[0],
    );
    await user.click(screen.getByRole("link", { name: "Cart (1)" }));
    await user.click(
      screen.getByRole("button", { name: /remove backpack from cart/i }),
    );

    expect(
      screen.getByRole("heading", { name: "Your cart is empty" }),
    ).toBeInTheDocument();
  });
});

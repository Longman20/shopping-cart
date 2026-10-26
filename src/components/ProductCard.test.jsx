import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

const product = {
  id: 1,
  title: "Backpack",
  price: 109.95,
  image: "backpack.jpg",
};

describe("ProductCard", () => {
  it("increases the quantity with the + button", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={product} onAdd={vi.fn()} />);

    await user.click(
      screen.getByRole("button", { name: /increase quantity of backpack/i }),
    );

    expect(
      screen.getByRole("spinbutton", { name: /quantity of backpack/i }),
    ).toHaveValue(2);
  });

  it("never goes below 1 with the - button", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={product} onAdd={vi.fn()} />);

    await user.click(
      screen.getByRole("button", { name: /decrease quantity of backpack/i }),
    );

    expect(
      screen.getByRole("spinbutton", { name: /quantity of backpack/i }),
    ).toHaveValue(1);
  });

  it("calls onAdd with the product and the chosen quantity", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<ProductCard product={product} onAdd={onAdd} />);

    const plus = screen.getByRole("button", {
      name: /increase quantity of backpack/i,
    });
    await user.click(plus);
    await user.click(plus);
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(onAdd).toHaveBeenCalledWith(product, 3);
  });
});

# Shopping Cart

A mock online store built with React. Browse products, choose quantities, add them to your cart, and adjust or remove them on the cart page. There's no checkout or payment, since it's a practice project.

Live demo: (https://shopping-cart-eosin-iota-35.vercel.app)

## How to use it

1. Open the Shop page and browse the products.
2. Set a quantity with the input or the + and - buttons.
3. Click "Add to cart".
4. Open the Cart page to change quantities, remove items, and see your total.

## Features

- Three pages (Home, Shop, Cart) with a sticky navigation bar on all of them
- Products fetched from [FakeStore API](https://fakestoreapi.com/)
- Product cards with a quantity input plus increment and decrement buttons
- Cart item count in the navbar that updates in real time
- Cart page where you can change quantities, remove items, and see the total
- Empty cart message with a link back to the shop
- Loading and error states for the API request
- Custom error page for unknown URLs
- Responsive layout that works on phones and desktops
- Tests with Vitest and React Testing Library

## Built with

- [React](https://react.dev/) (hooks: `useState`, `useEffect`)
- [React Router](https://reactrouter.com/) for client-side routing
- [Vite](https://vite.dev/)
- [FakeStore API](https://fakestoreapi.com/)
- [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/) for testing
- Plain CSS (Grid and Flexbox)
- Deployed on [Vercel](https://vercel.com/)

## How it works

The cart state lives in the `Layout` component, which is the closest parent of the navbar and both pages that need the cart. It's passed to the Shop and Cart pages through React Router's `Outlet` context. Values like the item count and the total price are calculated during render instead of being stored as extra state, so they can never go out of sync with the cart.

## Testing

Tests follow the idea of testing what a shopper sees and does, not how the code is built inside.

- **Component tests:** the quantity buttons and the "Add to cart" button on a product card
- **Flow tests:** the real app and routes rendered in a memory router with `fetch` mocked, covering products showing up, the navbar count updating, the cart page showing items and the total, and the empty cart message after removing the last item

Run them with:

```bash
npm run test
```

## What I practiced

- Fetching data with `useEffect`, including a cleanup function to ignore stale responses
- Lifting state up and sharing it with `useOutletContext`
- Layout routes, `Outlet`, `NavLink`, and an `errorElement`
- Updating arrays in state without mutating them
- Testing a full user flow with a mocked network request
- Configuring a single-page app for deployment with a `vercel.json` rewrite

## Run it locally

```bash
git clone https://github.com/Longman20/shopping-cart.git
cd shopping-cart
npm install
npm run dev
```

Then open the local URL that Vite prints in your terminal.

## Project structure

```
tests/
  setup.js
src/
  components/
    Layout.jsx
    Navbar.jsx
    ProductCard.jsx
    CartItem.jsx
  pages/
    Home.jsx
    Shop.jsx
    Cart.jsx
    ErrorPage.jsx
  main.jsx
  routes.jsx
  index.css
```

## Credits

- Product data and images from [FakeStore API](https://fakestoreapi.com/)
- Project idea from [The Odin Project](https://www.theodinproject.com/)

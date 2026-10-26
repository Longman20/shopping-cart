import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div>
      <h1>Oh no, this page doesn't exist!</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
}

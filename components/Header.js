import Link from "next/link";
export default function Header() {
  return (
    <header className="main-header">
      <div className="heading">
        <h1>Akidie</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </li>
          <li>
            <Link href="/signin">
              <a>Sign In</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

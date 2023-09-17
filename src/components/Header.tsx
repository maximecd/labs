import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-6">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Link className="hover:underline" href="/">
              mc/labs
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline"
              target="_blank"
              href="https://maximecd.com"
            >
              portfolio
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

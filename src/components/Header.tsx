import Link from 'next/link'

export default function Header() {
  return (
    <header className="py-6">
      <nav>
        <ul className="flex justify-between">
          <li>
            <Link href="/">mc/labs</Link>
          </li>
          <li>
            <Link href="https://maximecd.com">portfolio</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

import Link, { LinkProps } from 'next/link'

interface UILink extends LinkProps {
  children: React.ReactNode
  target?: string
}

export default function UILink({ children, target, ...props }: UILink) {
  return (
    <Link {...props} target={target} className="text-green-300 hover:underline">
      {children}
    </Link>
  )
}

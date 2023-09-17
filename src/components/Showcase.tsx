'use client'

import { cp } from 'fs'
import { Github, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface ShowcaseProps {
  children: React.ReactNode
}

const Showcase = ({ children }: ShowcaseProps) => {
  const [key, setKey] = useState(Date.now())

  function resetComponent() {
    setKey(Date.now())
  }

  return (
    <div
      key={key}
      className="grid rounded-3xl bg-slate-700 md:grid-cols-[2fr_1fr]"
    >
      {children}
    </div>
  )
}

const ShowcaseComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-[600px]">{children}</div>
}

const ShowcaseContent = ({
  children,
  title,
  resetFunc,
}: {
  children: React.ReactNode
  title: string
  resetFunc: () => void
}) => {
  return (
    <aside className="flex flex-col p-4">
      <button
        aria-label="Reset component to default state"
        onClick={resetFunc}
        className="flex items-center gap-2 text-sm"
      >
        <RotateCcw size={16} />
        Reset
      </button>
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
      <Link
        className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-white  p-3 font-semibold text-slate-900 md:mt-auto"
        href="https://github.com/maximecd/labs"
        target="_blank"
      >
        View source
        <Github size={18} strokeWidth={3} />
      </Link>
    </aside>
  )
}

Showcase.Component = ShowcaseComponent
Showcase.Content = ShowcaseContent

export default Showcase

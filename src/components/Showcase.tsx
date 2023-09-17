interface ShowcaseProps {
  children: React.ReactNode
  cols: number
}

export default function Showcase({ children, cols }: ShowcaseProps) {
  return (
    <div
      style={{
        gridColumn: `span ${cols} / span ${cols}`,
      }}
      className="flex"
    >
      <div
        style={{
          flex: cols,
        }}
      >
        {children}
      </div>
      <aside className="flex-1 bg-slate-700">
        <h2>Inbox component</h2>
      </aside>
    </div>
  )
}

import React, { useState, useRef } from 'react'

interface EmailPreviewProps {
  sender: string
  subject: string
  content: string
  time: Date
  onDelete: () => void
}

export default function EmailPreview({
  sender,
  subject,
  content,
  time,
  onDelete,
}: EmailPreviewProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)

  const dragContainer = useRef<HTMLDivElement | null>(null)
  const parent = useRef<HTMLDivElement | null>(null)
  const background = useRef<HTMLDivElement | null>(null)
  function handleDragStart(e: React.PointerEvent | React.TouchEvent) {
    const clientX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX
    setDragStart(clientX)
    setIsDragging(true)
  }

  function handleDrag(e: React.PointerEvent | React.TouchEvent) {
    if (!isDragging) return

    if (!dragContainer.current) return

    const clientX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX
    const containerX = dragContainer.current.getBoundingClientRect().left
    const moveX = clientX - dragStart

    dragContainer.current.style.transform = `translateX(${moveX}px)`

    const rightSwipe =
      parent.current!.getBoundingClientRect().right -
      dragContainer.current.getBoundingClientRect().right

    const threshold = 0.3

    if (rightSwipe > dragContainer.current.offsetWidth * threshold) {
      background.current!.style.backgroundColor = 'rgb(185, 43, 43)'
    } else {
      background.current!.style.backgroundColor = 'rgb(255, 89, 89)'
    }
  }

  function isTouchEvent(
    e: React.PointerEvent | React.TouchEvent
  ): e is React.TouchEvent {
    return 'touches' in e
  }

  function handleDragEnd() {
    if (!isDragging || !dragContainer.current) return
    setIsDragging(false)
    parent.current!.style.overflow = ''

    const rightSwipe =
      parent.current!.getBoundingClientRect().right -
      dragContainer.current.getBoundingClientRect().right

    const threshold = 0.3

    if (rightSwipe > dragContainer.current.offsetWidth * threshold) {
      onDelete()
      return
    }

    dragContainer.current.style.transition = 'transform 0.2s ease-out'
    dragContainer.current.style.transform = 'translateX(0px)'

    setTimeout(() => {
      dragContainer.current!.style.transition = ''
    }, 200)
  }

  return (
    <div className="relative" ref={parent}>
      <div
        className="relative z-10 bg-slate-900 px-6  hover:bg-slate-800"
        onTouchStart={(e) => handleDragStart(e)}
        onTouchMove={(e) => handleDrag(e)}
        onTouchEnd={() => handleDragEnd()}
        onPointerDown={(e) => handleDragStart(e)}
        onPointerMove={(e) => handleDrag(e)}
        onPointerUp={() => handleDragEnd()}
        ref={dragContainer}
      >
        <div className="flex flex-col gap-1 border-b border-slate-500 py-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold">{sender}</div>
            <div className="font-semibold text-blue-200">
              {time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </div>
          </div>
          <div className="font-semibold">{subject}</div>
          <p className="line-clamp-2 text-sm">{content}</p>
        </div>
      </div>
      <div
        ref={background}
        className="absolute left-0 top-0 h-full w-full transition"
        style={{
          backgroundColor: 'rgb(255, 89, 89)',
        }}
      ></div>
    </div>
  )
}

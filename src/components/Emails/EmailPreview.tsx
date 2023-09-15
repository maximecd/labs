import React, { useState, useRef } from 'react'
import { useDrag } from '@use-gesture/react'

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
  const dragContainer = useRef<HTMLDivElement | null>(null)

  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      if (down) {
        dragContainer.current!.style.transform = `translateX(${mx}px)`
      } else {
        dragContainer.current!.style.transform = `translateX(0px)`
      }
    },
    {
      threshold: 32,
    }
  )

  return (
    <div className="relative">
      <div
        {...bind()}
        ref={dragContainer}
        className="relative z-10 touch-pan-y bg-slate-900  px-6 hover:bg-slate-800"
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
        className="absolute left-0 top-0 h-full w-full transition"
        style={{
          backgroundColor: 'rgb(255, 89, 89)',
        }}
      ></div>
    </div>
  )
}

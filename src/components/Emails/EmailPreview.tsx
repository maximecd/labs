import React, { useState, useRef } from 'react'
import { useDrag } from '@use-gesture/react'
import { useAnimate } from 'framer-motion'
import { Trash2 } from 'lucide-react'

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
  const actionThreshold = 0.22

  const [scope, animate] = useAnimate()

  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      animate(
        '[data-drag-bg]',
        {
          backgroundColor: shouldDelete(mx, scope.current.offsetWidth)
            ? 'rgb(172, 34, 34)'
            : 'rgb(255, 89, 89)',
        },
        {
          duration: 0.1,
        }
      )
      if (down) {
        animate(
          '[data-drag-container]',
          {
            x: mx,
          },
          {
            duration: 0,
          }
        )
      } else if (shouldDelete(mx, scope.current.offsetWidth)) {
        onDelete()
      } else {
        animate('[data-drag-container]', {
          x: 0,
        })
      }
    },
    {
      threshold: 32,
    }
  )

  function shouldDelete(mx: number, width: number) {
    return width + mx < width * (1 - actionThreshold)
  }

  return (
    <div className="relative" ref={scope}>
      <div
        data-drag-container
        {...bind()}
        className="relative z-10 touch-pan-y bg-slate-900  px-6 betterhover:hover:bg-slate-800"
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
        data-drag-bg
        className="absolute left-0 top-0 flex h-full w-full items-center justify-end px-8 transition"
        style={{
          backgroundColor: 'rgb(255, 89, 89)',
        }}
      >
        <Trash2 />
      </div>
    </div>
  )
}

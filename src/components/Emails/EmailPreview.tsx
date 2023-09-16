import React, { useState, useRef } from 'react'
import { useDrag } from '@use-gesture/react'
import { useAnimate } from 'framer-motion'
import { CheckCircle, Circle, Trash2 } from 'lucide-react'

interface EmailPreviewProps {
  sender: string
  subject: string
  content: string
  time: Date
  onDelete: () => void
  onStatusChange: () => void
  read: boolean
}

export default function EmailPreview({
  sender,
  subject,
  content,
  time,
  onDelete,
  onStatusChange,
  read,
}: EmailPreviewProps) {
  const actionThreshold = 0.22

  const [scope, animate] = useAnimate()

  const [xdrag, setXdrag] = useState(0)

  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      setXdrag(mx)
      animate(
        '[data-drag-bg]',
        {
          backgroundColor: getColor(mx, scope.current.offsetWidth),
        },
        {
          duration: 0,
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
      } else if (shouldChangeStatus(mx, scope.current.offsetWidth)) {
        onStatusChange()
        animate('[data-drag-container]', {
          x: 0,
        })
      } else {
        animate('[data-drag-container]', {
          x: 0,
        })
        animate('[data-drag-bg]', {
          backgroundColor: 'rgba(0,0,0,0)',
        })
      }
    },
    {
      threshold: 32,
    }
  )

  function getColor(mx: number, width: number) {
    if (mx < 0) {
      return shouldDelete(mx, width) ? 'rgb(172, 34, 34)' : 'rgb(255, 89, 89)'
    } else {
      return shouldChangeStatus(mx, width)
        ? 'rgb(12, 179, 48)'
        : 'rgb(89, 255, 125)'
    }
  }

  function shouldDelete(mx: number, width: number) {
    return width + mx < width * (1 - actionThreshold)
  }

  function shouldChangeStatus(mx: number, width: number) {
    return width - mx < width * (1 - actionThreshold)
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
        className={`absolute left-0 top-0 flex h-full w-full items-center ${
          xdrag < 0 ? 'justify-end' : 'justify-start'
        } px-8 transition`}
      >
        {getIcon(xdrag, read)}
      </div>
    </div>
  )
}

function getIcon(xdrag: number, read: boolean) {
  if (xdrag < 0) {
    return <Trash2 />
  } else {
    return read ? <Circle /> : <CheckCircle />
  }
}

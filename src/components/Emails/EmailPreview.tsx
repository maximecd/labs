interface EmailPreviewProps {
  sender: string
  subject: string
  content: string
  time: Date
}

export default function EmailPreview({
  sender,
  subject,
  content,
  time,
}: EmailPreviewProps) {
  return (
    <div className="bg-slate-900 px-6 hover:bg-slate-800">
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
  )
}

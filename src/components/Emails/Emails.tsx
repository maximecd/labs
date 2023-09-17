'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EmailPreview from '@/components/Emails/EmailPreview'
import { dummyEmails } from '@/components/Emails/dummy'

interface Email {
  id: number
  read: boolean
  sender: string
  time: Date
  subject: string
  content: string
}

export default function Emails() {
  const tabs = [
    { title: 'All', id: 'all' },
    { title: 'Unread', id: 'unread' },
    { title: 'Read', id: 'read' },
  ]

  const [emails, setEmails] = useState<Email[]>(dummyEmails)

  const [activeTab, setActiveTab] = useState(tabs[0].id)

  const filteredEmails = emails.filter((email) => {
    if (activeTab === 'all') return true
    if (activeTab === 'read') return email.read
    if (activeTab === 'unread') return !email.read
  })

  return (
    <div className="no-scrollbar h-full space-y-4 overflow-y-scroll rounded-3xl border border-slate-700 bg-slate-900 pt-6">
      <h2 className="px-6 text-2xl  font-bold">Inbox</h2>
      <div className="sticky top-0 z-50 px-6">
        <AnimatedTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="select-none overflow-hidden pb-6">
        <AnimatePresence initial={false}>
          {filteredEmails.map((email) => (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: 'auto',
                transition: {
                  type: 'spring',
                  bounce: 0.2,
                },
              }}
              exit={{ opacity: 0, height: 0 }}
              key={email.id}
            >
              <EmailPreview
                sender={email.sender}
                subject={email.subject}
                time={email.time}
                content={email.content}
                onDelete={() => {
                  setEmails((emails) => emails.filter((e) => e.id !== email.id))
                }}
                onStatusChange={() => {
                  setEmails((emails) =>
                    emails.map((e) =>
                      e.id === email.id ? { ...e, read: !e.read } : e
                    )
                  )
                }}
                read={email.read}
              />
            </motion.div>
          ))}
          {filteredEmails.length === 0 && (
            <div className="h-full space-y-4 px-4 pt-8 text-center">
              <div className="italic text-slate-500">
                {"It's very lonely here."}
              </div>
              {emails.length > 0 && (
                <div>
                  You can mark emails as read/unread by swiping left on them.
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function AnimatedTabs({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: { title: string; id: string }[]
  activeTab: string
  setActiveTab: (id: string) => void
}) {
  return (
    <div className="rounded-xl bg-slate-700 bg-opacity-50 p-2 backdrop-blur-lg">
      <div className="isolate flex justify-between ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="color-white relative flex-1 rounded-lg p-2"
            onClick={() => setActiveTab(tab.id)}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                style={{
                  borderRadius: '8px',
                }}
                className="absolute inset-0 bg-white"
              ></motion.div>
            )}
            <span className="relative z-10 mix-blend-difference">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

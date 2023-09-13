'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EmailPreview from '@/components/Emails/EmailPreview'

interface Email {
  id: number
  read: boolean
  sender: string
  time: Date
  subject: string
  content: string
}

const emails: Email[] = [
  {
    id: 1,
    sender: 'Hannah Morgan',
    read: true,
    time: new Date(),
    subject: 'Meeting scheduled',
    content:
      'Hi James, i just scheduled a meeting with the team to go over the design so our frontend devs can start the job !',
  },
  {
    id: 2,
    sender: 'Hannah Morgan',
    read: true,
    time: new Date(),
    subject: 'Meeting scheduled',
    content:
      'Hi James, i just scheduled a meeting with the team to go over the design so our frontend devs can start the job !',
  },
  {
    id: 3,
    sender: 'Hannah Morgan',
    read: false,
    time: new Date(),
    subject: 'Meeting scheduled',
    content:
      'Hi James, i just scheduled a meeting with the team to go over the design so our frontend devs can start the job !',
  },
  {
    id: 4,
    sender: 'Hannah Morgan',
    read: true,
    time: new Date(),
    subject: 'Meeting scheduled',
    content:
      'Hi James, i just scheduled a meeting with the team to go over the design so our frontend devs can start the job !',
  },
  {
    id: 5,
    sender: 'Hannah Morgan',
    read: false,
    time: new Date(),
    subject: 'Meeting scheduled',
    content:
      'Hi James, i just scheduled a meeting with the team to go over the design so our frontend devs can start the job !',
  },
]

export default function Emails() {
  let tabs = [
    { title: 'All', id: 'all' },
    { title: 'Read', id: 'read' },
    { title: 'Unread', id: 'unread' },
  ]

  let [activeTab, setActiveTab] = useState(tabs[0].id)

  const filteredEmails = emails.filter((email) => {
    if (activeTab === 'all') return true
    if (activeTab === 'read') return email.read
    if (activeTab === 'unread') return !email.read
  })

  return (
    <div className="no-scrollbar h-[650px] w-full max-w-sm space-y-4 overflow-y-scroll rounded-3xl border border-slate-700 bg-slate-900 py-6">
      <h2 className="px-6 text-2xl  font-bold">Inbox</h2>
      <div className="sticky top-0 px-6">
        <AnimatedTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div>
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
              />
            </motion.div>
          ))}
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
    <div className="sticky top-0 rounded-xl bg-slate-700 bg-opacity-50 p-2 backdrop-blur-lg">
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

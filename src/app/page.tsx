'use client'

import Emails from '@/components/Emails/Emails'
import Showcase from '@/components/Showcase'
import UILink from '@/components/ui/UILink'
import useReset from '@/hooks/useReset'

export default function Home() {
  const [emailsKey, emailsReset] = useReset()

  return (
    <div className="mt-12 grid">
      <Showcase>
        <Showcase.Component>
          <Emails key={emailsKey} />
        </Showcase.Component>
        <Showcase.Content title="Inbox component" resetFunc={emailsReset}>
          <p>
            This component showcases animating elements (Tabs and content) using{' '}
            <UILink href="https://www.framer.com/motion/" target="_blank">
              Framer Motion
            </UILink>
            , and mobile ready gestures using{' '}
            <UILink href="https://use-gesture.netlify.app/" target="_blank">
              @use-gesture
            </UILink>
            .
          </p>
          <p>Try it now by dragging emails left or right!</p>
        </Showcase.Content>
      </Showcase>
    </div>
  )
}

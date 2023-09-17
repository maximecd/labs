import Emails from '@/components/Emails/Emails'
import Showcase from '@/components/Showcase'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="mt-32 grid grid-rows-[repeat(auto-fill,600px)] md:grid-cols-3">
      <Showcase cols={2}>
        <Emails />
      </Showcase>
    </div>
  )
}

import Emails from '@/components/Emails/Emails'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="h-[650px] w-full max-w-sm">
        <Emails />
      </div>
    </main>
  )
}

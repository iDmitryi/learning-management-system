import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
export default function Home() {
  return (
    <>
      <p>Protected</p>
      <UserButton afterSignOutUrl="/sign-in" />
      <p className="text-3xl font-medium text-sky-700">world</p>
      <Button variant="destructive"> Click</Button>
    </>
  )
}

'use client'

import { isTeacher } from '@/lib/teacher'
import { useAuth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth()

  if (!isTeacher(userId)) return redirect('/')
  return <>{children}</>
}

export default TeacherLayout

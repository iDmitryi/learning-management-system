import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Chapter, Course, UserProgress } from '@prisma/client'
import { redirect } from 'next/navigation'
import { CourseSidebarItem } from './course-sidebar-item'
import { CourseProgress } from '@/components/course-progress'
import Logo from '@/app/(dashboard)/_components/logo'

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth()

  if (!userId) return redirect('/')

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  })
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm  bg-white dark:bg-zinc-900">
      <div className="p-8 flex flex-col border-b">
        <Logo />
        <h1 className="font-semibold mt-10">{course.title}</h1>
        {purchase && (
          <div className="mt-5">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map(chapter => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  )
}

import { db } from '@/lib/db'
import { errors } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return errors.unautorized

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    })

    if (!course) return errors.not_found

    const hasPublishedChapter = course.chapters.some(
      chapter => chapter.isPublished
    )

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !hasPublishedChapter
    )
      return errors.missing_fields

    const published = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    })

    return NextResponse.json(published)
  } catch (error) {
    console.log('[COURSE_ID_PUBLISH]', error)
    return errors.internal
  }
}

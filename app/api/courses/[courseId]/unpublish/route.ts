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
    })

    if (!course) return errors.not_found

    const unpublished = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    })

    return NextResponse.json(unpublished)
  } catch (error) {
    console.log('[COURSE_ID_UNPUBLISH]', error)
    return errors.internal
  }
}

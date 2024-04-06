import { db } from '@/lib/db'
import { errors } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return errors.unautorized

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if (!ownCourse) return errors.unautorized

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    })

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    })

    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    )
      return errors.missing_fields

    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    })

    return NextResponse.json(publishedChapter)
  } catch (error) {
    console.log('[CHAPTER_PUBLISH]', error)
    return errors.internal
  }
}

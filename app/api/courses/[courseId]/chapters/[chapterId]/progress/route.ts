import { db } from '@/lib/db'
import { errors } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth()
    const { isCompleted } = await req.json()

    if (!userId) return errors.unautorized

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted,
      },
    })

    return NextResponse.json(userProgress)
  } catch (error) {
    console.log('[CHAPTER_ID_PROGRESS]', error)
    return errors.internal
  }
}

export const isTeacher = (userId?: string | null) => {
  return (
    process.env.NEXT_PUBLIC_TEACHER_MODE ||
    userId === process.env.NEXT_PUBLIC_TEACHER_ID
  )
}

import { type ClassValue, clsx } from 'clsx'
import { NextResponse } from 'next/server'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const errors = {
  unautorized: new NextResponse('Unauthorized', { status: 401 }),
  internal: new NextResponse('Internal Error', { status: 500 }),
  not_found: new NextResponse('Not Found', { status: 404 }),
}

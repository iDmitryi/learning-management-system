'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import 'react-quill/dist/quill.bubble.css'

interface PreviewProps {
  value: string
}

export const Preview = ({ value }: PreviewProps) => {
  // avoid hydration errors
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  )

  return <ReactQuill theme="bubble" value={value} readOnly />
}

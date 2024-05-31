'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

const GeneralContext = ({ children }: { children: any }) => {
  return (
    <>
      <Analytics />
      <SpeedInsights />

      {children}
    </>
  )
}

export default GeneralContext

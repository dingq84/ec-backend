import { NextPage } from 'next'
import React from 'react'

type MyPage = NextPage & { layout?: React.FC<{ children: React.ReactNode }>; auth?: boolean }

export type { MyPage }

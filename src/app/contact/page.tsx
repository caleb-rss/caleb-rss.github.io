'use client'

import React from 'react'

import About from '@/components/about/about'
import NavBar from '@/components/navbar/navbar'

export default function Home() {
  return (
    <div className="size-full">
      <NavBar />
      <About />
    </div>
  )
}

'use client'

import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/ui/button'

import { H1, H3, H4 } from './ui/typography'

export default function HeroSection() {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="flex min-h-[450px] w-full flex-col items-center justify-center border-2 border-black bg-yellow-200 p-10 md:min-h-[calc(100dvh-80px)]">
        <div className="flex max-w-[550px] flex-col gap-10">
          <div className="flex flex-col gap-4">
            <H3>
              Hello there! You can call me{' '}
              <span className="text-shadow-neo scroll-m-20 font-Space_Grotesk text-3xl font-extrabold tracking-tight text-cerulean-400">
                Gregg
              </span>
              !
            </H3>
            <H1 className="font-Space_Grotesk">Creating another project using Code and Caffeine</H1>
            <H4>(Sometimes a little bit too much caffeine...)</H4>
            <div className="text-xl">
              On a journey to become a Full Stack Developer, fueled by a passion for innovation.
            </div>
          </div>
          <Button className="w-fit">Let&apos;s Work Together!</Button>
        </div>
      </div>
      <div className="flex min-h-[450px] w-full items-center justify-center border-2 border-black bg-blue-200 p-10 md:min-h-[calc(100dvh-80px)]">
        <Image src="/images/Landing Page.png" alt="hasmire" width={546} height={563} />
      </div>
    </div>
  )
}

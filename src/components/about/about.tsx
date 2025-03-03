'use client'

import React from 'react'

import Character1 from '../../../public/svgs/Character1.svg'
import Character2 from '../../../public/svgs/Character2.svg'
import Character3 from '../../../public/svgs/Character3.svg'
import Character4 from '../../../public/svgs/Character4.svg'
import InfoCard from './info-card'

export default function About() {
  return (
    <div className="grid w-full grid-cols-2 items-center justify-between gap-x-48 gap-y-20 bg-purple-300 p-24 md:min-h-[calc(90dvh-80px)]">
      <InfoCard
        title="About Me"
        description="I'm an IT Manager at Virginia Tech, where I manage the IT Department for Engineering Education."
        imageSrc={Character1}
        imageAlt="Character1"
        bgColor="bg-blue-300"
        imagePosition="right"
      />
      <InfoCard
        title="Web Development"
        description="I thrive on continuously learning new technology, from frontend frameworks to backend languages, to shape ideas into functional applications."
        imageSrc={Character2}
        imageAlt="Character2"
        bgColor="bg-vermillion-300"
        imagePosition="left"
      />
      <InfoCard
        title="Interest in Technology"
        description="Technology has fascinated me since I was young, especially the joy of building things. Combining tech with hands-on creation has always felt just right for me."
        imageSrc={Character3}
        imageAlt="Character3"
        bgColor="bg-green-300"
        imagePosition="right"
      />
      <InfoCard
        title="Other Hobbies"
        description="Here's are some of my other passions: Disc Golf, Film and Cinema, The Adventures of Tintin, and Pacers Basketball."
        imageSrc={Character4}
        imageAlt="Character4"
        bgColor="bg-mongoose-400"
        imagePosition="left"
      />
    </div>
  )
}

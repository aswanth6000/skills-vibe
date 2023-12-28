'use client'
import React from "react"
import Lottie from "lottie-react"
import Gost from '../components/lotties/gost.json'

export default function Empty() {
  return (
    <div className='w-72 h-auto flex flex-col justify-start border rounded mt-3 mb-3 ml-3'>
        <Lottie
        animationData={Gost}
        loop={true}
        />
    </div>
  )
}

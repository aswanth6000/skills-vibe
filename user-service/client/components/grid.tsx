
'use client'
import Cards from '@/components/cards'
import '../components/styles/style.css'
export default function Grid() {
  return (
    <div className='flex flex-row overflow-scroll mb-5'>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
    </div>
  )
}

'use client'
import { CarouselDefault } from '@/components/carousel'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Gigs{
    _id: string,
    title: string,

}

export default function Page() {
    const [gig, setGig] = useState<Gigs[]>([])
    const styles ={
        outerdiv : null,
        innerdiv : 'w-64 rounded-2xl p-3 m-0 p-0',
        autosec : 8000
    }
    useEffect(()=>{
        const token = localStorage.getItem('token')
        const fetchData = async () =>{
            try {
                console.log('send' ,token);
                
                const response = await  axios.get('http://localhost:8000/mygigs',
                {headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',  
                  },});
                  console.log('response send', response.data.usergigs);
                if(response.status === 200){
                    setGig(response.data.usergigs)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData()
    }, [])

  return (
    <div className='w-64 h-auto flex flex-col justify-start border rounded mt-3 mb-3 ml-3'>
        <div >
            <CarouselDefault stl={styles}/>
        </div>
        <div>
        <p className='pl-3'>I make your video editting job much easier</p> 
        </div>
        <div>
        {/* <FontAwesomeIcon icon={faStar} size='xs' className="text-2xl" style={{ fontSize: '2em' }}/> */}
        <p className='pl-3'>star rating here</p>
        </div>
        <div>
            <p className='pl-3'>From: 4455</p>
        </div>
    </div>
  )
}

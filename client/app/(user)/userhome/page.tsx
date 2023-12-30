'use client'
import Navbar from "@/components/navbar"
import { CarouselDefault } from "@/components/carousel"
import Grid from '@/components/grid'
import Popular from '@/components/popular'
import Footer from "@/components/footer"
import { useAppSelector } from "@/redux/store"
import { useRouter } from "next/navigation"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Gigs } from "@/types/gigTypes"

export default function Home() {
  const [data, setData] = useState<Gigs[]>([])
  const user  = useAppSelector((state)=> state.auth.value)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    const fetchData = async () =>{
      try{
        const response = await axios.get('http://localhost:8000/getallgig',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": 'application/json'
          }, })
          if(response.status === 200){
            console.log(response.data.allgigs);
            setData(response.data.allgigs)
          }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();

  }, [])
  console.log(data)
  const router = useRouter()
  if(user.isAuth === false){
    router.push('/login')
  }
  const styles = {
    outerdiv : 'flex h-full w-full items-center justify-center',
    innerdiv : 'w-full h-96 object-fill m-0 p-0',
    autosec : 6000
  }
  return (
    <div className="bg-bodywhite">
    <Navbar/>
    <CarouselDefault stl={styles}/>
    <Grid props={data}/>
    <Popular/>
    <Footer/>
    </div>
  )
}

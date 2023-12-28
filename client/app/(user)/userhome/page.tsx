'use client'
import Navbar from "@/components/navbar"
import { CarouselDefault } from "@/components/carousel"
import Grid from '@/components/grid'
import Popular from '@/components/popular'
import Footer from "@/components/footer"
import { useAppSelector } from "@/redux/store"
import { useRouter } from "next/navigation"
import axios from 'axios'
import { useEffect } from "react"
export default function Home() {
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
          }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();

  }, [])
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
    <Grid/>
    <Grid/>
    <Grid/>
    <Grid/>
    <Popular/>
    <Footer/>
    </div>
  )
}

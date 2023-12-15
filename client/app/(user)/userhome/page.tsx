'use client'
import Navbar from "@/components/navbar"
import { CarouselDefault } from "@/components/carousel"
import Grid from '@/components/grid'
import Popular from '@/components/popular'
import Footer from "@/components/footer"
import { useAppSelector } from "@/redux/store"
import { useRouter } from "next/navigation"
export default function Home() {
  const user  = useAppSelector((state)=> state.auth.value)
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

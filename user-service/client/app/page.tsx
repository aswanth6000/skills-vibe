
import Navbar from "@/components/navbar"
import { CarouselDefault } from "@/components/carousel"
import Grid from '@/components/grid'
import Popular from '@/components/popular'
import Footer from "@/components/footer"
export default function Home() {
  const styles = {
    outerdiv : 'flex h-full w-full items-center justify-center',
    innerdiv : 'w-full h-96 object-fill m-0 p-0',
    autosec : 6000
  }
  return (
    <>
    <Navbar/>
    <CarouselDefault stl={styles}/>
    <Grid/>
    <Grid/>
    <Grid/>
    <Grid/>
    <Popular/>
    <Footer/>
    </>
  )
}

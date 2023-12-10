
import Navbar from "@/components/navbar"
import { CarouselDefault } from "@/components/carousel"
import Cards from '@/components/cards'
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
    <Cards/>
    </>
  )
}
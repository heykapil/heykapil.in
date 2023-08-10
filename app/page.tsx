// import Image from 'next/image'
import Gallery from './components/gallery'
export default function Home() {
  return (
   <div className="flex flex-col gap-16 md:gap-24">
        <div className="hidden sm:block">
          <Gallery />
        </div>
      </div>
    )
}

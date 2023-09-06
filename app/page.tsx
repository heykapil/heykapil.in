import dynamic from "next/dynamic";
const Hero = dynamic(() => import("components/Hero"));
export default async function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}

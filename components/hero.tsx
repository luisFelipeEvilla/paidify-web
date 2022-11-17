import Image from "next/image";

const Hero = () => (
    <div
    style={{display: "flex", justifyContent: "center"}}
    className=" mt-8 ">
    <Image src="/images/hero.png" width={620} height={310} />
  </div>

)

export default Hero;
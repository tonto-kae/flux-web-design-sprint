import Image from "next/image";

export default function Showcase() {
  return (
    <section className="w-full bg-white">
      <div className="relative w-full aspect-[2/3] md:aspect-[1062/750]">
        <Image
          src="/photographer.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[55%_center] md:object-center"
        />
      </div>
    </section>
  );
}

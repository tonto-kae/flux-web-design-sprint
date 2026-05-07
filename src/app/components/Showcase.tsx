import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { showcaseQuery, type SanityImage } from "@/sanity/lib/queries";

type Data = { image: SanityImage };

export default async function Showcase() {
  const data = await client.fetch<Data>(showcaseQuery, {}, { next: { revalidate: 60 } });
  if (!data?.image) return null;

  return (
    <section className="w-full bg-white">
      <div className="relative w-full aspect-[2/3] md:aspect-[1062/750]">
        <Image
          src={urlFor(data.image).url()}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[55%_center] md:object-center"
        />
      </div>
    </section>
  );
}

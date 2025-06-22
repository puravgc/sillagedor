import { CarouselSize } from "@/app/components/carousel/Carousel";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import HeroAnim from "./HeroAnim";

const Hero = async () => {
  const allPerfumes = await prisma.perfumeModel.findMany();

  const serializedPerfumes = allPerfumes.map((perfume) => ({
    ...perfume,
    id: perfume.id.toString(),
    createdAt: perfume.createdAt?.toISOString(),
    updatedAt: perfume.updatedAt?.toISOString(),
    releaseDate: perfume.releaseDate?.toISOString(),
  }));
  return (
    <div className="h-full w-full px-5">
      <div className="flex flex-col md:flex-row justify-between h-full mt-20">
        {/* Text Section */}
        <div className="text-4xl md:text-7xl flex flex-col text-center md:text-left p-10">
          <div className="w-full text-gray-600 custom-font">
            <div>
              <HeroAnim />
            </div>
            <div className="text-xl mt-5">
              <a href="/shop">
                <button className="p-6 bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-600 hover:text-white">
                  Shop Now
                </button>
              </a>
            </div>
          </div>

          <div className="mt-12 w-full flex flex-col items-start">
            {" "}
            <div className="">
              <h1 className="text-2xl text-gray-600 mb-5">BEST SELLERS</h1>
            </div>
            <div className="">
              <CarouselSize allPerfumes={serializedPerfumes} />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex flex-wrap md:flex-nowrap w-full md:w-[50%] gap-2">
          <div className="h-auto md:h-[90%] flex flex-col gap-5 justify-end items-end p-5">
            <Image
              src="/sidemodel.png"
              alt="model image"
              height={800}
              width={2000}
              className="h-auto max-h-[400px] md:h-[50%] rounded-xl object-cover"
            />
            <Image
              src="/model2.jpg"
              alt="model image"
              height={800}
              width={2000}
              className="h-auto max-h-[400px] md:h-[50%] rounded-xl object-cover"
            />
          </div>

          <div className="h-auto md:h-[90%] flex justify-end items-end pb-5 pt-5 pr-5 rounded-xl">
            <Image
              src="/menmodel.png"
              alt="model image"
              height={800}
              width={2000}
              className="h-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import CartInteraction from "@/app/components/cartinteraction/CartInteraction";
import connectToDatabase from "@/lib/db";
import PerfumeModel from "@/model/PerfumeModel";
interface Perfume {
  _id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  tags: string[];
  rating: number;
  brand: string;
  image: string;
  bestSeller: boolean;
  stock: number;
  releaseDate: string;
  discountPercentage: number;
}

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  await connectToDatabase();
  const perfume = await PerfumeModel.findOne({ _id: id });
  const plainProduct = JSON.parse(JSON.stringify(perfume));

  if (!perfume)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Product not found
      </div>
    );

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 ">
      <div className="max-w-6xl w-full flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden transition-all hover:shadow-3xl">
        {/* Image Section */}
        <div className="md:w-1/2 h-[600px] relative pl-5">
          <img
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-full object-cover"
          />
          {perfume.bestSeller && (
            <div className="absolute top-4 left-4 bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
              Best Seller
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-10 md:w-1/2 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              {perfume.name}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {perfume.description}
            </p>

            {/* Price */}
            <div className="flex items-center mt-6">
              <span className="text-3xl font-bold text-gray-900">
                ${perfume.discountedPrice}
              </span>
              {perfume.discountPercentage > 0 && (
                <span className="ml-4 text-xl text-gray-500 line-through">
                  ${perfume.originalPrice}
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {perfume.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-semibold uppercase bg-gray-800 text-white px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center mt-6">
              <span className="text-yellow-500 text-2xl">
                {"★".repeat(perfume.rating)}
              </span>
              <span className="ml-2 text-gray-500 text-lg">
                ({perfume.rating}/5)
              </span>
            </div>

            {/* Brand & Stock */}
            <div className="mt-6 space-y-2">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Brand:</span> {perfume.brand}
              </p>
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Stock:</span>{" "}
                {perfume.stock > 0 ? (
                  <span className="text-green-600">
                    {perfume.stock} available
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Release Date */}
            <p className="text-gray-700 text-lg mt-4">
              <span className="font-semibold">Release Date:</span>{" "}
              {new Date(perfume.releaseDate).toLocaleDateString()}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4">
            <CartInteraction product={plainProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

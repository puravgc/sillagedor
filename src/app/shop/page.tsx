import Card from "@/app/components/card/Card";

const perfumes = [
  {
    name: "Dior Sauvage",
    brand: "Dior",
    price: "$120",
    rating: 4.8,
    image: "/perfume.jpg",
  },
  {
    name: "Chanel No. 5",
    brand: "Chanel",
    price: "$150",
    rating: 4.9,
    image: "/perfume.jpg",
  },
  {
    name: "Versace Eros",
    brand: "Versace",
    price: "$110",
    rating: 4.7,
    image: "/perfume.jpg",
  },
  {
    name: "Tom Ford Black Orchid",
    brand: "Tom Ford",
    price: "$140",
    rating: 4.8,
    image: "/perfume.jpg",
  },
  {
    name: "Creed Aventus",
    brand: "Creed",
    price: "$250",
    rating: 4.9,
    image: "/perfume.jpg",
  },
  {
    name: "Gucci Bloom",
    brand: "Gucci",
    price: "$130",
    rating: 4.7,
    image: "/perfume.jpg",
  },
  {
    name: "YSL Black Opium",
    brand: "Yves Saint Laurent",
    price: "$135",
    rating: 4.8,
    image: "/perfume.jpg",
  },
  {
    name: "Armani Code",
    brand: "Giorgio Armani",
    price: "$120",
    rating: 4.7,
    image: "/perfume.jpg",
  },
  {
    name: "Burberry Her",
    brand: "Burberry",
    price: "$100",
    rating: 4.6,
    image: "/perfume.jpg",
  },
  {
    name: "Dolce & Gabbana Light Blue",
    brand: "Dolce & Gabbana",
    price: "$110",
    rating: 4.7,
    image: "/perfume.jpg",
  },
  {
    name: "Prada Luna Rossa",
    brand: "Prada",
    price: "$125",
    rating: 4.6,
    image: "/perfume.jpg",
  },
  {
    name: "Le Labo Santal 33",
    brand: "Le Labo",
    price: "$220",
    rating: 4.9,
    image: "/perfume.jpg",
  },
  {
    name: "Jo Malone Wood Sage & Sea Salt",
    brand: "Jo Malone",
    price: "$145",
    rating: 4.8,
    image: "/perfume.jpg",
  },
  {
    name: "Maison Francis Kurkdjian Baccarat Rouge 540",
    brand: "MFK",
    price: "$325",
    rating: 5.0,
    image: "/perfume.jpg",
  },
  {
    name: "Byredo Gypsy Water",
    brand: "Byredo",
    price: "$190",
    rating: 4.8,
    image: "/perfume.jpg",
  },
  {
    name: "Hermès Terre d'Hermès",
    brand: "Hermès",
    price: "$135",
    rating: 4.7,
    image: "/perfume.jpg",
  },
  {
    name: "Jean Paul Gaultier Le Male",
    brand: "Jean Paul Gaultier",
    price: "$115",
    rating: 4.7,
    image: "/perfume.jpg",
  },
  {
    name: "Paco Rabanne 1 Million",
    brand: "Paco Rabanne",
    price: "$125",
    rating: 4.7,
    image: "/perfume.jpg",
  },
  {
    name: "Bvlgari Man in Black",
    brand: "Bvlgari",
    price: "$130",
    rating: 4.6,
    image: "/perfume.jpg",
  },
  {
    name: "Montblanc Explorer",
    brand: "Montblanc",
    price: "$105",
    rating: 4.7,
    image: "/perfume.jpg",
  },
];

const PerfumeCollection = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Products</h1>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
        {perfumes.map((perfume, index) => (
          <Card
            name={perfume.name}
            brand={perfume.brand}
            price={perfume.price}
            rating={perfume.rating}
            image={perfume.image}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PerfumeCollection;

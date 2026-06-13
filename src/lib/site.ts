export const site = {
  name: "Zestora Hospitality Solution",
  shortName: "Zestora",
  url: "https://zestorahospitality.com",
  domain: "zestorahospitality.com",
  email: "Hello@zestorahospitality.com",
  emailHref: "mailto:Hello@zestorahospitality.com",
  phone: "+91 96454 56262",
  phoneHref: "tel:+919645456262",
  location: "Bengaluru, India",
  region: "Karnataka",
  tagline: "Foodservice & FMCG distribution for professional kitchens.",
  description:
    "Zestora Hospitality Solution helps restaurants, cloud kitchens, food retailers, and HoReCa businesses in Bangalore source reliable FMCG and kitchen essentials with dependable distribution support.",
} as const;

export const nav: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

export const supplyChain = [
  { step: "01", title: "Sourcing", note: "Curated, quality-checked supply" },
  { step: "02", title: "Inventory", note: "Stock planning & movement" },
  { step: "03", title: "Fulfilment", note: "Coordinated dispatch" },
  { step: "04", title: "Kitchen", note: "Stocked & ready for service" },
] as const;

export const categories = [
  {
    slug: "packaged-food",
    name: "Packaged Food",
    image: "/images/cat-packaged.webp",
    short: "Reliable packaged food solutions for prep, service, and back-of-house use.",
  },
  {
    slug: "beverages",
    name: "Beverages",
    image: "/images/cat-beverages.webp",
    short: "A focused beverage range for foodservice and retail channels.",
  },
  {
    slug: "condiments",
    name: "Condiments",
    image: "/images/cat-condiments.webp",
    short: "Condiments that help improve taste consistency and menu performance.",
  },
  {
    slug: "kitchen-essentials",
    name: "Kitchen Essentials",
    image: "/images/cat-essentials.webp",
    short: "Everyday products that support smooth kitchen operations and service readiness.",
  },
] as const;

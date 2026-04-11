export type MenuItem = {
  name: string;
  category: string;
  description: string;
  tags?: string[];
  photo: string;
};

export const CATEGORIES = [
  "All",
  "Cookies",
  "Brownies",
];

export const MENU_ITEMS: MenuItem[] = [
  // Cookies
  { name: "Dubai Chocolate Cookie", category: "Cookies", description: "Inspired by the viral Dubai bar — filled with pistachio cream and crunchy kataifi pastry.", tags: ["bestseller", "viral"], photo: "/products/pistachio-floating.png" },
  { name: "Biscoff Cookie", category: "Cookies", description: "Brown butter cookie loaded with Biscoff spread and crushed Lotus cookies.", tags: ["fan favorite"], photo: "/products/lotus-biscoff.png" },
  { name: "Kinder Bueno Cookie", category: "Cookies", description: "Hazelnut cream-filled cookie with Kinder Bueno pieces throughout.", tags: ["bestseller"], photo: "/products/kinder-swirls.png" },
  { name: "Birthday Cake Cookie", category: "Cookies", description: "Funfetti-loaded sugar cookie with buttercream swirls and rainbow sprinkles.", tags: [], photo: "/products/carnival-cookie.png" },
  { name: "Funfetti Cookie", category: "Cookies", description: "Sun-kissed funfetti cookie with buttercream frosting and colorful sprinkles — pure celebration.", tags: [], photo: "/products/funfetti-sunshine.png" },

  // Brownies
  { name: "Dubai Chocolate Brownie", category: "Brownies", description: "Rich brownie topped with pistachio cream and crispy kataifi — Dubai-inspired.", tags: ["viral"], photo: "/products/pistachio-brownie.png" },
  { name: "Peanut Butter Pretzel Brownie", category: "Brownies", description: "Dense fudgy brownie with rivers of peanut butter, topped with crushed pretzels for a salty-sweet crunch.", tags: ["signature"], photo: "/products/pb-dreams-vortex.png" },
  { name: "Chocolate S'mores Brownie", category: "Brownies", description: "Gooey chocolate brownie with a toasted marshmallow top and graham cracker base.", tags: ["fan favorite"], photo: "/products/smores-brownie.png" },
];

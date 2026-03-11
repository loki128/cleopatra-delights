export type MenuItem = {
  name: string;
  category: string;
  description: string;
  emoji: string;
  tags?: string[];
};

export const CATEGORIES = [
  "All",
  "NYC Cookies",
  "Cookie Cakes",
  "Brownies",
  "Blondies",
  "Cheesecakes",
  "Shortcakes",
  "Cake Bars",
  "Classic Delights",
  "Signature Cakes",
];

export const MENU_ITEMS: MenuItem[] = [
  // NYC Cookies
  { name: "Triple Chocolate Cookie", category: "NYC Cookies", emoji: "🍫", description: "Three layers of chocolate — dark, milk, and white — baked into one indulgent NYC-style cookie.", tags: ["bestseller"] },
  { name: "Dubai Chocolate Cookie", category: "NYC Cookies", emoji: "🌟", description: "Inspired by the viral Dubai bar — filled with pistachio cream and crunchy kataifi pastry.", tags: ["bestseller", "viral"] },
  { name: "Birthday Cake Cookie", category: "NYC Cookies", emoji: "🎂", description: "Funfetti-loaded sugar cookie with buttercream swirls and rainbow sprinkles.", tags: [] },
  { name: "Monster Cookie", category: "NYC Cookies", emoji: "👾", description: "Packed with oats, peanut butter, chocolate chips, and M&Ms — a cookie that does it all.", tags: [] },
  { name: "Peanut Butter Pretzel Cookie", category: "NYC Cookies", emoji: "🥜", description: "Creamy peanut butter cookie with a salty pretzel crunch in every bite.", tags: [] },
  { name: "Red Velvet S'more Cookie", category: "NYC Cookies", emoji: "❤️", description: "Velvety red cookie with gooey marshmallow, graham cracker, and chocolate center.", tags: [] },
  { name: "Banana Pudding Cookie", category: "NYC Cookies", emoji: "🍌", description: "Banana-infused cookie with Nilla wafer crumbles and vanilla pudding chips.", tags: [] },
  { name: "Biscoff Cookie", category: "NYC Cookies", emoji: "🍪", description: "Brown butter cookie loaded with Biscoff spread and crushed Lotus cookies.", tags: ["fan favorite"] },
  { name: "Roasted Coconut Cookie", category: "NYC Cookies", emoji: "🥥", description: "Toasted coconut flakes folded into a buttery, tropical-inspired cookie.", tags: [] },
  { name: "Ferrero Rocher Cookie", category: "NYC Cookies", emoji: "🌰", description: "Hazelnut and chocolate cookie crowned with a whole Ferrero Rocher.", tags: ["fan favorite"] },
  { name: "Snickers Cookie", category: "NYC Cookies", emoji: "🍬", description: "Caramel, peanut, nougat, and chocolate baked into one iconic cookie.", tags: [] },
  { name: "Caramel Bean Cookie", category: "NYC Cookies", emoji: "✨", description: "Rich caramel cookie with espresso beans and a flaky sea salt finish.", tags: [] },
  { name: "Kinder Bueno Cookie", category: "NYC Cookies", emoji: "🍫", description: "Hazelnut cream-filled cookie with Kinder Bueno pieces throughout.", tags: ["bestseller"] },
  { name: "Apple Cinnamon Crunch Cookie", category: "NYC Cookies", emoji: "🍎", description: "Warm spiced apple cookie with cinnamon sugar crumble and oat topping.", tags: [] },

  // Cookie Cakes
  { name: "Dubai Chocolate Cookie Cake", category: "Cookie Cakes", emoji: "🌟", description: "Our viral Dubai cookie scaled up into a giant shareable cookie cake.", tags: ["viral"] },
  { name: "Nutella Cookie Cake", category: "Cookie Cakes", emoji: "🍫", description: "Thick cookie cake swirled with Nutella and topped with hazelnuts.", tags: [] },
  { name: "Biscoff Cookie Cake", category: "Cookie Cakes", emoji: "🍪", description: "Giant Biscoff cookie cake drizzled with cookie butter and Lotus crumbles.", tags: ["fan favorite"] },
  { name: "Cookies & Cream Cookie Cake", category: "Cookie Cakes", emoji: "⚫", description: "Oreo-loaded cookie cake with cream cheese frosting and crushed cookie topping.", tags: [] },
  { name: "Birthday Cake Cookie Cake", category: "Cookie Cakes", emoji: "🎂", description: "Funfetti cookie cake perfect for celebrations — loaded with sprinkles and buttercream.", tags: [] },
  { name: "Red Velvet S'mores Cookie Cake", category: "Cookie Cakes", emoji: "❤️", description: "Red velvet cookie cake with toasted marshmallow, graham cracker, and chocolate drizzle.", tags: [] },

  // Brownies
  { name: "Rocky Road Brownie", category: "Brownies", emoji: "🍫", description: "Dense fudgy brownie with marshmallows, almonds, and chocolate chunks.", tags: [] },
  { name: "Dubai Chocolate Brownie", category: "Brownies", emoji: "🌟", description: "Rich brownie topped with pistachio cream and crispy kataifi — Dubai-inspired.", tags: ["viral"] },
  { name: "Peanut Butter Pretzel Brownie", category: "Brownies", emoji: "🥜", description: "Fudgy chocolate brownie with peanut butter swirl and salty pretzel crust.", tags: [] },
  { name: "Red Velvet S'mores Brownie", category: "Brownies", emoji: "❤️", description: "Red velvet fudge brownie with toasted marshmallow and graham cracker crumble.", tags: [] },
  { name: "Red Velvet Cream Cheese Brownie", category: "Brownies", emoji: "🍰", description: "Classic red velvet swirled with tangy cream cheese for the perfect balance.", tags: ["fan favorite"] },
  { name: "Chocolate S'mores Brownie", category: "Brownies", emoji: "🔥", description: "Gooey chocolate brownie with a toasted marshmallow top and graham cracker base.", tags: [] },

  // Blondies
  { name: "Banana Pudding Blondie", category: "Blondies", emoji: "🍌", description: "Vanilla blondie loaded with banana pudding swirls and crushed Nilla wafers.", tags: [] },
  { name: "Biscoff Blondie", category: "Blondies", emoji: "🍪", description: "Brown butter blondie with Biscoff spread ribbon and Lotus cookie chunks.", tags: ["fan favorite"] },
  { name: "Birthday Cake Blondie", category: "Blondies", emoji: "🎂", description: "Sprinkle-packed blondie with cake batter flavor and vanilla glaze.", tags: [] },

  // Cheesecakes
  { name: "Strawberry Cheesecake", category: "Cheesecakes", emoji: "🍓", description: "Classic New York-style cheesecake topped with fresh strawberry compote.", tags: ["classic"] },
  { name: "Peanut Butter Cheesecake", category: "Cheesecakes", emoji: "🥜", description: "Creamy peanut butter cheesecake on a chocolate cookie crust with PB drizzle.", tags: [] },
  { name: "Biscoff Cheesecake", category: "Cheesecakes", emoji: "🍪", description: "Silky cheesecake on a Biscoff crust, finished with cookie butter topping.", tags: ["fan favorite"] },
  { name: "Pistachio Caramel Pecan Cheesecake", category: "Cheesecakes", emoji: "🟢", description: "Bold pistachio cheesecake with salted caramel drizzle and candied pecans.", tags: ["specialty"] },
  { name: "Seasonal Flavor Cheesecake", category: "Cheesecakes", emoji: "✨", description: "Rotating seasonal flavors — ask us what's available this week.", tags: ["rotating"] },

  // Shortcakes
  { name: "Strawberry Shortcake", category: "Shortcakes", emoji: "🍓", description: "Light vanilla sponge layered with fresh strawberries and whipped cream.", tags: ["classic"] },
  { name: "Mango Shortcake", category: "Shortcakes", emoji: "🥭", description: "Tropical mango layers over soft vanilla cake with coconut whipped cream.", tags: [] },
  { name: "Cookies & Cream Shortcake", category: "Shortcakes", emoji: "⚫", description: "Oreo cookie crumble layered with cream cheese mousse and chocolate drizzle.", tags: [] },
  { name: "Chocolate Reese's Shortcake", category: "Shortcakes", emoji: "🍫", description: "Rich chocolate sponge with peanut butter mousse and Reese's cup pieces.", tags: ["fan favorite"] },

  // Cake Bars
  { name: "Cookies & Cream Cake Bar", category: "Cake Bars", emoji: "⚫", description: "Moist vanilla cake bar layered with Oreo cream and cookie crumble.", tags: [] },
  { name: "Biscoff Cake Bar", category: "Cake Bars", emoji: "🍪", description: "Spiced Biscoff cake bar with cookie butter glaze and Lotus crunch topping.", tags: ["fan favorite"] },
  { name: "Strawberry Cake Bar", category: "Cake Bars", emoji: "🍓", description: "Strawberry-swirled cake bar with cream cheese frosting and fresh berry drizzle.", tags: [] },
  { name: "Banana Pudding Cake Bar", category: "Cake Bars", emoji: "🍌", description: "Banana cake bar layered with vanilla pudding and Nilla wafer crumble.", tags: [] },
  { name: "Ferrero Rocher Cake Bar", category: "Cake Bars", emoji: "🌰", description: "Hazelnut and chocolate cake bar crowned with a Ferrero Rocher and gold dust.", tags: ["specialty"] },
  { name: "Kinder Cake Bar", category: "Cake Bars", emoji: "🍫", description: "Kinder chocolate-layered cake bar with hazelnut cream filling.", tags: [] },
  { name: "Almond Roasted Coconut Cake Bar", category: "Cake Bars", emoji: "🥥", description: "Toasted almond and coconut cake bar with tropical glaze and shredded coconut.", tags: [] },

  // Classic Delights
  { name: "Banana Pudding Flan", category: "Classic Delights", emoji: "🍮", description: "Silky custard flan with a banana pudding twist and caramel glaze.", tags: [] },
  { name: "Banana Pudding Cup", category: "Classic Delights", emoji: "🍌", description: "Layered banana pudding with whipped cream and Nilla wafers in a cup.", tags: ["classic"] },
  { name: "Pudding Cup", category: "Classic Delights", emoji: "🍮", description: "Classic homestyle pudding cup — ask us for today's flavor.", tags: ["rotating"] },

  // Signature Cakes
  { name: "Dates Cake", category: "Signature Cakes", emoji: "🌴", description: "Middle Eastern-inspired sticky dates cake with toffee sauce — rich and warming.", tags: ["specialty"] },
  { name: "Victoria Cake", category: "Signature Cakes", emoji: "👑", description: "Classic British Victoria sponge with jam and whipped cream — elegant and light.", tags: ["classic"] },
  { name: "Chocolate Cake", category: "Signature Cakes", emoji: "🍫", description: "Decadent multi-layer chocolate cake with silky ganache and chocolate buttercream.", tags: [] },
  { name: "Pineapple Upside Down Cake", category: "Signature Cakes", emoji: "🍍", description: "Caramelized pineapple and cherry topping over golden buttery sponge.", tags: ["classic"] },
  { name: "Carrot Cake", category: "Signature Cakes", emoji: "🥕", description: "Spiced carrot cake with toasted walnuts and thick cream cheese frosting.", tags: ["fan favorite"] },
];

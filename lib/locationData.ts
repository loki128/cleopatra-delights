export type Event = {
  date: string;
  day: string;
  name: string;
  address: string;
  time: string;
  type: "market" | "popup" | "private" | "festival";
  note?: string;
};

export const UPCOMING_EVENTS: Event[] = [
  {
    date: "Mar 15",
    day: "Saturday",
    name: "Riverside Arts Market",
    address: "715 Riverside Ave, Jacksonville, FL 32204",
    time: "10:00 AM – 4:00 PM",
    type: "market",
    note: "Featured vendor",
  },
  {
    date: "Mar 22",
    day: "Saturday",
    name: "Springfield Farmers Market",
    address: "Main St & 3rd St, Jacksonville, FL 32206",
    time: "8:00 AM – 1:00 PM",
    type: "market",
  },
  {
    date: "Mar 29",
    day: "Saturday",
    name: "Beaches Pop-Up",
    address: "Neptune Beach, FL 32266",
    time: "11:00 AM – 5:00 PM",
    type: "popup",
    note: "Limited menu",
  },
  {
    date: "Apr 5",
    day: "Saturday",
    name: "Jacksonville Food & Wine Festival",
    address: "Metropolitan Park, Jacksonville, FL",
    time: "12:00 PM – 8:00 PM",
    type: "festival",
    note: "Full menu available",
  },
  {
    date: "Apr 12",
    day: "Saturday",
    name: "Avondale Spring Market",
    address: "Avondale, Jacksonville, FL 32205",
    time: "9:00 AM – 2:00 PM",
    type: "market",
  },
  {
    date: "Apr 19",
    day: "Saturday",
    name: "San Marco Pop-Up",
    address: "San Marco Square, Jacksonville, FL 32207",
    time: "10:00 AM – 4:00 PM",
    type: "popup",
  },
];

export const TYPE_STYLES: Record<Event["type"], { label: string; bg: string; color: string }> = {
  market:   { label: "Farmers Market", bg: "rgba(16,185,129,0.1)",  color: "#059669" },
  popup:    { label: "Pop-Up",         bg: "rgba(99,102,241,0.1)",  color: "#6366f1" },
  private:  { label: "Private Event",  bg: "rgba(245,158,11,0.1)",  color: "#d97706" },
  festival: { label: "Festival",       bg: "rgba(212,175,55,0.12)", color: "#B8960C" },
};

export const TESTIMONIALS = [
  {
    name: "Aaliyah M.",
    location: "Jacksonville, FL",
    rating: 5,
    text: "The Dubai Chocolate Cookie is absolutely insane. I've never tasted anything like it in Jacksonville. Cleopatra Delights is on a different level — every bite feels like a luxury experience.",
    item: "Dubai Chocolate Cookie",
  },
  {
    name: "Marcus T.",
    location: "Jacksonville, FL",
    rating: 5,
    text: "Ordered a custom birthday cookie cake and it blew everyone away. The presentation was stunning and the flavor was even better. Will be ordering every birthday from now on.",
    item: "Birthday Cake Cookie Cake",
  },
  {
    name: "Priya S.",
    location: "Neptune Beach, FL",
    rating: 5,
    text: "Found them at the Riverside Market and immediately bought six cookies. The Biscoff and the Ferrero Rocher are both unbelievable. Drove back the next week just to get more.",
    item: "Biscoff Cookie & Ferrero Rocher Cookie",
  },
  {
    name: "Destiny R.",
    location: "Jacksonville, FL",
    rating: 5,
    text: "The Pistachio Caramel Pecan Cheesecake is hands down the best cheesecake I've ever had. The flavors are so unique and bold — nothing generic here. Pure artistry.",
    item: "Pistachio Caramel Pecan Cheesecake",
  },
  {
    name: "James O.",
    location: "Orange Park, FL",
    rating: 5,
    text: "Cleopatra Delights catered our corporate event and every single person asked where the desserts were from. The cake bars and brownies were completely gone within the first hour.",
    item: "Catering — Cake Bars & Brownies",
  },
];

export const GALLERY_ITEMS = [
  { emoji: "🍫", label: "Dubai Chocolate Cookie", color: "#3D1A0A" },
  { emoji: "🍰", label: "Biscoff Cheesecake", color: "#6B4226" },
  { emoji: "🍪", label: "NYC Cookie Stack", color: "#8B4513" },
  { emoji: "🌰", label: "Ferrero Rocher Cake Bar", color: "#2C1A0A" },
  { emoji: "❤️", label: "Red Velvet Brownie", color: "#6B0000" },
  { emoji: "🥭", label: "Mango Shortcake", color: "#8B4000" },
  { emoji: "🎂", label: "Birthday Cookie Cake", color: "#4A2070" },
  { emoji: "🍮", label: "Banana Pudding Flan", color: "#6B5000" },
  { emoji: "🥥", label: "Roasted Coconut Cookie", color: "#3D3D2A" },
];

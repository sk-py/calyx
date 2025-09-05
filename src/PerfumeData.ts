export interface perfume_Data {
  id: number;
  name: string;
  inspired_by: string;
  size_ml: number;
  type: string;
  top_notes: string;
  middle_notes: string;
  base_notes: string;
  sillage: string;
  description: string;
  price_inr: number;
  image: string;
  multi_images?: string[];
  tags?: string[];
}

export const perfumeData: perfume_Data[] = [
  {
    id: 1,
    name: "Timeless",
    inspired_by: "Dior Sauvage",
    size_ml: 20,
    type: "EDP",
    top_notes: "Bergamot, Pepper",
    middle_notes: "Lavender, Sichuan Pepper, Star Anise",
    base_notes: "Ambroxan, Cedarwood",
    sillage: "Strong",
    description:
      "Timeless, inspired by Dior Sauvage, smells fresh and powerful. It opens with citrus and pepper for a sharp burst, then soft lavender adds smoothness. The woody base makes it masculine and confident — perfect for daily wear or evening outings.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/Timeless.png",
    multi_images: [
      "/assets/all_images/Product-Images/Timeless.png",
      "/assets/all_images/timeless 1.png",
      "/assets/all_images/timeless 1.2.png",
    ],
  },
  {
    id: 2,
    name: "Timeless Intense",
    inspired_by: "Dior Sauvage Elixir",
    size_ml: 20,
    type: "EDP",
    top_notes: "Cinnamon, Nutmeg, Cardamom",
    middle_notes: "Lavender",
    base_notes: "Amber, Liquorice, Sandalwood",
    sillage: "Very Strong",
    description:
      "Timeless Intense, inspired by Dior Sauvage Elixir, is spicy, warm, and bold. The mix of cinnamon and cardamom creates a strong first impression, while lavender balances it with smoothness. Amber and sandalwood give it a deep, long-lasting finish for nights out.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/Timeless intense.png",
    multi_images: [
      "/assets/all_images/Product-Images/Timeless intense.png",
      "/assets/all_images/timeless intense.png",
      "/assets/all_images/timeless intense.2.png",
      "/assets/all_images/timeless intense 1.png",
    ],
    tags: ["new"],
  },
  {
    id: 3,
    name: "Azure",
    inspired_by: "Memo Paris French Leather",
    size_ml: 20,
    type: "EDP",
    top_notes: "Lime, Pink Pepper",
    middle_notes: "Rose, Clary Sage",
    base_notes: "Suede, Vetiver, Musk",
    sillage: "Moderate",
    description:
      "Azure, inspired by Memo Paris French Leather, is fresh and elegant. It smells like lime and rose at first, clean and uplifting, with a soft leather note underneath. A balanced scent that feels classy and modern.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/azure.png",
    multi_images: [
      "/assets/all_images/Product-Images/azure.png",
     "/assets/all_images/Azure 2.png",
     "/assets/all_images/Azure.png"
    ],
    tags: ["popular"],
  },
  {
    id: 4,
    name: "Onyx",
    inspired_by: "Creed Aventus",
    size_ml: 20,
    type: "EDP",
    top_notes: "Pineapple, Blackcurrant, Bergamot",
    middle_notes: "Birch, Patchouli, Rose",
    base_notes: "Musk, Oakmoss, Vanilla",
    sillage: "Strong",
    description:
      "Onyx, inspired by Creed Aventus, smells fruity and smoky at the same time. Pineapple gives it a fresh, juicy feel, while birch adds a smoky touch. The musky base makes it rich and long-lasting, great for formal or special occasions.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/ONXY.png",
    multi_images: [
      "/assets/all_images/Product-Images/ONXY.png",
      "/assets/all_images/ONYX.png",
      "/assets/all_images/ONYX 2.png",
    ],
  },
  {
    id: 5,
    name: "Caramel",
    inspired_by: "Calyx Original (Caramel Scent)",
    size_ml: 20,
    type: "EDP",
    top_notes: "Toffee, Brown Sugar",
    middle_notes: "Caramel, Vanilla",
    base_notes: "Amber, Musk",
    sillage: "Moderate",
    description:
      "Caramel is sweet, cosy, and delicious. It smells like melted toffee and warm vanilla, with a touch of amber to keep it balanced. A perfect scent if you love dessert-like perfumes that feel comforting and addictive.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/caremal.png",
    multi_images: [
      "/assets/all_images/Product-Images/caremal.png",
    ],
    tags: ["limited_edition", "exclusive"],
  },
  {
    id: 6,
    name: "Nova",
    inspired_by: "Escada Moon Sparkle",
    size_ml: 20,
    type: "EDP",
    top_notes: "Strawberry, Blackcurrant, Red Apple",
    middle_notes: "Sweet Pea, Jasmine, Freesia",
    base_notes: "Raspberry, Musk, Sandalwood",
    sillage: "Soft",
    description:
      "Nova, inspired by Escada Moon Sparkle, smells fruity, fun, and playful. Juicy strawberry and apple give it a candy-like sweetness, while light flowers and musk make it smooth. A youthful fragrance for everyday wear.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/NOVA.png",
    multi_images: [
      "/assets/all_images/Product-Images/NOVA.png",
      "/assets/all_images/Nova 1.png",
      "/assets/all_images/Nova.png",
    ],
    tags: ["new"],
  },
  {
    id: 7,
    name: "Scarlet",
    inspired_by: "YSL Y",
    size_ml: 20,
    type: "EDP",
    top_notes: "Blood Orange, Blackcurrant, Clementine",
    middle_notes: "Ginger Flower, Tuberose, Freesia",
    base_notes: "Vanilla, Sandalwood, Musk",
    sillage: "Moderate",
    description:
      "Scarlet, inspired by YSL Y, is bright and feminine. The citrusy opening feels fresh, followed by soft flowers. Vanilla and musk in the base give it warmth, making it both elegant and easy to wear.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/scarlet.png",
    multi_images: [
      "/assets/all_images/Product-Images/scarlet.png",
      "/assets/all_images/SCARLET.1.png",
      "/assets/all_images/SCARLET.png",
    ],
  },
  {
    id: 8,
    name: "Pulse",
    inspired_by: "Paco Rabbane Black XS",
    size_ml: 20,
    type: "EDP",
    top_notes: "Apple, Ginger, Bergamot",
    middle_notes: "Sage, Juniper Berries, Geranium",
    base_notes: "Amberwood, Tonka Bean, Cedar",
    sillage: "Strong",
    description:
      "Pulse, inspired by Paco Rabanne Black XS, smells energetic and modern. The apple and ginger opening is sharp and lively, while tonka bean and cedar give it a sweet-woody depth. A youthful fragrance full of character.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/pulse.png",
    multi_images: [
      "/assets/all_images/Product-Images/pulse.png",
      "/assets/all_images/Pulse.png",
      "/assets/all_images/Pulse 2.png",
    ],
  },
  {
    id: 9,
    name: "Villain",
    inspired_by: "Rasasi Hawas",
    size_ml: 20,
    type: "EDP",
    top_notes: "Cinnamon, Bergamot, Apple",
    middle_notes: "Orange Blossom, Cardamom",
    base_notes: "Ambergris, Musk, Driftwood",
    sillage: "Strong",
    description:
      "Villain, inspired by Rasasi Hawas, is fresh and slightly sweet with a spicy twist. The apple and bergamot give it a clean start, cinnamon adds energy, and the musky-woody base makes it long-lasting. Great for casual wear or evenings.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/Villian.png",
    multi_images: [
      "/assets/all_images/Product-Images/Villian.png",
      "/assets/all_images/Villian.png",
      "/assets/all_images/Villian 2.png",
    ],
    tags: ["best_seller"],
  },
  {
    id: 10,
    name: "Deception",
    inspired_by: "Ex Nihilo Fleur Narcotique",
    size_ml: 20,
    type: "EDP",
    top_notes: "Lychee, Bergamot, Peach",
    middle_notes: "Peony, Orange Blossom, Jasmine",
    base_notes: "Musk, Moss, Wood",
    sillage: "Moderate",
    description:
      "Deception, inspired by Ex Nihilo Fleur Narcotique, is soft, floral, and modern. Lychee and peach give it a fresh sweetness, while peony and jasmine add elegance. The musky-woody base makes it sophisticated but easy to wear every day.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/deception.png",
    multi_images: [
      "/assets/all_images/Product-Images/deception.png",
      "/assets/all_images/Deception.png",
      "/assets/all_images/Deception 2.png",
    ],
    tags: ["top_seller"],
  },
  {
    id: 11,
    name: "Crimson Oud",
    inspired_by: "Ahmed Al Maghribi Oud & Roses",
    size_ml: 20,
    type: "EDP",
    top_notes: "Rose, Saffron",
    middle_notes: "Oud, Patchouli",
    base_notes: "Amber, Musk",
    sillage: "Very Strong",
    description:
      "Crimson Oud, inspired by Ahmed Al Maghribi Oud & Roses, is rich and traditional. It starts with strong rose and saffron, then deep oud takes over. Amber and musk make it heavy and long-lasting — a bold scent for special occasions.",
    price_inr: 350,
    image: "/assets/all_images/Product-Images/crimson oud.png",
    multi_images: [
      "/assets/all_images/Product-Images/crimson oud.png",
      "/assets/all_images/Crimson Oud.png",
      "/assets/all_images/Crimson Oud 2.png",
    ],
    tags: ["new", "top_seller"],
  },
];

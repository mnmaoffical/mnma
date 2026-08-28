import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Sparkles,
  Clock,
  ChevronRight,
  User,
  X,
  Tag,
  BookOpen,
} from "lucide-react";

// ── AI-generated local images ──────────────────────────────────────────────
import dubaiLoafers from "../assets/blog/dubai_loafers.jpg";
import dubaiSneakers from "../assets/blog/dubai_sneakers.jpg";
import dubaiHeels from "../assets/blog/dubai_heels.jpg";
import dubaiKids from "../assets/blog/dubai_kids.jpg";
import leatherCraft from "../assets/blog/leather_craft.jpg";
import dubaiFormal from "../assets/blog/dubai_formal.jpg";

// ── Blog data ──────────────────────────────────────────────────────────────
const POSTS = [
  {
    id: "post1",
    titleKey: "blogPage.posts.post1.title",
    descKey: "blogPage.posts.post1.desc",
    date: "August 20, 2026",
    category: "Men's Footwear",
    author: "Padora Atelier",
    readTime: "5 min read",
    image: dubaiLoafers,
    body: `Dubai's iconic kandura deserves an equally refined companion underfoot. At Padora, our master cobblers hand-select full-grain calfskin to craft loafers that marry old-world craftsmanship with the modern Emirati wardrobe. A cushioned insole, subtle heel stack, and hand-stitched apron make each pair as comfortable across marble corridors as they are timeless on the promenade.\n\nWhether you're heading to a Friday majlis or a boardroom overlooking the Burj, the right shoe elevates every step. Discover our new Khaleeji Classics collection — where tradition meets luxury.`,
  },
  {
    id: "post2",
    titleKey: "blogPage.posts.post2.title",
    descKey: "blogPage.posts.post2.desc",
    date: "August 15, 2026",
    category: "Women's Sneakers",
    author: "Style Editor",
    readTime: "4 min read",
    image: dubaiSneakers,
    body: `The modern Dubai woman moves fast — from drop-offs at DIFC to brunch at Souk Al Bahar and back again. Enter Padora's new Luxe Stride sneaker: cloud-like cushioning wrapped in hand-dyed Italian canvas, finished with a pearl-white sole that never yellows in the Gulf heat.\n\nSpotted across the finest malls this season, the Luxe Stride pairs effortlessly with palazzo trousers, linen blazers, and everything in between. Comfort is the new luxury — and it shows.`,
  },
  {
    id: "post3",
    titleKey: "blogPage.posts.post3.title",
    descKey: "blogPage.posts.post3.desc",
    date: "August 10, 2026",
    category: "Evening Heels",
    author: "Fashion Lead",
    readTime: "6 min read",
    image: dubaiHeels,
    body: `When the Dubai skyline turns gold, Padora's evening heels become the undisputed statement of the night. Crafted from a single piece of mirror-polished leather, our strappy sandal silhouette channels the city's architectural audacity into wearable art.\n\nThe adjustable ankle strap and anti-slip sole mean you can move from the rooftop terrace to the ballroom with quiet confidence. Available in burnished gold, obsidian black, and desert rose.`,
  },
  {
    id: "post4",
    titleKey: "blogPage.posts.post4.title",
    descKey: "blogPage.posts.post4.desc",
    date: "August 5, 2026",
    category: "Men's Footwear",
    author: "Padora Atelier",
    readTime: "5 min read",
    image: dubaiFormal,
    body: `The Oxford shoe is the backbone of every polished wardrobe. For Dubai's corporate world — where first impressions happen in marble lobbies and glass-walled boardrooms — Padora's Balmoral Oxford in rich espresso calfskin delivers quiet authority.\n\nWith a Goodyear-welted sole built for the Gulf heat and a hand-burnished cap toe, this is a shoe built not just to wear, but to be remembered in. Pair it with a linen suit for DIFC mornings or a kandura for formal occasions.`,
  },
  {
    id: "post5",
    titleKey: "blogPage.posts.post5.title",
    descKey: "blogPage.posts.post5.desc",
    date: "August 1, 2026",
    category: "Craftsmanship",
    author: "Master Cobbler",
    readTime: "7 min read",
    image: leatherCraft,
    body: `Every Padora shoe begins as a flat, raw hide and ends as a piece of art. Our atelier follows a 72-step process — from hand-clicking the upper pattern to the final mirror-polish — that takes an average of four days per pair.\n\nWhy does this matter? Because shortcuts show. A shoe that is rushed through production loses its shape within months, while a hand-lasted Padora piece holds its structure for years, ageing into something richer and more personal with each wear.`,
  },
  {
    id: "post6",
    titleKey: "blogPage.posts.post6.title",
    descKey: "blogPage.posts.post6.desc",
    date: "July 27, 2026",
    category: "Kids' Footwear",
    author: "Family Style Editor",
    readTime: "4 min read",
    image: dubaiKids,
    body: `Growing feet need room, support, and a little magic. Padora's junior collection is engineered around pediatric foot development guidelines while still looking unmistakably cool on the playground or the park path.\n\nSoft suede toe boxes, velcro closures for independence, and memory foam insoles make our kids' range a favourite among Dubai parents who refuse to compromise on quality — even for school shoes.`,
  },
  {
    id: "post7",
    titleKey: "blogPage.posts.post7.title",
    descKey: "blogPage.posts.post7.desc",
    date: "July 22, 2026",
    category: "Women's Sneakers",
    author: "Style Editor",
    readTime: "5 min read",
    image: dubaiSneakers,
    body: `White sneakers are the great equalizer of modern fashion. Whether you are at a weekend souk, an art gallery opening in Alserkal, or a rooftop brunch at Zero Gravity, a pristine pair of white trainers fits every scene.\n\nPadora's new Cloud Canvas sneaker features a Japanese rubber sole and a breathable mesh upper that keeps feet cool even in Dubai's summer. And yes — it comes with our signature amber lace set for a touch of brand identity.`,
  },
  {
    id: "post8",
    titleKey: "blogPage.posts.post8.title",
    descKey: "blogPage.posts.post8.desc",
    date: "July 18, 2026",
    category: "Evening Heels",
    author: "Fashion Lead",
    readTime: "5 min read",
    image: dubaiHeels,
    body: `An abaya is an architectural garment — long, flowing, and powerful. The shoe that completes it must carry equal weight. Padora's Jasmine kitten heel, with its slim tapered silhouette and hand-beaded ankle strap, was designed from the ground up for the abaya-wearing woman who refuses to sacrifice style for modesty.\n\nAvailable in matte black, pearl ivory, and champagne rose — each pair is finished with a cushioned footbed that makes all-night events genuinely comfortable.`,
  },
  {
    id: "post9",
    titleKey: "blogPage.posts.post9.title",
    descKey: "blogPage.posts.post9.desc",
    date: "July 14, 2026",
    category: "Men's Footwear",
    author: "Padora Atelier",
    readTime: "4 min read",
    image: dubaiLoafers,
    body: `The slip-on loafer is arguably the most versatile shoe in a man's wardrobe. It transitions effortlessly from weekend casual to smart-casual office looks without missing a beat — and in Dubai, where versatility is everything, that matters.\n\nPadora's Casablanca Loafer, hand-stitched with a tassel detail in aged brass, is the shoe our team reaches for on those days when they need to look put-together without trying too hard. Available in cognac, navy, and forest green.`,
  },
  {
    id: "post10",
    titleKey: "blogPage.posts.post10.title",
    descKey: "blogPage.posts.post10.desc",
    date: "July 9, 2026",
    category: "Craftsmanship",
    author: "Master Cobbler",
    readTime: "6 min read",
    image: leatherCraft,
    body: `Full-grain, top-grain, corrected-grain — the leather world has its own vocabulary, and it directly affects how long your shoes will last and how well they will age.\n\nAt Padora, we use exclusively full-grain calfskin sourced from tanneries in Italy and Spain. Full-grain leather retains the natural surface of the hide, meaning it develops a unique patina over time that synthetic materials simply cannot replicate. Here's our complete breakdown of what to look for when buying genuine leather footwear.`,
  },
  {
    id: "post11",
    titleKey: "blogPage.posts.post11.title",
    descKey: "blogPage.posts.post11.desc",
    date: "July 4, 2026",
    category: "Shoe Care",
    author: "Padora Atelier",
    readTime: "5 min read",
    image: leatherCraft,
    body: `Dubai's climate — extreme heat, humidity during summer, and air-conditioned interiors — creates unique challenges for leather footwear. Constant temperature changes cause leather to dry and crack faster than in temperate climates.\n\nOur care protocol: cedar shoe trees immediately after every wear, a monthly conditioning with our Padora Leather Balm, and a microfibre buff before each outing. Store in fabric dust bags, not plastic, to allow the leather to breathe. Follow these steps and your Padora shoes will outlast the decades.`,
  },
  {
    id: "post12",
    titleKey: "blogPage.posts.post12.title",
    descKey: "blogPage.posts.post12.desc",
    date: "June 28, 2026",
    category: "Kids' Footwear",
    author: "Family Style Editor",
    readTime: "4 min read",
    image: dubaiKids,
    body: `Back-to-school season in Dubai starts in September, which means August is the perfect time to invest in quality school footwear that will carry your children through a full academic year.\n\nPadora's School Classic is a closed-toe leather shoe with an anti-bacterial lining, reinforced toe cap, and extra-depth insole for growing feet. Approved for uniform standards across most UAE schools and built tough enough to survive the playground.`,
  },
  {
    id: "post13",
    titleKey: "blogPage.posts.post13.title",
    descKey: "blogPage.posts.post13.desc",
    date: "June 23, 2026",
    category: "Men's Footwear",
    author: "Padora Atelier",
    readTime: "5 min read",
    image: dubaiFormal,
    body: `Summer in Dubai means retreating indoors, but your footwear style doesn't have to retreat with it. Our Summer Business collection introduces a lightweight Derby shoe in perforated leather — the same elegant silhouette as our Classics, but with ventilation channels built into the upper.\n\nPaired with lightweight wool trousers and a linen shirt, the Summer Derby keeps you looking sharp for morning meetings while remaining breathable through the afternoon. Padora style, engineered for the Gulf summer.`,
  },
  {
    id: "post14",
    titleKey: "blogPage.posts.post14.title",
    descKey: "blogPage.posts.post14.desc",
    date: "June 18, 2026",
    category: "Women's Sneakers",
    author: "Style Editor",
    readTime: "4 min read",
    image: dubaiSneakers,
    body: `Dubai Fashion Week brought a clear message this season: athletic footwear is a permanent fixture in luxury wardrobes, not a trend. The designers who showed this season consistently paired their most elevated looks with tailored sneakers.\n\nPadora's response is the Atelier Runner — a sneaker built on a running-shoe last for genuine comfort, but finished with Italian suede overlays and a gum-leather sole that keeps it firmly in the luxury tier. Seen in the front rows, now available in-store.`,
  },
  {
    id: "post15",
    titleKey: "blogPage.posts.post15.title",
    descKey: "blogPage.posts.post15.desc",
    date: "June 12, 2026",
    category: "Evening Heels",
    author: "Fashion Lead",
    readTime: "6 min read",
    image: dubaiHeels,
    body: `Eid Al Adha brings some of Dubai's most spectacular fashion moments — and the shoes are no exception. This year's most coveted look pairs a richly embroidered abaya with a pointed-toe mule in hand-painted leather.\n\nPadora's Eid Exclusive edition features 24 hours of hand-painting per pair and is produced in a limited run of 50 pairs. Each shoe is signed by the artisan and comes with a certificate of authenticity. Pre-orders opened this week — and they are going fast.`,
  },
  {
    id: "post16",
    titleKey: "blogPage.posts.post16.title",
    descKey: "blogPage.posts.post16.desc",
    date: "June 7, 2026",
    category: "Shoe Care",
    author: "Padora Atelier",
    readTime: "5 min read",
    image: leatherCraft,
    body: `Not all shoe repairs are created equal. A bad resoling job can ruin the silhouette of a beautifully lasted shoe, while a skilled cobbler can extend a great pair's life by another decade.\n\nPadora's in-house repair service is staffed by the same artisans who build our shoes. We replace soles with the same materials used originally, re-dye scuffed leather to its original depth, and re-last any shoe that has lost its shape. Bring your Padora shoes to our Dubai store — we'll make them new again.`,
  },
  {
    id: "post17",
    titleKey: "blogPage.posts.post17.title",
    descKey: "blogPage.posts.post17.desc",
    date: "June 1, 2026",
    category: "Men's Footwear",
    author: "Padora Atelier",
    readTime: "4 min read",
    image: dubaiLoafers,
    body: `Wedding season in the Gulf calls for footwear that can hold its own against embroidered bisht robes and custom-tailored suits. Padora's Al-Noor wedding collection — named after the Arabic word for light — features shoes with a hand-applied mother-of-pearl finish on the toe box.\n\nThe result is a shoe that catches the light with every step on the dance floor, while remaining grounded in classic proportions that will look as elegant in photographs decades from now. Made to order in 8 widths.`,
  },
  {
    id: "post18",
    titleKey: "blogPage.posts.post18.title",
    descKey: "blogPage.posts.post18.desc",
    date: "May 25, 2026",
    category: "Kids' Footwear",
    author: "Family Style Editor",
    readTime: "3 min read",
    image: dubaiKids,
    body: `Teaching children about quality footwear from a young age instills habits that last a lifetime. At Padora, we believe that every child deserves shoes that support their natural development while also building their sense of personal style.\n\nOur Mini Padora collection introduces children to premium materials through age-appropriate designs — soft leathers, bright colours, and easy-close systems that build independence. Because the first shoe a child chooses for themselves is the beginning of their style story.`,
  },
];

// ── Category filter list ───────────────────────────────────────────────────
const CATEGORIES = ["All", "Men's Footwear", "Women's Sneakers", "Evening Heels", "Kids' Footwear", "Craftsmanship", "Shoe Care"];

// ── Read-more modal ────────────────────────────────────────────────────────
function PostModal({ post, onClose, t }) {
  if (!post) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal image */}
          <div className="relative h-52 sm:h-64 shrink-0 overflow-hidden bg-gray-100">
            <img
              src={post.image}
              alt={t(post.titleKey)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-4 start-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold rounded-full border border-orange-100">
              {post.category}
            </span>
            <button
              onClick={onClose}
              className="absolute top-4 end-4 p-2 bg-white/90 rounded-full hover:bg-white transition"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
              <User className="w-3.5 h-3.5" />
              <span>{post.author}</span>
              <span>·</span>
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
              <span>·</span>
              <span>{post.date}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-5 leading-snug">
              {t(post.titleKey)}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4 italic">
              {t(post.descKey)}
            </p>
            <div className="border-t border-gray-100 pt-5 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {post.body}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
const Blog = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#f8f5f0] min-h-screen text-gray-900 selection:bg-orange-500 selection:text-white pb-24">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-orange-50/80 via-gray-50 to-amber-50/60 text-gray-900 py-16 sm:py-24 px-4 sm:px-6 border-b border-gray-200/70 overflow-hidden text-center">
        <div className="absolute top-0 start-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 end-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200/80 text-orange-600 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Footwear Stories from Dubai
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight">
              {t("blogPage.title")}
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t("blogPage.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filters ──────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 flex flex-wrap gap-2 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200 ${
              activeCategory === cat
                ? "bg-orange-500 text-white border-orange-500 shadow-md"
                : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            {cat === "All" ? (
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                All Posts
              </span>
            ) : (
              cat
            )}
          </button>
        ))}
      </div>

      {/* ── Posts Grid ────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map((post, idx) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 hover:shadow-xl transition-all flex flex-col group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                {/* Card image */}
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={post.image}
                    alt={t(post.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-4 start-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold rounded-full border border-orange-100 shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Card content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3.5">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl group-hover:text-orange-600 transition mb-3 leading-snug">
                    {t(post.titleKey)}
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {t(post.descKey)}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <button className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 group/btn">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t("blogPage.readMore")}</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Post Modal ────────────────────────────────────────────────── */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          t={t}
        />
      )}

    
    </div>
  );
};

export default Blog;

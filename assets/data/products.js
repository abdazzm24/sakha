const PRODUCTS = [
  {
    id: 1,
    name: "Seragam SD",
    slug: "seragam-sd",
    category: "Seragam Sekolah",
    price: 85000,
    minOrder: 12,
    image: "assets/images/products/seragam-sd.png",
    images: [
      "assets/images/products/seragam-sd-1.png",
      "assets/images/products/seragam-sd-2.png",
      "assets/images/products/seragam-sd-3.png",
      "assets/images/products/seragam-sd-4.png"
    ],
    description: "Seragam SD berkualitas tinggi dengan bahan yang nyaman dan tahan lama. Cocok untuk kegiatan belajar sehari-hari.",
    longDescription: "Seragam SD kami dibuat dari bahan katun berkualitas yang nyaman dipakai sepanjang hari. Tersedia dalam ukuran 1 hingga 6 SD dengan pilihan warna putih, merah, dan biru. Jahitan rapi dan kuat memastikan seragam bertahan lama meskipun dicuci berkali-kali. Kami juga menyediakan layanan sablon nama sekolah dan logo.",
    material: "Katun 100%",
    sizes: ["S (6-8 th)", "M (9-11 th)", "L (12-14 th)"],
    colors: ["Putih", "Merah", "Biru"],
    features: ["Bahan adem & menyerap keringat", "Jahitan kuat & rapi", "Warna tidak mudah luntur", "Bisa sablon nama sekolah"],
    badge: "Terlaris",
    rating: 4.9,
    reviewCount: 124
  },
  {
    id: 2,
    name: "Seragam Batik",
    slug: "seragam-batik",
    category: "Batik",
    price: 95000,
    minOrder: 12,
    image: "assets/images/products/seragam-batik.png",
    images: [
      "assets/images/products/seragam-batik-1.png",
      "assets/images/products/seragam-batik-2.png"
    ],
    description: "Seragam Batik modern dengan desain rapi dan profesional. Dibuat dengan bahan premium.",
    longDescription: "Seragam Batik kami menggunakan bahan drill premium yang memberikan tampilan rapi dan profesional. Tersedia untuk putih-biru (harian) dan batik (hari tertentu). Ukuran dapat dikustomisasi sesuai kebutuhan siswa.",
    material: "Drill Premium",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Putih", "Biru Dongker"],
    features: ["Material drill premium", "Anti kusut", "Mudah disetrika", "Potongan modern"],
    badge: null,
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: 3,
    name: "Seragam Batik",
    slug: "seragam-batik",
    category: "Batik",
    price: 110000,
    minOrder: 12,
    image: "assets/images/products/seragam-batik.png",
    images: [
      "assets/images/products/seragam-batik-3.png",
      "assets/images/products/seragam-batik-4.png"
    ],
    description: "Seragam Batik dengan potongan modern dan elegan. Nyaman dipakai seharian.",
    longDescription: "Seragam Batik kami dirancang dengan potongan yang lebih modern dan elegan, sesuai untuk remaja yang aktif. Tersedia untuk pria dan wanita dengan model yang berbeda namun tetap seragam.",
    material: "Tropical Wool",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Putih", "Abu-abu"],
    features: ["Material premium", "Potongan modern", "Tersedia baju wanita", "Bisa bordir nama"],
    badge: "Baru",
    rating: 4.7,
    reviewCount: 67
  },
  {
    id: 4,
    name: "Seragam Batik",
    slug: "seragam-batik",
    category: "Batik",
    price: 125000,
    minOrder: 24,
    image: "assets/images/products/seragam-batik-ungu.png",
    images: [
      "assets/images/products/seragam-batik-5.jpg",
      "assets/images/products/seragam-batik-6.png"
    ],
    description: "Batik sekolah motif eksklusif dengan kualitas terbaik. Bisa custom motif sesuai permintaan.",
    longDescription: "Batik sekolah kami tersedia dalam berbagai motif yang bisa disesuaikan dengan identitas sekolah. Menggunakan bahan primissima yang halus dan nyaman, dengan pewarna yang tidak mudah luntur.",
    material: "Primissima",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Custom motif"],
    features: ["Motif bisa dikustomisasi", "Warna tidak luntur", "Bahan halus", "Bisa sablon/bordir logo"],
    badge: "Custom",
    rating: 4.9,
    reviewCount: 203
  },
  {
    id: 5,
    name: "Seragam Olahraga",
    slug: "seragam-olahraga",
    category: "Olahraga",
    price: 75000,
    minOrder: 12,
    image: "assets/images/products/seragam-olahraga.png",
    images: [
      "assets/images/products/seragam-olahraga-1.png",
      "assets/images/products/seragam-olahraga-2.png",
    ],
    description: "Seragam olahraga sporty dan nyaman untuk aktivitas fisik sehari-hari di sekolah.",
    longDescription: "Seragam olahraga kami menggunakan bahan polyester dryfit yang cepat kering dan menyerap keringat. Cocok untuk semua jenis olahraga. Tersedia untuk SD, SMP, dan SMA.",
    material: "Polyester Dryfit",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Merah-Putih", "Biru-Putih", "Hijau-Putih"],
    features: ["Quick dry", "Menyerap keringat", "Elastis & fleksibel", "Warna cerah & tahan lama"],
    badge: null,
    rating: 4.6,
    reviewCount: 78
  }
];

// Helper functions
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}
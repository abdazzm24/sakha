const PORTFOLIOS = [
  {
    id: 1,
    school: "SDIT Insan Mulia",
    address: "Jl. Janti Sel. No.15 A, Bandungrejosari, Kec. Sukun",
    city: "Kota Malang",
    type: "Seragam SD",
    qty: "480 pcs",
    year: 2024,
    image: "assets/images/portfolio/porto-1.png",
    height: 320,
    description: "Pengerjaan seragam lengkap untuk SDIT Insan Mulia meliputi seragam putih-merah, batik sekolah, dan seragam olahraga. Diselesaikan dalam 14 hari kerja."
  },
  {
    id: 2,
    school: "PAUD IT Insan Mulia",
    address: "Jl. Keben II Surya Timur, Bandungrejosari, Kec. Sukun",
    city: "Kota Malang",
    type: "Seragam PAUD",
    qty: "620 pcs",
    year: 2024,
    image: "assets/images/portfolio/porto-2.png",
    height: 420,
    description: "Produksi seragam PAUD lengkap untuk 3 angkatan siswa baru. Menggunakan bahan drill premium dengan bordir logo sekolah."
  },
  {
    id: 3,
    school: "SD Plus Qurrota A'yun",
    address: "Jl. Kolonel Sugiono Gg. 21 C No.41, Gadang, Kec. Sukun",
    city: "Kota Malang",
    type: "Seragam SD",
    qty: "750 pcs",
    year: 2024,
    image: "assets/images/portfolio/porto-3.png",
    height: 280,
    description: "Seragam SD dan batik eksklusif dengan motif khusus terinspirasi dari ikon kota Malang. Desain dikerjakan bersama komite sekolah."
  },
  {
    id: 4,
    school: "KB - TK Qurrota A'yun",
    address: "Jl. Perum Gadang Regency No. F6, Gadang, Kec. Sukun",
    city: "Kota Malang",
    type: "Seragam KB - TK",
    qty: "300 pcs",
    year: 2023,
    image: "assets/images/portfolio/porto-4.png",
    height: 360,
    description: "Seragam KB - TK dan batik untuk guru dan karyawan KB - TK Qurrota A'yun. Proses produksi cepat dan tepat waktu."
  },
  {
    id: 5,
    school: "KB & TKIT Al-Hikmah",
    address: "Jl. Raya Candi VI C Selatan No.3, RT.9/RW.6,  Karangbesuki, Kec. Sukun",
    city: "Kota Malang",
    type: "Seragam KB - TK",
    qty: "540 pcs",
    year: 2024,
    image: "assets/images/portfolio/porto-5.png",
    height: 300,
    description: "Batik sekolah dengan motif islami eksklusif yang mencerminkan nilai-nilai keislaman. Motif dirancang khusus bersama pihak sekolah."
  },
  {
    id: 6,
    school: "SDIT Insan Kamil",
    address: "Sukci, Bulusari, Kec. Gempol",
    city: "Kabupaten Pasuruan",
    type: "Seragam SD",
    qty: "860 pcs",
    year: 2023,
    image: "assets/images/portfolio/porto-6.png",
    height: 380,
    description: "Seragam olahraga untuk seluruh siswa SDIT Insan Kamil. Bahan dryfit berkualitas tinggi dengan sablon nama sekolah."
  },
  {
    id: 7,
    school: "KB & TKIT Insan Kamil",
    address: "Sukci, Bulusari, Kec. Gempol",
    city: "Kabupaten Pasuruan",
    type: "Seragam KB - TK",
    qty: "860 pcs",
    year: 2023,
    image: "assets/images/portfolio/porto-7.png",
    height: 380,
    description: "Seragam olahraga untuk seluruh siswa KB & TKIT Insan Kamil. Bahan dryfit berkualitas tinggi dengan sablon nama sekolah."
  }
];

function getPortfolioById(id) {
  return PORTFOLIOS.find(p => p.id === parseInt(id));
}
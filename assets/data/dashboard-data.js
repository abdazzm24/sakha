const USERS = [
  { id: 1, name: "Ahmad Fauzi", email: "ahmad@sdnsidoarjo1.sch.id", phone: "08123456789", school: "SDN 1 Sidoarjo", role: "Kepala Sekolah", joinDate: "10 Jan 2025", orders: 3, status: "active" },
  { id: 2, name: "Siti Rahayu", email: "siti@smpn3sby.sch.id", phone: "08234567890", school: "SMPN 3 Surabaya", role: "Bendahara", joinDate: "5 Feb 2025", orders: 2, status: "active" },
  { id: 3, name: "Budi Santoso", email: "budi@sman2mlg.sch.id", phone: "08345678901", school: "SMAN 2 Malang", role: "Tata Usaha", joinDate: "20 Feb 2025", orders: 5, status: "active" },
  { id: 4, name: "Dewi Lestari", email: "dewi@man1gresik.sch.id", phone: "08456789012", school: "MAN 1 Gresik", role: "Wakil Kepala", joinDate: "1 Mar 2025", orders: 1, status: "inactive" },
  { id: 5, name: "Rizky Pratama", email: "rizky@sdialfalah.sch.id", phone: "08567890123", school: "SDI Al Falah", role: "Bendahara", joinDate: "15 Mar 2025", orders: 4, status: "active" }
];

const TRANSACTIONS = [
  {
    id: "TRX-2025-001",
    customer: "Ahmad Fauzi",
    school: "SDN 1 Sidoarjo",
    items: [
      { productId: 1, name: "Seragam SD", qty: 120, price: 85000 },
      { productId: 5, name: "Seragam Olahraga", qty: 60, price: 75000 }
    ],
    total: 14700000,
    status: "selesai",
    date: "10 April 2025",
    paymentMethod: "Transfer Bank",
    note: "Seragam untuk siswa baru TP 2025/2026"
  },
  {
    id: "TRX-2025-002",
    customer: "Siti Rahayu",
    school: "SMPN 3 Surabaya",
    items: [
      { productId: 2, name: "Seragam SMP", qty: 200, price: 95000 },
      { productId: 4, name: "Batik Sekolah", qty: 200, price: 125000 }
    ],
    total: 44000000,
    status: "proses",
    date: "5 Mei 2025",
    paymentMethod: "Transfer Bank",
    note: "Pesanan untuk seluruh kelas 7"
  },
  {
    id: "TRX-2025-003",
    customer: "Budi Santoso",
    school: "SMAN 2 Malang",
    items: [
      { productId: 3, name: "Seragam SMA", qty: 300, price: 110000 },
      { productId: 4, name: "Batik Sekolah", qty: 300, price: 125000 }
    ],
    total: 70500000,
    status: "selesai",
    date: "20 Maret 2025",
    paymentMethod: "Transfer Bank",
    note: ""
  },
  {
    id: "TRX-2025-004",
    customer: "Rizky Pratama",
    school: "SDI Al Falah",
    items: [
      { productId: 4, name: "Batik Sekolah", qty: 180, price: 125000 }
    ],
    total: 22500000,
    status: "pending",
    date: "2 Juni 2025",
    paymentMethod: "COD",
    note: "Motif custom islami"
  },
  {
    id: "TRX-2025-005",
    customer: "Dewi Lestari",
    school: "MAN 1 Gresik",
    items: [
      { productId: 6, name: "PDH", qty: 80, price: 145000 }
    ],
    total: 11600000,
    status: "proses",
    date: "15 Mei 2025",
    paymentMethod: "Transfer Bank",
    note: "PDH untuk guru dan karyawan"
  }
];

const DASHBOARD_STATS = {
  totalProducts: PRODUCTS ? PRODUCTS.length : 6,
  totalArticles: ARTICLES ? ARTICLES.length : 6,
  totalUsers: USERS.length,
  totalTransactions: TRANSACTIONS.length,
  totalRevenue: TRANSACTIONS.reduce((sum, t) => sum + t.total, 0),
  pendingOrders: TRANSACTIONS.filter(t => t.status === 'pending').length,
  processingOrders: TRANSACTIONS.filter(t => t.status === 'proses').length,
  completedOrders: TRANSACTIONS.filter(t => t.status === 'selesai').length
};

function getTransactionById(id) {
  return TRANSACTIONS.find(t => t.id === id);
}

function getStatusBadge(status) {
  const map = {
    'selesai': 'badge-success',
    'proses': 'badge-warning',
    'pending': 'badge-primary',
    'batal': 'badge-danger'
  };
  return map[status] || 'badge-primary';
}

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}
// Users data - also defined in dashboard-data.js
// This file re-exports for standalone use
if (typeof USERS === 'undefined') {
  var USERS = [
    { id: 1, name: "Ahmad Fauzi", email: "ahmad@sdnsidoarjo1.sch.id", phone: "08123456789", school: "SDN 1 Sidoarjo", role: "Kepala Sekolah", joinDate: "10 Jan 2025", orders: 3, status: "active" },
    { id: 2, name: "Siti Rahayu", email: "siti@smpn3sby.sch.id", phone: "08234567890", school: "SMPN 3 Surabaya", role: "Bendahara", joinDate: "5 Feb 2025", orders: 2, status: "active" },
    { id: 3, name: "Budi Santoso", email: "budi@sman2mlg.sch.id", phone: "08345678901", school: "SMAN 2 Malang", role: "Tata Usaha", joinDate: "20 Feb 2025", orders: 5, status: "active" },
    { id: 4, name: "Dewi Lestari", email: "dewi@man1gresik.sch.id", phone: "08456789012", school: "MAN 1 Gresik", role: "Wakil Kepala", joinDate: "1 Mar 2025", orders: 1, status: "inactive" },
    { id: 5, name: "Rizky Pratama", email: "rizky@sdialfalah.sch.id", phone: "08567890123", school: "SDI Al Falah", role: "Bendahara", joinDate: "15 Mar 2025", orders: 4, status: "active" }
  ];
}
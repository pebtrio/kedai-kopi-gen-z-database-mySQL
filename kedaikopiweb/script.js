// Navigasi antar section
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");
const btnScroll = document.getElementById("btn-scroll");

function showSection(id) {
  sections.forEach((sec) => sec.classList.remove("aktif"));
  document.getElementById(id).classList.add("aktif");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showSection(link.dataset.section);
  });
});

if (btnScroll) {
  btnScroll.addEventListener("click", () => showSection("menu"));
}

// ========================
// DATA PRODUK
// ========================
const produkList = [
  {
    nama: "Espresso",
    harga: 12000,
    img: "https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg",
  },
  {
    nama: "Americano",
    harga: 15000,
    img: "https://i.pinimg.com/1200x/bc/0c/ff/bc0cffc8b21c24b4b571e98b9ab5da12.jpg",
  },
  {
    nama: "Cappuccino",
    harga: 18000,
    img: "https://i.pinimg.com/1200x/9d/88/b1/9d88b1aff2041fe5095d8fa1eea8977f.jpg",
  },
  {
    nama: "Latte",
    harga: 18000,
    img: "https://i.pinimg.com/1200x/36/8c/d2/368cd29f3543ea79e01f921e968030e4.jpg",
  },
  {
    nama: "Macchiato",
    harga: 20000,
    img: "https://i.pinimg.com/1200x/15/64/e0/1564e0b50862040029cc4270e2f70a12.jpg",
  },
  {
    nama: "Mocha",
    harga: 20000,
    img: "https://i.pinimg.com/1200x/f0/71/9f/f0719ffc75c241e47f97a528b9673e92.jpg",
  },
  {
    nama: "Flat White",
    harga: 20000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXIImh2McClgyf6CLFOix7U1ct9Cl3Y6lAgg&s.jpg",
  },
  {
    nama: "Ropang Coklat",
    harga: 18000,
    img: "https://a-cdn.sindonews.net/dyn/620/content/2019/06/19/185/1412769/begini-cara-membuat-ropang-cokelat-keju-yang-hangat-dan-lezat-lRY-thumb.jpg",
  },
  {
    nama: "Ropang Keju",
    harga: 18000,
    img: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/6ee7f860-9a30-4dcc-9a27-ac702d40df57_Go-Biz_20240211_150110.jpeg",
  },
  {
    nama: "Roti Salad",
    harga: 22000,
    img: "https://asset.kompas.com/crops/UZ2o039VgvK6dPQtVRBLqzvFdxY=/0x5:968x651/1200x800/data/photo/2022/05/13/627de3c4da550.jpg",
  },
];

const daftarDiv = document.getElementById("daftar-produk");
const isiKeranjang = document.getElementById("isi-keranjang");
const totalSpan = document.getElementById("total");
const searchInput = document.getElementById("search"); // <- tambahkan ini
let total = 0;

// ========================
// FUNGSI MENAMPILKAN PRODUK
// ========================
function tampilkanProduk(list) {
  daftarDiv.innerHTML = "";
  if (list.length === 0) {
    daftarDiv.innerHTML = "<p>Tidak ada produk yang cocok 😢</p>";
    return;
  }

  list.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("produk-item");
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nama}">
      <h4>${p.nama}</h4>
      <p>Rp ${p.harga.toLocaleString("id-ID")}</p>
      <button>Tambah</button>
    `;
    div
      .querySelector("button")
      .addEventListener("click", () => tambahKeKeranjang(p));
    daftarDiv.appendChild(div);
  });
}

// ========================
// FUNGSI TAMBAH KE KERANJANG
// ========================
function tambahKeKeranjang(p) {
  const item = document.createElement("p");
  item.textContent = `${p.nama} - Rp ${p.harga.toLocaleString("id-ID")}`;
  isiKeranjang.appendChild(item);
  total += p.harga;
  totalSpan.textContent = total.toLocaleString("id-ID");
}

// ========================
// FITUR SEARCH PRODUK
// ========================
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const hasil = produkList.filter((p) =>
      p.nama.toLowerCase().includes(keyword)
    );
    tampilkanProduk(hasil);
  });
}

// ========================
// RESET KERANJANG
// ========================
document.getElementById("btn-reset").addEventListener("click", () => {
  isiKeranjang.innerHTML = "";
  total = 0;
  totalSpan.textContent = 0;
  document.getElementById("hasil-checkout").innerHTML = "";
});

// ========================
// CHECKOUT
// ========================
document.getElementById("btn-checkout").addEventListener("click", () => {
  if (total === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  const voucher = document.getElementById("voucher").value.trim();
  let diskon = voucher === "NGOPI10" ? 0.1 : 0;
  const totalBayar = Math.round(total - total * diskon);

  console.log("TOTAL DIKIRIM:", totalBayar);

  fetch("simpan_transaksi.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      total: totalBayar,
    }),
  })
    .then((res) => res.text()) // PENTING untuk debug
    .then((text) => {
      console.log("RESPON PHP:", text);

      const data = JSON.parse(text);

      if (data.status === "success") {
        document.getElementById("hasil-checkout").innerHTML = `
          <p>
            ✅ Transaksi berhasil disimpan<br>
            <strong>Total: Rp ${totalBayar.toLocaleString("id-ID")}</strong>
          </p>
        `;
      } else {
        alert("Checkout gagal: " + data.msg);
      }
    })
    .catch((err) => {
      console.error("FETCH ERROR:", err);
      alert("Checkout error!");
    });
});

// Tampilkan semua produk saat pertama kali
tampilkanProduk(produkList);

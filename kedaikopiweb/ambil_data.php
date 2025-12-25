<?php
include 'koneksi.php';

$data = [];
$query = mysqli_query($koneksi, "SELECT nama_produk, harga FROM produk");

while ($row = mysqli_fetch_assoc($query)) {
    $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);
?>

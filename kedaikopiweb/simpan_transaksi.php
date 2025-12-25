<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'koneksi.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "msg" => "Data kosong"]);
    exit;
}

if (!isset($data['total'])) {
    echo json_encode(["status" => "error", "msg" => "Total tidak dikirim"]);
    exit;
}

$total = (int)$data['total'];

$query = mysqli_query(
    $koneksi,
    "INSERT INTO transaksi (total_harga) VALUES ($total)"
);

if ($query) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode([
        "status" => "error",
        "msg" => mysqli_error($koneksi)
    ]);
}

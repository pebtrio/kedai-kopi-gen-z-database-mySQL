<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "kedai_kopi";

$koneksi = mysqli_connect($host, $user, $pass, $db);

if (!$koneksi) {
    die("Gagal koneksi: " . mysqli_connect_error());
}
?>

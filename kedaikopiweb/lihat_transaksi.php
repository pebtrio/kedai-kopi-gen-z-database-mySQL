<?php
include 'koneksi.php';

$query = mysqli_query($koneksi, "SELECT * FROM transaksi");
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Data Transaksi</title>
  <style>
    table {
      border-collapse: collapse;
      width: 50%;
    }
    th, td {
      border: 1px solid #000;
      padding: 8px;
      text-align: center;
    }
  </style>
</head>
<body>

<h2>Data Transaksi</h2>

<table>
  <tr>
    <th>ID</th>
    <th>Total</th>
    <th>Tanggal</th>
  </tr>

  <?php while ($row = mysqli_fetch_assoc($query)) { ?>
  <tr>
    <td><?= $row['id']; ?></td>
    <td>Rp <?= number_format($row['total'], 0, ',', '.'); ?></td>
    <td><?= $row['tanggal']; ?></td>
  </tr>
  <?php } ?>

</table>

</body>
</html>

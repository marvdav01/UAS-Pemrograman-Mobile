-- phpMyAdmin SQL Dump
-- version 5.2.0
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Jul 2026

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_delivery_db`
--
CREATE DATABASE IF NOT EXISTS `food_delivery_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `food_delivery_db`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `foods` (Katalog Makanan)
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `foods`
--

INSERT INTO `foods` (`id`, `name`, `description`, `price`, `image`, `created_at`) VALUES
(1, 'Nasi Goreng Spesial', 'Nasi goreng dengan telur, ayam, dan udang.', 25000, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=200&q=80', current_timestamp()),
(2, 'Mie Ayam Bakso', 'Mie ayam pangsit dengan tambahan bakso sapi.', 20000, 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=200&q=80', current_timestamp()),
(3, 'Sate Ayam Madura', '10 Tusuk sate ayam dengan bumbu kacang khas.', 30000, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=200&q=80', current_timestamp()),
(4, 'Rendang Daging Sapi', 'Olahan daging sapi dengan rempah asli Minang yang kaya rasa.', 35000, 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=200&q=80', current_timestamp()),
(5, 'Gado-Gado Spesial', 'Sayuran rebus segar dengan saus kacang legit dan telur rebus.', 18000, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80', current_timestamp()),
(6, 'Ayam Penyet Sambal Ijo', 'Ayam goreng geprek dengan sambal ijo pedas nampol.', 22000, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=200&q=80', current_timestamp()),
(7, 'Soto Ayam Lamongan', 'Kuah kuning segar dengan koya gurih dan suwiran ayam.', 15000, 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=200&q=80', current_timestamp()),
(8, 'Martabak Telur Spesial', 'Martabak gurih dengan isian daging sapi cincang dan daun bawang.', 40000, 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?auto=format&fit=crop&w=200&q=80', current_timestamp()),
(9, 'Nasi Padang Komplit', 'Nasi putih dengan lauk ayam pop, sayur nangka, dan sambal ijo.', 28000, 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=200&q=80', current_timestamp()),
(10, 'Bakso Urat Jumbo', 'Bakso sapi urat ukuran besar dengan kuah kaldu sapi yang gurih.', 20000, 'https://images.unsplash.com/photo-1596450514735-111a2fe02935?auto=format&fit=crop&w=200&q=80', current_timestamp());

-- --------------------------------------------------------

--
-- Struktur dari tabel `users` (Pengguna Aplikasi)
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','customer') NOT NULL DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
-- Note: Password sebaiknya di-hash (misal bcrypt) pada implementasi backend nyata.
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`) VALUES
(1, 'admin', 'admin', 'admin', current_timestamp());

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders` (Detail Pesanan)
--

CREATE TABLE `orders` (
  `id` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `status` enum('Menunggu','Diproses','Sedang Diantar','Selesai') NOT NULL DEFAULT 'Sedang Diantar',
  `total_price` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `food_id`, `status`, `total_price`, `created_at`) VALUES
('ORD-20240501-12345', 1, 1, 'Sedang Diantar', 25000, current_timestamp());

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

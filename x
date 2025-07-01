<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Novel List</title>
  <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    input, select { margin: 10px; padding: 5px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 10px; border: 1px solid #ccc; text-align: left; }
  </style>
</head>
<body>
  <h1>Novel List</h1>

  <div>
    <input type="text" id="searchInput" placeholder="Search by title or author" oninput="searchNovels()" />
    <select id="yearFilter" onchange="filterNovels()">
      <option value="">All Years</option>
      <option value="2019">2019</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
      <option value="2022">2022</option>
    </select>
    <select id="priceSort" onchange="sortNovels()">
      <option value="">Sort by Price</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  </div>

  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Price</th>
        <th>Year</th>
        <th>Genre</th>
      </tr>
    </thead>
    <tbody id="novelTable"></tbody>
  </table>

  <script src="main.js"></script>
</body>
</html>

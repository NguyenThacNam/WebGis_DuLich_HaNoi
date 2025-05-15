// Kiểm tra quyền admin
if (localStorage.getItem('isAdmin') !== 'true') {
  alert('Bạn không có quyền truy cập.');
  window.location.href = 'login.html';
}

const apiUrl = 'http://localhost:3000/places';
const tableBody = document.querySelector('#places-table tbody');
const addForm = document.getElementById('add-form');
const editForm = document.getElementById('edit-form');

//Phân trang
let allPlaces = [];
let currentPage = 1;
const itemsPerPage = 8;

// Tải danh sách địa điểm
function loadPlaces() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      allPlaces = data;
      renderPage(currentPage);
      renderPagination();
    })
    .catch(err => {
      console.error('Lỗi tải dữ liệu:', err);
      alert('Không thể tải danh sách địa điểm.');
    });
}

function renderPage(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const items = allPlaces.slice(start, end);

  tableBody.innerHTML = '';
  items.forEach(place => {
    const row = document.createElement('tr');
    row.innerHTML = `
      
      <td>${place.name}</td>
      <td>${place.category || ''}</td>
      <td>${place.description || ''}</td>
      <td>${place.latitude || ''}</td>
      <td>${place.longitude || ''}</td>
      <td>${place.location || ''}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-btn" onclick="startEdit(${place.id})" style="background-color:#007bff;color:white;border:none;padding:6px 12px;border-radius:4px;">Sửa</button>
          <button class="delete-btn" onclick="deletePlace(${place.id})" style="background-color:#dc3545;color:white;border:none;padding:6px 12px;border-radius:4px;">Xóa</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function renderPagination() {
  const totalPages = Math.ceil(allPlaces.length / itemsPerPage);
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  if (totalPages <= 1) return;

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '⬅️ Trước';
  prevBtn.classList.add('page-btn');
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
      renderPagination();
    }
  };

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Tiếp ➡️';
  nextBtn.classList.add('page-btn');
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
      renderPagination();
    }
  };

  paginationContainer.appendChild(prevBtn);
  const pageInfo = document.createElement('span');
  pageInfo.textContent = ` Trang ${currentPage} / ${totalPages} `;
  paginationContainer.appendChild(pageInfo);
  paginationContainer.appendChild(nextBtn);
}

// Tìm kiếm theo tên
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const filtered = allPlaces.filter(p => p.name.toLowerCase().includes(keyword));
  renderSearchResults(filtered);
});

//Danh sách địa điểm
function renderSearchResults(filteredItems) {
  tableBody.innerHTML = '';
  filteredItems.forEach(place => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${place.id}</td>
      <td>${place.name}</td>
      <td>${place.category || ''}</td>
      <td>${place.description || ''}</td>
      <td>${place.latitude || ''}</td>
      <td>${place.longitude || ''}</td>
      <td>${place.location || ''}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-btn" onclick="startEdit(${place.id})" style="background-color:#007bff;color:white;border:none;padding:6px 12px;border-radius:4px;">Sửa</button>
          <button class="delete-btn" onclick="deletePlace(${place.id})" style="background-color:#dc3545;color:white;border:none;padding:6px 12px;border-radius:4px;">Xóa</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Xoá địa điểm
function deletePlace(id) {
  if (confirm('Bạn có chắc chắn muốn xóa địa điểm này không?')) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          loadPlaces();
        } else {
          alert('Không thể xóa địa điểm.');
        }
      });
  }
}

// Thêm địa điểm
addForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const newPlace = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    description: document.getElementById('description').value,
    latitude: parseFloat(document.getElementById('latitude').value),
    longitude: parseFloat(document.getElementById('longitude').value),
    image_url: document.getElementById('image_url').value,
    location: document.getElementById('location').value,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPlace),
  })
    .then(res => {
      if (res.ok) {
        addForm.reset();
        loadPlaces();
        document.getElementById('add-success-msg').style.display = 'block';
        setTimeout(() => {
          document.getElementById('add-success-msg').style.display = 'none';
          showTab('list-tab');
        }, 2000);
      } else {
        res.text().then(text => alert('Lỗi thêm địa điểm: ' + text));
      }
    })
    .catch(err => {
      console.error('Lỗi thêm:', err);
      alert('Lỗi khi thêm địa điểm.');
    });
});

// Mở form chỉnh sửa
function startEdit(id) {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(place => {
      document.getElementById('edit-id').value = place.id;
      document.getElementById('edit-name').value = place.name;
      document.getElementById('edit-category').value = place.category || '';
      document.getElementById('edit-description').value = place.description || '';
      document.getElementById('edit-latitude').value = place.latitude || '';
      document.getElementById('edit-longitude').value = place.longitude || '';
      document.getElementById('edit-image_url').value = place.image_url || '';
      document.getElementById('edit-location').value = place.location || '';

      showTab('edit-tab');
    });
}

// Gửi form chỉnh sửa
editForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('edit-id').value;

  const updatedPlace = {
    name: document.getElementById('edit-name').value,
    category: document.getElementById('edit-category').value,
    description: document.getElementById('edit-description').value,
    latitude: parseFloat(document.getElementById('edit-latitude').value),
    longitude: parseFloat(document.getElementById('edit-longitude').value),
    image_url: document.getElementById('edit-image_url').value,
    location: document.getElementById('edit-location').value,
  };

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPlace),
  })
    .then(res => {
      if (res.ok) {
        editForm.reset();
        loadPlaces();
        document.getElementById('edit-success-msg').style.display = 'block';
        setTimeout(() => {
          document.getElementById('edit-success-msg').style.display = 'none';
          showTab('list-tab');
        }, 2000);
      } else {
        res.text().then(text => alert('Lỗi cập nhật: ' + text));
      }
    });
});

// Huỷ chỉnh sửa
function cancelEdit() {
  editForm.reset();
  showTab('list-tab');
}

// Bắt đầu
loadPlaces();

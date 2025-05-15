
// Khởi tạo bản đồ
const map = L.map('map').setView([21.0285, 105.8542], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);



// xác định vị trí
const markers = [];
let userMarker;
let userLat, userLng;

function locateUser() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;

            if (userMarker) {
                map.removeLayer(userMarker);
            }

            userMarker = L.marker([userLat, userLng])
                .addTo(map)
                .bindPopup('Vị trí hiện tại của bạn')
                .openPopup();

            map.setView([userLat, userLng], 13);
        }, () => {
            console.error('Không thể lấy vị trí của bạn.');
        });
    } else {
        console.error('Trình duyệt của bạn không hỗ trợ Geolocation.');
    }
}

locateUser();

document.getElementById('locate').addEventListener('click', locateUser);

//Hiển thị
fetch('http://localhost:3000/places')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((place) => {
            if (place.latitude && place.longitude) {
                let iconUrl = '';
                if (place.name.toLowerCase().includes('lăng bác')) {
                    iconUrl = 'icons/icon-Ho-Chi-Minh-mausoleum.png'; // icon riêng cho Lăng Bác
                } else {
                    switch (place.category) {
                        case 'Di tích lịch sử':
                            iconUrl = 'icons/icon-history.png';
                            break;
                        case 'Tâm linh':
                            iconUrl = 'icons/icon-temple.png';
                            break;
                        case 'Bảo tàng':
                            iconUrl = 'icons/icon-museum.png';
                            break;
                        case 'Giải trí':
                            iconUrl = 'icons/icon-entertainment.png';
                            break;
                        default:
                            iconUrl = 'icons/icon-default.png';
                    }
                }
                const marker = L.marker([place.latitude, place.longitude], {
                    icon: L.icon({
                        iconUrl: iconUrl,
                        iconSize: [32, 32],
                        iconAnchor: [16, 32],
                        popupAnchor: [0, -32]
                    })
                })
                    .addTo(map)
                    .bindPopup(`
                        <b>${place.name}</b><br>
                        Địa điểm: ${place.category}<br>
                        <img src="${place.image_url}" alt="${place.name}" style="width:100px;height:auto; text-align: center;"><br>
                        Mô tả: ${place.description}<br>
                        Địa chỉ: ${place.location}<br>
                        Giờ mở cửa : ${place.opening_hours}
                        <button onclick="getRoute(${place.latitude}, ${place.longitude})">Tìm Đường</button>
                    `);

                markers.push({ marker, category: place.category, name: place.name.toLowerCase() });
            } else {
                console.warn(`Tọa độ không hợp lệ cho ${place.name}`);
            }
        });

        document.getElementById('filter').addEventListener('change', function () {
            const filter = this.value;
            markers.forEach(({ marker, category }) => {
                if (filter === 'all' || category === filter) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
        });

        document.getElementById('search').addEventListener('input', function () {
            const searchQuery = this.value.toLowerCase();
            markers.forEach(({ marker, name }) => {
                if (name.includes(searchQuery)) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
        });
    })
    .catch((error) => console.error('Error loading places:', error));


function getRoute(lat, lng) {
    if (userLat && userLng) {
        L.Routing.control({
            waypoints: [
                L.latLng(userLat, userLng),
                L.latLng(lat, lng)
            ],
            routeWhileDragging: true
        }).addTo(map);
    } else {
        alert('Không thể xác định vị trí của bạn để tìm đường.');
    }
}

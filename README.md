🚚 Shipper Route Planner

Ứng dụng web mô phỏng **tối ưu hóa lộ trình giao hàng** cho shipper, được xây dựng dựa trên bài toán Người đi du lịch (Travelling Salesman Problem - TSP). Ứng dụng cho phép người dùng đặt các điểm giao hàng trực tiếp trên bản đồ, lựa chọn thuật toán tối ưu, và trực quan hóa lộ trình ngắn nhất.

📖 Giới thiệu

Trong bối cảnh thương mại điện tử và dịch vụ giao đồ ăn (ShopeeFood, Grab, Gojek) phát triển mạnh mẽ, bài toán tối ưu hóa lộ trình giao hàng đóng vai trò quan trọng trong việc:

- Giảm thiểu chi phí nhiên liệu và thời gian di chuyển của shipper
- Nâng cao chất lượng dịch vụ, giao hàng nhanh chóng
- Giảm lượng khí thải ra môi trường

## ✨ Tính năng chính

- **Tương tác bản đồ:** Click trực tiếp trên bản đồ (OpenStreetMap) để đặt điểm giao hàng
- **Lựa chọn thuật toán:**
  - **Vét cạn (Brute Force)** kết hợp Nhánh cận — tìm nghiệm chính xác 100%, phù hợp N ≤ 10
  - **Tham lam (Greedy) – Nearest Neighbor** — tốc độ nhanh, phù hợp bài toán quy mô lớn
- **Mô phỏng vật cản giao thông:**
  - Đường cấm (chặn hoàn toàn một cung đường)
  - Đường kẹt (tăng gấp đôi chi phí di chuyển trên cung đường đó)
- **Trực quan hóa kết quả:** Vẽ lộ trình bằng Polyline, hiển thị số điểm giao, thời gian tính toán (ms), tổng quãng đường (km)
- **Đo lường hiệu năng:** Chạy nhiều lần và lấy giá trị trung bình để đo thời gian thực thi chính xác hơn

## 🛠️ Công nghệ sử dụng

| Thành phần | Công nghệ |
| --- | --- |
| Giao diện | HTML5, CSS3 |
| Bản đồ | [Leaflet.js](https://leafletjs.com/) v1.9.4 |
| Nền bản đồ | OpenStreetMap Tile Layer |
| Xử lý logic | JavaScript thuần (Vanilla JS) |

## 🚀 Cách sử dụng

### Chạy ứng dụng

Không cần cài đặt gì cả — chỉ cần trình duyệt web (Chrome, Edge, Firefox...):

1. Tải file `index.html` về máy
2. Double-click vào file, hoặc kéo thả vào cửa sổ trình duyệt để mở
3. (Tùy chọn) Nếu muốn chạy qua local server thay vì mở file trực tiếp:
   ```bash
   # Dùng Python có sẵn trên máy
   python3 -m http.server 8000
   # rồi mở http://localhost:8000 trên trình duyệt
   ```

### Thao tác trên giao diện

1. **Đặt điểm giao hàng:** Click lên bất kỳ vị trí nào trên bản đồ. Điểm đầu tiên bạn click sẽ được coi là **kho xuất phát**, các điểm sau là điểm giao hàng
2. **Chọn thuật toán** ở dropdown "Chọn Giải thuật":
   - *Vét cạn (Chính xác 100%)* — chỉ nên dùng khi số điểm ≤ 10, vì độ phức tạp là giai thừa
   - *Tham ăn (Siêu nhanh)* — dùng khi số điểm nhiều, cần kết quả tức thì
3. **(Tùy chọn) Thêm vật cản mô phỏng giao thông:**
   - Nhập số thứ tự điểm bắt đầu và kết thúc (ví dụ: từ điểm 1 đến điểm 3)
   - Chọn loại: 🚫 *Đường cấm* (chặn hẳn, không đi qua được) hoặc 🚧 *Đường kẹt* (chi phí di chuyển nhân đôi)
   - Nhấn **Thêm Vật Cản** — đường vật cản sẽ hiện trên bản đồ bằng nét đứt đỏ/cam
   - Nhấn **Xóa Vật Cản** để gỡ toàn bộ vật cản đã thêm
4. **Chạy thuật toán:** Nhấn **🚀 Chạy Tìm Lộ Trình** — lộ trình tối ưu sẽ được vẽ bằng đường Polyline màu xanh, kèm theo bảng thống kê (số điểm, thời gian chạy, tổng quãng đường)
5. **Làm mới:** Nhấn **🗑️ Xóa Tất Cả Điểm** để xóa toàn bộ điểm, vật cản và lộ trình, quay về trạng thái ban đầu

## 🔍 Giải thích code

Toàn bộ logic nằm trong file `index.html`, phần `<script>`. Các hàm chính:

| Hàm | Vai trò |
| --- | --- |
| `getDistance(p1, p2)` | Tính khoảng cách đường chim bay giữa 2 tọa độ GPS bằng công thức Haversine (đơn vị km) |
| `getTravelCost(points, a, b)` | Trả về chi phí di chuyển thực tế giữa 2 điểm: `Infinity` nếu là đường cấm, nhân đôi nếu là đường kẹt, ngược lại trả về khoảng cách Haversine |
| `solveBruteForce(points)` | Giải bài toán TSP chính xác 100% bằng đệ quy quay lui (`backtrack`) kết hợp cắt tỉa nhánh cận; có cơ chế `fallbackPath` để vẫn trả về lộ trình khả dĩ nếu mọi đường đều bị chặn |
| `solveGreedyQ(points)` | Giải TSP xấp xỉ bằng thuật toán Tham lam Nearest Neighbor: tại mỗi bước chọn điểm chưa thăm gần nhất |
| `drawRoute(pathOrder)` | Vẽ lộ trình lên bản đồ bằng `L.polyline`, tính tổng chi phí và cập nhật số liệu thống kê lên giao diện |
| `blockEdge` / `setTraffic` | Đánh dấu một cạnh (cặp điểm) là đường cấm / đường kẹt, lưu trong `Set`/`Map` toàn cục |
| `edgeKey(a, b)` | Sinh khóa duy nhất cho một cạnh, không phân biệt chiều (a→b hay b→a là như nhau) |

**Luồng xử lý khi nhấn "Chạy Tìm Lộ Trình":**

```
click "Chạy Tìm Lộ Trình"
   → kiểm tra số điểm ≥ 2 và (nếu Brute Force) N ≤ 10
   → chạy thuật toán đã chọn N lần để đo thời gian trung bình
   → gọi drawRoute() để vẽ đường và cập nhật thống kê
```

## 🧮 Thuật toán

### 1. Vét cạn (Brute Force + Branch and Bound)

- Mô hình hóa bài toán thành đồ thị đầy đủ có trọng số, đỉnh 0 là kho xuất phát
- Duyệt toàn bộ (N-1)! hoán vị bằng đệ quy quay lui (backtracking)
- Cắt tỉa nhánh khi chi phí tạm thời vượt quá kỷ lục hiện có (pruning)
- Độ phức tạp thời gian: **O(N!)** — độ phức tạp không gian: **O(N²)**
- Đảm bảo tìm được lộ trình ngắn nhất tuyệt đối, nhưng không khả thi khi N > 10–12

### 2. Tham lam (Greedy – Nearest Neighbor)

- Bắt đầu từ kho, luôn chọn điểm chưa thăm gần nhất để di chuyển tiếp
- Lặp lại đến khi thăm hết tất cả các điểm, sau đó quay về kho
- Độ phức tạp thời gian: **O(N²)**
- Tốc độ nhanh, dễ triển khai, nhưng không đảm bảo tối ưu toàn cục

### 3. Tính khoảng cách — Công thức Haversine

Khoảng cách giữa hai tọa độ GPS được tính theo công thức Haversine, cho khoảng cách great-circle (đường ngắn nhất trên mặt cầu Trái Đất):

```
a = sin²(Δlat/2) + cos(lat1)·cos(lat2)·sin²(Δlng/2)
d = 2R · atan2(√a, √(1-a))
```

Trong đó R = 6371 km (bán kính trung bình Trái Đất).

## 📁 Cấu trúc dự án

```
├── index.html      # Toàn bộ ứng dụng (HTML + CSS + JS trong 1 file)
└── README.md       # Tài liệu mô tả dự án
```

## 👥 Nhóm thực hiện

Đồ án môn học — Viện Công nghệ Thông tin và Điện, Điện tử, Trường Đại học Giao thông Vận tải TP.HCM

**GVHD:** Bùi Trọng Hiếu

**Nhóm SVTH:**
1. Trần Khải Đăng
2. Nguyễn Thành Đông
3. Nguyễn Thành Toàn
4. Lê Đăng Khoa
5. Lê Hoài Quốc

## 📚 Tài liệu tham khảo

- Little, J.D.C. et al. (1963), *An Algorithm for the Traveling Salesman Problem*, Operations Research
- Nikolaev, A., Batsyn, M. (2018), *Branch-and-Bound Algorithm for Symmetric Travelling Salesman Problem*, Springer LNCS
- Wikipedia, [*Nearest neighbour algorithm*](https://en.wikipedia.org/wiki/Nearest_neighbour_algorithm)
- Wikipedia, [*Haversine formula*](https://en.wikipedia.org/wiki/Haversine_formula)
- [Leaflet.js — Official Documentation](https://leafletjs.com/)

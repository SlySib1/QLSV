# Quản Lý Sinh Viên

## Giới Thiệu
Đây là một ứng dụng quản lý sinh viên sử dụng Node.js, cho phép người dùng thêm, cập nhật, tìm kiếm và xóa thông tin sinh viên. Dữ liệu sinh viên được lưu trữ trong file `students.json`.

## Chức Năng Chính
- **Thêm sinh viên**: Nhập thông tin sinh viên mới vào hệ thống.
  
![Thêm sinh viên](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/Nh%E1%BA%ADp%20th%C3%B4ng%20tin%20sinh%20vi%C3%AAn.png)

- **Cập nhật sinh viên**: Chỉnh sửa thông tin sinh viên hiện có.

![Cập nhật thông tin](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/C%E1%BA%ADp%20nh%E1%BA%ADt%20th%C3%B4ng%20tin.png)

- **Tìm kiếm sinh viên**: Tìm kiếm sinh viên theo MSSV hoặc họ tên.

![Tìm kiếm sinh viên](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/T%C3%ACm%20ki%E1%BA%BFm%20sinh%20vi%C3%AAn.png)

- **Xóa sinh viên**: Xóa một sinh viên khỏi hệ thống.

![Xóa thông tin sinh viên](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/X%C3%B3a%20th%C3%B4ng%20tin%20sinh%20vi%C3%AAn.png)

## Cấu Trúc Dữ Liệu Sinh Viên
Mỗi sinh viên có các thuộc tính sau:
- **MSSV**: Mã số sinh viên (duy nhất)
- **Họ tên**: Họ và tên đầy đủ
- **Ngày sinh**: Định dạng `DD/MM/YYYY`
- **Giới tính**: Nam/Nữ
- **Email**: Địa chỉ email hợp lệ
- **Số điện thoại**: 10 chữ số
- **Khoa**: Một trong các khoa hợp lệ (`Khoa Luật`, `Khoa Tiếng Anh thương mại`, `Khoa Tiếng Nhật`, `Khoa Tiếng Pháp`)
- **Khóa**: Số khóa học
- **Chương trình**: Tên chương trình đào tạo
- **Địa chỉ**: Địa chỉ cư trú
- **Tình trạng sinh viên**: Một trong các trạng thái hợp lệ (`Đang học`, `Đã tốt nghiệp`, `Đã thôi học`, `Tạm dừng học`)

## Cách Cài Đặt và Sử Dụng
### 1. Cài Đặt
Yêu cầu Node.js được cài đặt trên hệ thống.

```sh
npm install
```

### 2. Chạy Chương Trình
```sh
node main.js
```

## Kiểm Tra Định Dạng Dữ Liệu
Dữ liệu nhập vào sẽ được kiểm tra tính hợp lệ:
- Email phải có định dạng hợp lệ.
- Số điện thoại phải có đúng 10 chữ số.
- Khoa và tình trạng sinh viên phải thuộc danh sách hợp lệ.

## Lưu Ý
- Đảm bảo file `main.json` tồn tại trước khi chạy chương trình. Nếu không, hệ thống sẽ tự tạo file mới.
- Khi nhập dữ liệu, hãy nhập đúng định dạng để tránh lỗi.

## Đóng Góp
Nếu bạn muốn đóng góp cải tiến hoặc sửa lỗi, vui lòng tạo pull request hoặc issue trên repository này.

## License
Dự án này được phát hành dưới giấy phép MIT.

# VERSION 2.0
## tính năng mới

- **Lưu data sinh viên**: Lưu thông tin sinh viên với JSON.
  
![Lưu data sinh viên](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/data%20sinh%20vi%C3%AAn.png)
![Cấu trúc file data bao gồm sinh viên và các data khác](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/file%20data.png)

- **Show version và ngày build**: Hiển thị thông tin lần cuối build và version hiện tại theo tự động cập nhật với tag của git.
  
![Show version và ngày build](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/Show%20version%20v%C3%A0%20ng%C3%A0y%20build.png)

- **Thêm khoa và đổi tên khoa**: Nhập thông tin cho khoa mới hoặc đổi tên khoa cũ
  
![Thêm khoa](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/Th%C3%AAm%20khoa.png)
![Đổi tên khoa](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/%C4%91%E1%BB%95i%20t%C3%AAn%20khoa.png)

- **Thêm trạng thái và đổi tên trạng thái**: Nhập thông tin cho trạng thái mới hoặc đổi tên trạng thái cũ
  
![Thêm trạng thái](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/Th%C3%AAm%20tr%E1%BA%A1ng%20th%C3%A1i.png)
![Đổi tên trạng thái](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/%C4%90%E1%BB%95i%20t%C3%AAn%20tr%E1%BA%A1ng%20th%C3%A1i.png)

- **Thêm chương trình và đổi tên chương trình**: Nhập thông tin cho chương trình mới hoặc đổi tên chương trình cũ
  
![Thêm chương trình](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/th%C3%AAm%20ch%C6%B0%C6%A1ng%20tr%C3%ACnh%20m%E1%BB%9Bi.png)
![Đổi tên chương trình](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/%C4%91%E1%BB%95i%20t%C3%AAn%20ch%C6%B0%C6%A1ng%20tr%C3%ACnh.png)

- **Tìm kiếm theo khoa**: Tìm kiếm các sinh viên ở trong khoa.
  
![Tìm kiếm theo khoa](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/t%C3%ACm%20ki%E1%BA%BFm%20sinh%20vi%C3%AAn%20theo%20khoa.png)

- **Tìm kiếm theo khoa và tên**: Tìm kiếm các sinh viên ở trong khoa và có tên được nhập.
  
![Tìm kiếm theo khoa và tên](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/t%C3%ACm%20ki%E1%BA%BFm%20sinh%20vi%C3%AAn%20theo%20khoa%20v%C3%A0%20t%C3%AAn.png)

- **Hiển thị log**: Hiển thị thông tin log.
  
![Hiển thị log](https://github.com/LeMinhNhat22CLC02/QLSV/blob/main/screenshots/app%20log.png)

## tính năng chưa làm được
- **Hỗ trợ import/export dữ liệu**:CSV, JSON, XML, Excel (**chọn ít nhất 2**)

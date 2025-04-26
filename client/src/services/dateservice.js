function formatDate(dateString) {
    const daysOfWeek = [
        "Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"
    ];
    
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()]; // lấy thứ
    const day = String(date.getDate()).padStart(2, '0'); // ngày
    const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng
    const year = String(date.getFullYear()).slice(-2); // lấy 2 số cuối năm
    
    return `${dayOfWeek}, ngày ${day}/${month}/${year}`;
}

export {formatDate}
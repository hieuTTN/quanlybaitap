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

function formatTimestamp(isoDate){
    const date = new Date(isoDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formatted = `${month}/${day}/${year} ${hours}:${minutes}`;
    return formatted
}

export {formatDate, formatTimestamp}
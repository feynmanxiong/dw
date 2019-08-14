
export default function getData() {
    var priceData;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://localhost:8081/api/priceList", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
            priceData = JSON.parse(xhr.responseText).data
            // console.log(priceData)
           return priceData
        }
    }
    
}




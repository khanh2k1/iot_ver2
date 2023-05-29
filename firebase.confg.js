// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAK0raN4nFl3vqgyeELdID-zOmtfrD7_6A",
  authDomain: "iot-project-1c24d.firebaseapp.com",
  databaseURL: "https://iot-project-1c24d-default-rtdb.firebaseio.com",
  projectId: "iot-project-1c24d",
  storageBucket: "iot-project-1c24d.appspot.com",
  messagingSenderId: "380564595170",
  appId: "1:380564595170:web:95ac9eac78b840537b99bb",
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


let temperature_safe, db_safe, ppm_safe
let temperature, humidity, db, ppm
// Đọc dữ liệu từ Realtime Database
database.ref().on("value", function (snapshot) {

  // Lấy dữ liệu nhiệt độ, độ ẩm, cường độ âm thanh và chất lượng không khí từ snapshot
  temperature = snapshot.val().temperature;
  humidity = snapshot.val().humidity;
  db = snapshot.val().db;
  ppm = snapshot.val().ppm;

  temperature_safe = snapshot.val().temperatureSafe;
  db_safe = snapshot.val().dbSafe;
  ppm_safe = snapshot.val().ppmSafe;



  // Cập nhật giao diện với các giá trị đã lấy được
  document.getElementById("temperature").innerHTML = temperature;
  document.getElementById("humidity").innerHTML = humidity;
  document.getElementById("sound").innerHTML = db;
  document.getElementById("air-quality").innerHTML = ppm;


  document.getElementById('temperature-slider').value = temperature_safe;
  document.getElementById('temperature-value').innerHTML = temperature_safe;

  document.getElementById('sound-slider').value = db_safe;
  document.getElementById('sound-value').innerHTML = db_safe;

  document.getElementById('air-quality-slider').value = ppm_safe;
  document.getElementById('air-quality-value').innerHTML = ppm_safe;
    
});

// Cập nhật dữ liệu nhiệt độ, độ ẩm, cường độ âm thanh và chất lượng không khí khi người dùng điều chỉnh
document
  .getElementById("temperature-slider")
  .addEventListener("input", function () {
    const temperatureValue = document.getElementById("temperature-slider").value;
    document.getElementById("temperature-value").innerHTML = temperatureValue;
    database.ref().update({
      temperatureSafe: parseFloat(temperatureValue),
    });

    checkSafe()
  });

document.getElementById("air-quality-slider").addEventListener("input", function () {
  const airQualityValue = document.getElementById("air-quality-slider").value;
  document.getElementById("air-quality-value").innerHTML = airQualityValue;
  database.ref().update({
    ppmSafe: parseInt(airQualityValue),
  });

  checkSafe()
})

document.getElementById("sound-slider").addEventListener("input", function () {
  const soundValue = document.getElementById("sound-slider").value;
  document.getElementById("sound-value").innerHTML = soundValue;
  database.ref().update({
    dbSafe: parseInt(soundValue),
  });

  checkSafe()
});



// Cập nhật màu sắc và kiểm tra nhiệt độ nguy hiểm
function checkSafe() {
  // Các mã lệnh cập nhật màu sắc
  // Kiểm tra nhiệt độ nguy hiểm và hiển thị dialog khi cần thiết
  if (temperature > temperature_safe) document.getElementById("temp").style.backgroundColor = "red";
  else document.getElementById("temp").style.backgroundColor = "white";
  
  if(db > db_safe) document.getElementById("soundd").style.backgroundColor = "red";
  else document.getElementById("soundd").style.backgroundColor = "white";
  
  if(ppm > ppm_safe) document.getElementById("qua").style.backgroundColor = "red";
  else document.getElementById("qua").style.backgroundColor = "white";
}


 

// Gọi hàm updateColors khi trang web được tải và sau mỗi lần thanh điều chỉnh thay đổi giá trị
window.addEventListener("DOMContentLoaded", function () {
  updateColors();

  document
    .getElementById("temperature-slider")
    .addEventListener("input", updateColors);
  document
    .getElementById("sound-slider")
    .addEventListener("input", updateColors);

  document
    .getElementById("close-dialog")
    .addEventListener("click", closeDialog);
});

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

let temperature_safe, db_safe, ppm_safe;
let temperature, humidity, db, ppm;

let warning;
let userClick = false;

// Đọc dữ liệu từ Realtime Database
database.ref().on("value", async (snapshot) => {
  // Lấy dữ liệu nhiệt độ, độ ẩm, cường độ âm thanh và chất lượng không khí từ snapshot
  temperature = await snapshot.val().temperature;
  humidity = await snapshot.val().humidity;
  db = await snapshot.val().db;
  ppm = await snapshot.val().ppm;

  warning = await snapshot.val().warning;
  warning = Boolean(warning);
  console.log(warning);

  temperature_safe = snapshot.val().temperatureSafe;
  db_safe = snapshot.val().dbSafe;
  ppm_safe = snapshot.val().ppmSafe;

  // Cập nhật giao diện với các giá trị đã lấy được
  document.getElementById("temperature").innerHTML = temperature + " °C";
  document.getElementById("humidity").innerHTML = humidity + " %";
  document.getElementById("sound").innerHTML = db + " dB";
  document.getElementById("air-quality").innerHTML = ppm;

  document.getElementById("temperature-slider").value = await temperature_safe;
  document.getElementById("temperature-value").innerHTML =
    temperature_safe + " °C";

  document.getElementById("sound-slider").value = await db_safe;
  document.getElementById("sound-value").innerHTML = db_safe + " dB";

  document.getElementById("air-quality-slider").value = await ppm_safe;
  document.getElementById("air-quality-value").innerHTML = ppm_safe;
});

checkSafe();
// Cập nhật dữ liệu nhiệt độ, độ ẩm, cường độ âm thanh và chất lượng không khí khi người dùng điều chỉnh
document
  .getElementById("temperature-slider")
  .addEventListener("input", async function () {
    const temperatureValue = await document.getElementById("temperature-slider")
      .value;

    document.getElementById("temperature-value").innerHTML = temperatureValue;
    database.ref().update({
      temperatureSafe: parseFloat(temperatureValue),
    });

    checkSafe();
  });

document
  .getElementById("air-quality-slider")
  .addEventListener("input", async function () {
    const airQualityValue = await document.getElementById("air-quality-slider")
      .value;
    document.getElementById("air-quality-value").innerHTML = airQualityValue;
    database.ref().update({
      ppmSafe: parseInt(airQualityValue),
    });

    checkSafe();
  });

document
  .getElementById("sound-slider")
  .addEventListener("input", async function () {
    const soundValue = await document.getElementById("sound-slider").value;
    document.getElementById("sound-value").innerHTML = soundValue;
    database.ref().update({
      dbSafe: parseInt(soundValue),
    });

    checkSafe();
  });

// Cập nhật màu sắc và kiểm tra nhiệt độ nguy hiểm

setInterval(checkSafe, 1000);

function checkSafe() {
  let isWarning = false;
  // Các mã lệnh cập nhật màu sắc
  // Kiểm tra nhiệt độ nguy hiểm và hiển thị dialog khi cần thiết
  if (temperature > temperature_safe) {
    isWarning=true
    document.getElementById("temp").style.backgroundColor = "red";
    if(userClick == false){
      database.ref().update({
        warning: true,
      });
    }
  } else {
    document.getElementById("temp").style.backgroundColor = "white";
    
  }

  if (db > db_safe) {
    isWarning=true
    document.getElementById("soundd").style.backgroundColor = "red";
    if(userClick == false){
      database.ref().update({
        warning: true,
      });
    }
  } else {
    document.getElementById("soundd").style.backgroundColor = "white";
  
  }

  if (ppm > ppm_safe) {
    isWarning=true
    document.getElementById("qua").style.backgroundColor = "red";
    if(userClick == false){
      database.ref().update({
        warning: true,
      });
    }
  } else {
    document.getElementById("qua").style.backgroundColor = "white";
  }

  console.log('isWarning = ', isWarning)
  if (isWarning == true && userClick == false) {
    console.log("(if) open");
    modal.style.display = "block";
    audio.play();
    audio.loop = true;
    database.ref().update({
      warning: true,
    });
    modal.classList.add("flash");
  }
}


const openButton = document.getElementById("openButton");
const modal = document.getElementById("myModal");
const closeButton = document.getElementsByClassName("close")[0];

let audio = new Audio("/1.mp3");

openButton.addEventListener("click", function () {
  console.log("open");
  modal.style.display = "block";
  audio.play();
  audio.loop = true;
  database.ref().update({
    warning: true,
  });
  modal.classList.add("flash");
});

closeButton.addEventListener("click", () => {
  console.log("close");
  modal.style.display = "none";
  database.ref().update({
    warning: false,
  });
  audio.pause();
  modal.classList.remove("flash");
  userClick=true
});

console.log('userclick = ', userClick)



// Cập nhật màu sắc cho các giá trị
function updateColors() {
 

  document.getElementById("temperature-value").textContent =
    temperatureValue.toFixed(2); // Hiển thị giá trị nhiệt độ
    // console.log('temperatureValue', temperatureValue)
}

// Gọi hàm updateColors khi trang web được tải và sau mỗi 5 giây
window.addEventListener("DOMContentLoaded", function () {
  updateColors();

  var temperatureSlider = document.getElementById("temperature-slider");
  temperatureSlider.addEventListener("input", updateColors);

  var soundSlider = document.getElementById("sound-slider");
  soundSlider.addEventListener("input", updateColors);

  var airQualitySlider = document.getElementById("air-quality-slider");
  airQualitySlider.addEventListener("input", updateColors);

  setInterval(updateColors, 5000);

});




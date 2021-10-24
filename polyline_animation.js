ymaps.ready(["AnimatedLine"]).then(init);

function init(ymaps) {
  // Создаем карту.
  var myMap = new ymaps.Map("map", {
    center: [43.24599, 76.905292],
    zoom: 14,
  });
  // Создаем линию.
  var animatedLine = new ymaps.AnimatedLine(
    [
      [43.24599, 76.905292],
      [43.245235, 76.9056],
      [43.245395, 76.907866],
      [43.235952, 76.909121],
      [43.237235, 76.915048],
    ],
    {},
    {
      strokeColor: "#ED4543",
      strokeWidth: 5,
      animationTime: 4000,
    }
  );

  // Добавляем линию на карту.
  myMap.geoObjects.add(animatedLine);

  // Создаем метки.
  var firstPoint = new ymaps.Placemark([43.24599, 76.905292], {});
  var secondPoint = new ymaps.Placemark(
    [43.237235, 76.915048],
    {},
    {
      preset: "islands#yellowStretchyIcon",
    }
  );

  // Функция анимации пути.
  function playAnimation() {
    myMap.geoObjects.add(firstPoint);
    myMap.geoObjects.add(secondPoint);
    // Анимируем линию.
    animatedLine
      .animate()
      .then(function () {
        // Добавляем паузу после анимации.
        return ymaps.vow.delay(null, 1000);
      })
      // После паузы перезапускаем анимацию.
      .then(function () {
        // Удаляем метки с карты.
        myMap.geoObjects.remove(firstPoint);
        myMap.geoObjects.remove(secondPoint);

        // Перезапускаем анимацию.
        playAnimation();
      });
  }
  // Запускаем анимацию пути.
  playAnimation();
}

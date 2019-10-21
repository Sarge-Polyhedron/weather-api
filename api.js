window.addEventListener('load', function() {
  let lat;
  let long;
  const timezone = document.querySelector('.location_timezone');
  const degree = document.querySelector('.temp_degree h2');
  const degreeClick = document.querySelector('.temp_degree');
  const degreeSpan = document.querySelector('.temp_degree span');
  const desc = document.querySelector('.temp_desc');
  const iconLocation = document.querySelector('.location_icon');
  const loader = document.querySelector('.lds-ripple');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      // const proxy = `https://cors-anywhere.herokuapp.com/`
      const api = `https://api.darksky.net/forecast/3819e1e2ce03c63280e06adfa6e04b05/${lat},${long}?units=si`

      fetch(api)
        .then( response => response.json() )
        .then( data => {
          // console.log(data);

          const {temperature, summary, icon} = data.currently;
          const hourlySummary = data.hourly.summary
          let celsius = Math.round(temperature)
          let fahrenheit = Math.round(temperature * 9/5 + 32)

          // writing to DOM
          loader.style.display = 'none'
          degree.textContent = celsius;
          degreeSpan.textContent = '\u02DAC';
          desc.textContent = summary;
          timezone.textContent = data.timezone;


          // Set Icon
          setIcons(icon, iconLocation);
          // Title for Icon
          iconLocation.title = `${hourlySummary}`
          // Change Celsius / farenheit
          clickHandler(celsius, fahrenheit)
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase()
    skycons.play();
    skycons.set(iconId, Skycons[currentIcon]);
  }

  function clickHandler(celsius, fahrenheit) {
    degreeClick.addEventListener('click', () => {
      if(degreeSpan.textContent === '\u02DAC') {
        degreeSpan.textContent = '\u02DAF'
        degree.textContent = fahrenheit
        degreeSpan.title = 'Fahrenheit'
      } else {
        degreeSpan.textContent = '\u02DAC'
        degree.textContent = celsius
        degreeSpan.title = 'Celsius'
      }
    })
  }

});
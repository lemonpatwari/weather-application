async function getWeatherData(keyword) {
    let URL = "https://api.weatherapi.com/v1/current.json"
    const key = '8295c11cb5bb4251aed153124232006'
    try {
        const response = await axios.get(`${URL}?key=${key}&q=${keyword}`);

        const {name, country, localtime} = response.data.location;
        const {last_updated, temp_c, temp_f, humidity, cloud, condition} = response.data.current;

        let city = document.getElementById('city');
        city.innerHTML = `City: ${name}(${country})`;

        let temperature = document.getElementById('temperature');
        temperature.innerHTML = `Temperature: ${temp_c} (Celsius)`;

        let humidityDetails = document.getElementById('humidityDetails');
        humidityDetails.innerHTML = `Humidity: ${humidity}, Cloud: ${cloud}`;

        let weatherCondition = document.getElementById('weatherCondition');
        weatherCondition.innerHTML = `Weather: ${condition.text} <img src="${condition.icon}">`;

        let lastUpdated = document.getElementById('lastUpdated');
        lastUpdated.innerHTML = `Last Updated: ${last_updated}`;

        this.displayVisible();
    } catch (error) {
        this.displayHide();
        alert(error)
    }
}

async function searchData() {
    let searchKeyword = document.getElementById('searchKeyword').value;
    if (!searchKeyword) {
        alert('Please enter city name');
        return;
    }
    await getWeatherData(searchKeyword);
}

function clearKeyword() {
    let searchKeyword = document.getElementById('searchKeyword');
    searchKeyword.value = '';
    this.displayHide();
}

function displayVisible() {
    let weatherDetails = document.getElementsByClassName('weather-details');
    for (let i = 0; i < weatherDetails.length; i++) {
        weatherDetails[i].classList.remove('d-none');
    }
}

function displayHide() {
    let weatherDetails = document.getElementsByClassName('weather-details');
    for (let i = 0; i < weatherDetails.length; i++) {
        weatherDetails[i].classList.add('d-none');
    }
}
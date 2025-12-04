let form = document.getElementById('weather_form')
let form1 = document.getElementById('weather_form1')
let country_name = document.getElementById('country_name')
let country_name_f = document.getElementById('country_name_f')
const errorF = document.getElementById('error')
const info_data = document.querySelector('.info_data_div')
const info_error = document.querySelector('.info_error')
const locationF = document.getElementById('location')
const latitudeF = document.getElementById('latitude')
const longitudeF = document.getElementById('longitude')
const Temperature_CF = document.getElementById('Temperature_C')
const weather_conditionF = document.getElementById('weather_condition')

country_name.addEventListener('input', (e) => {
    locationF.innerText = e.target.value;
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = "none"
    form1.style.display = "flex"
    country_name_f.value = country_name.value;
    fetchdata()
})

const fetchdata = async () => {
    await weatherFun()
    form1.style.display = "none"
    form.style.display = "flex"
}

// async --> function return promise
let weatherFun = async () => {
    try {
        address = country_name.value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        if (data.error) {
            info_error.style.display = "flex"
            info_data.style.display = "none"
            errorF.innerText = data.error
        }
        else {
            locationF.innerText = data.country
            longitudeF.innerText = (+data.latitude.toFixed(4))
            latitudeF.innerText = (+data.longitude.toFixed(4))
            weather_conditionF.innerText = data.weather_condition
            Temperature_CF.innerText = data.Temperature_C
            info_data.style.display = "flex"
            info_error.style.display = "none"
        }
    }
    catch (e) {
        console.log("error"+e)
    }
}

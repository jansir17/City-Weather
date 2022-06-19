const API_KYE= '156626b59dbf1946391a21ef1ebd3ab4';
const form= document.querySelector('form');
const search= document.querySelector('#search')
const weather= document.querySelector('#weather')

const getWeather= async (city)=>{
  weather.innerHTML= `<h2>LoadinG...</h2>`
  const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KYE}&units=metric`

  const response= await fetch(url);
  const data= await response.json();
  return showWeather(data); 
}

const showWeather= (data)=>{
  if(data.cod =="404"){
    weather.innerHTML=`<h2>City Not Found</h2>`
    return;
  }
  weather.innerHTML =`
  <div>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt=""/>
  </div>
  <div>
    <h2>${data.main.temp}</h2>
      <h4>${data.weather[0].main}</h4>
  </div>`

}

form.addEventListener("submit",function(event){
  getWeather(search.value)
  event.preventDefault();
})

const findMyLocation= ()=>{
  const status= document.querySelector(".status")
  const success=(position)=>{
    const lattitude= position.coords.lattitude;
    const longitude= position.coords.longitude;
    const geoApiUrl=`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    fetch(geoApiUrl).then(res=>res.json()).then(data=>{ status.textContent=data.principalSubdivision})
  }
   const error= ()=>{
    status.textContent='Unable to retrieve your location'
  }
  navigator.geolocation.getCurrentPosition(success,error);
}

form.addEventListener("submit",findMyLocation)


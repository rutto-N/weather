
const api={
    key:"8243858371ba431d91d2746d094f0d9a",
    baseurl:"https://api.openweathermap.org/data/2.5/"
}


function getData(){
    let sub=document.getElementById('btn-search');
    let city=document.getElementById("search");
    console.log(city.value);
    getResults(city.value);
    registerSW();

    // alert("Yyyay");
}
function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&APPID=${api.key}&units=metric`)
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
}
function displayResults(weather){
    console.log(weather);
    let city=document.querySelector('.location .city');
    city.innerText=`${weather.name},${weather.sys.country}`;
    let now =new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);
    let temp=document.querySelector('.current .temp');
    temp.innerText=`${Math.round(weather.main.temp)}°C`;
    let weather_el=document.querySelector('.current .weather');
    weather_el.innerText=weather.weather[0].main;
    let hilow=document.querySelector('.current .hi-low');
    hilow.innerText=`${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

}
function dateBuilder(d){
    let months=[
        'January','February','March','April','May','June','July',
    'August','September','October','November','December'];
    let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    // console.log(day ,date,month,year);
    return `${day} ${date} ${month} ${year}`;
}
function registerSW(){
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
          });
        });
      }
}

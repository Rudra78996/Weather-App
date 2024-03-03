//put api key to run this app
let url = "http://api.weatherapi.com/v1/current.json?key=&q=";
let btn = document.querySelector("button");
async function getWeather(location){
    try{
        let req = await fetch(url+location);
        let data = await req.json();
        const requiredInfo = {
            location:data.location.name,
            region:data.location.region,
            temp:data.current.temp_c,
            icon:data.current.condition.icon,
            windSpeed:data.current.wind_kph,
            humidity:data.current.humidity
        }
        return requiredInfo;
    }    
    catch(e){
        return {
            location:"Invalid Input",
            region:"-",
            temp:"-",
            icon:"./resource/pngwing.com.png",
            windSpeed:"-",
            humidity:"-"
        }
    }
}
btn.addEventListener("click", ()=>{
    inputData();
});

document.querySelector("input").addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); 
        inputData();
    }
});

assigning("india");
function assigning(location){
    getWeather(location).then((data)=>{
        let image = document.querySelector("img");
        let tittle = document.querySelector("#location");
        tittle.innerHTML = `<p>${data.temp} &deg;C </p> ${data.location}`;
        image.src = data.icon;
        let windSpeed = document.querySelector("#wind-speed");
        windSpeed.innerText = data.windSpeed;
        let humidity = document.querySelector("#humidity");
        humidity.innerText = data.humidity;
    })
}
function inputData(){
    let input = document.querySelector("input");
    if(input.value.length>0){
        const location = input.value;
        input.value="";
        assigning(location);   
    }
}

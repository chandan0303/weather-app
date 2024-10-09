const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField= document.querySelector(".searchField");
const form=document.querySelector("form");
form.addEventListener("submit",search);

let target = "New Delhi";

const fetchData = async (target) => {
  try {
    //fetching data from the api
  const url = `https://api.weatherapi.com/v1/current.json?key=420761142d464930add64152241205&q=${target}`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  const {
    current: {
      temp_c,
      condition: { text, icon },
    },
    location: { name, localtime },
  } = data;

  updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Enter correct location!");
  }
};
fetchData(target);

function updateDom(temperature, name, time, emoji, weather) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = new Date(exactDate).getDay();



  temperatureField.innerText = temperature+"°C";
  cityField.innerText = name;
  dateField.innerText = `${exactTime} - ${getFullDay(exactDay)} ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = weather;
}

function getFullDay(num) {
  switch (num) {
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;

    default:
      break;
  }
};

function search(e){
    e.preventDefault();
    target = searchField.value;
    fetchData(target);
    console.log(target);
};


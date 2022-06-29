let butt = document.querySelector("#generate");

// API URL , Key 94040
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=metric&appid=39fff0ccd01e57393e4e890860e1327f";

// Button Event Listener
butt.addEventListener('click', generate);

function generate(e) {
    // zip code
    const feelings = document.querySelector("#feelings").value;
    const zipCode = document.querySelector("#zip").value;
    const date = new Date().toLocaleString();
    // Styling Elements
    document.querySelector("#entryHolder").classList.add("holder");

    getData(baseURL+zipCode+apiKey)
    .then(function (data) {
        postData("/postData", {
            temperature: data.main.temp,
            date: date,
            userResponse: feelings
        });
        // Update UI
        updateUI();
    })
}

// GET
const getData = async (url) => {
    const response = await fetch(url)
    try {
        const newData = await response.json();
        return newData;
    } catch (e) {
        console.log("Error", e);
    }
}

// POST
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    try {
        const newData = await response.json()
        // return newData;
    } catch (e) {
        console.log("Error", e);
    }
}

// Update UI
const updateUI = async () => {
    const request = await fetch("/getData");
    try {
        const allData = await request.json();
        document.getElementById("temp").innerHTML = "Temperature: " + allData.temperature.toFixed() + " C";
        document.getElementById("date").innerHTML = "Date: " + allData.date;
        document.getElementById("content").innerHTML = "User input: " + allData.userResponse;
    } catch (e) {
        console.log("Error", e);
    }
}
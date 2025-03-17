// Lastmodified and menu button function
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");
  
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("active");
        });
    }
  
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;
  });  

// Weather API integration
const apiKey = "815123c426417cedb6f39238699089a1";
const city = "São Paulo";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Weather data not available");

        const data = await response.json();
        document.getElementById("current-temp").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
        document.getElementById("high-temp").textContent = `High: ${data.main.temp_max}°C`;
        document.getElementById("low-temp").textContent = `Low: ${data.main.temp_min}°C`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;

        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.getElementById("weather-icon").src = iconUrl;
        document.getElementById("weather-icon").alt = data.weather[0].description;
    } catch (error) {
        console.error(error);
    }
}

// Load weather when the page loads
window.addEventListener("load", getWeather);

//Display chamber members
document.addEventListener("DOMContentLoaded", async () => {
    const membersContainer = document.getElementById("members-container");
    const toggleButton = document.getElementById("toggle-view");
    let isGridView = true;

    async function fetchMembers() {
        try {
            const response = await fetch("./data/members.json");
            if (!response.ok) throw new Error("Failed to fetch members");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error(error);
            document.getElementById("members-container").innerHTML = "<p>Error loading members.</p>";
        }
    }    

    function displayMembers(members) {
        membersContainer.innerHTML = "";
        membersContainer.className = isGridView ? "grid-view" : "list-view";

        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");
            
            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit</a></p>
                <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership)}</p>
            `;
            
            membersContainer.appendChild(memberCard);
        });
    }

    function getMembershipLevel(level) {
        switch (level) {
            case 1: return "Member";
            case 2: return "Silver";
            case 3: return "Gold";
            default: return "Unknown";
        }
    }

    toggleButton.addEventListener("click", () => {
        isGridView = !isGridView;
        fetchMembers();
    });

    fetchMembers();
});


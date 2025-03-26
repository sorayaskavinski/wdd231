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

  const apiKey = "815123c426417cedb6f39238699089a1";
  const city = "São Paulo";
  
  // API URLs
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
  async function getWeather() {
      try {
          const response = await fetch(currentWeatherUrl);
          if (!response.ok) throw new Error("Weather data not available");
  
          const data = await response.json();  
          
          document.getElementById("current-temp").innerHTML = `<strong>Temperature:</strong> ${data.main.temp}°C`;
          document.getElementById("description").innerHTML = `<strong>Condition: </strong> ${data.weather[0].description}`;
          document.getElementById("high-temp").innerHTML = `<strong>High: </strong> ${data.main.temp_max}°C`;
          document.getElementById("low-temp").innerHTML = `<strong>Low: </strong> ${data.main.temp_min}°C`;
          document.getElementById("humidity").innerHTML = `<strong>Humidity: </strong> ${data.main.humidity}%`;  
        
          const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
          document.getElementById("weather-icon").src = iconUrl;
          document.getElementById("weather-icon").alt = data.weather[0].description;  
          
          const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
          const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  
          document.getElementById("sunrise").innerHTML = `<strong>Sunrise:</strong> ${sunriseTime}`;
          document.getElementById("sunset").innerHTML = `<strong>Sunset:</strong> ${sunsetTime}`;
      } catch (error) {
          console.error(error);
      }
  }
  
  async function getWeatherForecast() {
      try {
          const response = await fetch(forecastUrl);
          if (!response.ok) throw new Error("Forecast data not available");
  
          const data = await response.json();
  
         
          const dailyForecasts = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));
  
          // Forecast days 
          if (dailyForecasts.length >= 3) {
              document.getElementById("today").innerHTML = `<strong>Today: </strong> ${dailyForecasts[0].main.temp}°C - ${dailyForecasts[0].weather[0].description}`;
              document.getElementById("next-day").innerHTML = `<strong>Tomorrow:</strong> ${dailyForecasts[1].main.temp}°C - ${dailyForecasts[1].weather[0].description}`;
              document.getElementById("next-day2").innerHTML = `<strong>Day After Tomorrow: </strong> ${dailyForecasts[2].main.temp}°C - ${dailyForecasts[2].weather[0].description}`;
          } else {
              console.warn("Not enough forecast data available.");
          }
      } catch (error) {
          console.error(error);
      }
  }  
 
  window.addEventListener("load", () => {
      getWeather();
      getWeatherForecast();
  });
 

  document.addEventListener("DOMContentLoaded", async () => {
    const membersContainer = document.getElementById("cards");
    const featuredContainer = document.getElementById("featured-members");
    const gridButton = document.getElementById("menu-grid");
    const listButton = document.getElementById("menu-list");    
    let isGridView = true; 

    if (gridButton && listButton) {
        gridButton.addEventListener("click", () => {
            isGridView = true;
            fetchMembers();
        });

        listButton.addEventListener("click", () => {
            isGridView = false;
            fetchMembers();
        });
    }

    async function fetchMembers() {
        try {
            const response = await fetch("./data/members.json");
            if (!response.ok) throw new Error("Failed to fetch members");
            const members = await response.json();

            if (membersContainer) {
                displayMembers(members);
            }

            if (featuredContainer) {
                displayFeaturedMembers(members);
            }

        } catch (error) {
            console.error(error);
            if (membersContainer) {
                membersContainer.innerHTML = "<p>Error loading members.</p>";
            }
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

    if (membersContainer) {
        membersContainer.classList.remove("hidden");
    }

    function displayFeaturedMembers(members) {
        featuredContainer.innerHTML = "";        
        
        // Create a shuffled copy to avoid modifying the original members array
        const shuffled = [...members].sort(() => 0.5 - Math.random()).slice(0, 3);

        shuffled.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");

            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit</a></p>
            `;

            featuredContainer.appendChild(memberCard);
        });
    }
    
    fetchMembers();
});

        
const form = document.querySelector('.formDesign');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = new URLSearchParams();

        formData.forEach((value, key) => {
            data.append(key, value);
        });

        const url = 'thanks.html?' + data.toString();
        window.location.href = url;
    });
}

function showMembershipDetails(level) {
        const membershipDetails = {
            "non-profit": {
                title: "Non-Profit Membership",
                description: "This level offers benefits for non-profit organizations, with a 5% discount."
            },
            "bronze": {
                title: "Bronze Membership",
                description: "The Bronze Membership offers entry-level with a 5% discount."
            },
            "silver": {
                title: "Silver Membership",
                description: "The Silver Membership provides top of the list once a month."
            },
            "gold": {
                title: "Gold Membership",
                description: "The Gold Membership offers guarantee top of the list weekly and homepage appearance."
            }
        };
    
        const membershipBox = document.getElementById("membership-box");
        const membershipContent = document.getElementById("membership-content");
    
        if (membershipDetails[level]) {
            membershipContent.innerHTML = `
                <h3>${membershipDetails[level].title}</h3>
                <p>${membershipDetails[level].description}</p>
            `;
            membershipBox.showModal(); 
        }
    }
    
    
   
document.getElementById("closeScreen").addEventListener("click", function() {
        document.getElementById("membership-box").close();
    });
    

document.getElementById("openButton1").addEventListener("click", function() {
    showMembershipDetails("non-profit");
});
document.getElementById("openButton2").addEventListener("click", function() {
    showMembershipDetails("bronze");
});
document.getElementById("openButton3").addEventListener("click", function() {
    showMembershipDetails("silver");
});
document.getElementById("openButton4").addEventListener("click", function() {
    showMembershipDetails("gold");
});


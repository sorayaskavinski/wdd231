document.getElementById("year").textContent = new Date().getFullYear();
        document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;
        
        const menuToggle = document.querySelector(".menu-toggle");
        const navLinks = document.querySelector(".nav-links");
        
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
// Lastmodified and menu button function
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", function () {
          navLinks.classList.toggle("active");
      });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;
});

// Courses functions - homepage
const courses = [
  { name: "WDD 130", category: "WDD", completed: true, credits: 3 },
  { name: "CSE 110", category: "CSE", completed: false, credits: 4 },
  { name: "WDD 231", category: "WDD", completed: true, credits: 3 },
  { name: "CSE 210", category: "CSE", completed: true, credits: 4 },
  { name: "WDD 131", category: "WDD", completed: false, credits: 3 },
  { name: "CSE 111", category: "CSE", completed: true, credits: 4 }
];

// Function to display the courses
function displayCourses(filteredCourses) {
  const courseContainer = document.querySelector(".course-container");
  if (!courseContainer) return;

  courseContainer.innerHTML = "";
  let totalCredits = 0;

  filteredCourses.forEach(course => {
      const li = document.createElement("li");
      li.classList.add(course.completed ? "completed" : "in-progress");

      li.innerHTML = `
          <strong>${course.name}</strong> - 
          ${course.completed ? "Completed" : "In Progress"} 
          <br>Credits: ${course.credits}
      `;

      courseContainer.appendChild(li);
      totalCredits += course.credits;
  });

  const creditsElement = document.getElementById("credits");
  if (creditsElement) {
      creditsElement.textContent = totalCredits;
  }
}

// Filter buttons functionality
document.getElementById("all")?.addEventListener("click", function () {
  displayCourses(courses);
});

document.getElementById("wdd")?.addEventListener("click", function () {
  const wddCourses = courses.filter(course => course.category === "WDD");
  displayCourses(wddCourses);
});

document.getElementById("cse")?.addEventListener("click", function () {
  const cseCourses = courses.filter(course => course.category === "CSE");
  displayCourses(cseCourses);
});

// Specific course buttons functionality
const specificCourses = [
  { id: "cse110", name: "CSE 110" },
  { id: "wdd130", name: "WDD 130" },
  { id: "cse111", name: "CSE 111" },
  { id: "cse210", name: "CSE 210" },
  { id: "wdd131", name: "WDD 131" },
  { id: "wdd231", name: "WDD 231" }
];

specificCourses.forEach(course => {
  const button = document.getElementById(course.id);
  if (button) {
      button.addEventListener("click", function () {
          const filteredCourses = courses.filter(c => c.name === course.name);
          displayCourses(filteredCourses);
      });
  }
});

// Display all courses initially
displayCourses(courses);


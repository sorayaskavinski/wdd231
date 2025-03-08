document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;
});

const courses = [
  { name: "WDD 130", category: "WDD", completed: true, credits: 3 },
  { name: "CSE 110", category: "CSE", completed: false, credits: 2 },
  
];

function displayCourses(filteredCourses) {
  const coursesContainer = document.querySelector(".left ul");
  coursesContainer.innerHTML = "";

  filteredCourses.forEach(course => {
    const li = document.createElement("li");
    li.textContent = `${course.name} - ${course.completed ? 'Completed' : 'In Progress'}`;
    coursesContainer.appendChild(li);
  });
}

document.getElementById("all").addEventListener("click", function () {
  displayCourses(courses);
});

document.getElementById("wdd").addEventListener("click", function () {
  const wddCourses = courses.filter(course => course.category === "WDD");
  displayCourses(wddCourses);
});

document.getElementById("cse").addEventListener("click", function () {
  const cseCourses = courses.filter(course => course.category === "CSE");
  displayCourses(cseCourses);
});

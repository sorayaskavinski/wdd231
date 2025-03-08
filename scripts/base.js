document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;
});

// Array of courses
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
  const courseContainer = document.querySelector('.course-container');
  courseContainer.innerHTML = ""; 
  let totalCredits = 0;

  filteredCourses.forEach(course => {
    const li = document.createElement('li');
    li.classList.add(course.completed ? 'completed' : 'in-progress');
    
    li.innerHTML = `
      <strong>${course.name}</strong> - 
      ${course.completed ? 'Completed' : 'In Progress'} 
      <br>Credits: ${course.credits}
    `;
    
    courseContainer.appendChild(li);
    
    totalCredits += course.credits;
  });
  
  document.getElementById('credits').textContent = totalCredits;
}

// Filter buttons functionality
document.getElementById('all').addEventListener('click', function () {
  displayCourses(courses);
});

document.getElementById('wdd').addEventListener('click', function () {
  const wddCourses = courses.filter(course => course.category === "WDD");
  displayCourses(wddCourses);
});

document.getElementById('cse').addEventListener('click', function () {
  const cseCourses = courses.filter(course => course.category === "CSE");
  displayCourses(cseCourses);
});

//Speciific course buttons funcionality
const specificCourses = [
  { id: "cse110", name: "CSE 110"},
  { id:"wdd130", name: "WDD 130"},
  { id:"cse111", name:"CSE 111"},
  { id:"cse210", name:"CSE 210"},
  {id:"wdd131", name:"WDD 131"},
  {id:"wdd231", name:"WDD 231"}
];

//Attach event listeners for specific courses
specificCourses.forEach(course=>{
  document.getElementById(course.id).addEventListener('click', function(){
    const filteredCourses = courses.filter(c => c.name === course.name);
    displayCourses(filteredCourses);
  });
});

// Display all courses on initial load
displayCourses(courses);

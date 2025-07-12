function displayStudents(data) {
  const container = document.getElementById('students-container');
  container.innerHTML = '';

  for (const className in data) {
    const classDiv = document.createElement('div');
    classDiv.className = 'class-section';

    const title = document.createElement('div');
    title.className = 'class-title';
    title.textContent = className;
    classDiv.appendChild(title);

    data[className].forEach(student => {
      const studentDiv = document.createElement('div');
      studentDiv.className = 'student-name';
      studentDiv.textContent = student;
      classDiv.appendChild(studentDiv);
    });

    container.appendChild(classDiv);
  }
}

fetch('students.json')
  .then(res => res.json())
  .then(data => displayStudents(data))
  .catch(err => console.error('Error loading students:', err));


 
// File: js/students.js
// This script handles the student search functionality and displays students from a JSON file.
document.addEventListener('DOMContentLoaded', () => {
  let studentsData = {};

  async function loadStudents() {
    try {
      const response = await fetch('students.json');
      studentsData = await response.json();

      const studentsListDiv = document.getElementById('students-container');
      studentsListDiv.innerHTML = ''; // clear

      for (const className in studentsData) {
        const classHeader = document.createElement('h3');
        classHeader.textContent = className;
        studentsListDiv.appendChild(classHeader);

        studentsData[className].forEach(student => {
          const div = document.createElement('div');
          div.className = 'student-name';
          div.textContent = student;
          studentsListDiv.appendChild(div);
        });
      }
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const keyword = document.getElementById('search-keyword').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('search-students');
    const studentDivs = document.querySelectorAll('.student-name');

    resultsDiv.innerHTML = '';

    if (!keyword) {
      resultsDiv.textContent = 'Please enter a search term.';
      return;
    }

    studentDivs.forEach(div => div.style.backgroundColor = '');

    const matches = Array.from(studentDivs).filter(div =>
      div.textContent.toLowerCase().includes(keyword)
    );

    if (matches.length === 0) {
      resultsDiv.textContent = 'No matching students found.';
      return;
    }

    if (matches.length === 1) {
      matches[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      matches[0].style.backgroundColor = '#ffff99';
      resultsDiv.textContent = `Found: ${matches[0].textContent}`;
    } else {
      resultsDiv.innerHTML = `<strong>Found ${matches.length} students:</strong><br>`;
      matches.forEach(match => {
        const div = document.createElement('div');
        div.textContent = match.textContent;
        div.style.color = 'blue';
        div.style.cursor = 'pointer';
        div.style.textDecoration = 'underline';

        div.addEventListener('click', () => {
          studentDivs.forEach(d => d.style.backgroundColor = '');
          match.scrollIntoView({ behavior: 'smooth', block: 'center' });
          match.style.backgroundColor = '#ffff99';
        });

        resultsDiv.appendChild(div);
      });
    }
  });

  loadStudents();
});


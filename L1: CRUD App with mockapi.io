<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Student CRUD App (MockAPI)</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="p-4">
  <div class="container">
    <h2 class="mb-4">Student Manager (mockapi.io)</h2>

    <form id="studentForm" class="row g-2 mb-4">
      <input type="hidden" id="studentId" />
      <div class="col-md-4">
        <input type="text" id="name" class="form-control" placeholder="Name" required />
      </div>
      <div class="col-md-2">
        <input type="number" id="age" class="form-control" placeholder="Age" required />
      </div>
      <div class="col-md-4">
        <input type="text" id="course" class="form-control" placeholder="Course" required />
      </div>
      <div class="col-md-2">
        <button type="submit" class="btn btn-primary w-100">Save</button>
      </div>
    </form>

    <div id="loading" class="text-secondary mb-2">Loading...</div>
    <div id="error" class="text-danger mb-2"></div>

    <table class="table table-bordered">
      <thead>
        <tr><th>Name</th><th>Age</th><th>Course</th><th>Actions</th></tr>
      </thead>
      <tbody id="studentTable"></tbody>
    </table>
  </div>

  <script>
    const API_URL = "https://yourproject.mockapi.io/api/v1/students"; // Replace with your mockapi endpoint
    const studentForm = document.getElementById("studentForm");
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const courseInput = document.getElementById("course");
    const studentIdInput = document.getElementById("studentId");
    const studentTable = document.getElementById("studentTable");
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");

    studentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const age = parseInt(ageInput.value);
      const course = courseInput.value.trim();
      if (!name || !course || isNaN(age) || age <= 0) {
        error.textContent = "Please enter valid name, age, and course.";
        return;
      }
      error.textContent = "";
      loading.textContent = "Saving...";
      const student = { name, age, course };
      const id = studentIdInput.value;
      const method = id ? "PUT" : "POST";
      const url = id ? `${API_URL}/${id}` : API_URL;

      try {
        await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        });
        studentForm.reset();
        fetchStudents();
      } catch (err) {
        error.textContent = "Failed to save student.";
      } finally {
        loading.textContent = "";
      }
    });

    async function fetchStudents() {
      loading.textContent = "Fetching students...";
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        studentTable.innerHTML = "";
        data.forEach((student) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" onclick="editStudent('${student.id}', '${student.name}', '${student.age}', '${student.course}')">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
          `;
          studentTable.appendChild(row);
        });
      } catch (err) {
        error.textContent = "Failed to load students.";
      } finally {
        loading.textContent = "";
      }
    }

    function editStudent(id, name, age, course) {
      studentIdInput.value = id;
      nameInput.value = name;
      ageInput.value = age;
      courseInput.value = course;
    }

    async function deleteStudent(id) {
      loading.textContent = "Deleting...";
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        fetchStudents();
      } catch (err) {
        error.textContent = "Failed to delete student.";
      } finally {
        loading.textContent = "";
      }
    }

    fetchStudents();
  </script>
</body>
</html>
L1: CRUD App with mockapi.io

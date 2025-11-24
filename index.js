document.addEventListener("DOMContentLoaded", function() {
  
  const form = document.getElementById("applicationForm");
  const tableBody = document.querySelector("#applicationsTable tbody");
  const searchBox = document.getElementById("searchName");
  const filterExp = document.getElementById("filterExp");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const currentPageSpan = document.getElementById("currentPage");

  let currentPage = 1;
  const itemsPerPage = 5;

 
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const experience = document.getElementById("experience").value.trim();
      const resumeFile = document.getElementById("resume").files[0];

      if (!name || !email || !phone || !experience || !resumeFile) {
        alert("Please fill all fields and upload resume.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function() {
        const resumeData = reader.result;

        let applications = JSON.parse(localStorage.getItem("applications")) || [];
        applications.push({
          id: Date.now(),
          name,
          email,
          phone,
          experience,
          resume: resumeData
        });

        localStorage.setItem("applications", JSON.stringify(applications));

        alert("Application submitted!");
        window.location.href = "applications.html";
      };

      reader.readAsDataURL(resumeFile);
    });
  }


  function loadApplications() {
    let apps = JSON.parse(localStorage.getItem("applications")) || [];
    apps = applyFilters(apps);

    const totalPages = Math.ceil(apps.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    currentPageSpan.textContent = currentPage;

    const start = (currentPage - 1) * itemsPerPage;
    const paginatedApps = apps.slice(start, start + itemsPerPage);

    tableBody.innerHTML = "";
    paginatedApps.forEach(app => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${app.name}</td>
        <td>${app.email}</td>
        <td>${app.phone}</td>
        <td>${app.experience}</td>
        <td><a href="${app.resume}" download="resume.pdf">Download</a></td>
        <td>
          <button onclick="editApp(${app.id})">Edit</button>
          <button onclick="deleteApp(${app.id})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

 
  function applyFilters(apps) {
    const nameSearch = searchBox ? searchBox.value.toLowerCase() : "";
    const expFilter = filterExp ? filterExp.value : "";

    return apps.filter(app => {
      let matchesName = app.name.toLowerCase().includes(nameSearch);

      let matchesExp = true;
      if (expFilter === "0-1") matchesExp = app.experience <= 1;
      if (expFilter === "2-4") matchesExp = app.experience >= 2 && app.experience <= 4;
      if (expFilter === "5-9") matchesExp = app.experience >= 5 && app.experience <= 9;
      if (expFilter === "10+") matchesExp = app.experience >= 10;

      return matchesName && matchesExp;
    });
  }

 
  if (searchBox) {
    searchBox.addEventListener("input", function(e) {
      e.preventDefault();
      currentPage = 1;
      loadApplications();
    });
  }
  if (filterExp) {
    filterExp.addEventListener("change", function(e) {
      currentPage = 1;
      loadApplications();
    });
  }

  if (prevPageBtn) {
    prevPageBtn.addEventListener("click", function() {
      if (currentPage > 1) {
        currentPage--;
        loadApplications();
      }
    });
  }
  if (nextPageBtn) {
    nextPageBtn.addEventListener("click", function() {
      let apps = JSON.parse(localStorage.getItem("applications")) || [];
      apps = applyFilters(apps);
      const totalPages = Math.ceil(apps.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        loadApplications();
      }
    });
  }


  window.editApp = function(id) {
    let apps = JSON.parse(localStorage.getItem("applications")) || [];
    const app = apps.find(a => a.id === id);
    if (!app) return;

    const newName = prompt("Edit Name:", app.name);
    if (!newName) return;

    app.name = newName;
    localStorage.setItem("applications", JSON.stringify(apps));
    loadApplications();
  };

  window.deleteApp = function(id) {
    if (!confirm("Delete this application?")) return;

    let apps = JSON.parse(localStorage.getItem("applications")) || [];
    apps = apps.filter(a => a.id !== id);
    localStorage.setItem("applications", JSON.stringify(apps));
    loadApplications();
  };


  loadApplications();
});

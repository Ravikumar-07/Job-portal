# Job Application Portal

A simple **Job Application Portal** built with **HTML, CSS, and JavaScript**. This project demonstrates form handling, validation, file upload, localStorage usage, search, filtering, and pagination.  

---

## **Features**

### Apply Page (`apply.html`)
- Submit job applications with fields:
  - Name
  - Email
  - Phone
  - Experience (years)
  - Resume upload (PDF/DOC/DOCX)
- Form validation to ensure all fields are filled.
- Resume stored as Base64 in `localStorage`.
- On submission, redirects to the Applications page.

### Applications Page (`applications.html`)
- List of submitted applications.
- Search by name.
- Filter by experience.
- Edit and delete applications.
- Pagination support (5 applications per page).
- Download uploaded resume.

---

## **Technologies Used**
- HTML5
- CSS3
- JavaScript (Vanilla)
- Browser `localStorage` for temporary data storage.

---

## **How to Run**
1. Clone or download the repository.  
2. Open the project folder in VSCode or any editor.  
3. Open `apply.html` in your browser to submit applications.  
4. Submitted applications can be viewed in `applications.html`.

---

## **How to Use**
1. Fill out all fields in the application form and upload your resume.  
2. Click **Submit** → you will be redirected to the Applications page.  
3. Use **search** to find applications by name.  
4. Use **filter** to filter by experience.  
5. Use **Edit** or **Delete** buttons to modify or remove applications.  
6. Click **Download** to download the uploaded resume.

---

## **Notes**
- This project uses **localStorage** to temporarily store application data. Refreshing the page keeps data, but clearing browser storage will delete it.  
- Resume files are stored as Base64 strings.

---

## **Author**
Your Name  

---


const registrationForm = document.getElementById('registrationForm');
const userDataTable = document.getElementById('userDataTable');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate date of birth (between 18 and 55)
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (age < 18 || age > 55) {
        alert('Date of birth must be between 18 and 55 years old.');
        return;
    }

    // Save data to local storage
    const userData = {
        name,
        email,
        password,
        dob,
        terms
    };

    // Get existing users from local storage
    let existingUsers = JSON.parse(localStorage.getItem('userData')) || [];
    existingUsers.push(userData);
    localStorage.setItem('userData', JSON.stringify(existingUsers));

    // Add data to table
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${terms}</td>
    `;
    userDataTable.appendChild(row);

    // Clear form fields
    registrationForm.reset();
});

// Load saved data from local storage on page load
const savedData = localStorage.getItem('userData');
if (savedData) {
    const userDataArray = JSON.parse(savedData);
    userDataArray.forEach(userData => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.password}</td>
            <td>${userData.dob}</td>
            <td>${userData.terms}</td>
        `;
        userDataTable.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const userTableBody = document.getElementById("userTableBody");
  const errorMessageDiv = document.getElementById("error-message");
  const searchBox = document.getElementById("searchBox");
  const apiUrl = "http://localhost:3000/api/users";

  // Fungsi untuk mengambil semua pengguna atau mencari pengguna berdasarkan query
  const fetchUsers = async (query = "") => {
    try {
      const response = await fetch(`${apiUrl}?text=${query}`);
      if (!response.ok) throw new Error("Error fetching users");
      const users = await response.json();
      renderUsers(users);
    } catch (error) {
      showError(error.message);
    }
  };

  // Fungsi untuk merender daftar pengguna ke dalam tabel
  const renderUsers = (users) => {
    userTableBody.innerHTML = "";
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber}</td>
                <td>
                    <button class="edit-btn" data-id="${user.id}">Edit</button>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                </td>
            `;
      userTableBody.appendChild(row);
    });

    // Menambahkan event listener untuk tombol edit dan delete
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => editUser(button.dataset.id));
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => deleteUser(button.dataset.id));
    });
  };

  // Fungsi untuk membuat pengguna baru
  const createUser = async (user) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(`Error creating user: ${data["error"]}`);
      fetchUsers();
    } catch (error) {
      showError(error.message);
    }
  };

  // Fungsi untuk memperbarui pengguna yang ada
  const updateUser = async (user) => {
    try {
      const response = await fetch(`${apiUrl}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Error updating user");
      fetchUsers();
    } catch (error) {
      showError(error.message);
    }
  };

  // Fungsi untuk menghapus pengguna berdasarkan ID
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error deleting user");
      fetchUsers();
    } catch (error) {
      showError(error.message);
    }
  };

  // Fungsi untuk mengedit pengguna berdasarkan ID
  const editUser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      if (!response.ok) throw new Error("Error fetching user");
      const user = await response.json();
      document.getElementById("userId").value = user.id;
      document.getElementById("firstName").value = user.firstName;
      document.getElementById("lastName").value = user.lastName;
      document.getElementById("email").value = user.email;
      document.getElementById("phoneNumber").value = user.phoneNumber;
    } catch (error) {
      showError(error.message);
    }
  };

  // Fungsi untuk menampilkan pesan error
  const showError = (message) => {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = "block";
    setTimeout(() => {
      errorMessageDiv.style.display = "none";
    }, 3000);
  };

  // Fungsi untuk memeriksa apakah pengguna dengan ID tertentu sudah ada
  const userExists = async (id) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Error checking user ID");
      const users = await response.json();
      return users.some((u) => u.id === id);
    } catch (error) {
      showError(error.message);
      return false;
    }
  };

  // Event listener untuk submit form pengguna
  userForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Mendapatkan nilai dari form
    const userId = document.getElementById("userId").value;
    const user = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      email: document.getElementById("email").value,
    };

    // Pola validasi
    const namePattern = /^[A-Za-z]+$/;
    const phonePattern = /^(?:\+62|62|0)8[1-9][0-9]{6,9}$/;

    // Validasi firstName dan lastName
    if (!namePattern.test(user.firstName)) {
      showError("First Name must only contain alphabetic characters.");
      return;
    }

    if (!namePattern.test(user.lastName)) {
      showError("Last Name must only contain alphabetic characters.");
      return;
    }

    // Validasi phoneNumber
    if (
      !phonePattern.test(user.phoneNumber) ||
      user.phoneNumber.length < 9 ||
      user.phoneNumber.length > 12
    ) {
      showError(
        "Phone Number must be between 9 and 12 digits and follow the required pattern.",
      );
      return;
    }

    // Memeriksa apakah ID pengguna sudah ada
    if (userId && (await userExists(userId))) {
      showError("User ID already exists.");
      return;
    }

    // Membuat atau memperbarui pengguna
    if (userId) {
      user.id = userId;
      updateUser(user);
    } else {
      createUser(user);
    }

    // Mengatur ulang form
    userForm.reset();
  });

  // Event listener untuk kotak pencarian
  searchBox.addEventListener("input", (event) => {
    const query = event.target.value;
    fetchUsers(query);
  });

  // Mengambil dan merender pengguna saat halaman dimuat
  fetchUsers();
});

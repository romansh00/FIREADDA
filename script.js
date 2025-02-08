document.getElementById("wallet-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const amount = document.getElementById("amount").value;

    if (username && amount) {
        localStorage.setItem("depositUsername", username);
        localStorage.setItem("depositAmount", amount);
        alert(`✅ Please write your username "${username}" in the remarks when making the deposit.`);
        window.location.href = "deposit.html"; // Ensure deposit.html exists
    } else {
        alert("❌ Please fill all fields.");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    // Redirect to login page if not logged in
    if (!userLoggedIn && window.location.pathname !== "/login.html" && window.location.pathname !== "/register.html") {
        window.location.href = "login.html";
    }
});


document.getElementById("login-form")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Simulate login (in real projects, use a backend)
    localStorage.setItem("userLoggedIn", "true");
    window.location.href = "index.html"; // Redirect to home
});

document.getElementById("register-form")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Simulate registration
    localStorage.setItem("userLoggedIn", "true");
    window.location.href = "index.html"; // Redirect to home
});


document.getElementById("custom-room-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const matchType = document.getElementById("match-type").value;
    const entryFee = document.getElementById("entry-fee").value;

    if (entryFee > 0) {
        const match = {
            id: Date.now(),
            type: matchType,
            fee: entryFee,
            creator: localStorage.getItem("username") || "Unknown",
            accepted: false,
            roomId: null,
            roomPass: null
        };

        let matches = JSON.parse(localStorage.getItem("matches")) || [];
        matches.push(match);
        localStorage.setItem("matches", JSON.stringify(matches));

        alert("✅ Match created successfully!");
        loadMatches();
    } else {
        alert("❌ Please enter a valid entry fee.");
    }
});

// Load Matches on Page Load
function loadMatches() {
    const matchList = document.getElementById("match-list");
    matchList.innerHTML = "";
    
    const matches = JSON.parse(localStorage.getItem("matches")) || [];
    matches.forEach(match => {
        if (!match.accepted) {
            matchList.innerHTML += `
                <div class="match-card">
                    <p>🆚 Match Type: <strong>${match.type}</strong></p>
                    <p>💰 Entry Fee: <strong>${match.fee} Coins</strong></p>
                    <p>👤 Created by: <strong>${match.creator}</strong></p>
                    <button onclick="acceptMatch(${match.id})" class="btn">Accept Challenge</button>
                </div>
            `;
        }
    });
}

// Accepting Match
function acceptMatch(matchId) {
    let matches = JSON.parse(localStorage.getItem("matches")) || [];
    let match = matches.find(m => m.id === matchId);

    if (match) {
        match.accepted = true;
        localStorage.setItem("matches", JSON.stringify(matches));
        alert("✅ Match accepted! Now enter Room ID & Password.");
        loadMatches();
        window.location.href = "enter-room.html";
    }
}

document.addEventListener("DOMContentLoaded", loadMatches);


document.getElementById("room-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const roomId = document.getElementById("room-id").value;
    const roomPass = document.getElementById("room-pass").value;

    let matches = JSON.parse(localStorage.getItem("matches")) || [];
    let match = matches.find(m => m.accepted && !m.roomId);

    if (match) {
        match.roomId = roomId;
        match.roomPass = roomPass;
        localStorage.setItem("matches", JSON.stringify(matches));
        alert("✅ Room details submitted successfully!");
        window.location.href = "tournaments.html";
    } else {
        alert("❌ No pending match found.");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    // Redirect to login if not logged in
    if (!userLoggedIn && window.location.pathname !== "/login.html" && window.location.pathname !== "/register.html") {
        window.location.href = "login.html";
    }
});

// Handle User Registration
document.getElementById("register-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("userLoggedIn", "true");

        alert("✅ Registration Successful! Redirecting to Home...");
        window.location.href = "index.html"; // Redirect to Home
    } else {
        alert("❌ Please fill all fields.");
    }
});

// Handle User Login
document.getElementById("login-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const enteredUsername = document.getElementById("login-username").value;
    const enteredPassword = document.getElementById("login-password").value;
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        localStorage.setItem("userLoggedIn", "true");
        alert("✅ Login Successful! Redirecting to Home...");
        window.location.href = "index.html"; // Redirect to Home
    } else {
        alert("❌ Incorrect username or password.");
    }
});

// Logout Function (Add this to any page where you want a logout button)
function logout() {
    localStorage.removeItem("userLoggedIn");
    alert("🚪 Logged out successfully!");
    window.location.href = "login.html";
}


document.addEventListener("DOMContentLoaded", function() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    // Redirect to login page if not logged in
    if (!userLoggedIn && window.location.pathname !== "/login.html" && window.location.pathname !== "/register.html") {
        window.location.href = "login.html";
    }

    // Redirect to login if user clicks anywhere on the page
    document.body.addEventListener("click", function() {
        if (!localStorage.getItem("userLoggedIn")) {
            window.location.href = "login.html";
        }
    });
});


function logout() {
    localStorage.removeItem("userLoggedIn");
    alert("🚪 Logged out successfully!");
    window.location.href = "login.html";
}


document.addEventListener("DOMContentLoaded", function() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    // Redirect to login page if not logged in
    if (!userLoggedIn && window.location.pathname !== "/login.html" && window.location.pathname !== "/register.html") {
        window.location.href = "login.html";
    }

    // Redirect to login if user clicks anywhere on the page
    document.body.addEventListener("click", function() {
        if (!localStorage.getItem("userLoggedIn")) {
            window.location.href = "login.html";
        }
    });

    // Remove "Home" and "Register" from navigation if user is logged in
    if (userLoggedIn) {
        document.getElementById("nav-home")?.remove();
        document.getElementById("nav-register")?.remove();
    }
});

// Handle User Registration
document.getElementById("register-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (username && password) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("userLoggedIn", "true");

        alert("✅ Registration Successful! Redirecting to Tournaments...");
        window.location.href = "tournaments.html"; // Redirect to Tournaments Page
    } else {
        alert("❌ Please fill all fields.");
    }
});

// Handle User Login
document.getElementById("login-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const enteredUsername = document.getElementById("login-username").value;
    const enteredPassword = document.getElementById("login-password").value;
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        localStorage.setItem("userLoggedIn", "true");
        alert("✅ Login Successful! Redirecting to Tournaments...");
        window.location.href = "tournaments.html"; // Redirect to Tournaments Page
    } else {
        alert("❌ Incorrect username or password.");
    }
});

// Logout Function
function logout() {
    localStorage.removeItem("userLoggedIn");
    alert("🚪 Logged out successfully!");
    window.location.href = "login.html";
}


document.addEventListener("DOMContentLoaded", function() {
    // Set Initial Balance
    let walletBalance = localStorage.getItem("walletBalance") || 0;
    document.getElementById("wallet-balance").textContent = `₹${walletBalance}`;

    // Withdraw Money Logic
    document.getElementById("withdraw-form")?.addEventListener("submit", function(event) {
        event.preventDefault();

        let bankName = document.getElementById("bank-name").value;
        let bankAccount = document.getElementById("bank-account").value;
        let withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);

        if (!bankName || !bankAccount || withdrawAmount <= 0) {
            alert("❌ Please enter valid details!");
            return;
        }

        if (withdrawAmount > walletBalance) {
            alert("❌ Insufficient balance!");
            return;
        }

        // Deduct Money from Wallet
        walletBalance -= withdrawAmount;
        localStorage.setItem("walletBalance", walletBalance);
        document.getElementById("wallet-balance").textContent = `₹${walletBalance}`;

        alert(`✅ Withdrawal Successful!\nBank Name: ${bankName}\nAccount No: ${bankAccount}\nAmount: ₹${withdrawAmount}`);
    });
});

// Redirect to Deposit Page
function redirectToDeposit() {
    window.location.href = "deposit.html";
}

// Logout Function
function logout() {
    localStorage.removeItem("userLoggedIn");
    alert("🚪 Logged out successfully!");
    window.location.href = "login.html";
}


document.addEventListener("DOMContentLoaded", function() {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    // Redirect to login if not logged in
    if (!userLoggedIn) {
        window.location.href = "login.html";
    }

    // Handle Match Creation
    document.getElementById("create-match-form")?.addEventListener("submit", function(event) {
        event.preventDefault();

        const matchType = document.getElementById("match-type").value;
        const entryFee = parseFloat(document.getElementById("entry-fee").value);

        if (entryFee <= 0) {
            alert("❌ Entry Fee must be greater than ₹0.");
            return;
        }

        const username = localStorage.getItem("username") || "Unknown Player";

        const match = {
            id: Date.now(),
            creator: username,
            type: matchType,
            fee: entryFee,
            status: "Waiting for Opponent"
        };

        let matches = JSON.parse(localStorage.getItem("matches")) || [];
        matches.push(match);
        localStorage.setItem("matches", JSON.stringify(matches));

        alert(`✅ Match Created!\nType: ${matchType}\nEntry Fee: ₹${entryFee}`);
        displayMatches();
    });

    // Display Matches
    function displayMatches() {
        const matchList = document.getElementById("match-list");
        if (!matchList) return;

        matchList.innerHTML = "";
        const matches = JSON.parse(localStorage.getItem("matches")) || [];

        if (matches.length === 0) {
            matchList.innerHTML = "<p>No matches available.</p>";
            return;
        }

        matches.forEach(match => {
            const matchDiv = document.createElement("div");
            matchDiv.classList.add("match-item");
            matchDiv.innerHTML = `
                <p><strong>Creator:</strong> ${match.creator}</p>
                <p><strong>Type:</strong> ${match.type}</p>
                <p><strong>Entry Fee:</strong> ₹${match.fee}</p>
                <p><strong>Status:</strong> ${match.status}</p>
                ${match.status === "Waiting for Opponent" ? `<button class="btn join-match" data-id="${match.id}">Join Match</button>` : ""}
            `;
            matchList.appendChild(matchDiv);
        });

        // Handle Match Joining
        document.querySelectorAll(".join-match").forEach(button => {
            button.addEventListener("click", function() {
                joinMatch(this.dataset.id);
            });
        });
    }

    // Join a Match
    function joinMatch(matchId) {
        let matches = JSON.parse(localStorage.getItem("matches")) || [];
        const matchIndex = matches.findIndex(m => m.id == matchId);

        if (matchIndex === -1) return;

        matches[matchIndex].status = "Opponent Found! Enter Room ID & Pass";

        localStorage.setItem("matches", JSON.stringify(matches));
        displayMatches();

        alert("✅ You have joined the match! Contact the creator for room details.");
    }

    // Initial Display of Matches
    displayMatches();
});

// Logout Function
function logout() {
    localStorage.removeItem("userLoggedIn");
    alert("🚪 Logged out successfully!");
    window.location.href = "login.html";
}


document.addEventListener("DOMContentLoaded", function () {
    // Load Tournaments
    function loadTournaments() {
        const tournamentsTable = document.querySelector("#tournaments-table tbody");
        tournamentsTable.innerHTML = "";
        let tournaments = JSON.parse(localStorage.getItem("matches")) || [];

        if (tournaments.length === 0) {
            tournamentsTable.innerHTML = `<tr><td colspan="4">No tournaments available.</td></tr>`;
            return;
        }

        tournaments.forEach(match => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${match.type}</td>
                <td>₹${match.fee}</td>
                <td>${match.status}</td>
                <td>
                    ${match.status === "Open" ? `<button class="btn join-btn" data-id="${match.id}">Join</button>` : "Closed"}
                </td>
            `;
            tournamentsTable.appendChild(row);
        });

        document.querySelectorAll(".join-btn").forEach(button => {
            button.addEventListener("click", function () {
                joinTournament(this.dataset.id);
            });
        });
    }

    // Function to Join a Tournament
    function joinTournament(tournamentId) {
        let tournaments = JSON.parse(localStorage.getItem("matches")) || [];
        let tournament = tournaments.find(t => t.id == tournamentId);

        if (!tournament) {
            alert("❌ Tournament not found!");
            return;
        }

        if (tournament.status !== "Open") {
            alert("❌ Tournament is already closed!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let loggedInUser = localStorage.getItem("loggedInUser");

        if (!loggedInUser) {
            alert("❌ Please login to join a tournament!");
            window.location.href = "login.html";
            return;
        }

        let user = users.find(u => u.username === loggedInUser);
        if (!user) {
            alert("❌ User not found!");
            return;
        }

        if (user.wallet < tournament.fee) {
            alert("❌ Insufficient balance! Please add money to your wallet.");
            window.location.href = "wallet.html";
            return;
        }

        // Deduct Entry Fee from User's Wallet
        user.wallet -= tournament.fee;
        tournaments = tournaments.map(t => (t.id == tournamentId ? { ...t, status: "Joined" } : t));

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("matches", JSON.stringify(tournaments));

        alert("✅ You have successfully joined the tournament!");
        loadTournaments();
    }

    // Logout User
    window.logoutUser = function () {
        localStorage.removeItem("loggedInUser");
        alert("🚪 Logged out successfully!");
        window.location.href = "login.html";
    };

    loadTournaments();
});


document.addEventListener("DOMContentLoaded", function () {
    const tournamentsTable = document.querySelector("#tournaments-table tbody");
    const createTournamentForm = document.querySelector("#create-tournament-form");

    let loggedInUser = localStorage.getItem("loggedInUser");
    let isAdmin = localStorage.getItem("isAdmin"); // Check if the logged-in user is an admin

    if (!loggedInUser) {
        alert("❌ Please login first!");
        window.location.href = "login.html";
        return;
    }

    function loadTournaments() {
        tournamentsTable.innerHTML = "";
        let tournaments = JSON.parse(localStorage.getItem("matches")) || [];

        if (tournaments.length === 0) {
            tournamentsTable.innerHTML = `<tr><td colspan="5">No tournaments available.</td></tr>`;
            return;
        }

        tournaments.forEach(match => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${match.type}</td>
                <td>₹${match.fee}</td>
                <td>${match.createdBy}</td>
                <td>${match.status}</td>
                <td>
                    ${match.status === "Open" ? `<button class="btn join-btn" data-id="${match.id}">Join</button>` : "Closed"}
                </td>
            `;
            tournamentsTable.appendChild(row);
        });

        document.querySelectorAll(".join-btn").forEach(button => {
            button.addEventListener("click", function () {
                joinTournament(this.dataset.id);
            });
        });
    }

    createTournamentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let matchType = document.querySelector("#match-type").value;
        let entryFee = parseFloat(document.querySelector("#entry-fee").value);

        let tournaments = JSON.parse(localStorage.getItem("matches")) || [];

        let newTournament = {
            id: Date.now(),
            type: matchType,
            fee: entryFee,
            createdBy: isAdmin ? "Admin" : loggedInUser,
            status: "Open"
        };

        tournaments.push(newTournament);
        localStorage.setItem("matches", JSON.stringify(tournaments));

        alert("✅ Tournament Created Successfully!");
        createTournamentForm.reset();
        loadTournaments();
    });

    function joinTournament(tournamentId) {
        let tournaments = JSON.parse(localStorage.getItem("matches")) || [];
        let tournament = tournaments.find(t => t.id == tournamentId);

        if (!tournament) {
            alert("❌ Tournament not found!");
            return;
        }

        if (tournament.status !== "Open") {
            alert("❌ Tournament is already closed!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.username === loggedInUser);

        if (!user) {
            alert("❌ User not found!");
            return;
        }

        if (user.wallet < tournament.fee) {
            alert("❌ Insufficient balance! Please add money to your wallet.");
            window.location.href = "wallet.html";
            return;
        }

        user.wallet -= tournament.fee;
        tournaments = tournaments.map(t => (t.id == tournamentId ? { ...t, status: "Joined" } : t));

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("matches", JSON.stringify(tournaments));

        alert("✅ You have successfully joined the tournament!");
        loadTournaments();
    }

    window.logoutUser = function () {
        localStorage.removeItem("loggedInUser");
        alert("🚪 Logged out successfully!");
        window.location.href = "login.html";
    };

    loadTournaments();
});

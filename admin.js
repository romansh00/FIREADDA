document.addEventListener("DOMContentLoaded", function() {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    // Redirect to login if not admin
    if (!adminLoggedIn) {
        window.location.href = "adminlogin.html";
    }

    // Display Users
    function loadUsers() {
        const usersTable = document.querySelector("#users-table tbody");
        usersTable.innerHTML = "";
        let users = JSON.parse(localStorage.getItem("users")) || [];

        users.forEach(user => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><button class="btn delete-user" data-username="${user.username}">❌ Remove</button></td>
            `;
            usersTable.appendChild(row);
        });

        document.querySelectorAll(".delete-user").forEach(button => {
            button.addEventListener("click", function() {
                deleteUser(this.dataset.username);
            });
        });
    }

    // Delete User
    function deleteUser(username) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter(user => user.username !== username);
        localStorage.setItem("users", JSON.stringify(users));
        alert(`❌ User "${username}" removed!`);
        loadUsers();
    }

    // Display Matches
    function loadMatches() {
        const matchesTable = document.querySelector("#matches-table tbody");
        matchesTable.innerHTML = "";
        let matches = JSON.parse(localStorage.getItem("matches")) || [];

        matches.forEach(match => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${match.type}</td>
                <td>₹${match.fee}</td>
                <td>${match.status}</td>
                <td><button class="btn delete-match" data-id="${match.id}">❌ Delete</button></td>
            `;
            matchesTable.appendChild(row);
        });

        document.querySelectorAll(".delete-match").forEach(button => {
            button.addEventListener("click", function() {
                deleteMatch(this.dataset.id);
            });
        });
    }

    // Delete Match
    function deleteMatch(matchId) {
        let matches = JSON.parse(localStorage.getItem("matches")) || [];
        matches = matches.filter(match => match.id != matchId);
        localStorage.setItem("matches", JSON.stringify(matches));
        alert(`❌ Match Deleted!`);
        loadMatches();
    }

    // Display Transactions
    function loadTransactions() {
        const transactionsTable = document.querySelector("#transactions-table tbody");
        transactionsTable.innerHTML = "";
        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

        transactions.forEach(transaction => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.user}</td>
                <td>${transaction.type}</td>
                <td>₹${transaction.amount}</td>
                <td><button class="btn delete-transaction" data-id="${transaction.id}">❌ Remove</button></td>
            `;
            transactionsTable.appendChild(row);
        });

        document.querySelectorAll(".delete-transaction").forEach(button => {
            button.addEventListener("click", function() {
                deleteTransaction(this.dataset.id);
            });
        });
    }

    // Delete Transaction
    function deleteTransaction(transactionId) {
        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions = transactions.filter(transaction => transaction.id != transactionId);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        alert(`❌ Transaction Deleted!`);
        loadTransactions();
    }

    // Logout Admin
    function logoutAdmin() {
        localStorage.removeItem("adminLoggedIn");
        alert("🚪 Logged out successfully!");
        window.location.href = "adminlogin.html";
    }

    // Load All Data
    loadUsers();
    loadMatches();
    loadTransactions();
});


document.addEventListener("DOMContentLoaded", function () {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (!adminLoggedIn) {
        window.location.href = "adminlogin.html";
    }

    // Load all data when admin panel opens
    loadUsers();
    loadMatches();
    loadTransactions();

    // Show Tournament Form
    window.showTournamentForm = function () {
        document.getElementById("tournament-form").style.display = "block";
    };

    // Create Tournament
    window.createTournament = function () {
        const matchType = document.getElementById("match-type").value;
        const entryFee = document.getElementById("entry-fee").value;

        if (!matchType || !entryFee) {
            alert("❌ Please enter match type and entry fee!");
            return;
        }

        let matches = JSON.parse(localStorage.getItem("matches")) || [];
        matches.push({ id: Date.now(), type: matchType, fee: entryFee, status: "Open" });
        localStorage.setItem("matches", JSON.stringify(matches));

        alert("✅ Tournament Created Successfully!");
        document.getElementById("tournament-form").reset();
        document.getElementById("tournament-form").style.display = "none";
        loadMatches();
    };

    // Show Money Form
    window.showMoneyForm = function () {
        document.getElementById("money-form").style.display = "block";
    };

    // Add Money to User
    window.addMoney = function () {
        const username = document.getElementById("user-name").value;
        const amount = parseInt(document.getElementById("money-amount").value);

        if (!username || isNaN(amount) || amount <= 0) {
            alert("❌ Invalid username or amount!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(user => user.username === username);

        if (!user) {
            alert("❌ User not found!");
            return;
        }

        // Add transaction history
        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push({ id: Date.now(), user: username, type: "Credit", amount: amount });
        localStorage.setItem("transactions", JSON.stringify(transactions));

        alert(`✅ ₹${amount} added to ${username}'s wallet!`);
        document.getElementById("money-form").reset();
        document.getElementById("money-form").style.display = "none";
        loadTransactions();
    };

    // Load Users
    function loadUsers() {
        const usersTable = document.querySelector("#users-table tbody");
        usersTable.innerHTML = "";
        let users = JSON.parse(localStorage.getItem("users")) || [];

        users.forEach(user => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><button class="btn delete-user" data-username="${user.username}">❌ Remove</button></td>
            `;
            usersTable.appendChild(row);
        });

        document.querySelectorAll(".delete-user").forEach(button => {
            button.addEventListener("click", function () {
                deleteUser(this.dataset.username);
            });
        });
    }

    // Load Matches
    function loadMatches() {
        const matchesTable = document.querySelector("#matches-table tbody");
        matchesTable.innerHTML = "";
        let matches = JSON.parse(localStorage.getItem("matches")) || [];

        matches.forEach(match => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${match.type}</td>
                <td>₹${match.fee}</td>
                <td>${match.status}</td>
                <td><button class="btn delete-match" data-id="${match.id}">❌ Delete</button></td>
            `;
            matchesTable.appendChild(row);
        });

        document.querySelectorAll(".delete-match").forEach(button => {
            button.addEventListener("click", function () {
                deleteMatch(this.dataset.id);
            });
        });
    }

    // Load Transactions
    function loadTransactions() {
        const transactionsTable = document.querySelector("#transactions-table tbody");
        transactionsTable.innerHTML = "";
        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

        transactions.forEach(transaction => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.user}</td>
                <td>${transaction.type}</td>
                <td>₹${transaction.amount}</td>
                <td><button class="btn delete-transaction" data-id="${transaction.id}">❌ Remove</button></td>
            `;
            transactionsTable.appendChild(row);
        });

        document.querySelectorAll(".delete-transaction").forEach(button => {
            button.addEventListener("click", function () {
                deleteTransaction(this.dataset.id);
            });
        });
    }

    // Logout
    window.logoutAdmin = function () {
        localStorage.removeItem("adminLoggedIn");
        alert("🚪 Logged out successfully!");
        window.location.href = "adminlogin.html";
    };
});


document.addEventListener("DOMContentLoaded", function () {
    const tournamentsTable = document.querySelector("#admin-tournaments-table tbody");

    function showCreateUserForm() {
        document.querySelector("#create-user-form").style.display = "block";
        document.querySelector("#add-money-form").style.display = "none";
    }

    function showAddMoneyForm() {
        document.querySelector("#add-money-form").style.display = "block";
        document.querySelector("#create-user-form").style.display = "none";
    }

    function createUser() {
        let username = document.querySelector("#new-username").value.trim();
        let email = document.querySelector("#new-email").value.trim();
        let password = document.querySelector("#new-password").value.trim();

        if (!username || !email || !password) {
            alert("❌ Please fill all fields!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.username === username)) {
            alert("❌ Username already exists!");
            return;
        }

        users.push({
            username,
            email,
            password,
            wallet: 0
        });

        localStorage.setItem("users", JSON.stringify(users));
        alert("✅ User Created Successfully!");
    }

    function addMoney() {
        let username = document.querySelector("#money-username").value.trim();
        let amount = parseFloat(document.querySelector("#money-amount").value);

        if (!username || isNaN(amount) || amount <= 0) {
            alert("❌ Invalid amount or username!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(user => user.username === username);

        if (!user) {
            alert("❌ User not found!");
            return;
        }

        user.wallet += amount;
        localStorage.setItem("users", JSON.stringify(users));

        alert(`✅ Added ₹${amount.toFixed(2)} to ${username}'s account.`);
    }

    function loadTournaments() {
        tournamentsTable.innerHTML = "";
        let tournaments = JSON.parse(localStorage.getItem("matches")) || [];

        if (tournaments.length === 0) {
            tournamentsTable.innerHTML = `<tr><td colspan="6">No tournaments available.</td></tr>`;
            return;
        }

        tournaments.forEach(match => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${match.type}</td>
                <td>₹${match.fee}</td>
                <td>${match.createdBy}</td>
                <td>${match.status}</td>
                <td>${match.winner ? match.winner : "Pending"}</td>
                <td>
                    ${match.winner ? "Completed" : `<button class="btn update-result" data-id="${match.id}">Declare Winner</button>`}
                </td>
            `;
            tournamentsTable.appendChild(row);
        });

        document.querySelectorAll(".update-result").forEach(button => {
            button.addEventListener("click", function () {
                declareWinner(this.dataset.id);
            });
        });
    }

    function declareWinner(matchId) {
        let tournaments = JSON.parse(localStorage.getItem("matches")) || [];
        let match = tournaments.find(m => m.id == matchId);

        if (!match) {
            alert("❌ Match not found!");
            return;
        }

        let winnerUsername = prompt("Enter the winner's username:");
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let winner = users.find(user => user.username === winnerUsername);

        if (!winner) {
            alert("❌ User not found!");
            return;
        }

        let prizeMoney = match.fee * 1.8; // 1.8x prize for winner
        let adminCommission = match.fee * 0.2; // 0.2x admin commission

        winner.wallet += prizeMoney;
        match.status = "Completed";
        match.winner = winnerUsername;

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("matches", JSON.stringify(tournaments));

        alert(`🏆 Winner: ${winnerUsername} | Prize: ₹${prizeMoney.toFixed(2)} | Admin Commission: ₹${adminCommission.toFixed(2)}`);
        loadTournaments();
    }

    function logoutAdmin() {
        localStorage.removeItem("isAdmin");
        alert("🚪 Logged out successfully!");
        window.location.href = "adminlogin.html";
    }

    loadTournaments();
});


function loadTournaments() {
    const tournamentsTable = document.querySelector("#admin-tournaments-table tbody");
    tournamentsTable.innerHTML = "";
    let tournaments = JSON.parse(localStorage.getItem("matches")) || [];

    if (tournaments.length === 0) {
        tournamentsTable.innerHTML = `<tr><td colspan="8">No tournaments available.</td></tr>`;
        return;
    }

    tournaments.forEach(match => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${match.type}</td>
            <td>₹${match.fee}</td>
            <td>${match.createdBy}</td>
            <td>${match.players ? match.players.join(" vs ") : "Not assigned"}</td>
            <td>${match.status}</td>
            <td>${match.winner ? match.winner : "Pending"}</td>
            <td>
                ${match.winningProof ? `<img src="${match.winningProof}" width="100">` : "No proof uploaded"}
            </td>
            <td>
                ${match.winner ? "Completed" : `<button class="btn update-result" data-id="${match.id}">Declare Winner</button>`}
            </td>
        `;

        tournamentsTable.appendChild(row);
    });

    document.querySelectorAll(".update-result").forEach(button => {
        button.addEventListener("click", function () {
            declareWinner(this.dataset.id);
        });
    });
}


function declareWinner(matchId) {
    let tournaments = JSON.parse(localStorage.getItem("matches")) || [];
    let match = tournaments.find(m => m.id == matchId);

    if (!match) {
        alert("❌ Match not found!");
        return;
    }

    if (!match.players || match.players.length < 2) {
        alert("❌ Players not assigned for this match.");
        return;
    }

    let winnerUsername = prompt(`Enter the winner's username:\n\n${match.players.join(" vs ")}`);

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let winner = users.find(user => user.username === winnerUsername);

    if (!winner) {
        alert("❌ User not found!");
        return;
    }

    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/png";

    fileInput.onchange = function () {
        let file = fileInput.files[0];

        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                let proofImage = e.target.result;

                let prizeMoney = match.fee * 1.8; // 1.8x prize for winner
                let adminCommission = match.fee * 0.2; // 0.2x admin commission

                winner.wallet += prizeMoney;
                match.status = "Completed";
                match.winner = winnerUsername;
                match.winningProof = proofImage;

                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("matches", JSON.stringify(tournaments));

                alert(`🏆 Winner: ${winnerUsername} | Prize: ₹${prizeMoney.toFixed(2)} | Admin Commission: ₹${adminCommission.toFixed(2)}`);
                loadTournaments();
            };
        }
    };

    fileInput.click();
}

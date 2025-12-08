//--Get HTML DOM Element References
const form = document.getElementById('songForm');
const list = document.getElementById('songList');
const submitBtn = document.getElementById('submitBtn');

// possible modes (table/cards)
const tableView = document.getElementById('tableView');
const cardsView = document.getElementById('cardsView');

// toggle button + icon
const viewToggleBtn = document.getElementById('viewToggleBtn');
const viewToggleIcon = document.getElementById('viewToggleIcon');

// set the current view table
let currentView = 'table';

//--if not exist in localStorage get empty array 
//-- else get json text and convert it to object json
let songs = JSON.parse(localStorage.getItem('songs')) || [];

//--save to Local Storage and render UI Table
function SaveAndRender() {

    localStorage.setItem('songs', JSON.stringify(songs));

    // RENDER UI TABLE
    renderSongs();
}

// Render songs
function renderSongs() {
    // Clear table and cards
    list.innerHTML = '';
    cardsView.innerHTML = '';

    songs.forEach(song => {

        // ---------- TABLE VIEW ----------
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${song.thumbnail}" width="80" class="rounded me-2">
                ${song.title}
            </td>
            <td><a href="${song.url}" target="_blank" class="text-info">Watch</a></td>
            <td>${song.rating}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-info me-2" onclick="playSong('${song.url}')">
                    <i class="fas fa-play"></i>
                </button>
                <button class="btn btn-sm btn-warning me-2" onclick="editSong(${song.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(row);

        // ---------- CARDS VIEW ----------
        const col = document.createElement('div');
        col.className = 'col';

        col.innerHTML = `
            <div class="card h-100 bg-dark border-secondary">
                <img src="${song.thumbnail}" class="card-img-top" alt="${song.title}">

                <div class="card-body bg-black text-white">
                    <h5 class="card-title">${song.title}</h5>
                    <p class="card-text">Rating: ${song.rating}</p>
                    <a href="${song.url}" target="_blank" class="btn btn-sm btn-outline-info">
                        <i class="fas fa-link"></i> Watch
                    </a>
                </div>

                <div class="card-footer bg-black text-end">
                    <button class="btn btn-sm btn-info me-2" onclick="playSong('${song.url}')">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="btn btn-sm btn-warning me-2" onclick="editSong(${song.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cardsView.appendChild(col);
    });

    // ---------- apply current view ----------
    if (currentView === "table") {
        tableView.style.display = "";
        cardsView.style.display = "none";
        viewToggleIcon.src = "cards-view.png"; // show the cards view icon
    } else {
        tableView.style.display = "none";
        cardsView.style.display = "";
        viewToggleIcon.src = "table-view.png"; // show the table view icon
    }
}

// Toggle between table and cards view
viewToggleBtn.addEventListener("click", () => {
    currentView = (currentView === "table") ? "cards" : "table";
    renderSongs();
});

// delete song button
function deleteSong(id) {
    if(confirm('Are you sure?')) {
        // Filter out the song with the matching ID
        songs = songs.filter(song => song.id !== id);
        SaveAndRender();
    }
}

// adding a new song or updating an existing one.
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const rating = document.getElementById('rating').value;
    const id = document.getElementById('songId').value; // Check hidden ID

    if (id) {
        // --- UPDATE MODE ---
        const index = songs.findIndex(s => s.id == id);
        songs[index].title = title;
        songs[index].url = url;
        songs[index].rating = rating;

        // Reset Button
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add';
        submitBtn.classList.replace('btn-warning', 'btn-success');
        document.getElementById('songId').value = ''; 
    } else {
        const videoId = extractVideoId(url);
        const thumbnail = videoId? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : "";

        // --- ADD MODE ---
        const song = {
            id: Date.now(),
            title: title,
            url: url,
            dateAdded: Date.now(),
            thumbnail: thumbnail,
            rating: rating
        };
        songs.push(song);
    }

    SaveAndRender();
    form.reset();
});

// Fill the form with the song data for editing.
function editSong(id) {
    const song = songs.find(s => s.id === id);

    // Fill the form with the song data
    document.getElementById('title').value = song.title;
    document.getElementById('url').value = song.url;
    document.getElementById('rating').value = song.rating;

    // Store the ID to update
    document.getElementById('songId').value = song.id;

    // Change button to "Update"
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update';
    submitBtn.classList.replace('btn-success', 'btn-warning');
}

// Extract the 11-character YouTube video ID from different URL formats.
function extractVideoId(url) {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/;
    const match = url.match(regExp);
    // Returns null if the URL does not contain a valid ID.
    return match ? match[1] : null;
}

// apply the selected sort and re-render the song list.
document.querySelectorAll("input[name='sortOption']").forEach(radio => {
    radio.addEventListener("change", () => {
        applySorting();
        renderSongs();
    });
});

// Apply sorting based on the selected option.
function applySorting() {
    // Get the currently selected sorting option from the radio buttons.
    const selected = document.querySelector("input[name='sortOption']:checked").value;

    // sort alphabetically (A → Z).
    if (selected === "title") {
        songs.sort((a, b) => a.title.localeCompare(b.title));
    }
    // sort by newest added first.
    else if (selected === "date") {
        songs.sort((a, b) => b.dateAdded - a.dateAdded);
    }
    // sort by highest rating first (10 → 1).
    else if (selected === "rating") {
        songs.sort((a, b) => b.rating - a.rating);
    }
}

// Play song in a popup YouTube player.
function playSong(url) {
    // Extract the YouTube video ID from the URL.
    const videoId = extractVideoId(url);
    // If no valid video ID was found, show an error and stop.
    if (!videoId) {
        alert("Invalid YouTube URL");
        return;
    }
    // Build the YouTube embed URL with autoplay enabled.
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    // Open the video in a popup window (YouTube player).
    window.open(
        embedUrl,
        "youtubePopup",
        "width=800,height=500,noopener"
    );
}

// Sortrt songs when opening the page
applySorting();
// Load songs from localStorage when opening the page or refreshing
renderSongs();
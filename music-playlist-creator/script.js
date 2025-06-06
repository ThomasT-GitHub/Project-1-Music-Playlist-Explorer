// Populates the website with the playlists in data.js
const playlistCards = document.getElementsByClassName("playlist-cards")[0];

playlistsData.forEach((playlist) => {
    playlistCards.insertAdjacentHTML(
        "afterbegin",
        `
        <section class="playlist-card" onclick="openModal({name: '${playlist.playlist_name}', creatorName: '${playlist.playlist_author}', imageUrl: '${playlist.playlist_art}', songs: ${JSON.stringify(playlist.songs).replace(/"/g, "'")}})">
            <img class="playlist-cover-art" src="${playlist.playlist_art}" alt="Playlist cover" width="200px">
            <h2 class="playlist-title">${playlist.playlist_name}</h2>
            <p class="playlist-creator-name">${playlist.playlist_author}</p>
            <div class="playlist-likes-container">
                <p class="playlist-heart-icon">♡</p>
                <p class="playlist-number-of-likes">${playlist.likes}</p>
            </div>
        </section>

    `
    );
});

// Handles logic for linking a playlist
// Gathers all the like containers to process heart icons and number of likes in pairs
const likesContainer = Array.from(document.getElementsByClassName("playlist-likes-container"));
likesContainer.forEach((likeContainer) => {
    const heartIcon = likeContainer.getElementsByClassName("playlist-heart-icon")[0];
    const likeCounter = likeContainer.getElementsByClassName("playlist-number-of-likes")[0];

    heartIcon.addEventListener('click', (event) => {
        // Swaps the heart emojis
        if (heartIcon.innerText === "❤️") {
            heartIcon.innerText = "♡"
            likeCounter.innerText = parseInt(likeCounter.innerText) - 1;
        }

        else if (heartIcon.innerText === "♡") {
            heartIcon.innerText = "❤️"
            likeCounter.innerText = parseInt(likeCounter.innerText) + 1;
        }

        event.stopImmediatePropagation(); // Keeps the modal from opening when the like button is pressed
    });

    heartIcon.addEventListener('mouseover', (event) => {
        heartIcon.style.transform = 'scale(1.5,1.5)';

        event.stopImmediatePropagation(); // Keeps the modal from opening when the like button is pressed
    });

    heartIcon.addEventListener('mouseout', (event) => {
        heartIcon.style.transform = 'scale(1,1)';

        event.stopImmediatePropagation(); // Keeps the modal from opening when the like button is pressed
    });
});

// Handles logic for shuffling a playlist
const shuffleButton = document.getElementById("playlist-shuffle-button");
shuffleButton.addEventListener('click', () => {
    const songs = Array.from(shuffleButton.parentElement.querySelector("#songs-list").children);
    songs.sort(() => Math.random() - 0.5);

    const songList = songs[0].parentElement;

    // Store the songs in a copy so they arent removed when we clear the original song list
    const songCopy = songs.map((song) => song.innerHTML);

    // Clear the song list
    songList.innerText = "";

    songCopy.forEach((song) => {
        songList.insertAdjacentHTML(
            "afterbegin",
            `
                <section class="modal-song-widget">
                    ${song}
                </section>
            `
        );
    });
});

// JavaScript for Opening and Closing the Modal
const modal = document.getElementById("playlist-modal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
    document.getElementById("songs-list").innerText = "";

    document.getElementById("playlist-name").innerText = playlist.name;
    document.getElementById("playlist-creator-name").innerText = playlist.creatorName;
    document.getElementById("playlist-image").src = playlist.imageUrl;

    playlist.songs.forEach((song) => {
        document.getElementById("songs-list").insertAdjacentHTML(
            "afterbegin",
            `
                <section class="modal-song-widget">
                    <img id="modal-song-cover" src="${song.cover_image}" alt="Song cover">
                    <li id="modal-song-title">${song.title}&nbsp;</li>
                    <li id="modal-song-author">${song.author}</li>
                </section>
            `
            );
    });

    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

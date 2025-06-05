const playlistCards = document.getElementsByClassName("playlist-cards")[0];

playlistsData.forEach((playlist) => {
    playlistCards.insertAdjacentHTML(
        "afterbegin",
        `
        <section class="playlist-card" onclick="openModal({name: '${playlist.playlist_name}', creatorName: '${playlist.playlist_author}', imageUrl: '${playlist.playlist_art}', songs: ${JSON.stringify(playlist.songs).replace(/"/g, "'")}})">
            <img class="playlist-cover-art" src="${playlist.playlist_art}" alt="Playlist cover" width="175px">
            <h2 class="playlist-title">${playlist.playlist_name}</h2>
            <p class="playlist-creator-name">${playlist.playlist_author}</p>
            <div class="playlist-likes-container">
                <p class="playlist-heart-icon">♡</p>
                <p class="playlist-number-of-likes">0</p>
            </div>
        </section>

    `
    );
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
        document.getElementById("songs-list").insertAdjacentHTML("afterbegin", `<li>${song}</li>`);
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

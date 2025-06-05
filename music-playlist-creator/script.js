const playlistCards = document.getElementsByClassName("playlist-cards")[0];

let playlistsData = [
    {
        playlistID: 1,
        playlist_name: "Lov(sic.)",
        playlist_author: "Shing02",
        playlist_art: "https://picsum.photos/200",
        songs: [
            "Lov(sic.)pt1",
            "Lov(sic.)pt2",
            "Lov(sic.)pt3",
            "Lov(sic.)pt4",
            "Lov(sic.)pt5",
            "Lov(sic.)pt6",
            "Perfect Circle",
        ],
    },
    {
        playlistID: 2,
        playlist_name: "Electronic Dreams",
        playlist_author: "Tycho",
        playlist_art: "https://picsum.photos/201",
        songs: ["Awake", "Plunge", "For How Long", "Source", "Dive", "A Walk"],
    },
    {
        playlistID: 3,
        playlist_name: "Hip Hop Classics",
        playlist_author: "DJ Premier",
        playlist_art: "https://picsum.photos/202",
        songs: [
            "The World Is Yours",
            "N.Y. State of Mind",
            "The Message",
            "Fight the Power",
            "Straight Outta Compton",
            "99 Problems",
        ],
    },
    {
        playlistID: 4,
        playlist_name: "Lo-Fi Study Music",
        playlist_author: "Jinsang",
        playlist_art: "https://picsum.photos/203",
        songs: ["Life", "Lost", "Found", " Serenity", "Peaceful", "Calm"],
    },
    {
        playlistID: 5,
        playlist_name: "Retro Video Games",
        playlist_author: "Anamanaguchi",
        playlist_art: "https://picsum.photos/204",
        songs: [
            "Airbrushed",
            "Pitaya",
            "Sakura",
            "Kaleidoscope",
            "Tetris",
            "Pac-Man",
        ],
    },
    {
        playlistID: 6,
        playlist_name: "Nature Sounds",
        playlist_author: "Relaxing White Noise",
        playlist_art: "https://picsum.photos/205",
        songs: [
            "Rainy Days",
            "Ocean Waves",
            "Forest Sounds",
            "Babbling Brook",
            "Wind Chimes",
            "Crackling Fire",
        ],
    },
];

playlistsData.forEach((playlist) => {
    playlistCards.insertAdjacentHTML(
        "afterbegin",
        `
        <section class="playlist-card" onclick="openModal({name: '${playlist.playlist_name}', creatorName: '${playlist.playlist_author}', imageUrl: '${playlist.playlist_art}', songs: ${JSON.stringify(playlist.songs).replace(/"/g, "'")}})">
            <img class="playlist-cover-art" src="${playlist.playlist_art}" alt="Playlist cover" width="175px">
            <h2 class="playlist-title">${playlist.playlist_name}</h2>
            <p class="playlist-creator-name">${playlist.playlist_author}</p>
            <div class="playlist-likes-container">
                <img class="playlist-heart-icon" src="assets/img/favicon.ico" alt="" width="20px" height="20px">
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

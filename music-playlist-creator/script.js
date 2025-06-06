if (window.location.pathname.endsWith("featured.html")) {
    // Javascript for handling featured page
    const featuredPlaylistCover = document.getElementById("featured-playlist-cover");
    const featuredPlaylistTitle = document.getElementById("featured-playlist-title");
    const featuredPlaylistAuthor = document.getElementById("featured-playlist-author");
    const songList = document.getElementById("featured-songs-list");

    // Select a random playlist
    const playlistToFeature = playlistsData[Math.floor(Math.random() * playlistsData.length)];

    featuredPlaylistCover.innerText = playlistToFeature.playlist_art;
    featuredPlaylistTitle.innerText = playlistToFeature.playlist_name;
    featuredPlaylistAuthor.innerText = playlistToFeature.playlist_author;

    playlistToFeature.songs.forEach((song) => {
        songList.insertAdjacentHTML(
            "afterbegin",
            `
                <section id="featured-playlist-song-widget">
                    <img id="featured-playlist-song-cover" src="${song.cover_image}" alt="Song cover">
                    <div id="featured-playlist-song-information-container">
                        <li id="featured-playlist-song-title">${song.title}&nbsp;<br></li>
                        <li id="featured-playlist-song-author">${song.author}</li>
                    </div>
                    <p id="featured-playlist-song-duration">${song.duration}</p>
                </section>
            `
        )
    });
}

if (window.location.pathname.endsWith("index.html")) {
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
                <button class="playlist-delete-button">🗑️ Delete</button>
                <button class="playlist-edit-button">✏️ Edit</button>
                <div class="playlist-likes-container">
                    <p class="playlist-heart-icon">♡</p>
                    <p class="playlist-number-of-likes">${playlist.likes}</p>
                </div>
            </section>
            `
        );
    });

    // Handles sorting
    let listOfPlaylistCards = Array.from(document.getElementsByClassName("playlist-card"));
    let sortingDropDown = document.getElementById("sort-select");
    let sortedPlaylist;

    sortingDropDown.addEventListener("change", () => {
        const selection = sortingDropDown.value;

        switch (selection) {
            case "number-of-likes":
                sortedPlaylist = listOfPlaylistCards.sort((a, b) => {
                    let numberOfLikesA = a.getElementsByClassName("playlist-number-of-likes")[0];
                    let numberOfLikesB = b.getElementsByClassName("playlist-number-of-likes")[0];

                    return numberOfLikesA - numberOfLikesB;
                });
                break;

            case "A-Z":
                sortedPlaylist = listOfPlaylistCards.sort((a, b) => {

                });
                break;

            case "chronologically":
                sortedPlaylist = listOfPlaylistCards.sort((a, b) => {

                });
                break;
        }

        playlistCards.innerText = "";

        listOfPlaylistCards.forEach((playlistCard) => {
            title = playlistCard.getElementsByClassName.apply("playlist-title")[0];
            author = playlistCard.getElementsByClassName.apply("playlist-author")[0];
            art = playlistCard.getElementsByClassName.apply("playlist-cover-art")[0];
            songs = [""];

            playlistCards.insertAdjacentHTML(
                "afterbegin",
                `
                    <section class="playlist-card" onclick="openModal({name: '${title}', creatorName: '${author}', imageUrl: '${art}', songs: ${songs}})">
                        ${playlistCard.getHTML()}
                    </section>
                `
            )
        });
    });

    // Handles logic for liking a playlist
    // Gathers all the like containers to process heart icons and number of likes in pairs
    const likesContainer = Array.from(document.getElementsByClassName("playlist-likes-container"));
    addLikesListner(likesContainer);

    // Handles logic for deleting a playlist
    const deleteButtons = Array.from(document.getElementsByClassName("playlist-delete-button"));
    addDeleteListners(deleteButtons);

    // Handles logic for editing a playlist
    const editButtons = Array.from(document.getElementsByClassName("playlist-edit-button"));
    const editModal = document.getElementById("playlist-edit-modal");

    var playlistTitle;
    var playlistAuthor;

    addEditButton(editButtons);

    const playlistEditForm = document.getElementById("playlist-edit-form");
    playlistEditForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("form-edit-playlist-title").value;
        const author = document.getElementById("form-edit-playlist-author").value;

        playlistTitle.innerText = title;
        playlistAuthor.innerText = author;

    });

    // Handles logic for adding a playlist
    const addPlaylistButton = document.getElementById("add-playlist-button");
    const addModal = document.getElementById("playlist-add-modal");

    addPlaylistButton.addEventListener("click", () => {
        addModal.style.display = "block";
    });

    const playlistAddForm = document.getElementById("playlist-add-form");
    playlistAddForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("form-add-playlist-title").value;
        const author = document.getElementById("form-add-playlist-author").value;
        const cover = document.getElementById("form-add-playlist-cover").value;
        const songs = Array.from(document.getElementsByClassName("playlist-add-song-container"));

        songsJSONFormat = songs.map((song) => {
            return {
                        'title': song.getElementsByClassName("playlist-add-song-title")[0].value,
                        'author': song.getElementsByClassName("playlist-add-song-author")[0].value,
                        'cover_image': 'https://picsum.photos/100?random=' + Math.floor(Math.random() * 100),
                        'duration': '4:00'
                    };
        });

        playlistCards.insertAdjacentHTML(
            "afterbegin",
            `
            <section class="playlist-card" onclick="openModal({name: '${title}', creatorName: '${author}', imageUrl: '${cover}', songs: ${JSON.stringify(songsJSONFormat).replace(/"/g, "'")}})">
                <img class="playlist-cover-art" src="${cover}" alt="Playlist cover" width="200px">
                <h2 class="playlist-title">${title}</h2>
                <p class="playlist-creator-name">${author}</p>
                <button class="playlist-delete-button">🗑️ Delete</button>
                <button class="playlist-edit-button">✏️ Edit</button>
                <div class="playlist-likes-container">
                    <p class="playlist-heart-icon">♡</p>
                    <p class="playlist-number-of-likes">0</p>
                </div>
            </section>
            `
        );

        const newDelButton = [playlistCards.getElementsByClassName("playlist-delete-button")[0]];
        const newEditButton = [playlistCards.getElementsByClassName("playlist-edit-button")[0]];
        const heartButton = [playlistCards.getElementsByClassName("playlist-likes-container")[0]];

        addDeleteListners(newDelButton);
        addEditButton(newEditButton);
        addLikesListner(heartButton);

    });

    const playlistAddMoreSongFields = document.getElementById("playlist-add-song-add-more-songs-button");
    playlistAddMoreSongFields.addEventListener("click", (event) => {
        event.preventDefault();

        const songEntry = document.createElement('div');
        songEntry.innerHTML =`
                <div class="playlist-add-song-container">
                    <label for="playlist-add-form">Song Title</label>
                    <input type="text" class="playlist-add-song-title">
                    <label for="playlist-add-form"></label>Song Artist</label>
                    <input type="text" class="playlist-add-song-author">
                </div>
        `;

        playlistAddMoreSongFields.parentElement.insertBefore(
            songEntry,
            playlistAddMoreSongFields
        );
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
                    <section id="modal-song-widget">
                        ${song}
                    </section>
                `
            );
        });
    });

    // JavaScript for Opening and Closing the Modal
    const modal = document.getElementById("playlist-modal");
    const spans = Array.from(document.getElementsByClassName("close"));

    function openModal(playlist) {
        document.getElementById("songs-list").innerText = "";
        document.getElementById("playlist-name").innerText = playlist.name;
        document.getElementById("playlist-creator-name").innerText = playlist.creatorName;
        document.getElementById("playlist-image").src = playlist.imageUrl;

        playlist.songs.forEach((song) => {
            document.getElementById("songs-list").insertAdjacentHTML(
                "afterbegin",
                `
                    <section id="modal-song-widget">
                        <img id="modal-song-cover" src="${song.cover_image}" alt="Song cover">
                        <div id="modal-song-information-container">
                            <li id="modal-song-title">${song.title}&nbsp;<br></li>
                            <li id="modal-playlist-song-author">${song.author}</li>
                        </div>
                        <p id="modal-playlist-song-duration">${song.duration}</p>
                    </section>
                `
                );
        });

        modal.style.display = "block";
    }

    spans.forEach((span) => {
        span.addEventListener("click", () => {
            span.parentElement.parentElement.style.display = "none";
        })
    })
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }

        if (event.target == editModal) {
            editModal.style.display = "none";
        }

        if (event.target == addModal) {
            addModal.style.display = "none";
        }

    };
}

// HELPER FUNCTIONS

function addLikesListner(likesContainer) {
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
}

function addDeleteListners(deleteButtons) {
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            button.parentElement.remove();

            event.stopImmediatePropagation(); // Keeps the modal from opening when the like button is pressed
        });
    });
}

function addEditButton(editButtons) {
    const editModal = document.getElementById("playlist-edit-modal");

    editButtons.forEach((button) => {
        button.addEventListener("click", (event) => {

            playlistTitle = button.previousElementSibling.previousElementSibling.previousElementSibling;
            playlistAuthor = button.previousElementSibling.previousElementSibling;
            editModal.style.display = "block";

            event.stopImmediatePropagation(); // Keeps the playlist view modal from opening when the like button is pressed
        });
    });
}

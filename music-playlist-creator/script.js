// JavaScript for Opening and Closing the Modal
const modal = document.getElementById("playlist-modal");
const span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
   document.getElementById('playlist-name').innerText = playlist.name;
   document.getElementById('playlist-creator-name').innerText = playlist.creatorName;
   document.getElementById('playlist-image').src = playlist.imageUrl;
   modal.style.display = "block";
}

span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}
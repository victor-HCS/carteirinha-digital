const fileInput = document.getElementById("fileInput");
const uploadArea = document.getElementById("upload-area");
const cardArea = document.getElementById("card-area");
const cardImage = document.getElementById("cardImage");

// Checar se já existe imagem salva
const savedImage = localStorage.getItem("carteirinha");

if (savedImage) {
  showCard(savedImage);
}

// Evento upload
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result;
    localStorage.setItem("carteirinha", base64);
    showCard(base64);
  };
  reader.readAsDataURL(file);
});

function showCard(src) {
  uploadArea.classList.add("hidden");
  cardArea.classList.remove("hidden");
  cardImage.src = src;
}

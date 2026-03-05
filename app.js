function saveDocument() {
  const input = document.getElementById("fileInput");
  const file = input.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    const documents = JSON.parse(localStorage.getItem("documents")) || [];

    documents.push({
      name: file.name,
      type: file.type,
      data: e.target.result
    });

    localStorage.setItem("documents", JSON.stringify(documents));
    loadDocuments();
  };

  reader.readAsDataURL(file);
}

function loadDocuments() {
  const list = document.getElementById("documentList");
  const documents = JSON.parse(localStorage.getItem("documents")) || [];

  list.innerHTML = "";

  documents.forEach((doc, index) => {
    const div = document.createElement("div");
    div.className = "doc-item";
    div.innerText = "📄 " + doc.name;
    div.onclick = () => openDocument(index);
    list.appendChild(div);
  });
}

function openDocument(index) {
  const documents = JSON.parse(localStorage.getItem("documents")) || [];
  const doc = documents[index];
  const viewer = document.getElementById("viewer");

  if (doc.type.includes("image")) {
    viewer.innerHTML = `<img src="${doc.data}">`;
  } else if (doc.type === "application/pdf") {
    viewer.innerHTML = `<iframe src="${doc.data}" height="500px"></iframe>`;
  }
}

loadDocuments();
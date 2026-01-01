
let notes = JSON.parse(localStorage.getItem("notes")) || [];

const notesList = document.getElementById("notesList");

const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const noteDate = document.getElementById("noteDate");
const noteTime = document.getElementById("noteTime");
const noteSelect = document.getElementById("noteSelect");

const editIndex = document.getElementById("editIndex");

const saveNote = document.getElementById("saveNote");

const modalEl = document.getElementById("noteModal");
const modalTitle = document.getElementById("modalTitle");

function displayNotes() {

    notesList.innerHTML = "";

        notes.map((note, i) => {

            notesList.innerHTML +=

            `<div class="col-lg-4 col-md-6 col-12">
                <div class="card">
                    <div class="card-body">
                        <img src="${note.file}" class="img-fluid w-100 rounded mb-2">
                        <div class="p-2">
                            <h5 class="card-title">${note.title}</h5>
                            <p class="card-text mb-2">${note.text}</p>
                            <p class="card-text"><span>Date: ${note.date} | </span><span>Time: ${note.time}</span></p>
                            <p class="card-text text-capitalize">Folder: ${note.select}</p>
                        </div>
                        <div class="note-actions">
                            <i class="bi bi-pencil-square" onclick="editNote(${i})"></i>
                            <i class="bi bi-trash" onclick="deleteNote(${i})"></i>
                        </div>
                    </div>
                </div>
            <div>`;

        }).join("");
}

saveNote.addEventListener("click", () => {

    const Title = noteTitle.value.trim();
    const Text = noteText.value.trim().slice(0, 120) + "...";
    // const Text = noteText.value.trim();

    const Date = noteDate.value;
    const Time = noteTime.value;

    const Select = noteSelect.value;
 
    if (!Title || !Text || !Date || !Time || !Select ) return alert("Please fill All fields");

    const idx = editIndex.value;

    const noteFile = document.getElementById("noteFile");

    let File = "";

    if( noteFile.files && noteFile.files[0] ){
        const reader = new FileReader();

        reader.onload = function(e){
            File = e.target.result;
            saveToArray();
        }

        reader.readAsDataURL(noteFile.files[0])
    } else {
        // Keep old file when editing without choosing new one
        File = (idx !== "") ? notes[idx].file : "";
        saveToArray();      // Save immediately
    }

    function saveToArray() {

        if (idx === "") {
            notes.push({ title: Title, text: Text, date: Date, time: Time, select: Select, file: File });
        } else {
            notes[idx] = { title: Title, text: Text, date: Date, time: Time, select: Select, file: File };
        }

        localStorage.setItem("notes", JSON.stringify(notes));

        // Close Modal
        // CLOSE MODAL (Correct way)
        const modalEl = document.getElementById("noteModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();

        noteTitle.value = "";
        noteText.value = "";

        noteDate.value = "";
        noteTime.value = "";

        noteSelect.value = "";
        noteFile.value = "";
    
        editIndex.value = "";

        displayNotes();
    }



});

function editNote(i) {

    const note = notes[i];

    noteTitle.value = note.title;
    noteText.value = note.text;

    noteDate.value = note.date;
    noteTime.value = note.time;

    noteSelect.value = note.select;
       
    editIndex.value = i;

    const modalEl = document.getElementById("noteModal");

    if (modalEl) {

        document.getElementById("modalTitle").innerText = "Edit Notes";
        // Show modal using simple JS
        new bootstrap.Modal(modalEl).show();

    } else {
        console.error("Modal not found: noteModal");
    }
}

function deleteNote(i) {
    notes.splice(i, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

displayNotes();         
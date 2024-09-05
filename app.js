const inputBox = document.querySelector('#input-box');
const addBtn = document.querySelector('.btn');
const notesContainers = document.querySelector('.notes-containers');
let count = 0;

// Load notes from local storage on page load
document.addEventListener('DOMContentLoaded', loadNotes);

// Function to add a new note
function addNotes() {
    if (notesContainers.style.display === 'none') {
        notesContainers.style.display = 'block';
    }

    let noteAdded = inputBox.value.trim(); 

    if (noteAdded === "") {
        alert("You must add some note.");
    } else {
        count++;
        let note = {
            id: count,
            text: noteAdded
        };
        
        // Save the note to local storage
        saveNoteToLocalStorage(note);

        let p = document.createElement('p');
        p.classList.add("notes");

        // Create a bold label for the note number
        let noteLabel = document.createElement('strong');
        noteLabel.textContent = `Note ${count}: `;
        p.appendChild(noteLabel);

        // Truncate the note text if it's too long
        let displayNote = noteAdded.length >= 50 ? noteAdded.substring(0, 140) + "..." : noteAdded;
        let noteText = document.createElement('span');
        noteText.textContent = displayNote;
        p.appendChild(noteText);

        // Create the button container
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        // Create the delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = '\u00d7'; // Multiply symbol for delete

        // Create the view button
        let viewBtn = document.createElement('button');
        viewBtn.classList.add('view-btn');
        viewBtn.textContent = "View Detail";

        // Append buttons to the button container
        buttonContainer.appendChild(viewBtn);
        buttonContainer.appendChild(deleteBtn);
        // Append button container to the note element
        p.appendChild(buttonContainer);

        // Append note element to the notes container
        notesContainers.appendChild(p);

        // View button functionality
        viewBtn.addEventListener('click', () => {
            let detailContainer = document.createElement('div');
            detailContainer.classList.add('detail-container');

            // Create a bold label for the detail text
            let detailLabel = document.createElement('strong');
            detailLabel.textContent = "Detail: ";
            detailContainer.appendChild(detailLabel);

            // Create the detail text
            let detailText = document.createElement('p');
            detailText.classList.add('detail-text');
            detailText.textContent = noteAdded;
            detailContainer.appendChild(detailText);

            let backBtn = document.createElement('button');
            backBtn.classList.add('back-btn');
            backBtn.textContent = "Back";
            detailContainer.appendChild(backBtn);

            document.body.appendChild(detailContainer);

            // Hide the main container and notes
            document.querySelector('.container').style.display = 'none';
            notesContainers.style.display = 'none';

            // Back button functionality
            backBtn.addEventListener('click', () => {
                document.body.removeChild(detailContainer);
                document.querySelector('.container').style.display = 'block';
                notesContainers.style.display = 'block';
            });
        });

        // Delete button functionality
        deleteBtn.addEventListener('click', () => {
            notesContainers.removeChild(p);

            // Remove the note from local storage
            removeNoteFromLocalStorage(note.id);

            if (notesContainers.children.length === 0) {
                notesContainers.style.display = 'none';
            }
        });
    }

    // Clear the input box
    inputBox.value = '';
}

// Save a note to local storage
function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Remove a note from local storage
function removeNoteFromLocalStorage(id) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from local storage
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        count = Math.max(count, note.id);
        let p = document.createElement('p');
        p.classList.add("notes");

        // Create a bold label for the note number
        let noteLabel = document.createElement('strong');
        noteLabel.textContent = `Note ${note.id}: `;
        p.appendChild(noteLabel);

        // Truncate the note text if it's too long
        let displayNote = note.text.length >= 50 ? note.text.substring(0, 146) + "..." : note.text;
        let noteText = document.createElement('span');
        noteText.textContent = displayNote;
        p.appendChild(noteText);

        // Create the button container
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        // Create the delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = '\u00d7'; // Multiply symbol for delete

        // Create the view button
        let viewBtn = document.createElement('button');
        viewBtn.classList.add('view-btn');
        viewBtn.textContent = "View Detail";

        // Append buttons to the button container
        buttonContainer.appendChild(viewBtn);
        buttonContainer.appendChild(deleteBtn);
        // Append button container to the note element
        p.appendChild(buttonContainer);

        // Append note element to the notes container
        notesContainers.appendChild(p);

        // View button functionality
        viewBtn.addEventListener('click', () => {
            let detailContainer = document.createElement('div');
            detailContainer.classList.add('detail-container');

            // Create a bold label for the detail text
            let detailLabel = document.createElement('strong');
            detailLabel.textContent = "Detail: ";
            detailContainer.appendChild(detailLabel);

            // Create the detail text
            let detailText = document.createElement('p');
            detailText.classList.add('detail-text');
            detailText.textContent = note.text;
            detailContainer.appendChild(detailText);

            let backBtn = document.createElement('button');
            backBtn.classList.add('back-btn');
            backBtn.textContent = "Back";
            detailContainer.appendChild(backBtn);

            document.body.appendChild(detailContainer);

            // Hide the main container and notes
            document.querySelector('.container').style.display = 'none';
            notesContainers.style.display = 'none';

            // Back button functionality
            backBtn.addEventListener('click', () => {
                document.body.removeChild(detailContainer);
                document.querySelector('.container').style.display = 'block';
                notesContainers.style.display = 'block';
            });
        });

        // Delete button functionality
        deleteBtn.addEventListener('click', () => {
            notesContainers.removeChild(p);

            // Remove the note from local storage
            removeNoteFromLocalStorage(note.id);

            if (notesContainers.children.length === 0) {
                notesContainers.style.display = 'none';
            }
        });
    });
}

// Initially hide the notes container
notesContainers.style.display = 'none';

// Add event listener to the Add button
addBtn.addEventListener('click', addNotes);

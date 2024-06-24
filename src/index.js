import './style.css';
import { fetchNotes, addNote, deleteNote } from './api';

document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.getElementById('noteForm');
  const titleInput = document.getElementById('title');
  const bodyInput = document.getElementById('body');
  const notesList = document.getElementById('notesList');
  const loadingIndicator = document.getElementById('loading');
  const errorIndicator = document.getElementById('error');

  const showLoading = () => {
    loadingIndicator.style.display = 'block';
  };

  const hideLoading = () => {
    loadingIndicator.style.display = 'none';
  };

  const showError = (message) => {
    errorIndicator.textContent = message;
  };

  const clearError = () => {
    errorIndicator.textContent = '';
  };

  const loadNotes = async () => {
    showLoading();
    clearError();
    try {
      const notes = await fetchNotes();
      notesList.innerHTML = '';
      notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
          <h2>${note.title}</h2>
          <p>${note.body}</p>
          <button data-id="${note.id}">Delete</button>
        `;
        notesList.appendChild(noteElement);
      });
    } catch (error) {
      showError('Failed to load notes.');
    } finally {
      hideLoading();
    }
  };

  noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading();
    clearError();
    try {
      await addNote({
        title: titleInput.value,
        body: bodyInput.value,
      });
      titleInput.value = '';
      bodyInput.value = '';
      loadNotes();
    } catch (error) {
      showError('Failed to add note.');
    } finally {
      hideLoading();
    }
  });

  notesList.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON') {
      const noteId = e.target.getAttribute('data-id');
      showLoading();
      clearError();
      try {
        await deleteNote(noteId);
        loadNotes();
      } catch (error) {
        showError('Failed to delete note.');
      } finally {
        hideLoading();
      }
    }
  });

  loadNotes();
});

const API_URL = 'https://notes-api.dicoding.dev/v2';

export const fetchNotes = async () => {
  const response = await fetch(`${API_URL}/notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes.');
  }
  const data = await response.json();
  return data.data.notes;
};

export const addNote = async (note) => {
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Failed to add note.');
  }
};

export const deleteNote = async (noteId) => {
  const response = await fetch(`${API_URL}/notes/${noteId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete note.');
  }
};

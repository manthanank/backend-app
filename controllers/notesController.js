const {
  getNotes,
  createNote,
  getNote,
  deleteNote,
  updateNote,
} = require('../services/notion');

exports.getNotes = async (req, res) => {
  const notes = await getNotes();
  res.json(notes);
};

exports.createNote = (req, res) => {
  const { note } = req.body;
  createNote(note);
  res.json({ message: 'Note created' });
};

exports.getNote = async (req, res) => {
  const { id } = req.params;
  const note = await getNote(id);
  res.json(note);
};

exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { note } = req.body;
  updateNote(id, note);
  res.json({ message: 'Note updated' });
};

exports.deleteNote = (req, res) => {
  const { id } = req.params;
  deleteNote(id);
  res.json({ message: 'Note deleted' });
};

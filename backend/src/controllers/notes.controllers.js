import NoteModel from "../models/notes.models.js";

export const getNotes = async (_, res) => {
  try {
    const notes = await NoteModel.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Notes fetched successfully!", notes });
  } catch (error) {
    console.error("ERROR in notes controller!!", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export async function getNoteById(req, res) {
  try {
    const note = await NoteModel.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createNotes = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!(title || description)) {
      res.status(400).json({ message: "Please enter title and description" });
    }

    const noteCreate = await NoteModel.create({ title, description });

    res.status(201).json({ message: "Note created successfully", noteCreate });
  } catch (error) {
    console.error("ERROR in creating notes!!", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNotes = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updating = await NoteModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updating) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully", updating });
  } catch (error) {
    console.error("ERROR in updating notes!!", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNotes = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteNote = await NoteModel.findByIdAndDelete(id);
    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully", deleteNote });
  } catch (error) {
    console.error("ERROR in deleting notes!!", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

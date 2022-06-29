const base = "http://122.175.33.146:7070/api";
export const routes = {
  getChapters: `${base}/GetChapters`,
  registerUser: `${base}/RegisterUser`,
  createNote: `${base}/CreateNote`,
  getAllNotes: `${base}/GetAllNotes`,
  updateNote: `${base}/UpdateNote`,
  addBookmark: `${base}/Bookmark`,
  updatePayment: `${base}/UpdateUserPayment`,
};
export const headers = {
  "Content-Security-Policy": 1,
};

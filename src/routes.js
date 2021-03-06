const base = "https://tcqapp.theclearquran.org/api";
export const routes = {
    getChapters: `${base}/GetChapters`,
    registerUser: `${base}/RegisterUser`,
    updateUser: `${base}/ConfirmUser`,
    createNote: `${base}/CreateNote`,
    getAllNotes: `${base}/GetAllNotes`,
    updateNote: `${base}/UpdateNote`,
    addBookmark: `${base}/Bookmark`,
    contactUs: `${base}/AddContactUs`,
    getAboutUs: `${base}/GetAboutUs`
}
export const headers = {
  "Content-Security-Policy": 1,
};

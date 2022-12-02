const base = "https://appv2.theclearquran.org/api";
export const routes = {
    getChapters: `${base}/GetChapters`,
    registerUser: `${base}/RegisterUser`,
    updateUser: `${base}/ConfirmUser`,
    createNote: `${base}/CreateNote`,
    getAllNotes: `${base}/GetAllNotes`,
    updateNote: `${base}/UpdateNote`,
    addBookmark: `${base}/Bookmark`,
    contactUs: `${base}/AddContactUs`,
    getAboutUs: `${base}/GetAboutUs`,
    getQR: `${base}/getQr`,
    loginAfterQrVerify: `${base}/LoginWithQr`,
    externalAuth: `${base}/externalAuth`,
    confirmUsersPayment: `${base}/UpdateUserPayment`
}
export const headers = {
  "Content-Security-Policy": 1,
};

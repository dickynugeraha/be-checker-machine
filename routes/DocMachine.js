const router = require("express").Router();
const isAuth = require("../middleware/isAuth");
const DocMachine = require("../controllers/DocMachine");

// nambah document
router.post("/", isAuth, DocMachine.addNewDocument);

// dapetin semua document
router.get("/", isAuth, DocMachine.getAllDocument);

// all document by operator
router.get("/operator", isAuth, DocMachine.getDocumentOperator);

// hapus document
router.delete("/", isAuth, DocMachine.deleteDocument);

// lihat document by kode track
router.post("/document", DocMachine.getDocument);

// dapetin 1 data document buat diedit
router.post("/get-edit-document", isAuth, DocMachine.getEditDocument);

// update document
router.put("/update-document", isAuth, DocMachine.updateDocument);

// update status document
router.put("/status-checker", isAuth, DocMachine.updateStatus);

module.exports = router;

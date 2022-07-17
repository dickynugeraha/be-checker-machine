const DocMachine = require("../models/DocMachine");

exports.addNewDocument = async (req, res) => {
  const {
    document_number,
    date_check,
    applicant,
    alsin_code,
    alsin_name,
    brand,
    examiner,
    team,
    status,
  } = req.body;

  const document_file = req.file.filename;

  const fileUrl = `http://localhost:3002/uploads/${document_file}`;

  function makeRandString(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  try {
    const track_code = `MSN_${makeRandString(5)}_${new Date().getFullYear()}`;

    await DocMachine.create({
      document_number,
      track_code,
      date_check,
      applicant,
      alsin_code,
      alsin_name,
      brand,
      examiner,
      team,
      document_file: fileUrl,
      status,
    });

    res.status(200).json({
      message: "Successfully add new document checker",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllDocument = async (req, res) => {
  try {
    const documents = await DocMachine.find({}).sort({ date_check: "desc" });

    res.status(200).json({
      message: "Successfully get all documents",
      documents: documents,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteDocument = async (req, res) => {
  const { docId } = req.body;

  try {
    await DocMachine.deleteOne({ _id: docId });

    res.status(200).json({
      message: "Successfully deleted document!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getEditDocument = async (req, res) => {
  const { docId } = req.body;

  try {
    const document = await DocMachine.findOne({ _id: docId });

    res.status(200).json({
      message: "Successfully get document!",
      document: document,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateDocument = async (req, res) => {
  const {
    docId,
    document_number,
    date_check,
    applicant,
    alsin_code,
    alsin_name,
    brand,
    examiner,
    team,
    status,
  } = req.body;

  try {
    const document = await DocMachine.findOne({ _id: docId });

    let fileUrl;

    if (!req.file) {
      fileUrl = document.document_file;
    } else {
      const document_file = req.file.filename;
      fileUrl = `http://localhost:3002/uploads/${document_file}`;
    }

    document.document_number = document_number
      ? document_number
      : document.document_number;
    document.date_check = date_check ? date_check : document.date_check;
    document.applicant = applicant ? applicant : document.applicant;
    document.alsin_code = alsin_code ? alsin_code : document.alsin_code;
    document.alsin_name = alsin_name ? alsin_name : document.alsin_name;
    document.brand = brand ? brand : document.brand;
    document.examiner = examiner ? examiner : document.examiner;
    document.team = team ? team : document.team;
    document.status = status ? status : document.status;
    document.document_file = fileUrl;

    await document.save();

    res.status(200).json({
      message: "Successfully update document checker",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getDocument = async (req, res) => {
  const { track_code } = req.body;

  try {
    const document = await DocMachine.findOne({ track_code: track_code });

    res.status(200).json({
      message: "Successfully get the document",
      document: document,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getDocumentOperator = async (req, res) => {
  try {
    const documents = await DocMachine.find({ examiner: req.userId });

    res.status(200).json({
      message: "Succesfully fetch all documents!",
      documents: documents,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  const { status, docId } = req.body;

  try {
    const document = await DocMachine.findOne({ _id: docId });
    document.status = status;
    document.save();

    res.status(200).json({
      message: "Succesfully edit status documents!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

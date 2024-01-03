"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNote = exports.getNotes = void 0;
const note_1 = require("../models/note");
const http_errors_1 = __importDefault(require("http-errors"));
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield note_1.NoteModel.find().exec();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId } = req.params;
        if (!(0, note_1.idValidate)(noteId)) {
            throw (0, http_errors_1.default)(400, 'Invalid id');
        }
        const note = yield note_1.NoteModel.findById(noteId).exec();
        if (!note) {
            throw (0, http_errors_1.default)(404, 'Note not found');
        }
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.getNote = getNote;
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, text } = req.body;
        if (!title) {
            throw (0, http_errors_1.default)(400, 'Title is required');
        }
        const newNote = yield note_1.NoteModel.create({
            title,
            text,
        });
        res.status(201).json(newNote);
    }
    catch (error) {
        next(error);
    }
});
exports.createNote = createNote;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId } = req.params;
        const { title, text } = req.body;
        if (!title) {
            throw (0, http_errors_1.default)(400, 'Title is required');
        }
        if (!(0, note_1.idValidate)(noteId)) {
            throw (0, http_errors_1.default)(400, 'Invalid id');
        }
        const note = yield note_1.NoteModel.findById(noteId).exec();
        if (!note) {
            throw (0, http_errors_1.default)(404, 'Note not found');
        }
        note.title = title;
        note.text = text;
        const updatedNote = yield note.save();
        res.status(200).json(updatedNote);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteId } = req.params;
        if (!(0, note_1.idValidate)(noteId)) {
            throw (0, http_errors_1.default)(400, 'Invalid id');
        }
        const note = yield note_1.NoteModel.findById(noteId).exec();
        if (!note) {
            throw (0, http_errors_1.default)(404, 'Note not found');
        }
        yield note.deleteOne();
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;

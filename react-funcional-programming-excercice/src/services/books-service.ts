import { Book } from "../models/books";
import { api } from "./http";

async function getBookById(id: string, abortController: AbortController): Promise<Book> {
    return (await api.get<Book>(`/books/${id}`)).data
}

async function createBook(book: Book, abortController: AbortController): Promise<void> {
    await api.post("/books", book)
}

async function updateBook(book: Book, abortController: AbortController): Promise<void> {
    await api.put(`/books/${book.id}`, book);
}

async function listBooks(abortController: AbortController): Promise<Book[]> {
    return (await api.get("/books")).data;
}

async function deleteBooks(book: Book, abortController: AbortController): Promise<void> {
    await api.delete(`/books/${book.id}`);
}


export default {
    getBookById,
    createBook,
    updateBook,
    listBooks,
    deleteBooks
}
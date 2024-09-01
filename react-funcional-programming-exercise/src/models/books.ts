import { ValidationResult } from "./results/validation-result";

export type Book = {
    id: string;
    title: string;
    author: string;
    publishDate: number;
    genre: string[];
    numberOfPages: number;
}

export function IsBookValid(book: Book): ValidationResult {
    const result = new ValidationResult();
    if (!book.title) {
        result.addError("Title cannot be empty");
    }

    if (!book.author) {
        result.addError("Author cannot be empty");
    }

    if (!book.publishDate) {
        result.addError("Publish date cannot be empty");
    }

    if (!book.numberOfPages) {
        result.addError("Number of pages cannot be empty");
    }

    return result;
}
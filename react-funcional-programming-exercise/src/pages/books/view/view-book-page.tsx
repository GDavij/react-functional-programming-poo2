import { useEffect, useState } from "react";
import { Book } from "../../../models/books";
import { useNavigate, useParams } from "react-router-dom";
import { BookCard } from "../components/book-card/book-card";
import booksService from "../../../services/books-service";

export function ViewBookPage() {
  const { id } = useParams<{ id: string }>();
  const redirect = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!id) {
      redirect("/books");
    }

    loadBook(id!);
  }, [id, redirect]);

  const loadBook = (id: string) => {
    booksService.getBookById(id, new AbortController()).then(setBook);
  };

  return book ? (
    <BookCard
      book={book}
      canEdit={true}
      canDelete={true}
      canView={false}
      onDelete={() => redirect("/books")}
    />
  ) : (
    <h1> Loading ... </h1>
  );
}

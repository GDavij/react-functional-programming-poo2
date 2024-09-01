import { useEffect, useState } from "react";
import booksService from "../../../services/books-service";
import { BookCard } from "../components/book-card/book-card";
import { Book } from "../../../models/books";
import { Link } from "react-router-dom";
import { Button } from "../../../components/button/button";
import "./list-books-page.css";

export function ListBooksPage() {
  const [cancellationRequest, setCancellationRequest] =
    useState<AbortController>(new AbortController());

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    listBooks(cancellationRequest);

    return () => cancellationRequest.abort();
  }, []);

  const listBooks = (abortController: AbortController) => {
    let cancellation = cancellationRequest;
    if (cancellation.signal.aborted) {
      cancellation = new AbortController();
    }

    booksService.listBooks(abortController).then(setBooks);
    setCancellationRequest(cancellation);
  };

  return (
    <div className="centralizer">
      <section className="main-actions-bar">
        <Link to="/books/new">
          <Button>Create new</Button>
        </Link>
      </section>
      <section className="books-list">
        {books.length > 0 ? (
          books.map((b) => (
            <BookCard
              book={b}
              key={b.id}
              canEdit={true}
              canDelete={true}
              canView={true}
              onDelete={() => listBooks(cancellationRequest)}
            />
          ))
        ) : (
          <span>
            Could not found any books, create new one clicking on the "Create
            new" button
          </span>
        )}
      </section>
    </div>
  );
}

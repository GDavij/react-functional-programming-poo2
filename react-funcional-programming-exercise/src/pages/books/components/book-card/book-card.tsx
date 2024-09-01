import { useEffect, useState } from "react";
import { Button } from "../../../../components/button/button";
import { Book } from "../../../../models/books";
import booksService from "../../../../services/books-service";
import "./book-card.css";

type BookCardProps = {
  book: Book;
  canEdit?: boolean;
  canDelete?: boolean;
  canView?: boolean;
  onDelete: () => void;
};

export const BookCard = ({
  book,
  canEdit = false,
  canDelete = false,
  canView = false,
  onDelete = () => {},
}: BookCardProps) => {
  const [requestCancellation, setRequestCancellation] =
    useState<AbortController>(new AbortController());

  useEffect(() => {
    return () => requestCancellation.abort();
  });

  const handleBookDelete = () => {
    if (!confirm(`Are you sure you want to delete this book ${book.title}?`)) {
      alert("Book was not deleted");
      return;
    }

    if (requestCancellation.signal.aborted) {
      setRequestCancellation(new AbortController());
    }

    booksService.deleteBooks(book, requestCancellation).then(() => {
      alert(`Book ${book.title} was deleted with success`);
      onDelete();
    });
  };

  return (
    <div className="card-base">
      <section className="card-main-info">
        <h4>{book.title}</h4>
        <h5>
          {book.author} - {book.publishDate}
        </h5>
        <span>
          {book.genre
            ? book.genre.map((g) => (
                <span className="tag" key={book.id + g}>
                  {g}
                </span>
              ))
            : "No genres for this book"}
        </span>
        <section>
          This book is great and has a total of {book.numberOfPages} pages
        </section>
      </section>
      <section className="card-base--actions">
        {canEdit && <Button linkTo={`/books/${book.id}/edit`}> Edit </Button>}
        {canDelete && <Button onClick={handleBookDelete}> Delete </Button>}
        {canView && <Button linkTo={`/books/${book.id}`}> View </Button>}
      </section>
    </div>
  );
};

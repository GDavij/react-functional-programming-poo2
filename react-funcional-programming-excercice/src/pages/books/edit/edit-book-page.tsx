import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book, IsBookValid } from "../../../models/books";
import booksService from "../../../services/books-service";
import { FormInput } from "../../../components/form-input/form-input";
import { ListInput } from "../../../components/list-input/list-input";
import "./edit-book-page.css";
import { Button } from "../../../components/button/button";

export function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const redirect = useNavigate();

  const [book, setBook] = useState<Book | null>({} as Book);

  const submit = async (data: Book) => {
    if (id) {
      data.id = id;
      await booksService.updateBook(data, new AbortController());
      redirect("/books");
      return;
    }

    await booksService.createBook(data, new AbortController());
    redirect("/books");
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    const abortController = new AbortController();

    loadBook(id!, abortController);

    return () => abortController.abort();
  }, [id]);

  const loadBook = (id: string, abortController: AbortController) => {
    booksService.getBookById(id, abortController).then((v) => {
      console.log(v);
      setBook(v);
    });
  };

  function handleBookUpdate(
    key: keyof Book
  ): React.ChangeEventHandler<HTMLInputElement> {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setBook((book) => ({ ...book, [key]: event.target.value } as Book));
    };
  }

  const handleGenresListChange = (values: string[]) => {
    setBook((book) => ({ ...book, genre: values } as Book));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (book == null) {
      alert("Form is empty");
      return;
    }

    const validationResult = IsBookValid(book);
    if (validationResult.validated) {
      submit(book);
      return;
    }

    alert(validationResult.popError());
  };

  return (
    <div className="center-form">
      <form onSubmit={handleSubmit} className="form-limit">
        <div>
          <FormInput
            onChange={handleBookUpdate("title")}
            value={book?.title}
            name="title"
          />
        </div>
        <div>
          <FormInput
            type="text"
            onChange={handleBookUpdate("author")}
            value={book?.author}
            name="author"
          />
        </div>
        <div>
          <FormInput
            type="date"
            onChange={handleBookUpdate("publishDate")}
            value={book?.publishDate}
            name="publish date"
          />
        </div>
        <div>
          <ListInput
            id="genres"
            name="genres"
            onChange={handleGenresListChange}
            onlyUnique={true}
            value={book?.genre ?? []}
          />
        </div>
        <div>
          <FormInput
            type="number"
            onChange={handleBookUpdate("numberOfPages")}
            value={book?.numberOfPages}
            name="number of pages"
          />
        </div>

        <div>
          <Button>{id ? "Update" : "Create"}</Button>
        </div>
      </form>
    </div>
  );
}

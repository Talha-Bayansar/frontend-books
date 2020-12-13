import React, { useEffect, useState } from "react";
import "../App.css";

function Form(props) {
  const { addBook, setIsLoading, bookToEdit, setBooks, setMessage } = props;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [priceInEuro, setPriceInEuro] = useState(0);

  async function createBook(book) {
    setIsLoading(true);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(book),
    };
    try {
      const response = await fetch(
        process.env.REACT_APP_URL_SERVER,
        fetchOptions
      );
      const body = await response.json();
      if (response.ok) {
        console.log(
          `async createBook: received response ${JSON.stringify(body)}`
        );
        addBook(body);
        setMessage("Book added successfully.");
        console.log("createBook: done");
      } else {
        console.log(
          `async createBook: ERROR: ${response.status} - ${body.error} - ${body.message}`
        );
        const errorMessage =
          body.errors &&
          body.errors.reduce(
            (accumulator, error) =>
              `${accumulator} ${error.defaultMessage} ---`,
            "--- "
          );
        setMessage(errorMessage || body.message);
      }
    } catch (e) {
      console.log(e);
      setMessage("Connection error.");
    }

    setIsLoading(false);
  }

  async function editBook(book) {
    // book.title = title;
    // book.author = author;
    // book.priceInEuro = priceInEuro;

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: book.id,
        title: title,
        author: author,
        priceInEuro: priceInEuro,
      }),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/${book.id}`,
        fetchOptions
      );
      const body = await response.json();
      console.log(body);
      if (response.ok) {
        setMessage("Book edited successfully.");
        console.log("createBook: done");
        setBooks(body);
      } else {
        const errorMessage =
          body.errors &&
          body.errors.reduce(
            (accumulator, error) =>
              `${accumulator} ${error.defaultMessage} ---`,
            "--- "
          );
        setMessage(errorMessage || body.message);
      }
    } catch (e) {
      console.log(e);
      setMessage("Connection error.");
    }
  }

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setPriceInEuro(bookToEdit.priceInEuro);
    }
  }, [bookToEdit]);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      Title:
      <input
        className="form__input"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        pattern="(.|\s)*\S(.|\s)*"
      />
      Author:
      <input
        className="form__input"
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        pattern="^[a-zA-Z]+$"
      />
      Price:
      <input
        className="form__input"
        type="number"
        min={0}
        max={2000}
        value={priceInEuro}
        onChange={(e) => setPriceInEuro(parseInt(e.target.value))}
      />
      <button
        className="form__button"
        onClick={() =>
          createBook({
            title: title,
            author: author,
            priceInEuro: priceInEuro,
          })
        }
      >
        Bevestigen
      </button>
      <button
        className="form__button"
        onClick={
          bookToEdit !== null
            ? () => editBook(bookToEdit)
            : console.log("Deze boek bestaat niet.")
        }
      >
        Bewerken
      </button>
    </form>
  );
}

export default Form;

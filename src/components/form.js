import React, { useEffect, useState } from "react";
import "../App.css";

function Form(props) {
  const { addBook, setIsLoading, bookToEdit, setBooks, setMessage } = props;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [sells, setSells] = useState(0);

  async function createBook(book) {
    setIsLoading(true);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(book),
    };
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
      setMessage(`${body.message}`);
    }

    setIsLoading(false);
  }

  async function editBook(book) {
    bookToEdit.title = title;
    bookToEdit.author = author;
    bookToEdit.sells = sells;

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(book),
    };

    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/${book.id}`,
      fetchOptions
    );
    const body = await response.json();
    console.log(body);
    if (response.ok) {
      addBook(body);
      setMessage("Book added successfully.");
      console.log("createBook: done");
      setBooks(body);
    } else {
      setMessage(`${body.message}`);
    }
  }

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setSells(bookToEdit.sells);
    }
  }, [bookToEdit]);

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      Title:
      <input
        className="form__input"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      Author:
      <input
        className="form__input"
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
      />
      Sells:
      <input
        className="form__input"
        type="number"
        step={1000}
        value={sells}
        onChange={(e) => setSells(parseInt(e.target.value))}
      />
      <button
        className="form__button"
        onClick={() =>
          createBook({
            title: title,
            author: author,
            sells: sells,
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

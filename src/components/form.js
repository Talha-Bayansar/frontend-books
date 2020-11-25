import React, { useState } from "react";
import "../App.css";

function Form(props) {
  const { addBook, setIsLoading, bookToEdit, setBooks } = props;
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
    console.log(`async createBook: received response ${JSON.stringify(body)}`);
    addBook(body);
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
      process.env.REACT_APP_URL_SERVER,
      fetchOptions
    );
    const body = await response.json();
    setBooks(body);
  }

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      Title:
      <input
        className="form__input"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder={bookToEdit !== null ? bookToEdit.title : ""}
      />
      Author:
      <input
        className="form__input"
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        placeholder={bookToEdit !== null ? bookToEdit.author : ""}
      />
      Sells:
      <input
        className="form__input"
        type="number"
        step={1000}
        placeholder={bookToEdit !== null ? bookToEdit.sells : sells}
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

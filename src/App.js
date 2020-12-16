import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/form";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState(null);

  async function getBooks() {
    setIsLoading(true);
    try {
      const fetchOptions = {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_URL_SERVER}/books`,
        fetchOptions
      );
      const body = await response.json();
      setBooks(body);
    } catch (e) {
      console.log(e);
      setMessage("Connection error.");
    }
    setIsLoading(false);
  }

  async function authenticate(usernameForm, passwordForm) {
    const fetchOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: "Basic " + window.btoa("talha:talha"),
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_URL_SERVER}/authenticate`,
      fetchOptions
    );

    const body = await response.json();
    setUserName(body.username);
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  async function fetchWithCsrf(url, options) {
    const fetchOptions = {
      ...options,
      headers: {
        "X-XSRF-TOKEN": `${getCookie("XSRF-TOKEN")}`,
      },
    };

    return await fetch(url, fetchOptions);
  }

  useEffect(() => {
    authenticate();
  }, []);

  async function deleteBook(book) {
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    try {
      const response = await fetchWithCsrf(
        `${process.env.REACT_APP_URL_SERVER}/books/${book.id}`,
        fetchOptions
      );
      const body = await response.json();
      if (response.ok) {
        setMessage("Book deleted successfully.");
        setBooks(body);
      } else {
        setMessage(`${body.message}`);
      }
    } catch (e) {
      console.log(e);
      setMessage("Connection error.");
    }
  }

  return (
    <div className="App">
      <button onClick={() => getBooks()}>Refresh</button>
      {isLoading ? <p>LOADING DATA</p> : false}
      {userName && <span>logged in as {userName}</span>}
      <span>{message}</span>
      {books.map((b) => (
        <p
          className="book"
          onClick={() => setBookToEdit(b)}
          key={b.id}
          style={{
            backgroundColor: `${bookToEdit === b ? "grey" : "transparent"}`,
          }}
        >
          title: {b.title + " - "}
          author: {b.author + " - "}
          price: {b.priceInEuro}
          <button onClick={() => deleteBook(b)}>Delete</button>
        </p>
      ))}
      <Form
        bookToEdit={bookToEdit}
        setIsLoading={setIsLoading}
        addBook={(body) => setBooks([...books, body])}
        setBooks={setBooks}
        setMessage={setMessage}
      />
    </div>
  );
}

export default App;

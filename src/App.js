import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/form";
import Login from "./components/login";

function App() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bookToEdit, setBookToEdit] = useState(null);
    const [message, setMessage] = useState("");
    const [userName, setUserName] = useState(() =>
        localStorage.getItem("user")
    );
    const [csrfToken, setCsrfToken] = useState(() =>
        localStorage.getItem("csrfToken")
    );

    async function getBooks() {
        setIsLoading(true);
        try {
            const fetchOptions = {
                method: "GET",
            };
            const response = await fetchWithCsrf(
                `${process.env.REACT_APP_URL_SERVER}/books`,
                fetchOptions
            );
            console.log(response);
            if (response.ok) {
                const body = await response.json();
                setBooks(body);
            }
        } catch (e) {
            console.log(e);
            setMessage("Connection error.");
        }
        setIsLoading(false);
    }

    async function authenticate(usernameForm, passwordForm) {
        console.log(`username: ${usernameForm}\npassword: ${passwordForm}`);
        const fetchOptions = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "X-Requested-With": "XMLHttpRequest",
                authorization:
                    "Basic " + window.btoa(`${usernameForm}:${passwordForm}`),
            },
        };

        const response = await fetch(
            `${process.env.REACT_APP_URL_SERVER}/authenticate`,
            fetchOptions
        );
        console.log(response.headers.get("X-XSRF-TOKEN"));
        localStorage.setItem("csrfToken", response.headers.get("X-XSRF-TOKEN"));
        setCsrfToken(response.headers.get("X-XSRF-TOKEN") || csrfToken);
        if (response.ok) {
            const body = await response.json();
            console.log(body);
            localStorage.setItem("user", body.username);
            setUserName(body.username);
        } else {
            setMessage("Failed to login");
            console.log(response);
        }
    }

    useEffect(() => {
        console.log(csrfToken);
    }, [csrfToken]);

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
            method: options.method,
            credentials: "include",

            headers: csrfToken
                ? {
                      "Content-Type": "application/json;charset=utf-8",
                      "X-Requested-With": "XMLHttpRequest",
                      "X-XSRF-TOKEN": csrfToken,
                  }
                : {
                      "Content-Type": "application/json;charset=utf-8",
                      "X-Requested-With": "XMLHttpRequest",
                  },
            body: options.body,
        };
        return await fetch(url, fetchOptions);
    }

    async function logout() {
        const fetchOptions = {
            method: "POST",
        };
        const response = await fetchWithCsrf(
            `${process.env.REACT_APP_URL_SERVER}/logout`,
            fetchOptions
        );
        setUserName(null);
        localStorage.clear();
        console.log(response);
    }

    useEffect(() => {
        if (userName !== null) {
            getBooks();
        }
    }, [userName]);

    async function deleteBook(book) {
        const fetchOptions = {
            method: "DELETE",
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
            {userName ? (
                <div className=".book__form">
                    <button onClick={() => getBooks()}>Refresh</button>
                    <button className="logout" onClick={logout}>
                        Logout
                    </button>
                    <br />
                    {isLoading ? <p>LOADING DATA</p> : false}
                    <br />
                    {userName && <span>logged in as {userName}</span>}
                    <br />
                    <span>{message}</span>
                    {books.map((b) => (
                        <p
                            className="book"
                            onClick={() => setBookToEdit(b)}
                            key={b.id}
                            style={{
                                backgroundColor: `${
                                    bookToEdit === b ? "grey" : "transparent"
                                }`,
                            }}
                        >
                            title: {b.title + " - "}
                            author: {b.author + " - "}
                            price: {b.priceInEuro}
                            <button onClick={() => deleteBook(b)}>
                                Delete
                            </button>
                        </p>
                    ))}
                    <Form
                        bookToEdit={bookToEdit}
                        setIsLoading={setIsLoading}
                        addBook={(body) => setBooks([...books, body])}
                        setBooks={setBooks}
                        setMessage={setMessage}
                        fetchWithCsrf={fetchWithCsrf}
                    />
                </div>
            ) : (
                <Login authenticate={authenticate} />
            )}
        </div>
    );
}

export default App;

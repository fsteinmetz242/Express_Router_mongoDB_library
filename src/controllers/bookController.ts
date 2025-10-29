import { Book, User } from "#models";
import type { RequestHandler } from "express";
import type { Number } from "mongoose";
import mongoose from "mongoose";

function addDays(startdate: Date, days: number) {
  var result = new Date(startdate);
  result.setDate(result.getDate() + days);
  return result;
}

export const addBook: RequestHandler = async (req, res) => {
  const { isbn, title, author, price } = req.body;
  console.log("AddBook");
  const newBook = await Book.create({
    isbn: isbn,
    title: title,
    author: author,
    price: price,
  });
  return res.json({ message: "Book added successfully!" });
};

export const getAllBooks: RequestHandler = async (req, res) => {
  const allBooks = await Book.find();
  if (allBooks.length === 0) {
    return res.status(418).json({ message: "No books found!" });
  }
  return res.json(allBooks);
};

export const lendOutBook: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { lendingUser } = req.body;
  console.log("User: ", lendingUser);
  // Check UserId
  const checkUser = await User.findById(lendingUser);
  if (!checkUser) {
    return res.status(406).json({ message: "Unknown User!" });
  }

  const bookToDo = await Book.findById(id); // Das BuchObjekt das ausgeliehen werden soll
  //  const { lendOut } = bookToDo;
  if (!bookToDo) {
    return res.json({ message: "Book not found!" });
  }
  if (bookToDo["lendOut"] === true) {
    return res.json({ message: "Book is lend out" });
  }
  //  return res.json({ message: "Fini" });
  const startDate = new Date();
  const returnDate = addDays(startDate, 30);
  const lendBookOut = await Book.findByIdAndUpdate(id, {
    lendOut: true,
    lendDate: returnDate,
    lendOutRef: lendingUser,
  });
  //return res.json(bookToDo);
  return res.json({ message: "*** ToDo ***" });
};

export const returnBook: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const bookToDo = await Book.findById(id); // Das BuchObjekt das ausgeliehen werden soll
  if (!bookToDo) {
    return res.json({ message: "Book not found!" });
  }
  const returnBook = await Book.findByIdAndUpdate(id, {
    lendOut: false,
    lendDate: null,
  });
  return res.status(201).json(bookToDo);
};

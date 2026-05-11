export {};

interface Book {
  id: string | number; // Union Types
  title: string;
  author: string;
  isAvailable: boolean;
  publishedYear: number;
  category?: string; // Optional Properties
}

type Member = {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
};

const books: Book[] = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    isAvailable: false,
    publishedYear: 2005,
    category: "Fiksi",
  },
  {
    id: 2,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    isAvailable: true,
    publishedYear: 1980,
  },
  {
    id: "B-003",
    title: "Filosopi Teras",
    author: "Henry",
    isAvailable: false,
    publishedYear: 2009,
    category: "Self-Improvement",
  },
];

const members: Member[] = [
  {
    id: "B-001",
    name: "Roy Natanael Saing",
    email: "royroy@gmail.com",
    phone: "+6281234567891",
  },
  {
    id: 2,
    name: "Budi",
    email: "budi@gmail.com",
  },
];

const showBook = (book: Book): void => {
  console.log(`Judul: ${book.title}`);
  console.log(`Penulis: ${book.author}`);
  console.log(`Tahun Terbit: ${book.publishedYear}`);
  console.log(`Kategori: ${book.category}`);
  console.log(`Ketersediaan: ${book.isAvailable}`);
  console.log(`ID: ${book.id}`);
  console.log("\n");
};

const checkBookStatus = (book: Book): string => {
  if (book.isAvailable) {
    return `Buku "${book.title}" tersedia untuk dipinjam`;
  } else {
    return `Buku "${book.title}" sedang dipinjam`;
  }
};

showBook(books[2]);
console.log(checkBookStatus(books[0]));

import { useEffect, useState } from "react";
import { InputSearch } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TBodyCell,
  TBodyCellAction,
  THeadCell,
} from "../../components/ui/table";
import { AuthLayout } from "../../layouts/auth";
import { axios_api_init } from "../../lib/utils";
import Loading from "/src/assets/images/pyramid-19507.gif";

export const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios_api_init.get(`/api/books`, {
        method: "GET",
      });

      setBooks(res.data.data);
      setIsLoading(false);
    };

    fetchBooks();
  }, [isSearch]);

  return (
    <AuthLayout>
      <div className="flex flex-col relative">
        {isLoading && (
          <img
            src={Loading}
            alt="loading..."
            className="absolute w-100 top-28 left-90"
          />
        )}
        <div className="flex">
          <h1 className="font-semibold text-2xl">Books Page</h1>
          <InputSearch
            onChange={(e) => {
              setIsSearch(e.target.value);
            }}
            placeholder="Search Book . . ."
            className="ms-auto"
          />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <THeadCell>No.</THeadCell>
              <THeadCell>Id Buku</THeadCell>
              <THeadCell>Judul Buku</THeadCell>
              <THeadCell>Cover Buku</THeadCell>
              <THeadCell>Penulis</THeadCell>
              <THeadCell>Pengarang</THeadCell>
              <THeadCell>Tahun</THeadCell>
              <THeadCell className="border-none">Action</THeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, i) => (
              <TableRow key={i}>
                <TBodyCell>{i + 1}</TBodyCell>
                <TBodyCell>{book.id_buku}</TBodyCell>
                <TBodyCell>{book.judul_buku}</TBodyCell>
                <TBodyCell>
                  <img
                    src={`${book.r2_cover_buku_url}`}
                    alt="cover buku"
                    className="w-30 h-50 mx-auto"
                  />
                </TBodyCell>
                <TBodyCell>{book.penulis}</TBodyCell>
                <TBodyCell>{book.pengarang}</TBodyCell>
                <TBodyCell>{book.tahun}</TBodyCell>
                <TBodyCellAction />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthLayout>
  );
};

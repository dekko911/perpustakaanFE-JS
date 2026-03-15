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
import { axios_api_init, parseTimestampToDateOnly } from "../../lib/utils";
import Loading from "/src/assets/images/pyramid-19507.gif";

export const CirculationsPage = () => {
  const [circulations, setCirculations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState("");

  useEffect(() => {
    const fetchCirculations = async () => {
      const res = await axios_api_init.get(`/api/circulations`, {
        method: "GET",
      });

      setCirculations(res.data.data);
      setIsLoading(false);
    };

    fetchCirculations();
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
          <h1 className="font-semibold text-2xl">Circulations Page</h1>
          <InputSearch
            onChange={(e) => {
              setIsSearch(e.target.value);
            }}
            placeholder="Search Circulation . . ."
            className="ms-auto"
          />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <THeadCell>No.</THeadCell>
              <THeadCell>Id SKL</THeadCell>
              <THeadCell>Buku</THeadCell>
              <THeadCell>Peminjam</THeadCell>
              <THeadCell>Tanggal Pinjam</THeadCell>
              <THeadCell>Jatuh Tempo</THeadCell>
              <THeadCell>Denda</THeadCell>
              <THeadCell className="border-none">Action</THeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {circulations.map((circulation, i) => (
              <TableRow key={i}>
                <TBodyCell>{i + 1}</TBodyCell>
                <TBodyCell>{circulation.id_skl}</TBodyCell>
                <TBodyCell>{circulation.book?.judul_buku}</TBodyCell>
                <TBodyCell>{circulation.peminjam}</TBodyCell>
                <TBodyCell>
                  {parseTimestampToDateOnly(circulation.tanggal_pinjam)}
                </TBodyCell>
                <TBodyCell>
                  {parseTimestampToDateOnly(circulation.jatuh_tempo)}
                </TBodyCell>
                <TBodyCell>{circulation.denda}</TBodyCell>
                <TBodyCellAction />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthLayout>
  );
};

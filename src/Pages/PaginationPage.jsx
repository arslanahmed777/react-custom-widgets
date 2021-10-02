import React, { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import Paginate from "../utils/Paginate";
const Mymovies = [
  { id: 1, name: "Men in Black" },
  { id: 2, name: "Terminator" },
  { id: 3, name: "Godzilla" },
  { id: 4, name: "Superman" },
  { id: 5, name: "Hot fuzz" },
  { id: 6, name: "Men in Black" },
  { id: 7, name: "Terminator" },
  { id: 8, name: "Godzilla" },
  { id: 9, name: "Superman" },
  { id: 10, name: "Hot fuzz" },
  { id: 11, name: "Men in Black" },
  { id: 12, name: "Terminator" },
  { id: 13, name: "Godzilla" },
  { id: 14, name: "Superman" },
  { id: 15, name: "Hot fuzz" },
  { id: 16, name: "Men in Black" },
  { id: 17, name: "Terminator" },
  { id: 18, name: "Godzilla" },
  { id: 19, name: "Superman" },
];

const PaginationPage = (props) => {
  const [currentpage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [movies, setMovies] = useState(Mymovies);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const sss = Paginate(movies, currentpage, pageSize);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Movie Name</th>
          </tr>
        </thead>
        <tbody>
          {sss.map((movie) => {
            return (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        itemsCount={movies.length}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentpage}
      />
    </div>
  );
};

export default PaginationPage;

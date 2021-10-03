import React, { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import Paginate from "../utils/Paginate";
import Mymovies from "./MoviesData";

const PaginationPage = (props) => {
  const [currentpage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [movies, setMovies] = useState(Mymovies);

  const handlePageChange = (page) => {
    console.log(page);
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

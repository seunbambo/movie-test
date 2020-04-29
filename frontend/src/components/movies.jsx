import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/movieService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";
import Loading from "./common/loading";

class Movies extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      genres: [],
      totalPages: 0,
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",
      selectedYear: null,
      sortColumn: { path: "title", order: "asc" },
    };
  }

  async componentDidMount() {
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePaginationClick = (direction) => {
    let nextPage = this.state.currentPage;

    nextPage = direction === "next" ? nextPage + 1 : nextPage - 1;

    this.setState({ currentPage: nextPage });
  };

  handleYearSelect = (year) => {
    this.setState({ selectedYear: year, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedYear: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedYear,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedYear)
      filtered = allMovies.filter((m) => m.year === selectedYear);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0)
      return (
        <div className="row col-md-12">
          <div className="mx-auto my-auto">
            <Loading />
          </div>
        </div>
      );

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <ListGroup
            items={this.state.movies}
            selectedItem={this.state.selectedYear}
            onItemSelect={this.handleYearSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />

          <Pagination
            page={currentPage}
            pageSize={pageSize}
            totalCount={totalCount}
            currentPage={currentPage}
            handlePaginationClick={this.handlePaginationClick}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

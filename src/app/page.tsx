"use client";

import { Filter, IFilters } from "@/components/Filter";
import { MoviesGrid } from "@/components/MoviesGrid";
import { IPagination, Pagintaion } from "@/components/Pagination";
import { ANY, API_PAGE_SIZE, SORT_OPTIONS } from "@/constants";
import { headers } from "@/utils/fetchHeaders";
import { Orbitron } from "next/font/google";
import { useEffect, useState } from "react";

const orbitron = Orbitron({ subsets: ["latin"] });

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [pagination, setPagination] = useState<IPagination>({ page: 1, totalPages: 1, pageSize: 30 });
  const [filters, setFilters] = useState<IFilters>({
    filter: { rating: ANY },
    sort: { option: SORT_OPTIONS.POPULARITY, asc: false },
  });
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  let previousMonth = new Date().getMonth() - 1;
  let previousYear = new Date().getFullYear();

  if (previousMonth < 0) {
    previousMonth = 11;
    previousYear -= 1;
  }
  const minReleaseDate = new Date(previousYear, previousMonth, 1).toISOString().split("T")[0];

  const getMovies = async () => {
    setLoading(true);
    try {
      const _movies = [];
      const ub = pagination.page * pagination.pageSize; //record number to take until
      const lb = ub - pagination.pageSize + 1; //record number to take from
      const from = Math.ceil(lb / API_PAGE_SIZE); //api page to start from
      const to = Math.ceil(ub / API_PAGE_SIZE); //api page to end to
      const skip = lb - ((from - 1) * API_PAGE_SIZE + 1); //ignore records in from page
      const miss = to * API_PAGE_SIZE - ub; //ignore record in to page

      let _totalPages = 1; //total pages for given page size

      for (let ii = from; ii <= to; ii++) {
        const data = await fetchMovies(ii);

        const sliceFrom = ii == from ? skip : 0;
        const sliceTo = ii == to ? data.results.length - miss : data.results.length;

        _movies.push(...data.results.slice(sliceFrom, sliceTo));
        _totalPages = Math.ceil(data.total_results / pagination.pageSize);

        // Check if reached last page
        if (ii + 1 > data.total_pages) {
          ii = to + 1;
        }
      }

      setMovies(_movies);
      setPagination({ ...pagination, totalPages: Math.ceil(_totalPages) });
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async (_page: number) => {
    try {
      const data = await fetch(
        `${
          process.env.API_HOST
        }/discover/movie?with_release_type=2|3&primary_release_date.gte=${minReleaseDate}&primary_release_date.lte=${
          new Date().toISOString().split("T")[0]
        }&page=${_page}&sort_by=${filters.sort.option}.${filters.sort.asc ? "asc" : "desc"}${
          filters.sort.option == SORT_OPTIONS.RATINGS ? "&vote_count.gte=200" : ""
        }${filters.filter.genres ? `&with_genres=${filters.filter.genres.join(",")}` : ""}${
          filters.filter.rating != ANY ? `&vote_average.gte=${filters.filter.rating}` : ""
        }`,
        {
          method: "GET",
          headers: headers,
        }
      ).then(
        async (res) => {
          const resData = await res.json();
          return resData;
        },
        (err) => {
          console.log(err);
        }
      );
      return data;
    } catch (e: any) {
      console.log(e);
    }
  };

  const getGenres = async () => {
    try {
      const data = await fetch(`${process.env.API_HOST}/genre/movie/list`, {
        method: "GET",
        headers: headers,
      }).then(
        async (res) => {
          const resData = await res.json();
          setGenres(resData.genres);
        },
        (err) => {
          console.log(err);
        }
      );
      return data;
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    getMovies();
  }, [pagination.page, pagination.pageSize, filters]);

  return (
    <main className="flex min-h-screen flex-col gap-12 items-center justify-between p-24 text-white bg-black">
      <div className="w-full flex flex-col gap-12 items-center">
        <div className="w-full flex justify-between items-center">
          <h1
            className={`${orbitron.className} text-5xl [text-shadow:_0_0_5px_#fff,0_0_10px_#fff,0_0_15px_#F6C90E,0_0_20px_#F6C90E,0_0_25px_#F6C90E,0_0_30px_#F6C90E,0_0_35px_#F6C90E] animate-neon-glow`}
          >
            Popcorn Time
          </h1>
          <Filter genres={genres} filters={filters} setFilters={setFilters} />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : movies.length <= 0 ? (
          <div>No movies found :{"("}</div>
        ) : (
          <MoviesGrid movies={movies} />
        )}
      </div>
      {movies.length > 0 && <Pagintaion pagination={pagination} setPagination={setPagination} />}
    </main>
  );
}

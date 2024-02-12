"use client";

import Image from "next/image";
import { headers } from "@/utils/fetchHeaders";
import { Pagintaion } from "@/components/Pagination";
import { useEffect, useState } from "react";
import { API_PAGE_SIZE } from "@/constants";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, pageSize: 30 });
  const [loading, setLoading] = useState(false);

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
      const data = await fetch(`${process.env.API_HOST}/discover/movie?sort_by=popularity.desc&page=${_page}`, {
        method: "GET",
        headers: headers,
      }).then(
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

  useEffect(() => {
    getMovies();
  }, [pagination.page, pagination.pageSize]);

  return (
    <main className="flex min-h-screen flex-col gap-5 items-center justify-between p-24 text-white bg-black">
      <h1 className="text-3xl">Popcorn Time</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {movies?.map((m: any) => (
          <div key={m.id} className="flex flex-col gap-2">
            <div className="relative cursor-pointer">
              <Image
                className="w-full"
                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                width="100"
                height="200"
                alt={m.original_title}
              />
              <div className="w-full h-full absolute top-0 left-0 bg-black opacity-0 duration-300 hover:opacity-75">
                <div className="relative w-full h-full flex justify-center items-center">See More</div>
              </div>
            </div>
            {m.title}
          </div>
        ))}
      </div>
      <Pagintaion pagination={pagination} setPagination={setPagination} />
    </main>
  );
}

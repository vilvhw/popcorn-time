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
      let total = 0; //total records retrieved
      let _page = pagination.page; //api page
      let _totalPages = 1; //total pages for given page size
      let _maxPage = false; //flag if reached last page

      while (total < pagination.pageSize && !_maxPage) {
        const data = await fetchMovies(_page);

        total += data.results?.length ?? 0;
        _totalPages = data.total_results / pagination.pageSize;

        if (total > pagination.pageSize) {
          const remain = data.results.length - (total - pagination.pageSize);
          _movies.push(...data.results.slice(0, remain));
        } else {
          _movies.push(...data.results);
        }

        // Check if reached last page
        if (_page >= data.total_pages) {
          _maxPage = true;
        }
        _page++;
      }

      console.log(_movies);
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
  }, []);

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
      <Pagintaion page={pagination.page} totalPages={pagination.totalPages} />
    </main>
  );
}

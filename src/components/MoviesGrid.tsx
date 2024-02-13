"use client";

import React, { useEffect, useState } from "react";
import { ImageWithFallback } from "@/utils/ImageWithFallback";
import { Modal } from "./Modal";
import { headers } from "@/utils/fetchHeaders";

interface IMoviesProps {
  movies: any[];
}

export const MoviesGrid = ({ movies }: IMoviesProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);

  const getCast = async () => {
    try {
      const data = await fetch(`${process.env.API_HOST}/movie/${movie.id}/credits`, {
        method: "GET",
        headers: headers,
      }).then(
        async (res) => {
          const resData = await res.json();
          setCast(resData.cast);
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
    if (movie) {
      getCast();
    }
  }, [movie]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {movies?.map((m: any) => (
          <div key={m.id} className="flex flex-col gap-2">
            <div className="relative cursor-pointer">
              <ImageWithFallback
                className="w-full aspect-[2/3]"
                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                width="100"
                height="200"
                alt={m.original_title}
              />
              <div
                className="w-full h-full absolute top-0 left-0 bg-black opacity-0 duration-300 hover:opacity-75"
                onClick={() => {
                  setMovie(m);
                  setOpenModal(true);
                }}
              >
                <div className="relative w-full h-full flex justify-center items-center">See More</div>
              </div>
            </div>
            {m.title}
          </div>
        ))}
      </div>
      {openModal && (
        <Modal toggleModalOpen={() => setOpenModal(!openModal)}>
          <div className="flex flex-col gap-2 text-left">
            <div className="flex flex-row gap-5">
              <ImageWithFallback
                className="w-auto h-[50vh] aspect-[2/3]"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                width="400"
                height="600"
                alt={movie.original_title}
              />
              <div className="w-full grid grid-cols-[max-content_auto] auto-rows-max gap-2">
                <span className="col-span-2 text-xl font-bold underline">{movie.title}</span>
                <span className="font-bold">Released</span>
                <span className="">{movie.release_date}</span>
                <span className="font-bold">Ratings</span>
                <span className="">{movie.vote_average}</span>
                <span className="font-bold">Cast</span>
                <span className="">
                  {cast
                    .slice(0, Math.min(cast.length, 10))
                    .map((c) => `${c.name} (${c.character})`)
                    .join(", ")}
                  {cast.length > 10 ? ", ..." : ""}
                </span>
              </div>
            </div>
            <span>{movie.overview}</span>
          </div>
        </Modal>
      )}
    </>
  );
};

"use client";

import { ANY, SORT_OPTIONS } from "@/constants";
import { ArrowUpDown, FilterIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface IFilters {
  sort: {
    option: SORT_OPTIONS;
    asc: boolean;
  };
  filter: {
    genres?: number[];
    rating: string;
  };
}

interface IFilterProps {
  filters: IFilters;
  setFilters(f: IFilters): any;
  genres: any[];
}
export const Filter = ({ genres, filters, setFilters }: IFilterProps) => {
  const { sort, filter } = filters;
  const [filterDD, setFilterDD] = useState(false);
  const [sortDD, setSortDD] = useState(false);
  const [filterData, setFilterData] = useState(filter);
  const filterDdRef = useRef(null);
  const sortDdRef = useRef(null);
  const ratings = [ANY, "3", "6", "9"];
  const ddClass =
    "mt-2 absolute left-6 items-center bg-neutral-900 rounded-md shadow-md ease-in-out duration-300 -translate-x-full overflow-hidden z-10";

  const onGenreChange = (id: number) => {
    let _genres = filterData.genres ?? [];

    if (_genres?.find((g) => g == id)) {
      _genres = _genres.filter((g) => g != id);
    } else {
      _genres?.push(id);
    }

    setFilterData({ ...filterData, genres: _genres });
  };

  const onFilterUpdate = () => {
    setFilters({ ...filters, filter: filterData });
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (filterDdRef.current && !(filterDdRef.current as any).contains(event.target)) {
        setFilterDD(false);
      }

      if (sortDdRef.current && !(sortDdRef.current as any).contains(event.target)) {
        setSortDD(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row gap-5">
      <div ref={filterDdRef}>
        <div
          className="w-4 cursor-pointer"
          title={"Filter"}
          onClick={() => {
            setFilterDD(!filterDD);
            setSortDD(false);
          }}
        >
          <FilterIcon className="w-6 h-6" />
        </div>
        <div className={`relative`}>
          <div
            className={`${ddClass} ${
              filterDD ? `w-max-content h-max-content px-5 py-4 flex flex-col gap-2` : "w-0 h-0"
            }`}
          >
            <div className={`w-full font-bold capitalize`}>Filter By</div>
            <div className="grid grid-cols-[max-content_auto] gap-5">
              <span className=" font-bold capitalize">Genres</span>
              <div className="grid grid-cols-[max-content_auto_max-content_auto_max-content_auto] gap-2 whitespace-nowrap">
                {genres.map((g) => (
                  <React.Fragment key={g.id}>
                    <input
                      id={g.id}
                      type="checkbox"
                      checked={filterData.genres?.find((x) => x == g.id) ? true : false}
                      onChange={() => onGenreChange(g.id)}
                      className="accent-yellow-400 text-white cursor-pointer"
                    />
                    <label htmlFor={g.id} className="cursor-pointer">
                      {g.name}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="w-full grid grid-cols-[max-content_auto] gap-5">
              <span className="font-bold capitalize">Ratings</span>
              <div className="grid grid-cols-[max-content_auto_max-content_auto_max-content_auto_max-content_auto] gap-2 whitespace-nowrap">
                {ratings.map((r, idx) => (
                  <React.Fragment key={idx}>
                    <input
                      id={`rating-${r}`}
                      name="rating"
                      type="radio"
                      checked={filterData.rating == r}
                      onChange={() => setFilterData({ ...filterData, rating: r })}
                      className="accent-yellow-400 cursor-pointer"
                    />
                    <label htmlFor={`rating-${r}`} className="cursor-pointer">
                      {idx != 0 ? `>${r}` : r}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <button
              className="px-4 py-2 self-end text-sm bg-yellow-500 rounded-xl hover:bg-yellow-400 disabled:bg-stone-500"
              disabled={filter == filterData}
              onClick={onFilterUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <div ref={sortDdRef}>
        <div
          className="w-4 cursor-pointer"
          title={"Sort"}
          onClick={() => {
            setSortDD(!sortDD);
            setFilterDD(false);
          }}
        >
          <ArrowUpDown className="w-6 h-6" />
        </div>
        <div className={`relative capitalize`}>
          <div className={`${ddClass} ${sortDD ? `w-max-content h-max-content` : "w-0 h-0"}`}>
            <div className={`px-3 py-2 font-bold cursor-default`}>Sort By</div>
            {Object.values(SORT_OPTIONS).map((s) => (
              <div
                key={s}
                className={`grid grid-cols-[200px_auto] px-3 py-2 h-[50px] items-center whitespace-nowrap cursor-pointer border-box hover:bg-neutral-700 [&>svg:w-2]`}
                onClick={() => {
                  sort.option == s
                    ? setFilters({ ...filters, sort: { ...sort, asc: !sort.asc } })
                    : setFilters({ ...filters, sort: { ...sort, option: s, asc: s == SORT_OPTIONS.TITLE } });
                  setSortDD(false);
                }}
              >
                {s.replaceAll("_", " ")}
                {sort.option == s && sort.asc ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <title>Ascending</title>
                    <path
                      fillRule="evenodd"
                      d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : sort.option == s && !sort.asc ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <title>Descending</title>
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

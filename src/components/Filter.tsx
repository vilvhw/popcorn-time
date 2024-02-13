"use client";

import { SORT_OPTIONS } from "@/constants";
import { useEffect, useRef, useState } from "react";

export interface IFilters {
  sort: {
    option: SORT_OPTIONS;
    asc: boolean;
  };
}

interface IFilterProps {
  filters: IFilters;
  setFilters(f: any): any;
}
export const Filter = ({ filters, setFilters }: IFilterProps) => {
  const { sort } = filters;
  const [sortDD, setSortDD] = useState(false);
  const sortDdRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
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
    <div>
      <div ref={sortDdRef} className="w-4 cursor-pointer" title={"Sort"} onClick={() => setSortDD(!sortDD)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className={`relative text-black font-bold capitalize`}>
        <div
          className={`mt-2 absolute left-6 w-max-content items-center bg-slate-100 rounded shadow-md ease-in-out duration-100 -translate-x-full overflow-hidden z-10 ${
            sortDD ? `h-[${Object.keys(SORT_OPTIONS).length * 50}px]` : "h-0"
          }`}
        >
          <div className={`px-3 py-2 cursor-default`}>Sort By</div>
          {Object.values(SORT_OPTIONS).map((s) => (
            <div
              key={s}
              className={`grid grid-cols-[200px_auto] px-3 py-2 h-[50px] items-center whitespace-nowrap cursor-pointer border-box hover:bg-slate-300 [&>svg:w-2]`}
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
  );
};

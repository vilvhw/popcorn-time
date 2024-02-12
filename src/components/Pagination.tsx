"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface IPagination {
  page: number;
  totalPages: number;
  pageSize: number;
}
interface IPaginationProps {
  pagination: IPagination;
  setPagination(p: any): any;
}
export const Pagintaion = ({ pagination, setPagination }: IPaginationProps) => {
  const { page, totalPages } = pagination;
  const maxPages = 9;
  const [pagesArr, setPagesArr] = useState<number[]>([]);
  const chevronClass = "cursor-pointer";
  const chevronClassDisabled = "opacity-50 cursor-default";

  const onPageClick = (page: number) => setPagination({ ...pagination, page });

  const hasNextPage = () => page + 1 <= totalPages;
  const hasPrevPage = () => page - 1 >= 1;

  const nextPage = () => setPagination({ ...pagination, page: Math.min(page + 1, totalPages) });
  const prevPage = () => setPagination({ ...pagination, page: Math.min(page - 1, 1) });

  useEffect(() => {
    const mid = Math.ceil(maxPages / 2);
    const max = page + (mid - 1) <= maxPages ? maxPages : page + mid > totalPages ? totalPages : page + mid - 1;
    const min = page <= mid ? 1 : max == totalPages ? Math.max(1, page - mid) : page - mid + 1;
    const newArr = [];

    for (let ii = min; ii <= max; ii++) {
      newArr.push(ii);
    }

    setPagesArr(newArr);
  }, [page, totalPages]);

  return (
    <div className="flex flex-row gap-2">
      <ChevronLeft className={`${chevronClass} ${hasPrevPage() ? "" : chevronClassDisabled}`} onClick={prevPage} />
      {pagesArr.length > 0 && pagesArr[0] != 1 && <div>...</div>}
      {pagesArr.map((p) => (
        <div
          key={p}
          className={`${page == p ? "underline" : ""} cursor-pointer hover:underline`}
          onClick={() => onPageClick(p)}
        >
          {p}
        </div>
      ))}
      {pagesArr[pagesArr.length] != totalPages && <div>...</div>}
      <ChevronRight className={`${chevronClass} ${hasNextPage() ? "" : chevronClassDisabled}`} onClick={nextPage} />
    </div>
  );
};

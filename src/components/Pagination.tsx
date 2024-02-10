"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface IPagination {
  page: number;
  totalPages: number;
}
export const Pagintaion = ({ page, totalPages }: IPagination) => {
  const maxPages = 10;
  const pagesArr = new Array(totalPages > 0 ? (totalPages > maxPages ? maxPages - 1 : totalPages) : 1).fill(0);
  const chevronClass = "cursor-pointer";

  return (
    <div className="flex flex-row gap-2">
      <ChevronLeft className={chevronClass} />
      {pagesArr.map((p, idx) => (
        <div key={idx} className={`${page == idx + 1 ? "underline" : ""} cursor-pointer hover:underline`}>
          {idx + 1}
        </div>
      ))}
      {}
      <ChevronRight className={chevronClass} />
    </div>
  );
};

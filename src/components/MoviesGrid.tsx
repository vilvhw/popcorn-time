import { ImageWithFallback } from "@/utils/ImageWithFallback";

interface IMoviesProps {
  movies: any[];
}

export const MoviesGrid = ({ movies }: IMoviesProps) => {
  return (
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
            <div className="w-full h-full absolute top-0 left-0 bg-black opacity-0 duration-300 hover:opacity-75">
              <div className="relative w-full h-full flex justify-center items-center">See More</div>
            </div>
          </div>
          {m.title}
        </div>
      ))}
    </div>
  );
};

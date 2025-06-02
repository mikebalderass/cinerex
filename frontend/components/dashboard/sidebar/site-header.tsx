"use client";

import { CreateMovieModal } from "@/components/admin/create-movie";
import { CreateShowtimeModal } from "@/components/admin/create-showtime";
import { CreateTheaterModal } from "@/components/admin/create-theater";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useFunctions } from "@/hooks/use-functions";
import { useMovies } from "@/hooks/use-movies";
import { useTheaters } from "@/hooks/use-theaters";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const nav = [
  {
    title: "Panel",
    url: "/dashboard",
  },
  {
    title: "Películas",
    url: "/dashboard/movies",
  },
  {
    title: "Funciones",
    url: "/dashboard/functions",
  },
  {
    title: "Salas",
    url: "/dashboard/theaters",
  },
  {
    title: "Boletos",
    url: "/dashboard/tickets",
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { movies, getMovies } = useMovies();
  const { getFunctions } = useFunctions();
  const { theaters, getTheaters } = useTheaters();

  const title = nav.find((item) => item.url === pathname)?.title || "Panel";

  const handleMovieAction = (message: string) => {
    getMovies();
    toast.success(message);
  };

  const handleShowtimeAction = (message: string) => {
    getFunctions();
    toast.success(message);
  };

  const handleTheaterAction = (message: string) => {
    getTheaters();
    toast.success(message);
  };

  const getAddButton = (title: string) => {
    switch (title) {
      case "Películas":
        return <CreateMovieModal onMovieCreated={handleMovieAction} />;
      case "Funciones":
        return (
          <CreateShowtimeModal
            onShowtimeCreated={handleShowtimeAction}
            movies={movies}
            theaters={theaters}
          />
        );
      case "Salas":
        return <CreateTheaterModal onTheaterCreated={handleTheaterAction} />;
      case "Boletos":
        return "Agregar Boleto";
      default:
        return null;
    }
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          {getAddButton(title)}
        </div>
      </div>
    </header>
  );
}

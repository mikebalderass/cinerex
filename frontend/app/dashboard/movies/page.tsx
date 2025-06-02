"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMovies } from "@/hooks/use-movies";
import { UpdateMovieModal } from "@/components/admin/update-movie";
import { DeleteMovieModal } from "@/components/admin/delete-movie";
import { toast } from "sonner";
import { Eye } from "lucide-react";

export default function MoviesPage() {
  const { movies, getMovies } = useMovies();

  const handleMovieAction = (message: string) => {
    getMovies();
    toast.success(message);
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titulo</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Duración</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.movieId}>
              <TableCell className="font-medium">{movie.title}</TableCell>
              <TableCell>
                <Badge variant="outline">{movie.rating}</Badge>
              </TableCell>
              <TableCell>{formatDuration(movie.duration)}</TableCell>
              <TableCell>
                <Badge variant="default">Activo</Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <UpdateMovieModal
                    onMovieUpdate={handleMovieAction}
                    movieId={movie.movieId}
                  />
                  <DeleteMovieModal movieId={movie.movieId} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

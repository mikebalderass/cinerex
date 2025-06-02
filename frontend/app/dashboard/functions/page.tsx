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
import { useFunctions } from "@/hooks/use-functions";
import { Eye, Trash2 } from "lucide-react";
import { UpdateShowtimeModal } from "@/components/admin/update-showtime";
import { useMovies } from "@/hooks/use-movies";
import { useTheaters } from "@/hooks/use-theaters";
import { toast } from "sonner";
import { SeatType } from "@/lib/types";

export default function FunctionsPage() {
  const { functions, loading: functionsLoading, getFunctions } = useFunctions();
  const { movies, loading: moviesLoading } = useMovies();
  const { theaters, loading: theatersLoading } = useTheaters();

  const formatDateTime = (datetime: string): string => {
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleShowtimeAction = (message: string) => {
    getFunctions();
    toast.success(message);
  };

  const getAvailableSeats = (seats: SeatType[]) => {
    const availableSeats = seats.filter(seat => seat.status === "AVAILABLE");
    return availableSeats.length;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Película</TableHead>
              <TableHead>Sala</TableHead>
              <TableHead>Asientos disponibles</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {functions.map((func) => (
              <TableRow key={func.functionId}>
                <TableCell className="font-medium">
                  {func.movie?.title}
                </TableCell>
                <TableCell>Sala {func.theater?.theaterNumber}</TableCell>
                <TableCell>
                  {getAvailableSeats(func.seats || [])} disponibles
                </TableCell>
                <TableCell>{formatDateTime(func.datetime)}</TableCell>
                <TableCell>
                  <Badge variant="default">Horario</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <UpdateShowtimeModal
                      showtimeId={func.functionId}
                      movies={movies}
                      theaters={theaters}
                      onShowtimeUpdated={handleShowtimeAction}
                    />
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}

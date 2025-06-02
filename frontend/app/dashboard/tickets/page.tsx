"use client";

import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheaters } from "@/hooks/use-theaters";
import { useFunctions } from "@/hooks/use-functions";
import { useMovies } from "@/hooks/use-movies";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { UpdateTicketModal } from "@/components/admin/update-ticket";
import { useTickets } from "@/hooks/use-tickets";
import { toast } from "sonner";

export default function TicketsPage() {
  const { tickets, getTickets } = useTickets();
  const { movies } = useMovies();
  const { functions } = useFunctions();
  const { theaters } = useTheaters();

  const handleTicketAction = (message: string) => {
    getTickets();
    toast.success(message);
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Movie</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.ticketId}>
              <TableCell className="font-mono text-sm">
                {ticket.ticketId}
              </TableCell>
              <TableCell className="font-medium">{ticket.userName}</TableCell>
              <TableCell>{ticket.function?.movie?.title}</TableCell>
              <TableCell>
                {ticket.seats
                  .map((seat) => `${seat.row_letter}${seat.seat_number}`)
                  .join(", ")}
              </TableCell>
              <TableCell>{formatDateTime(ticket.purchaseDate)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <UpdateTicketModal
                    ticketId={ticket.ticketId}
                    movies={movies}
                    functions={functions}
                    theaters={theaters}
                    onUpdated={handleTicketAction}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

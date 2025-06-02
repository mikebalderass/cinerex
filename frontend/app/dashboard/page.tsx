"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Film, Calendar, Ticket, DollarSign, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useMovies } from "@/hooks/use-movies";
import { useTheaters } from "@/hooks/use-theaters";
import { useTickets } from "@/hooks/use-tickets";
import { useFunctions } from "@/hooks/use-functions";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const { movies, loading: moviesLoading, getMovies } = useMovies();
  const { theaters, loading: theatersLoading, getTheaters } = useTheaters();
  const { tickets, loading: ticketsLoading, getTickets } = useTickets();
  const { functions, loading: functionsLoading, getFunctions } = useFunctions();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role[0] !== "Admin") {
      router.push("/unauthorized");
      return;
    }
  }, [user, isLoading, router]);

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

  const getMovieTitle = (movieId: string): string => {
    return movies.find((m) => m.movieId === movieId)?.title || "Unknown Movie";
  };

  const handleLogout = () => {
    logout();
  };

  // Calculate statistics
  const totalRevenue = tickets.length * 12.0; // Assuming $12 per ticket
  const totalTicketsSold = tickets.reduce(
    (sum, ticket) => sum + ticket.seats.length,
    0
  );
  const totalMovies = movies.length;
  const totalShowtimes = functions.length;

  if (
    isLoading ||
    moviesLoading ||
    theatersLoading ||
    ticketsLoading ||
    functionsLoading
  ) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ventas Totales
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% más que el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Boletos Vendidos
              </CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTicketsSold}</div>
              <p className="text-xs text-muted-foreground">
                +8% más que la semana pasada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Películas en Cartelera
              </CardTitle>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMovies}</div>
              <p className="text-xs text-muted-foreground">
                2 nuevas películas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Funciones</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalShowtimes}</div>
              <p className="text-xs text-muted-foreground">Horario</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Boletos recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.slice(0, 5).map((ticket) => (
                  <div
                    key={ticket.ticketId}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{ticket.userName}</p>
                      <p className="text-sm text-muted-foreground">
                        {getMovieTitle(
                          functions.find(
                            (f) => f.functionId === ticket.functionId
                          )?.movieId || ""
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{ticket.seats.length} seats</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDateTime(ticket.purchaseDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Funciones de hoy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {functions.slice(0, 5).map((func) => (
                  <div
                    key={func.functionId}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {getMovieTitle(func.movieId)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {func.theater?.theaterNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatDateTime(func.datetime)}
                      </p>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

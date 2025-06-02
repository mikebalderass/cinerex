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
import { useFunctions } from "@/hooks/use-functions";
import { useTheaters } from "@/hooks/use-theaters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { UpdateTheaterModal } from "@/components/admin/update-theater";
import { toast } from "sonner";

export default function TheatersPage() {
  const { theaters, getTheaters } = useTheaters();
  const { functions, getFunctions } = useFunctions();

  const handleTheaterAction = (message: string) => {
    getTheaters();
    toast.success(message);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Funciones</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {theaters.map((theater) => {
            const theaterShows = functions.filter(
              (f) => f.theaterId === theater.theaterId
            ).length;
            return (
              <TableRow key={theater.theaterId}>
                <TableCell className="font-medium">
                  {theater.theaterNumber}
                </TableCell>
                <TableCell>100 asientos</TableCell>
                <TableCell>{theaterShows} funciones</TableCell>
                <TableCell>
                  <Badge variant="default">Activo</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <UpdateTheaterModal
                      theaterId={theater.theaterId}
                      onTheaterUpdated={handleTheaterAction}
                    />
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

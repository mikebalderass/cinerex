export type MovieType = {
    movieId: string;
    title: string;
    description: string;
    duration: number;
    rating: string;
    poster?: string | null;
    functions?: FunctionType[];
}


export type FunctionType = {
    functionId: string;
    movieId: string;
    movie?: MovieType;
    theaterId: string;
    theater?: TheaterType;
    datetime: string;
    seats?: SeatType[];
    tickets?: TicketType[];
}


export type SeatType = {
    seatId: string;
    functionId: string;
    row_letter: string;
    seat_number: number;
    status: "AVAILABLE" | "SOLD";
}

export type TicketType = {
    ticketId: string;
    functionId: string;
    function?: FunctionType;
    userName: string;
    purchaseDate: string;
    seats: { row_letter: string; seat_number: number }[];
}

export type TheaterType = {
    theaterId: string;
    theaterNumber: string;
    functions?: FunctionType[];
}

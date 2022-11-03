export interface Movie {
  id: number;
  title: string;
  description: string;
  isMovie: boolean;
  movieImage: string;
  trailer: string;
  year: Year;
  genres: [Genre];
  movieUrl: string;
}

export interface List {
  id: number;
  title: string;
  types: string;
  movies?: Movie[];
}

export interface Genre {
  id: number;
  genre: string;
}

export interface Year {
  id: number;
  year?: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
}

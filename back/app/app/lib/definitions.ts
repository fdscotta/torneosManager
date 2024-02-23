export type User = {
  id: string,
  name: string,
  email: string,
  password: string,
};

export type Tournaments = {
    id: string,
    name: string,
    image: string,
    status: number,
    date: string,
};

export type Couple = {
  id: string,
  player1: string,
  player2: string,
  tournament_id: string,
  group_id: string
}

export type TournamentGroup = {
  id: string,
  group_id: string,
  couple_id: string,
}

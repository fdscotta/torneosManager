export type User = {
  id: string,
  name: string,
  email: string,
  password: string
};

export type Tournaments = {
  id: string,
  name: string,
  image: string,
  status: number,
  date: string
};

export type Couple = {
  id: string,
  player1: string,
  player2: string,
  tournament_id: string,
  group_id: string
};

export type TournamentGroup = {
  id: string,
  group_id: string,
  couple_id: string
};

export type GroupResult = {
  id: string,
  group_id: string,
  couple1_id: string,
  couple2_id: string,
  winner: string,
  set_1_c1: string,
  set_2_c1: string,
  set_3_c1: string,
  set_1_c2: string,
  set_2_c2: string,
  set_3_c2: string,
  match_date: string
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Tournaments = {
  id: string;
  name: string;
  image: string;
  status: number;
  date: string;
  type: string;
  param_q_per_group: string;
  param_draw_set: boolean;
};

export type Couple = {
  id: string;
  player1: string;
  player2: string;
  tournament_id: string;
  group_id: string;
  couple_pic: string;
};

export type TournamentGroup = {
  id: string;
  group_id: string;
  couple_id: string;
};

export type GroupResult = {
  id: string;
  group_id: string;
  couple1_id: string;
  couple2_id: string;
  winner: string;
  set_1_c1: string;
  set_2_c1: string;
  set_3_c1: string;
  set_1_c2: string;
  set_2_c2: string;
  set_3_c2: string;
  match_date: string;
  rel_to: string;
  rel_from_1: string;
  rel_from_2: string;
  tournament_id: string;
};

export type GroupResultsTable = {
  id: string;
  couple_id: string;
  couple_names: string;
  group_id: string;
  couple: string;
  sets_total: string;
  total_games: string;
  games_positive: string;
  wins: string;
  tournament_id: string;
};

export type CouplesSelect = {
  id: string;
  couple: string;
  group_id: string;
};

export type GroupsSelect = {
  group_id: string;
};

export type CuartosResutls = {
  id: string;
  group_id: string;
  couple1_name: string;
  couple2_name: string;
  set_1_c1: string;
  set_2_c1: string;
  set_3_c1: string;
  set_1_c2: string;
  set_2_c2: string;
  set_3_c2: string;
  winner: string;
  rel_to: string;
  rel_from_1: string;
  rel_from_2: string;
};

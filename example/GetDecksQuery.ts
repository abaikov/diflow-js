
export type TGetDecksQuery = {
  type: 'GetDecks';
};

export type TGetDecksResponse = {
  decks: { id: number; name: string }[];
};


export type TCreateDeckPayload = { name: string };
export type TCreateDeckResponse = { newDeckId: number };

export const ECommandType = {
  CreateDeck: 'CreateDeck'
} as const;

export type TCreateDeckCommand = {
  type: typeof ECommandType.CreateDeck;
  source: string;
  payload: TCreateDeckPayload;
};

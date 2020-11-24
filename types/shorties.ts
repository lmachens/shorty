export type Shorty = {
  createdAt: Date;
  views: number;
  id: string;
  target: string;
};

export type NewShorty = Omit<Shorty, "createdAt" | "views">;

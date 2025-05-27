export type ResponsibleEvent = {
  image: string;
  nome: string;
  description: string;
};

export type EventDate = {
  day: string;
  month: string;
  year: string;
};

export type EventType = {
  event: {
    id: number;
    title: string;
    responsibles: ResponsibleEvent[];
    speaker: string;
    location: string;
    description: string;
    objectives: string[];
    date: EventDate;
    time: string;
    type: string;
  };
};
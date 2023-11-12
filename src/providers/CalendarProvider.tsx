import React, { createContext } from "react";
import { useLocalState } from "../hooks/custom/useLocalState";
import { CalendarSchema } from "../views/App/Calendar/Calendar";

type CalendarProviderType = {
  calendar: CalendarSchema[];
  addToCalendar: (client: CalendarSchema) => void;
};

export const CalendarContext = createContext<CalendarProviderType>({
  calendar: [],
  addToCalendar: () => {},
});

type CalendarProviderProps = React.PropsWithChildren<unknown>;

const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
  const [calendar, setCalendar] = useLocalState<CalendarSchema[]>(
    "@calendar",
    []
  );

  const addToCalendar = (calendar: CalendarSchema) => {
    setCalendar((v) => [...v, calendar]);
  };

  // const editCalendar = (calendar: CalendarSchema) => {
    
  // };

  return (
    <CalendarContext.Provider value={{ calendar, addToCalendar }}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;

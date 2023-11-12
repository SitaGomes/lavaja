import { useContext } from "react"
import { CalendarContext } from "../providers/CalendarProvider"

function useCalendar( ) {
    return useContext(CalendarContext)
}

export default useCalendar
import Calendar from 'react-calendar';

const MyCalendar = () => {
    const formatShortWeekday = (locale, date) => {
        // Customize the day abbreviation here
        const day = date.toLocaleString(locale, { weekday: 'short' });
        return day.substring(0, 2); // Example: Get the first two letters
      };

    return(
        <Calendar formatShortWeekday={formatShortWeekday} />
    )
}

export default MyCalendar;
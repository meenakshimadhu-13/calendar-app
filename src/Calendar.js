import React, { useState } from "react";
import "./Calendar.css";
import dayjs from "dayjs";
import events from "./data/events.json";
import Modal from "./Modal";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);

  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();
  const startDay = startOfMonth.day(); // 0 = Sunday
  const today = dayjs();

  const generateDays = () => {
    const days = [];

    for (let i = 0; i < startDay + daysInMonth; i++) {
      if (i < startDay) {
        days.push(<div key={i} className="day empty"></div>);
      } else {
        const dayNum = i - startDay + 1;
        const fullDate = currentDate.date(dayNum).format("YYYY-MM-DD");

        const dayEvents = events.filter((event) => event.date === fullDate);

        const isToday =
          today.date() === dayNum &&
          today.month() === currentDate.month() &&
          today.year() === currentDate.year();

        days.push(
          <div
            key={i}
            className={`day ${isToday ? "today" : ""}`}
            onClick={() => {
              setSelectedDate(fullDate);
              setSelectedEvents(dayEvents);
              setShowModal(true);
            }}
          >
            <div>{dayNum}</div>
            {dayEvents.map((event, idx) => (
              <div key={idx} className={`event ${event.type}`}>
                {event.title} <br />
                <small>{event.time}</small>
              </div>
            ))}
          </div>
        );
      }
    }

    return days;
  };

  return (
    <>
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}>
            Previous
          </button>
          <h2>{currentDate.format("MMMM YYYY")}</h2>
          <button onClick={() => setCurrentDate(currentDate.add(1, "month"))}>
            Next
          </button>
        </div>

        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
          {generateDays()}
        </div>
      </div>

      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        date={selectedDate}
        events={selectedEvents}
      />
    </>
  );
};

export default Calendar;

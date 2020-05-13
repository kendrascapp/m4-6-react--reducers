import React from "react";
import ReactDOM from "react-dom";
import { BookingProvider } from "./components/ContextBooking";

import App from "./components/App";
import { SeatProvider } from "./components/SeatContext";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <SeatProvider>
    <BookingProvider>
      <App />
    </BookingProvider>
  </SeatProvider>,
  rootElement
);

import React from "react";
import styled from "styled-components";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { ReactComponent as SeatStyle } from "../assets/seat-available.svg";
import { getRowName, getSeatNum, encodeSeatId } from "../helpers";
import { Icon } from "react-icons-kit";
import { ContextBooking } from "./ContextBooking";

const Seat = ({ rowName, seatIndex, seatStatus, price, rowIndex }) => {
  const {
    actions: { beginBookingProcess },
  } = React.useContext(ContextBooking);

  const seatId = encodeSeatId(rowIndex, seatIndex);

  return (
    <Wrapper>
      <Tippy content={`Row ${rowName}, Seat ${seatIndex}, ${price}`}>
        <button
          disabled={seatStatus}
          onClick={() => {
            console.log("CLICK");
            beginBookingProcess({ seatId, price });
          }}
        >
          <SeatStyle
            style={{ filter: seatStatus ? "grayscale(100%)" : "" }}
          ></SeatStyle>
        </button>
      </Tippy>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  position: relative;

  &:disabled img {
    filter: grayscale(100%);
  }
`;

export default Seat;

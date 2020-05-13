import React, { createContext, useReducer } from "react";
export const SeatContext = createContext();
const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "receive-seat-info-from-server": {
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    }
    case "mark-seat-as-purchased": {
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: {
            ...state.seats[action.seatId],
            isBooked: true,
          },
        },
      };
    }
    default:
      throw new Error(`ERROR in: ${action.type}`);
  }
};
export const SeatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };
  const markSeatPurchased = (seatId) => {
    dispatch({
      type: "mark-seat-as-purchased",
      seatId,
    });
  };
  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatPurchased,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};

import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { SeatContext } from "./SeatContext";
import { ContextBooking } from "./ContextBooking";
import { decodeSeatId } from "../helpers";
const PurchaseModel = () => {
  const {
    selectedSeatId,
    status,
    error,
    price,
    actions: {
      beginBookingProcess,
      cancelBookingProcess,
      purchaseTicketRequest,
      purchaseTicketSuccess,
      purchaseTicketFailure,
    },
  } = useContext(ContextBooking);
  const {
    actions: { markSeatPurchased },
  } = useContext(SeatContext);
  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");
  const { rowName, seatNum } = decodeSeatId(selectedSeatId);
  return (
    <div>
      <Dialog
        open={selectedSeatId !== null}
        onClick={cancelBookingProcess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {" "}
          PURCHASE TICKET {rowName}
          {seatNum}{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have purchase this seat{" "}
            <strong>
              {rowName}
              {seatNum}{" "}
            </strong>
            for ${price}
          </DialogContentText>
          <DialogContent>
            Place your credit card information below, we won't steal it or scam
            you, promise!
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <form>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="credit"
              label="Credit Card"
              type="text"
              value={creditCard}
              onChange={(ev) => setCreditCard(ev.currentTarget.value)}
              style={{ flex: 2 }}
            />
            <TextField
              margin="dense"
              id="expire"
              label="Expiration"
              type="text"
              value={expiration}
              onChange={(ev) => setExpiration(ev.currentTarget.value)}
              style={{ flex: 1 }}
            />
            <Button
              type="submit"
              form="myform"
              onClick={(ev) => {
                console.log(ev);
                ev.preventDefault();
                purchaseTicketRequest();
                fetch("/api/book-seat", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    creditCard,
                    expiration,
                    seatId: selectedSeatId,
                  }),
                })
                  .then((res) => res.json())
                  .then((json) => {
                    if (json.success) {
                      console.log("HERE!", json);
                      purchaseTicketSuccess();
                      markSeatPurchased(selectedSeatId);
                    } else {
                      purchaseTicketFailure(json.message);
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    purchaseTicketFailure(error);
                  });
              }}
            >
              Pay
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default PurchaseModel;

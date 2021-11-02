import React from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";

export function AddressForm({ address, handleOnChange, handleRemove }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={11}>
          <div>
            <TextField
              required
              name="streetName"
              label="Street Name"
              value={address.streetName}
              onChange={handleOnChange}
            />
            <TextField
              name="postalCode"
              label="Postal Code"
              value={address.postalCode}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <TextField
              required
              name="state"
              label="State"
              value={address.state}
              onChange={handleOnChange}
            />
            <TextField
              required
              name="country"
              label="Country"
              value={address.country}
              onChange={handleOnChange}
            />
          </div>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={handleRemove}>
            Remove
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

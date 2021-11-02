import React, { useState, useEffect, useReducer } from "react";
import { useParams, useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { BaseApiUrl } from "../../constants";
import { AddressForm } from "../address-form";

const blankAddress = {
  streetName: "",
  postalCode: "",
  state: "",
  country: "",
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  addresses: [blankAddress],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEE":
      return action.payload;

    case "UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "ADD_ADDRESS":
      return {
        ...state,
        addresses: [...state.addresses, blankAddress],
      };

    case "REMOVE_ADDRESS":
      const addressList = [...state.addresses];
      if (action.index > -1) {
        addressList.splice(action.index, 1);
      }
      return {
        ...state,
        addresses: addressList,
      };

    case "UPDATE_ADDRESS":
      const addresses = state.addresses;
      addresses[action.index] = {
        ...addresses[action.index],
        ...action.payload,
      };
      return {
        ...state,
        addresses,
      };

    default:
      return initialState;
  }
};

export function Create() {
  const { id } = useParams();
  const history = useHistory();
  const [employeeState, employeeDispatch] = useReducer(reducer, initialState);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id !== "new") {
      axios.get(`${BaseApiUrl}/Employee/${id}`).then((resp) =>
        employeeDispatch({
          type: "SET_EMPLOYEE",
          payload: resp.data,
        })
      );
    }
  }, [id]);

  const handleOnChange = (e) => {
    employeeDispatch({
      type: "UPDATE",
      payload: {
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleAddressChange = (e, index) => {
    employeeDispatch({
      index,
      type: "UPDATE_ADDRESS",
      payload: {
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaving(true);

    let promise;
    if (employeeState.id) {
      promise = axios.put(`${BaseApiUrl}/Employee/${id}`, employeeState);
    } else {
      promise = axios.post(`${BaseApiUrl}/Employee`, employeeState);
    }
    promise
      .then(() => history.push("/"))
      .catch(() => {
        setSaving(false);
        alert("Something Went Wrong");
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 4,
          width: "45%",
        },
      }}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div>
        <TextField
          required
          name="firstName"
          label="First Name"
          value={employeeState.firstName}
          onChange={handleOnChange}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={employeeState.lastName}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <TextField
          required
          name="email"
          label="Email"
          value={employeeState.email}
          onChange={handleOnChange}
        />
        <TextField
          required
          name="phoneNumber"
          label="Phone number"
          value={employeeState.phoneNumber}
          onChange={handleOnChange}
        />
      </div>
      <div style={{ margin: "15px" }}>
        <Typography
          gutterBottom
          style={{ margin: "0 15px" }}
          variant="h5"
          component="h4"
        >
          Addresses&nbsp;
          <Button
            variant="outlined"
            onClick={() => employeeDispatch({ type: "ADD_ADDRESS" })}
          >
            Add New
          </Button>
        </Typography>
        {employeeState.addresses.map((address, index) => (
          <React.Fragment key={address.id || index}>
            <AddressForm
              address={address}
              handleOnChange={(e) => handleAddressChange(e, index)}
              handleRemove={() =>
                employeeDispatch({ type: "REMOVE_ADDRESS", index })
              }
            />
          </React.Fragment>
        ))}
      </div>

      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Button variant="outlined" href="/">
          Cancel
        </Button>
        <Button type="Submit" disabled={saving} variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
}

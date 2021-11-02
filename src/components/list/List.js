import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import axios from "axios";
import { BaseApiUrl } from "../../constants";
import { EmployeeCard } from "../employee-card";

export function List() {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    axios
      .get(`${BaseApiUrl}/Employee`)
      .then((resp) => setEmployeeList(resp.data));
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Stack
        direction="row"
        justifyContent="right"
        style={{ marginBottom: "15px" }}
      >
        <Button variant="outlined" href="/new">
          Add New Employee
        </Button>
      </Stack>
      <Grid container spacing={4}>
        {employeeList.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </Grid>
    </Container>
  );
}

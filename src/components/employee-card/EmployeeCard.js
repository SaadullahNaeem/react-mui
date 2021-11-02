import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export function EmployeeCard({ employee }) {
  return (
    <Grid item xs={12} sm={6}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h3">
            <strong>Name :</strong> {employee.firstName} {employee.lastName}
          </Typography>
          <Typography gutterBottom variant="h5" component="h4">
            <strong>Email :</strong> {employee.email}
          </Typography>
          <Typography gutterBottom variant="h5" component="h4">
            <strong>Phone Number :</strong> {employee.phoneNumber}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button variant="outlined" href={`/${employee.id}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

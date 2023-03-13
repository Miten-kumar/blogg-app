import * as React from "react";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions } from "@mui/material";
import Grid from '@mui/material/Grid'
import { NavLink } from "react-router-dom";

import { Outlet } from "react-router-dom";
export default function MultiActionAreaCard() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={2}>
            <nav
              className="nav"
              style={{
                boxShadow: "0px 0px 0.5rem grey",
                width: "8rem",
                height: "100vh",
              }}
            >
              <CardContent>
                <CardActions>
                  <NavLink to="/admin/alluser">
                    <Button size="small" color="primary">
                      All Users
                    </Button>
                  </NavLink>
                </CardActions>
                <CardActions>
                  <NavLink to="/admin/blog">
                    <Button size="small" color="primary">
                      All Blogs
                    </Button>
                  </NavLink>
                </CardActions>
              </CardContent>
            </nav>
        </Grid>
        <Grid item md={10}>
              <Outlet />
        </Grid>
      </Grid>
    </>
  );
}

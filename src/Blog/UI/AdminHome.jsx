import * as React from "react";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions } from "@mui/material";
import Grid from '@mui/material/Grid'
import { NavLink } from "react-router-dom";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { Outlet } from "react-router-dom";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
export default function MultiActionAreaCard() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={2}>
            <nav
              className="nav"
              style={{
                boxShadow: "0px 0px 0.5rem grey",
                width: "9rem",
                height: "100vh",
              }}
            >
              <CardContent>
                <CardActions>
                  <NavLink active to="/admin/alluser" className="d-inline mb-2">
                    <Button size="small" color="primary">
                     <GroupOutlinedIcon className="mx-2"/>  Users
                    </Button>
                  </NavLink>
                </CardActions>
                <CardActions >
                  <NavLink to="/admin/myblog">
                    <Button size="small"className=" mb-3" color="primary">
                     <DescriptionOutlinedIcon className="mx-2"/> MyBlogs
                    </Button>
                  </NavLink>
                </CardActions>
                <CardActions>
                  <NavLink to="/admin/blog">
                    <Button size="small" color="primary">
                     <DescriptionOutlinedIcon className="mx-2"/>AllBlogs
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

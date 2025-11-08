import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DashboardBreadcrumb({ currentPage }) {
  const navigate = useNavigate();

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {/* Always clickable Dashboard link */}
      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate("/dashboard")}
        sx={{ cursor: "pointer" }}
      >
        Dashboard
      </Link>

      {/* Current page (not clickable) */}
      <Typography color="text.primary">
        {currentPage}
      </Typography>
    </Breadcrumbs>
  );
}

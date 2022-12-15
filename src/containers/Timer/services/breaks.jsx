import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TableCell,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  Checkbox,
  Toolbar,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { Break, TimeEntry } from "../../../models";
import { alpha, styled } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { PropTypes } from "prop-types";

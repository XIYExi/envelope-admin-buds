import EnvelopeScrollbars from "../../../@envelope/core/EnvelopeScrollbars";
import { styled, useTheme } from '@mui/material/styles';
import EnvelopeSettings from "../../../@envelope/core/EnvelopeSettings";
import {Button, Dialog, IconButton,Slide,Typography} from '@mui/material';
import { red } from '@mui/material/colors';
import { forwardRef, memo, useState } from 'react';
import EnvelopeThemeSchemes from "../../../@envelope/core/EnvelopeThemeProvider";
import { useSwipeable } from 'react-swipeable';
import EnvelopeSvgIcon from "../../../@envelope/core/EnvelopeSvgIcon";
import themesConfig from "../../configs/themesConfig";
import {changeEnvelopeTheme} from "../../store/envelope/settingsSlice";
import { useDispatch } from 'react-redux';
import EnvelopeSettingsViewerDialog from "./EnvelopeSettingsViewerDialog";



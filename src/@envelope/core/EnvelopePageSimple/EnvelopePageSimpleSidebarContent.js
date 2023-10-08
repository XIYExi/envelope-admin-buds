import { useSelector } from 'react-redux';
import EnvelopeScrollbars from "../EnvelopeScrollbars";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { selectContrastMainTheme} from "../../../app/store/envelope/settingsSlice";
import classNames from "classnames";

function EnvelopePageSimpleSidebarContent(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    <EnvelopeScrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div className={classNames('EnvelopePageSimple-sidebarHeader', props.variant)}>{props.header}</div>
        </ThemeProvider>
      )}

      {props.content && <div className="EnvelopePageSimple-sidebarContent">{props.content}</div>}
    </EnvelopeScrollbars>
  );
}

export default EnvelopePageSimpleSidebarContent;

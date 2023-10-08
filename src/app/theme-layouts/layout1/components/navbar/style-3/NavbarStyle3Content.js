import EnvelopeScrollbars from "../../../../../../@envelope/core/EnvelopeScrollbars";
import { styled, useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import classNames from 'classnames';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EnvelopeNavigation from "../../../../../../@envelope/core/EnvelopeNavigation";
import { navbarCloseMobile } from "../../../../../store/envelope/navbarSlice";
import { selectContrastMainTheme } from "../../../../../store/envelope/settingsSlice";
import { useLocation } from 'react-router-dom';
import {useThemeMediaQuery} from "../../../../../../@envelope/hook";
import { selectNavigation} from "../../../../../store/envelope/navigationSlice";

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const StyledPanel = styled(EnvelopeNavigation)(({ theme, opened }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['opacity'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  opacity: 0,
  pointerEvents: 'none',
  ...(opened && {
    opacity: 1,
    pointerEvents: 'initial',
  }),
}));

function needsToBeOpened(location, item) {
  return location && isUrlInChildren(item, location.pathname);
}

function isUrlInChildren(parent, url) {
  if (!parent.children) {
    return false;
  }

  for (let i = 0; i < parent.children.length; i += 1) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], url)) {
        return true;
      }
    }
    if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
      return true;
    }
  }

  return false;
}

function NavbarStyle3Content(props) {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const navigation = useSelector(selectNavigation);
  const [selectedNavigation, setSelectedNavigation] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));
  const location = useLocation();

  useEffect(() => {
    navigation?.forEach((item) => {
      if (needsToBeOpened(location, item)) {
        setSelectedNavigation([item]);
      }
    });
  }, [navigation, location]);

  function handleParentItemClick(selected) {
    /** if there is no child item do not set/open panel
     */
    if (!selected.children) {
      setSelectedNavigation([]);
      setPanelOpen(false);
      return;
    }

    /**
     * If navigation already selected toggle panel visibility
     */
    if (selectedNavigation[0]?.id === selected.id) {
      setPanelOpen(!panelOpen);
    } else {
      /**
       * Set navigation and open panel
       */
      setSelectedNavigation([selected]);
      setPanelOpen(true);
    }
  }

  function handleChildItemClick(selected) {
    setPanelOpen(false);
    if (isMobile) {
      dispatch(navbarCloseMobile());
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setPanelOpen(false)}>
      <Root className={classNames('flex flex-auto flex h-full', props.className)}>
        <div id="fuse-navbar-side-panel" className="flex shrink-0 flex-col items-center">
          <img className="w-44 my-32" src="assets/images/logo/logo.svg" alt="logo" />

          <EnvelopeScrollbars
            className="flex flex-1 min-h-0 justify-center w-full overflow-y-auto overflow-x-hidden"
            option={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <EnvelopeNavigation
              className={classNames('navigation')}
              navigation={navigation}
              layout="vertical-2"
              onItemClick={handleParentItemClick}
              firstLevel
              selectedId={selectedNavigation[0]?.id}
              dense={props.dense}
            />
          </EnvelopeScrollbars>
        </div>

        {selectedNavigation.length > 0 && (
          <StyledPanel
            id="fuse-navbar-panel"
            opened={panelOpen}
            className={classNames('shadow-5 overflow-y-auto overflow-x-hidden')}
            option={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <EnvelopeNavigation
              className={classNames('navigation')}
              navigation={selectedNavigation}
              layout="vertical"
              onItemClick={handleChildItemClick}
            />
          </StyledPanel>
        )}
      </Root>
    </ClickAwayListener>
  );
}

export default memo(NavbarStyle3Content);

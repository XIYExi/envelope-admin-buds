import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import classNames from 'classnames';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import EnvelopePageSimpleSidebarContent from "./EnvelopePageSimpleSidebarContent";

const EnvelopePageSimpleSidebar = forwardRef((props, ref) => {
  const { open, position, variant, rootRef, sidebarWidth } = props;

  const [isOpen, setIsOpen] = useState(open);

  useImperativeHandle(ref, () => ({
    toggleSidebar: handleToggleDrawer,
  }));

  const handleToggleDrawer = useCallback((val) => {
    setIsOpen(val);
  }, []);

  useEffect(() => {
    handleToggleDrawer(open);
  }, [handleToggleDrawer, open]);

  return (
    <>
      <Hidden lgUp={variant === 'permanent'}>
        <SwipeableDrawer
          variant="temporary"
          anchor={position}
          open={isOpen}
          onOpen={(ev) => {}}
          onClose={() => props?.onClose()}
          disableSwipeToOpen
          classes={{
            root: classNames('EnvelopePageSimple-sidebarWrapper', variant),
            paper: classNames(
              'EnvelopePageSimple-sidebar',
              variant,
              position === 'left' ? 'EnvelopePageSimple-leftSidebar' : 'EnvelopePageSimple-rightSidebar'
            ),
          }}
          sx={{
            '& .MuiPaper-root': {
              width: sidebarWidth,
              maxWidth: '100%',
            },
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          // container={rootRef.current}
          BackdropProps={{
            classes: {
              root: 'EnvelopePageSimple-backdrop',
            },
          }}
          style={{ position: 'absolute' }}
        >
          <EnvelopePageSimpleSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>

      {variant === 'permanent' && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={classNames(
              'EnvelopePageSimple-sidebarWrapper',
              variant,
              isOpen ? 'opened' : 'closed',
              position === 'left' ? 'EnvelopePageSimple-leftSidebar' : 'EnvelopePageSimple-rightSidebar'
            )}
            open={isOpen}
            onClose={props?.onClose}
            classes={{
              paper: classNames('EnvelopePageSimple-sidebar border-0', variant),
            }}
          >
            <EnvelopePageSimpleSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});

EnvelopePageSimpleSidebar.defaultProps = {
  open: true,
};

export default EnvelopePageSimpleSidebar;

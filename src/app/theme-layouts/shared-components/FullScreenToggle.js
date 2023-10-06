import {Tooltip, IconButton} from "@mui/material";
import classNames from "classnames";
import {useEffect, useLayoutEffect, useState} from "react";
import EnvelopeSvgIcon from "../../../@envelope/core/EnvelopeSvgIcon";

const useEnhancedEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;


const HeaderFullScreenToggle = (props) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    function getBrowserFullscreenElementProp() {
        if (typeof document.fullscreenElement !== 'undefined') {
            return 'fullscreenElement';
        }
        if (typeof document.mozFullScreenElement !== 'undefined') {
            return 'mozFullScreenElement';
        }
        if (typeof document.msFullscreenElement !== 'undefined') {
            return 'msFullscreenElement';
        }
        if (typeof document.webkitFullscreenElement !== 'undefined') {
            return 'webkitFullscreenElement';
        }
        throw new Error('fullscreenElement is not supported by this browser');
    }

    useEnhancedEffect(() => {
        document.onfullscreenchange = ()  => setIsFullScreen(document[getBrowserFullscreenElementProp()] != null);

        return () => {
            document.onfullscreenchange = undefined;
        }
    }, [])
    
    function openFullscreen(){
        const elem = document.documentElement;

        if (elem.requestFullscreen){
            elem.requestFullscreen();
        }
        else if (elem.mozRequestFullScreen){
            /*firefox*/
            elem.mozRequestFullScreen();
        }
        else if (elem.webkitMatchesSelector){
            /*chrome, safari*/
            elem.webkitMatchesSelector();
        }
        else if (elem.msRequestFullscreen){
            /*edge*/
            elem.msRequestFullscreen();
        }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
        }
    }

    function toggleFullScreen() {
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement
        ) {
            closeFullscreen();
        } else {
            openFullscreen();
        }
    }


    return(
        <Tooltip title={'Fullscreen toggle'} placement='bottom'>
            <IconButton
                onClick={toggleFullScreen}
                className={classNames('w-40 h-40', props.className)}
                size='large'
            >
                <EnvelopeSvgIcon>heroicons-outline:arrows-expand</EnvelopeSvgIcon>
            </IconButton>
        </Tooltip>
    )
}

export default HeaderFullScreenToggle;



import {ClickAwayListener, styled, IconButton, ListItemIcon, ListItemText, MenuItem, Paper, Popper,TextField,Tooltip,Typography} from "@mui/material";
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import classNames from "classnames";
import _ from '@lodash';
import {Fragment, memo, useEffect, useMemo, useReducer, useRef} from "react";
import Autosuggest from 'react-autosuggest';
import withRouter from "../withRouter";
import EnvelopeSvgIcon from "../EnvelopeSvgIcon";


const Root = styled('div')(({ theme }) => ({
    '& .EnvelopeSearch-container': {
        position: 'relative',
    },

    '& .EnvelopeSearch-suggestionsContainerOpen': {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(),
        left: 0,
        right: 0,
    },

    '& .EnvelopeSearch-suggestion': {
        display: 'block',
    },

    '& .EnvelopeSearch-suggestionsList': {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },

    '& .EnvelopeSearch-input': {
        transition: theme.transitions.create(['background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.short,
        }),
        '&:focus': {
            backgroundColor: theme.palette.background.paper,
        },
    },
}));


function renderInputComponent(inputProps){
    const {variant, inputRef=() =>{}, ref, ...other} = inputProps;
    return(
        <div className='w-full relative'>
            {
                variant === 'basic' ? (
                    <Fragment>
                        <TextField
                            fullWidth
                            InputProps={{
                                inputRef: (node) => {
                                    ref(node);
                                    inputRef(node);
                                },
                                classes: {
                                    input: 'EnvelopeSearch-input py-0 px-16 h-40 md:h-48 ltr:pr-48 rtl:pl-48',
                                    notchedOutline: 'rounded-8',
                                },
                            }}
                            {...other}
                        />
                        <EnvelopeSvgIcon
                            className='absolute top-0 ltr:right-0 rtl:left-0 h-40 md:h-48 w-48 p-12 pointer-events-none'
                            color='action'
                        >
                            heroicons-outline:search
                        </EnvelopeSvgIcon>
                    </Fragment>
                ) : (
                    <TextField
                        fullWidth
                        InputProps={{
                            disableUnderline: true,
                            inputRef: (node) => {
                                ref(node);
                                inputRef(node);
                            },
                            classes: {
                                input: 'EnvelopeSearch-input py-0 px-16 h-48 md:h-64',
                            },
                        }}
                        variant="standard"
                        {...other}
                    />
                )
            }
        </div>
    );
}


function renderSuggestion(suggestion, {query, isHighlight}) {
    const matches = match(suggestion.title, query);
    const parts = parse(suggestion.title, matches);

    return(
        <MenuItem className='min-w-40'>
            <ListItemIcon className='min-w-40'>
                {
                    suggestion.icon ? (
                        <EnvelopeSvgIcon>{suggestion.icon}</EnvelopeSvgIcon>
                    ) : (
                        <span className='text-20 w-24 font-semibold uppercase text-center'>
                            {suggestion.title[0]}
                        </span>
                    )
                }
            </ListItemIcon>
            <ListItemText
                primary={parts.map((part, index) => {
                    return(
                        <Fragment key={index}>
                            {
                                part.highlight ? (
                                    <span key={String(index)} style={{ fontWeight: 600 }}>
                                        {part.text}
                                    </span>
                                ) : (
                                    <strong key={String(index)} style={{ fontWeight: 300 }}>
                                        {part.text}
                                    </strong>
                                )
                            }
                        </Fragment>
                    )
                })}
            />
        </MenuItem>
    );
}

function getSuggestions(value, data) {
    const inputValue = _.deburr(value.trim().toLowerCase());
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : data.filter((suggestion) => {
            const keep = count < 10 && match(suggestion.title, inputValue).length > 0;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}


function getSuggestionValue(suggestion) {
    return suggestion.title;
}

const initialState = {
    searchText: '',
    search: false,
    navigation: null,
    suggestions: [],
    noSuggestions: false,
};


function reducer(state, action) {
    switch (action.type) {
        case 'open':{
            return {
                ...state,
                opened: true
            };
        }
        case 'close': {
            return {
                ...state,
                opened: false,
                searchText: ""
            };
        }
        case 'setSearchText': {
            return {
                ...state,
                navigation: action.value
            };
        }
        case 'setNavigation': {
            return {
                ...state,
                navigation: action.value,
            };
        }
        case 'updateSuggestions': {
            const suggestions = getSuggestions(action.value, state.navigation);
            const isInputBlank = action.value.trim() === '';
            const noSuggestions = !isInputBlank && suggestions.length === 0;

            return {
                ...state,
                suggestions,
                noSuggestions,
            };
        }
        case 'clearSuggestions': {
            return {
                ...state,
                suggestions: [],
                noSuggestions: [],
            };
        }
        case 'decrement': {
            return {count: state.count - 1};
        }
        default: {
            throw new Error();
        }
    }
}

function EnvelopeSearch(props) {
    const {navigation} = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const suggestionsNode = useRef(null);
    const popperNode = useRef();
    const buttonNode = useRef();

    useEffect(() => {
        dispatch(({
            type: 'setNavigation',
            value: navigation
        }))
    }, [navigation])


    function showSearch(ev) {
        ev.stopPropagation();
        dispatch({type: 'open'})
        document.addEventListener('keydown', escFunction, false);
    }

    function hideSearch(){
        dispatch({type: 'close'})
        document.removeEventListener('keydown', escFunction, false);
    }

    function escFunction(event){
        if (event.keyCode === 27)
            hideSearch();
    }

    function handleSuggestionsFetchRequested({value}){
        dispatch({
            type: 'updateSuggestions',
            value
        });
    }

    function handleSuggestionSelected(event, {suggestion}){
        event.preventDefault()
        event.stopPropagation()
        if (!suggestion.url)
            return;
        props.navigate(suggestion.url);
        hideSearch()
    }

    function handleSuggestionsClearRequested(){
        dispatch({
            type: 'clearSuggestions',
        })
    }

    function handleChange(event){
        dispatch({
            type: 'setSearchText',
            value: event.target.value
        })
    }

    function handleClickAway(event){
        return(
            state.opened &&
            (!suggestionsNode.current || !suggestionsNode.current.contains(event.target)) &&
                hideSearch()
        )
    }

    const autosuggestProps = {
        renderInputComponent,
        highlightFirstSuggestion: true,
        suggestions: state.suggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested:  handleSuggestionsClearRequested,
        onSuggestionSelected: handleSuggestionSelected,
        getSuggestionValue,
        renderSuggestion,
    };


    switch (props.variant){
        case 'basic':{
            return (
                <div className={classNames('flex items-center w-full', props.className)} ref={popperNode}>
                    <Autosuggest
                        {...autosuggestProps}
                        inputProps={{
                            variant: props.variant,
                            placeholder: props.placeholder,
                            value: state.searchText,
                            onChange: handleChange,
                            onFocus: showSearch,
                            InputLabelProps: {
                                shrink: true
                            },
                            autoFocus: false,
                        }}
                        theme={{
                            container: 'flex flex-1 w-full',
                            suggestionsList: 'EnvelopeSearch-suggestionsList',
                            suggestion: 'EnvelopeSearch-suggestion',
                        }}
                        renderSuggestionContainer={(options) => (
                            <Popper
                                anchorEl={popperNode.current}
                                open={Boolean(options.children) || state.noSuggestions}
                                popperOptions={{positionFixed: true}}
                                className='z-9999'
                            >
                                <div ref={suggestionsNode}>
                                    <Paper
                                        className='shadow-lg rounded-8 overflow-hidden'
                                        {...options.containerProps}
                                        style={{width:popperNode.current ? popperNode.current.clientWidth: null}}
                                    >
                                        {options.children}
                                        {
                                            state.noSuggestions && (
                                                <Typography className='px-16 py-12'>{props.noResults}</Typography>
                                            )
                                        }
                                    </Paper>
                                </div>
                            </Popper>
                        )}
                    />
                </div>
            );
        }
        case 'full': {
            return(
                <Root className={classNames('flex', props.className)}>
                    <Tooltip title={'Click to search'} placeholder='bottom'>
                        <div
                            onClick={showSearch}
                            onKeyDown={showSearch}
                            role='button'
                            tabIndex={0}
                            ref={buttonNode}
                        >
                            {props.trigger}
                        </div>
                    </Tooltip>

                    {
                        state.opened && (
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <Paper className='absolute left-0 right-0 top-0 h-full z-9999 shadow-0' square>
                                    <div className='flex items-center w-full h-full' ref={popperNode}>
                                        <Autosuggest
                                            {...autosuggestProps}
                                            inputProps={{
                                                placeholder: props.placeholder,
                                                value: state.searchText,
                                                onChange: handleChange,
                                                InputLabelProps: {
                                                    shrink: true
                                                },
                                                antoFocus: true
                                            }}
                                            theme={{
                                                container: 'flex flex-1 w-full',
                                                suggestionsList: 'EnvelopeSearch-suggestionsList',
                                                suggestion: 'EnvelopeSearch-suggestion',
                                            }}
                                            renderSuggestionsContainer={(options)=>(
                                                <Popper
                                                    anchorEl={popperNode.current}
                                                    open={Boolean(options.children) || state.noSuggestions}
                                                    popperOptions={{positionFixed: true}}
                                                    className='z-9999'
                                                >
                                                    <div ref={suggestionsNode}>
                                                        <Paper
                                                            className='shadow-lg'
                                                            square
                                                            {...options.containerProps}
                                                            style={{
                                                                width: popperNode.current ? popperNode.current.clientWidth : null,
                                                            }}
                                                        >
                                                            {options.children}
                                                            {
                                                                state.noSuggestions && (
                                                                    <Typography className='px-16 py-12'>{props.noResults}</Typography>
                                                                )
                                                            }
                                                        </Paper>
                                                    </div>
                                                </Popper>
                                            )}
                                        />
                                        <IconButton onClick={hideSearch} className='mx-8' size='large'>
                                            <EnvelopeSvgIcon>heroicons-outline:x</EnvelopeSvgIcon>
                                        </IconButton>
                                    </div>
                                </Paper>
                            </ClickAwayListener>
                        )
                    }
                </Root>
            );
        }
        default: {
            return null;
        }
    }
}

EnvelopeSearch.propTypes = {};

EnvelopeSearch.defaultProps = {
    navigation: [],
    trigger: (
        <IconButton className='w-40 h-40' size='large'>
            <EnvelopeSvgIcon>heroicons-outline:search</EnvelopeSvgIcon>
        </IconButton>
    ),
    variant: 'full',
    placeholder: 'Search',
    noResults: 'No results...',
};

export default withRouter(memo(EnvelopeSearch));








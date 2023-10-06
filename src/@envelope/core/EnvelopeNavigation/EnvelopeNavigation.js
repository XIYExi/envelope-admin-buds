import {Divider, GlobalStyles} from "@mui/material";
import PropTypes from "prop-types";
import {Fragment, memo} from 'react';
import _ from '@lodash';
import EnvelopeNavHorizontalLayout1 from "./horizontal/EnvelopeNavHorizontalLayout1";
import EnvelopeNavVerticalLayout1 from "./vertical/EnvelopeNavVerticalLayout1";
import EnvelopeNavVerticalLayout2 from "./vertical/EnvelopeNavVerticalLayout2";
import NavHorizontalCollapse from "./horizontal/types/EnvelopeHorizontalCollapse";
import NavHorizontalGroup from "./horizontal/types/EnvelopeHorizontalGroup";
import NavHorizontalItem from "./horizontal/types/EnvelopeHorizontalItem";
import NavHorizontalLink from "./horizontal/types/EnvelopeHorizontalLink";
import NavVerticalCollapse from "./vertical/types/EnvelopeNavVerticalCollapse";
import NavVerticalGroup from "./vertical/types/EnvelopeNavVerticalGroup";
import NavVerticalItem from "./vertical/types/EnvelopeNavVerticalItem";
import NavVerticalLink from "./vertical/types/EnvelopeNavVerticalLink";
import { registerComponent } from './EnvelopeItem';


const inputGlobalStyles = (
    <GlobalStyles
        styles={(theme) => ({
            '.popper-navigation-list': {
                '& .fuse-list-item': {
                    padding: '8px 12px 8px 12px',
                    height: 40,
                    minHeight: 40,
                    '& .fuse-list-item-text': {
                        padding: '0 0 0 8px',
                    },
                },
                '&.dense': {
                    '& .fuse-list-item': {
                        minHeight: 32,
                        height: 32,
                        '& .fuse-list-item-text': {
                            padding: '0 0 0 8px',
                        },
                    },
                },
            },
        })}
    />
);


/*
Register Envelope Navigation Components
 */
registerComponent('vertical-group', NavVerticalGroup);
registerComponent('vertical-collapse', NavVerticalCollapse);
registerComponent('vertical-item', NavVerticalItem);
registerComponent('vertical-link', NavVerticalLink);
registerComponent('horizontal-group', NavHorizontalGroup);
registerComponent('horizontal-collapse', NavHorizontalCollapse);
registerComponent('horizontal-item', NavHorizontalItem);
registerComponent('horizontal-link', NavHorizontalLink);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);


function EnvelopeNavigation(props) {
    const options = _.pick(props, [
        'navigation',
        'layout',
        'active',
        'dense',
        'className',
        'onItemClick',
        'firstLevel',
        'selectedId',
    ]);
    if (props.navigation.length > 0) {
        return (
            <Fragment>
                {inputGlobalStyles}
                {props.layout === 'horizontal' && <EnvelopeNavHorizontalLayout1 {...options} />}
                {props.layout === 'vertical' && <EnvelopeNavVerticalLayout1 {...options} />}
                {props.layout === 'vertical-2' && <EnvelopeNavVerticalLayout2 {...options} />}
            </Fragment>
        );
    }
    return null;
}

EnvelopeNavigation.propTypes = {
    navigation: PropTypes.array.isRequired,
};

EnvelopeNavigation.defaultProps = {
    layout: 'vertical',
};

export default memo(EnvelopeNavigation);
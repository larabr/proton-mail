import React from 'react';
import { Checkbox, DropdownMenu, DropdownMenuButton, Icon } from 'react-components';
import { c } from 'ttag';

import ToolbarDropdown from './ToolbarDropdown';
import { Element } from '../../models/element';
import { isUnread, isStarred } from '../../helpers/elements';

interface Props {
    loading?: boolean;
    disabled?: boolean;
    elements: Element[];
    selectedIDs: string[];
    onCheck: (IDs: string[], checked: boolean, replace: boolean) => void;
}

const SelectAll = ({ loading, disabled, elements, selectedIDs, onCheck }: Props) => {
    const checked = elements.length === selectedIDs.length;

    const handleAll = (checked: boolean) => () =>
        onCheck(
            elements.map(({ ID = '' }) => ID),
            checked,
            true
        );

    const handleRead = (read: boolean) => () =>
        onCheck(
            elements.filter((element) => read === !isUnread(element)).map(({ ID = '' }) => ID),
            true,
            true
        );

    const handleStarred = (starred: boolean) => () =>
        onCheck(
            elements.filter((element) => starred === isStarred(element)).map(({ ID = '' }) => ID),
            true,
            true
        );

    return (
        <>
            <Checkbox
                className="flex pl1"
                checked={checked}
                disabled={disabled}
                loading={loading}
                onChange={({ target }) => handleAll(target.checked)()}
            />
            <ToolbarDropdown
                disabled={disabled}
                loading={loading}
                title={c('Title').t`Open actions dropdown`}
                content=""
            >
                {() => (
                    <div className="ml0-5 mr0-5">
                        <DropdownMenu>
                            <DropdownMenuButton className="alignleft" onClick={handleAll(true)}>
                                <Icon name="show-all-emails" className="mr0-5" />
                                {c('Action').t`Select all`}
                            </DropdownMenuButton>
                            <DropdownMenuButton className="alignleft" onClick={handleRead(false)}>
                                <Icon name="unread" className="mr0-5" />
                                {c('Action').t`All unread`}
                            </DropdownMenuButton>
                            <DropdownMenuButton className="alignleft" onClick={handleRead(true)}>
                                <Icon name="read" className="mr0-5" />
                                {c('Action').t`All read`}
                            </DropdownMenuButton>
                            <DropdownMenuButton className="alignleft" onClick={handleStarred(false)}>
                                <Icon name="star" className="mr0-5" />
                                {c('Action').t`All unstarred`}
                            </DropdownMenuButton>
                            <DropdownMenuButton className="alignleft" onClick={handleStarred(true)}>
                                <Icon name="starfull" className="mr0-5" />
                                {c('Action').t`All starred`}
                            </DropdownMenuButton>
                        </DropdownMenu>
                    </div>
                )}
            </ToolbarDropdown>
        </>
    );
};

export default SelectAll;

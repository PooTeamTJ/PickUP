import React from 'react'
import { useSelector } from 'react-redux';

// Material-UI Imports
import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup'

export default function Badges() {
    const store = useSelector(state => state);

    const maxBadges = 5

    return (
        <AvatarGroup max={5}>
            {store.user.badges.slice(0, maxBadges).map((badge) => (
                    <Avatar key={badge}>{badge[0]}</Avatar>
            ))}
        </AvatarGroup>
    )
}
import React from 'react'
import { useSelector } from 'react-redux';

// Material-UI Imports
import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup'

export default function Badges() {
    // Redux state
    const store = useSelector(state => state);

    const maxBadges = 5

    // Returns the first 5 badges as a Material UI avatar group
    // Displayes badges as the first letter of the badge name
    // Images to be added
    return (
        <AvatarGroup max={5}>
            {store.user.badges.slice(0, maxBadges).map((badge) => (
                    <Avatar key={badge}>{badge[0]}</Avatar>
            ))}
        </AvatarGroup>
    )
}
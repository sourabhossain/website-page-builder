// Library import
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// File import
import { enableEditMode } from '../../store/actions';

export const Link = ({ dragDropRef, item, style, opacity, handleDelete }) => {
    const dispatch = useDispatch();
    const dropElementState = useSelector((state) => state.dropElementState);

    const [elementStyle, setElementStyle] = useState(style);

    // Update element style on style change
    useEffect(() => {
        setElementStyle(style);
    }, [style]);

    // Make the right panel visible for style updates
    const handleOnClick = (e) => {
        e.preventDefault();

        dispatch(enableEditMode(item));
    }

    // Seperate margin properties and add them to parent element
    const parentElementStyle = {
        opacity: opacity,
        display: 'inline-block',
        marginTop: elementStyle?.marginTop,
        marginBottom: elementStyle?.marginBottom,
        marginLeft: elementStyle?.marginLeft,
        marginRight: elementStyle?.marginRight
    };
    const updatedElementStyle = (({ marginTop, marginBottom, marginLeft, marginRight, ...rest }) => rest)(elementStyle);

    return (
        <div
            ref={dragDropRef}
            className={`drop-element-wrapper ${dropElementState?.activeElement?.id === item?.id ? 'active' : ''}`}
            style={parentElementStyle}
        >
            <span className='title'>Link</span>
            <span className='delete' onClick={() => handleDelete(item?.id)}>Delete</span>

            <a href={item?.linkValue} id={item?.id} style={updatedElementStyle} onClick={handleOnClick} target='_blank' rel="noreferrer">Try Live Demo</a>
        </div>
    )
}
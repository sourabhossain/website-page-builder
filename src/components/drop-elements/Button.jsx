// Library import
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// File import
import { enableEditMode } from '../../store/actions';

export const Button = ({ dragDropRef, item, style, opacity, handleDelete }) => {
    const dispatch = useDispatch();
    const dropElementState = useSelector((state) => state.dropElementState);

    const [elementStyle, setElementStyle] = useState(style);

    // Update element style on style change
    useEffect(() => {
        setElementStyle(style);
    }, [style]);

    // Make the right panel visible for style updates
    const handleOnClick = () => {
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
            <span className='title'>Button</span>
            <span className='delete' onClick={() => handleDelete(item?.id)}>Delete</span>
            
            <button id={item?.id} type={item?.buttonType ?? 'button'} style={updatedElementStyle} onClick={handleOnClick}>Get Started</button>
        </div>
    )
}
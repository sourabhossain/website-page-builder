/* eslint-disable react-hooks/exhaustive-deps */
// Library import
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// File import
import { enableEditMode, updateElementText } from '../../store/actions';

export const Paragraph = ({ dragDropRef, item, style, opacity, handleDelete }) => {
    const dispatch = useDispatch();
    const dropElementState = useSelector((state) => state.dropElementState);

    const [editable, setEditable] = useState(false);
    const [elementStyle, setElementStyle] = useState(style);
    const [text, setText] = useState('Lorem Ipsum it');

    // Update text content on page load
    useEffect(() => {
        setText(item?.elementText ?? 'Lorem Ipsum it');
    }, []);

    // Update element style on style change
    useEffect(() => {
        setElementStyle(style);
        setEditable(false);
    }, [style]);

    // Textarea height auto resize
    const textAreaRef = useRef(null);
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = '5px';
            textAreaRef.current.style.height = (textAreaRef.current.scrollHeight) + "px";
            textAreaRef.current.setSelectionRange(text?.length, text?.length);
        }
    }, [editable, text]);

    // Disable edit mode on click outside
    useEffect(() => {
        if (!dropElementState?.isEditActive) {
            setEditable(false);
        }
    }, [dropElementState]);

    // Update text contents both in component and redux state
    const handleTextChange = (event) => {
        setText(event?.target?.value);

        dispatch(updateElementText({
            id: dropElementState?.activeElement?.id,
            elementText: event?.target?.value
        }));
    }

    // Make the right panel visible for style updates
    const handleOnClick = () => {
        setEditable(true);
        dispatch(enableEditMode(item));
    }

    // Seperate margin properties and add them to parent element
    const parentElementStyle = {
        opacity: opacity,
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
            <span className='title'>Paragraph</span>
            <span className='delete' onClick={() => handleDelete(item?.id)}>Delete</span>
            
            {
                editable ? (
                    <textarea
                        id={item?.id}
                        ref={textAreaRef}
                        style={updatedElementStyle}
                        type='text'
                        autoFocus
                        onChange={handleTextChange}
                        value={text}>
                    </textarea>
                ) : (
                    <p id={item?.id} style={updatedElementStyle} onClick={handleOnClick}>{text}</p>
                )
            }
        </div>
    )
}
/* eslint-disable react-hooks/exhaustive-deps */
// Library import
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';

// File import
import { DropItem } from './DropItem';
import { Sidebar } from './Sidebar';
import { StyleComponent } from './StyleComponent';
import { addDropItem, disableEditMode } from '../store/actions';
import { initialStyles } from '../initialStyles';

const useOutsideclick = (ref, activeElementId, callBack) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if (activeElementId !== event?.target?.id && event.target?.className !== 'delete') callBack();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, activeElementId, callBack]);
}

export const Container = () => {
    const dispatch = useDispatch();
    const dropElementState = useSelector((state) => state.dropElementState);

    const [dropItems, setDropItems] = useState([]);

    // Store items to local state from redux on load
    useEffect(() => {
        setDropItems(dropElementState?.dropElementList);
    }, []);

    // Add drop item to redux store on state change
    useEffect(() => {
        dispatch(addDropItem(dropItems))
    }, [dropItems]);

    // Disable edit mode on click outside sidebar
    const styleComponentRef = useRef(null);
    useOutsideclick(styleComponentRef, dropElementState?.activeElement?.id, () => dispatch(disableEditMode()));

    // Drop items on canvas with additional properties
    const [{ isOver }, dropRef] = useDrop({
        accept: 'element',
        drop: (item) => setDropItems((dropItem) => {
            item.id = uuidv4();
            item.style = initialStyles[item.name];
            if (item?.name === 'heading') item.headingTag = 'H1';
            if (item?.name === 'button') item.buttonType = 'submit';
            if (item?.name === 'link') item.linkValue = 'https://www.themeum.com/product/tutor-lms/';
            return !dropItem.includes(item) ? [...dropItem, item] : dropItem;
        }),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    // Change order of element on drag
    const moveDropListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = dropItems[dragIndex];
            const hoverItem = dropItems[hoverIndex];

            // Swap places of dragItem and hoverItem in the drop array
            setDropItems(dropItem => {
                const updatedDrops = [...dropItem];
                updatedDrops[dragIndex] = hoverItem;
                updatedDrops[hoverIndex] = dragItem;
                return updatedDrops;
            })
        },
        [dropItems],
    )

    // Delete drop item on delete button click
    const deleteDropItem = (id) => {
        setDropItems(dropItems?.filter((item) => item?.id !== id));
    }

    return (
        <div className='container'>
            <Sidebar />

            <div className='canvas-wrapper'>
                <div className='canvas' ref={dropRef}>
                    {dropItems?.map((dropItem, index) => (
                        <DropItem
                            key={dropItem.id}
                            index={index}
                            item={dropItem}
                            style={dropItem?.style}
                            moveListItem={moveDropListItem}
                            handleDelete={deleteDropItem}
                        />
                    ))}

                    {isOver && <div>Drop Elements Here</div>}
                </div>
            </div>

            {dropElementState?.isEditActive && <StyleComponent componentRef={styleComponentRef} />}
        </div>
    )
}
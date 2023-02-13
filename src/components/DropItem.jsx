// Library import
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

// File import
import { Heading, Paragraph, Button, Link } from './drop-elements';

export const DropItem = ({ index, item, style, moveListItem, handleDelete }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    // eslint-disable-next-line no-unused-vars
    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = index;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            moveListItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    })

    // Join the 2 refs together into one (both draggable and can be dropped on)
    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    // Make items being dragged transparent, so it's easier to see where we drop them
    const opacity = isDragging ? 0 : 1;

    const renderItem = () => {
        switch (item?.name) {
            case 'heading':
                return <Heading dragDropRef={dragDropRef} item={item} style={style} opacity={opacity} handleDelete={handleDelete} />
            case 'paragraph':
                return <Paragraph dragDropRef={dragDropRef} item={item} style={style} opacity={opacity} handleDelete={handleDelete} />
            case 'button':
                return <Button dragDropRef={dragDropRef} item={item} style={style} opacity={opacity} handleDelete={handleDelete} />
            case 'link':
                return <Link dragDropRef={dragDropRef} item={item} style={style} opacity={opacity} handleDelete={handleDelete} />
            default:
                return <Heading dragDropRef={dragDropRef} item={item} style={style} opacity={opacity} handleDelete={handleDelete} />
        }
    }

    return renderItem();
}
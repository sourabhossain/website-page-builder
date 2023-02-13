// Library import
import React from 'react';
import { useDrag } from 'react-dnd';

export const Element = ({ id, icon, name }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'element',
        item: { id, icon, name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    
    return (
        <div className={`element-item ${isDragging ? 'active' : ''}`} ref={dragRef}>
            {icon}
            {name}
        </div>
    )
}
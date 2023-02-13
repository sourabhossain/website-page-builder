// Library import
import React from 'react';

// File import
import { ButtonIcon, HeadingIcon, LinkIcon, ParagraphIcon } from '../icons';
import { Element } from './Element';

const ELEMENTS = [
    { id: 1, name: 'heading', icon: <HeadingIcon /> },
    { id: 2, name: 'paragraph', icon: <ParagraphIcon /> },
    { id: 3, name: 'button', icon: <ButtonIcon /> },
    { id: 4, name: 'link', icon: <LinkIcon /> },
]

export const Sidebar = () => {
    return (
        <div className='sidebar'>
            <h4 className='sidebar-title'>Elements</h4>
            <div className='element-container'>
                {ELEMENTS.map(element => <Element key={element.id} id={element.id} icon={element.icon} name={element.name} />)}
            </div>
        </div>
    )
}
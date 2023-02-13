/* eslint-disable react-hooks/exhaustive-deps */
// Library import
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// File import
import { updateButtonType, updateElementStyle, updateHeadingTag, updateLinkValue } from '../store/actions';

const headingFontSize = {
    H1: '2em',
    H2: '1.5em',
    H3: '1.17em',
    H4: '1em',
    H5: '.83em',
    H6: '.67em',
}

const initialStyle = {
    backgroundColor: '#020B53',
    color: '#000000',
    display: 'block',
    height: 0,
    width: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
}

export const StyleComponent = ({ componentRef }) => {
    const dispatch = useDispatch();
    const dropElementState = useSelector((state) => state.dropElementState);

    const [buttonType, setButtonType] = useState('button');
    const [link, setLink] = useState('https://www.themeum.com/product/tutor-lms/');
    const [style, setStyle] = useState(initialStyle);

    // Update component style state on load
    useEffect(() => {
        const activeElement = dropElementState?.activeElement;
        setButtonType(activeElement?.buttonType ?? 'button')
        setLink(activeElement?.linkValue ?? 'https://www.themeum.com/product/tutor-lms/')
        setStyle((oldStyle) => ({ ...oldStyle, ...activeElement?.style }));
    }, []);

    // Update element style on change
    const handleInputChange = (event) => {
        setStyle({ ...style, [String(event.target.name)]: event.target.value });

        dispatch(updateElementStyle({
            id: dropElementState?.activeElement?.id,
            style: {
                ...dropElementState?.activeElement?.style,
                [String(event.target.name)]: isNaN(Number(event.target.value)) ? event.target.value : event.target.value ? Number(event.target.value) : 'auto'
            }
        }));
    }

    // Change heading tag on click
    const handleHeadingClick = (event) => {
        dispatch(updateHeadingTag({
            id: dropElementState?.activeElement?.id,
            tag: event.target.innerText,
            style: {
                ...dropElementState?.activeElement?.style,
                fontSize: headingFontSize?.[event.target.innerText]
            }
        }));
    }

    // Change button type 
    const buttonTypeChange = (event) => {
        setButtonType(event?.target?.value);
        dispatch(updateButtonType({
            id: dropElementState?.activeElement?.id,
            buttonType: event?.target?.value
        }));
    }

    // Change link for link button
    const handleLinkChange = (event) => {
        setLink(event?.target?.value);
        dispatch(updateLinkValue({
            id: dropElementState?.activeElement?.id,
            linkValue: event?.target?.value
        }));
    }

    return (
        <div ref={componentRef} className='style-panel'>
            <h5 className='style-title'>Style</h5>

            <ul className='style-item'>
                <li>
                    <label>Background Color</label>
                    <div className='color-picker'>
                        <input id='backgroundColor' type='color' name='backgroundColor' onChange={handleInputChange} color={style?.backgroundColor} />
                        <label style={{ background: style.backgroundColor }} htmlFor='backgroundColor'></label>
                        <input type='text' name='backgroundColor' onChange={handleInputChange} value={style?.backgroundColor} />
                    </div>
                </li>
                <li>
                    <label>Color</label>
                    <div className='color-picker'>
                        <input id='color' type='color' name='color' onChange={handleInputChange} color={style?.color} />
                        <label style={{ background: style.color }} htmlFor='color'></label>
                        <input type='text' name='color' onChange={handleInputChange} value={style?.color} />
                    </div>
                </li>
            </ul>

            <ul className='style-item'>
                <li>
                    <label>Display</label>
                    <select name='display' onChange={handleInputChange} value={style?.display}>
                        <option value="block">Block</option>
                        <option value="inline">Inline</option>
                        <option value="inline-block">Inline Block</option>
                    </select>
                </li>
            </ul>

            <ul className='style-item'>
                <li>
                    <label>Height</label>
                    <div className='unit-box'>
                        <input type='number' name='height' onChange={handleInputChange} value={style?.height} />
                        <label>px</label>
                    </div>
                </li>
                <li>
                    <label>Width</label>
                    <div className='unit-box'>
                        <input type='number' name='width' onChange={handleInputChange} value={style?.width} />
                        <label>px</label>
                    </div>
                </li>
            </ul>

            <div className='margin-padding'>
                <div className='margin'>
                    <label>Margin</label>
                    <ul>
                        <li>
                            <label>H</label>
                            <div className='unit-box'>
                                <input type='number' name='marginLeft' onChange={handleInputChange} value={style?.marginLeft} />
                                <label>px</label>
                            </div>
                        </li>
                        <li>
                            <label>W</label>
                            <div className='unit-box'>
                                <input type='number' name='marginRight' onChange={handleInputChange} value={style?.marginRight} />
                                <label>px</label>
                            </div>
                        </li>
                        <li>
                            <label>X</label>
                            <div className='unit-box'>
                                <input type='number' name='marginTop' onChange={handleInputChange} value={style?.marginTop} />
                                <label>px</label>
                            </div>
                        </li>
                        <li>
                            <label>Y</label>
                            <div className='unit-box'>
                                <input type='number' name='marginBottom' onChange={handleInputChange} value={style?.marginBottom} />
                                <label>px</label>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className='padding'>
                    <label>Padding</label>
                    <ul>
                        <li>
                            <label>H</label>
                            <div className='unit-box'>
                                <input type='number' name='paddingLeft' onChange={handleInputChange} value={style?.paddingLeft} />
                                <label>px</label>
                            </div>
                        </li>
                        <li>
                            <label>W</label>
                            <div className='unit-box'>
                                <input type='number' name='paddingRight' onChange={handleInputChange} value={style?.paddingRight} />
                                <label>px</label>
                            </div>
                        </li>
                        <li>
                            <label>X</label>
                            <div className='unit-box'>
                                <input type='number' name='paddingTop' onChange={handleInputChange} value={style?.paddingTop} />
                                <label>px</label>
                            </div>
                        </li>
                        <li>
                            <label>Y</label>
                            <div className='unit-box'>
                                <input type='number' name='paddingBottom' onChange={handleInputChange} value={style?.paddingBottom} />
                                <label>px</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {
                dropElementState?.activeElement?.name === 'heading' &&
                <div className='tag'>
                    <label>Tag</label>
                    <ul>
                        <li onClick={handleHeadingClick} className={dropElementState?.activeElement?.headingTag === 'H1' ? 'active' : ''}>H1</li>
                        <li onClick={handleHeadingClick} className={dropElementState?.activeElement?.headingTag === 'H2' ? 'active' : ''}>H2</li>
                        <li onClick={handleHeadingClick} className={dropElementState?.activeElement?.headingTag === 'H3' ? 'active' : ''}>H3</li>
                        <li onClick={handleHeadingClick} className={dropElementState?.activeElement?.headingTag === 'H4' ? 'active' : ''}>H4</li>
                        <li onClick={handleHeadingClick} className={dropElementState?.activeElement?.headingTag === 'H5' ? 'active' : ''}>H5</li>
                        <li onClick={handleHeadingClick} className={dropElementState?.activeElement?.headingTag === 'H6' ? 'active' : ''}>H6</li>
                    </ul>
                </div>
            }

            {
                dropElementState?.activeElement?.name === 'button' &&
                <ul className='style-item'>
                    <li>
                        <label>Type</label>
                        <select name='buttonType' onChange={buttonTypeChange} value={buttonType}>
                            <option value="submit">Submit</option>
                            <option value="button">Button</option>
                        </select>
                    </li>
                </ul>
            }

            {
                dropElementState?.activeElement?.name === 'link' &&
                <div className='link'>
                    <label>Link</label>
                    <input type='text' name='link' onChange={handleLinkChange} value={link} />
                </div>
            }
        </div>
    )
}
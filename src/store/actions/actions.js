import { DROP_ELEMENT } from './actionTypes';

export const addDropItem = (item) => ({
    type: DROP_ELEMENT.ADD_DROP_ITEM,
    payload: item,
});

export const disableEditMode = () => ({
    type: DROP_ELEMENT.DISABLE_EDIT
});

export const enableEditMode = (payload) => ({
    type: DROP_ELEMENT.ENABLE_EDIT,
    payload: payload
});

export const updateElementStyle = (payload) => ({
    type: DROP_ELEMENT.UPDATE_STYLE,
    payload: payload
});

export const updateHeadingTag = (payload) => ({
    type: DROP_ELEMENT.UPDATE_HEADING_TAG,
    payload: payload
});

export const updateButtonType = (payload) => ({
    type: DROP_ELEMENT.UPDATE_BUTTON_TYPE,
    payload: payload
});

export const updateLinkValue = (payload) => ({
    type: DROP_ELEMENT.UPDATE_LINK_VALUE,
    payload: payload
});

export const updateElementText = (payload) => ({
    type: DROP_ELEMENT.UPDATE_ELEMENT_TEXT,
    payload: payload
});
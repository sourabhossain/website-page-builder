import { DROP_ELEMENT } from '../actions';

const initialState = {
    dropElementList: [],
    isEditActive: false,
    activeElement: null
}

export const dropReducer = (state = initialState, action) => {
    switch (action.type) {
        case DROP_ELEMENT.ADD_DROP_ITEM:
            return {
                ...state,
                dropElementList: action.payload,
            }

        case DROP_ELEMENT.DISABLE_EDIT:
            return {
                ...state,
                isEditActive: false,
                activeElement: null
            }

        case DROP_ELEMENT.ENABLE_EDIT:
            return {
                ...state,
                isEditActive: true,
                activeElement: action?.payload
            }

        case DROP_ELEMENT.UPDATE_STYLE:
            return {
                ...state,
                dropElementList: state?.dropElementList?.map((item) => {
                    if (item?.id === action?.payload?.id) item.style = action?.payload?.style;
                    return item;
                }),
            }
        
        case DROP_ELEMENT.UPDATE_HEADING_TAG:
            return {
                ...state,
                dropElementList: state?.dropElementList?.map((item) => {
                    if (item?.id === action?.payload?.id) {
                        item.headingTag = action?.payload?.tag;
                        item.style = action?.payload?.style;
                    };
                    return item;
                }),
            }

        case DROP_ELEMENT.UPDATE_BUTTON_TYPE:
            return {
                ...state,
                dropElementList: state?.dropElementList?.map((item) => {
                    if (item?.id === action?.payload?.id) item.buttonType = action?.payload?.buttonType;
                    return item;
                }),
            }

        case DROP_ELEMENT.UPDATE_LINK_VALUE:
            return {
                ...state,
                dropElementList: state?.dropElementList?.map((item) => {
                    if (item?.id === action?.payload?.id) item.linkValue = action?.payload?.linkValue;
                    return item;
                }),
            }

        case DROP_ELEMENT.UPDATE_ELEMENT_TEXT:
            return {
                ...state,
                dropElementList: state?.dropElementList?.map((item) => {
                    if (item?.id === action?.payload?.id) item.elementText = action?.payload?.elementText;
                    return item;
                }),
            }

        default:
            return state;
    }
}
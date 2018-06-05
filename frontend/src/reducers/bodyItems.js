import { BODY_ITEMS } from "../actions";

export default function bodyItems(state = [], action) {
    switch (action.type) {
        case BODY_ITEMS:
            return [action.bodies]
        default:
            return state
    }
}
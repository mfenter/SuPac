import { BODY_CHILDREN } from "../actions";

export default function bodyChildren(state = [], action) {
    switch (action.type) {
        case BODY_CHILDREN:
            return action.children
        default:
            return state
    }
}
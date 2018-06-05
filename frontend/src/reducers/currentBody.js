import {
    REQUEST_BODY_DATA,
    RECEIVE_BODY_DATA
} from "../actions";

export default function currentBody(
    state = {
        isFetchingBody: false
    },
    action
) {
    switch (action.type) {
        case REQUEST_BODY_DATA:
            return Object.assign({}, state, {
                isFetchingBody: true
            })
        case RECEIVE_BODY_DATA:
            return Object.assign({}, state, {
                isFetchingBody: false,
                name: action.name,
                description: action.description,
                image: action.image,
                parent: action.parent,
                lastUpdated: Date.now()
            })
        default:
            return state
    }
}
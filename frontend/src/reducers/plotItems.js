import { PLOT_ITEMS } from "../actions";

export default function plotItems(state = [], action) {
    switch (action.type) {
        case PLOT_ITEMS:
            return [action.plots]
        default:
            return state
    }
}
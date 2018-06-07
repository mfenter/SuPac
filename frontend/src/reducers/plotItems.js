import { PLOT_ITEMS } from "../actions";

export default function plotItems(state = [], action) {
    switch (action.type) {
        case PLOT_ITEMS:
            if (action.plots.length === 1 && action.plots[0] === null){
                return [];
            }
            return action.plots;
        default:
            return state
    }
}
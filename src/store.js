import fluxify from "fluxify";
import {MapUtils} from "./utils"
import update from "react-addons-update"
import _ from "underscore"

function pushObjects(updater, objects) {
    return updater.set(update(updater.props, {objects: {$push: objects}}));
}

/**
 * https://github.com/facebook/flux/tree/master/examples/flux-concepts
 */
export const MapStore = {
    get: function () {
        this.store = this.store || this.create();
        return this.store;
    },

    create: function () {
        return fluxify.createStore({
            id: "MapStore",
            initialState: {
                objects: []
            },
            actionCallbacks: {
                initObjects: function (updater) {
                    Promise.all([MapUtils.extractCars(), MapUtils.extractFactories(), MapUtils.extractFarms()])
                        .then(_.flatten)
                        .then(_.compact)
                        .then(objects => (console.log(objects), objects))
                        .then(pushObjects.bind(null, updater))
                        .catch(console.error);
                }
            }
        });
    }
};

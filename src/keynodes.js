/**
 * Получает и хранит адресса клучевых sc-узлов
 */
export const MapKeynodes = {};

/**
 * Список системных идентификаторов
 */
MapKeynodes.IDENTIFIERS = [
    'freight_transport',
    'nrel_inclusion',
    'nrel_ltd',
    'factory',
    'farm',
    'rrel_participant',
    'emergency_three'
];

MapKeynodes.init = function () {
    var deferred = $.Deferred();
    var self = this;
    SCWeb.core.Server.resolveScAddr(MapKeynodes.IDENTIFIERS, function (keynodes) {
        self.keynodes = keynodes;
        deferred.resolve();
    });
    return deferred;
};


MapKeynodes.get = function (identifier) {
    return this.keynodes[identifier];
};
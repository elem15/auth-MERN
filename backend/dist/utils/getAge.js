"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAge = void 0;
function getAge(dateStart, dateEnd) {
    //@ts-ignore
    return (dateStart - dateEnd) / (1000 * 60 * 60 * 24 * 365.25);
}
exports.getAge = getAge;

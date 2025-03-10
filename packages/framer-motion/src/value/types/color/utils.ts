import { Color } from "../types"
import { floatRegex, isString, singleColorRegex } from "../utils"

/**
 * Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
 * but false if a number or multiple colors
 */
export const isColorString = (type: string, testProp?: string) => (v: any) => {
    return Boolean(
        (isString(v) && singleColorRegex.test(v) && v.startsWith(type)) ||
            (testProp && Object.prototype.hasOwnProperty.call(v, testProp))
    )
}

export const splitColor =
    (aName: string, bName: string, cName: string) => (v: string | Color) => {
        if (!isString(v)) return v

        const [a, b, c, alpha] = v.match(floatRegex) as any

        return {
            [aName]: parseFloat(a),
            [bName]: parseFloat(b),
            [cName]: parseFloat(c),
            alpha: alpha !== undefined ? parseFloat(alpha) : 1,
        }
    }

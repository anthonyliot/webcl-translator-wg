export type CLboolean = boolean;
export type CLint = number;
export type CLuint = number;
export type CLlong = number;
export type CLulong = number;
export type CLenum = number;
// export callback
export type WebCLCallback = (status: CLenum, userdata: any) => void;
// export typed array
export type WebCLTypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

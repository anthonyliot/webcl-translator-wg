import { WebCLDevice } from "./webcldevice";
import { CLenum, WebCLCallback } from "./webcltype";
import { WebCLKernel } from './webclkernel';
import { WebCLException } from "./webclexception";
import { WebCLConstantStr, WebCLConstants } from "./webclconstants";
import { WebCLPlatform } from "./webclplatform";
import { WebCLContext } from "./webclcontext";
import { WebCLKernelArgInfo } from "./webclkernelarginfo";

export class WebCLProgram {

    // WebGPU Objects
    wclShader: GPUShaderModule;

    // WebCL Objects
    wclPlatform: WebCLPlatform;
    wclDevice: WebCLDevice;
    wclContext: WebCLContext;

    // Others
    source: string;
    kernels: Array<WebCLKernel> = [];
    shaderError: string | null = null;
    shaderOptions: string | null = null;

    constructor(wcl_platform: WebCLPlatform, wcl_device: WebCLDevice, wcl_context: WebCLContext, source: string) {
        this.wclPlatform = wcl_platform;
        this.wclDevice = wcl_device;
        this.wclContext = wcl_context;
        this.source = source;
    }

    getInfo(name: CLenum): any {
        switch (name) {
            case WebCLConstants.PROGRAM_NUM_DEVICES:
                return this.wclPlatform.getDevices().length;
            case WebCLConstants.PROGRAM_DEVICES:
                return this.wclPlatform.getDevices();
            case WebCLConstants.PROGRAM_CONTEXT:
                return this.wclContext;
            case WebCLConstants.PROGRAM_SOURCE:
                return this.source;
            default:
                throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLProgram.getInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    getBuildInfo(device: WebCLDevice, name: CLenum): any {
        device;

        switch (name) {
            case WebCLConstants.PROGRAM_BUILD_STATUS:
                return this.shaderError == null ? WebCLConstants.SUCCESS : WebCLConstants.BUILD_PROGRAM_FAILURE;
            case WebCLConstants.PROGRAM_BUILD_OPTIONS:
                return this.shaderOptions;
            case WebCLConstants.PROGRAM_BUILD_LOG:
                return this.shaderError;
            default:
                throw new WebCLException(WebCLConstants.INVALID_VALUE, "[INVALID_VALUE] WebCLProgram.getBuildInfo(): unknown parameter '" + WebCLConstantStr(name) + "'");
        }
    }
    build(_?: Array<WebCLDevice> | null, options?: string | null, whenFinished?: WebCLCallback): void {
        // Parsing the kernel to get signature information and name information
        this.parseKernel()

        this.shaderOptions = options;
        this.wclDevice.wgpuDevice.pushErrorScope("validation");
        // TODO: Need to do use the kernel source code transpose to webgpu
        this.wclShader = this.wclDevice.wgpuDevice.createShaderModule({
            code: `
@group(0) @binding(0) var<storage, read_write> input : array<f32>;
@group(0) @binding(1) var<storage, read_write> output : array<f32>;
@group(0) @binding(2) var<storage, read_write> count : u32;

@compute @workgroup_size(1)
fn main(@builtin(global_invocation_id) get_global_id : vec3<u32>) {
let i = get_global_id.x;
//if (i < count) {
    output[i] = f32(i);//input[i] * input[i];
//}
}
    `,
        });
        this.wclDevice.wgpuDevice.popErrorScope().then((error) => {
            if (error) {
                this.shaderError = error.message;
                if (whenFinished) {
                    whenFinished(WebCLConstants.BUILD_PROGRAM_FAILURE, null);
                }
            } else {
                if (whenFinished) {
                    whenFinished(WebCLConstants.SUCCESS, null);
                }
            }
        });
    }
    createKernel(kernelName: string): WebCLKernel {
        const kernel = this.kernels.find(kernel => kernel.kernelName === kernelName);
        if (kernel) {
            return kernel;
        }

        return null;
    }

    createKernelsInProgram(): Array<WebCLKernel> {
        return this.kernels;
    }
    release(): void { }

    parseType(str: string): WebCLConstants {
        var _value = -1;
        // First ulong for the webcl validator
        if ((str.indexOf("ulong") >= 0) || (str.indexOf("unsigned long") >= 0)) {
            // \todo : long ????
            _value = 0x1304 /*WebCLConstants.UNSIGNED_LONG*/;
        } else if (str.indexOf("long") >= 0) {
            _value = 0x1303 /*WebCLConstants.SIGNED_LONG*/;
        } else if (str.indexOf("float") >= 0) {
            _value = WebCLConstants.FLOAT;
        } else if ((str.indexOf("uchar") >= 0) || (str.indexOf("unsigned char") >= 0)) {
            _value = WebCLConstants.UNSIGNED_INT8;
        } else if (str.indexOf("char") >= 0) {
            _value = WebCLConstants.SIGNED_INT8;
        } else if ((str.indexOf("ushort") >= 0) || (str.indexOf("unsigned short") >= 0)) {
            _value = WebCLConstants.UNSIGNED_INT16;
        } else if (str.indexOf("short") >= 0) {
            _value = WebCLConstants.SIGNED_INT16;
        } else if ((str.indexOf("uint") >= 0) || (str.indexOf("unsigned int") >= 0) || (str.indexOf("size_t") >= 0)) {
            _value = WebCLConstants.UNSIGNED_INT32;
        } else if ((str.indexOf("int") >= 0) || (str.indexOf("enum") >= 0)) {
            _value = WebCLConstants.SIGNED_INT32;
        } else if (str.indexOf("image3d_t") >= 0) {
            _value = 0x1302 /*WebCLConstants.IMAGE3D*/;
        } else if (str.indexOf("image2d_t") >= 0) {
            _value = 0x1301 /*WebCLConstants.IMAGE2D*/;
        } else if (str.indexOf("sampler_t") >= 0) {
            _value = 0x1300 /*WebCLConstants.SAMPLER*/;
        }

        return _value;
    }

    // Kernel parser
    parseKernel(): void {
        // Remove all comments ...
        let _mini_kernel_string = this.source.replace(/(?:((["'])(?:(?:\\\\)|\\\2|(?!\\\2)\\|(?!\2).|[\n\r])*\2)|(\/\*(?:(?!\*\/).|[\n\r])*\*\/)|(\/\/[^\n\r]*(?:[\n\r]+|$))|((?:=|:)\s*(?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/))|((?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/)[gimy]?\.(?:exec|test|match|search|replace|split)\()|(\.(?:exec|test|match|search|replace|split)\((?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/))|(<!--(?:(?!-->).)*-->))/g, "");
        let _depth = 0;
        let _bodypart = '';
        let _pattern = "kernel ";
        let _kernel = _mini_kernel_string.indexOf(_pattern);

        while (_kernel != -1) {
            _mini_kernel_string = _mini_kernel_string.substring(_kernel + _pattern.length);

            const open_bracket = _mini_kernel_string.indexOf("{");
            // Get a one line name + signature of the kernel
            let name_and_signature = _mini_kernel_string.substring(0, open_bracket)
            name_and_signature = name_and_signature.replace(/\n/g, " ");
            name_and_signature = name_and_signature.replace(/\r/g, " ");
            name_and_signature = name_and_signature.replace(/\s{2,}/g, " ")

            const regex = /(\w+)\s*\((.*)\)/;
            const match = regex.exec(name_and_signature);

            if (match) {
                // Parse the name
                let _namepart = match[1];
                _namepart = _namepart.replace(/\s{2,}/g, " ")

                // Parse the arguments
                let functionArgs = match[2];
                functionArgs = functionArgs.replace(/\s{2,}/g, " ")
                let _argspart: Array<WebCLKernelArgInfo> = [];
                functionArgs.split(",").forEach((arg: string) => {
                    const elements = arg.split(" ");
                    const name = elements[elements.length - 1];
                    let info = new WebCLKernelArgInfo()
                    let type = this.parseType(arg);
                    info.typeName = WebCLConstantStr(type);
                    if (arg.indexOf("*") >= 0) {
                        info.pointer = true;
                    } else {
                        info.pointer = false;
                    }
                    info.name = name;
                    info.type = type;
                    _argspart.push(info);
                });

                // Parse the rest of the body
                _mini_kernel_string = _mini_kernel_string.substring(open_bracket)
                for (let i = 0; i < _mini_kernel_string.length; i++) {
                    const char = _mini_kernel_string[i];
                    if (char === '{') {
                        _depth++;
                    } else if (char === '}') {
                        _depth--;
                    }
                    _bodypart += char;
                    if (_depth === 0) {
                        _bodypart = _bodypart.replace(/\s{2,}/g, " ")
                        this.kernels.push(new WebCLKernel(this.wclDevice, this.wclContext, this, _namepart, _argspart, _bodypart));
                        _bodypart = ""
                        break;
                    }
                }
            }

            // Search for another kernel
            _kernel = _mini_kernel_string.indexOf(_pattern);
        }
    }
}

// // Kernel parser
// cl_kernels_sig: { },
// // Structs Kernels parser
// cl_structs_sig: { },
// parseStruct: function(kernel_string, struct_name) {
//     // Experimental parse of Struct
//     // Search kernel function like 'struct_name { }' or '{ } struct_name'
//     // --------------------------------------------------------------------------------
//     // Step 1 : Search pattern struct_name { }
//     // Step 2 : if no result : Search pattern { } struct_name
//     // Step 3 : if no result : return
//     // Step 4 : split by ; // Num of variable of the structure  : int toto; float tata;
//     // Step 5 : split by , // Num of variable for each type     : float toto,tata,titi;
//     // Step 6 : Search pattern [num] // Array Variable          : float toto[4];
//     // Step 7 : Search type of the line
//     // Step 8 : if exist add type else search other struct
//     // --------------------------------------------------------------------------------
//     CL.cl_structs_sig[struct_name] = [];
//     // First search if is #define
//     var _re_define = new RegExp("#[\ ]*define[\ ]*" + struct_name + "[\ ]*[A-Za-z0-9_\s]*");
//     var _define = kernel_string.match(_re_define);
//     if (_define != null && _define.length == 1) {
//         // Get type of the line
//         var _str = _define[0];
//         var _type = CL.parseType(_str);
//         if (_type != -1) {
//             CL.cl_structs_sig[struct_name].push(_type);
//         } else {
//             var _lastSpace = _str.lastIndexOf(" ");
//             var _res = _str.substr(_lastSpace + 1, _str.length - _lastSpace);
//             CL.parseStruct(kernel_string, _res);
//         }
//         return;
//     }
//     // Second search if is typedef type name;
//     var _re_typedef = new RegExp("typedef[\ ]*[A-Za-z0-9_\s]*[\ ]*" + struct_name + "[\ ]*;");
//     var _typedef = kernel_string.match(_re_typedef);
//     if (_typedef != null && _typedef.length == 1) {
//         // Get type of the line
//         var _str = _typedef[0];
//         var _type = CL.parseType(_str);
//         if (_type != -1) {
//             CL.cl_structs_sig[struct_name].push(_type);
//         } else {
//             _str = _str.replace(/^\s+|\s+$/g, ""); // trim
//             var _firstSpace = _str.indexOf(" ");
//             var _lastSpace = _str.lastIndexOf(" ");
//             var _res = _str.substr(_firstSpace + 1, _lastSpace - _firstSpace - 1);
//             CL.parseStruct(kernel_string, _res);
//         }
//         return;
//     }
//     // search pattern : struct_name { } ;
//     var _re_before = new RegExp(struct_name + "[\ ]" + "\{([^}]+)\}");
//     // search pattern : { } struct_name;
//     var _re_after = new RegExp("\{([^}]+)\}" + "[\ ]" + struct_name);
//     var _res = kernel_string.match(_re_before);
//     var _contains_struct = "";
//     if (_res != null && _res.length == 2) {
//         _contains_struct = _res[1];
//     } else {
//         _res = kernel_string.match(_re_after);
//         if (_res != null && _res.length == 2) {
//             _contains_struct = _res[1];
//         } else {
//             #if CL_DEBUG
//             console.error("Unknow Structure '" + struct_name + "', not found inside the kernel ...");
//             #endif
//             return;
//         }
//     }
//     var _var = _contains_struct.split(";");
//     for (var i = 0; i < _var.length - 1; i++) {
//         // Need for unsigned int width, height;
//         var _subvar = _var[i].split(",");
//         // Get type of the line
//         var _type = CL.parseType(_var[i]);
//         // Need for float mu[4];
//         var _arrayNum = 0;
//         _res = _var[i].match(/[0-9]+/);
//         if (_res != null) _arrayNum = _res;
//         if (_type != -1) {
//             for (var j = 0; j < Math.max(_subvar.length, _arrayNum); j++) {
//                 CL.cl_structs_sig[struct_name].push(_type);
//             }
//         } else {
//             // Search name of the parameter
//             var _struct = _subvar[0].replace(/^\s+|\s+$/g, ""); // trim
//             var _name = "";
//             var _start = _struct.lastIndexOf(" ");
//             for (var j = _start - 1; j >= 0; j--) {
//                 var _chara = _struct.charAt(j);
//                 if (_chara == ' ' && _name.length > 0) {
//                     break;
//                 } else if (_chara != ' ') {
//                     _name = _chara + _name;
//                 }
//             }
//             // If struct is unknow search it
//             if (!(_name in CL.cl_structs_sig && CL.cl_structs_sig[_name].length > 0)) {
//                 CL.parseStruct(kernel_string, _name);
//             }
//             for (var j = 0; j < Math.max(_subvar.length, _arrayNum); j++) {
//                 CL.cl_structs_sig[struct_name] = CL.cl_structs_sig[struct_name].concat(CL.cl_structs_sig[_name]);
//             }
//         }
//     }
// },
// parseKernel: function(kernel_string) {
//     #if 0
//     console.info("Original Kernel String : ");
//     console.info("--------------------------------------------------------------------");
//     console.info(kernel_string);
//     console.info("--------------------------------------------------------------------");
//     #endif
//     // Experimental parse of Kernel
//     // ----------------------------
//     //
//     // /!\ The minify kernel could be use by the program but some trouble with line
//     // /!\ containing macro #define, for the moment only use the minify kernel for
//     // /!\ parsing __kernel and struct
//     //
//     // Search kernel function like __kernel ... NAME ( p1 , p2 , p3)
//     // --------------------------------------------------------------------------------
//     // Step 1 : Minimize kernel removing all the comment and \r \n \t and multispace
//     // Step 2 : Search pattern __kernel ... ( ... )
//     // Step 3 : For each kernel
//     // Step 3 . 1 : Search Open Brace
//     // Step 3 . 2 : Search Kernel Name
//     // Step 3 . 3 : Search Kernel Parameter
//     // Step 3 . 4 : Grab { name : [ param, ... ] }
//     // --------------------------------------------------------------------------------
//     // Remove all comments ...
//     var _mini_kernel_string = kernel_string.replace(/(?:((["'])(?:(?:\\\\)|\\\2|(?!\\\2)\\|(?!\2).|[\n\r])*\2)|(\/\*(?:(?!\*\/).|[\n\r])*\*\/)|(\/\/[^\n\r]*(?:[\n\r]+|$))|((?:=|:)\s*(?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/))|((?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/)[gimy]?\.(?:exec|test|match|search|replace|split)\()|(\.(?:exec|test|match|search|replace|split)\((?:\/(?:(?:(?!\\*\/).)|\\\\|\\\/|[^\\]\[(?:\\\\|\\\]|[^]])+\])+\/))|(<!--(?:(?!-->).)*-->))/g
//         , "");
//     // Remove all char \n \r \t ...
//     _mini_kernel_string = _mini_kernel_string.replace(/\n/g, " ");
//     _mini_kernel_string = _mini_kernel_string.replace(/\r/g, " ");
//     // Remove all the multispace
//     _mini_kernel_string = _mini_kernel_string.replace(/\s{2,}/g, " ");
//     // Search pattern : __kernel ... ( ... )
//     // var _matches = _mini_kernel_string.match(/__kernel[A-Za-z0-9_\s]+\(([^)]+)\)/g);
//     // if (_matches == null) {
//     //   console.error("/!\\ Not found kernel !!!");
//     //   return;
//     // }
//     // Search kernel (Pattern doesn't work with extra __attribute__)
//     var _matches = [];
//     var _found = 1;
//     var _stringKern = _mini_kernel_string;
//     var _security = 50;
//     // Search all the kernel
//     while (_found && _security) {
//         // Just in case no more than 50 loop
//         _security--;
//         var _pattern = "__kernel ";
//         var _kern = _stringKern.indexOf(_pattern);
//         if (_kern == -1) {
//             _pattern = " kernel ";
//             _kern = _stringKern.indexOf(" kernel ");
//             if (_kern == -1) {
//                 _pattern = "kernel ";
//                 _kern = _stringKern.indexOf("kernel ");
//                 if (_kern == -1) {
//                     _found = 0;
//                     continue;
//                 } else if (_kern != 0) {
//                     console.error("/!\\ Find word 'kernel' but is not a real kernel  .. (" + _kern + ")");
//                     _stringKern = _stringKern.substr(_kern + _pattern.length, _stringKern.length - _kern);
//                     continue;
//                 }
//             }
//         }
//         _stringKern = _stringKern.substr(_kern + _pattern.length, _stringKern.length - _kern);
//         var _brace = _stringKern.indexOf("{");
//         var _stringKern2 = _stringKern.substr(0, _brace);
//         var _braceOpen = _stringKern2.lastIndexOf("(");
//         var _braceClose = _stringKern2.lastIndexOf(")");
//         var _stringKern3 = _stringKern2.substr(0, _braceOpen).replace(/^\s+|\s+$/g, ""); // trim
//         var _space = _stringKern3.lastIndexOf(" ");
//         _stringKern2 = _stringKern2.substr(_space + 1, _braceClose);
//         // Add the kernel result like name_kernel(..., ... ,...)
//         _matches.push(_stringKern2);
//     }
//     // For each kernel ....
//     for (var i = 0; i < _matches.length; i++) {
//         // Search the open Brace
//         var _brace = _matches[i].lastIndexOf("(");
//         // Part before '('
//         var _first_part = _matches[i].substr(0, _brace);
//         _first_part = _first_part.replace(/^\s+|\s+$/g, ""); // trim
//         // Part after ')'
//         var _second_part = _matches[i].substr(_brace + 1, _matches[i].length - _brace - 2);
//         _second_part = _second_part.replace(/^\s+|\s+$/g, ""); // trim
//         // Search name part
//         var _name = _first_part.substr(_first_part.lastIndexOf(" ") + 1);
//         // If name already present reparse it may be is another test with not the same num of parameter ....
//         if (_name in CL.cl_kernels_sig) {
//             delete CL.cl_kernels_sig[_name]
//         }
//         // Search parameter part
//         var _param = [];
//         var _array = _second_part.split(",");
//         for (var j = 0; j < _array.length; j++) {
//             var _type = CL.parseType(_array[j]);
//             if (_array[j].indexOf("__local") >= 0) {
//                 _param.push(WebCLConstants.LOCAL);
//             } else if (_type == -1) {
//                 _array[j] = _array[j].replace(/^\s+|\s+$/g, "");
//                 _array[j] = _array[j].replace("*", "");
//                 var _start = _array[j].lastIndexOf(" ");
//                 if (_start != -1) {
//                     var _kernels_struct_name = "";
//                     // Search Parameter type Name
//                     for (var k = _start - 1; k >= 0; k--) {
//                         var _chara = _array[j].charAt(k);
//                         if (_chara == ' ' && _kernels_struct_name.length > 0) {
//                             break;
//                         } else if (_chara != ' ') {
//                             _kernels_struct_name = _chara + _kernels_struct_name;
//                         }
//                     }
//                     // Parse struct only if is not already inside the map
//                     if (!(_kernels_struct_name in CL.cl_structs_sig))
//                         CL.parseStruct(_mini_kernel_string, _kernels_struct_name);
//                     // Add the name of the struct inside the map of param kernel
//                     _param.push(_kernels_struct_name);
//                 } else {
//                     #if CL_DEBUG
//                     console.error("Unknow parameter type inside '" + _array[j] + "', can be a struct, use float by default ...");
//                     #endif
//                     _param.push(WebCLConstants.FLOAT);
//                 }
//             } else {
//                 _param.push(_type);
//             }
//         }
//         CL.cl_kernels_sig[_name] = _param;
//     }
//     #if 0
//     console.info("Mini Kernel String : ");
//     console.info("--------------------------------------------------------------------");
//     console.info(_mini_kernel_string);
//     console.info("--------------------------------------------------------------------");
//     #endif
//     #if 0
//     for (var name in CL.cl_kernels_sig) {
//         var _length = CL.cl_kernels_sig[name].length;
//         var _str = "";
//         for (var i = 0; i < _length; i++) {
//             var _type = CL.cl_kernels_sig[name][i];
//             _str += _type + "(" + CL.stringType(_type) + ")";
//             if (i < _length - 1) _str += ", ";
//         }
//         console.info("Kernel " + name + "(" + _length + ")");
//         console.info("\t" + _str);
//     }
//     for (var name in CL.cl_structs_sig) {
//         var _length = CL.cl_structs_sig[name].length;
//         var _str = "";
//         for (var i = 0; i < _length; i++) {
//             var _type = CL.cl_structs_sig[name][i];
//             _str += _type + "(" + CL.stringType(_type) + ")";
//             if (i < _length - 1) _str += ", ";
//         }
//         console.info("\n\tStruct " + name + "(" + _length + ")");
//         console.info("\t\t" + _str);
//     }
//     #endif
//     return _mini_kernel_string;
// },
// parseType: function(string) {
//     var _value = -1;
//     // First ulong for the webcl validator
//     if ((string.indexOf("ulong") >= 0) || (string.indexOf("unsigned long") >= 0)) {
//         // \todo : long ????
//         _value = 0x1304 /*WebCLConstants.UNSIGNED_LONG*/;
//     } else if (string.indexOf("long") >= 0) {
//         _value = 0x1303 /*WebCLConstants.SIGNED_LONG*/;
//     } else if (string.indexOf("float") >= 0) {
//         _value = WebCLConstants.FLOAT;
//     } else if ((string.indexOf("uchar") >= 0) || (string.indexOf("unsigned char") >= 0)) {
//         _value = WebCLConstants.UNSIGNED_INT8;
//     } else if (string.indexOf("char") >= 0) {
//         _value = WebCLConstants.SIGNED_INT8;
//     } else if ((string.indexOf("ushort") >= 0) || (string.indexOf("unsigned short") >= 0)) {
//         _value = WebCLConstants.UNSIGNED_INT16;
//     } else if (string.indexOf("short") >= 0) {
//         _value = WebCLConstants.SIGNED_INT16;
//     } else if ((string.indexOf("uint") >= 0) || (string.indexOf("unsigned int") >= 0) || (string.indexOf("size_t") >= 0)) {
//         _value = WebCLConstants.UNSIGNED_INT32;
//     } else if ((string.indexOf("int") >= 0) || (string.indexOf("enum") >= 0)) {
//         _value = WebCLConstants.SIGNED_INT32;
//     } else if (string.indexOf("image3d_t") >= 0) {
//         _value = 0x1302 /*WebCLConstants.IMAGE3D*/;
//     } else if (string.indexOf("image2d_t") >= 0) {
//         _value = 0x1301 /*WebCLConstants.IMAGE2D*/;
//     } else if (string.indexOf("sampler_t") >= 0) {
//         _value = 0x1300 /*WebCLConstants.SAMPLER*/;
//     }
//     return _value;
// },

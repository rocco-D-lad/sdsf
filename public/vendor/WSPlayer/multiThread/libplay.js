function GROWABLE_HEAP_I8() {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer)
  }
  return HEAP8
}
function GROWABLE_HEAP_U8() {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer)
  }
  return HEAPU8
}
function GROWABLE_HEAP_I16() {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer)
  }
  return HEAP16
}
function GROWABLE_HEAP_U16() {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer)
  }
  return HEAPU16
}
function GROWABLE_HEAP_I32() {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer)
  }
  return HEAP32
}
function GROWABLE_HEAP_U32() {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer)
  }
  return HEAPU32
}
function GROWABLE_HEAP_F32() {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer)
  }
  return HEAPF32
}
function GROWABLE_HEAP_F64() {
  if (wasmMemory.buffer != buffer) {
    updateGlobalBufferAndViews(wasmMemory.buffer)
  }
  return HEAPF64
}
var Module = typeof Module !== 'undefined' ? Module : {}
var moduleOverrides = {}
var key
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key]
  }
}
var arguments_ = []
var thisProgram = './this.program'
var quit_ = function (status, toThrow) {
  throw toThrow
}
var ENVIRONMENT_IS_WEB = false
var ENVIRONMENT_IS_WORKER = false
var ENVIRONMENT_IS_NODE = false
var ENVIRONMENT_IS_SHELL = false
ENVIRONMENT_IS_WEB = typeof window === 'object'
ENVIRONMENT_IS_WORKER = typeof importScripts === 'function'
ENVIRONMENT_IS_NODE =
  typeof process === 'object' &&
  typeof process.versions === 'object' &&
  typeof process.versions.node === 'string'
ENVIRONMENT_IS_SHELL =
  !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER
if (Module['ENVIRONMENT']) {
  throw new Error(
    'Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)'
  )
}
var ENVIRONMENT_IS_PTHREAD = Module['ENVIRONMENT_IS_PTHREAD'] || false
if (ENVIRONMENT_IS_PTHREAD) {
  buffer = Module['buffer']
}
var _scriptDir =
  typeof document !== 'undefined' && document.currentScript
    ? document.currentScript.src
    : undefined
if (ENVIRONMENT_IS_WORKER) {
  _scriptDir = self.location.href
} else if (ENVIRONMENT_IS_NODE) {
  _scriptDir = __filename
}
var scriptDirectory = ''
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory)
  }
  return scriptDirectory + path
}
var read_, readAsync, readBinary, setWindowTitle
var nodeFS
var nodePath
if (ENVIRONMENT_IS_NODE) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = require('path').dirname(scriptDirectory) + '/'
  } else {
    scriptDirectory = __dirname + '/'
  }
  read_ = function shell_read(filename, binary) {
    if (!nodeFS) nodeFS = require('fs')
    if (!nodePath) nodePath = require('path')
    filename = nodePath['normalize'](filename)
    return nodeFS['readFileSync'](filename, binary ? null : 'utf8')
  }
  readBinary = function readBinary(filename) {
    var ret = read_(filename, true)
    if (!ret.buffer) {
      ret = new Uint8Array(ret)
    }
    assert(ret.buffer)
    return ret
  }
  if (process['argv'].length > 1) {
    thisProgram = process['argv'][1].replace(/\\/g, '/')
  }
  arguments_ = process['argv'].slice(2)
  if (typeof module !== 'undefined') {
    module['exports'] = Module
  }
  process['on']('uncaughtException', function (ex) {
    if (!(ex instanceof ExitStatus)) {
      throw ex
    }
  })
  process['on']('unhandledRejection', abort)
  quit_ = function (status) {
    process['exit'](status)
  }
  Module['inspect'] = function () {
    return '[Emscripten Module object]'
  }
  var nodeWorkerThreads
  try {
    nodeWorkerThreads = require('worker_threads')
  } catch (e) {
    console.error(
      'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'
    )
    throw e
  }
  global.Worker = nodeWorkerThreads.Worker
} else if (ENVIRONMENT_IS_SHELL) {
  if (typeof read != 'undefined') {
    read_ = function shell_read(f) {
      return read(f)
    }
  }
  readBinary = function readBinary(f) {
    var data
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f))
    }
    data = read(f, 'binary')
    assert(typeof data === 'object')
    return data
  }
  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments
  }
  if (typeof quit === 'function') {
    quit_ = function (status) {
      quit(status)
    }
  }
  if (typeof print !== 'undefined') {
    if (typeof console === 'undefined') console = {}
    console.log = print
    console.warn = console.error =
      typeof printErr !== 'undefined' ? printErr : print
  }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = self.location.href
  } else if (typeof document !== 'undefined' && document.currentScript) {
    scriptDirectory = document.currentScript.src
  }
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(
      0,
      scriptDirectory.lastIndexOf('/') + 1
    )
  } else {
    scriptDirectory = ''
  }
  if (ENVIRONMENT_IS_NODE) {
    read_ = function shell_read(filename, binary) {
      if (!nodeFS) nodeFS = require('fs')
      if (!nodePath) nodePath = require('path')
      filename = nodePath['normalize'](filename)
      return nodeFS['readFileSync'](filename, binary ? null : 'utf8')
    }
    readBinary = function readBinary(filename) {
      var ret = read_(filename, true)
      if (!ret.buffer) {
        ret = new Uint8Array(ret)
      }
      assert(ret.buffer)
      return ret
    }
  } else {
    read_ = function (url) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url, false)
      xhr.send(null)
      return xhr.responseText
    }
    if (ENVIRONMENT_IS_WORKER) {
      readBinary = function (url) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, false)
        xhr.responseType = 'arraybuffer'
        xhr.send(null)
        return new Uint8Array(xhr.response)
      }
    }
    readAsync = function (url, onload, onerror) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'arraybuffer'
      xhr.onload = function () {
        if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
          onload(xhr.response)
          return
        }
        onerror()
      }
      xhr.onerror = onerror
      xhr.send(null)
    }
  }
  setWindowTitle = function (title) {
    document.title = title
  }
} else {
  throw new Error('environment detection error')
}
if (ENVIRONMENT_IS_NODE) {
  if (typeof performance === 'undefined') {
    global.performance = require('perf_hooks').performance
  }
}
var out = Module['print'] || console.log.bind(console)
var err = Module['printErr'] || console.warn.bind(console)
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key]
  }
}
moduleOverrides = null
if (Module['arguments']) arguments_ = Module['arguments']
if (!Object.getOwnPropertyDescriptor(Module, 'arguments')) {
  Object.defineProperty(Module, 'arguments', {
    configurable: true,
    get: function () {
      abort(
        'Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
      )
    }
  })
}
if (Module['thisProgram']) thisProgram = Module['thisProgram']
if (!Object.getOwnPropertyDescriptor(Module, 'thisProgram')) {
  Object.defineProperty(Module, 'thisProgram', {
    configurable: true,
    get: function () {
      abort(
        'Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
      )
    }
  })
}
if (Module['quit']) quit_ = Module['quit']
if (!Object.getOwnPropertyDescriptor(Module, 'quit')) {
  Object.defineProperty(Module, 'quit', {
    configurable: true,
    get: function () {
      abort(
        'Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
      )
    }
  })
}
assert(
  typeof Module['memoryInitializerPrefixURL'] === 'undefined',
  'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead'
)
assert(
  typeof Module['pthreadMainPrefixURL'] === 'undefined',
  'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead'
)
assert(
  typeof Module['cdInitializerPrefixURL'] === 'undefined',
  'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead'
)
assert(
  typeof Module['filePackagePrefixURL'] === 'undefined',
  'Module.filePackagePrefixURL option was removed, use Module.locateFile instead'
)
assert(
  typeof Module['read'] === 'undefined',
  'Module.read option was removed (modify read_ in JS)'
)
assert(
  typeof Module['readAsync'] === 'undefined',
  'Module.readAsync option was removed (modify readAsync in JS)'
)
assert(
  typeof Module['readBinary'] === 'undefined',
  'Module.readBinary option was removed (modify readBinary in JS)'
)
assert(
  typeof Module['setWindowTitle'] === 'undefined',
  'Module.setWindowTitle option was removed (modify setWindowTitle in JS)'
)
assert(
  typeof Module['TOTAL_MEMORY'] === 'undefined',
  'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY'
)
if (!Object.getOwnPropertyDescriptor(Module, 'read')) {
  Object.defineProperty(Module, 'read', {
    configurable: true,
    get: function () {
      abort(
        'Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
      )
    }
  })
}
if (!Object.getOwnPropertyDescriptor(Module, 'readAsync')) {
  Object.defineProperty(Module, 'readAsync', {
    configurable: true,
    get: function () {
      abort(
        'Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
      )
    }
  })
}
if (!Object.getOwnPropertyDescriptor(Module, 'readBinary')) {
  Object.defineProperty(Module, 'readBinary', {
    configurable: true,
    get: function () {
      abort(
        'Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
      )
    }
  })
}
if (!Object.getOwnPropertyDescriptor(Module, 'setWindowTitle')) {
  Object.defineProperty(Module, 'setWindowTitle', {
    configurable: true,
    get: function () {
      abort(
        'Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
      )
    }
  })
}
assert(
  ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER || ENVIRONMENT_IS_NODE,
  'Pthreads do not work in this environment yet (need Web Workers, or an alternative to them)'
)
var STACK_ALIGN = 16
function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN
  return Math.ceil(size / factor) * factor
}
function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {}
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1
    err(text)
  }
}
function convertJsFunctionToWasm(func, sig) {
  if (typeof WebAssembly.Function === 'function') {
    var typeNames = { i: 'i32', j: 'i64', f: 'f32', d: 'f64' }
    var type = {
      parameters: [],
      results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
    }
    for (var i = 1; i < sig.length; ++i) {
      type.parameters.push(typeNames[sig[i]])
    }
    return new WebAssembly.Function(type, func)
  }
  var typeSection = [1, 0, 1, 96]
  var sigRet = sig.slice(0, 1)
  var sigParam = sig.slice(1)
  var typeCodes = { i: 127, j: 126, f: 125, d: 124 }
  typeSection.push(sigParam.length)
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]])
  }
  if (sigRet == 'v') {
    typeSection.push(0)
  } else {
    typeSection = typeSection.concat([1, typeCodes[sigRet]])
  }
  typeSection[1] = typeSection.length - 2
  var bytes = new Uint8Array(
    [0, 97, 115, 109, 1, 0, 0, 0].concat(
      typeSection,
      [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0]
    )
  )
  var module = new WebAssembly.Module(bytes)
  var instance = new WebAssembly.Instance(module, { e: { f: func } })
  var wrappedFunc = instance.exports['f']
  return wrappedFunc
}
var freeTableIndexes = []
var functionsInTableMap
function getEmptyTableSlot() {
  if (freeTableIndexes.length) {
    return freeTableIndexes.pop()
  }
  try {
    wasmTable.grow(1)
  } catch (err) {
    if (!(err instanceof RangeError)) {
      throw err
    }
    throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.'
  }
  return wasmTable.length - 1
}
function addFunctionWasm(func, sig) {
  if (!functionsInTableMap) {
    functionsInTableMap = new WeakMap()
    for (var i = 0; i < wasmTable.length; i++) {
      var item = wasmTable.get(i)
      if (item) {
        functionsInTableMap.set(item, i)
      }
    }
  }
  if (functionsInTableMap.has(func)) {
    return functionsInTableMap.get(func)
  }
  var ret = getEmptyTableSlot()
  try {
    wasmTable.set(ret, func)
  } catch (err) {
    if (!(err instanceof TypeError)) {
      throw err
    }
    assert(
      typeof sig !== 'undefined',
      'Missing signature argument to addFunction: ' + func
    )
    var wrapped = convertJsFunctionToWasm(func, sig)
    wasmTable.set(ret, wrapped)
  }
  functionsInTableMap.set(func, ret)
  return ret
}
var tempRet0 = 0
var setTempRet0 = function (value) {
  tempRet0 = value
}
var Atomics_load = Atomics.load
var Atomics_store = Atomics.store
var Atomics_compareExchange = Atomics.compareExchange
var wasmBinary
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary']
if (!Object.getOwnPropertyDescriptor(Module, 'wasmBinary')) {
  Object.defineProperty(Module, 'wasmBinary', {
    configurable: true,
    get: function () {
      abort(
        'Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
      )
    }
  })
}
var noExitRuntime = Module['noExitRuntime'] || true
if (!Object.getOwnPropertyDescriptor(Module, 'noExitRuntime')) {
  Object.defineProperty(Module, 'noExitRuntime', {
    configurable: true,
    get: function () {
      abort(
        'Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
      )
    }
  })
}
if (typeof WebAssembly !== 'object') {
  abort('no native wasm support detected')
}
var wasmMemory
var wasmModule
var ABORT = false
var EXITSTATUS
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text)
  }
}
function getCFunc(ident) {
  var func = Module['_' + ident]
  assert(
    func,
    'Cannot call unknown function ' + ident + ', make sure it is exported'
  )
  return func
}
function ccall(ident, returnType, argTypes, args, opts) {
  var toC = {
    string: function (str) {
      var ret = 0
      if (str !== null && str !== undefined && str !== 0) {
        var len = (str.length << 2) + 1
        ret = stackAlloc(len)
        stringToUTF8(str, ret, len)
      }
      return ret
    },
    array: function (arr) {
      var ret = stackAlloc(arr.length)
      writeArrayToMemory(arr, ret)
      return ret
    }
  }
  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret)
    if (returnType === 'boolean') return Boolean(ret)
    return ret
  }
  var func = getCFunc(ident)
  var cArgs = []
  var stack = 0
  assert(returnType !== 'array', 'Return type should not be "array".')
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]]
      if (converter) {
        if (stack === 0) stack = stackSave()
        cArgs[i] = converter(args[i])
      } else {
        cArgs[i] = args[i]
      }
    }
  }
  var ret = func.apply(null, cArgs)
  ret = convertReturnValue(ret)
  if (stack !== 0) stackRestore(stack)
  return ret
}
var ALLOC_STACK = 1
function UTF8ArrayToString(heap, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead
  var str = ''
  while (!(idx >= endIdx)) {
    var u0 = heap[idx++]
    if (!u0) return str
    if (!(u0 & 128)) {
      str += String.fromCharCode(u0)
      continue
    }
    var u1 = heap[idx++] & 63
    if ((u0 & 224) == 192) {
      str += String.fromCharCode(((u0 & 31) << 6) | u1)
      continue
    }
    var u2 = heap[idx++] & 63
    if ((u0 & 240) == 224) {
      u0 = ((u0 & 15) << 12) | (u1 << 6) | u2
    } else {
      if ((u0 & 248) != 240)
        warnOnce(
          'Invalid UTF-8 leading byte 0x' +
            u0.toString(16) +
            ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!'
        )
      u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63)
    }
    if (u0 < 65536) {
      str += String.fromCharCode(u0)
    } else {
      var ch = u0 - 65536
      str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
    }
  }
  return str
}
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(GROWABLE_HEAP_U8(), ptr, maxBytesToRead) : ''
}
function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) return 0
  var startIdx = outIdx
  var endIdx = outIdx + maxBytesToWrite - 1
  for (var i = 0; i < str.length; ++i) {
    var u = str.charCodeAt(i)
    if (u >= 55296 && u <= 57343) {
      var u1 = str.charCodeAt(++i)
      u = (65536 + ((u & 1023) << 10)) | (u1 & 1023)
    }
    if (u <= 127) {
      if (outIdx >= endIdx) break
      heap[outIdx++] = u
    } else if (u <= 2047) {
      if (outIdx + 1 >= endIdx) break
      heap[outIdx++] = 192 | (u >> 6)
      heap[outIdx++] = 128 | (u & 63)
    } else if (u <= 65535) {
      if (outIdx + 2 >= endIdx) break
      heap[outIdx++] = 224 | (u >> 12)
      heap[outIdx++] = 128 | ((u >> 6) & 63)
      heap[outIdx++] = 128 | (u & 63)
    } else {
      if (outIdx + 3 >= endIdx) break
      if (u >= 2097152)
        warnOnce(
          'Invalid Unicode code point 0x' +
            u.toString(16) +
            ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x1FFFFF).'
        )
      heap[outIdx++] = 240 | (u >> 18)
      heap[outIdx++] = 128 | ((u >> 12) & 63)
      heap[outIdx++] = 128 | ((u >> 6) & 63)
      heap[outIdx++] = 128 | (u & 63)
    }
  }
  heap[outIdx] = 0
  return outIdx - startIdx
}
function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(
    typeof maxBytesToWrite == 'number',
    'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!'
  )
  return stringToUTF8Array(str, GROWABLE_HEAP_U8(), outPtr, maxBytesToWrite)
}
function lengthBytesUTF8(str) {
  var len = 0
  for (var i = 0; i < str.length; ++i) {
    var u = str.charCodeAt(i)
    if (u >= 55296 && u <= 57343)
      u = (65536 + ((u & 1023) << 10)) | (str.charCodeAt(++i) & 1023)
    if (u <= 127) ++len
    else if (u <= 2047) len += 2
    else if (u <= 65535) len += 3
    else len += 4
  }
  return len
}
function UTF16ToString(ptr, maxBytesToRead) {
  assert(
    ptr % 2 == 0,
    'Pointer passed to UTF16ToString must be aligned to two bytes!'
  )
  var str = ''
  for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
    var codeUnit = GROWABLE_HEAP_I16()[(ptr + i * 2) >> 1]
    if (codeUnit == 0) break
    str += String.fromCharCode(codeUnit)
  }
  return str
}
function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(
    outPtr % 2 == 0,
    'Pointer passed to stringToUTF16 must be aligned to two bytes!'
  )
  assert(
    typeof maxBytesToWrite == 'number',
    'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!'
  )
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 2147483647
  }
  if (maxBytesToWrite < 2) return 0
  maxBytesToWrite -= 2
  var startPtr = outPtr
  var numCharsToWrite =
    maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length
  for (var i = 0; i < numCharsToWrite; ++i) {
    var codeUnit = str.charCodeAt(i)
    GROWABLE_HEAP_I16()[outPtr >> 1] = codeUnit
    outPtr += 2
  }
  GROWABLE_HEAP_I16()[outPtr >> 1] = 0
  return outPtr - startPtr
}
function lengthBytesUTF16(str) {
  return str.length * 2
}
function UTF32ToString(ptr, maxBytesToRead) {
  assert(
    ptr % 4 == 0,
    'Pointer passed to UTF32ToString must be aligned to four bytes!'
  )
  var i = 0
  var str = ''
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = GROWABLE_HEAP_I32()[(ptr + i * 4) >> 2]
    if (utf32 == 0) break
    ++i
    if (utf32 >= 65536) {
      var ch = utf32 - 65536
      str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
    } else {
      str += String.fromCharCode(utf32)
    }
  }
  return str
}
function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(
    outPtr % 4 == 0,
    'Pointer passed to stringToUTF32 must be aligned to four bytes!'
  )
  assert(
    typeof maxBytesToWrite == 'number',
    'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!'
  )
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 2147483647
  }
  if (maxBytesToWrite < 4) return 0
  var startPtr = outPtr
  var endPtr = startPtr + maxBytesToWrite - 4
  for (var i = 0; i < str.length; ++i) {
    var codeUnit = str.charCodeAt(i)
    if (codeUnit >= 55296 && codeUnit <= 57343) {
      var trailSurrogate = str.charCodeAt(++i)
      codeUnit = (65536 + ((codeUnit & 1023) << 10)) | (trailSurrogate & 1023)
    }
    GROWABLE_HEAP_I32()[outPtr >> 2] = codeUnit
    outPtr += 4
    if (outPtr + 4 > endPtr) break
  }
  GROWABLE_HEAP_I32()[outPtr >> 2] = 0
  return outPtr - startPtr
}
function lengthBytesUTF32(str) {
  var len = 0
  for (var i = 0; i < str.length; ++i) {
    var codeUnit = str.charCodeAt(i)
    if (codeUnit >= 55296 && codeUnit <= 57343) ++i
    len += 4
  }
  return len
}
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1
  var ret = _malloc(size)
  if (ret) stringToUTF8Array(str, GROWABLE_HEAP_I8(), ret, size)
  return ret
}
function writeArrayToMemory(array, buffer) {
  assert(
    array.length >= 0,
    'writeArrayToMemory array must have a length (should be an array or typed array)'
  )
  GROWABLE_HEAP_I8().set(array, buffer)
}
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert((str.charCodeAt(i) === str.charCodeAt(i)) & 255)
    GROWABLE_HEAP_I8()[buffer++ >> 0] = str.charCodeAt(i)
  }
  if (!dontAddNull) GROWABLE_HEAP_I8()[buffer >> 0] = 0
}
function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple)
  }
  return x
}
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64
function updateGlobalBufferAndViews(buf) {
  buffer = buf
  Module['HEAP8'] = HEAP8 = new Int8Array(buf)
  Module['HEAP16'] = HEAP16 = new Int16Array(buf)
  Module['HEAP32'] = HEAP32 = new Int32Array(buf)
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf)
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf)
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf)
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buf)
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buf)
}
var TOTAL_STACK = 5242880
if (Module['TOTAL_STACK'])
  assert(
    TOTAL_STACK === Module['TOTAL_STACK'],
    'the stack size can no longer be determined at runtime'
  )
var INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 1073741824
if (!Object.getOwnPropertyDescriptor(Module, 'INITIAL_MEMORY')) {
  Object.defineProperty(Module, 'INITIAL_MEMORY', {
    configurable: true,
    get: function () {
      abort(
        'Module.INITIAL_MEMORY has been replaced with plain INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'
      )
    }
  })
}
assert(
  INITIAL_MEMORY >= TOTAL_STACK,
  'INITIAL_MEMORY should be larger than TOTAL_STACK, was ' +
    INITIAL_MEMORY +
    '! (TOTAL_STACK=' +
    TOTAL_STACK +
    ')'
)
assert(
  typeof Int32Array !== 'undefined' &&
    typeof Float64Array !== 'undefined' &&
    Int32Array.prototype.subarray !== undefined &&
    Int32Array.prototype.set !== undefined,
  'JS engine does not provide full typed array support'
)
if (ENVIRONMENT_IS_PTHREAD) {
  wasmMemory = Module['wasmMemory']
  buffer = Module['buffer']
} else {
  if (Module['wasmMemory']) {
    wasmMemory = Module['wasmMemory']
  } else {
    wasmMemory = new WebAssembly.Memory({
      initial: INITIAL_MEMORY / 65536,
      maximum: 2147483648 / 65536,
      shared: true
    })
    if (!(wasmMemory.buffer instanceof SharedArrayBuffer)) {
      err(
        'requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag'
      )
      if (ENVIRONMENT_IS_NODE) {
        console.log(
          '(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)'
        )
      }
      throw Error('bad memory')
    }
  }
}
if (wasmMemory) {
  buffer = wasmMemory.buffer
}
INITIAL_MEMORY = buffer.byteLength
assert(INITIAL_MEMORY % 65536 === 0)
updateGlobalBufferAndViews(buffer)
var wasmTable
function writeStackCookie() {
  var max = _emscripten_stack_get_end()
  assert((max & 3) == 0)
  GROWABLE_HEAP_U32()[(max >> 2) + 1] = 34821223
  GROWABLE_HEAP_U32()[(max >> 2) + 2] = 2310721022
  GROWABLE_HEAP_I32()[0] = 1668509029
}
function checkStackCookie() {
  if (ABORT) return
  var max = _emscripten_stack_get_end()
  var cookie1 = GROWABLE_HEAP_U32()[(max >> 2) + 1]
  var cookie2 = GROWABLE_HEAP_U32()[(max >> 2) + 2]
  if (cookie1 != 34821223 || cookie2 != 2310721022) {
    abort(
      'Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x' +
        cookie2.toString(16) +
        ' ' +
        cookie1.toString(16)
    )
  }
  if (GROWABLE_HEAP_I32()[0] !== 1668509029)
    abort(
      'Runtime error: The application has corrupted its heap memory area (address zero)!'
    )
}
;(function () {
  var h16 = new Int16Array(1)
  var h8 = new Int8Array(h16.buffer)
  h16[0] = 25459
  if (h8[0] !== 115 || h8[1] !== 99)
    throw 'Runtime error: expected the system to be little-endian!'
})()
var __ATPRERUN__ = []
var __ATINIT__ = []
var __ATMAIN__ = []
var __ATEXIT__ = []
var __ATPOSTRUN__ = []
var runtimeInitialized = false
var runtimeExited = false
if (!ENVIRONMENT_IS_PTHREAD)
  __ATINIT__.push({
    func: function () {
      ___wasm_call_ctors()
    }
  })
function preRun() {
  if (ENVIRONMENT_IS_PTHREAD) return
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function')
      Module['preRun'] = [Module['preRun']]
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift())
    }
  }
  callRuntimeCallbacks(__ATPRERUN__)
}
function initRuntime() {
  checkStackCookie()
  assert(!runtimeInitialized)
  runtimeInitialized = true
  if (ENVIRONMENT_IS_PTHREAD) return
  if (!Module['noFSInit'] && !FS.init.initialized) FS.init()
  TTY.init()
  callRuntimeCallbacks(__ATINIT__)
}
function preMain() {
  checkStackCookie()
  if (ENVIRONMENT_IS_PTHREAD) return
  FS.ignorePermissions = false
  callRuntimeCallbacks(__ATMAIN__)
}
function exitRuntime() {
  checkStackCookie()
  if (ENVIRONMENT_IS_PTHREAD) return
  runtimeExited = true
}
function postRun() {
  checkStackCookie()
  if (ENVIRONMENT_IS_PTHREAD) return
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function')
      Module['postRun'] = [Module['postRun']]
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift())
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__)
}
function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb)
}
function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb)
}
assert(
  Math.imul,
  'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill'
)
assert(
  Math.fround,
  'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill'
)
assert(
  Math.clz32,
  'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill'
)
assert(
  Math.trunc,
  'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill'
)
var runDependencies = 0
var runDependencyWatcher = null
var dependenciesFulfilled = null
var runDependencyTracking = {}
function getUniqueRunDependency(id) {
  var orig = id
  while (1) {
    if (!runDependencyTracking[id]) return id
    id = orig + Math.random()
  }
}
function addRunDependency(id) {
  assert(
    !ENVIRONMENT_IS_PTHREAD,
    'addRunDependency cannot be used in a pthread worker'
  )
  runDependencies++
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies)
  }
  if (id) {
    assert(!runDependencyTracking[id])
    runDependencyTracking[id] = 1
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      runDependencyWatcher = setInterval(function () {
        if (ABORT) {
          clearInterval(runDependencyWatcher)
          runDependencyWatcher = null
          return
        }
        var shown = false
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true
            err('still waiting on run dependencies:')
          }
          err('dependency: ' + dep)
        }
        if (shown) {
          err('(end of list)')
        }
      }, 1e4)
    }
  } else {
    err('warning: run dependency added without ID')
  }
}
function removeRunDependency(id) {
  runDependencies--
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies)
  }
  if (id) {
    assert(runDependencyTracking[id])
    delete runDependencyTracking[id]
  } else {
    err('warning: run dependency removed without ID')
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher)
      runDependencyWatcher = null
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled
      dependenciesFulfilled = null
      callback()
    }
  }
}
Module['preloadedImages'] = {}
Module['preloadedAudios'] = {}
function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what)
  }
  if (ENVIRONMENT_IS_PTHREAD)
    console.error('Pthread aborting at ' + new Error().stack)
  what += ''
  err(what)
  ABORT = true
  EXITSTATUS = 1
  var output = 'abort(' + what + ') at ' + stackTrace()
  what = output
  var e = new WebAssembly.RuntimeError(what)
  throw e
}
function hasPrefix(str, prefix) {
  return String.prototype.startsWith
    ? str.startsWith(prefix)
    : str.indexOf(prefix) === 0
}
var dataURIPrefix = 'data:application/octet-stream;base64,'
function isDataURI(filename) {
  return hasPrefix(filename, dataURIPrefix)
}
var fileURIPrefix = 'file://'
function isFileURI(filename) {
  return hasPrefix(filename, fileURIPrefix)
}
function createExportWrapper(name, fixedasm) {
  return function () {
    var displayName = name
    var asm = fixedasm
    if (!fixedasm) {
      asm = Module['asm']
    }
    assert(
      runtimeInitialized,
      'native function `' +
        displayName +
        '` called before runtime initialization'
    )
    assert(
      !runtimeExited,
      'native function `' +
        displayName +
        '` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)'
    )
    if (!asm[name]) {
      assert(
        asm[name],
        'exported native function `' + displayName + '` not found'
      )
    }
    return asm[name].apply(null, arguments)
  }
}
var wasmBinaryFile = 'libplay.wasm'
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile)
}
function getBinary(file) {
  try {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary)
    }
    if (readBinary) {
      return readBinary(file)
    } else {
      throw 'both async and sync fetching of the wasm failed'
    }
  } catch (err) {
    abort(err)
  }
}
function getBinaryPromise() {
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch === 'function' && !isFileURI(wasmBinaryFile)) {
      return fetch(wasmBinaryFile, { credentials: 'same-origin' })
        .then(function (response) {
          if (!response['ok']) {
            throw "failed to load wasm binary file at '" + wasmBinaryFile + "'"
          }
          return response['arrayBuffer']()
        })
        .catch(function () {
          return getBinary(wasmBinaryFile)
        })
    } else {
      if (readAsync) {
        return new Promise(function (resolve, reject) {
          readAsync(
            wasmBinaryFile,
            function (response) {
              resolve(new Uint8Array(response))
            },
            reject
          )
        })
      }
    }
  }
  return Promise.resolve().then(function () {
    return getBinary(wasmBinaryFile)
  })
}
function createWasm() {
  var info = { env: asmLibraryArg, wasi_snapshot_preview1: asmLibraryArg }
  function receiveInstance(instance, module) {
    var exports = instance.exports
    Module['asm'] = exports
    wasmTable = Module['asm']['__indirect_function_table']
    assert(wasmTable, 'table not found in wasm exports')
    wasmModule = module
    if (!ENVIRONMENT_IS_PTHREAD) {
      var numWorkersToLoad = PThread.unusedWorkers.length
      PThread.unusedWorkers.forEach(function (w) {
        PThread.loadWasmModuleToWorker(w, function () {
          if (!--numWorkersToLoad) removeRunDependency('wasm-instantiate')
        })
      })
    }
  }
  if (!ENVIRONMENT_IS_PTHREAD) {
    addRunDependency('wasm-instantiate')
  }
  var trueModule = Module
  function receiveInstantiatedSource(output) {
    assert(
      Module === trueModule,
      'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?'
    )
    trueModule = null
    receiveInstance(output['instance'], output['module'])
  }
  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise()
      .then(function (binary) {
        return WebAssembly.instantiate(binary, info)
      })
      .then(receiver, function (reason) {
        err('failed to asynchronously prepare wasm: ' + reason)
        if (isFileURI(wasmBinaryFile)) {
          err(
            'warning: Loading from a file URI (' +
              wasmBinaryFile +
              ') is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing'
          )
        }
        abort(reason)
      })
  }
  function instantiateAsync() {
    if (
      !wasmBinary &&
      typeof WebAssembly.instantiateStreaming === 'function' &&
      !isDataURI(wasmBinaryFile) &&
      !isFileURI(wasmBinaryFile) &&
      typeof fetch === 'function'
    ) {
      return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(
        function (response) {
          var result = WebAssembly.instantiateStreaming(response, info)
          return result.then(receiveInstantiatedSource, function (reason) {
            err('wasm streaming compile failed: ' + reason)
            err('falling back to ArrayBuffer instantiation')
            return instantiateArrayBuffer(receiveInstantiatedSource)
          })
        }
      )
    } else {
      return instantiateArrayBuffer(receiveInstantiatedSource)
    }
  }
  if (Module['instantiateWasm']) {
    try {
      var exports = Module['instantiateWasm'](info, receiveInstance)
      return exports
    } catch (e) {
      err('Module.instantiateWasm callback failed with error: ' + e)
      return false
    }
  }
  instantiateAsync()
  return {}
}
var tempDouble
var tempI64
var ASM_CONSTS = {
  514568: function () {
    throw 'Canceled!'
  },
  514586: function ($0, $1) {
    setTimeout(function () {
      __emscripten_do_dispatch_to_thread($0, $1)
    }, 0)
  }
}
function initPthreadsJS() {
  PThread.initRuntime()
}
function callRuntimeCallbacks(callbacks) {
  while (callbacks.length > 0) {
    var callback = callbacks.shift()
    if (typeof callback == 'function') {
      callback(Module)
      continue
    }
    var func = callback.func
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        wasmTable.get(func)()
      } else {
        wasmTable.get(func)(callback.arg)
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg)
    }
  }
}
function demangle(func) {
  warnOnce(
    'warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling'
  )
  return func
}
function demangleAll(text) {
  var regex = /\b_Z[\w\d_]+/g
  return text.replace(regex, function (x) {
    var y = demangle(x)
    return x === y ? x : y + ' [' + x + ']'
  })
}
var ERRNO_CODES = {
  EPERM: 63,
  ENOENT: 44,
  ESRCH: 71,
  EINTR: 27,
  EIO: 29,
  ENXIO: 60,
  E2BIG: 1,
  ENOEXEC: 45,
  EBADF: 8,
  ECHILD: 12,
  EAGAIN: 6,
  EWOULDBLOCK: 6,
  ENOMEM: 48,
  EACCES: 2,
  EFAULT: 21,
  ENOTBLK: 105,
  EBUSY: 10,
  EEXIST: 20,
  EXDEV: 75,
  ENODEV: 43,
  ENOTDIR: 54,
  EISDIR: 31,
  EINVAL: 28,
  ENFILE: 41,
  EMFILE: 33,
  ENOTTY: 59,
  ETXTBSY: 74,
  EFBIG: 22,
  ENOSPC: 51,
  ESPIPE: 70,
  EROFS: 69,
  EMLINK: 34,
  EPIPE: 64,
  EDOM: 18,
  ERANGE: 68,
  ENOMSG: 49,
  EIDRM: 24,
  ECHRNG: 106,
  EL2NSYNC: 156,
  EL3HLT: 107,
  EL3RST: 108,
  ELNRNG: 109,
  EUNATCH: 110,
  ENOCSI: 111,
  EL2HLT: 112,
  EDEADLK: 16,
  ENOLCK: 46,
  EBADE: 113,
  EBADR: 114,
  EXFULL: 115,
  ENOANO: 104,
  EBADRQC: 103,
  EBADSLT: 102,
  EDEADLOCK: 16,
  EBFONT: 101,
  ENOSTR: 100,
  ENODATA: 116,
  ETIME: 117,
  ENOSR: 118,
  ENONET: 119,
  ENOPKG: 120,
  EREMOTE: 121,
  ENOLINK: 47,
  EADV: 122,
  ESRMNT: 123,
  ECOMM: 124,
  EPROTO: 65,
  EMULTIHOP: 36,
  EDOTDOT: 125,
  EBADMSG: 9,
  ENOTUNIQ: 126,
  EBADFD: 127,
  EREMCHG: 128,
  ELIBACC: 129,
  ELIBBAD: 130,
  ELIBSCN: 131,
  ELIBMAX: 132,
  ELIBEXEC: 133,
  ENOSYS: 52,
  ENOTEMPTY: 55,
  ENAMETOOLONG: 37,
  ELOOP: 32,
  EOPNOTSUPP: 138,
  EPFNOSUPPORT: 139,
  ECONNRESET: 15,
  ENOBUFS: 42,
  EAFNOSUPPORT: 5,
  EPROTOTYPE: 67,
  ENOTSOCK: 57,
  ENOPROTOOPT: 50,
  ESHUTDOWN: 140,
  ECONNREFUSED: 14,
  EADDRINUSE: 3,
  ECONNABORTED: 13,
  ENETUNREACH: 40,
  ENETDOWN: 38,
  ETIMEDOUT: 73,
  EHOSTDOWN: 142,
  EHOSTUNREACH: 23,
  EINPROGRESS: 26,
  EALREADY: 7,
  EDESTADDRREQ: 17,
  EMSGSIZE: 35,
  EPROTONOSUPPORT: 66,
  ESOCKTNOSUPPORT: 137,
  EADDRNOTAVAIL: 4,
  ENETRESET: 39,
  EISCONN: 30,
  ENOTCONN: 53,
  ETOOMANYREFS: 141,
  EUSERS: 136,
  EDQUOT: 19,
  ESTALE: 72,
  ENOTSUP: 138,
  ENOMEDIUM: 148,
  EILSEQ: 25,
  EOVERFLOW: 61,
  ECANCELED: 11,
  ENOTRECOVERABLE: 56,
  EOWNERDEAD: 62,
  ESTRPIPE: 135
}
function _emscripten_futex_wake(addr, count) {
  if (
    addr <= 0 ||
    addr > GROWABLE_HEAP_I8().length ||
    addr & (3 != 0) ||
    count < 0
  )
    return -28
  if (count == 0) return 0
  if (count >= 2147483647) count = Infinity
  assert(__emscripten_main_thread_futex > 0)
  var mainThreadWaitAddress = Atomics.load(
    GROWABLE_HEAP_I32(),
    __emscripten_main_thread_futex >> 2
  )
  var mainThreadWoken = 0
  if (mainThreadWaitAddress == addr) {
    assert(!ENVIRONMENT_IS_WEB)
    var loadedAddr = Atomics.compareExchange(
      GROWABLE_HEAP_I32(),
      __emscripten_main_thread_futex >> 2,
      mainThreadWaitAddress,
      0
    )
    if (loadedAddr == mainThreadWaitAddress) {
      --count
      mainThreadWoken = 1
      if (count <= 0) return 1
    }
  }
  var ret = Atomics.notify(GROWABLE_HEAP_I32(), addr >> 2, count)
  if (ret >= 0) return ret + mainThreadWoken
  throw 'Atomics.notify returned an unexpected value ' + ret
}
Module['_emscripten_futex_wake'] = _emscripten_futex_wake
function killThread(pthread_ptr) {
  if (ENVIRONMENT_IS_PTHREAD)
    throw 'Internal Error! killThread() can only ever be called from main application thread!'
  if (!pthread_ptr) throw 'Internal Error! Null pthread_ptr in killThread!'
  GROWABLE_HEAP_I32()[(pthread_ptr + 12) >> 2] = 0
  var pthread = PThread.pthreads[pthread_ptr]
  pthread.worker.terminate()
  PThread.freeThreadData(pthread)
  PThread.runningWorkers.splice(
    PThread.runningWorkers.indexOf(pthread.worker),
    1
  )
  pthread.worker.pthread = undefined
}
function cancelThread(pthread_ptr) {
  if (ENVIRONMENT_IS_PTHREAD)
    throw 'Internal Error! cancelThread() can only ever be called from main application thread!'
  if (!pthread_ptr) throw 'Internal Error! Null pthread_ptr in cancelThread!'
  var pthread = PThread.pthreads[pthread_ptr]
  pthread.worker.postMessage({ cmd: 'cancel' })
}
function cleanupThread(pthread_ptr) {
  if (ENVIRONMENT_IS_PTHREAD)
    throw 'Internal Error! cleanupThread() can only ever be called from main application thread!'
  if (!pthread_ptr) throw 'Internal Error! Null pthread_ptr in cleanupThread!'
  var pthread = PThread.pthreads[pthread_ptr]
  if (pthread) {
    GROWABLE_HEAP_I32()[(pthread_ptr + 12) >> 2] = 0
    var worker = pthread.worker
    PThread.returnWorkerToPool(worker)
  }
}
var PThread = {
  unusedWorkers: [],
  runningWorkers: [],
  initMainThreadBlock: function () {
    assert(!ENVIRONMENT_IS_PTHREAD)
    var pthreadPoolSize = 8
    for (var i = 0; i < pthreadPoolSize; ++i) {
      PThread.allocateUnusedWorker()
    }
  },
  initRuntime: function () {
    var tb = _malloc(228)
    for (var i = 0; i < 228 / 4; ++i) GROWABLE_HEAP_U32()[tb / 4 + i] = 0
    GROWABLE_HEAP_I32()[(tb + 12) >> 2] = tb
    var headPtr = tb + 152
    GROWABLE_HEAP_I32()[headPtr >> 2] = headPtr
    var tlsMemory = _malloc(512)
    for (var i = 0; i < 128; ++i) GROWABLE_HEAP_U32()[tlsMemory / 4 + i] = 0
    Atomics.store(GROWABLE_HEAP_U32(), (tb + 100) >> 2, tlsMemory)
    Atomics.store(GROWABLE_HEAP_U32(), (tb + 40) >> 2, tb)
    __emscripten_thread_init(tb, !ENVIRONMENT_IS_WORKER, 1)
    _emscripten_register_main_browser_thread_id(tb)
    PThread.mainRuntimeThread = true
  },
  initWorker: function () {},
  pthreads: {},
  threadExitHandlers: [],
  setThreadStatus: function () {},
  runExitHandlers: function () {
    while (PThread.threadExitHandlers.length > 0) {
      PThread.threadExitHandlers.pop()()
    }
    if (ENVIRONMENT_IS_PTHREAD && _pthread_self()) ___pthread_tsd_run_dtors()
  },
  runExitHandlersAndDeinitThread: function (tb, exitCode) {
    Atomics.store(GROWABLE_HEAP_U32(), (tb + 56) >> 2, 1)
    Atomics.store(GROWABLE_HEAP_U32(), (tb + 60) >> 2, 0)
    PThread.runExitHandlers()
    Atomics.store(GROWABLE_HEAP_U32(), (tb + 4) >> 2, exitCode)
    Atomics.store(GROWABLE_HEAP_U32(), (tb + 0) >> 2, 1)
    _emscripten_futex_wake(tb + 0, 2147483647)
    __emscripten_thread_init(0, 0, 0)
  },
  threadExit: function (exitCode) {
    var tb = _pthread_self()
    if (tb) {
      err('Pthread 0x' + tb.toString(16) + ' exited.')
      PThread.runExitHandlersAndDeinitThread(tb, exitCode)
      if (ENVIRONMENT_IS_PTHREAD) {
        postMessage({ cmd: 'exit' })
      }
    }
  },
  threadCancel: function () {
    PThread.runExitHandlersAndDeinitThread(_pthread_self(), -1)
    postMessage({ cmd: 'cancelDone' })
  },
  terminateAllThreads: function () {
    for (var t in PThread.pthreads) {
      var pthread = PThread.pthreads[t]
      if (pthread && pthread.worker) {
        PThread.returnWorkerToPool(pthread.worker)
      }
    }
    PThread.pthreads = {}
    for (var i = 0; i < PThread.unusedWorkers.length; ++i) {
      var worker = PThread.unusedWorkers[i]
      assert(!worker.pthread)
      worker.terminate()
    }
    PThread.unusedWorkers = []
    for (var i = 0; i < PThread.runningWorkers.length; ++i) {
      var worker = PThread.runningWorkers[i]
      var pthread = worker.pthread
      assert(pthread, 'This Worker should have a pthread it is executing')
      PThread.freeThreadData(pthread)
      worker.terminate()
    }
    PThread.runningWorkers = []
  },
  freeThreadData: function (pthread) {
    if (!pthread) return
    if (pthread.threadInfoStruct) {
      var tlsMemory = GROWABLE_HEAP_I32()[(pthread.threadInfoStruct + 100) >> 2]
      GROWABLE_HEAP_I32()[(pthread.threadInfoStruct + 100) >> 2] = 0
      _free(tlsMemory)
      _free(pthread.threadInfoStruct)
    }
    pthread.threadInfoStruct = 0
    if (pthread.allocatedOwnStack && pthread.stackBase) _free(pthread.stackBase)
    pthread.stackBase = 0
    if (pthread.worker) pthread.worker.pthread = null
  },
  returnWorkerToPool: function (worker) {
    PThread.runWithoutMainThreadQueuedCalls(function () {
      delete PThread.pthreads[worker.pthread.threadInfoStruct]
      PThread.unusedWorkers.push(worker)
      PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1)
      PThread.freeThreadData(worker.pthread)
      worker.pthread = undefined
    })
  },
  runWithoutMainThreadQueuedCalls: function (func) {
    assert(
      PThread.mainRuntimeThread,
      'runWithoutMainThreadQueuedCalls must be done on the main runtime thread'
    )
    assert(__emscripten_allow_main_runtime_queued_calls)
    GROWABLE_HEAP_I32()[__emscripten_allow_main_runtime_queued_calls >> 2] = 0
    try {
      func()
    } finally {
      GROWABLE_HEAP_I32()[__emscripten_allow_main_runtime_queued_calls >> 2] = 1
    }
  },
  receiveObjectTransfer: function (data) {},
  loadWasmModuleToWorker: function (worker, onFinishedLoading) {
    worker.onmessage = function (e) {
      var d = e['data']
      var cmd = d['cmd']
      if (worker.pthread)
        PThread.currentProxiedOperationCallerThread =
          worker.pthread.threadInfoStruct
      if (d['targetThread'] && d['targetThread'] != _pthread_self()) {
        var thread = PThread.pthreads[d.targetThread]
        if (thread) {
          thread.worker.postMessage(e.data, d['transferList'])
        } else {
          console.error(
            'Internal error! Worker sent a message "' +
              cmd +
              '" to target pthread ' +
              d['targetThread'] +
              ', but that thread no longer exists!'
          )
        }
        PThread.currentProxiedOperationCallerThread = undefined
        return
      }
      if (cmd === 'processQueuedMainThreadWork') {
        _emscripten_main_thread_process_queued_calls()
      } else if (cmd === 'spawnThread') {
        spawnThread(e.data)
      } else if (cmd === 'cleanupThread') {
        cleanupThread(d['thread'])
      } else if (cmd === 'killThread') {
        killThread(d['thread'])
      } else if (cmd === 'cancelThread') {
        cancelThread(d['thread'])
      } else if (cmd === 'loaded') {
        worker.loaded = true
        if (onFinishedLoading) onFinishedLoading(worker)
        if (worker.runPthread) {
          worker.runPthread()
          delete worker.runPthread
        }
      } else if (cmd === 'print') {
        out('Thread ' + d['threadId'] + ': ' + d['text'])
      } else if (cmd === 'printErr') {
        err('Thread ' + d['threadId'] + ': ' + d['text'])
      } else if (cmd === 'alert') {
        alert('Thread ' + d['threadId'] + ': ' + d['text'])
      } else if (cmd === 'exit') {
        var detached =
          worker.pthread &&
          Atomics.load(
            GROWABLE_HEAP_U32(),
            (worker.pthread.threadInfoStruct + 64) >> 2
          )
        if (detached) {
          PThread.returnWorkerToPool(worker)
        }
      } else if (cmd === 'exitProcess') {
        err('exitProcess requested by worker')
        try {
          exit(d['returnCode'])
        } catch (e) {
          if (e instanceof ExitStatus) return
          throw e
        }
      } else if (cmd === 'cancelDone') {
        PThread.returnWorkerToPool(worker)
      } else if (cmd === 'objectTransfer') {
        PThread.receiveObjectTransfer(e.data)
      } else if (e.data.target === 'setimmediate') {
        worker.postMessage(e.data)
      } else {
        err('worker sent an unknown command ' + cmd)
      }
      PThread.currentProxiedOperationCallerThread = undefined
    }
    worker.onerror = function (e) {
      err(
        'pthread sent an error! ' +
          e.filename +
          ':' +
          e.lineno +
          ': ' +
          e.message
      )
    }
    if (ENVIRONMENT_IS_NODE) {
      worker.on('message', function (data) {
        worker.onmessage({ data: data })
      })
      worker.on('error', function (data) {
        worker.onerror(data)
      })
      worker.on('exit', function (data) {})
    }
    assert(
      wasmMemory instanceof WebAssembly.Memory,
      'WebAssembly memory should have been loaded by now!'
    )
    assert(
      wasmModule instanceof WebAssembly.Module,
      'WebAssembly Module should have been loaded by now!'
    )
    worker.postMessage({
      cmd: 'load',
      urlOrBlob: Module['mainScriptUrlOrBlob'] || _scriptDir,
      wasmMemory: wasmMemory,
      wasmModule: wasmModule
    })
  },
  allocateUnusedWorker: function () {
    var pthreadMainJs = locateFile('libplay.worker.js')
    PThread.unusedWorkers.push(new Worker(pthreadMainJs))
  },
  getNewWorker: function () {
    if (PThread.unusedWorkers.length == 0) {
      PThread.allocateUnusedWorker()
      PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0])
    }
    if (PThread.unusedWorkers.length > 0) return PThread.unusedWorkers.pop()
    else return null
  },
  busySpinWait: function (msecs) {
    var t = performance.now() + msecs
    while (performance.now() < t) {}
  }
}
function establishStackSpace(stackTop, stackMax) {
  _emscripten_stack_set_limits(stackTop, stackMax)
  stackRestore(stackTop)
  writeStackCookie()
}
Module['establishStackSpace'] = establishStackSpace
function getNoExitRuntime() {
  return noExitRuntime
}
Module['getNoExitRuntime'] = getNoExitRuntime
function invokeEntryPoint(ptr, arg) {
  return wasmTable.get(ptr)(arg)
}
Module['invokeEntryPoint'] = invokeEntryPoint
function jsStackTrace() {
  var error = new Error()
  if (!error.stack) {
    try {
      throw new Error()
    } catch (e) {
      error = e
    }
    if (!error.stack) {
      return '(no stack trace available)'
    }
  }
  return error.stack.toString()
}
function stackTrace() {
  var js = jsStackTrace()
  if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']()
  return demangleAll(js)
}
function _DH_SVAC2_Dec_Close() {
  err('missing function: DH_SVAC2_Dec_Close')
  abort(-1)
}
function _DH_SVAC2_Dec_Decode() {
  err('missing function: DH_SVAC2_Dec_Decode')
  abort(-1)
}
function _DH_SVAC2_Dec_Get_OutPut_Frame() {
  err('missing function: DH_SVAC2_Dec_Get_OutPut_Frame')
  abort(-1)
}
function _DH_SVAC2_Dec_Init() {
  err('missing function: DH_SVAC2_Dec_Init')
  abort(-1)
}
function _DH_SVAC2_Dec_Open() {
  err('missing function: DH_SVAC2_Dec_Open')
  abort(-1)
}
function _DH_SVAC2_Dec_Release_OutPut_Frame() {
  err('missing function: DH_SVAC2_Dec_Release_OutPut_Frame')
  abort(-1)
}
function _DRAW_StopDrawTrackIvs() {
  err('missing function: DRAW_StopDrawTrackIvs')
  abort(-1)
}
function _Fisheye_CreateHandle() {
  err('missing function: Fisheye_CreateHandle')
  abort(-1)
}
function _Fisheye_DeWarp() {
  err('missing function: Fisheye_DeWarp')
  abort(-1)
}
function _Fisheye_DeleteHandle() {
  err('missing function: Fisheye_DeleteHandle')
  abort(-1)
}
function _Fisheye_EptzUpdate() {
  err('missing function: Fisheye_EptzUpdate')
  abort(-1)
}
function _Fisheye_GetMemSize() {
  err('missing function: Fisheye_GetMemSize')
  abort(-1)
}
function _Fisheye_GetParam() {
  err('missing function: Fisheye_GetParam')
  abort(-1)
}
function _Fisheye_SetParam() {
  err('missing function: Fisheye_SetParam')
  abort(-1)
}
function _SCALE_close() {
  err('missing function: SCALE_close')
  abort(-1)
}
function _SCALE_open() {
  err('missing function: SCALE_open')
  abort(-1)
}
function _SCALE_start() {
  err('missing function: SCALE_start')
  abort(-1)
}
function ___assert_fail(condition, filename, line, func) {
  abort(
    'Assertion failed: ' +
      UTF8ToString(condition) +
      ', at: ' +
      [
        filename ? UTF8ToString(filename) : 'unknown filename',
        line,
        func ? UTF8ToString(func) : 'unknown function'
      ]
  )
}
function ___call_main(argc, argv) {
  var returnCode = _main(argc, argv)
  out(
    'Proxied main thread 0x' +
      _pthread_self().toString(16) +
      ' finished with return code ' +
      returnCode +
      '. EXIT_RUNTIME=0 set, so keeping main thread alive for asynchronous event operations.'
  )
}
var _emscripten_get_now
if (ENVIRONMENT_IS_NODE) {
  _emscripten_get_now = function () {
    var t = process['hrtime']()
    return t[0] * 1e3 + t[1] / 1e6
  }
} else if (ENVIRONMENT_IS_PTHREAD) {
  _emscripten_get_now = function () {
    return performance.now() - Module['__performance_now_clock_drift']
  }
} else if (typeof dateNow !== 'undefined') {
  _emscripten_get_now = dateNow
} else
  _emscripten_get_now = function () {
    return performance.now()
  }
var _emscripten_get_now_is_monotonic = true
function setErrNo(value) {
  GROWABLE_HEAP_I32()[___errno_location() >> 2] = value
  return value
}
function _clock_gettime(clk_id, tp) {
  var now
  if (clk_id === 0) {
    now = Date.now()
  } else if (
    (clk_id === 1 || clk_id === 4) &&
    _emscripten_get_now_is_monotonic
  ) {
    now = _emscripten_get_now()
  } else {
    setErrNo(28)
    return -1
  }
  GROWABLE_HEAP_I32()[tp >> 2] = (now / 1e3) | 0
  GROWABLE_HEAP_I32()[(tp + 4) >> 2] = ((now % 1e3) * 1e3 * 1e3) | 0
  return 0
}
function ___clock_gettime(a0, a1) {
  return _clock_gettime(a0, a1)
}
var ExceptionInfoAttrs = {
  DESTRUCTOR_OFFSET: 0,
  REFCOUNT_OFFSET: 4,
  TYPE_OFFSET: 8,
  CAUGHT_OFFSET: 12,
  RETHROWN_OFFSET: 13,
  SIZE: 16
}
function ___cxa_allocate_exception(size) {
  return _malloc(size + ExceptionInfoAttrs.SIZE) + ExceptionInfoAttrs.SIZE
}
function _atexit(func, arg) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(1, 1, func, arg)
}
function ___cxa_atexit(a0, a1) {
  return _atexit(a0, a1)
}
function ExceptionInfo(excPtr) {
  this.excPtr = excPtr
  this.ptr = excPtr - ExceptionInfoAttrs.SIZE
  this.set_type = function (type) {
    GROWABLE_HEAP_I32()[(this.ptr + ExceptionInfoAttrs.TYPE_OFFSET) >> 2] = type
  }
  this.get_type = function () {
    return GROWABLE_HEAP_I32()[(this.ptr + ExceptionInfoAttrs.TYPE_OFFSET) >> 2]
  }
  this.set_destructor = function (destructor) {
    GROWABLE_HEAP_I32()[
      (this.ptr + ExceptionInfoAttrs.DESTRUCTOR_OFFSET) >> 2
    ] = destructor
  }
  this.get_destructor = function () {
    return GROWABLE_HEAP_I32()[
      (this.ptr + ExceptionInfoAttrs.DESTRUCTOR_OFFSET) >> 2
    ]
  }
  this.set_refcount = function (refcount) {
    GROWABLE_HEAP_I32()[(this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET) >> 2] =
      refcount
  }
  this.set_caught = function (caught) {
    caught = caught ? 1 : 0
    GROWABLE_HEAP_I8()[(this.ptr + ExceptionInfoAttrs.CAUGHT_OFFSET) >> 0] =
      caught
  }
  this.get_caught = function () {
    return (
      GROWABLE_HEAP_I8()[(this.ptr + ExceptionInfoAttrs.CAUGHT_OFFSET) >> 0] !=
      0
    )
  }
  this.set_rethrown = function (rethrown) {
    rethrown = rethrown ? 1 : 0
    GROWABLE_HEAP_I8()[(this.ptr + ExceptionInfoAttrs.RETHROWN_OFFSET) >> 0] =
      rethrown
  }
  this.get_rethrown = function () {
    return (
      GROWABLE_HEAP_I8()[
        (this.ptr + ExceptionInfoAttrs.RETHROWN_OFFSET) >> 0
      ] != 0
    )
  }
  this.init = function (type, destructor) {
    this.set_type(type)
    this.set_destructor(destructor)
    this.set_refcount(0)
    this.set_caught(false)
    this.set_rethrown(false)
  }
  this.add_ref = function () {
    Atomics.add(
      GROWABLE_HEAP_I32(),
      (this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET) >> 2,
      1
    )
  }
  this.release_ref = function () {
    var prev = Atomics.sub(
      GROWABLE_HEAP_I32(),
      (this.ptr + ExceptionInfoAttrs.REFCOUNT_OFFSET) >> 2,
      1
    )
    assert(prev > 0)
    return prev === 1
  }
}
var exceptionLast = 0
var uncaughtExceptionCount = 0
function ___cxa_throw(ptr, type, destructor) {
  var info = new ExceptionInfo(ptr)
  info.init(type, destructor)
  exceptionLast = ptr
  uncaughtExceptionCount++
  throw (
    ptr +
    ' - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.'
  )
}
function _gmtime_r(time, tmPtr) {
  var date = new Date(GROWABLE_HEAP_I32()[time >> 2] * 1e3)
  GROWABLE_HEAP_I32()[tmPtr >> 2] = date.getUTCSeconds()
  GROWABLE_HEAP_I32()[(tmPtr + 4) >> 2] = date.getUTCMinutes()
  GROWABLE_HEAP_I32()[(tmPtr + 8) >> 2] = date.getUTCHours()
  GROWABLE_HEAP_I32()[(tmPtr + 12) >> 2] = date.getUTCDate()
  GROWABLE_HEAP_I32()[(tmPtr + 16) >> 2] = date.getUTCMonth()
  GROWABLE_HEAP_I32()[(tmPtr + 20) >> 2] = date.getUTCFullYear() - 1900
  GROWABLE_HEAP_I32()[(tmPtr + 24) >> 2] = date.getUTCDay()
  GROWABLE_HEAP_I32()[(tmPtr + 36) >> 2] = 0
  GROWABLE_HEAP_I32()[(tmPtr + 32) >> 2] = 0
  var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0)
  var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0
  GROWABLE_HEAP_I32()[(tmPtr + 28) >> 2] = yday
  if (!_gmtime_r.GMTString) _gmtime_r.GMTString = allocateUTF8('GMT')
  GROWABLE_HEAP_I32()[(tmPtr + 40) >> 2] = _gmtime_r.GMTString
  return tmPtr
}
function ___gmtime_r(a0, a1) {
  return _gmtime_r(a0, a1)
}
function _tzset() {
  if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(2, 1)
  if (_tzset.called) return
  _tzset.called = true
  var currentYear = new Date().getFullYear()
  var winter = new Date(currentYear, 0, 1)
  var summer = new Date(currentYear, 6, 1)
  var winterOffset = winter.getTimezoneOffset()
  var summerOffset = summer.getTimezoneOffset()
  var stdTimezoneOffset = Math.max(winterOffset, summerOffset)
  GROWABLE_HEAP_I32()[__get_timezone() >> 2] = stdTimezoneOffset * 60
  GROWABLE_HEAP_I32()[__get_daylight() >> 2] = Number(
    winterOffset != summerOffset
  )
  function extractZone(date) {
    var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/)
    return match ? match[1] : 'GMT'
  }
  var winterName = extractZone(winter)
  var summerName = extractZone(summer)
  var winterNamePtr = allocateUTF8(winterName)
  var summerNamePtr = allocateUTF8(summerName)
  if (summerOffset < winterOffset) {
    GROWABLE_HEAP_I32()[__get_tzname() >> 2] = winterNamePtr
    GROWABLE_HEAP_I32()[(__get_tzname() + 4) >> 2] = summerNamePtr
  } else {
    GROWABLE_HEAP_I32()[__get_tzname() >> 2] = summerNamePtr
    GROWABLE_HEAP_I32()[(__get_tzname() + 4) >> 2] = winterNamePtr
  }
}
function _localtime_r(time, tmPtr) {
  _tzset()
  var date = new Date(GROWABLE_HEAP_I32()[time >> 2] * 1e3)
  GROWABLE_HEAP_I32()[tmPtr >> 2] = date.getSeconds()
  GROWABLE_HEAP_I32()[(tmPtr + 4) >> 2] = date.getMinutes()
  GROWABLE_HEAP_I32()[(tmPtr + 8) >> 2] = date.getHours()
  GROWABLE_HEAP_I32()[(tmPtr + 12) >> 2] = date.getDate()
  GROWABLE_HEAP_I32()[(tmPtr + 16) >> 2] = date.getMonth()
  GROWABLE_HEAP_I32()[(tmPtr + 20) >> 2] = date.getFullYear() - 1900
  GROWABLE_HEAP_I32()[(tmPtr + 24) >> 2] = date.getDay()
  var start = new Date(date.getFullYear(), 0, 1)
  var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0
  GROWABLE_HEAP_I32()[(tmPtr + 28) >> 2] = yday
  GROWABLE_HEAP_I32()[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60)
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
  var winterOffset = start.getTimezoneOffset()
  var dst =
    (summerOffset != winterOffset &&
      date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0
  GROWABLE_HEAP_I32()[(tmPtr + 32) >> 2] = dst
  var zonePtr = GROWABLE_HEAP_I32()[(__get_tzname() + (dst ? 4 : 0)) >> 2]
  GROWABLE_HEAP_I32()[(tmPtr + 40) >> 2] = zonePtr
  return tmPtr
}
function ___localtime_r(a0, a1) {
  return _localtime_r(a0, a1)
}
var PATH = {
  splitPath: function (filename) {
    var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
    return splitPathRe.exec(filename).slice(1)
  },
  normalizeArray: function (parts, allowAboveRoot) {
    var up = 0
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i]
      if (last === '.') {
        parts.splice(i, 1)
      } else if (last === '..') {
        parts.splice(i, 1)
        up++
      } else if (up) {
        parts.splice(i, 1)
        up--
      }
    }
    if (allowAboveRoot) {
      for (; up; up--) {
        parts.unshift('..')
      }
    }
    return parts
  },
  normalize: function (path) {
    var isAbsolute = path.charAt(0) === '/',
      trailingSlash = path.substr(-1) === '/'
    path = PATH.normalizeArray(
      path.split('/').filter(function (p) {
        return !!p
      }),
      !isAbsolute
    ).join('/')
    if (!path && !isAbsolute) {
      path = '.'
    }
    if (path && trailingSlash) {
      path += '/'
    }
    return (isAbsolute ? '/' : '') + path
  },
  dirname: function (path) {
    var result = PATH.splitPath(path),
      root = result[0],
      dir = result[1]
    if (!root && !dir) {
      return '.'
    }
    if (dir) {
      dir = dir.substr(0, dir.length - 1)
    }
    return root + dir
  },
  basename: function (path) {
    if (path === '/') return '/'
    path = PATH.normalize(path)
    path = path.replace(/\/$/, '')
    var lastSlash = path.lastIndexOf('/')
    if (lastSlash === -1) return path
    return path.substr(lastSlash + 1)
  },
  extname: function (path) {
    return PATH.splitPath(path)[3]
  },
  join: function () {
    var paths = Array.prototype.slice.call(arguments, 0)
    return PATH.normalize(paths.join('/'))
  },
  join2: function (l, r) {
    return PATH.normalize(l + '/' + r)
  }
}
function getRandomDevice() {
  if (
    typeof crypto === 'object' &&
    typeof crypto['getRandomValues'] === 'function'
  ) {
    var randomBuffer = new Uint8Array(1)
    return function () {
      crypto.getRandomValues(randomBuffer)
      return randomBuffer[0]
    }
  } else if (ENVIRONMENT_IS_NODE) {
    try {
      var crypto_module = require('crypto')
      return function () {
        return crypto_module['randomBytes'](1)[0]
      }
    } catch (e) {}
  }
  return function () {
    abort(
      'no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };'
    )
  }
}
var PATH_FS = {
  resolve: function () {
    var resolvedPath = '',
      resolvedAbsolute = false
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? arguments[i] : FS.cwd()
      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings')
      } else if (!path) {
        return ''
      }
      resolvedPath = path + '/' + resolvedPath
      resolvedAbsolute = path.charAt(0) === '/'
    }
    resolvedPath = PATH.normalizeArray(
      resolvedPath.split('/').filter(function (p) {
        return !!p
      }),
      !resolvedAbsolute
    ).join('/')
    return (resolvedAbsolute ? '/' : '') + resolvedPath || '.'
  },
  relative: function (from, to) {
    from = PATH_FS.resolve(from).substr(1)
    to = PATH_FS.resolve(to).substr(1)
    function trim(arr) {
      var start = 0
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break
      }
      var end = arr.length - 1
      for (; end >= 0; end--) {
        if (arr[end] !== '') break
      }
      if (start > end) return []
      return arr.slice(start, end - start + 1)
    }
    var fromParts = trim(from.split('/'))
    var toParts = trim(to.split('/'))
    var length = Math.min(fromParts.length, toParts.length)
    var samePartsLength = length
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i
        break
      }
    }
    var outputParts = []
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..')
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength))
    return outputParts.join('/')
  }
}
var TTY = {
  ttys: [],
  init: function () {},
  shutdown: function () {},
  register: function (dev, ops) {
    TTY.ttys[dev] = { input: [], output: [], ops: ops }
    FS.registerDevice(dev, TTY.stream_ops)
  },
  stream_ops: {
    open: function (stream) {
      var tty = TTY.ttys[stream.node.rdev]
      if (!tty) {
        throw new FS.ErrnoError(43)
      }
      stream.tty = tty
      stream.seekable = false
    },
    close: function (stream) {
      stream.tty.ops.flush(stream.tty)
    },
    flush: function (stream) {
      stream.tty.ops.flush(stream.tty)
    },
    read: function (stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60)
      }
      var bytesRead = 0
      for (var i = 0; i < length; i++) {
        var result
        try {
          result = stream.tty.ops.get_char(stream.tty)
        } catch (e) {
          throw new FS.ErrnoError(29)
        }
        if (result === undefined && bytesRead === 0) {
          throw new FS.ErrnoError(6)
        }
        if (result === null || result === undefined) break
        bytesRead++
        buffer[offset + i] = result
      }
      if (bytesRead) {
        stream.node.timestamp = Date.now()
      }
      return bytesRead
    },
    write: function (stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60)
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i])
        }
      } catch (e) {
        throw new FS.ErrnoError(29)
      }
      if (length) {
        stream.node.timestamp = Date.now()
      }
      return i
    }
  },
  default_tty_ops: {
    get_char: function (tty) {
      if (!tty.input.length) {
        var result = null
        if (ENVIRONMENT_IS_NODE) {
          var BUFSIZE = 256
          var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE)
          var bytesRead = 0
          try {
            bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null)
          } catch (e) {
            if (e.toString().indexOf('EOF') != -1) bytesRead = 0
            else throw e
          }
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8')
          } else {
            result = null
          }
        } else if (
          typeof window != 'undefined' &&
          typeof window.prompt == 'function'
        ) {
          result = window.prompt('Input: ')
          if (result !== null) {
            result += '\n'
          }
        } else if (typeof readline == 'function') {
          result = readline()
          if (result !== null) {
            result += '\n'
          }
        }
        if (!result) {
          return null
        }
        tty.input = intArrayFromString(result, true)
      }
      return tty.input.shift()
    },
    put_char: function (tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output, 0))
        tty.output = []
      } else {
        if (val != 0) tty.output.push(val)
      }
    },
    flush: function (tty) {
      if (tty.output && tty.output.length > 0) {
        out(UTF8ArrayToString(tty.output, 0))
        tty.output = []
      }
    }
  },
  default_tty1_ops: {
    put_char: function (tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output, 0))
        tty.output = []
      } else {
        if (val != 0) tty.output.push(val)
      }
    },
    flush: function (tty) {
      if (tty.output && tty.output.length > 0) {
        err(UTF8ArrayToString(tty.output, 0))
        tty.output = []
      }
    }
  }
}
function mmapAlloc(size) {
  var alignedSize = alignMemory(size, 16384)
  var ptr = _malloc(alignedSize)
  while (size < alignedSize) GROWABLE_HEAP_I8()[ptr + size++] = 0
  return ptr
}
var MEMFS = {
  ops_table: null,
  mount: function (mount) {
    return MEMFS.createNode(null, '/', 16384 | 511, 0)
  },
  createNode: function (parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      throw new FS.ErrnoError(63)
    }
    if (!MEMFS.ops_table) {
      MEMFS.ops_table = {
        dir: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            lookup: MEMFS.node_ops.lookup,
            mknod: MEMFS.node_ops.mknod,
            rename: MEMFS.node_ops.rename,
            unlink: MEMFS.node_ops.unlink,
            rmdir: MEMFS.node_ops.rmdir,
            readdir: MEMFS.node_ops.readdir,
            symlink: MEMFS.node_ops.symlink
          },
          stream: { llseek: MEMFS.stream_ops.llseek }
        },
        file: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr
          },
          stream: {
            llseek: MEMFS.stream_ops.llseek,
            read: MEMFS.stream_ops.read,
            write: MEMFS.stream_ops.write,
            allocate: MEMFS.stream_ops.allocate,
            mmap: MEMFS.stream_ops.mmap,
            msync: MEMFS.stream_ops.msync
          }
        },
        link: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr,
            readlink: MEMFS.node_ops.readlink
          },
          stream: {}
        },
        chrdev: {
          node: {
            getattr: MEMFS.node_ops.getattr,
            setattr: MEMFS.node_ops.setattr
          },
          stream: FS.chrdev_stream_ops
        }
      }
    }
    var node = FS.createNode(parent, name, mode, dev)
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node
      node.stream_ops = MEMFS.ops_table.dir.stream
      node.contents = {}
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node
      node.stream_ops = MEMFS.ops_table.file.stream
      node.usedBytes = 0
      node.contents = null
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node
      node.stream_ops = MEMFS.ops_table.link.stream
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node
      node.stream_ops = MEMFS.ops_table.chrdev.stream
    }
    node.timestamp = Date.now()
    if (parent) {
      parent.contents[name] = node
      parent.timestamp = node.timestamp
    }
    return node
  },
  getFileDataAsTypedArray: function (node) {
    if (!node.contents) return new Uint8Array(0)
    if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes)
    return new Uint8Array(node.contents)
  },
  expandFileStorage: function (node, newCapacity) {
    var prevCapacity = node.contents ? node.contents.length : 0
    if (prevCapacity >= newCapacity) return
    var CAPACITY_DOUBLING_MAX = 1024 * 1024
    newCapacity = Math.max(
      newCapacity,
      (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0
    )
    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256)
    var oldContents = node.contents
    node.contents = new Uint8Array(newCapacity)
    if (node.usedBytes > 0)
      node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
  },
  resizeFileStorage: function (node, newSize) {
    if (node.usedBytes == newSize) return
    if (newSize == 0) {
      node.contents = null
      node.usedBytes = 0
    } else {
      var oldContents = node.contents
      node.contents = new Uint8Array(newSize)
      if (oldContents) {
        node.contents.set(
          oldContents.subarray(0, Math.min(newSize, node.usedBytes))
        )
      }
      node.usedBytes = newSize
    }
  },
  node_ops: {
    getattr: function (node) {
      var attr = {}
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1
      attr.ino = node.id
      attr.mode = node.mode
      attr.nlink = 1
      attr.uid = 0
      attr.gid = 0
      attr.rdev = node.rdev
      if (FS.isDir(node.mode)) {
        attr.size = 4096
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length
      } else {
        attr.size = 0
      }
      attr.atime = new Date(node.timestamp)
      attr.mtime = new Date(node.timestamp)
      attr.ctime = new Date(node.timestamp)
      attr.blksize = 4096
      attr.blocks = Math.ceil(attr.size / attr.blksize)
      return attr
    },
    setattr: function (node, attr) {
      if (attr.mode !== undefined) {
        node.mode = attr.mode
      }
      if (attr.timestamp !== undefined) {
        node.timestamp = attr.timestamp
      }
      if (attr.size !== undefined) {
        MEMFS.resizeFileStorage(node, attr.size)
      }
    },
    lookup: function (parent, name) {
      throw FS.genericErrors[44]
    },
    mknod: function (parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev)
    },
    rename: function (old_node, new_dir, new_name) {
      if (FS.isDir(old_node.mode)) {
        var new_node
        try {
          new_node = FS.lookupNode(new_dir, new_name)
        } catch (e) {}
        if (new_node) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55)
          }
        }
      }
      delete old_node.parent.contents[old_node.name]
      old_node.parent.timestamp = Date.now()
      old_node.name = new_name
      new_dir.contents[new_name] = old_node
      new_dir.timestamp = old_node.parent.timestamp
      old_node.parent = new_dir
    },
    unlink: function (parent, name) {
      delete parent.contents[name]
      parent.timestamp = Date.now()
    },
    rmdir: function (parent, name) {
      var node = FS.lookupNode(parent, name)
      for (var i in node.contents) {
        throw new FS.ErrnoError(55)
      }
      delete parent.contents[name]
      parent.timestamp = Date.now()
    },
    readdir: function (node) {
      var entries = ['.', '..']
      for (var key in node.contents) {
        if (!node.contents.hasOwnProperty(key)) {
          continue
        }
        entries.push(key)
      }
      return entries
    },
    symlink: function (parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0)
      node.link = oldpath
      return node
    },
    readlink: function (node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28)
      }
      return node.link
    }
  },
  stream_ops: {
    read: function (stream, buffer, offset, length, position) {
      var contents = stream.node.contents
      if (position >= stream.node.usedBytes) return 0
      var size = Math.min(stream.node.usedBytes - position, length)
      assert(size >= 0)
      if (size > 8 && contents.subarray) {
        buffer.set(contents.subarray(position, position + size), offset)
      } else {
        for (var i = 0; i < size; i++)
          buffer[offset + i] = contents[position + i]
      }
      return size
    },
    write: function (stream, buffer, offset, length, position, canOwn) {
      assert(!(buffer instanceof ArrayBuffer))
      if (buffer.buffer === GROWABLE_HEAP_I8().buffer) {
        canOwn = false
      }
      if (!length) return 0
      var node = stream.node
      node.timestamp = Date.now()
      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        if (canOwn) {
          assert(
            position === 0,
            'canOwn must imply no weird position inside the file'
          )
          node.contents = buffer.subarray(offset, offset + length)
          node.usedBytes = length
          return length
        } else if (node.usedBytes === 0 && position === 0) {
          node.contents = buffer.slice(offset, offset + length)
          node.usedBytes = length
          return length
        } else if (position + length <= node.usedBytes) {
          node.contents.set(buffer.subarray(offset, offset + length), position)
          return length
        }
      }
      MEMFS.expandFileStorage(node, position + length)
      if (node.contents.subarray && buffer.subarray) {
        node.contents.set(buffer.subarray(offset, offset + length), position)
      } else {
        for (var i = 0; i < length; i++) {
          node.contents[position + i] = buffer[offset + i]
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length)
      return length
    },
    llseek: function (stream, offset, whence) {
      var position = offset
      if (whence === 1) {
        position += stream.position
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28)
      }
      return position
    },
    allocate: function (stream, offset, length) {
      MEMFS.expandFileStorage(stream.node, offset + length)
      stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length)
    },
    mmap: function (stream, address, length, position, prot, flags) {
      if (address !== 0) {
        throw new FS.ErrnoError(28)
      }
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43)
      }
      var ptr
      var allocated
      var contents = stream.node.contents
      if (!(flags & 2) && contents.buffer === buffer) {
        allocated = false
        ptr = contents.byteOffset
      } else {
        if (position > 0 || position + length < contents.length) {
          if (contents.subarray) {
            contents = contents.subarray(position, position + length)
          } else {
            contents = Array.prototype.slice.call(
              contents,
              position,
              position + length
            )
          }
        }
        allocated = true
        ptr = mmapAlloc(length)
        if (!ptr) {
          throw new FS.ErrnoError(48)
        }
        GROWABLE_HEAP_I8().set(contents, ptr)
      }
      return { ptr: ptr, allocated: allocated }
    },
    msync: function (stream, buffer, offset, length, mmapFlags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43)
      }
      if (mmapFlags & 2) {
        return 0
      }
      var bytesWritten = MEMFS.stream_ops.write(
        stream,
        buffer,
        0,
        length,
        offset,
        false
      )
      return 0
    }
  }
}
var ERRNO_MESSAGES = {
  0: 'Success',
  1: 'Arg list too long',
  2: 'Permission denied',
  3: 'Address already in use',
  4: 'Address not available',
  5: 'Address family not supported by protocol family',
  6: 'No more processes',
  7: 'Socket already connected',
  8: 'Bad file number',
  9: 'Trying to read unreadable message',
  10: 'Mount device busy',
  11: 'Operation canceled',
  12: 'No children',
  13: 'Connection aborted',
  14: 'Connection refused',
  15: 'Connection reset by peer',
  16: 'File locking deadlock error',
  17: 'Destination address required',
  18: 'Math arg out of domain of func',
  19: 'Quota exceeded',
  20: 'File exists',
  21: 'Bad address',
  22: 'File too large',
  23: 'Host is unreachable',
  24: 'Identifier removed',
  25: 'Illegal byte sequence',
  26: 'Connection already in progress',
  27: 'Interrupted system call',
  28: 'Invalid argument',
  29: 'I/O error',
  30: 'Socket is already connected',
  31: 'Is a directory',
  32: 'Too many symbolic links',
  33: 'Too many open files',
  34: 'Too many links',
  35: 'Message too long',
  36: 'Multihop attempted',
  37: 'File or path name too long',
  38: 'Network interface is not configured',
  39: 'Connection reset by network',
  40: 'Network is unreachable',
  41: 'Too many open files in system',
  42: 'No buffer space available',
  43: 'No such device',
  44: 'No such file or directory',
  45: 'Exec format error',
  46: 'No record locks available',
  47: 'The link has been severed',
  48: 'Not enough core',
  49: 'No message of desired type',
  50: 'Protocol not available',
  51: 'No space left on device',
  52: 'Function not implemented',
  53: 'Socket is not connected',
  54: 'Not a directory',
  55: 'Directory not empty',
  56: 'State not recoverable',
  57: 'Socket operation on non-socket',
  59: 'Not a typewriter',
  60: 'No such device or address',
  61: 'Value too large for defined data type',
  62: 'Previous owner died',
  63: 'Not super-user',
  64: 'Broken pipe',
  65: 'Protocol error',
  66: 'Unknown protocol',
  67: 'Protocol wrong type for socket',
  68: 'Math result not representable',
  69: 'Read only file system',
  70: 'Illegal seek',
  71: 'No such process',
  72: 'Stale file handle',
  73: 'Connection timed out',
  74: 'Text file busy',
  75: 'Cross-device link',
  100: 'Device not a stream',
  101: 'Bad font file fmt',
  102: 'Invalid slot',
  103: 'Invalid request code',
  104: 'No anode',
  105: 'Block device required',
  106: 'Channel number out of range',
  107: 'Level 3 halted',
  108: 'Level 3 reset',
  109: 'Link number out of range',
  110: 'Protocol driver not attached',
  111: 'No CSI structure available',
  112: 'Level 2 halted',
  113: 'Invalid exchange',
  114: 'Invalid request descriptor',
  115: 'Exchange full',
  116: 'No data (for no delay io)',
  117: 'Timer expired',
  118: 'Out of streams resources',
  119: 'Machine is not on the network',
  120: 'Package not installed',
  121: 'The object is remote',
  122: 'Advertise error',
  123: 'Srmount error',
  124: 'Communication error on send',
  125: 'Cross mount point (not really error)',
  126: 'Given log. name not unique',
  127: 'f.d. invalid for this operation',
  128: 'Remote address changed',
  129: 'Can   access a needed shared lib',
  130: 'Accessing a corrupted shared lib',
  131: '.lib section in a.out corrupted',
  132: 'Attempting to link in too many libs',
  133: 'Attempting to exec a shared library',
  135: 'Streams pipe error',
  136: 'Too many users',
  137: 'Socket type not supported',
  138: 'Not supported',
  139: 'Protocol family not supported',
  140: "Can't send after socket shutdown",
  141: 'Too many references',
  142: 'Host is down',
  148: 'No medium (in tape drive)',
  156: 'Level 2 not synchronized'
}
var FS = {
  root: null,
  mounts: [],
  devices: {},
  streams: [],
  nextInode: 1,
  nameTable: null,
  currentPath: '/',
  initialized: false,
  ignorePermissions: true,
  trackingDelegate: {},
  tracking: { openFlags: { READ: 1, WRITE: 2 } },
  ErrnoError: null,
  genericErrors: {},
  filesystems: null,
  syncFSRequests: 0,
  lookupPath: function (path, opts) {
    path = PATH_FS.resolve(FS.cwd(), path)
    opts = opts || {}
    if (!path) return { path: '', node: null }
    var defaults = { follow_mount: true, recurse_count: 0 }
    for (var key in defaults) {
      if (opts[key] === undefined) {
        opts[key] = defaults[key]
      }
    }
    if (opts.recurse_count > 8) {
      throw new FS.ErrnoError(32)
    }
    var parts = PATH.normalizeArray(
      path.split('/').filter(function (p) {
        return !!p
      }),
      false
    )
    var current = FS.root
    var current_path = '/'
    for (var i = 0; i < parts.length; i++) {
      var islast = i === parts.length - 1
      if (islast && opts.parent) {
        break
      }
      current = FS.lookupNode(current, parts[i])
      current_path = PATH.join2(current_path, parts[i])
      if (FS.isMountpoint(current)) {
        if (!islast || (islast && opts.follow_mount)) {
          current = current.mounted.root
        }
      }
      if (!islast || opts.follow) {
        var count = 0
        while (FS.isLink(current.mode)) {
          var link = FS.readlink(current_path)
          current_path = PATH_FS.resolve(PATH.dirname(current_path), link)
          var lookup = FS.lookupPath(current_path, {
            recurse_count: opts.recurse_count
          })
          current = lookup.node
          if (count++ > 40) {
            throw new FS.ErrnoError(32)
          }
        }
      }
    }
    return { path: current_path, node: current }
  },
  getPath: function (node) {
    var path
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint
        if (!path) return mount
        return mount[mount.length - 1] !== '/'
          ? mount + '/' + path
          : mount + path
      }
      path = path ? node.name + '/' + path : node.name
      node = node.parent
    }
  },
  hashName: function (parentid, name) {
    var hash = 0
    for (var i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
    }
    return ((parentid + hash) >>> 0) % FS.nameTable.length
  },
  hashAddNode: function (node) {
    var hash = FS.hashName(node.parent.id, node.name)
    node.name_next = FS.nameTable[hash]
    FS.nameTable[hash] = node
  },
  hashRemoveNode: function (node) {
    var hash = FS.hashName(node.parent.id, node.name)
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next
    } else {
      var current = FS.nameTable[hash]
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next
          break
        }
        current = current.name_next
      }
    }
  },
  lookupNode: function (parent, name) {
    var errCode = FS.mayLookup(parent)
    if (errCode) {
      throw new FS.ErrnoError(errCode, parent)
    }
    var hash = FS.hashName(parent.id, name)
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name
      if (node.parent.id === parent.id && nodeName === name) {
        return node
      }
    }
    return FS.lookup(parent, name)
  },
  createNode: function (parent, name, mode, rdev) {
    assert(typeof parent === 'object')
    var node = new FS.FSNode(parent, name, mode, rdev)
    FS.hashAddNode(node)
    return node
  },
  destroyNode: function (node) {
    FS.hashRemoveNode(node)
  },
  isRoot: function (node) {
    return node === node.parent
  },
  isMountpoint: function (node) {
    return !!node.mounted
  },
  isFile: function (mode) {
    return (mode & 61440) === 32768
  },
  isDir: function (mode) {
    return (mode & 61440) === 16384
  },
  isLink: function (mode) {
    return (mode & 61440) === 40960
  },
  isChrdev: function (mode) {
    return (mode & 61440) === 8192
  },
  isBlkdev: function (mode) {
    return (mode & 61440) === 24576
  },
  isFIFO: function (mode) {
    return (mode & 61440) === 4096
  },
  isSocket: function (mode) {
    return (mode & 49152) === 49152
  },
  flagModes: { r: 0, 'r+': 2, w: 577, 'w+': 578, a: 1089, 'a+': 1090 },
  modeStringToFlags: function (str) {
    var flags = FS.flagModes[str]
    if (typeof flags === 'undefined') {
      throw new Error('Unknown file open mode: ' + str)
    }
    return flags
  },
  flagsToPermissionString: function (flag) {
    var perms = ['r', 'w', 'rw'][flag & 3]
    if (flag & 512) {
      perms += 'w'
    }
    return perms
  },
  nodePermissions: function (node, perms) {
    if (FS.ignorePermissions) {
      return 0
    }
    if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
      return 2
    } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
      return 2
    } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
      return 2
    }
    return 0
  },
  mayLookup: function (dir) {
    var errCode = FS.nodePermissions(dir, 'x')
    if (errCode) return errCode
    if (!dir.node_ops.lookup) return 2
    return 0
  },
  mayCreate: function (dir, name) {
    try {
      var node = FS.lookupNode(dir, name)
      return 20
    } catch (e) {}
    return FS.nodePermissions(dir, 'wx')
  },
  mayDelete: function (dir, name, isdir) {
    var node
    try {
      node = FS.lookupNode(dir, name)
    } catch (e) {
      return e.errno
    }
    var errCode = FS.nodePermissions(dir, 'wx')
    if (errCode) {
      return errCode
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10
      }
    } else {
      if (FS.isDir(node.mode)) {
        return 31
      }
    }
    return 0
  },
  mayOpen: function (node, flags) {
    if (!node) {
      return 44
    }
    if (FS.isLink(node.mode)) {
      return 32
    } else if (FS.isDir(node.mode)) {
      if (FS.flagsToPermissionString(flags) !== 'r' || flags & 512) {
        return 31
      }
    }
    return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
  },
  MAX_OPEN_FDS: 4096,
  nextfd: function (fd_start, fd_end) {
    fd_start = fd_start || 0
    fd_end = fd_end || FS.MAX_OPEN_FDS
    for (var fd = fd_start; fd <= fd_end; fd++) {
      if (!FS.streams[fd]) {
        return fd
      }
    }
    throw new FS.ErrnoError(33)
  },
  getStream: function (fd) {
    return FS.streams[fd]
  },
  createStream: function (stream, fd_start, fd_end) {
    if (!FS.FSStream) {
      FS.FSStream = function () {}
      FS.FSStream.prototype = {
        object: {
          get: function () {
            return this.node
          },
          set: function (val) {
            this.node = val
          }
        },
        isRead: {
          get: function () {
            return (this.flags & 2097155) !== 1
          }
        },
        isWrite: {
          get: function () {
            return (this.flags & 2097155) !== 0
          }
        },
        isAppend: {
          get: function () {
            return this.flags & 1024
          }
        }
      }
    }
    var newStream = new FS.FSStream()
    for (var p in stream) {
      newStream[p] = stream[p]
    }
    stream = newStream
    var fd = FS.nextfd(fd_start, fd_end)
    stream.fd = fd
    FS.streams[fd] = stream
    return stream
  },
  closeStream: function (fd) {
    FS.streams[fd] = null
  },
  chrdev_stream_ops: {
    open: function (stream) {
      var device = FS.getDevice(stream.node.rdev)
      stream.stream_ops = device.stream_ops
      if (stream.stream_ops.open) {
        stream.stream_ops.open(stream)
      }
    },
    llseek: function () {
      throw new FS.ErrnoError(70)
    }
  },
  major: function (dev) {
    return dev >> 8
  },
  minor: function (dev) {
    return dev & 255
  },
  makedev: function (ma, mi) {
    return (ma << 8) | mi
  },
  registerDevice: function (dev, ops) {
    FS.devices[dev] = { stream_ops: ops }
  },
  getDevice: function (dev) {
    return FS.devices[dev]
  },
  getMounts: function (mount) {
    var mounts = []
    var check = [mount]
    while (check.length) {
      var m = check.pop()
      mounts.push(m)
      check.push.apply(check, m.mounts)
    }
    return mounts
  },
  syncfs: function (populate, callback) {
    if (typeof populate === 'function') {
      callback = populate
      populate = false
    }
    FS.syncFSRequests++
    if (FS.syncFSRequests > 1) {
      err(
        'warning: ' +
          FS.syncFSRequests +
          ' FS.syncfs operations in flight at once, probably just doing extra work'
      )
    }
    var mounts = FS.getMounts(FS.root.mount)
    var completed = 0
    function doCallback(errCode) {
      assert(FS.syncFSRequests > 0)
      FS.syncFSRequests--
      return callback(errCode)
    }
    function done(errCode) {
      if (errCode) {
        if (!done.errored) {
          done.errored = true
          return doCallback(errCode)
        }
        return
      }
      if (++completed >= mounts.length) {
        doCallback(null)
      }
    }
    mounts.forEach(function (mount) {
      if (!mount.type.syncfs) {
        return done(null)
      }
      mount.type.syncfs(mount, populate, done)
    })
  },
  mount: function (type, opts, mountpoint) {
    if (typeof type === 'string') {
      throw type
    }
    var root = mountpoint === '/'
    var pseudo = !mountpoint
    var node
    if (root && FS.root) {
      throw new FS.ErrnoError(10)
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
      mountpoint = lookup.path
      node = lookup.node
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10)
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54)
      }
    }
    var mount = { type: type, opts: opts, mountpoint: mountpoint, mounts: [] }
    var mountRoot = type.mount(mount)
    mountRoot.mount = mount
    mount.root = mountRoot
    if (root) {
      FS.root = mountRoot
    } else if (node) {
      node.mounted = mount
      if (node.mount) {
        node.mount.mounts.push(mount)
      }
    }
    return mountRoot
  },
  unmount: function (mountpoint) {
    var lookup = FS.lookupPath(mountpoint, { follow_mount: false })
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28)
    }
    var node = lookup.node
    var mount = node.mounted
    var mounts = FS.getMounts(mount)
    Object.keys(FS.nameTable).forEach(function (hash) {
      var current = FS.nameTable[hash]
      while (current) {
        var next = current.name_next
        if (mounts.indexOf(current.mount) !== -1) {
          FS.destroyNode(current)
        }
        current = next
      }
    })
    node.mounted = null
    var idx = node.mount.mounts.indexOf(mount)
    assert(idx !== -1)
    node.mount.mounts.splice(idx, 1)
  },
  lookup: function (parent, name) {
    return parent.node_ops.lookup(parent, name)
  },
  mknod: function (path, mode, dev) {
    var lookup = FS.lookupPath(path, { parent: true })
    var parent = lookup.node
    var name = PATH.basename(path)
    if (!name || name === '.' || name === '..') {
      throw new FS.ErrnoError(28)
    }
    var errCode = FS.mayCreate(parent, name)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63)
    }
    return parent.node_ops.mknod(parent, name, mode, dev)
  },
  create: function (path, mode) {
    mode = mode !== undefined ? mode : 438
    mode &= 4095
    mode |= 32768
    return FS.mknod(path, mode, 0)
  },
  mkdir: function (path, mode) {
    mode = mode !== undefined ? mode : 511
    mode &= 511 | 512
    mode |= 16384
    return FS.mknod(path, mode, 0)
  },
  mkdirTree: function (path, mode) {
    var dirs = path.split('/')
    var d = ''
    for (var i = 0; i < dirs.length; ++i) {
      if (!dirs[i]) continue
      d += '/' + dirs[i]
      try {
        FS.mkdir(d, mode)
      } catch (e) {
        if (e.errno != 20) throw e
      }
    }
  },
  mkdev: function (path, mode, dev) {
    if (typeof dev === 'undefined') {
      dev = mode
      mode = 438
    }
    mode |= 8192
    return FS.mknod(path, mode, dev)
  },
  symlink: function (oldpath, newpath) {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44)
    }
    var lookup = FS.lookupPath(newpath, { parent: true })
    var parent = lookup.node
    if (!parent) {
      throw new FS.ErrnoError(44)
    }
    var newname = PATH.basename(newpath)
    var errCode = FS.mayCreate(parent, newname)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63)
    }
    return parent.node_ops.symlink(parent, newname, oldpath)
  },
  rename: function (old_path, new_path) {
    var old_dirname = PATH.dirname(old_path)
    var new_dirname = PATH.dirname(new_path)
    var old_name = PATH.basename(old_path)
    var new_name = PATH.basename(new_path)
    var lookup, old_dir, new_dir
    lookup = FS.lookupPath(old_path, { parent: true })
    old_dir = lookup.node
    lookup = FS.lookupPath(new_path, { parent: true })
    new_dir = lookup.node
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44)
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75)
    }
    var old_node = FS.lookupNode(old_dir, old_name)
    var relative = PATH_FS.relative(old_path, new_dirname)
    if (relative.charAt(0) !== '.') {
      throw new FS.ErrnoError(28)
    }
    relative = PATH_FS.relative(new_path, old_dirname)
    if (relative.charAt(0) !== '.') {
      throw new FS.ErrnoError(55)
    }
    var new_node
    try {
      new_node = FS.lookupNode(new_dir, new_name)
    } catch (e) {}
    if (old_node === new_node) {
      return
    }
    var isdir = FS.isDir(old_node.mode)
    var errCode = FS.mayDelete(old_dir, old_name, isdir)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    errCode = new_node
      ? FS.mayDelete(new_dir, new_name, isdir)
      : FS.mayCreate(new_dir, new_name)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63)
    }
    if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
      throw new FS.ErrnoError(10)
    }
    if (new_dir !== old_dir) {
      errCode = FS.nodePermissions(old_dir, 'w')
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
    }
    try {
      if (FS.trackingDelegate['willMovePath']) {
        FS.trackingDelegate['willMovePath'](old_path, new_path)
      }
    } catch (e) {
      err(
        "FS.trackingDelegate['willMovePath']('" +
          old_path +
          "', '" +
          new_path +
          "') threw an exception: " +
          e.message
      )
    }
    FS.hashRemoveNode(old_node)
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name)
    } catch (e) {
      throw e
    } finally {
      FS.hashAddNode(old_node)
    }
    try {
      if (FS.trackingDelegate['onMovePath'])
        FS.trackingDelegate['onMovePath'](old_path, new_path)
    } catch (e) {
      err(
        "FS.trackingDelegate['onMovePath']('" +
          old_path +
          "', '" +
          new_path +
          "') threw an exception: " +
          e.message
      )
    }
  },
  rmdir: function (path) {
    var lookup = FS.lookupPath(path, { parent: true })
    var parent = lookup.node
    var name = PATH.basename(path)
    var node = FS.lookupNode(parent, name)
    var errCode = FS.mayDelete(parent, name, true)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63)
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10)
    }
    try {
      if (FS.trackingDelegate['willDeletePath']) {
        FS.trackingDelegate['willDeletePath'](path)
      }
    } catch (e) {
      err(
        "FS.trackingDelegate['willDeletePath']('" +
          path +
          "') threw an exception: " +
          e.message
      )
    }
    parent.node_ops.rmdir(parent, name)
    FS.destroyNode(node)
    try {
      if (FS.trackingDelegate['onDeletePath'])
        FS.trackingDelegate['onDeletePath'](path)
    } catch (e) {
      err(
        "FS.trackingDelegate['onDeletePath']('" +
          path +
          "') threw an exception: " +
          e.message
      )
    }
  },
  readdir: function (path) {
    var lookup = FS.lookupPath(path, { follow: true })
    var node = lookup.node
    if (!node.node_ops.readdir) {
      throw new FS.ErrnoError(54)
    }
    return node.node_ops.readdir(node)
  },
  unlink: function (path) {
    var lookup = FS.lookupPath(path, { parent: true })
    var parent = lookup.node
    var name = PATH.basename(path)
    var node = FS.lookupNode(parent, name)
    var errCode = FS.mayDelete(parent, name, false)
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63)
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10)
    }
    try {
      if (FS.trackingDelegate['willDeletePath']) {
        FS.trackingDelegate['willDeletePath'](path)
      }
    } catch (e) {
      err(
        "FS.trackingDelegate['willDeletePath']('" +
          path +
          "') threw an exception: " +
          e.message
      )
    }
    parent.node_ops.unlink(parent, name)
    FS.destroyNode(node)
    try {
      if (FS.trackingDelegate['onDeletePath'])
        FS.trackingDelegate['onDeletePath'](path)
    } catch (e) {
      err(
        "FS.trackingDelegate['onDeletePath']('" +
          path +
          "') threw an exception: " +
          e.message
      )
    }
  },
  readlink: function (path) {
    var lookup = FS.lookupPath(path)
    var link = lookup.node
    if (!link) {
      throw new FS.ErrnoError(44)
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28)
    }
    return PATH_FS.resolve(
      FS.getPath(link.parent),
      link.node_ops.readlink(link)
    )
  },
  stat: function (path, dontFollow) {
    var lookup = FS.lookupPath(path, { follow: !dontFollow })
    var node = lookup.node
    if (!node) {
      throw new FS.ErrnoError(44)
    }
    if (!node.node_ops.getattr) {
      throw new FS.ErrnoError(63)
    }
    return node.node_ops.getattr(node)
  },
  lstat: function (path) {
    return FS.stat(path, true)
  },
  chmod: function (path, mode, dontFollow) {
    var node
    if (typeof path === 'string') {
      var lookup = FS.lookupPath(path, { follow: !dontFollow })
      node = lookup.node
    } else {
      node = path
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63)
    }
    node.node_ops.setattr(node, {
      mode: (mode & 4095) | (node.mode & ~4095),
      timestamp: Date.now()
    })
  },
  lchmod: function (path, mode) {
    FS.chmod(path, mode, true)
  },
  fchmod: function (fd, mode) {
    var stream = FS.getStream(fd)
    if (!stream) {
      throw new FS.ErrnoError(8)
    }
    FS.chmod(stream.node, mode)
  },
  chown: function (path, uid, gid, dontFollow) {
    var node
    if (typeof path === 'string') {
      var lookup = FS.lookupPath(path, { follow: !dontFollow })
      node = lookup.node
    } else {
      node = path
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63)
    }
    node.node_ops.setattr(node, { timestamp: Date.now() })
  },
  lchown: function (path, uid, gid) {
    FS.chown(path, uid, gid, true)
  },
  fchown: function (fd, uid, gid) {
    var stream = FS.getStream(fd)
    if (!stream) {
      throw new FS.ErrnoError(8)
    }
    FS.chown(stream.node, uid, gid)
  },
  truncate: function (path, len) {
    if (len < 0) {
      throw new FS.ErrnoError(28)
    }
    var node
    if (typeof path === 'string') {
      var lookup = FS.lookupPath(path, { follow: true })
      node = lookup.node
    } else {
      node = path
    }
    if (!node.node_ops.setattr) {
      throw new FS.ErrnoError(63)
    }
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31)
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28)
    }
    var errCode = FS.nodePermissions(node, 'w')
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    node.node_ops.setattr(node, { size: len, timestamp: Date.now() })
  },
  ftruncate: function (fd, len) {
    var stream = FS.getStream(fd)
    if (!stream) {
      throw new FS.ErrnoError(8)
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28)
    }
    FS.truncate(stream.node, len)
  },
  utime: function (path, atime, mtime) {
    var lookup = FS.lookupPath(path, { follow: true })
    var node = lookup.node
    node.node_ops.setattr(node, { timestamp: Math.max(atime, mtime) })
  },
  open: function (path, flags, mode, fd_start, fd_end) {
    if (path === '') {
      throw new FS.ErrnoError(44)
    }
    flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags
    mode = typeof mode === 'undefined' ? 438 : mode
    if (flags & 64) {
      mode = (mode & 4095) | 32768
    } else {
      mode = 0
    }
    var node
    if (typeof path === 'object') {
      node = path
    } else {
      path = PATH.normalize(path)
      try {
        var lookup = FS.lookupPath(path, { follow: !(flags & 131072) })
        node = lookup.node
      } catch (e) {}
    }
    var created = false
    if (flags & 64) {
      if (node) {
        if (flags & 128) {
          throw new FS.ErrnoError(20)
        }
      } else {
        node = FS.mknod(path, mode, 0)
        created = true
      }
    }
    if (!node) {
      throw new FS.ErrnoError(44)
    }
    if (FS.isChrdev(node.mode)) {
      flags &= ~512
    }
    if (flags & 65536 && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(54)
    }
    if (!created) {
      var errCode = FS.mayOpen(node, flags)
      if (errCode) {
        throw new FS.ErrnoError(errCode)
      }
    }
    if (flags & 512) {
      FS.truncate(node, 0)
    }
    flags &= ~(128 | 512 | 131072)
    var stream = FS.createStream(
      {
        node: node,
        path: FS.getPath(node),
        flags: flags,
        seekable: true,
        position: 0,
        stream_ops: node.stream_ops,
        ungotten: [],
        error: false
      },
      fd_start,
      fd_end
    )
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream)
    }
    if (Module['logReadFiles'] && !(flags & 1)) {
      if (!FS.readFiles) FS.readFiles = {}
      if (!(path in FS.readFiles)) {
        FS.readFiles[path] = 1
        err('FS.trackingDelegate error on read file: ' + path)
      }
    }
    try {
      if (FS.trackingDelegate['onOpenFile']) {
        var trackingFlags = 0
        if ((flags & 2097155) !== 1) {
          trackingFlags |= FS.tracking.openFlags.READ
        }
        if ((flags & 2097155) !== 0) {
          trackingFlags |= FS.tracking.openFlags.WRITE
        }
        FS.trackingDelegate['onOpenFile'](path, trackingFlags)
      }
    } catch (e) {
      err(
        "FS.trackingDelegate['onOpenFile']('" +
          path +
          "', flags) threw an exception: " +
          e.message
      )
    }
    return stream
  },
  close: function (stream) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8)
    }
    if (stream.getdents) stream.getdents = null
    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream)
      }
    } catch (e) {
      throw e
    } finally {
      FS.closeStream(stream.fd)
    }
    stream.fd = null
  },
  isClosed: function (stream) {
    return stream.fd === null
  },
  llseek: function (stream, offset, whence) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8)
    }
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(70)
    }
    if (whence != 0 && whence != 1 && whence != 2) {
      throw new FS.ErrnoError(28)
    }
    stream.position = stream.stream_ops.llseek(stream, offset, whence)
    stream.ungotten = []
    return stream.position
  },
  read: function (stream, buffer, offset, length, position) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28)
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8)
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(8)
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31)
    }
    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(28)
    }
    var seeking = typeof position !== 'undefined'
    if (!seeking) {
      position = stream.position
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70)
    }
    var bytesRead = stream.stream_ops.read(
      stream,
      buffer,
      offset,
      length,
      position
    )
    if (!seeking) stream.position += bytesRead
    return bytesRead
  },
  write: function (stream, buffer, offset, length, position, canOwn) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28)
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8)
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8)
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31)
    }
    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(28)
    }
    if (stream.seekable && stream.flags & 1024) {
      FS.llseek(stream, 0, 2)
    }
    var seeking = typeof position !== 'undefined'
    if (!seeking) {
      position = stream.position
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70)
    }
    var bytesWritten = stream.stream_ops.write(
      stream,
      buffer,
      offset,
      length,
      position,
      canOwn
    )
    if (!seeking) stream.position += bytesWritten
    try {
      if (stream.path && FS.trackingDelegate['onWriteToFile'])
        FS.trackingDelegate['onWriteToFile'](stream.path)
    } catch (e) {
      err(
        "FS.trackingDelegate['onWriteToFile']('" +
          stream.path +
          "') threw an exception: " +
          e.message
      )
    }
    return bytesWritten
  },
  allocate: function (stream, offset, length) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8)
    }
    if (offset < 0 || length <= 0) {
      throw new FS.ErrnoError(28)
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8)
    }
    if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(43)
    }
    if (!stream.stream_ops.allocate) {
      throw new FS.ErrnoError(138)
    }
    stream.stream_ops.allocate(stream, offset, length)
  },
  mmap: function (stream, address, length, position, prot, flags) {
    if (
      (prot & 2) !== 0 &&
      (flags & 2) === 0 &&
      (stream.flags & 2097155) !== 2
    ) {
      throw new FS.ErrnoError(2)
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(2)
    }
    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(43)
    }
    return stream.stream_ops.mmap(
      stream,
      address,
      length,
      position,
      prot,
      flags
    )
  },
  msync: function (stream, buffer, offset, length, mmapFlags) {
    if (!stream || !stream.stream_ops.msync) {
      return 0
    }
    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
  },
  munmap: function (stream) {
    return 0
  },
  ioctl: function (stream, cmd, arg) {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(59)
    }
    return stream.stream_ops.ioctl(stream, cmd, arg)
  },
  readFile: function (path, opts) {
    opts = opts || {}
    opts.flags = opts.flags || 0
    opts.encoding = opts.encoding || 'binary'
    if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
      throw new Error('Invalid encoding type "' + opts.encoding + '"')
    }
    var ret
    var stream = FS.open(path, opts.flags)
    var stat = FS.stat(path)
    var length = stat.size
    var buf = new Uint8Array(length)
    FS.read(stream, buf, 0, length, 0)
    if (opts.encoding === 'utf8') {
      ret = UTF8ArrayToString(buf, 0)
    } else if (opts.encoding === 'binary') {
      ret = buf
    }
    FS.close(stream)
    return ret
  },
  writeFile: function (path, data, opts) {
    opts = opts || {}
    opts.flags = opts.flags || 577
    var stream = FS.open(path, opts.flags, opts.mode)
    if (typeof data === 'string') {
      var buf = new Uint8Array(lengthBytesUTF8(data) + 1)
      var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length)
      FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
    } else if (ArrayBuffer.isView(data)) {
      FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
    } else {
      throw new Error('Unsupported data type')
    }
    FS.close(stream)
  },
  cwd: function () {
    return FS.currentPath
  },
  chdir: function (path) {
    var lookup = FS.lookupPath(path, { follow: true })
    if (lookup.node === null) {
      throw new FS.ErrnoError(44)
    }
    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(54)
    }
    var errCode = FS.nodePermissions(lookup.node, 'x')
    if (errCode) {
      throw new FS.ErrnoError(errCode)
    }
    FS.currentPath = lookup.path
  },
  createDefaultDirectories: function () {
    FS.mkdir('/tmp')
    FS.mkdir('/home')
    FS.mkdir('/home/web_user')
  },
  createDefaultDevices: function () {
    FS.mkdir('/dev')
    FS.registerDevice(FS.makedev(1, 3), {
      read: function () {
        return 0
      },
      write: function (stream, buffer, offset, length, pos) {
        return length
      }
    })
    FS.mkdev('/dev/null', FS.makedev(1, 3))
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops)
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops)
    FS.mkdev('/dev/tty', FS.makedev(5, 0))
    FS.mkdev('/dev/tty1', FS.makedev(6, 0))
    var random_device = getRandomDevice()
    FS.createDevice('/dev', 'random', random_device)
    FS.createDevice('/dev', 'urandom', random_device)
    FS.mkdir('/dev/shm')
    FS.mkdir('/dev/shm/tmp')
  },
  createSpecialDirectories: function () {
    FS.mkdir('/proc')
    var proc_self = FS.mkdir('/proc/self')
    FS.mkdir('/proc/self/fd')
    FS.mount(
      {
        mount: function () {
          var node = FS.createNode(proc_self, 'fd', 16384 | 511, 73)
          node.node_ops = {
            lookup: function (parent, name) {
              var fd = +name
              var stream = FS.getStream(fd)
              if (!stream) throw new FS.ErrnoError(8)
              var ret = {
                parent: null,
                mount: { mountpoint: 'fake' },
                node_ops: {
                  readlink: function () {
                    return stream.path
                  }
                }
              }
              ret.parent = ret
              return ret
            }
          }
          return node
        }
      },
      {},
      '/proc/self/fd'
    )
  },
  createStandardStreams: function () {
    if (Module['stdin']) {
      FS.createDevice('/dev', 'stdin', Module['stdin'])
    } else {
      FS.symlink('/dev/tty', '/dev/stdin')
    }
    if (Module['stdout']) {
      FS.createDevice('/dev', 'stdout', null, Module['stdout'])
    } else {
      FS.symlink('/dev/tty', '/dev/stdout')
    }
    if (Module['stderr']) {
      FS.createDevice('/dev', 'stderr', null, Module['stderr'])
    } else {
      FS.symlink('/dev/tty1', '/dev/stderr')
    }
    var stdin = FS.open('/dev/stdin', 0)
    var stdout = FS.open('/dev/stdout', 1)
    var stderr = FS.open('/dev/stderr', 1)
    assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')')
    assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')')
    assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')')
  },
  ensureErrnoError: function () {
    if (FS.ErrnoError) return
    FS.ErrnoError = function ErrnoError(errno, node) {
      this.node = node
      this.setErrno = function (errno) {
        this.errno = errno
        for (var key in ERRNO_CODES) {
          if (ERRNO_CODES[key] === errno) {
            this.code = key
            break
          }
        }
      }
      this.setErrno(errno)
      this.message = ERRNO_MESSAGES[errno]
      if (this.stack) {
        Object.defineProperty(this, 'stack', {
          value: new Error().stack,
          writable: true
        })
        this.stack = demangleAll(this.stack)
      }
    }
    FS.ErrnoError.prototype = new Error()
    FS.ErrnoError.prototype.constructor = FS.ErrnoError
    ;[44].forEach(function (code) {
      FS.genericErrors[code] = new FS.ErrnoError(code)
      FS.genericErrors[code].stack = '<generic error, no stack>'
    })
  },
  staticInit: function () {
    FS.ensureErrnoError()
    FS.nameTable = new Array(4096)
    FS.mount(MEMFS, {}, '/')
    FS.createDefaultDirectories()
    FS.createDefaultDevices()
    FS.createSpecialDirectories()
    FS.filesystems = { MEMFS: MEMFS }
  },
  init: function (input, output, error) {
    assert(
      !FS.init.initialized,
      'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)'
    )
    FS.init.initialized = true
    FS.ensureErrnoError()
    Module['stdin'] = input || Module['stdin']
    Module['stdout'] = output || Module['stdout']
    Module['stderr'] = error || Module['stderr']
    FS.createStandardStreams()
  },
  quit: function () {
    FS.init.initialized = false
    var fflush = Module['_fflush']
    if (fflush) fflush(0)
    for (var i = 0; i < FS.streams.length; i++) {
      var stream = FS.streams[i]
      if (!stream) {
        continue
      }
      FS.close(stream)
    }
  },
  getMode: function (canRead, canWrite) {
    var mode = 0
    if (canRead) mode |= 292 | 73
    if (canWrite) mode |= 146
    return mode
  },
  findObject: function (path, dontResolveLastLink) {
    var ret = FS.analyzePath(path, dontResolveLastLink)
    if (ret.exists) {
      return ret.object
    } else {
      return null
    }
  },
  analyzePath: function (path, dontResolveLastLink) {
    try {
      var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
      path = lookup.path
    } catch (e) {}
    var ret = {
      isRoot: false,
      exists: false,
      error: 0,
      name: null,
      path: null,
      object: null,
      parentExists: false,
      parentPath: null,
      parentObject: null
    }
    try {
      var lookup = FS.lookupPath(path, { parent: true })
      ret.parentExists = true
      ret.parentPath = lookup.path
      ret.parentObject = lookup.node
      ret.name = PATH.basename(path)
      lookup = FS.lookupPath(path, { follow: !dontResolveLastLink })
      ret.exists = true
      ret.path = lookup.path
      ret.object = lookup.node
      ret.name = lookup.node.name
      ret.isRoot = lookup.path === '/'
    } catch (e) {
      ret.error = e.errno
    }
    return ret
  },
  createPath: function (parent, path, canRead, canWrite) {
    parent = typeof parent === 'string' ? parent : FS.getPath(parent)
    var parts = path.split('/').reverse()
    while (parts.length) {
      var part = parts.pop()
      if (!part) continue
      var current = PATH.join2(parent, part)
      try {
        FS.mkdir(current)
      } catch (e) {}
      parent = current
    }
    return current
  },
  createFile: function (parent, name, properties, canRead, canWrite) {
    var path = PATH.join2(
      typeof parent === 'string' ? parent : FS.getPath(parent),
      name
    )
    var mode = FS.getMode(canRead, canWrite)
    return FS.create(path, mode)
  },
  createDataFile: function (parent, name, data, canRead, canWrite, canOwn) {
    var path = name
      ? PATH.join2(
          typeof parent === 'string' ? parent : FS.getPath(parent),
          name
        )
      : parent
    var mode = FS.getMode(canRead, canWrite)
    var node = FS.create(path, mode)
    if (data) {
      if (typeof data === 'string') {
        var arr = new Array(data.length)
        for (var i = 0, len = data.length; i < len; ++i)
          arr[i] = data.charCodeAt(i)
        data = arr
      }
      FS.chmod(node, mode | 146)
      var stream = FS.open(node, 577)
      FS.write(stream, data, 0, data.length, 0, canOwn)
      FS.close(stream)
      FS.chmod(node, mode)
    }
    return node
  },
  createDevice: function (parent, name, input, output) {
    var path = PATH.join2(
      typeof parent === 'string' ? parent : FS.getPath(parent),
      name
    )
    var mode = FS.getMode(!!input, !!output)
    if (!FS.createDevice.major) FS.createDevice.major = 64
    var dev = FS.makedev(FS.createDevice.major++, 0)
    FS.registerDevice(dev, {
      open: function (stream) {
        stream.seekable = false
      },
      close: function (stream) {
        if (output && output.buffer && output.buffer.length) {
          output(10)
        }
      },
      read: function (stream, buffer, offset, length, pos) {
        var bytesRead = 0
        for (var i = 0; i < length; i++) {
          var result
          try {
            result = input()
          } catch (e) {
            throw new FS.ErrnoError(29)
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6)
          }
          if (result === null || result === undefined) break
          bytesRead++
          buffer[offset + i] = result
        }
        if (bytesRead) {
          stream.node.timestamp = Date.now()
        }
        return bytesRead
      },
      write: function (stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i])
          } catch (e) {
            throw new FS.ErrnoError(29)
          }
        }
        if (length) {
          stream.node.timestamp = Date.now()
        }
        return i
      }
    })
    return FS.mkdev(path, mode, dev)
  },
  forceLoadFile: function (obj) {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true
    if (typeof XMLHttpRequest !== 'undefined') {
      throw new Error(
        'Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.'
      )
    } else if (read_) {
      try {
        obj.contents = intArrayFromString(read_(obj.url), true)
        obj.usedBytes = obj.contents.length
      } catch (e) {
        throw new FS.ErrnoError(29)
      }
    } else {
      throw new Error('Cannot load without read() or XMLHttpRequest.')
    }
  },
  createLazyFile: function (parent, name, url, canRead, canWrite) {
    function LazyUint8Array() {
      this.lengthKnown = false
      this.chunks = []
    }
    LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
      if (idx > this.length - 1 || idx < 0) {
        return undefined
      }
      var chunkOffset = idx % this.chunkSize
      var chunkNum = (idx / this.chunkSize) | 0
      return this.getter(chunkNum)[chunkOffset]
    }
    LazyUint8Array.prototype.setDataGetter =
      function LazyUint8Array_setDataGetter(getter) {
        this.getter = getter
      }
    LazyUint8Array.prototype.cacheLength =
      function LazyUint8Array_cacheLength() {
        var xhr = new XMLHttpRequest()
        xhr.open('HEAD', url, false)
        xhr.send(null)
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
          throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
        var datalength = Number(xhr.getResponseHeader('Content-length'))
        var header
        var hasByteServing =
          (header = xhr.getResponseHeader('Accept-Ranges')) &&
          header === 'bytes'
        var usesGzip =
          (header = xhr.getResponseHeader('Content-Encoding')) &&
          header === 'gzip'
        var chunkSize = 1024 * 1024
        if (!hasByteServing) chunkSize = datalength
        var doXHR = function (from, to) {
          if (from > to)
            throw new Error(
              'invalid range (' + from + ', ' + to + ') or no bytes requested!'
            )
          if (to > datalength - 1)
            throw new Error(
              'only ' + datalength + ' bytes available! programmer error!'
            )
          var xhr = new XMLHttpRequest()
          xhr.open('GET', url, false)
          if (datalength !== chunkSize)
            xhr.setRequestHeader('Range', 'bytes=' + from + '-' + to)
          if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer'
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined')
          }
          xhr.send(null)
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            throw new Error("Couldn't load " + url + '. Status: ' + xhr.status)
          if (xhr.response !== undefined) {
            return new Uint8Array(xhr.response || [])
          } else {
            return intArrayFromString(xhr.responseText || '', true)
          }
        }
        var lazyArray = this
        lazyArray.setDataGetter(function (chunkNum) {
          var start = chunkNum * chunkSize
          var end = (chunkNum + 1) * chunkSize - 1
          end = Math.min(end, datalength - 1)
          if (typeof lazyArray.chunks[chunkNum] === 'undefined') {
            lazyArray.chunks[chunkNum] = doXHR(start, end)
          }
          if (typeof lazyArray.chunks[chunkNum] === 'undefined')
            throw new Error('doXHR failed!')
          return lazyArray.chunks[chunkNum]
        })
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1
          datalength = this.getter(0).length
          chunkSize = datalength
          out(
            'LazyFiles on gzip forces download of the whole file when length is accessed'
          )
        }
        this._length = datalength
        this._chunkSize = chunkSize
        this.lengthKnown = true
      }
    if (typeof XMLHttpRequest !== 'undefined') {
      if (!ENVIRONMENT_IS_WORKER)
        throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc'
      var lazyArray = new LazyUint8Array()
      Object.defineProperties(lazyArray, {
        length: {
          get: function () {
            if (!this.lengthKnown) {
              this.cacheLength()
            }
            return this._length
          }
        },
        chunkSize: {
          get: function () {
            if (!this.lengthKnown) {
              this.cacheLength()
            }
            return this._chunkSize
          }
        }
      })
      var properties = { isDevice: false, contents: lazyArray }
    } else {
      var properties = { isDevice: false, url: url }
    }
    var node = FS.createFile(parent, name, properties, canRead, canWrite)
    if (properties.contents) {
      node.contents = properties.contents
    } else if (properties.url) {
      node.contents = null
      node.url = properties.url
    }
    Object.defineProperties(node, {
      usedBytes: {
        get: function () {
          return this.contents.length
        }
      }
    })
    var stream_ops = {}
    var keys = Object.keys(node.stream_ops)
    keys.forEach(function (key) {
      var fn = node.stream_ops[key]
      stream_ops[key] = function forceLoadLazyFile() {
        FS.forceLoadFile(node)
        return fn.apply(null, arguments)
      }
    })
    stream_ops.read = function stream_ops_read(
      stream,
      buffer,
      offset,
      length,
      position
    ) {
      FS.forceLoadFile(node)
      var contents = stream.node.contents
      if (position >= contents.length) return 0
      var size = Math.min(contents.length - position, length)
      assert(size >= 0)
      if (contents.slice) {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents[position + i]
        }
      } else {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents.get(position + i)
        }
      }
      return size
    }
    node.stream_ops = stream_ops
    return node
  },
  createPreloadedFile: function (
    parent,
    name,
    url,
    canRead,
    canWrite,
    onload,
    onerror,
    dontCreateFile,
    canOwn,
    preFinish
  ) {
    Browser.init()
    var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent
    var dep = getUniqueRunDependency('cp ' + fullname)
    function processData(byteArray) {
      function finish(byteArray) {
        if (preFinish) preFinish()
        if (!dontCreateFile) {
          FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
        }
        if (onload) onload()
        removeRunDependency(dep)
      }
      var handled = false
      Module['preloadPlugins'].forEach(function (plugin) {
        if (handled) return
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, function () {
            if (onerror) onerror()
            removeRunDependency(dep)
          })
          handled = true
        }
      })
      if (!handled) finish(byteArray)
    }
    addRunDependency(dep)
    if (typeof url == 'string') {
      Browser.asyncLoad(
        url,
        function (byteArray) {
          processData(byteArray)
        },
        onerror
      )
    } else {
      processData(url)
    }
  },
  indexedDB: function () {
    return (
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB
    )
  },
  DB_NAME: function () {
    return 'EM_FS_' + window.location.pathname
  },
  DB_VERSION: 20,
  DB_STORE_NAME: 'FILE_DATA',
  saveFilesToDB: function (paths, onload, onerror) {
    onload = onload || function () {}
    onerror = onerror || function () {}
    var indexedDB = FS.indexedDB()
    try {
      var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
    } catch (e) {
      return onerror(e)
    }
    openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
      out('creating db')
      var db = openRequest.result
      db.createObjectStore(FS.DB_STORE_NAME)
    }
    openRequest.onsuccess = function openRequest_onsuccess() {
      var db = openRequest.result
      var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite')
      var files = transaction.objectStore(FS.DB_STORE_NAME)
      var ok = 0,
        fail = 0,
        total = paths.length
      function finish() {
        if (fail == 0) onload()
        else onerror()
      }
      paths.forEach(function (path) {
        var putRequest = files.put(FS.analyzePath(path).object.contents, path)
        putRequest.onsuccess = function putRequest_onsuccess() {
          ok++
          if (ok + fail == total) finish()
        }
        putRequest.onerror = function putRequest_onerror() {
          fail++
          if (ok + fail == total) finish()
        }
      })
      transaction.onerror = onerror
    }
    openRequest.onerror = onerror
  },
  loadFilesFromDB: function (paths, onload, onerror) {
    onload = onload || function () {}
    onerror = onerror || function () {}
    var indexedDB = FS.indexedDB()
    try {
      var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION)
    } catch (e) {
      return onerror(e)
    }
    openRequest.onupgradeneeded = onerror
    openRequest.onsuccess = function openRequest_onsuccess() {
      var db = openRequest.result
      try {
        var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly')
      } catch (e) {
        onerror(e)
        return
      }
      var files = transaction.objectStore(FS.DB_STORE_NAME)
      var ok = 0,
        fail = 0,
        total = paths.length
      function finish() {
        if (fail == 0) onload()
        else onerror()
      }
      paths.forEach(function (path) {
        var getRequest = files.get(path)
        getRequest.onsuccess = function getRequest_onsuccess() {
          if (FS.analyzePath(path).exists) {
            FS.unlink(path)
          }
          FS.createDataFile(
            PATH.dirname(path),
            PATH.basename(path),
            getRequest.result,
            true,
            true,
            true
          )
          ok++
          if (ok + fail == total) finish()
        }
        getRequest.onerror = function getRequest_onerror() {
          fail++
          if (ok + fail == total) finish()
        }
      })
      transaction.onerror = onerror
    }
    openRequest.onerror = onerror
  },
  absolutePath: function () {
    abort('FS.absolutePath has been removed; use PATH_FS.resolve instead')
  },
  createFolder: function () {
    abort('FS.createFolder has been removed; use FS.mkdir instead')
  },
  createLink: function () {
    abort('FS.createLink has been removed; use FS.symlink instead')
  },
  joinPath: function () {
    abort('FS.joinPath has been removed; use PATH.join instead')
  },
  mmapAlloc: function () {
    abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc')
  },
  standardizePath: function () {
    abort('FS.standardizePath has been removed; use PATH.normalize instead')
  }
}
var SYSCALLS = {
  mappings: {},
  DEFAULT_POLLMASK: 5,
  umask: 511,
  calculateAt: function (dirfd, path, allowEmpty) {
    if (path[0] === '/') {
      return path
    }
    var dir
    if (dirfd === -100) {
      dir = FS.cwd()
    } else {
      var dirstream = FS.getStream(dirfd)
      if (!dirstream) throw new FS.ErrnoError(8)
      dir = dirstream.path
    }
    if (path.length == 0) {
      if (!allowEmpty) {
        throw new FS.ErrnoError(44)
      }
      return dir
    }
    return PATH.join2(dir, path)
  },
  doStat: function (func, path, buf) {
    try {
      var stat = func(path)
    } catch (e) {
      if (
        e &&
        e.node &&
        PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))
      ) {
        return -54
      }
      throw e
    }
    GROWABLE_HEAP_I32()[buf >> 2] = stat.dev
    GROWABLE_HEAP_I32()[(buf + 4) >> 2] = 0
    GROWABLE_HEAP_I32()[(buf + 8) >> 2] = stat.ino
    GROWABLE_HEAP_I32()[(buf + 12) >> 2] = stat.mode
    GROWABLE_HEAP_I32()[(buf + 16) >> 2] = stat.nlink
    GROWABLE_HEAP_I32()[(buf + 20) >> 2] = stat.uid
    GROWABLE_HEAP_I32()[(buf + 24) >> 2] = stat.gid
    GROWABLE_HEAP_I32()[(buf + 28) >> 2] = stat.rdev
    GROWABLE_HEAP_I32()[(buf + 32) >> 2] = 0
    ;(tempI64 = [
      stat.size >>> 0,
      ((tempDouble = stat.size),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0)
    ]),
      (GROWABLE_HEAP_I32()[(buf + 40) >> 2] = tempI64[0]),
      (GROWABLE_HEAP_I32()[(buf + 44) >> 2] = tempI64[1])
    GROWABLE_HEAP_I32()[(buf + 48) >> 2] = 4096
    GROWABLE_HEAP_I32()[(buf + 52) >> 2] = stat.blocks
    GROWABLE_HEAP_I32()[(buf + 56) >> 2] = (stat.atime.getTime() / 1e3) | 0
    GROWABLE_HEAP_I32()[(buf + 60) >> 2] = 0
    GROWABLE_HEAP_I32()[(buf + 64) >> 2] = (stat.mtime.getTime() / 1e3) | 0
    GROWABLE_HEAP_I32()[(buf + 68) >> 2] = 0
    GROWABLE_HEAP_I32()[(buf + 72) >> 2] = (stat.ctime.getTime() / 1e3) | 0
    GROWABLE_HEAP_I32()[(buf + 76) >> 2] = 0
    ;(tempI64 = [
      stat.ino >>> 0,
      ((tempDouble = stat.ino),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0)
    ]),
      (GROWABLE_HEAP_I32()[(buf + 80) >> 2] = tempI64[0]),
      (GROWABLE_HEAP_I32()[(buf + 84) >> 2] = tempI64[1])
    return 0
  },
  doMsync: function (addr, stream, len, flags, offset) {
    var buffer = GROWABLE_HEAP_U8().slice(addr, addr + len)
    FS.msync(stream, buffer, offset, len, flags)
  },
  doMkdir: function (path, mode) {
    path = PATH.normalize(path)
    if (path[path.length - 1] === '/') path = path.substr(0, path.length - 1)
    FS.mkdir(path, mode, 0)
    return 0
  },
  doMknod: function (path, mode, dev) {
    switch (mode & 61440) {
      case 32768:
      case 8192:
      case 24576:
      case 4096:
      case 49152:
        break
      default:
        return -28
    }
    FS.mknod(path, mode, dev)
    return 0
  },
  doReadlink: function (path, buf, bufsize) {
    if (bufsize <= 0) return -28
    var ret = FS.readlink(path)
    var len = Math.min(bufsize, lengthBytesUTF8(ret))
    var endChar = GROWABLE_HEAP_I8()[buf + len]
    stringToUTF8(ret, buf, bufsize + 1)
    GROWABLE_HEAP_I8()[buf + len] = endChar
    return len
  },
  doAccess: function (path, amode) {
    if (amode & ~7) {
      return -28
    }
    var node
    var lookup = FS.lookupPath(path, { follow: true })
    node = lookup.node
    if (!node) {
      return -44
    }
    var perms = ''
    if (amode & 4) perms += 'r'
    if (amode & 2) perms += 'w'
    if (amode & 1) perms += 'x'
    if (perms && FS.nodePermissions(node, perms)) {
      return -2
    }
    return 0
  },
  doDup: function (path, flags, suggestFD) {
    var suggest = FS.getStream(suggestFD)
    if (suggest) FS.close(suggest)
    return FS.open(path, flags, 0, suggestFD, suggestFD).fd
  },
  doReadv: function (stream, iov, iovcnt, offset) {
    var ret = 0
    for (var i = 0; i < iovcnt; i++) {
      var ptr = GROWABLE_HEAP_I32()[(iov + i * 8) >> 2]
      var len = GROWABLE_HEAP_I32()[(iov + (i * 8 + 4)) >> 2]
      var curr = FS.read(stream, GROWABLE_HEAP_I8(), ptr, len, offset)
      if (curr < 0) return -1
      ret += curr
      if (curr < len) break
    }
    return ret
  },
  doWritev: function (stream, iov, iovcnt, offset) {
    var ret = 0
    for (var i = 0; i < iovcnt; i++) {
      var ptr = GROWABLE_HEAP_I32()[(iov + i * 8) >> 2]
      var len = GROWABLE_HEAP_I32()[(iov + (i * 8 + 4)) >> 2]
      var curr = FS.write(stream, GROWABLE_HEAP_I8(), ptr, len, offset)
      if (curr < 0) return -1
      ret += curr
    }
    return ret
  },
  varargs: undefined,
  get: function () {
    assert(SYSCALLS.varargs != undefined)
    SYSCALLS.varargs += 4
    var ret = GROWABLE_HEAP_I32()[(SYSCALLS.varargs - 4) >> 2]
    return ret
  },
  getStr: function (ptr) {
    var ret = UTF8ToString(ptr)
    return ret
  },
  getStreamFromFD: function (fd) {
    var stream = FS.getStream(fd)
    if (!stream) throw new FS.ErrnoError(8)
    return stream
  },
  get64: function (low, high) {
    if (low >= 0) assert(high === 0)
    else assert(high === -1)
    return low
  }
}
function ___sys_fcntl64(fd, cmd, varargs) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(3, 1, fd, cmd, varargs)
  SYSCALLS.varargs = varargs
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    switch (cmd) {
      case 0: {
        var arg = SYSCALLS.get()
        if (arg < 0) {
          return -28
        }
        var newStream
        newStream = FS.open(stream.path, stream.flags, 0, arg)
        return newStream.fd
      }
      case 1:
      case 2:
        return 0
      case 3:
        return stream.flags
      case 4: {
        var arg = SYSCALLS.get()
        stream.flags |= arg
        return 0
      }
      case 12: {
        var arg = SYSCALLS.get()
        var offset = 0
        GROWABLE_HEAP_I16()[(arg + offset) >> 1] = 2
        return 0
      }
      case 13:
      case 14:
        return 0
      case 16:
      case 8:
        return -28
      case 9:
        setErrNo(28)
        return -1
      default: {
        return -28
      }
    }
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return -e.errno
  }
}
function ___sys_ioctl(fd, op, varargs) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(4, 1, fd, op, varargs)
  SYSCALLS.varargs = varargs
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    switch (op) {
      case 21509:
      case 21505: {
        if (!stream.tty) return -59
        return 0
      }
      case 21510:
      case 21511:
      case 21512:
      case 21506:
      case 21507:
      case 21508: {
        if (!stream.tty) return -59
        return 0
      }
      case 21519: {
        if (!stream.tty) return -59
        var argp = SYSCALLS.get()
        GROWABLE_HEAP_I32()[argp >> 2] = 0
        return 0
      }
      case 21520: {
        if (!stream.tty) return -59
        return -28
      }
      case 21531: {
        var argp = SYSCALLS.get()
        return FS.ioctl(stream, op, argp)
      }
      case 21523: {
        if (!stream.tty) return -59
        return 0
      }
      case 21524: {
        if (!stream.tty) return -59
        return 0
      }
      default:
        abort('bad ioctl syscall ' + op)
    }
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return -e.errno
  }
}
function syscallMmap2(addr, len, prot, flags, fd, off) {
  off <<= 12
  var ptr
  var allocated = false
  if ((flags & 16) !== 0 && addr % 16384 !== 0) {
    return -28
  }
  if ((flags & 32) !== 0) {
    ptr = _memalign(16384, len)
    if (!ptr) return -48
    _memset(ptr, 0, len)
    allocated = true
  } else {
    var info = FS.getStream(fd)
    if (!info) return -8
    var res = FS.mmap(info, addr, len, off, prot, flags)
    ptr = res.ptr
    allocated = res.allocated
  }
  SYSCALLS.mappings[ptr] = {
    malloc: ptr,
    len: len,
    allocated: allocated,
    fd: fd,
    prot: prot,
    flags: flags,
    offset: off
  }
  return ptr
}
function ___sys_mmap2(addr, len, prot, flags, fd, off) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(
      5,
      1,
      addr,
      len,
      prot,
      flags,
      fd,
      off
    )
  try {
    return syscallMmap2(addr, len, prot, flags, fd, off)
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return -e.errno
  }
}
function syscallMunmap(addr, len) {
  if ((addr | 0) === -1 || len === 0) {
    return -28
  }
  var info = SYSCALLS.mappings[addr]
  if (!info) return 0
  if (len === info.len) {
    var stream = FS.getStream(info.fd)
    if (stream) {
      if (info.prot & 2) {
        SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset)
      }
      FS.munmap(stream)
    }
    SYSCALLS.mappings[addr] = null
    if (info.allocated) {
      _free(info.malloc)
    }
  }
  return 0
}
function ___sys_munmap(addr, len) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(6, 1, addr, len)
  try {
    return syscallMunmap(addr, len)
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return -e.errno
  }
}
function ___sys_open(path, flags, varargs) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(7, 1, path, flags, varargs)
  SYSCALLS.varargs = varargs
  try {
    var pathname = SYSCALLS.getStr(path)
    var mode = varargs ? SYSCALLS.get() : 0
    var stream = FS.open(pathname, flags, mode)
    return stream.fd
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return -e.errno
  }
}
function ___sys_stat64(path, buf) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(8, 1, path, buf)
  try {
    path = SYSCALLS.getStr(path)
    return SYSCALLS.doStat(FS.stat, path, buf)
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return -e.errno
  }
}
function getShiftFromSize(size) {
  switch (size) {
    case 1:
      return 0
    case 2:
      return 1
    case 4:
      return 2
    case 8:
      return 3
    default:
      throw new TypeError('Unknown type size: ' + size)
  }
}
function embind_init_charCodes() {
  var codes = new Array(256)
  for (var i = 0; i < 256; ++i) {
    codes[i] = String.fromCharCode(i)
  }
  embind_charCodes = codes
}
var embind_charCodes = undefined
function readLatin1String(ptr) {
  var ret = ''
  var c = ptr
  while (GROWABLE_HEAP_U8()[c]) {
    ret += embind_charCodes[GROWABLE_HEAP_U8()[c++]]
  }
  return ret
}
var awaitingDependencies = {}
var registeredTypes = {}
var typeDependencies = {}
var char_0 = 48
var char_9 = 57
function makeLegalFunctionName(name) {
  if (undefined === name) {
    return '_unknown'
  }
  name = name.replace(/[^a-zA-Z0-9_]/g, '$')
  var f = name.charCodeAt(0)
  if (f >= char_0 && f <= char_9) {
    return '_' + name
  } else {
    return name
  }
}
function createNamedFunction(name, body) {
  name = makeLegalFunctionName(name)
  return new Function(
    'body',
    'return function ' +
      name +
      '() {\n' +
      '    "use strict";' +
      '    return body.apply(this, arguments);\n' +
      '};\n'
  )(body)
}
function extendError(baseErrorType, errorName) {
  var errorClass = createNamedFunction(errorName, function (message) {
    this.name = errorName
    this.message = message
    var stack = new Error(message).stack
    if (stack !== undefined) {
      this.stack =
        this.toString() + '\n' + stack.replace(/^Error(:[^\n]*)?\n/, '')
    }
  })
  errorClass.prototype = Object.create(baseErrorType.prototype)
  errorClass.prototype.constructor = errorClass
  errorClass.prototype.toString = function () {
    if (this.message === undefined) {
      return this.name
    } else {
      return this.name + ': ' + this.message
    }
  }
  return errorClass
}
var BindingError = undefined
function throwBindingError(message) {
  throw new BindingError(message)
}
var InternalError = undefined
function throwInternalError(message) {
  throw new InternalError(message)
}
function registerType(rawType, registeredInstance, options) {
  options = options || {}
  if (!('argPackAdvance' in registeredInstance)) {
    throw new TypeError(
      'registerType registeredInstance requires argPackAdvance'
    )
  }
  var name = registeredInstance.name
  if (!rawType) {
    throwBindingError(
      'type "' + name + '" must have a positive integer typeid pointer'
    )
  }
  if (registeredTypes.hasOwnProperty(rawType)) {
    if (options.ignoreDuplicateRegistrations) {
      return
    } else {
      throwBindingError("Cannot register type '" + name + "' twice")
    }
  }
  registeredTypes[rawType] = registeredInstance
  delete typeDependencies[rawType]
  if (awaitingDependencies.hasOwnProperty(rawType)) {
    var callbacks = awaitingDependencies[rawType]
    delete awaitingDependencies[rawType]
    callbacks.forEach(function (cb) {
      cb()
    })
  }
}
function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
  var shift = getShiftFromSize(size)
  name = readLatin1String(name)
  registerType(rawType, {
    name: name,
    fromWireType: function (wt) {
      return !!wt
    },
    toWireType: function (destructors, o) {
      return o ? trueValue : falseValue
    },
    argPackAdvance: 8,
    readValueFromPointer: function (pointer) {
      var heap
      if (size === 1) {
        heap = GROWABLE_HEAP_I8()
      } else if (size === 2) {
        heap = GROWABLE_HEAP_I16()
      } else if (size === 4) {
        heap = GROWABLE_HEAP_I32()
      } else {
        throw new TypeError('Unknown boolean type size: ' + name)
      }
      return this['fromWireType'](heap[pointer >> shift])
    },
    destructorFunction: null
  })
}
var emval_free_list = []
var emval_handle_array = [
  {},
  { value: undefined },
  { value: null },
  { value: true },
  { value: false }
]
function __emval_decref(handle) {
  if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
    emval_handle_array[handle] = undefined
    emval_free_list.push(handle)
  }
}
function count_emval_handles() {
  var count = 0
  for (var i = 5; i < emval_handle_array.length; ++i) {
    if (emval_handle_array[i] !== undefined) {
      ++count
    }
  }
  return count
}
function get_first_emval() {
  for (var i = 5; i < emval_handle_array.length; ++i) {
    if (emval_handle_array[i] !== undefined) {
      return emval_handle_array[i]
    }
  }
  return null
}
function init_emval() {
  Module['count_emval_handles'] = count_emval_handles
  Module['get_first_emval'] = get_first_emval
}
function __emval_register(value) {
  switch (value) {
    case undefined: {
      return 1
    }
    case null: {
      return 2
    }
    case true: {
      return 3
    }
    case false: {
      return 4
    }
    default: {
      var handle = emval_free_list.length
        ? emval_free_list.pop()
        : emval_handle_array.length
      emval_handle_array[handle] = { refcount: 1, value: value }
      return handle
    }
  }
}
function simpleReadValueFromPointer(pointer) {
  return this['fromWireType'](GROWABLE_HEAP_U32()[pointer >> 2])
}
function __embind_register_emval(rawType, name) {
  name = readLatin1String(name)
  registerType(rawType, {
    name: name,
    fromWireType: function (handle) {
      var rv = emval_handle_array[handle].value
      __emval_decref(handle)
      return rv
    },
    toWireType: function (destructors, value) {
      return __emval_register(value)
    },
    argPackAdvance: 8,
    readValueFromPointer: simpleReadValueFromPointer,
    destructorFunction: null
  })
}
function _embind_repr(v) {
  if (v === null) {
    return 'null'
  }
  var t = typeof v
  if (t === 'object' || t === 'array' || t === 'function') {
    return v.toString()
  } else {
    return '' + v
  }
}
function floatReadValueFromPointer(name, shift) {
  switch (shift) {
    case 2:
      return function (pointer) {
        return this['fromWireType'](GROWABLE_HEAP_F32()[pointer >> 2])
      }
    case 3:
      return function (pointer) {
        return this['fromWireType'](GROWABLE_HEAP_F64()[pointer >> 3])
      }
    default:
      throw new TypeError('Unknown float type: ' + name)
  }
}
function __embind_register_float(rawType, name, size) {
  var shift = getShiftFromSize(size)
  name = readLatin1String(name)
  registerType(rawType, {
    name: name,
    fromWireType: function (value) {
      return value
    },
    toWireType: function (destructors, value) {
      if (typeof value !== 'number' && typeof value !== 'boolean') {
        throw new TypeError(
          'Cannot convert "' + _embind_repr(value) + '" to ' + this.name
        )
      }
      return value
    },
    argPackAdvance: 8,
    readValueFromPointer: floatReadValueFromPointer(name, shift),
    destructorFunction: null
  })
}
function integerReadValueFromPointer(name, shift, signed) {
  switch (shift) {
    case 0:
      return signed
        ? function readS8FromPointer(pointer) {
            return GROWABLE_HEAP_I8()[pointer]
          }
        : function readU8FromPointer(pointer) {
            return GROWABLE_HEAP_U8()[pointer]
          }
    case 1:
      return signed
        ? function readS16FromPointer(pointer) {
            return GROWABLE_HEAP_I16()[pointer >> 1]
          }
        : function readU16FromPointer(pointer) {
            return GROWABLE_HEAP_U16()[pointer >> 1]
          }
    case 2:
      return signed
        ? function readS32FromPointer(pointer) {
            return GROWABLE_HEAP_I32()[pointer >> 2]
          }
        : function readU32FromPointer(pointer) {
            return GROWABLE_HEAP_U32()[pointer >> 2]
          }
    default:
      throw new TypeError('Unknown integer type: ' + name)
  }
}
function __embind_register_integer(
  primitiveType,
  name,
  size,
  minRange,
  maxRange
) {
  name = readLatin1String(name)
  if (maxRange === -1) {
    maxRange = 4294967295
  }
  var shift = getShiftFromSize(size)
  var fromWireType = function (value) {
    return value
  }
  if (minRange === 0) {
    var bitshift = 32 - 8 * size
    fromWireType = function (value) {
      return (value << bitshift) >>> bitshift
    }
  }
  var isUnsignedType = name.indexOf('unsigned') != -1
  registerType(primitiveType, {
    name: name,
    fromWireType: fromWireType,
    toWireType: function (destructors, value) {
      if (typeof value !== 'number' && typeof value !== 'boolean') {
        throw new TypeError(
          'Cannot convert "' + _embind_repr(value) + '" to ' + this.name
        )
      }
      if (value < minRange || value > maxRange) {
        throw new TypeError(
          'Passing a number "' +
            _embind_repr(value) +
            '" from JS side to C/C++ side to an argument of type "' +
            name +
            '", which is outside the valid range [' +
            minRange +
            ', ' +
            maxRange +
            ']!'
        )
      }
      return isUnsignedType ? value >>> 0 : value | 0
    },
    argPackAdvance: 8,
    readValueFromPointer: integerReadValueFromPointer(
      name,
      shift,
      minRange !== 0
    ),
    destructorFunction: null
  })
}
function __embind_register_memory_view(rawType, dataTypeIndex, name) {
  var typeMapping = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
  ]
  var TA = typeMapping[dataTypeIndex]
  function decodeMemoryView(handle) {
    handle = handle >> 2
    var heap = GROWABLE_HEAP_U32()
    var size = heap[handle]
    var data = heap[handle + 1]
    return new TA(buffer, data, size)
  }
  name = readLatin1String(name)
  registerType(
    rawType,
    {
      name: name,
      fromWireType: decodeMemoryView,
      argPackAdvance: 8,
      readValueFromPointer: decodeMemoryView
    },
    { ignoreDuplicateRegistrations: true }
  )
}
function __embind_register_std_string(rawType, name) {
  name = readLatin1String(name)
  var stdStringIsUTF8 = name === 'std::string'
  registerType(rawType, {
    name: name,
    fromWireType: function (value) {
      var length = GROWABLE_HEAP_U32()[value >> 2]
      var str
      if (stdStringIsUTF8) {
        var decodeStartPtr = value + 4
        for (var i = 0; i <= length; ++i) {
          var currentBytePtr = value + 4 + i
          if (i == length || GROWABLE_HEAP_U8()[currentBytePtr] == 0) {
            var maxRead = currentBytePtr - decodeStartPtr
            var stringSegment = UTF8ToString(decodeStartPtr, maxRead)
            if (str === undefined) {
              str = stringSegment
            } else {
              str += String.fromCharCode(0)
              str += stringSegment
            }
            decodeStartPtr = currentBytePtr + 1
          }
        }
      } else {
        var a = new Array(length)
        for (var i = 0; i < length; ++i) {
          a[i] = String.fromCharCode(GROWABLE_HEAP_U8()[value + 4 + i])
        }
        str = a.join('')
      }
      _free(value)
      return str
    },
    toWireType: function (destructors, value) {
      if (value instanceof ArrayBuffer) {
        value = new Uint8Array(value)
      }
      var getLength
      var valueIsOfTypeString = typeof value === 'string'
      if (
        !(
          valueIsOfTypeString ||
          value instanceof Uint8Array ||
          value instanceof Uint8ClampedArray ||
          value instanceof Int8Array
        )
      ) {
        throwBindingError('Cannot pass non-string to std::string')
      }
      if (stdStringIsUTF8 && valueIsOfTypeString) {
        getLength = function () {
          return lengthBytesUTF8(value)
        }
      } else {
        getLength = function () {
          return value.length
        }
      }
      var length = getLength()
      var ptr = _malloc(4 + length + 1)
      GROWABLE_HEAP_U32()[ptr >> 2] = length
      if (stdStringIsUTF8 && valueIsOfTypeString) {
        stringToUTF8(value, ptr + 4, length + 1)
      } else {
        if (valueIsOfTypeString) {
          for (var i = 0; i < length; ++i) {
            var charCode = value.charCodeAt(i)
            if (charCode > 255) {
              _free(ptr)
              throwBindingError(
                'String has UTF-16 code units that do not fit in 8 bits'
              )
            }
            GROWABLE_HEAP_U8()[ptr + 4 + i] = charCode
          }
        } else {
          for (var i = 0; i < length; ++i) {
            GROWABLE_HEAP_U8()[ptr + 4 + i] = value[i]
          }
        }
      }
      if (destructors !== null) {
        destructors.push(_free, ptr)
      }
      return ptr
    },
    argPackAdvance: 8,
    readValueFromPointer: simpleReadValueFromPointer,
    destructorFunction: function (ptr) {
      _free(ptr)
    }
  })
}
function __embind_register_std_wstring(rawType, charSize, name) {
  name = readLatin1String(name)
  var decodeString, encodeString, getHeap, lengthBytesUTF, shift
  if (charSize === 2) {
    decodeString = UTF16ToString
    encodeString = stringToUTF16
    lengthBytesUTF = lengthBytesUTF16
    getHeap = function () {
      return GROWABLE_HEAP_U16()
    }
    shift = 1
  } else if (charSize === 4) {
    decodeString = UTF32ToString
    encodeString = stringToUTF32
    lengthBytesUTF = lengthBytesUTF32
    getHeap = function () {
      return GROWABLE_HEAP_U32()
    }
    shift = 2
  }
  registerType(rawType, {
    name: name,
    fromWireType: function (value) {
      var length = GROWABLE_HEAP_U32()[value >> 2]
      var HEAP = getHeap()
      var str
      var decodeStartPtr = value + 4
      for (var i = 0; i <= length; ++i) {
        var currentBytePtr = value + 4 + i * charSize
        if (i == length || HEAP[currentBytePtr >> shift] == 0) {
          var maxReadBytes = currentBytePtr - decodeStartPtr
          var stringSegment = decodeString(decodeStartPtr, maxReadBytes)
          if (str === undefined) {
            str = stringSegment
          } else {
            str += String.fromCharCode(0)
            str += stringSegment
          }
          decodeStartPtr = currentBytePtr + charSize
        }
      }
      _free(value)
      return str
    },
    toWireType: function (destructors, value) {
      if (!(typeof value === 'string')) {
        throwBindingError('Cannot pass non-string to C++ string type ' + name)
      }
      var length = lengthBytesUTF(value)
      var ptr = _malloc(4 + length + charSize)
      GROWABLE_HEAP_U32()[ptr >> 2] = length >> shift
      encodeString(value, ptr + 4, length + charSize)
      if (destructors !== null) {
        destructors.push(_free, ptr)
      }
      return ptr
    },
    argPackAdvance: 8,
    readValueFromPointer: simpleReadValueFromPointer,
    destructorFunction: function (ptr) {
      _free(ptr)
    }
  })
}
function __embind_register_void(rawType, name) {
  name = readLatin1String(name)
  registerType(rawType, {
    isVoid: true,
    name: name,
    argPackAdvance: 0,
    fromWireType: function () {
      return undefined
    },
    toWireType: function (destructors, o) {
      return undefined
    }
  })
}
function __emscripten_notify_thread_queue(targetThreadId, mainThreadId) {
  if (targetThreadId == mainThreadId) {
    postMessage({ cmd: 'processQueuedMainThreadWork' })
  } else if (ENVIRONMENT_IS_PTHREAD) {
    postMessage({ targetThread: targetThreadId, cmd: 'processThreadQueue' })
  } else {
    var pthread = PThread.pthreads[targetThreadId]
    var worker = pthread && pthread.worker
    if (!worker) {
      err(
        'Cannot send message to thread with ID ' +
          targetThreadId +
          ', unknown thread ID!'
      )
      return
    }
    worker.postMessage({ cmd: 'processThreadQueue' })
  }
  return 1
}
function _abort() {
  abort()
}
function _cDigitalSignCallBack(nPort, nFameID, bSuccess) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(9, 1, nPort, nFameID, bSuccess)
  cDigitalSignCallBack(nPort, nFameID, bSuccess)
}
function _cExtraDrawDataCallBack(nPort, nDataType, pDrawData, nDataLen) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(
      10,
      1,
      nPort,
      nDataType,
      pDrawData,
      nDataLen
    )
  cExtraDrawDataCallBack(nPort, nDataType, pDrawData, nDataLen)
}
function _cExtraDrawDrawCallBack(nPort) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(11, 1, nPort)
  cExtraDrawDrawCallBack(nPort)
}
function _cPlusVisibleDecCallBack(
  nPort,
  pBufY,
  pBufU,
  pBufV,
  nSize,
  pFrameInfo
) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(
      12,
      1,
      nPort,
      pBufY,
      pBufU,
      pBufV,
      nSize,
      pFrameInfo
    )
  cPlusVisibleDecCallBack(nPort, pBufY, pBufU, pBufV, nSize, pFrameInfo)
}
function _cRecordDataCallBack(nPort, pFrameInfo, pData, nDataSize, nOffset) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(
      13,
      1,
      nPort,
      pFrameInfo,
      pData,
      nDataSize,
      nOffset
    )
  cRecordDataCallBack(nPort, pData, nDataSize, nOffset, pFrameInfo)
}
function _clock() {
  if (_clock.start === undefined) _clock.start = Date.now()
  return ((Date.now() - _clock.start) * (1e6 / 1e3)) | 0
}
function _dlclose(handle) {
  abort(
    "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
  )
}
function _dlopen(filename, flag) {
  abort(
    "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
  )
}
function _dlsym(handle, symbol) {
  abort(
    "To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking"
  )
}
function _emscripten_asm_const_int(code, sigPtr, argbuf) {
  var args = readAsmConstArgs(sigPtr, argbuf)
  return ASM_CONSTS[code].apply(null, args)
}
function _emscripten_check_blocking_allowed() {
  if (ENVIRONMENT_IS_NODE) return
  if (ENVIRONMENT_IS_WORKER) return
  warnOnce(
    'Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread'
  )
}
function _emscripten_conditional_set_current_thread_status(
  expectedStatus,
  newStatus
) {}
function _emscripten_futex_wait(addr, val, timeout) {
  if (addr <= 0 || addr > GROWABLE_HEAP_I8().length || addr & (3 != 0))
    return -28
  if (!ENVIRONMENT_IS_WEB) {
    var ret = Atomics.wait(GROWABLE_HEAP_I32(), addr >> 2, val, timeout)
    if (ret === 'timed-out') return -73
    if (ret === 'not-equal') return -6
    if (ret === 'ok') return 0
    throw 'Atomics.wait returned an unexpected value ' + ret
  } else {
    if (Atomics.load(GROWABLE_HEAP_I32(), addr >> 2) != val) {
      return -6
    }
    var tNow = performance.now()
    var tEnd = tNow + timeout
    assert(__emscripten_main_thread_futex > 0)
    var lastAddr = Atomics.exchange(
      GROWABLE_HEAP_I32(),
      __emscripten_main_thread_futex >> 2,
      addr
    )
    assert(lastAddr == 0)
    while (1) {
      tNow = performance.now()
      if (tNow > tEnd) {
        lastAddr = Atomics.exchange(
          GROWABLE_HEAP_I32(),
          __emscripten_main_thread_futex >> 2,
          0
        )
        assert(lastAddr == addr || lastAddr == 0)
        return -73
      }
      lastAddr = Atomics.exchange(
        GROWABLE_HEAP_I32(),
        __emscripten_main_thread_futex >> 2,
        0
      )
      assert(lastAddr == addr || lastAddr == 0)
      if (lastAddr == 0) {
        break
      }
      _emscripten_main_thread_process_queued_calls()
      if (Atomics.load(GROWABLE_HEAP_I32(), addr >> 2) != val) {
        return -6
      }
      lastAddr = Atomics.exchange(
        GROWABLE_HEAP_I32(),
        __emscripten_main_thread_futex >> 2,
        addr
      )
      assert(lastAddr == 0)
    }
    return 0
  }
}
function _emscripten_memcpy_big(dest, src, num) {
  GROWABLE_HEAP_U8().copyWithin(dest, src, src + num)
}
function _emscripten_proxy_to_main_thread_js(index, sync) {
  var numCallArgs = arguments.length - 2
  if (numCallArgs > 20 - 1)
    throw (
      'emscripten_proxy_to_main_thread_js: Too many arguments ' +
      numCallArgs +
      ' to proxied function idx=' +
      index +
      ', maximum supported is ' +
      (20 - 1) +
      '!'
    )
  var stack = stackSave()
  var serializedNumCallArgs = numCallArgs
  var args = stackAlloc(serializedNumCallArgs * 8)
  var b = args >> 3
  for (var i = 0; i < numCallArgs; i++) {
    var arg = arguments[2 + i]
    GROWABLE_HEAP_F64()[b + i] = arg
  }
  var ret = _emscripten_run_in_main_runtime_thread_js(
    index,
    serializedNumCallArgs,
    args,
    sync
  )
  stackRestore(stack)
  return ret
}
var _emscripten_receive_on_main_thread_js_callArgs = []
var readAsmConstArgsArray = []
function readAsmConstArgs(sigPtr, buf) {
  assert(Array.isArray(readAsmConstArgsArray))
  assert(buf % 16 == 0)
  readAsmConstArgsArray.length = 0
  var ch
  buf >>= 2
  while ((ch = GROWABLE_HEAP_U8()[sigPtr++])) {
    assert(ch === 100 || ch === 102 || ch === 105)
    var double = ch < 105
    if (double && buf & 1) buf++
    readAsmConstArgsArray.push(
      double ? GROWABLE_HEAP_F64()[buf++ >> 1] : GROWABLE_HEAP_I32()[buf]
    )
    ++buf
  }
  return readAsmConstArgsArray
}
function _emscripten_receive_on_main_thread_js(index, numCallArgs, args) {
  _emscripten_receive_on_main_thread_js_callArgs.length = numCallArgs
  var b = args >> 3
  for (var i = 0; i < numCallArgs; i++) {
    _emscripten_receive_on_main_thread_js_callArgs[i] =
      GROWABLE_HEAP_F64()[b + i]
  }
  var isEmAsmConst = index < 0
  var func = !isEmAsmConst
    ? proxiedFunctionTable[index]
    : ASM_CONSTS[-index - 1]
  assert(
    func.length == numCallArgs,
    'Call args mismatch in emscripten_receive_on_main_thread_js'
  )
  return func.apply(null, _emscripten_receive_on_main_thread_js_callArgs)
}
function _emscripten_get_heap_size() {
  return GROWABLE_HEAP_U8().length
}
function emscripten_realloc_buffer(size) {
  try {
    wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16)
    updateGlobalBufferAndViews(wasmMemory.buffer)
    return 1
  } catch (e) {
    console.error(
      'emscripten_realloc_buffer: Attempted to grow heap from ' +
        buffer.byteLength +
        ' bytes to ' +
        size +
        ' bytes, but got error: ' +
        e
    )
  }
}
function _emscripten_resize_heap(requestedSize) {
  var oldSize = _emscripten_get_heap_size()
  if (requestedSize <= oldSize) {
    return false
  }
  var maxHeapSize = 2147483648
  if (requestedSize > maxHeapSize) {
    err(
      'Cannot enlarge memory, asked to go up to ' +
        requestedSize +
        ' bytes, but the limit is ' +
        maxHeapSize +
        ' bytes!'
    )
    return false
  }
  for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
    var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown)
    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296)
    var newSize = Math.min(
      maxHeapSize,
      alignUp(Math.max(requestedSize, overGrownHeapSize), 65536)
    )
    var replacement = emscripten_realloc_buffer(newSize)
    if (replacement) {
      return true
    }
  }
  err(
    'Failed to grow the heap from ' +
      oldSize +
      ' bytes to ' +
      newSize +
      ' bytes, not enough memory!'
  )
  return false
}
var JSEvents = {
  inEventHandler: 0,
  removeAllEventListeners: function () {
    for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
      JSEvents._removeHandler(i)
    }
    JSEvents.eventHandlers = []
    JSEvents.deferredCalls = []
  },
  registerRemoveEventListeners: function () {
    if (!JSEvents.removeEventListenersRegistered) {
      __ATEXIT__.push(JSEvents.removeAllEventListeners)
      JSEvents.removeEventListenersRegistered = true
    }
  },
  deferredCalls: [],
  deferCall: function (targetFunction, precedence, argsList) {
    function arraysHaveEqualContent(arrA, arrB) {
      if (arrA.length != arrB.length) return false
      for (var i in arrA) {
        if (arrA[i] != arrB[i]) return false
      }
      return true
    }
    for (var i in JSEvents.deferredCalls) {
      var call = JSEvents.deferredCalls[i]
      if (
        call.targetFunction == targetFunction &&
        arraysHaveEqualContent(call.argsList, argsList)
      ) {
        return
      }
    }
    JSEvents.deferredCalls.push({
      targetFunction: targetFunction,
      precedence: precedence,
      argsList: argsList
    })
    JSEvents.deferredCalls.sort(function (x, y) {
      return x.precedence < y.precedence
    })
  },
  removeDeferredCalls: function (targetFunction) {
    for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
      if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
        JSEvents.deferredCalls.splice(i, 1)
        --i
      }
    }
  },
  canPerformEventHandlerRequests: function () {
    return (
      JSEvents.inEventHandler &&
      JSEvents.currentEventHandler.allowsDeferredCalls
    )
  },
  runDeferredCalls: function () {
    if (!JSEvents.canPerformEventHandlerRequests()) {
      return
    }
    for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
      var call = JSEvents.deferredCalls[i]
      JSEvents.deferredCalls.splice(i, 1)
      --i
      call.targetFunction.apply(null, call.argsList)
    }
  },
  eventHandlers: [],
  removeAllHandlersOnTarget: function (target, eventTypeString) {
    for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
      if (
        JSEvents.eventHandlers[i].target == target &&
        (!eventTypeString ||
          eventTypeString == JSEvents.eventHandlers[i].eventTypeString)
      ) {
        JSEvents._removeHandler(i--)
      }
    }
  },
  _removeHandler: function (i) {
    var h = JSEvents.eventHandlers[i]
    h.target.removeEventListener(
      h.eventTypeString,
      h.eventListenerFunc,
      h.useCapture
    )
    JSEvents.eventHandlers.splice(i, 1)
  },
  registerOrRemoveHandler: function (eventHandler) {
    var jsEventHandler = function jsEventHandler(event) {
      ++JSEvents.inEventHandler
      JSEvents.currentEventHandler = eventHandler
      JSEvents.runDeferredCalls()
      eventHandler.handlerFunc(event)
      JSEvents.runDeferredCalls()
      --JSEvents.inEventHandler
    }
    if (eventHandler.callbackfunc) {
      eventHandler.eventListenerFunc = jsEventHandler
      eventHandler.target.addEventListener(
        eventHandler.eventTypeString,
        jsEventHandler,
        eventHandler.useCapture
      )
      JSEvents.eventHandlers.push(eventHandler)
      JSEvents.registerRemoveEventListeners()
    } else {
      for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
        if (
          JSEvents.eventHandlers[i].target == eventHandler.target &&
          JSEvents.eventHandlers[i].eventTypeString ==
            eventHandler.eventTypeString
        ) {
          JSEvents._removeHandler(i--)
        }
      }
    }
  },
  queueEventHandlerOnThread_iiii: function (
    targetThread,
    eventHandlerFunc,
    eventTypeId,
    eventData,
    userData
  ) {
    var stackTop = stackSave()
    var varargs = stackAlloc(12)
    GROWABLE_HEAP_I32()[varargs >> 2] = eventTypeId
    GROWABLE_HEAP_I32()[(varargs + 4) >> 2] = eventData
    GROWABLE_HEAP_I32()[(varargs + 8) >> 2] = userData
    __emscripten_call_on_thread(
      0,
      targetThread,
      637534208,
      eventHandlerFunc,
      eventData,
      varargs
    )
    stackRestore(stackTop)
  },
  getTargetThreadForEventCallback: function (targetThread) {
    switch (targetThread) {
      case 1:
        return 0
      case 2:
        return PThread.currentProxiedOperationCallerThread
      default:
        return targetThread
    }
  },
  getNodeNameForTarget: function (target) {
    if (!target) return ''
    if (target == window) return '#window'
    if (target == screen) return '#screen'
    return target && target.nodeName ? target.nodeName : ''
  },
  fullscreenEnabled: function () {
    return document.fullscreenEnabled || document.webkitFullscreenEnabled
  }
}
function stringToNewUTF8(jsString) {
  var length = lengthBytesUTF8(jsString) + 1
  var cString = _malloc(length)
  stringToUTF8(jsString, cString, length)
  return cString
}
function _emscripten_set_offscreencanvas_size_on_target_thread_js(
  targetThread,
  targetCanvas,
  width,
  height
) {
  var stackTop = stackSave()
  var varargs = stackAlloc(12)
  var targetCanvasPtr = 0
  if (targetCanvas) {
    targetCanvasPtr = stringToNewUTF8(targetCanvas)
  }
  GROWABLE_HEAP_I32()[varargs >> 2] = targetCanvasPtr
  GROWABLE_HEAP_I32()[(varargs + 4) >> 2] = width
  GROWABLE_HEAP_I32()[(varargs + 8) >> 2] = height
  __emscripten_call_on_thread(
    0,
    targetThread,
    657457152,
    0,
    targetCanvasPtr,
    varargs
  )
  stackRestore(stackTop)
}
function _emscripten_set_offscreencanvas_size_on_target_thread(
  targetThread,
  targetCanvas,
  width,
  height
) {
  targetCanvas = targetCanvas ? UTF8ToString(targetCanvas) : ''
  _emscripten_set_offscreencanvas_size_on_target_thread_js(
    targetThread,
    targetCanvas,
    width,
    height
  )
}
function maybeCStringToJsString(cString) {
  return cString > 2 ? UTF8ToString(cString) : cString
}
var specialHTMLTargets = [
  0,
  typeof document !== 'undefined' ? document : 0,
  typeof window !== 'undefined' ? window : 0
]
function findEventTarget(target) {
  target = maybeCStringToJsString(target)
  var domElement =
    specialHTMLTargets[target] ||
    (typeof document !== 'undefined'
      ? document.querySelector(target)
      : undefined)
  return domElement
}
function findCanvasEventTarget(target) {
  return findEventTarget(target)
}
function _emscripten_set_canvas_element_size_calling_thread(
  target,
  width,
  height
) {
  var canvas = findCanvasEventTarget(target)
  if (!canvas) return -4
  if (canvas.canvasSharedPtr) {
    GROWABLE_HEAP_I32()[canvas.canvasSharedPtr >> 2] = width
    GROWABLE_HEAP_I32()[(canvas.canvasSharedPtr + 4) >> 2] = height
  }
  if (canvas.offscreenCanvas || !canvas.controlTransferredOffscreen) {
    if (canvas.offscreenCanvas) canvas = canvas.offscreenCanvas
    var autoResizeViewport = false
    if (canvas.GLctxObject && canvas.GLctxObject.GLctx) {
      var prevViewport = canvas.GLctxObject.GLctx.getParameter(2978)
      autoResizeViewport =
        prevViewport[0] === 0 &&
        prevViewport[1] === 0 &&
        prevViewport[2] === canvas.width &&
        prevViewport[3] === canvas.height
    }
    canvas.width = width
    canvas.height = height
    if (autoResizeViewport) {
      canvas.GLctxObject.GLctx.viewport(0, 0, width, height)
    }
  } else if (canvas.canvasSharedPtr) {
    var targetThread = GROWABLE_HEAP_I32()[(canvas.canvasSharedPtr + 8) >> 2]
    _emscripten_set_offscreencanvas_size_on_target_thread(
      targetThread,
      target,
      width,
      height
    )
    return 1
  } else {
    return -4
  }
  return 0
}
function _emscripten_set_canvas_element_size_main_thread(
  target,
  width,
  height
) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(14, 1, target, width, height)
  return _emscripten_set_canvas_element_size_calling_thread(
    target,
    width,
    height
  )
}
function _emscripten_set_canvas_element_size(target, width, height) {
  var canvas = findCanvasEventTarget(target)
  if (canvas) {
    return _emscripten_set_canvas_element_size_calling_thread(
      target,
      width,
      height
    )
  } else {
    return _emscripten_set_canvas_element_size_main_thread(
      target,
      width,
      height
    )
  }
}
function _emscripten_set_current_thread_status(newStatus) {}
function _emscripten_set_thread_name(threadId, name) {}
function __webgl_enable_ANGLE_instanced_arrays(ctx) {
  var ext = ctx.getExtension('ANGLE_instanced_arrays')
  if (ext) {
    ctx['vertexAttribDivisor'] = function (index, divisor) {
      ext['vertexAttribDivisorANGLE'](index, divisor)
    }
    ctx['drawArraysInstanced'] = function (mode, first, count, primcount) {
      ext['drawArraysInstancedANGLE'](mode, first, count, primcount)
    }
    ctx['drawElementsInstanced'] = function (
      mode,
      count,
      type,
      indices,
      primcount
    ) {
      ext['drawElementsInstancedANGLE'](mode, count, type, indices, primcount)
    }
    return 1
  }
}
function __webgl_enable_OES_vertex_array_object(ctx) {
  var ext = ctx.getExtension('OES_vertex_array_object')
  if (ext) {
    ctx['createVertexArray'] = function () {
      return ext['createVertexArrayOES']()
    }
    ctx['deleteVertexArray'] = function (vao) {
      ext['deleteVertexArrayOES'](vao)
    }
    ctx['bindVertexArray'] = function (vao) {
      ext['bindVertexArrayOES'](vao)
    }
    ctx['isVertexArray'] = function (vao) {
      return ext['isVertexArrayOES'](vao)
    }
    return 1
  }
}
function __webgl_enable_WEBGL_draw_buffers(ctx) {
  var ext = ctx.getExtension('WEBGL_draw_buffers')
  if (ext) {
    ctx['drawBuffers'] = function (n, bufs) {
      ext['drawBuffersWEBGL'](n, bufs)
    }
    return 1
  }
}
function __webgl_enable_WEBGL_multi_draw(ctx) {
  return !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'))
}
var GL = {
  counter: 1,
  buffers: [],
  programs: [],
  framebuffers: [],
  renderbuffers: [],
  textures: [],
  uniforms: [],
  shaders: [],
  vaos: [],
  contexts: {},
  offscreenCanvases: {},
  timerQueriesEXT: [],
  programInfos: {},
  stringCache: {},
  unpackAlignment: 4,
  recordError: function recordError(errorCode) {
    if (!GL.lastError) {
      GL.lastError = errorCode
    }
  },
  getNewId: function (table) {
    var ret = GL.counter++
    for (var i = table.length; i < ret; i++) {
      table[i] = null
    }
    return ret
  },
  getSource: function (shader, count, string, length) {
    var source = ''
    for (var i = 0; i < count; ++i) {
      var len = length ? GROWABLE_HEAP_I32()[(length + i * 4) >> 2] : -1
      source += UTF8ToString(
        GROWABLE_HEAP_I32()[(string + i * 4) >> 2],
        len < 0 ? undefined : len
      )
    }
    return source
  },
  createContext: function (canvas, webGLContextAttributes) {
    var ctx = canvas.getContext('webgl', webGLContextAttributes)
    if (!ctx) return 0
    var handle = GL.registerContext(ctx, webGLContextAttributes)
    return handle
  },
  registerContext: function (ctx, webGLContextAttributes) {
    var handle = _malloc(8)
    GROWABLE_HEAP_I32()[(handle + 4) >> 2] = _pthread_self()
    var context = {
      handle: handle,
      attributes: webGLContextAttributes,
      version: webGLContextAttributes.majorVersion,
      GLctx: ctx
    }
    if (ctx.canvas) ctx.canvas.GLctxObject = context
    GL.contexts[handle] = context
    if (
      typeof webGLContextAttributes.enableExtensionsByDefault === 'undefined' ||
      webGLContextAttributes.enableExtensionsByDefault
    ) {
      GL.initExtensions(context)
    }
    return handle
  },
  makeContextCurrent: function (contextHandle) {
    GL.currentContext = GL.contexts[contextHandle]
    Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx
    return !(contextHandle && !GLctx)
  },
  getContext: function (contextHandle) {
    return GL.contexts[contextHandle]
  },
  deleteContext: function (contextHandle) {
    if (GL.currentContext === GL.contexts[contextHandle])
      GL.currentContext = null
    if (typeof JSEvents === 'object')
      JSEvents.removeAllHandlersOnTarget(
        GL.contexts[contextHandle].GLctx.canvas
      )
    if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas)
      GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined
    _free(GL.contexts[contextHandle].handle)
    GL.contexts[contextHandle] = null
  },
  initExtensions: function (context) {
    if (!context) context = GL.currentContext
    if (context.initExtensionsDone) return
    context.initExtensionsDone = true
    var GLctx = context.GLctx
    __webgl_enable_ANGLE_instanced_arrays(GLctx)
    __webgl_enable_OES_vertex_array_object(GLctx)
    __webgl_enable_WEBGL_draw_buffers(GLctx)
    GLctx.disjointTimerQueryExt = GLctx.getExtension('EXT_disjoint_timer_query')
    __webgl_enable_WEBGL_multi_draw(GLctx)
    var exts = GLctx.getSupportedExtensions() || []
    exts.forEach(function (ext) {
      if (ext.indexOf('lose_context') < 0 && ext.indexOf('debug') < 0) {
        GLctx.getExtension(ext)
      }
    })
  },
  populateUniformTable: function (program) {
    var p = GL.programs[program]
    var ptable = (GL.programInfos[program] = {
      uniforms: {},
      maxUniformLength: 0,
      maxAttributeLength: -1,
      maxUniformBlockNameLength: -1
    })
    var utable = ptable.uniforms
    var numUniforms = GLctx.getProgramParameter(p, 35718)
    for (var i = 0; i < numUniforms; ++i) {
      var u = GLctx.getActiveUniform(p, i)
      var name = u.name
      ptable.maxUniformLength = Math.max(
        ptable.maxUniformLength,
        name.length + 1
      )
      if (name.slice(-1) == ']') {
        name = name.slice(0, name.lastIndexOf('['))
      }
      var loc = GLctx.getUniformLocation(p, name)
      if (loc) {
        var id = GL.getNewId(GL.uniforms)
        utable[name] = [u.size, id]
        GL.uniforms[id] = loc
        for (var j = 1; j < u.size; ++j) {
          var n = name + '[' + j + ']'
          loc = GLctx.getUniformLocation(p, n)
          id = GL.getNewId(GL.uniforms)
          GL.uniforms[id] = loc
        }
      }
    }
  }
}
var __emscripten_webgl_power_preferences = [
  'default',
  'low-power',
  'high-performance'
]
function _emscripten_webgl_do_create_context(target, attributes) {
  assert(attributes)
  var a = attributes >> 2
  var powerPreference = GROWABLE_HEAP_I32()[a + (24 >> 2)]
  var contextAttributes = {
    alpha: !!GROWABLE_HEAP_I32()[a + (0 >> 2)],
    depth: !!GROWABLE_HEAP_I32()[a + (4 >> 2)],
    stencil: !!GROWABLE_HEAP_I32()[a + (8 >> 2)],
    antialias: !!GROWABLE_HEAP_I32()[a + (12 >> 2)],
    premultipliedAlpha: !!GROWABLE_HEAP_I32()[a + (16 >> 2)],
    preserveDrawingBuffer: !!GROWABLE_HEAP_I32()[a + (20 >> 2)],
    powerPreference: __emscripten_webgl_power_preferences[powerPreference],
    failIfMajorPerformanceCaveat: !!GROWABLE_HEAP_I32()[a + (28 >> 2)],
    majorVersion: GROWABLE_HEAP_I32()[a + (32 >> 2)],
    minorVersion: GROWABLE_HEAP_I32()[a + (36 >> 2)],
    enableExtensionsByDefault: GROWABLE_HEAP_I32()[a + (40 >> 2)],
    explicitSwapControl: GROWABLE_HEAP_I32()[a + (44 >> 2)],
    proxyContextToMainThread: GROWABLE_HEAP_I32()[a + (48 >> 2)],
    renderViaOffscreenBackBuffer: GROWABLE_HEAP_I32()[a + (52 >> 2)]
  }
  var canvas = findCanvasEventTarget(target)
  if (!canvas) {
    return 0
  }
  if (contextAttributes.explicitSwapControl) {
    return 0
  }
  var contextHandle = GL.createContext(canvas, contextAttributes)
  return contextHandle
}
function _emscripten_webgl_create_context(a0, a1) {
  return _emscripten_webgl_do_create_context(a0, a1)
}
var ENV = {}
function getExecutableName() {
  return thisProgram || './this.program'
}
function getEnvStrings() {
  if (!getEnvStrings.strings) {
    var lang =
      (
        (typeof navigator === 'object' &&
          navigator.languages &&
          navigator.languages[0]) ||
        'C'
      ).replace('-', '_') + '.UTF-8'
    var env = {
      USER: 'web_user',
      LOGNAME: 'web_user',
      PATH: '/',
      PWD: '/',
      HOME: '/home/web_user',
      LANG: lang,
      _: getExecutableName()
    }
    for (var x in ENV) {
      env[x] = ENV[x]
    }
    var strings = []
    for (var x in env) {
      strings.push(x + '=' + env[x])
    }
    getEnvStrings.strings = strings
  }
  return getEnvStrings.strings
}
function _environ_get(__environ, environ_buf) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(15, 1, __environ, environ_buf)
  try {
    var bufSize = 0
    getEnvStrings().forEach(function (string, i) {
      var ptr = environ_buf + bufSize
      GROWABLE_HEAP_I32()[(__environ + i * 4) >> 2] = ptr
      writeAsciiToMemory(string, ptr)
      bufSize += string.length + 1
    })
    return 0
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return e.errno
  }
}
function _environ_sizes_get(penviron_count, penviron_buf_size) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(
      16,
      1,
      penviron_count,
      penviron_buf_size
    )
  try {
    var strings = getEnvStrings()
    GROWABLE_HEAP_I32()[penviron_count >> 2] = strings.length
    var bufSize = 0
    strings.forEach(function (string) {
      bufSize += string.length + 1
    })
    GROWABLE_HEAP_I32()[penviron_buf_size >> 2] = bufSize
    return 0
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return e.errno
  }
}
function _exit(status) {
  exit(status)
}
function _fd_close(fd) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(17, 1, fd)
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    FS.close(stream)
    return 0
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return e.errno
  }
}
function _fd_fdstat_get(fd, pbuf) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(18, 1, fd, pbuf)
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    var type = stream.tty
      ? 2
      : FS.isDir(stream.mode)
      ? 3
      : FS.isLink(stream.mode)
      ? 7
      : 4
    GROWABLE_HEAP_I8()[pbuf >> 0] = type
    return 0
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return e.errno
  }
}
function _fd_read(fd, iov, iovcnt, pnum) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(19, 1, fd, iov, iovcnt, pnum)
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    var num = SYSCALLS.doReadv(stream, iov, iovcnt)
    GROWABLE_HEAP_I32()[pnum >> 2] = num
    return 0
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return e.errno
  }
}
function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(
      20,
      1,
      fd,
      offset_low,
      offset_high,
      whence,
      newOffset
    )
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    var HIGH_OFFSET = 4294967296
    var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0)
    var DOUBLE_LIMIT = 9007199254740992
    if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
      return -61
    }
    FS.llseek(stream, offset, whence)
    ;(tempI64 = [
      stream.position >>> 0,
      ((tempDouble = stream.position),
      +Math.abs(tempDouble) >= 1
        ? tempDouble > 0
          ? (Math.min(+Math.floor(tempDouble / 4294967296), 4294967295) | 0) >>>
            0
          : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>>
            0
        : 0)
    ]),
      (GROWABLE_HEAP_I32()[newOffset >> 2] = tempI64[0]),
      (GROWABLE_HEAP_I32()[(newOffset + 4) >> 2] = tempI64[1])
    if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null
    return 0
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return e.errno
  }
}
function _fd_write(fd, iov, iovcnt, pnum) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(21, 1, fd, iov, iovcnt, pnum)
  try {
    var stream = SYSCALLS.getStreamFromFD(fd)
    var num = SYSCALLS.doWritev(stream, iov, iovcnt)
    GROWABLE_HEAP_I32()[pnum >> 2] = num
    return 0
  } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e)
    return e.errno
  }
}
function _gettimeofday(ptr) {
  var now = Date.now()
  GROWABLE_HEAP_I32()[ptr >> 2] = (now / 1e3) | 0
  GROWABLE_HEAP_I32()[(ptr + 4) >> 2] = ((now % 1e3) * 1e3) | 0
  return 0
}
function _mktime(tmPtr) {
  _tzset()
  var date = new Date(
    GROWABLE_HEAP_I32()[(tmPtr + 20) >> 2] + 1900,
    GROWABLE_HEAP_I32()[(tmPtr + 16) >> 2],
    GROWABLE_HEAP_I32()[(tmPtr + 12) >> 2],
    GROWABLE_HEAP_I32()[(tmPtr + 8) >> 2],
    GROWABLE_HEAP_I32()[(tmPtr + 4) >> 2],
    GROWABLE_HEAP_I32()[tmPtr >> 2],
    0
  )
  var dst = GROWABLE_HEAP_I32()[(tmPtr + 32) >> 2]
  var guessedOffset = date.getTimezoneOffset()
  var start = new Date(date.getFullYear(), 0, 1)
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()
  var winterOffset = start.getTimezoneOffset()
  var dstOffset = Math.min(winterOffset, summerOffset)
  if (dst < 0) {
    GROWABLE_HEAP_I32()[(tmPtr + 32) >> 2] = Number(
      summerOffset != winterOffset && dstOffset == guessedOffset
    )
  } else if (dst > 0 != (dstOffset == guessedOffset)) {
    var nonDstOffset = Math.max(winterOffset, summerOffset)
    var trueOffset = dst > 0 ? dstOffset : nonDstOffset
    date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4)
  }
  GROWABLE_HEAP_I32()[(tmPtr + 24) >> 2] = date.getDay()
  var yday = ((date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24)) | 0
  GROWABLE_HEAP_I32()[(tmPtr + 28) >> 2] = yday
  GROWABLE_HEAP_I32()[tmPtr >> 2] = date.getSeconds()
  GROWABLE_HEAP_I32()[(tmPtr + 4) >> 2] = date.getMinutes()
  GROWABLE_HEAP_I32()[(tmPtr + 8) >> 2] = date.getHours()
  GROWABLE_HEAP_I32()[(tmPtr + 12) >> 2] = date.getDate()
  GROWABLE_HEAP_I32()[(tmPtr + 16) >> 2] = date.getMonth()
  return (date.getTime() / 1e3) | 0
}
function _pthread_cancel(thread) {
  if (thread === _emscripten_main_browser_thread_id()) {
    err('Main thread (id=' + thread + ') cannot be canceled!')
    return ERRNO_CODES.ESRCH
  }
  if (!thread) {
    err('pthread_cancel attempted on a null thread pointer!')
    return ERRNO_CODES.ESRCH
  }
  var self = GROWABLE_HEAP_I32()[(thread + 12) >> 2]
  if (self !== thread) {
    err(
      'pthread_cancel attempted on thread ' +
        thread +
        ', which does not point to a valid thread, or does not exist anymore!'
    )
    return ERRNO_CODES.ESRCH
  }
  Atomics.compareExchange(GROWABLE_HEAP_U32(), (thread + 0) >> 2, 0, 2)
  if (!ENVIRONMENT_IS_PTHREAD) cancelThread(thread)
  else postMessage({ cmd: 'cancelThread', thread: thread })
  return 0
}
function _pthread_cleanup_pop(execute) {
  var routine = PThread.threadExitHandlers.pop()
  if (execute) routine()
}
function _pthread_cleanup_push(routine, arg) {
  PThread.threadExitHandlers.push(function () {
    wasmTable.get(routine)(arg)
  })
}
function spawnThread(threadParams) {
  if (ENVIRONMENT_IS_PTHREAD)
    throw 'Internal Error! spawnThread() can only ever be called from main application thread!'
  var worker = PThread.getNewWorker()
  if (worker.pthread !== undefined) throw 'Internal error!'
  if (!threadParams.pthread_ptr) throw 'Internal error, no pthread ptr!'
  PThread.runningWorkers.push(worker)
  var tlsMemory = _malloc(128 * 4)
  for (var i = 0; i < 128; ++i) {
    GROWABLE_HEAP_I32()[(tlsMemory + i * 4) >> 2] = 0
  }
  var stackHigh = threadParams.stackBase + threadParams.stackSize
  var pthread = (PThread.pthreads[threadParams.pthread_ptr] = {
    worker: worker,
    stackBase: threadParams.stackBase,
    stackSize: threadParams.stackSize,
    allocatedOwnStack: threadParams.allocatedOwnStack,
    threadInfoStruct: threadParams.pthread_ptr
  })
  var tis = pthread.threadInfoStruct >> 2
  Atomics.store(GROWABLE_HEAP_U32(), tis + (64 >> 2), threadParams.detached)
  Atomics.store(GROWABLE_HEAP_U32(), tis + (100 >> 2), tlsMemory)
  Atomics.store(GROWABLE_HEAP_U32(), tis + (40 >> 2), pthread.threadInfoStruct)
  Atomics.store(GROWABLE_HEAP_U32(), tis + (80 >> 2), threadParams.stackSize)
  Atomics.store(GROWABLE_HEAP_U32(), tis + (76 >> 2), stackHigh)
  Atomics.store(GROWABLE_HEAP_U32(), tis + (104 >> 2), threadParams.stackSize)
  Atomics.store(GROWABLE_HEAP_U32(), tis + ((104 + 8) >> 2), stackHigh)
  Atomics.store(
    GROWABLE_HEAP_U32(),
    tis + ((104 + 12) >> 2),
    threadParams.detached
  )
  var global_libc = _emscripten_get_global_libc()
  var global_locale = global_libc + 40
  Atomics.store(GROWABLE_HEAP_U32(), tis + (172 >> 2), global_locale)
  worker.pthread = pthread
  var msg = {
    cmd: 'run',
    start_routine: threadParams.startRoutine,
    arg: threadParams.arg,
    threadInfoStruct: threadParams.pthread_ptr,
    stackBase: threadParams.stackBase,
    stackSize: threadParams.stackSize
  }
  worker.runPthread = function () {
    msg.time = performance.now()
    worker.postMessage(msg, threadParams.transferList)
  }
  if (worker.loaded) {
    worker.runPthread()
    delete worker.runPthread
  }
}
function _pthread_create(pthread_ptr, attr, start_routine, arg) {
  if (typeof SharedArrayBuffer === 'undefined') {
    err(
      'Current environment does not support SharedArrayBuffer, pthreads are not available!'
    )
    return 6
  }
  if (!pthread_ptr) {
    err('pthread_create called with a null thread pointer!')
    return 28
  }
  var transferList = []
  var error = 0
  if (ENVIRONMENT_IS_PTHREAD && (transferList.length === 0 || error)) {
    return _emscripten_sync_run_in_main_thread_4(
      687865856,
      pthread_ptr,
      attr,
      start_routine,
      arg
    )
  }
  if (error) return error
  var stackSize = 0
  var stackBase = 0
  var detached = 0
  if (attr && attr != -1) {
    stackSize = GROWABLE_HEAP_I32()[attr >> 2]
    stackSize += 81920
    stackBase = GROWABLE_HEAP_I32()[(attr + 8) >> 2]
    detached = GROWABLE_HEAP_I32()[(attr + 12) >> 2] !== 0
  } else {
    stackSize = 2097152
  }
  var allocatedOwnStack = stackBase == 0
  if (allocatedOwnStack) {
    stackBase = _memalign(16, stackSize)
  } else {
    stackBase -= stackSize
    assert(stackBase > 0)
  }
  var threadInfoStruct = _malloc(228)
  for (var i = 0; i < 228 >> 2; ++i)
    GROWABLE_HEAP_U32()[(threadInfoStruct >> 2) + i] = 0
  GROWABLE_HEAP_I32()[pthread_ptr >> 2] = threadInfoStruct
  GROWABLE_HEAP_I32()[(threadInfoStruct + 12) >> 2] = threadInfoStruct
  var headPtr = threadInfoStruct + 152
  GROWABLE_HEAP_I32()[headPtr >> 2] = headPtr
  var threadParams = {
    stackBase: stackBase,
    stackSize: stackSize,
    allocatedOwnStack: allocatedOwnStack,
    detached: detached,
    startRoutine: start_routine,
    pthread_ptr: threadInfoStruct,
    arg: arg,
    transferList: transferList
  }
  if (ENVIRONMENT_IS_PTHREAD) {
    threadParams.cmd = 'spawnThread'
    postMessage(threadParams, transferList)
  } else {
    spawnThread(threadParams)
  }
  return 0
}
function _pthread_detach(thread) {
  if (!thread) {
    err('pthread_detach attempted on a null thread pointer!')
    return ERRNO_CODES.ESRCH
  }
  var self = GROWABLE_HEAP_I32()[(thread + 12) >> 2]
  if (self !== thread) {
    err(
      'pthread_detach attempted on thread ' +
        thread +
        ', which does not point to a valid thread, or does not exist anymore!'
    )
    return ERRNO_CODES.ESRCH
  }
  var wasDetached = Atomics.compareExchange(
    GROWABLE_HEAP_U32(),
    (thread + 64) >> 2,
    0,
    2
  )
  return wasDetached ? ERRNO_CODES.EINVAL : 0
}
function __pthread_testcancel_js() {
  if (!ENVIRONMENT_IS_PTHREAD) return
  var tb = _pthread_self()
  if (!tb) return
  var cancelDisabled = Atomics.load(GROWABLE_HEAP_U32(), (tb + 56) >> 2)
  if (cancelDisabled) return
  var canceled = Atomics.load(GROWABLE_HEAP_U32(), (tb + 0) >> 2)
  if (canceled == 2) throw 'Canceled!'
}
function __emscripten_do_pthread_join(thread, status, block) {
  if (!thread) {
    err('pthread_join attempted on a null thread pointer!')
    return ERRNO_CODES.ESRCH
  }
  if (ENVIRONMENT_IS_PTHREAD && _pthread_self() == thread) {
    err('PThread ' + thread + ' is attempting to join to itself!')
    return ERRNO_CODES.EDEADLK
  } else if (
    !ENVIRONMENT_IS_PTHREAD &&
    _emscripten_main_browser_thread_id() == thread
  ) {
    err('Main thread ' + thread + ' is attempting to join to itself!')
    return ERRNO_CODES.EDEADLK
  }
  var self = GROWABLE_HEAP_I32()[(thread + 12) >> 2]
  if (self !== thread) {
    err(
      'pthread_join attempted on thread ' +
        thread +
        ', which does not point to a valid thread, or does not exist anymore!'
    )
    return ERRNO_CODES.ESRCH
  }
  var detached = Atomics.load(GROWABLE_HEAP_U32(), (thread + 64) >> 2)
  if (detached) {
    err('Attempted to join thread ' + thread + ', which was already detached!')
    return ERRNO_CODES.EINVAL
  }
  if (block) {
    _emscripten_check_blocking_allowed()
  }
  for (;;) {
    var threadStatus = Atomics.load(GROWABLE_HEAP_U32(), (thread + 0) >> 2)
    if (threadStatus == 1) {
      var threadExitCode = Atomics.load(GROWABLE_HEAP_U32(), (thread + 4) >> 2)
      if (status) GROWABLE_HEAP_I32()[status >> 2] = threadExitCode
      Atomics.store(GROWABLE_HEAP_U32(), (thread + 64) >> 2, 1)
      if (!ENVIRONMENT_IS_PTHREAD) cleanupThread(thread)
      else postMessage({ cmd: 'cleanupThread', thread: thread })
      return 0
    }
    if (!block) {
      return ERRNO_CODES.EBUSY
    }
    __pthread_testcancel_js()
    if (!ENVIRONMENT_IS_PTHREAD) _emscripten_main_thread_process_queued_calls()
    _emscripten_futex_wait(
      thread + 0,
      threadStatus,
      ENVIRONMENT_IS_PTHREAD ? 100 : 1
    )
  }
}
function _pthread_join(thread, status) {
  return __emscripten_do_pthread_join(thread, status, true)
}
function _setTempRet0($i) {
  setTempRet0($i | 0)
}
function __isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}
function __arraySum(array, index) {
  var sum = 0
  for (var i = 0; i <= index; sum += array[i++]) {}
  return sum
}
var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
var __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function __addDays(date, days) {
  var newDate = new Date(date.getTime())
  while (days > 0) {
    var leap = __isLeapYear(newDate.getFullYear())
    var currentMonth = newDate.getMonth()
    var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[
      currentMonth
    ]
    if (days > daysInCurrentMonth - newDate.getDate()) {
      days -= daysInCurrentMonth - newDate.getDate() + 1
      newDate.setDate(1)
      if (currentMonth < 11) {
        newDate.setMonth(currentMonth + 1)
      } else {
        newDate.setMonth(0)
        newDate.setFullYear(newDate.getFullYear() + 1)
      }
    } else {
      newDate.setDate(newDate.getDate() + days)
      return newDate
    }
  }
  return newDate
}
function _strftime(s, maxsize, format, tm) {
  var tm_zone = GROWABLE_HEAP_I32()[(tm + 40) >> 2]
  var date = {
    tm_sec: GROWABLE_HEAP_I32()[tm >> 2],
    tm_min: GROWABLE_HEAP_I32()[(tm + 4) >> 2],
    tm_hour: GROWABLE_HEAP_I32()[(tm + 8) >> 2],
    tm_mday: GROWABLE_HEAP_I32()[(tm + 12) >> 2],
    tm_mon: GROWABLE_HEAP_I32()[(tm + 16) >> 2],
    tm_year: GROWABLE_HEAP_I32()[(tm + 20) >> 2],
    tm_wday: GROWABLE_HEAP_I32()[(tm + 24) >> 2],
    tm_yday: GROWABLE_HEAP_I32()[(tm + 28) >> 2],
    tm_isdst: GROWABLE_HEAP_I32()[(tm + 32) >> 2],
    tm_gmtoff: GROWABLE_HEAP_I32()[(tm + 36) >> 2],
    tm_zone: tm_zone ? UTF8ToString(tm_zone) : ''
  }
  var pattern = UTF8ToString(format)
  var EXPANSION_RULES_1 = {
    '%c': '%a %b %d %H:%M:%S %Y',
    '%D': '%m/%d/%y',
    '%F': '%Y-%m-%d',
    '%h': '%b',
    '%r': '%I:%M:%S %p',
    '%R': '%H:%M',
    '%T': '%H:%M:%S',
    '%x': '%m/%d/%y',
    '%X': '%H:%M:%S',
    '%Ec': '%c',
    '%EC': '%C',
    '%Ex': '%m/%d/%y',
    '%EX': '%H:%M:%S',
    '%Ey': '%y',
    '%EY': '%Y',
    '%Od': '%d',
    '%Oe': '%e',
    '%OH': '%H',
    '%OI': '%I',
    '%Om': '%m',
    '%OM': '%M',
    '%OS': '%S',
    '%Ou': '%u',
    '%OU': '%U',
    '%OV': '%V',
    '%Ow': '%w',
    '%OW': '%W',
    '%Oy': '%y'
  }
  for (var rule in EXPANSION_RULES_1) {
    pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule])
  }
  var WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  var MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  function leadingSomething(value, digits, character) {
    var str = typeof value === 'number' ? value.toString() : value || ''
    while (str.length < digits) {
      str = character[0] + str
    }
    return str
  }
  function leadingNulls(value, digits) {
    return leadingSomething(value, digits, '0')
  }
  function compareByDay(date1, date2) {
    function sgn(value) {
      return value < 0 ? -1 : value > 0 ? 1 : 0
    }
    var compare
    if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
      if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
        compare = sgn(date1.getDate() - date2.getDate())
      }
    }
    return compare
  }
  function getFirstWeekStartDate(janFourth) {
    switch (janFourth.getDay()) {
      case 0:
        return new Date(janFourth.getFullYear() - 1, 11, 29)
      case 1:
        return janFourth
      case 2:
        return new Date(janFourth.getFullYear(), 0, 3)
      case 3:
        return new Date(janFourth.getFullYear(), 0, 2)
      case 4:
        return new Date(janFourth.getFullYear(), 0, 1)
      case 5:
        return new Date(janFourth.getFullYear() - 1, 11, 31)
      case 6:
        return new Date(janFourth.getFullYear() - 1, 11, 30)
    }
  }
  function getWeekBasedYear(date) {
    var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday)
    var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4)
    var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4)
    var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear)
    var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear)
    if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
      if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
        return thisDate.getFullYear() + 1
      } else {
        return thisDate.getFullYear()
      }
    } else {
      return thisDate.getFullYear() - 1
    }
  }
  var EXPANSION_RULES_2 = {
    '%a': function (date) {
      return WEEKDAYS[date.tm_wday].substring(0, 3)
    },
    '%A': function (date) {
      return WEEKDAYS[date.tm_wday]
    },
    '%b': function (date) {
      return MONTHS[date.tm_mon].substring(0, 3)
    },
    '%B': function (date) {
      return MONTHS[date.tm_mon]
    },
    '%C': function (date) {
      var year = date.tm_year + 1900
      return leadingNulls((year / 100) | 0, 2)
    },
    '%d': function (date) {
      return leadingNulls(date.tm_mday, 2)
    },
    '%e': function (date) {
      return leadingSomething(date.tm_mday, 2, ' ')
    },
    '%g': function (date) {
      return getWeekBasedYear(date).toString().substring(2)
    },
    '%G': function (date) {
      return getWeekBasedYear(date)
    },
    '%H': function (date) {
      return leadingNulls(date.tm_hour, 2)
    },
    '%I': function (date) {
      var twelveHour = date.tm_hour
      if (twelveHour == 0) twelveHour = 12
      else if (twelveHour > 12) twelveHour -= 12
      return leadingNulls(twelveHour, 2)
    },
    '%j': function (date) {
      return leadingNulls(
        date.tm_mday +
          __arraySum(
            __isLeapYear(date.tm_year + 1900)
              ? __MONTH_DAYS_LEAP
              : __MONTH_DAYS_REGULAR,
            date.tm_mon - 1
          ),
        3
      )
    },
    '%m': function (date) {
      return leadingNulls(date.tm_mon + 1, 2)
    },
    '%M': function (date) {
      return leadingNulls(date.tm_min, 2)
    },
    '%n': function () {
      return '\n'
    },
    '%p': function (date) {
      if (date.tm_hour >= 0 && date.tm_hour < 12) {
        return 'AM'
      } else {
        return 'PM'
      }
    },
    '%S': function (date) {
      return leadingNulls(date.tm_sec, 2)
    },
    '%t': function () {
      return '\t'
    },
    '%u': function (date) {
      return date.tm_wday || 7
    },
    '%U': function (date) {
      var janFirst = new Date(date.tm_year + 1900, 0, 1)
      var firstSunday =
        janFirst.getDay() === 0
          ? janFirst
          : __addDays(janFirst, 7 - janFirst.getDay())
      var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday)
      if (compareByDay(firstSunday, endDate) < 0) {
        var februaryFirstUntilEndMonth =
          __arraySum(
            __isLeapYear(endDate.getFullYear())
              ? __MONTH_DAYS_LEAP
              : __MONTH_DAYS_REGULAR,
            endDate.getMonth() - 1
          ) - 31
        var firstSundayUntilEndJanuary = 31 - firstSunday.getDate()
        var days =
          firstSundayUntilEndJanuary +
          februaryFirstUntilEndMonth +
          endDate.getDate()
        return leadingNulls(Math.ceil(days / 7), 2)
      }
      return compareByDay(firstSunday, janFirst) === 0 ? '01' : '00'
    },
    '%V': function (date) {
      var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4)
      var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4)
      var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear)
      var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear)
      var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday)
      if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
        return '53'
      }
      if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
        return '01'
      }
      var daysDifference
      if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
        daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate()
      } else {
        daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate()
      }
      return leadingNulls(Math.ceil(daysDifference / 7), 2)
    },
    '%w': function (date) {
      return date.tm_wday
    },
    '%W': function (date) {
      var janFirst = new Date(date.tm_year, 0, 1)
      var firstMonday =
        janFirst.getDay() === 1
          ? janFirst
          : __addDays(
              janFirst,
              janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1
            )
      var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday)
      if (compareByDay(firstMonday, endDate) < 0) {
        var februaryFirstUntilEndMonth =
          __arraySum(
            __isLeapYear(endDate.getFullYear())
              ? __MONTH_DAYS_LEAP
              : __MONTH_DAYS_REGULAR,
            endDate.getMonth() - 1
          ) - 31
        var firstMondayUntilEndJanuary = 31 - firstMonday.getDate()
        var days =
          firstMondayUntilEndJanuary +
          februaryFirstUntilEndMonth +
          endDate.getDate()
        return leadingNulls(Math.ceil(days / 7), 2)
      }
      return compareByDay(firstMonday, janFirst) === 0 ? '01' : '00'
    },
    '%y': function (date) {
      return (date.tm_year + 1900).toString().substring(2)
    },
    '%Y': function (date) {
      return date.tm_year + 1900
    },
    '%z': function (date) {
      var off = date.tm_gmtoff
      var ahead = off >= 0
      off = Math.abs(off) / 60
      off = (off / 60) * 100 + (off % 60)
      return (ahead ? '+' : '-') + String('0000' + off).slice(-4)
    },
    '%Z': function (date) {
      return date.tm_zone
    },
    '%%': function () {
      return '%'
    }
  }
  for (var rule in EXPANSION_RULES_2) {
    if (pattern.indexOf(rule) >= 0) {
      pattern = pattern.replace(
        new RegExp(rule, 'g'),
        EXPANSION_RULES_2[rule](date)
      )
    }
  }
  var bytes = intArrayFromString(pattern, false)
  if (bytes.length > maxsize) {
    return 0
  }
  writeArrayToMemory(bytes, s)
  return bytes.length - 1
}
function _strftime_l(s, maxsize, format, tm) {
  return _strftime(s, maxsize, format, tm)
}
function _sysconf(name) {
  if (ENVIRONMENT_IS_PTHREAD)
    return _emscripten_proxy_to_main_thread_js(22, 1, name)
  switch (name) {
    case 30:
      return 16384
    case 85:
      var maxHeapSize = 2147483648
      return maxHeapSize / 16384
    case 132:
    case 133:
    case 12:
    case 137:
    case 138:
    case 15:
    case 235:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 149:
    case 13:
    case 10:
    case 236:
    case 153:
    case 9:
    case 21:
    case 22:
    case 159:
    case 154:
    case 14:
    case 77:
    case 78:
    case 139:
    case 82:
    case 68:
    case 67:
    case 164:
    case 11:
    case 29:
    case 47:
    case 48:
    case 95:
    case 52:
    case 51:
    case 46:
      return 200809
    case 27:
    case 246:
    case 127:
    case 128:
    case 23:
    case 24:
    case 160:
    case 161:
    case 181:
    case 182:
    case 242:
    case 183:
    case 184:
    case 243:
    case 244:
    case 245:
    case 165:
    case 178:
    case 179:
    case 49:
    case 50:
    case 168:
    case 169:
    case 175:
    case 170:
    case 171:
    case 172:
    case 97:
    case 76:
    case 32:
    case 173:
    case 35:
    case 80:
    case 81:
    case 79:
      return -1
    case 176:
    case 177:
    case 7:
    case 155:
    case 8:
    case 157:
    case 125:
    case 126:
    case 92:
    case 93:
    case 129:
    case 130:
    case 131:
    case 94:
    case 91:
      return 1
    case 74:
    case 60:
    case 69:
    case 70:
    case 4:
      return 1024
    case 31:
    case 42:
    case 72:
      return 32
    case 87:
    case 26:
    case 33:
      return 2147483647
    case 34:
    case 1:
      return 47839
    case 38:
    case 36:
      return 99
    case 43:
    case 37:
      return 2048
    case 0:
      return 2097152
    case 3:
      return 65536
    case 28:
      return 32768
    case 44:
      return 32767
    case 75:
      return 16384
    case 39:
      return 1e3
    case 89:
      return 700
    case 71:
      return 256
    case 40:
      return 255
    case 2:
      return 100
    case 180:
      return 64
    case 25:
      return 20
    case 5:
      return 16
    case 6:
      return 6
    case 73:
      return 4
    case 84: {
      if (typeof navigator === 'object')
        return navigator['hardwareConcurrency'] || 1
      return 1
    }
  }
  setErrNo(28)
  return -1
}
function _system(command) {
  if (ENVIRONMENT_IS_NODE) {
    if (!command) return 1
    var cmdstr = UTF8ToString(command)
    if (!cmdstr.length) return 0
    var cp = require('child_process')
    var ret = cp.spawnSync(cmdstr, [], { shell: true, stdio: 'inherit' })
    var _W_EXITCODE = function (ret, sig) {
      return (ret << 8) | sig
    }
    if (ret.status === null) {
      var signalToNumber = function (sig) {
        switch (sig) {
          case 'SIGHUP':
            return 1
          case 'SIGINT':
            return 2
          case 'SIGQUIT':
            return 3
          case 'SIGFPE':
            return 8
          case 'SIGKILL':
            return 9
          case 'SIGALRM':
            return 14
          case 'SIGTERM':
            return 15
        }
        return 2
      }
      return _W_EXITCODE(0, signalToNumber(ret.signal))
    }
    return _W_EXITCODE(ret.status, 0)
  }
  if (!command) return 0
  setErrNo(6)
  return -1
}
function _time(ptr) {
  var ret = (Date.now() / 1e3) | 0
  if (ptr) {
    GROWABLE_HEAP_I32()[ptr >> 2] = ret
  }
  return ret
}
if (!ENVIRONMENT_IS_PTHREAD) PThread.initMainThreadBlock()
var FSNode = function (parent, name, mode, rdev) {
  if (!parent) {
    parent = this
  }
  this.parent = parent
  this.mount = parent.mount
  this.mounted = null
  this.id = FS.nextInode++
  this.name = name
  this.mode = mode
  this.node_ops = {}
  this.stream_ops = {}
  this.rdev = rdev
}
var readMode = 292 | 73
var writeMode = 146
Object.defineProperties(FSNode.prototype, {
  read: {
    get: function () {
      return (this.mode & readMode) === readMode
    },
    set: function (val) {
      val ? (this.mode |= readMode) : (this.mode &= ~readMode)
    }
  },
  write: {
    get: function () {
      return (this.mode & writeMode) === writeMode
    },
    set: function (val) {
      val ? (this.mode |= writeMode) : (this.mode &= ~writeMode)
    }
  },
  isFolder: {
    get: function () {
      return FS.isDir(this.mode)
    }
  },
  isDevice: {
    get: function () {
      return FS.isChrdev(this.mode)
    }
  }
})
FS.FSNode = FSNode
FS.staticInit()
embind_init_charCodes()
BindingError = Module['BindingError'] = extendError(Error, 'BindingError')
InternalError = Module['InternalError'] = extendError(Error, 'InternalError')
init_emval()
var GLctx
var proxiedFunctionTable = [
  null,
  _atexit,
  _tzset,
  ___sys_fcntl64,
  ___sys_ioctl,
  ___sys_mmap2,
  ___sys_munmap,
  ___sys_open,
  ___sys_stat64,
  _cDigitalSignCallBack,
  _cExtraDrawDataCallBack,
  _cExtraDrawDrawCallBack,
  _cPlusVisibleDecCallBack,
  _cRecordDataCallBack,
  _emscripten_set_canvas_element_size_main_thread,
  _environ_get,
  _environ_sizes_get,
  _fd_close,
  _fd_fdstat_get,
  _fd_read,
  _fd_seek,
  _fd_write,
  _sysconf
]
var ASSERTIONS = true
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1
  var u8array = new Array(len)
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length)
  if (dontAddNull) u8array.length = numBytesWritten
  return u8array
}
var asmLibraryArg = {
  DH_SVAC2_Dec_Close: _DH_SVAC2_Dec_Close,
  DH_SVAC2_Dec_Decode: _DH_SVAC2_Dec_Decode,
  DH_SVAC2_Dec_Get_OutPut_Frame: _DH_SVAC2_Dec_Get_OutPut_Frame,
  DH_SVAC2_Dec_Init: _DH_SVAC2_Dec_Init,
  DH_SVAC2_Dec_Open: _DH_SVAC2_Dec_Open,
  DH_SVAC2_Dec_Release_OutPut_Frame: _DH_SVAC2_Dec_Release_OutPut_Frame,
  DRAW_StopDrawTrackIvs: _DRAW_StopDrawTrackIvs,
  Fisheye_CreateHandle: _Fisheye_CreateHandle,
  Fisheye_DeWarp: _Fisheye_DeWarp,
  Fisheye_DeleteHandle: _Fisheye_DeleteHandle,
  Fisheye_EptzUpdate: _Fisheye_EptzUpdate,
  Fisheye_GetMemSize: _Fisheye_GetMemSize,
  Fisheye_GetParam: _Fisheye_GetParam,
  Fisheye_SetParam: _Fisheye_SetParam,
  SCALE_close: _SCALE_close,
  SCALE_open: _SCALE_open,
  SCALE_start: _SCALE_start,
  __assert_fail: ___assert_fail,
  __call_main: ___call_main,
  __clock_gettime: ___clock_gettime,
  __cxa_allocate_exception: ___cxa_allocate_exception,
  __cxa_atexit: ___cxa_atexit,
  __cxa_throw: ___cxa_throw,
  __gmtime_r: ___gmtime_r,
  __localtime_r: ___localtime_r,
  __sys_fcntl64: ___sys_fcntl64,
  __sys_ioctl: ___sys_ioctl,
  __sys_mmap2: ___sys_mmap2,
  __sys_munmap: ___sys_munmap,
  __sys_open: ___sys_open,
  __sys_stat64: ___sys_stat64,
  _embind_register_bool: __embind_register_bool,
  _embind_register_emval: __embind_register_emval,
  _embind_register_float: __embind_register_float,
  _embind_register_integer: __embind_register_integer,
  _embind_register_memory_view: __embind_register_memory_view,
  _embind_register_std_string: __embind_register_std_string,
  _embind_register_std_wstring: __embind_register_std_wstring,
  _embind_register_void: __embind_register_void,
  _emscripten_notify_thread_queue: __emscripten_notify_thread_queue,
  abort: _abort,
  cDigitalSignCallBack: _cDigitalSignCallBack,
  cExtraDrawDataCallBack: _cExtraDrawDataCallBack,
  cExtraDrawDrawCallBack: _cExtraDrawDrawCallBack,
  cPlusVisibleDecCallBack: _cPlusVisibleDecCallBack,
  cRecordDataCallBack: _cRecordDataCallBack,
  clock: _clock,
  clock_gettime: _clock_gettime,
  dlclose: _dlclose,
  dlopen: _dlopen,
  dlsym: _dlsym,
  emscripten_asm_const_int: _emscripten_asm_const_int,
  emscripten_check_blocking_allowed: _emscripten_check_blocking_allowed,
  emscripten_conditional_set_current_thread_status:
    _emscripten_conditional_set_current_thread_status,
  emscripten_futex_wait: _emscripten_futex_wait,
  emscripten_futex_wake: _emscripten_futex_wake,
  emscripten_get_now: _emscripten_get_now,
  emscripten_memcpy_big: _emscripten_memcpy_big,
  emscripten_receive_on_main_thread_js: _emscripten_receive_on_main_thread_js,
  emscripten_resize_heap: _emscripten_resize_heap,
  emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
  emscripten_set_current_thread_status: _emscripten_set_current_thread_status,
  emscripten_set_thread_name: _emscripten_set_thread_name,
  emscripten_webgl_create_context: _emscripten_webgl_create_context,
  environ_get: _environ_get,
  environ_sizes_get: _environ_sizes_get,
  exit: _exit,
  fd_close: _fd_close,
  fd_fdstat_get: _fd_fdstat_get,
  fd_read: _fd_read,
  fd_seek: _fd_seek,
  fd_write: _fd_write,
  gettimeofday: _gettimeofday,
  initPthreadsJS: initPthreadsJS,
  localtime_r: _localtime_r,
  memory: wasmMemory,
  mktime: _mktime,
  pthread_cancel: _pthread_cancel,
  pthread_cleanup_pop: _pthread_cleanup_pop,
  pthread_cleanup_push: _pthread_cleanup_push,
  pthread_create: _pthread_create,
  pthread_detach: _pthread_detach,
  pthread_join: _pthread_join,
  setTempRet0: _setTempRet0,
  strftime_l: _strftime_l,
  sysconf: _sysconf,
  system: _system,
  time: _time
}
var asm = createWasm()
var ___wasm_call_ctors = (Module['___wasm_call_ctors'] =
  createExportWrapper('__wasm_call_ctors'))
var __ZN7General7PlaySDK11CFileParser13FrameCallBackEPvP13SP_FRAME_INFOP13SP_INDEX_INFOiS2_ =
  (Module[
    '__ZN7General7PlaySDK11CFileParser13FrameCallBackEPvP13SP_FRAME_INFOP13SP_INDEX_INFOiS2_'
  ] = createExportWrapper(
    '_ZN7General7PlaySDK11CFileParser13FrameCallBackEPvP13SP_FRAME_INFOP13SP_INDEX_INFOiS2_'
  ))
var __ZN7General7PlaySDK11CFileParser16FileTimeCallBackEPvP12SP_FILE_INFOS2_ =
  (Module[
    '__ZN7General7PlaySDK11CFileParser16FileTimeCallBackEPvP12SP_FILE_INFOS2_'
  ] = createExportWrapper(
    '_ZN7General7PlaySDK11CFileParser16FileTimeCallBackEPvP12SP_FILE_INFOS2_'
  ))
var _PLAY_InitDDraw = (Module['_PLAY_InitDDraw'] =
  createExportWrapper('PLAY_InitDDraw'))
var _PLAY_RealeseDDraw = (Module['_PLAY_RealeseDDraw'] =
  createExportWrapper('PLAY_RealeseDDraw'))
var _PLAY_SetFileNameEncodeType = (Module['_PLAY_SetFileNameEncodeType'] =
  createExportWrapper('PLAY_SetFileNameEncodeType'))
var _PLAY_OpenFile = (Module['_PLAY_OpenFile'] =
  createExportWrapper('PLAY_OpenFile'))
var _PLAY_CloseFile = (Module['_PLAY_CloseFile'] =
  createExportWrapper('PLAY_CloseFile'))
var _PLAY_StopSoundShare = (Module['_PLAY_StopSoundShare'] =
  createExportWrapper('PLAY_StopSoundShare'))
var _PLAY_GetFreePort = (Module['_PLAY_GetFreePort'] =
  createExportWrapper('PLAY_GetFreePort'))
var _PLAY_ReleasePort = (Module['_PLAY_ReleasePort'] =
  createExportWrapper('PLAY_ReleasePort'))
var _PLAY_Play = (Module['_PLAY_Play'] = createExportWrapper('PLAY_Play'))
var _PLAY_Stop = (Module['_PLAY_Stop'] = createExportWrapper('PLAY_Stop'))
var _PLAY_Pause = (Module['_PLAY_Pause'] = createExportWrapper('PLAY_Pause'))
var _PLAY_Fast = (Module['_PLAY_Fast'] = createExportWrapper('PLAY_Fast'))
var _PLAY_Slow = (Module['_PLAY_Slow'] = createExportWrapper('PLAY_Slow'))
var _PLAY_OneByOne = (Module['_PLAY_OneByOne'] =
  createExportWrapper('PLAY_OneByOne'))
var _PLAY_Back = (Module['_PLAY_Back'] = createExportWrapper('PLAY_Back'))
var _PLAY_BackOne = (Module['_PLAY_BackOne'] =
  createExportWrapper('PLAY_BackOne'))
var _PLAY_OneByOneBack = (Module['_PLAY_OneByOneBack'] =
  createExportWrapper('PLAY_OneByOneBack'))
var _PLAY_SetPlayPos = (Module['_PLAY_SetPlayPos'] =
  createExportWrapper('PLAY_SetPlayPos'))
var _PLAY_SetPlayDirection = (Module['_PLAY_SetPlayDirection'] =
  createExportWrapper('PLAY_SetPlayDirection'))
var _PLAY_GetPlayPos = (Module['_PLAY_GetPlayPos'] =
  createExportWrapper('PLAY_GetPlayPos'))
var _PLAY_SetFileEndMsg = (Module['_PLAY_SetFileEndMsg'] =
  createExportWrapper('PLAY_SetFileEndMsg'))
var _PLAY_SetVolume = (Module['_PLAY_SetVolume'] =
  createExportWrapper('PLAY_SetVolume'))
var _PLAY_StopSound = (Module['_PLAY_StopSound'] =
  createExportWrapper('PLAY_StopSound'))
var _PLAY_PlaySound = (Module['_PLAY_PlaySound'] =
  createExportWrapper('PLAY_PlaySound'))
var _PLAY_OpenStream = (Module['_PLAY_OpenStream'] =
  createExportWrapper('PLAY_OpenStream'))
var _PLAY_InputData = (Module['_PLAY_InputData'] =
  createExportWrapper('PLAY_InputData'))
var _PLAY_SetSupportWebMSE = (Module['_PLAY_SetSupportWebMSE'] =
  createExportWrapper('PLAY_SetSupportWebMSE'))
var _PLAY_CloseStream = (Module['_PLAY_CloseStream'] =
  createExportWrapper('PLAY_CloseStream'))
var _PLAY_GetCaps = (Module['_PLAY_GetCaps'] =
  createExportWrapper('PLAY_GetCaps'))
var _PLAY_GetFileTime = (Module['_PLAY_GetFileTime'] =
  createExportWrapper('PLAY_GetFileTime'))
var _PLAY_GetPlayedTime = (Module['_PLAY_GetPlayedTime'] =
  createExportWrapper('PLAY_GetPlayedTime'))
var _PLAY_GetPlayedFrames = (Module['_PLAY_GetPlayedFrames'] =
  createExportWrapper('PLAY_GetPlayedFrames'))
var _PLAY_GetRealFrameBitRate = (Module['_PLAY_GetRealFrameBitRate'] =
  createExportWrapper('PLAY_GetRealFrameBitRate'))
var _PLAY_SetDecCallBack = (Module['_PLAY_SetDecCallBack'] =
  createExportWrapper('PLAY_SetDecCallBack'))
var _PLAY_SetDecCallBackEx = (Module['_PLAY_SetDecCallBackEx'] =
  createExportWrapper('PLAY_SetDecCallBackEx'))
var _PLAY_SetDecodeCallBack = (Module['_PLAY_SetDecodeCallBack'] =
  createExportWrapper('PLAY_SetDecodeCallBack'))
var _PLAY_SetVisibleDecCallBack = (Module['_PLAY_SetVisibleDecCallBack'] =
  createExportWrapper('PLAY_SetVisibleDecCallBack'))
var _PLAY_SetVisibleDecodeCallBack = (Module['_PLAY_SetVisibleDecodeCallBack'] =
  createExportWrapper('PLAY_SetVisibleDecodeCallBack'))
var _PLAY_SetDisplayCallBack = (Module['_PLAY_SetDisplayCallBack'] =
  createExportWrapper('PLAY_SetDisplayCallBack'))
var _PLAY_SetGLESTextureCallBack = (Module['_PLAY_SetGLESTextureCallBack'] =
  createExportWrapper('PLAY_SetGLESTextureCallBack'))
var _PLAY_CatchPicEx = (Module['_PLAY_CatchPicEx'] =
  createExportWrapper('PLAY_CatchPicEx'))
var _PLAY_CatchResizePic = (Module['_PLAY_CatchResizePic'] =
  createExportWrapper('PLAY_CatchResizePic'))
var _PLAY_ConvertToJpegFile = (Module['_PLAY_ConvertToJpegFile'] =
  createExportWrapper('PLAY_ConvertToJpegFile'))
var _PLAY_ConvertToImageData = (Module['_PLAY_ConvertToImageData'] =
  createExportWrapper('PLAY_ConvertToImageData'))
var _PLAY_CatchPic = (Module['_PLAY_CatchPic'] =
  createExportWrapper('PLAY_CatchPic'))
var _PLAY_ConvertToBmpFile = (Module['_PLAY_ConvertToBmpFile'] =
  createExportWrapper('PLAY_ConvertToBmpFile'))
var _PLAY_ConvertToBmpFileEx = (Module['_PLAY_ConvertToBmpFileEx'] =
  createExportWrapper('PLAY_ConvertToBmpFileEx'))
var _PLAY_GetFileTotalFrames = (Module['_PLAY_GetFileTotalFrames'] =
  createExportWrapper('PLAY_GetFileTotalFrames'))
var _PLAY_GetCurrentFrameRate = (Module['_PLAY_GetCurrentFrameRate'] =
  createExportWrapper('PLAY_GetCurrentFrameRate'))
var _PLAY_GetPlayedTimeEx = (Module['_PLAY_GetPlayedTimeEx'] =
  createExportWrapper('PLAY_GetPlayedTimeEx'))
var _PLAY_SetPlayedTimeEx = (Module['_PLAY_SetPlayedTimeEx'] =
  createExportWrapper('PLAY_SetPlayedTimeEx'))
var _PLAY_GetCurrentFrameNum = (Module['_PLAY_GetCurrentFrameNum'] =
  createExportWrapper('PLAY_GetCurrentFrameNum'))
var _PLAY_SetStreamOpenMode = (Module['_PLAY_SetStreamOpenMode'] =
  createExportWrapper('PLAY_SetStreamOpenMode'))
var _PLAY_GetFileHeadLength = (Module['_PLAY_GetFileHeadLength'] =
  createExportWrapper('PLAY_GetFileHeadLength'))
var _PLAY_GetSdkVersion = (Module['_PLAY_GetSdkVersion'] =
  createExportWrapper('PLAY_GetSdkVersion'))
var _PLAY_GetLastError = (Module['_PLAY_GetLastError'] =
  createExportWrapper('PLAY_GetLastError'))
var _PLAY_GetLastErrorEx = (Module['_PLAY_GetLastErrorEx'] =
  createExportWrapper('PLAY_GetLastErrorEx'))
var _PLAY_SetPrintLogLevel = (Module['_PLAY_SetPrintLogLevel'] =
  createExportWrapper('PLAY_SetPrintLogLevel'))
var _PLAY_RefreshPlay = (Module['_PLAY_RefreshPlay'] =
  createExportWrapper('PLAY_RefreshPlay'))
var _PLAY_SetOverlayMode = (Module['_PLAY_SetOverlayMode'] =
  createExportWrapper('PLAY_SetOverlayMode'))
var _PLAY_VerticalSyncEnable = (Module['_PLAY_VerticalSyncEnable'] =
  createExportWrapper('PLAY_VerticalSyncEnable'))
var _PLAY_GetPictureSize = (Module['_PLAY_GetPictureSize'] =
  createExportWrapper('PLAY_GetPictureSize'))
var _PLAY_SetPicQuality = (Module['_PLAY_SetPicQuality'] =
  createExportWrapper('PLAY_SetPicQuality'))
var _PLAY_PlaySoundShare = (Module['_PLAY_PlaySoundShare'] =
  createExportWrapper('PLAY_PlaySoundShare'))
var _PLAY_GetStreamOpenMode = (Module['_PLAY_GetStreamOpenMode'] =
  createExportWrapper('PLAY_GetStreamOpenMode'))
var _PLAY_GetOverlayMode = (Module['_PLAY_GetOverlayMode'] =
  createExportWrapper('PLAY_GetOverlayMode'))
var _PLAY_GetColorKey = (Module['_PLAY_GetColorKey'] =
  createExportWrapper('PLAY_GetColorKey'))
var _PLAY_GetVolume = (Module['_PLAY_GetVolume'] =
  createExportWrapper('PLAY_GetVolume'))
var _PLAY_GetPictureQuality = (Module['_PLAY_GetPictureQuality'] =
  createExportWrapper('PLAY_GetPictureQuality'))
var _PLAY_GetSourceBufferRemain = (Module['_PLAY_GetSourceBufferRemain'] =
  createExportWrapper('PLAY_GetSourceBufferRemain'))
var _PLAY_ResetSourceBuffer = (Module['_PLAY_ResetSourceBuffer'] =
  createExportWrapper('PLAY_ResetSourceBuffer'))
var _PLAY_SetSourceBufCallBack = (Module['_PLAY_SetSourceBufCallBack'] =
  createExportWrapper('PLAY_SetSourceBufCallBack'))
var _PLAY_ResetSourceBufFlag = (Module['_PLAY_ResetSourceBufFlag'] =
  createExportWrapper('PLAY_ResetSourceBufFlag'))
var _PLAY_SetDisplayBuf = (Module['_PLAY_SetDisplayBuf'] =
  createExportWrapper('PLAY_SetDisplayBuf'))
var _PLAY_GetDisplayBuf = (Module['_PLAY_GetDisplayBuf'] =
  createExportWrapper('PLAY_GetDisplayBuf'))
var _PLAY_SetFileRefCallBack = (Module['_PLAY_SetFileRefCallBack'] =
  createExportWrapper('PLAY_SetFileRefCallBack'))
var _PLAY_SetFileRefCallBackEx = (Module['_PLAY_SetFileRefCallBackEx'] =
  createExportWrapper('PLAY_SetFileRefCallBackEx'))
var _PLAY_SetCurrentFrameNum = (Module['_PLAY_SetCurrentFrameNum'] =
  createExportWrapper('PLAY_SetCurrentFrameNum'))
var _PLAY_GetKeyFramePos = (Module['_PLAY_GetKeyFramePos'] =
  createExportWrapper('PLAY_GetKeyFramePos'))
var _PLAY_GetNextKeyFramePos = (Module['_PLAY_GetNextKeyFramePos'] =
  createExportWrapper('PLAY_GetNextKeyFramePos'))
var _PLAY_InitDDrawDevice = (Module['_PLAY_InitDDrawDevice'] =
  createExportWrapper('PLAY_InitDDrawDevice'))
var _PLAY_ReleaseDDrawDevice = (Module['_PLAY_ReleaseDDrawDevice'] =
  createExportWrapper('PLAY_ReleaseDDrawDevice'))
var _PLAY_GetDDrawDeviceTotalNums = (Module['_PLAY_GetDDrawDeviceTotalNums'] =
  createExportWrapper('PLAY_GetDDrawDeviceTotalNums'))
var _PLAY_SetDDrawDevice = (Module['_PLAY_SetDDrawDevice'] =
  createExportWrapper('PLAY_SetDDrawDevice'))
var _PLAY_GetDDrawDeviceInfo = (Module['_PLAY_GetDDrawDeviceInfo'] =
  createExportWrapper('PLAY_GetDDrawDeviceInfo'))
var _PLAY_GetCapsEx = (Module['_PLAY_GetCapsEx'] =
  createExportWrapper('PLAY_GetCapsEx'))
var _PLAY_ThrowBFrameNum = (Module['_PLAY_ThrowBFrameNum'] =
  createExportWrapper('PLAY_ThrowBFrameNum'))
var _PLAY_SetDisplayType = (Module['_PLAY_SetDisplayType'] =
  createExportWrapper('PLAY_SetDisplayType'))
var _PLAY_GetDisplayType = (Module['_PLAY_GetDisplayType'] =
  createExportWrapper('PLAY_GetDisplayType'))
var _PLAY_SetDecCBStream = (Module['_PLAY_SetDecCBStream'] =
  createExportWrapper('PLAY_SetDecCBStream'))
var _PLAY_SetDisplayRegion = (Module['_PLAY_SetDisplayRegion'] =
  createExportWrapper('PLAY_SetDisplayRegion'))
var _PLAY_RefreshPlayEx = (Module['_PLAY_RefreshPlayEx'] =
  createExportWrapper('PLAY_RefreshPlayEx'))
var _PLAY_SetDDrawDeviceEx = (Module['_PLAY_SetDDrawDeviceEx'] =
  createExportWrapper('PLAY_SetDDrawDeviceEx'))
var _PLAY_GetRefValue = (Module['_PLAY_GetRefValue'] =
  createExportWrapper('PLAY_GetRefValue'))
var _PLAY_SetRefValue = (Module['_PLAY_SetRefValue'] =
  createExportWrapper('PLAY_SetRefValue'))
var _PLAY_OpenStreamEx = (Module['_PLAY_OpenStreamEx'] =
  createExportWrapper('PLAY_OpenStreamEx'))
var _PLAY_CloseStreamEx = (Module['_PLAY_CloseStreamEx'] =
  createExportWrapper('PLAY_CloseStreamEx'))
var _PLAY_InputVideoData = (Module['_PLAY_InputVideoData'] =
  createExportWrapper('PLAY_InputVideoData'))
var _PLAY_InputAudioData = (Module['_PLAY_InputAudioData'] =
  createExportWrapper('PLAY_InputAudioData'))
var _PLAY_RigisterDrawFun = (Module['_PLAY_RigisterDrawFun'] =
  createExportWrapper('PLAY_RigisterDrawFun'))
var _PLAY_RigisterDrawRendleHandleFun = (Module[
  '_PLAY_RigisterDrawRendleHandleFun'
] = createExportWrapper('PLAY_RigisterDrawRendleHandleFun'))
var _PLAY_RigisterDrawFunEx = (Module['_PLAY_RigisterDrawFunEx'] =
  createExportWrapper('PLAY_RigisterDrawFunEx'))
var _PLAY_SetTimerType = (Module['_PLAY_SetTimerType'] =
  createExportWrapper('PLAY_SetTimerType'))
var _PLAY_GetTimerType = (Module['_PLAY_GetTimerType'] =
  createExportWrapper('PLAY_GetTimerType'))
var _PLAY_ResetBuffer = (Module['_PLAY_ResetBuffer'] =
  createExportWrapper('PLAY_ResetBuffer'))
var _PLAY_GetBufferValue = (Module['_PLAY_GetBufferValue'] =
  createExportWrapper('PLAY_GetBufferValue'))
var _PLAY_AdjustWaveAudio = (Module['_PLAY_AdjustWaveAudio'] =
  createExportWrapper('PLAY_AdjustWaveAudio'))
var _PLAY_SetVerifyCallBack = (Module['_PLAY_SetVerifyCallBack'] =
  createExportWrapper('PLAY_SetVerifyCallBack'))
var _PLAY_SetAudioCallBack = (Module['_PLAY_SetAudioCallBack'] =
  createExportWrapper('PLAY_SetAudioCallBack'))
var _PLAY_SetEncTypeChangeCallBack = (Module['_PLAY_SetEncTypeChangeCallBack'] =
  createExportWrapper('PLAY_SetEncTypeChangeCallBack'))
var _PLAY_SetEncTypeChangeCallBackEx = (Module[
  '_PLAY_SetEncTypeChangeCallBackEx'
] = createExportWrapper('PLAY_SetEncTypeChangeCallBackEx'))
var _PLAY_SetColor = (Module['_PLAY_SetColor'] =
  createExportWrapper('PLAY_SetColor'))
var _PLAY_GetColor = (Module['_PLAY_GetColor'] =
  createExportWrapper('PLAY_GetColor'))
var _PLAY_SetEncChangeMsg = (Module['_PLAY_SetEncChangeMsg'] =
  createExportWrapper('PLAY_SetEncChangeMsg'))
var _PLAY_SetMDRange = (Module['_PLAY_SetMDRange'] =
  createExportWrapper('PLAY_SetMDRange'))
var _PLAY_SetMDThreShold = (Module['_PLAY_SetMDThreShold'] =
  createExportWrapper('PLAY_SetMDThreShold'))
var _PLAY_GetMDPosition = (Module['_PLAY_GetMDPosition'] =
  createExportWrapper('PLAY_GetMDPosition'))
var _PLAY_SetFileEndCallBack = (Module['_PLAY_SetFileEndCallBack'] =
  createExportWrapper('PLAY_SetFileEndCallBack'))
var _PLAY_StartDataRecord = (Module['_PLAY_StartDataRecord'] =
  createExportWrapper('PLAY_StartDataRecord'))
var _PLAY_StartDataRecordEx = (Module['_PLAY_StartDataRecordEx'] =
  createExportWrapper('PLAY_StartDataRecordEx'))
var _PLAY_SetSegmentRecordData = (Module['_PLAY_SetSegmentRecordData'] =
  createExportWrapper('PLAY_SetSegmentRecordData'))
var _PLAY_WriteData = (Module['_PLAY_WriteData'] =
  createExportWrapper('PLAY_WriteData'))
var _PLAY_StopDataRecord = (Module['_PLAY_StopDataRecord'] =
  createExportWrapper('PLAY_StopDataRecord'))
var _PLAY_StartAVIConvert = (Module['_PLAY_StartAVIConvert'] =
  createExportWrapper('PLAY_StartAVIConvert'))
var _PLAY_StopAVIConvert = (Module['_PLAY_StopAVIConvert'] =
  createExportWrapper('PLAY_StopAVIConvert'))
var _PLAY_StopAVIResizeConvert = (Module['_PLAY_StopAVIResizeConvert'] =
  createExportWrapper('PLAY_StopAVIResizeConvert'))
var _PLAY_AdjustFluency = (Module['_PLAY_AdjustFluency'] =
  createExportWrapper('PLAY_AdjustFluency'))
var _PLAY_ChangeRate = (Module['_PLAY_ChangeRate'] =
  createExportWrapper('PLAY_ChangeRate'))
var _PLAY_SetDemuxCallBack = (Module['_PLAY_SetDemuxCallBack'] =
  createExportWrapper('PLAY_SetDemuxCallBack'))
var _PLAY_SetOSDInfoCallBack = (Module['_PLAY_SetOSDInfoCallBack'] =
  createExportWrapper('PLAY_SetOSDInfoCallBack'))
var _PLAY_QueryInfo = (Module['_PLAY_QueryInfo'] =
  createExportWrapper('PLAY_QueryInfo'))
var _PLAY_OpenAudioRecord = (Module['_PLAY_OpenAudioRecord'] =
  createExportWrapper('PLAY_OpenAudioRecord'))
var _PLAY_CloseAudioRecord = (Module['_PLAY_CloseAudioRecord'] =
  createExportWrapper('PLAY_CloseAudioRecord'))
var _PLAY_SpeechChange = (Module['_PLAY_SpeechChange'] =
  createExportWrapper('PLAY_SpeechChange'))
var _PLAY_SetAudioRecScaling = (Module['_PLAY_SetAudioRecScaling'] =
  createExportWrapper('PLAY_SetAudioRecScaling'))
var _PLAY_GetAudioRecScaling = (Module['_PLAY_GetAudioRecScaling'] =
  createExportWrapper('PLAY_GetAudioRecScaling'))
var _PLAY_SetAudioRenderScaling = (Module['_PLAY_SetAudioRenderScaling'] =
  createExportWrapper('PLAY_SetAudioRenderScaling'))
var _PLAY_GetAudioRenderScaling = (Module['_PLAY_GetAudioRenderScaling'] =
  createExportWrapper('PLAY_GetAudioRenderScaling'))
var _PLAY_SetWaterMarkCallBack = (Module['_PLAY_SetWaterMarkCallBack'] =
  createExportWrapper('PLAY_SetWaterMarkCallBack'))
var _PLAY_SetWaterMarkCallBackEx = (Module['_PLAY_SetWaterMarkCallBackEx'] =
  createExportWrapper('PLAY_SetWaterMarkCallBackEx'))
var _PLAY_SetPandoraWaterMarkCallBack = (Module[
  '_PLAY_SetPandoraWaterMarkCallBack'
] = createExportWrapper('PLAY_SetPandoraWaterMarkCallBack'))
var _PLAY_SetIVSCallBack = (Module['_PLAY_SetIVSCallBack'] =
  createExportWrapper('PLAY_SetIVSCallBack'))
var _PLAY_SetIVSObjAttrCBFun = (Module['_PLAY_SetIVSObjAttrCBFun'] =
  createExportWrapper('PLAY_SetIVSObjAttrCBFun'))
var _PLAY_GetTimePicture = (Module['_PLAY_GetTimePicture'] =
  createExportWrapper('PLAY_GetTimePicture'))
var _PLAY_SetupPrepareTime = (Module['_PLAY_SetupPrepareTime'] =
  createExportWrapper('PLAY_SetupPrepareTime'))
var _PLAY_StartPrepareRecord = (Module['_PLAY_StartPrepareRecord'] =
  createExportWrapper('PLAY_StartPrepareRecord'))
var _PLAY_StopPrepareRecord = (Module['_PLAY_StopPrepareRecord'] =
  createExportWrapper('PLAY_StopPrepareRecord'))
var _PLAY_CreateFile = (Module['_PLAY_CreateFile'] =
  createExportWrapper('PLAY_CreateFile'))
var _PLAY_DestroyFile = (Module['_PLAY_DestroyFile'] =
  createExportWrapper('PLAY_DestroyFile'))
var _PLAY_CreateStream = (Module['_PLAY_CreateStream'] =
  createExportWrapper('PLAY_CreateStream'))
var _PLAY_DestroyStream = (Module['_PLAY_DestroyStream'] =
  createExportWrapper('PLAY_DestroyStream'))
var _PLAY_SetRotateAngle = (Module['_PLAY_SetRotateAngle'] =
  createExportWrapper('PLAY_SetRotateAngle'))
var _PLAY_GetPicBMP = (Module['_PLAY_GetPicBMP'] =
  createExportWrapper('PLAY_GetPicBMP'))
var _PLAY_GetPicBMPEx = (Module['_PLAY_GetPicBMPEx'] =
  createExportWrapper('PLAY_GetPicBMPEx'))
var _PLAY_GetPicJPEG = (Module['_PLAY_GetPicJPEG'] =
  createExportWrapper('PLAY_GetPicJPEG'))
var _PLAY_GetPicTIFF = (Module['_PLAY_GetPicTIFF'] =
  createExportWrapper('PLAY_GetPicTIFF'))
var _PLAY_CutFileSegment = (Module['_PLAY_CutFileSegment'] =
  createExportWrapper('PLAY_CutFileSegment'))
var _PLAY_SetVideoPerTimer = (Module['_PLAY_SetVideoPerTimer'] =
  createExportWrapper('PLAY_SetVideoPerTimer'))
var _PLAY_GetVideoPerTimer = (Module['_PLAY_GetVideoPerTimer'] =
  createExportWrapper('PLAY_GetVideoPerTimer'))
var _PLAY_SetSecurityKey = (Module['_PLAY_SetSecurityKey'] =
  createExportWrapper('PLAY_SetSecurityKey'))
var _PLAY_SetSecurityKeyEx = (Module['_PLAY_SetSecurityKeyEx'] =
  createExportWrapper('PLAY_SetSecurityKeyEx'))
var _PLAY_SetEncryptKey = (Module['_PLAY_SetEncryptKey'] =
  createExportWrapper('PLAY_SetEncryptKey'))
var _PLAY_SetDigitalSignCallBack = (Module['_PLAY_SetDigitalSignCallBack'] =
  createExportWrapper('PLAY_SetDigitalSignCallBack'))
var _PLAY_SetDelayTime = (Module['_PLAY_SetDelayTime'] =
  createExportWrapper('PLAY_SetDelayTime'))
var _PLAY_SetPlayMethod = (Module['_PLAY_SetPlayMethod'] =
  createExportWrapper('PLAY_SetPlayMethod'))
var _PLAY_SetCacheMode = (Module['_PLAY_SetCacheMode'] =
  createExportWrapper('PLAY_SetCacheMode'))
var _PLAY_SetAudioPlayMethod = (Module['_PLAY_SetAudioPlayMethod'] =
  createExportWrapper('PLAY_SetAudioPlayMethod'))
var _PLAY_StartFisheye = (Module['_PLAY_StartFisheye'] =
  createExportWrapper('PLAY_StartFisheye'))
var _PLAY_StartFisheyeEx = (Module['_PLAY_StartFisheyeEx'] =
  createExportWrapper('PLAY_StartFisheyeEx'))
var _PLAY_StartFisheyeMPTZ = (Module['_PLAY_StartFisheyeMPTZ'] =
  createExportWrapper('PLAY_StartFisheyeMPTZ'))
var _PLAY_SetFisheyeParams = (Module['_PLAY_SetFisheyeParams'] =
  createExportWrapper('PLAY_SetFisheyeParams'))
var _PLAY_FisheyeGetPosition = (Module['_PLAY_FisheyeGetPosition'] =
  createExportWrapper('PLAY_FisheyeGetPosition'))
var _PLAY_OptFisheyeParams = (Module['_PLAY_OptFisheyeParams'] =
  createExportWrapper('PLAY_OptFisheyeParams'))
var _PLAY_OldFisheyeEptzUpdate = (Module['_PLAY_OldFisheyeEptzUpdate'] =
  createExportWrapper('PLAY_OldFisheyeEptzUpdate'))
var _PLAY_FisheyeEptzUpdate = (Module['_PLAY_FisheyeEptzUpdate'] =
  createExportWrapper('PLAY_FisheyeEptzUpdate'))
var _PLAY_FisheyeSecondRegion = (Module['_PLAY_FisheyeSecondRegion'] =
  createExportWrapper('PLAY_FisheyeSecondRegion'))
var _PLAY_StopFisheye = (Module['_PLAY_StopFisheye'] =
  createExportWrapper('PLAY_StopFisheye'))
var _PLAY_FisheyeTrancFormTrackFrame = (Module[
  '_PLAY_FisheyeTrancFormTrackFrame'
] = createExportWrapper('PLAY_FisheyeTrancFormTrackFrame'))
var _PLAY_FisheyeTrancFormCoordinate = (Module[
  '_PLAY_FisheyeTrancFormCoordinate'
] = createExportWrapper('PLAY_FisheyeTrancFormCoordinate'))
var _PLAY_FisheyeTrancFormCurve = (Module['_PLAY_FisheyeTrancFormCurve'] =
  createExportWrapper('PLAY_FisheyeTrancFormCurve'))
var _PLAY_StartDeNoise = (Module['_PLAY_StartDeNoise'] =
  createExportWrapper('PLAY_StartDeNoise'))
var _PLAY_SetDeNoiseParams = (Module['_PLAY_SetDeNoiseParams'] =
  createExportWrapper('PLAY_SetDeNoiseParams'))
var _PLAY_StopDeNoise = (Module['_PLAY_StopDeNoise'] =
  createExportWrapper('PLAY_StopDeNoise'))
var _PLAY_StartDeHaze = (Module['_PLAY_StartDeHaze'] =
  createExportWrapper('PLAY_StartDeHaze'))
var _PLAY_SetDehazeParams = (Module['_PLAY_SetDehazeParams'] =
  createExportWrapper('PLAY_SetDehazeParams'))
var _PLAY_StopDeHaze = (Module['_PLAY_StopDeHaze'] =
  createExportWrapper('PLAY_StopDeHaze'))
var _PLAY_StartIVSE = (Module['_PLAY_StartIVSE'] =
  createExportWrapper('PLAY_StartIVSE'))
var _PLAY_SetIVSEParams = (Module['_PLAY_SetIVSEParams'] =
  createExportWrapper('PLAY_SetIVSEParams'))
var _PLAY_StopIVSE = (Module['_PLAY_StopIVSE'] =
  createExportWrapper('PLAY_StopIVSE'))
var _PLAY_EnableRecitfy = (Module['_PLAY_EnableRecitfy'] =
  createExportWrapper('PLAY_EnableRecitfy'))
var _PLAY_EnableLargePicAdjustment = (Module['_PLAY_EnableLargePicAdjustment'] =
  createExportWrapper('PLAY_EnableLargePicAdjustment'))
var _PLAY_SetPlaySpeed = (Module['_PLAY_SetPlaySpeed'] =
  createExportWrapper('PLAY_SetPlaySpeed'))
var _PLAY_OpenPlayGroup = (Module['_PLAY_OpenPlayGroup'] =
  createExportWrapper('PLAY_OpenPlayGroup'))
var _PLAY_AddToPlayGroup = (Module['_PLAY_AddToPlayGroup'] =
  createExportWrapper('PLAY_AddToPlayGroup'))
var _PLAY_DelFromPlayGroup = (Module['_PLAY_DelFromPlayGroup'] =
  createExportWrapper('PLAY_DelFromPlayGroup'))
var _PLAY_SetPlayGroupDirection = (Module['_PLAY_SetPlayGroupDirection'] =
  createExportWrapper('PLAY_SetPlayGroupDirection'))
var _PLAY_SetPlayGroupSpeed = (Module['_PLAY_SetPlayGroupSpeed'] =
  createExportWrapper('PLAY_SetPlayGroupSpeed'))
var _PLAY_PausePlayGroup = (Module['_PLAY_PausePlayGroup'] =
  createExportWrapper('PLAY_PausePlayGroup'))
var _PLAY_StepPlayGroup = (Module['_PLAY_StepPlayGroup'] =
  createExportWrapper('PLAY_StepPlayGroup'))
var _PLAY_SeekPlayGroup = (Module['_PLAY_SeekPlayGroup'] =
  createExportWrapper('PLAY_SeekPlayGroup'))
var _PLAY_ClosePlayGroup = (Module['_PLAY_ClosePlayGroup'] =
  createExportWrapper('PLAY_ClosePlayGroup'))
var _PLAY_SetPlayGroupBaseChannel = (Module['_PLAY_SetPlayGroupBaseChannel'] =
  createExportWrapper('PLAY_SetPlayGroupBaseChannel'))
var _PLAY_SetFileTimeDoneCallBack = (Module['_PLAY_SetFileTimeDoneCallBack'] =
  createExportWrapper('PLAY_SetFileTimeDoneCallBack'))
var _PLAY_GetKeyFramePosByAbsTime = (Module['_PLAY_GetKeyFramePosByAbsTime'] =
  createExportWrapper('PLAY_GetKeyFramePosByAbsTime'))
var _PLAY_GetNextKeyFramePosByAbsTime = (Module[
  '_PLAY_GetNextKeyFramePosByAbsTime'
] = createExportWrapper('PLAY_GetNextKeyFramePosByAbsTime'))
var _PLAY_QueryGroupPlayingTime = (Module['_PLAY_QueryGroupPlayingTime'] =
  createExportWrapper('PLAY_QueryGroupPlayingTime'))
var _PLAY_SurfaceChange = (Module['_PLAY_SurfaceChange'] =
  createExportWrapper('PLAY_SurfaceChange'))
var _PLAY_ChooseAudio = (Module['_PLAY_ChooseAudio'] =
  createExportWrapper('PLAY_ChooseAudio'))
var _PLAY_GetAudioChooseState = (Module['_PLAY_GetAudioChooseState'] =
  createExportWrapper('PLAY_GetAudioChooseState'))
var _PLAY_GetAudioChannels = (Module['_PLAY_GetAudioChannels'] =
  createExportWrapper('PLAY_GetAudioChannels'))
var _PLAY_SetPlayedAbsTime = (Module['_PLAY_SetPlayedAbsTime'] =
  createExportWrapper('PLAY_SetPlayedAbsTime'))
var _PLAY_SetFileInfoFrameCallback = (Module['_PLAY_SetFileInfoFrameCallback'] =
  createExportWrapper('PLAY_SetFileInfoFrameCallback'))
var _PLAY_SetAnalyzePositionCallback = (Module[
  '_PLAY_SetAnalyzePositionCallback'
] = createExportWrapper('PLAY_SetAnalyzePositionCallback'))
var _PLAY_StartFileFrameDetect = (Module['_PLAY_StartFileFrameDetect'] =
  createExportWrapper('PLAY_StartFileFrameDetect'))
var _PLAY_StopFileFrameDetect = (Module['_PLAY_StopFileFrameDetect'] =
  createExportWrapper('PLAY_StopFileFrameDetect'))
var _PLAY_StartEdgeEnhance = (Module['_PLAY_StartEdgeEnhance'] =
  createExportWrapper('PLAY_StartEdgeEnhance'))
var _PLAY_StopEdgeEnhance = (Module['_PLAY_StopEdgeEnhance'] =
  createExportWrapper('PLAY_StopEdgeEnhance'))
var _PLAY_StartVideoStable = (Module['_PLAY_StartVideoStable'] =
  createExportWrapper('PLAY_StartVideoStable'))
var _PLAY_StopVideoStable = (Module['_PLAY_StopVideoStable'] =
  createExportWrapper('PLAY_StopVideoStable'))
var _PLAY_StartMosaic = (Module['_PLAY_StartMosaic'] =
  createExportWrapper('PLAY_StartMosaic'))
var _PLAY_StopMosaic = (Module['_PLAY_StopMosaic'] =
  createExportWrapper('PLAY_StopMosaic'))
var _PLAY_Scale = (Module['_PLAY_Scale'] = createExportWrapper('PLAY_Scale'))
var _PLAY_Translate = (Module['_PLAY_Translate'] =
  createExportWrapper('PLAY_Translate'))
var _PLAY_SetIdentity = (Module['_PLAY_SetIdentity'] =
  createExportWrapper('PLAY_SetIdentity'))
var _PLAY_GetScale = (Module['_PLAY_GetScale'] =
  createExportWrapper('PLAY_GetScale'))
var _PLAY_GetTranslateX = (Module['_PLAY_GetTranslateX'] =
  createExportWrapper('PLAY_GetTranslateX'))
var _PLAY_GetTranslateY = (Module['_PLAY_GetTranslateY'] =
  createExportWrapper('PLAY_GetTranslateY'))
var _PLAY_SetPlayPosByFileOffset = (Module['_PLAY_SetPlayPosByFileOffset'] =
  createExportWrapper('PLAY_SetPlayPosByFileOffset'))
var _PLAY_GetCurrentFrameRateEx = (Module['_PLAY_GetCurrentFrameRateEx'] =
  createExportWrapper('PLAY_GetCurrentFrameRateEx'))
var _PLAY_CleanScreen = (Module['_PLAY_CleanScreen'] =
  createExportWrapper('PLAY_CleanScreen'))
var _PLAY_ViewResolutionChanged = (Module['_PLAY_ViewResolutionChanged'] =
  createExportWrapper('PLAY_ViewResolutionChanged'))
var _PLAY_SetFishEyeInfoCallBack = (Module['_PLAY_SetFishEyeInfoCallBack'] =
  createExportWrapper('PLAY_SetFishEyeInfoCallBack'))
var _PLAY_SetMultiFrameCallBack = (Module['_PLAY_SetMultiFrameCallBack'] =
  createExportWrapper('PLAY_SetMultiFrameCallBack'))
var _PLAY_ChooseFrame = (Module['_PLAY_ChooseFrame'] =
  createExportWrapper('PLAY_ChooseFrame'))
var _PLAY_SetMultiFrameDecCallBack = (Module['_PLAY_SetMultiFrameDecCallBack'] =
  createExportWrapper('PLAY_SetMultiFrameDecCallBack'))
var _PLAY_SetDecInfoCallBack = (Module['_PLAY_SetDecInfoCallBack'] =
  createExportWrapper('PLAY_SetDecInfoCallBack'))
var _PLAY_RenderPrivateData = (Module['_PLAY_RenderPrivateData'] =
  createExportWrapper('PLAY_RenderPrivateData'))
var _PLAY_SetIvsEnable = (Module['_PLAY_SetIvsEnable'] =
  createExportWrapper('PLAY_SetIvsEnable'))
var _PLAY_SetIVSTrackEx2Config = (Module['_PLAY_SetIVSTrackEx2Config'] =
  createExportWrapper('PLAY_SetIVSTrackEx2Config'))
var _PLAY_SetFileIndexProgressCallBack = (Module[
  '_PLAY_SetFileIndexProgressCallBack'
] = createExportWrapper('PLAY_SetFileIndexProgressCallBack'))
var _PLAY_GetLastYUVFrame = (Module['_PLAY_GetLastYUVFrame'] =
  createExportWrapper('PLAY_GetLastYUVFrame'))
var _PLAY_SetMemMinimized = (Module['_PLAY_SetMemMinimized'] =
  createExportWrapper('PLAY_SetMemMinimized'))
var _PLAY_SetDisplayScale = (Module['_PLAY_SetDisplayScale'] =
  createExportWrapper('PLAY_SetDisplayScale'))
var _PLAY_SetDecodeThreadNum = (Module['_PLAY_SetDecodeThreadNum'] =
  createExportWrapper('PLAY_SetDecodeThreadNum'))
var _PLAY_SetDecodeKey = (Module['_PLAY_SetDecodeKey'] =
  createExportWrapper('PLAY_SetDecodeKey'))
var _PLAY_GetIRefValue = (Module['_PLAY_GetIRefValue'] =
  createExportWrapper('PLAY_GetIRefValue'))
var _PLAY_OutsideRender = (Module['_PLAY_OutsideRender'] =
  createExportWrapper('PLAY_OutsideRender'))
var _PLAY_SetDoubleVisibleDecCallBack = (Module[
  '_PLAY_SetDoubleVisibleDecCallBack'
] = createExportWrapper('PLAY_SetDoubleVisibleDecCallBack'))
var _PLAY_EnableAudioChannel = (Module['_PLAY_EnableAudioChannel'] =
  createExportWrapper('PLAY_EnableAudioChannel'))
var _PLAY_SplitProc = (Module['_PLAY_SplitProc'] =
  createExportWrapper('PLAY_SplitProc'))
var _PLAY_SplitProcUpdate = (Module['_PLAY_SplitProcUpdate'] =
  createExportWrapper('PLAY_SplitProcUpdate'))
var _PLAY_SetEngine = (Module['_PLAY_SetEngine'] =
  createExportWrapper('PLAY_SetEngine'))
var _PLAY_SetRenderMode = (Module['_PLAY_SetRenderMode'] =
  createExportWrapper('PLAY_SetRenderMode'))
var _PLAY_InitThirdPartyLibrary = (Module['_PLAY_InitThirdPartyLibrary'] =
  createExportWrapper('PLAY_InitThirdPartyLibrary'))
var _PLAY_SetDecodeStrategy = (Module['_PLAY_SetDecodeStrategy'] =
  createExportWrapper('PLAY_SetDecodeStrategy'))
var _PLAY_SetAVSyncType = (Module['_PLAY_SetAVSyncType'] =
  createExportWrapper('PLAY_SetAVSyncType'))
var _PLAY_InitDisk = (Module['_PLAY_InitDisk'] =
  createExportWrapper('PLAY_InitDisk'))
var _PLAY_GetDiskType = (Module['_PLAY_GetDiskType'] =
  createExportWrapper('PLAY_GetDiskType'))
var _PLAY_QueryFileList = (Module['_PLAY_QueryFileList'] =
  createExportWrapper('PLAY_QueryFileList'))
var _PLAY_QueryTagInfo = (Module['_PLAY_QueryTagInfo'] =
  createExportWrapper('PLAY_QueryTagInfo'))
var _PLAY_QueryChannelInfo = (Module['_PLAY_QueryChannelInfo'] =
  createExportWrapper('PLAY_QueryChannelInfo'))
var _PLAY_FormatDisk = (Module['_PLAY_FormatDisk'] =
  createExportWrapper('PLAY_FormatDisk'))
var _PLAY_SetPercentCallBack = (Module['_PLAY_SetPercentCallBack'] =
  createExportWrapper('PLAY_SetPercentCallBack'))
var _PLAY_SetGPSCallBack = (Module['_PLAY_SetGPSCallBack'] =
  createExportWrapper('PLAY_SetGPSCallBack'))
var _PLAY_SetStatisticCallBack = (Module['_PLAY_SetStatisticCallBack'] =
  createExportWrapper('PLAY_SetStatisticCallBack'))
var _PLAY_SetSEnhanceMode = (Module['_PLAY_SetSEnhanceMode'] =
  createExportWrapper('PLAY_SetSEnhanceMode'))
var _PLAY_Register3rdDecryptHook = (Module['_PLAY_Register3rdDecryptHook'] =
  createExportWrapper('PLAY_Register3rdDecryptHook'))
var _PLAY_SetMultiSensorCallBack = (Module['_PLAY_SetMultiSensorCallBack'] =
  createExportWrapper('PLAY_SetMultiSensorCallBack'))
var _PLAY_SetDisplayRegionEx = (Module['_PLAY_SetDisplayRegionEx'] =
  createExportWrapper('PLAY_SetDisplayRegionEx'))
var _PLAY_SetDecodeDataProcessCallBack = (Module[
  '_PLAY_SetDecodeDataProcessCallBack'
] = createExportWrapper('PLAY_SetDecodeDataProcessCallBack'))
var _PLAY_SetInt32 = (Module['_PLAY_SetInt32'] =
  createExportWrapper('PLAY_SetInt32'))
var _PLAY_GetInt32 = (Module['_PLAY_GetInt32'] =
  createExportWrapper('PLAY_GetInt32'))
var _PLAY_ResolutionScale = (Module['_PLAY_ResolutionScale'] =
  createExportWrapper('PLAY_ResolutionScale'))
var _PLAY_Flush = (Module['_PLAY_Flush'] = createExportWrapper('PLAY_Flush'))
var _PLAY_GetDoubleRegion = (Module['_PLAY_GetDoubleRegion'] =
  createExportWrapper('PLAY_GetDoubleRegion'))
var _PLAY_SetSpeakerAutoEnable = (Module['_PLAY_SetSpeakerAutoEnable'] =
  createExportWrapper('PLAY_SetSpeakerAutoEnable'))
var _PLAY_SetAecDebug = (Module['_PLAY_SetAecDebug'] =
  createExportWrapper('PLAY_SetAecDebug'))
var _PLAY_AecHardwareEnable = (Module['_PLAY_AecHardwareEnable'] =
  createExportWrapper('PLAY_AecHardwareEnable'))
var _PLAY_SetStereoPerspectiveFovy = (Module['_PLAY_SetStereoPerspectiveFovy'] =
  createExportWrapper('PLAY_SetStereoPerspectiveFovy'))
var _PLAY_SetStereoEyeMoveDistance = (Module['_PLAY_SetStereoEyeMoveDistance'] =
  createExportWrapper('PLAY_SetStereoEyeMoveDistance'))
var _PLAY_SetStereoRotate = (Module['_PLAY_SetStereoRotate'] =
  createExportWrapper('PLAY_SetStereoRotate'))
var _PLAY_SetStereoView = (Module['_PLAY_SetStereoView'] =
  createExportWrapper('PLAY_SetStereoView'))
var _PLAY_SetStereoViewMode = (Module['_PLAY_SetStereoViewMode'] =
  createExportWrapper('PLAY_SetStereoViewMode'))
var _PLAY_SetCalibratMode = (Module['_PLAY_SetCalibratMode'] =
  createExportWrapper('PLAY_SetCalibratMode'))
var _PLAY_SetDataCallBack = (Module['_PLAY_SetDataCallBack'] =
  createExportWrapper('PLAY_SetDataCallBack'))
var _PLAY_AntiAliasEnable = (Module['_PLAY_AntiAliasEnable'] =
  createExportWrapper('PLAY_AntiAliasEnable'))
var _PLAY_Set264EncodeInfoCallBack = (Module['_PLAY_Set264EncodeInfoCallBack'] =
  createExportWrapper('PLAY_Set264EncodeInfoCallBack'))
var _PLAY_SetPrivacyRecover = (Module['_PLAY_SetPrivacyRecover'] =
  createExportWrapper('PLAY_SetPrivacyRecover'))
var _PLAY_SetYUVOSDInfo = (Module['_PLAY_SetYUVOSDInfo'] =
  createExportWrapper('PLAY_SetYUVOSDInfo'))
var _PLAY_SetYUVOSDInfoEx = (Module['_PLAY_SetYUVOSDInfoEx'] =
  createExportWrapper('PLAY_SetYUVOSDInfoEx'))
var _PLAY_SetViewProportion = (Module['_PLAY_SetViewProportion'] =
  createExportWrapper('PLAY_SetViewProportion'))
var _PLAY_SetParam = (Module['_PLAY_SetParam'] =
  createExportWrapper('PLAY_SetParam'))
var _PLAY_SetTranslateString = (Module['_PLAY_SetTranslateString'] =
  createExportWrapper('PLAY_SetTranslateString'))
var _PLAY_SetSeamlessSwitch = (Module['_PLAY_SetSeamlessSwitch'] =
  createExportWrapper('PLAY_SetSeamlessSwitch'))
var _PLAY_SetPanoVRMode = (Module['_PLAY_SetPanoVRMode'] =
  createExportWrapper('PLAY_SetPanoVRMode'))
var _PLAY_GetVRCoord2DTrans = (Module['_PLAY_GetVRCoord2DTrans'] =
  createExportWrapper('PLAY_GetVRCoord2DTrans'))
var _PLAY_SetAudioPlaybackMode = (Module['_PLAY_SetAudioPlaybackMode'] =
  createExportWrapper('PLAY_SetAudioPlaybackMode'))
var _PLAY_GetVRCoord3DTrans = (Module['_PLAY_GetVRCoord3DTrans'] =
  createExportWrapper('PLAY_GetVRCoord3DTrans'))
var _PLAY_Get3DCoordScreenTransWorld = (Module[
  '_PLAY_Get3DCoordScreenTransWorld'
] = createExportWrapper('PLAY_Get3DCoordScreenTransWorld'))
var _PLAY_SetClosestPointThreshold = (Module['_PLAY_SetClosestPointThreshold'] =
  createExportWrapper('PLAY_SetClosestPointThreshold'))
var _PLAY_GetPointCoord3DTrans = (Module['_PLAY_GetPointCoord3DTrans'] =
  createExportWrapper('PLAY_GetPointCoord3DTrans'))
var _PLAY_SetRotationCenter = (Module['_PLAY_SetRotationCenter'] =
  createExportWrapper('PLAY_SetRotationCenter'))
var _PLAY_GetPlayedLength = (Module['_PLAY_GetPlayedLength'] =
  createExportWrapper('PLAY_GetPlayedLength'))
var _PLAY_DrawProfiledWindow = (Module['_PLAY_DrawProfiledWindow'] =
  createExportWrapper('PLAY_DrawProfiledWindow'))
var _PLAY_EnableAutoTrack = (Module['_PLAY_EnableAutoTrack'] =
  createExportWrapper('PLAY_EnableAutoTrack'))
var _PLAY_RegisterDecodeHook = (Module['_PLAY_RegisterDecodeHook'] =
  createExportWrapper('PLAY_RegisterDecodeHook'))
var ___getTypeName = (Module['___getTypeName'] =
  createExportWrapper('__getTypeName'))
var ___embind_register_native_and_builtin_types = (Module[
  '___embind_register_native_and_builtin_types'
] = createExportWrapper('__embind_register_native_and_builtin_types'))
var _emscripten_get_global_libc = (Module['_emscripten_get_global_libc'] =
  createExportWrapper('emscripten_get_global_libc'))
var ___errno_location = (Module['___errno_location'] =
  createExportWrapper('__errno_location'))
var _malloc = (Module['_malloc'] = createExportWrapper('malloc'))
var _fflush = (Module['_fflush'] = createExportWrapper('fflush'))
var __get_tzname = (Module['__get_tzname'] = createExportWrapper('_get_tzname'))
var __get_daylight = (Module['__get_daylight'] =
  createExportWrapper('_get_daylight'))
var __get_timezone = (Module['__get_timezone'] =
  createExportWrapper('_get_timezone'))
var ___emscripten_pthread_data_constructor = (Module[
  '___emscripten_pthread_data_constructor'
] = createExportWrapper('__emscripten_pthread_data_constructor'))
var _pthread_self = (Module['_pthread_self'] =
  createExportWrapper('pthread_self'))
var ___pthread_tsd_run_dtors = (Module['___pthread_tsd_run_dtors'] =
  createExportWrapper('__pthread_tsd_run_dtors'))
var _emscripten_current_thread_process_queued_calls = (Module[
  '_emscripten_current_thread_process_queued_calls'
] = createExportWrapper('emscripten_current_thread_process_queued_calls'))
var _emscripten_register_main_browser_thread_id = (Module[
  '_emscripten_register_main_browser_thread_id'
] = createExportWrapper('emscripten_register_main_browser_thread_id'))
var _emscripten_main_browser_thread_id = (Module[
  '_emscripten_main_browser_thread_id'
] = createExportWrapper('emscripten_main_browser_thread_id'))
var __emscripten_do_dispatch_to_thread = (Module[
  '__emscripten_do_dispatch_to_thread'
] = createExportWrapper('_emscripten_do_dispatch_to_thread'))
var _emscripten_sync_run_in_main_thread_2 = (Module[
  '_emscripten_sync_run_in_main_thread_2'
] = createExportWrapper('emscripten_sync_run_in_main_thread_2'))
var _emscripten_sync_run_in_main_thread_4 = (Module[
  '_emscripten_sync_run_in_main_thread_4'
] = createExportWrapper('emscripten_sync_run_in_main_thread_4'))
var _emscripten_main_thread_process_queued_calls = (Module[
  '_emscripten_main_thread_process_queued_calls'
] = createExportWrapper('emscripten_main_thread_process_queued_calls'))
var _emscripten_run_in_main_runtime_thread_js = (Module[
  '_emscripten_run_in_main_runtime_thread_js'
] = createExportWrapper('emscripten_run_in_main_runtime_thread_js'))
var __emscripten_call_on_thread = (Module['__emscripten_call_on_thread'] =
  createExportWrapper('_emscripten_call_on_thread'))
var _emscripten_proxy_main = (Module['_emscripten_proxy_main'] =
  createExportWrapper('emscripten_proxy_main'))
var _emscripten_tls_init = (Module['_emscripten_tls_init'] =
  createExportWrapper('emscripten_tls_init'))
var __emscripten_thread_init = (Module['__emscripten_thread_init'] =
  createExportWrapper('_emscripten_thread_init'))
var stackSave = (Module['stackSave'] = createExportWrapper('stackSave'))
var stackRestore = (Module['stackRestore'] =
  createExportWrapper('stackRestore'))
var stackAlloc = (Module['stackAlloc'] = createExportWrapper('stackAlloc'))
var _emscripten_stack_init = (Module['_emscripten_stack_init'] = function () {
  return (_emscripten_stack_init = Module['_emscripten_stack_init'] =
    Module['asm']['emscripten_stack_init']).apply(null, arguments)
})
var _emscripten_stack_set_limits = (Module['_emscripten_stack_set_limits'] =
  function () {
    return (_emscripten_stack_set_limits = Module[
      '_emscripten_stack_set_limits'
    ] =
      Module['asm']['emscripten_stack_set_limits']).apply(null, arguments)
  })
var _emscripten_stack_get_free = (Module['_emscripten_stack_get_free'] =
  function () {
    return (_emscripten_stack_get_free = Module['_emscripten_stack_get_free'] =
      Module['asm']['emscripten_stack_get_free']).apply(null, arguments)
  })
var _emscripten_stack_get_end = (Module['_emscripten_stack_get_end'] =
  function () {
    return (_emscripten_stack_get_end = Module['_emscripten_stack_get_end'] =
      Module['asm']['emscripten_stack_get_end']).apply(null, arguments)
  })
var _free = (Module['_free'] = createExportWrapper('free'))
var _memset = (Module['_memset'] = createExportWrapper('memset'))
var _memalign = (Module['_memalign'] = createExportWrapper('memalign'))
var dynCall_jiji = (Module['dynCall_jiji'] =
  createExportWrapper('dynCall_jiji'))
var dynCall_iiiiij = (Module['dynCall_iiiiij'] =
  createExportWrapper('dynCall_iiiiij'))
var dynCall_iiiiijj = (Module['dynCall_iiiiijj'] =
  createExportWrapper('dynCall_iiiiijj'))
var dynCall_iiiiiijj = (Module['dynCall_iiiiiijj'] =
  createExportWrapper('dynCall_iiiiiijj'))
var dynCall_viijii = (Module['dynCall_viijii'] =
  createExportWrapper('dynCall_viijii'))
var dynCall_viji = (Module['dynCall_viji'] =
  createExportWrapper('dynCall_viji'))
var dynCall_ji = (Module['dynCall_ji'] = createExportWrapper('dynCall_ji'))
var dynCall_iiji = (Module['dynCall_iiji'] =
  createExportWrapper('dynCall_iiji'))
var dynCall_iiij = (Module['dynCall_iiij'] =
  createExportWrapper('dynCall_iiij'))
var dynCall_jiij = (Module['dynCall_jiij'] =
  createExportWrapper('dynCall_jiij'))
var dynCall_iiiijj = (Module['dynCall_iiiijj'] =
  createExportWrapper('dynCall_iiiijj'))
var dynCall_jii = (Module['dynCall_jii'] = createExportWrapper('dynCall_jii'))
var dynCall_viiij = (Module['dynCall_viiij'] =
  createExportWrapper('dynCall_viiij'))
var dynCall_iiiij = (Module['dynCall_iiiij'] =
  createExportWrapper('dynCall_iiiij'))
var __emscripten_allow_main_runtime_queued_calls = (Module[
  '__emscripten_allow_main_runtime_queued_calls'
] = 330144)
var __emscripten_main_thread_futex = (Module[
  '__emscripten_main_thread_futex'
] = 514768)
if (!Object.getOwnPropertyDescriptor(Module, 'intArrayFromString'))
  Module['intArrayFromString'] = function () {
    abort(
      "'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'intArrayToString'))
  Module['intArrayToString'] = function () {
    abort(
      "'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ccall'))
  Module['ccall'] = function () {
    abort(
      "'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'cwrap'))
  Module['cwrap'] = function () {
    abort(
      "'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'setValue'))
  Module['setValue'] = function () {
    abort(
      "'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getValue'))
  Module['getValue'] = function () {
    abort(
      "'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'allocate'))
  Module['allocate'] = function () {
    abort(
      "'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'UTF8ArrayToString'))
  Module['UTF8ArrayToString'] = function () {
    abort(
      "'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'UTF8ToString'))
  Module['UTF8ToString'] = function () {
    abort(
      "'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stringToUTF8Array'))
  Module['stringToUTF8Array'] = function () {
    abort(
      "'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stringToUTF8'))
  Module['stringToUTF8'] = function () {
    abort(
      "'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'lengthBytesUTF8'))
  Module['lengthBytesUTF8'] = function () {
    abort(
      "'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stackTrace'))
  Module['stackTrace'] = function () {
    abort(
      "'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'addOnPreRun'))
  Module['addOnPreRun'] = function () {
    abort(
      "'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'addOnInit'))
  Module['addOnInit'] = function () {
    abort(
      "'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'addOnPreMain'))
  Module['addOnPreMain'] = function () {
    abort(
      "'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'addOnExit'))
  Module['addOnExit'] = function () {
    abort(
      "'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'addOnPostRun'))
  Module['addOnPostRun'] = function () {
    abort(
      "'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'writeStringToMemory'))
  Module['writeStringToMemory'] = function () {
    abort(
      "'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'writeArrayToMemory'))
  Module['writeArrayToMemory'] = function () {
    abort(
      "'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'writeAsciiToMemory'))
  Module['writeAsciiToMemory'] = function () {
    abort(
      "'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'addRunDependency'))
  Module['addRunDependency'] = function () {
    abort(
      "'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'removeRunDependency'))
  Module['removeRunDependency'] = function () {
    abort(
      "'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'FS_createFolder'))
  Module['FS_createFolder'] = function () {
    abort(
      "'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'FS_createPath'))
  Module['FS_createPath'] = function () {
    abort(
      "'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'FS_createDataFile'))
  Module['FS_createDataFile'] = function () {
    abort(
      "'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'FS_createPreloadedFile'))
  Module['FS_createPreloadedFile'] = function () {
    abort(
      "'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'FS_createLazyFile'))
  Module['FS_createLazyFile'] = function () {
    abort(
      "'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'FS_createLink'))
  Module['FS_createLink'] = function () {
    abort(
      "'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'FS_createDevice'))
  Module['FS_createDevice'] = function () {
    abort(
      "'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'FS_unlink'))
  Module['FS_unlink'] = function () {
    abort(
      "'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getLEB'))
  Module['getLEB'] = function () {
    abort(
      "'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getFunctionTables'))
  Module['getFunctionTables'] = function () {
    abort(
      "'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'alignFunctionTables'))
  Module['alignFunctionTables'] = function () {
    abort(
      "'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerFunctions'))
  Module['registerFunctions'] = function () {
    abort(
      "'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'addFunction'))
  Module['addFunction'] = function () {
    abort(
      "'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'removeFunction'))
  Module['removeFunction'] = function () {
    abort(
      "'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getFuncWrapper'))
  Module['getFuncWrapper'] = function () {
    abort(
      "'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'prettyPrint'))
  Module['prettyPrint'] = function () {
    abort(
      "'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'makeBigInt'))
  Module['makeBigInt'] = function () {
    abort(
      "'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'dynCall'))
  Module['dynCall'] = function () {
    abort(
      "'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getCompilerSetting'))
  Module['getCompilerSetting'] = function () {
    abort(
      "'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'print'))
  Module['print'] = function () {
    abort(
      "'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'printErr'))
  Module['printErr'] = function () {
    abort(
      "'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getTempRet0'))
  Module['getTempRet0'] = function () {
    abort(
      "'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'setTempRet0'))
  Module['setTempRet0'] = function () {
    abort(
      "'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'callMain'))
  Module['callMain'] = function () {
    abort(
      "'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'abort'))
  Module['abort'] = function () {
    abort(
      "'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stringToNewUTF8'))
  Module['stringToNewUTF8'] = function () {
    abort(
      "'stringToNewUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'setFileTime'))
  Module['setFileTime'] = function () {
    abort(
      "'setFileTime' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emscripten_realloc_buffer'))
  Module['emscripten_realloc_buffer'] = function () {
    abort(
      "'emscripten_realloc_buffer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ENV'))
  Module['ENV'] = function () {
    abort(
      "'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ERRNO_CODES'))
  Module['ERRNO_CODES'] = function () {
    abort(
      "'ERRNO_CODES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ERRNO_MESSAGES'))
  Module['ERRNO_MESSAGES'] = function () {
    abort(
      "'ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'setErrNo'))
  Module['setErrNo'] = function () {
    abort(
      "'setErrNo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'inetPton4'))
  Module['inetPton4'] = function () {
    abort(
      "'inetPton4' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'inetNtop4'))
  Module['inetNtop4'] = function () {
    abort(
      "'inetNtop4' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'inetPton6'))
  Module['inetPton6'] = function () {
    abort(
      "'inetPton6' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'inetNtop6'))
  Module['inetNtop6'] = function () {
    abort(
      "'inetNtop6' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'readSockaddr'))
  Module['readSockaddr'] = function () {
    abort(
      "'readSockaddr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'writeSockaddr'))
  Module['writeSockaddr'] = function () {
    abort(
      "'writeSockaddr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'DNS'))
  Module['DNS'] = function () {
    abort(
      "'DNS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getHostByName'))
  Module['getHostByName'] = function () {
    abort(
      "'getHostByName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'GAI_ERRNO_MESSAGES'))
  Module['GAI_ERRNO_MESSAGES'] = function () {
    abort(
      "'GAI_ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'Protocols'))
  Module['Protocols'] = function () {
    abort(
      "'Protocols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'Sockets'))
  Module['Sockets'] = function () {
    abort(
      "'Sockets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getRandomDevice'))
  Module['getRandomDevice'] = function () {
    abort(
      "'getRandomDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'traverseStack'))
  Module['traverseStack'] = function () {
    abort(
      "'traverseStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'UNWIND_CACHE'))
  Module['UNWIND_CACHE'] = function () {
    abort(
      "'UNWIND_CACHE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'withBuiltinMalloc'))
  Module['withBuiltinMalloc'] = function () {
    abort(
      "'withBuiltinMalloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'readAsmConstArgsArray'))
  Module['readAsmConstArgsArray'] = function () {
    abort(
      "'readAsmConstArgsArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'readAsmConstArgs'))
  Module['readAsmConstArgs'] = function () {
    abort(
      "'readAsmConstArgs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'mainThreadEM_ASM'))
  Module['mainThreadEM_ASM'] = function () {
    abort(
      "'mainThreadEM_ASM' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'jstoi_q'))
  Module['jstoi_q'] = function () {
    abort(
      "'jstoi_q' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'jstoi_s'))
  Module['jstoi_s'] = function () {
    abort(
      "'jstoi_s' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getExecutableName'))
  Module['getExecutableName'] = function () {
    abort(
      "'getExecutableName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'listenOnce'))
  Module['listenOnce'] = function () {
    abort(
      "'listenOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'autoResumeAudioContext'))
  Module['autoResumeAudioContext'] = function () {
    abort(
      "'autoResumeAudioContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'dynCallLegacy'))
  Module['dynCallLegacy'] = function () {
    abort(
      "'dynCallLegacy' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getDynCaller'))
  Module['getDynCaller'] = function () {
    abort(
      "'getDynCaller' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'dynCall'))
  Module['dynCall'] = function () {
    abort(
      "'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'callRuntimeCallbacks'))
  Module['callRuntimeCallbacks'] = function () {
    abort(
      "'callRuntimeCallbacks' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'reallyNegative'))
  Module['reallyNegative'] = function () {
    abort(
      "'reallyNegative' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'unSign'))
  Module['unSign'] = function () {
    abort(
      "'unSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'reSign'))
  Module['reSign'] = function () {
    abort(
      "'reSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'formatString'))
  Module['formatString'] = function () {
    abort(
      "'formatString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'PATH'))
  Module['PATH'] = function () {
    abort(
      "'PATH' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'PATH_FS'))
  Module['PATH_FS'] = function () {
    abort(
      "'PATH_FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'SYSCALLS'))
  Module['SYSCALLS'] = function () {
    abort(
      "'SYSCALLS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'syscallMmap2'))
  Module['syscallMmap2'] = function () {
    abort(
      "'syscallMmap2' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'syscallMunmap'))
  Module['syscallMunmap'] = function () {
    abort(
      "'syscallMunmap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getSocketFromFD'))
  Module['getSocketFromFD'] = function () {
    abort(
      "'getSocketFromFD' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getSocketAddress'))
  Module['getSocketAddress'] = function () {
    abort(
      "'getSocketAddress' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'JSEvents'))
  Module['JSEvents'] = function () {
    abort(
      "'JSEvents' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerKeyEventCallback'))
  Module['registerKeyEventCallback'] = function () {
    abort(
      "'registerKeyEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'specialHTMLTargets'))
  Module['specialHTMLTargets'] = function () {
    abort(
      "'specialHTMLTargets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'maybeCStringToJsString'))
  Module['maybeCStringToJsString'] = function () {
    abort(
      "'maybeCStringToJsString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'findEventTarget'))
  Module['findEventTarget'] = function () {
    abort(
      "'findEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'findCanvasEventTarget'))
  Module['findCanvasEventTarget'] = function () {
    abort(
      "'findCanvasEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getBoundingClientRect'))
  Module['getBoundingClientRect'] = function () {
    abort(
      "'getBoundingClientRect' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'fillMouseEventData'))
  Module['fillMouseEventData'] = function () {
    abort(
      "'fillMouseEventData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerMouseEventCallback'))
  Module['registerMouseEventCallback'] = function () {
    abort(
      "'registerMouseEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerWheelEventCallback'))
  Module['registerWheelEventCallback'] = function () {
    abort(
      "'registerWheelEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerUiEventCallback'))
  Module['registerUiEventCallback'] = function () {
    abort(
      "'registerUiEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerFocusEventCallback'))
  Module['registerFocusEventCallback'] = function () {
    abort(
      "'registerFocusEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'fillDeviceOrientationEventData'))
  Module['fillDeviceOrientationEventData'] = function () {
    abort(
      "'fillDeviceOrientationEventData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(
    Module,
    'registerDeviceOrientationEventCallback'
  )
)
  Module['registerDeviceOrientationEventCallback'] = function () {
    abort(
      "'registerDeviceOrientationEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'fillDeviceMotionEventData'))
  Module['fillDeviceMotionEventData'] = function () {
    abort(
      "'fillDeviceMotionEventData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(Module, 'registerDeviceMotionEventCallback')
)
  Module['registerDeviceMotionEventCallback'] = function () {
    abort(
      "'registerDeviceMotionEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'screenOrientation'))
  Module['screenOrientation'] = function () {
    abort(
      "'screenOrientation' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'fillOrientationChangeEventData'))
  Module['fillOrientationChangeEventData'] = function () {
    abort(
      "'fillOrientationChangeEventData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(
    Module,
    'registerOrientationChangeEventCallback'
  )
)
  Module['registerOrientationChangeEventCallback'] = function () {
    abort(
      "'registerOrientationChangeEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'fillFullscreenChangeEventData'))
  Module['fillFullscreenChangeEventData'] = function () {
    abort(
      "'fillFullscreenChangeEventData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(
    Module,
    'registerFullscreenChangeEventCallback'
  )
)
  Module['registerFullscreenChangeEventCallback'] = function () {
    abort(
      "'registerFullscreenChangeEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerRestoreOldStyle'))
  Module['registerRestoreOldStyle'] = function () {
    abort(
      "'registerRestoreOldStyle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(Module, 'hideEverythingExceptGivenElement')
)
  Module['hideEverythingExceptGivenElement'] = function () {
    abort(
      "'hideEverythingExceptGivenElement' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'restoreHiddenElements'))
  Module['restoreHiddenElements'] = function () {
    abort(
      "'restoreHiddenElements' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'setLetterbox'))
  Module['setLetterbox'] = function () {
    abort(
      "'setLetterbox' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'currentFullscreenStrategy'))
  Module['currentFullscreenStrategy'] = function () {
    abort(
      "'currentFullscreenStrategy' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'restoreOldWindowedStyle'))
  Module['restoreOldWindowedStyle'] = function () {
    abort(
      "'restoreOldWindowedStyle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(
    Module,
    'softFullscreenResizeWebGLRenderTarget'
  )
)
  Module['softFullscreenResizeWebGLRenderTarget'] = function () {
    abort(
      "'softFullscreenResizeWebGLRenderTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'doRequestFullscreen'))
  Module['doRequestFullscreen'] = function () {
    abort(
      "'doRequestFullscreen' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'fillPointerlockChangeEventData'))
  Module['fillPointerlockChangeEventData'] = function () {
    abort(
      "'fillPointerlockChangeEventData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(
    Module,
    'registerPointerlockChangeEventCallback'
  )
)
  Module['registerPointerlockChangeEventCallback'] = function () {
    abort(
      "'registerPointerlockChangeEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(
    Module,
    'registerPointerlockErrorEventCallback'
  )
)
  Module['registerPointerlockErrorEventCallback'] = function () {
    abort(
      "'registerPointerlockErrorEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'requestPointerLock'))
  Module['requestPointerLock'] = function () {
    abort(
      "'requestPointerLock' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'fillVisibilityChangeEventData'))
  Module['fillVisibilityChangeEventData'] = function () {
    abort(
      "'fillVisibilityChangeEventData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(
    Module,
    'registerVisibilityChangeEventCallback'
  )
)
  Module['registerVisibilityChangeEventCallback'] = function () {
    abort(
      "'registerVisibilityChangeEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerTouchEventCallback'))
  Module['registerTouchEventCallback'] = function () {
    abort(
      "'registerTouchEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'fillGamepadEventData'))
  Module['fillGamepadEventData'] = function () {
    abort(
      "'fillGamepadEventData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerGamepadEventCallback'))
  Module['registerGamepadEventCallback'] = function () {
    abort(
      "'registerGamepadEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(Module, 'registerBeforeUnloadEventCallback')
)
  Module['registerBeforeUnloadEventCallback'] = function () {
    abort(
      "'registerBeforeUnloadEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'fillBatteryEventData'))
  Module['fillBatteryEventData'] = function () {
    abort(
      "'fillBatteryEventData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'battery'))
  Module['battery'] = function () {
    abort(
      "'battery' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerBatteryEventCallback'))
  Module['registerBatteryEventCallback'] = function () {
    abort(
      "'registerBatteryEventCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'setCanvasElementSize'))
  Module['setCanvasElementSize'] = function () {
    abort(
      "'setCanvasElementSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getCanvasElementSize'))
  Module['getCanvasElementSize'] = function () {
    abort(
      "'getCanvasElementSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'polyfillSetImmediate'))
  Module['polyfillSetImmediate'] = function () {
    abort(
      "'polyfillSetImmediate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'demangle'))
  Module['demangle'] = function () {
    abort(
      "'demangle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'demangleAll'))
  Module['demangleAll'] = function () {
    abort(
      "'demangleAll' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'jsStackTrace'))
  Module['jsStackTrace'] = function () {
    abort(
      "'jsStackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stackTrace'))
  Module['stackTrace'] = function () {
    abort(
      "'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getEnvStrings'))
  Module['getEnvStrings'] = function () {
    abort(
      "'getEnvStrings' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'checkWasiClock'))
  Module['checkWasiClock'] = function () {
    abort(
      "'checkWasiClock' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'writeI53ToI64'))
  Module['writeI53ToI64'] = function () {
    abort(
      "'writeI53ToI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'writeI53ToI64Clamped'))
  Module['writeI53ToI64Clamped'] = function () {
    abort(
      "'writeI53ToI64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'writeI53ToI64Signaling'))
  Module['writeI53ToI64Signaling'] = function () {
    abort(
      "'writeI53ToI64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'writeI53ToU64Clamped'))
  Module['writeI53ToU64Clamped'] = function () {
    abort(
      "'writeI53ToU64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'writeI53ToU64Signaling'))
  Module['writeI53ToU64Signaling'] = function () {
    abort(
      "'writeI53ToU64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'readI53FromI64'))
  Module['readI53FromI64'] = function () {
    abort(
      "'readI53FromI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'readI53FromU64'))
  Module['readI53FromU64'] = function () {
    abort(
      "'readI53FromU64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'convertI32PairToI53'))
  Module['convertI32PairToI53'] = function () {
    abort(
      "'convertI32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'convertU32PairToI53'))
  Module['convertU32PairToI53'] = function () {
    abort(
      "'convertU32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'uncaughtExceptionCount'))
  Module['uncaughtExceptionCount'] = function () {
    abort(
      "'uncaughtExceptionCount' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'exceptionLast'))
  Module['exceptionLast'] = function () {
    abort(
      "'exceptionLast' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'exceptionCaught'))
  Module['exceptionCaught'] = function () {
    abort(
      "'exceptionCaught' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ExceptionInfoAttrs'))
  Module['ExceptionInfoAttrs'] = function () {
    abort(
      "'ExceptionInfoAttrs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ExceptionInfo'))
  Module['ExceptionInfo'] = function () {
    abort(
      "'ExceptionInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'CatchInfo'))
  Module['CatchInfo'] = function () {
    abort(
      "'CatchInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'exception_addRef'))
  Module['exception_addRef'] = function () {
    abort(
      "'exception_addRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'exception_decRef'))
  Module['exception_decRef'] = function () {
    abort(
      "'exception_decRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'Browser'))
  Module['Browser'] = function () {
    abort(
      "'Browser' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'funcWrappers'))
  Module['funcWrappers'] = function () {
    abort(
      "'funcWrappers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getFuncWrapper'))
  Module['getFuncWrapper'] = function () {
    abort(
      "'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'setMainLoop'))
  Module['setMainLoop'] = function () {
    abort(
      "'setMainLoop' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'tempFixedLengthArray'))
  Module['tempFixedLengthArray'] = function () {
    abort(
      "'tempFixedLengthArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'miniTempWebGLFloatBuffers'))
  Module['miniTempWebGLFloatBuffers'] = function () {
    abort(
      "'miniTempWebGLFloatBuffers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'heapObjectForWebGLType'))
  Module['heapObjectForWebGLType'] = function () {
    abort(
      "'heapObjectForWebGLType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'heapAccessShiftForWebGLHeap'))
  Module['heapAccessShiftForWebGLHeap'] = function () {
    abort(
      "'heapAccessShiftForWebGLHeap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'GL'))
  Module['GL'] = function () {
    abort(
      "'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emscriptenWebGLGet'))
  Module['emscriptenWebGLGet'] = function () {
    abort(
      "'emscriptenWebGLGet' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'computeUnpackAlignedImageSize'))
  Module['computeUnpackAlignedImageSize'] = function () {
    abort(
      "'computeUnpackAlignedImageSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emscriptenWebGLGetTexPixelData'))
  Module['emscriptenWebGLGetTexPixelData'] = function () {
    abort(
      "'emscriptenWebGLGetTexPixelData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emscriptenWebGLGetUniform'))
  Module['emscriptenWebGLGetUniform'] = function () {
    abort(
      "'emscriptenWebGLGetUniform' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emscriptenWebGLGetVertexAttrib'))
  Module['emscriptenWebGLGetVertexAttrib'] = function () {
    abort(
      "'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'writeGLArray'))
  Module['writeGLArray'] = function () {
    abort(
      "'writeGLArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'FS'))
  Module['FS'] = function () {
    abort(
      "'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'mmapAlloc'))
  Module['mmapAlloc'] = function () {
    abort(
      "'mmapAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'MEMFS'))
  Module['MEMFS'] = function () {
    abort(
      "'MEMFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'TTY'))
  Module['TTY'] = function () {
    abort(
      "'TTY' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'PIPEFS'))
  Module['PIPEFS'] = function () {
    abort(
      "'PIPEFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'SOCKFS'))
  Module['SOCKFS'] = function () {
    abort(
      "'SOCKFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, '_setNetworkCallback'))
  Module['_setNetworkCallback'] = function () {
    abort(
      "'_setNetworkCallback' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'AL'))
  Module['AL'] = function () {
    abort(
      "'AL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'SDL_unicode'))
  Module['SDL_unicode'] = function () {
    abort(
      "'SDL_unicode' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'SDL_ttfContext'))
  Module['SDL_ttfContext'] = function () {
    abort(
      "'SDL_ttfContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'SDL_audio'))
  Module['SDL_audio'] = function () {
    abort(
      "'SDL_audio' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'SDL'))
  Module['SDL'] = function () {
    abort(
      "'SDL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'SDL_gfx'))
  Module['SDL_gfx'] = function () {
    abort(
      "'SDL_gfx' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'GLUT'))
  Module['GLUT'] = function () {
    abort(
      "'GLUT' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'EGL'))
  Module['EGL'] = function () {
    abort(
      "'EGL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'GLFW_Window'))
  Module['GLFW_Window'] = function () {
    abort(
      "'GLFW_Window' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'GLFW'))
  Module['GLFW'] = function () {
    abort(
      "'GLFW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'GLEW'))
  Module['GLEW'] = function () {
    abort(
      "'GLEW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'IDBStore'))
  Module['IDBStore'] = function () {
    abort(
      "'IDBStore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'runAndAbortIfError'))
  Module['runAndAbortIfError'] = function () {
    abort(
      "'runAndAbortIfError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emval_handle_array'))
  Module['emval_handle_array'] = function () {
    abort(
      "'emval_handle_array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emval_free_list'))
  Module['emval_free_list'] = function () {
    abort(
      "'emval_free_list' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emval_symbols'))
  Module['emval_symbols'] = function () {
    abort(
      "'emval_symbols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'init_emval'))
  Module['init_emval'] = function () {
    abort(
      "'init_emval' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'count_emval_handles'))
  Module['count_emval_handles'] = function () {
    abort(
      "'count_emval_handles' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'get_first_emval'))
  Module['get_first_emval'] = function () {
    abort(
      "'get_first_emval' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getStringOrSymbol'))
  Module['getStringOrSymbol'] = function () {
    abort(
      "'getStringOrSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'requireHandle'))
  Module['requireHandle'] = function () {
    abort(
      "'requireHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emval_newers'))
  Module['emval_newers'] = function () {
    abort(
      "'emval_newers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'craftEmvalAllocator'))
  Module['craftEmvalAllocator'] = function () {
    abort(
      "'craftEmvalAllocator' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emval_get_global'))
  Module['emval_get_global'] = function () {
    abort(
      "'emval_get_global' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'emval_methodCallers'))
  Module['emval_methodCallers'] = function () {
    abort(
      "'emval_methodCallers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'InternalError'))
  Module['InternalError'] = function () {
    abort(
      "'InternalError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'BindingError'))
  Module['BindingError'] = function () {
    abort(
      "'BindingError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'UnboundTypeError'))
  Module['UnboundTypeError'] = function () {
    abort(
      "'UnboundTypeError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'PureVirtualError'))
  Module['PureVirtualError'] = function () {
    abort(
      "'PureVirtualError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'init_embind'))
  Module['init_embind'] = function () {
    abort(
      "'init_embind' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'throwInternalError'))
  Module['throwInternalError'] = function () {
    abort(
      "'throwInternalError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'throwBindingError'))
  Module['throwBindingError'] = function () {
    abort(
      "'throwBindingError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'throwUnboundTypeError'))
  Module['throwUnboundTypeError'] = function () {
    abort(
      "'throwUnboundTypeError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ensureOverloadTable'))
  Module['ensureOverloadTable'] = function () {
    abort(
      "'ensureOverloadTable' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'exposePublicSymbol'))
  Module['exposePublicSymbol'] = function () {
    abort(
      "'exposePublicSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'replacePublicSymbol'))
  Module['replacePublicSymbol'] = function () {
    abort(
      "'replacePublicSymbol' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'extendError'))
  Module['extendError'] = function () {
    abort(
      "'extendError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'createNamedFunction'))
  Module['createNamedFunction'] = function () {
    abort(
      "'createNamedFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registeredInstances'))
  Module['registeredInstances'] = function () {
    abort(
      "'registeredInstances' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getBasestPointer'))
  Module['getBasestPointer'] = function () {
    abort(
      "'getBasestPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerInheritedInstance'))
  Module['registerInheritedInstance'] = function () {
    abort(
      "'registerInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'unregisterInheritedInstance'))
  Module['unregisterInheritedInstance'] = function () {
    abort(
      "'unregisterInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getInheritedInstance'))
  Module['getInheritedInstance'] = function () {
    abort(
      "'getInheritedInstance' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getInheritedInstanceCount'))
  Module['getInheritedInstanceCount'] = function () {
    abort(
      "'getInheritedInstanceCount' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getLiveInheritedInstances'))
  Module['getLiveInheritedInstances'] = function () {
    abort(
      "'getLiveInheritedInstances' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registeredTypes'))
  Module['registeredTypes'] = function () {
    abort(
      "'registeredTypes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'awaitingDependencies'))
  Module['awaitingDependencies'] = function () {
    abort(
      "'awaitingDependencies' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'typeDependencies'))
  Module['typeDependencies'] = function () {
    abort(
      "'typeDependencies' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registeredPointers'))
  Module['registeredPointers'] = function () {
    abort(
      "'registeredPointers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'registerType'))
  Module['registerType'] = function () {
    abort(
      "'registerType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'whenDependentTypesAreResolved'))
  Module['whenDependentTypesAreResolved'] = function () {
    abort(
      "'whenDependentTypesAreResolved' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'embind_charCodes'))
  Module['embind_charCodes'] = function () {
    abort(
      "'embind_charCodes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'embind_init_charCodes'))
  Module['embind_init_charCodes'] = function () {
    abort(
      "'embind_init_charCodes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'readLatin1String'))
  Module['readLatin1String'] = function () {
    abort(
      "'readLatin1String' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getTypeName'))
  Module['getTypeName'] = function () {
    abort(
      "'getTypeName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'heap32VectorToArray'))
  Module['heap32VectorToArray'] = function () {
    abort(
      "'heap32VectorToArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'requireRegisteredType'))
  Module['requireRegisteredType'] = function () {
    abort(
      "'requireRegisteredType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getShiftFromSize'))
  Module['getShiftFromSize'] = function () {
    abort(
      "'getShiftFromSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'integerReadValueFromPointer'))
  Module['integerReadValueFromPointer'] = function () {
    abort(
      "'integerReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'enumReadValueFromPointer'))
  Module['enumReadValueFromPointer'] = function () {
    abort(
      "'enumReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'floatReadValueFromPointer'))
  Module['floatReadValueFromPointer'] = function () {
    abort(
      "'floatReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'simpleReadValueFromPointer'))
  Module['simpleReadValueFromPointer'] = function () {
    abort(
      "'simpleReadValueFromPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'runDestructors'))
  Module['runDestructors'] = function () {
    abort(
      "'runDestructors' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'new_'))
  Module['new_'] = function () {
    abort(
      "'new_' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'craftInvokerFunction'))
  Module['craftInvokerFunction'] = function () {
    abort(
      "'craftInvokerFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'embind__requireFunction'))
  Module['embind__requireFunction'] = function () {
    abort(
      "'embind__requireFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'tupleRegistrations'))
  Module['tupleRegistrations'] = function () {
    abort(
      "'tupleRegistrations' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'structRegistrations'))
  Module['structRegistrations'] = function () {
    abort(
      "'structRegistrations' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'genericPointerToWireType'))
  Module['genericPointerToWireType'] = function () {
    abort(
      "'genericPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(
    Module,
    'constNoSmartPtrRawPointerToWireType'
  )
)
  Module['constNoSmartPtrRawPointerToWireType'] = function () {
    abort(
      "'constNoSmartPtrRawPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (
  !Object.getOwnPropertyDescriptor(
    Module,
    'nonConstNoSmartPtrRawPointerToWireType'
  )
)
  Module['nonConstNoSmartPtrRawPointerToWireType'] = function () {
    abort(
      "'nonConstNoSmartPtrRawPointerToWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'init_RegisteredPointer'))
  Module['init_RegisteredPointer'] = function () {
    abort(
      "'init_RegisteredPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'RegisteredPointer'))
  Module['RegisteredPointer'] = function () {
    abort(
      "'RegisteredPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'RegisteredPointer_getPointee'))
  Module['RegisteredPointer_getPointee'] = function () {
    abort(
      "'RegisteredPointer_getPointee' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'RegisteredPointer_destructor'))
  Module['RegisteredPointer_destructor'] = function () {
    abort(
      "'RegisteredPointer_destructor' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'RegisteredPointer_deleteObject'))
  Module['RegisteredPointer_deleteObject'] = function () {
    abort(
      "'RegisteredPointer_deleteObject' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'RegisteredPointer_fromWireType'))
  Module['RegisteredPointer_fromWireType'] = function () {
    abort(
      "'RegisteredPointer_fromWireType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'runDestructor'))
  Module['runDestructor'] = function () {
    abort(
      "'runDestructor' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'releaseClassHandle'))
  Module['releaseClassHandle'] = function () {
    abort(
      "'releaseClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'finalizationGroup'))
  Module['finalizationGroup'] = function () {
    abort(
      "'finalizationGroup' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'detachFinalizer_deps'))
  Module['detachFinalizer_deps'] = function () {
    abort(
      "'detachFinalizer_deps' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'detachFinalizer'))
  Module['detachFinalizer'] = function () {
    abort(
      "'detachFinalizer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'attachFinalizer'))
  Module['attachFinalizer'] = function () {
    abort(
      "'attachFinalizer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'makeClassHandle'))
  Module['makeClassHandle'] = function () {
    abort(
      "'makeClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'init_ClassHandle'))
  Module['init_ClassHandle'] = function () {
    abort(
      "'init_ClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ClassHandle'))
  Module['ClassHandle'] = function () {
    abort(
      "'ClassHandle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ClassHandle_isAliasOf'))
  Module['ClassHandle_isAliasOf'] = function () {
    abort(
      "'ClassHandle_isAliasOf' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'throwInstanceAlreadyDeleted'))
  Module['throwInstanceAlreadyDeleted'] = function () {
    abort(
      "'throwInstanceAlreadyDeleted' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ClassHandle_clone'))
  Module['ClassHandle_clone'] = function () {
    abort(
      "'ClassHandle_clone' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ClassHandle_delete'))
  Module['ClassHandle_delete'] = function () {
    abort(
      "'ClassHandle_delete' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'deletionQueue'))
  Module['deletionQueue'] = function () {
    abort(
      "'deletionQueue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ClassHandle_isDeleted'))
  Module['ClassHandle_isDeleted'] = function () {
    abort(
      "'ClassHandle_isDeleted' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'ClassHandle_deleteLater'))
  Module['ClassHandle_deleteLater'] = function () {
    abort(
      "'ClassHandle_deleteLater' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'flushPendingDeletes'))
  Module['flushPendingDeletes'] = function () {
    abort(
      "'flushPendingDeletes' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'delayFunction'))
  Module['delayFunction'] = function () {
    abort(
      "'delayFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'setDelayFunction'))
  Module['setDelayFunction'] = function () {
    abort(
      "'setDelayFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'RegisteredClass'))
  Module['RegisteredClass'] = function () {
    abort(
      "'RegisteredClass' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'shallowCopyInternalPointer'))
  Module['shallowCopyInternalPointer'] = function () {
    abort(
      "'shallowCopyInternalPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'downcastPointer'))
  Module['downcastPointer'] = function () {
    abort(
      "'downcastPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'upcastPointer'))
  Module['upcastPointer'] = function () {
    abort(
      "'upcastPointer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'validateThis'))
  Module['validateThis'] = function () {
    abort(
      "'validateThis' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'char_0'))
  Module['char_0'] = function () {
    abort(
      "'char_0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'char_9'))
  Module['char_9'] = function () {
    abort(
      "'char_9' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'makeLegalFunctionName'))
  Module['makeLegalFunctionName'] = function () {
    abort(
      "'makeLegalFunctionName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
Module['PThread'] = PThread
if (!Object.getOwnPropertyDescriptor(Module, 'killThread'))
  Module['killThread'] = function () {
    abort(
      "'killThread' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'cleanupThread'))
  Module['cleanupThread'] = function () {
    abort(
      "'cleanupThread' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'cancelThread'))
  Module['cancelThread'] = function () {
    abort(
      "'cancelThread' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'spawnThread'))
  Module['spawnThread'] = function () {
    abort(
      "'spawnThread' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'establishStackSpace'))
  Module['establishStackSpace'] = function () {
    abort(
      "'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'getNoExitRuntime'))
  Module['getNoExitRuntime'] = function () {
    abort(
      "'getNoExitRuntime' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'invokeEntryPoint'))
  Module['invokeEntryPoint'] = function () {
    abort(
      "'invokeEntryPoint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'warnOnce'))
  Module['warnOnce'] = function () {
    abort(
      "'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stackSave'))
  Module['stackSave'] = function () {
    abort(
      "'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stackRestore'))
  Module['stackRestore'] = function () {
    abort(
      "'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stackAlloc'))
  Module['stackAlloc'] = function () {
    abort(
      "'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'AsciiToString'))
  Module['AsciiToString'] = function () {
    abort(
      "'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stringToAscii'))
  Module['stringToAscii'] = function () {
    abort(
      "'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'UTF16ToString'))
  Module['UTF16ToString'] = function () {
    abort(
      "'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stringToUTF16'))
  Module['stringToUTF16'] = function () {
    abort(
      "'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'lengthBytesUTF16'))
  Module['lengthBytesUTF16'] = function () {
    abort(
      "'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'UTF32ToString'))
  Module['UTF32ToString'] = function () {
    abort(
      "'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'stringToUTF32'))
  Module['stringToUTF32'] = function () {
    abort(
      "'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'lengthBytesUTF32'))
  Module['lengthBytesUTF32'] = function () {
    abort(
      "'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'allocateUTF8'))
  Module['allocateUTF8'] = function () {
    abort(
      "'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
if (!Object.getOwnPropertyDescriptor(Module, 'allocateUTF8OnStack'))
  Module['allocateUTF8OnStack'] = function () {
    abort(
      "'allocateUTF8OnStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
    )
  }
Module['writeStackCookie'] = writeStackCookie
Module['checkStackCookie'] = checkStackCookie
Module['PThread'] = PThread
Module['wasmMemory'] = wasmMemory
Module['ExitStatus'] = ExitStatus
if (!Object.getOwnPropertyDescriptor(Module, 'ALLOC_NORMAL'))
  Object.defineProperty(Module, 'ALLOC_NORMAL', {
    configurable: true,
    get: function () {
      abort(
        "'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
      )
    }
  })
if (!Object.getOwnPropertyDescriptor(Module, 'ALLOC_STACK'))
  Object.defineProperty(Module, 'ALLOC_STACK', {
    configurable: true,
    get: function () {
      abort(
        "'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"
      )
    }
  })
var calledRun
function ExitStatus(status) {
  this.name = 'ExitStatus'
  this.message = 'Program terminated with exit(' + status + ')'
  this.status = status
}
dependenciesFulfilled = function runCaller() {
  if (!calledRun) run()
  if (!calledRun) dependenciesFulfilled = runCaller
}
function stackCheckInit() {
  _emscripten_stack_init()
  writeStackCookie()
}
function run(args) {
  args = args || arguments_
  if (runDependencies > 0) {
    return
  }
  stackCheckInit()
  if (ENVIRONMENT_IS_PTHREAD) {
    initRuntime()
    postMessage({ cmd: 'loaded' })
    return
  }
  preRun()
  if (runDependencies > 0) {
    return
  }
  function doRun() {
    if (calledRun) return
    calledRun = true
    Module['calledRun'] = true
    if (ABORT) return
    initRuntime()
    preMain()
    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']()
    assert(
      !Module['_main'],
      'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'
    )
    postRun()
  }
  if (Module['setStatus']) {
    Module['setStatus']('Running...')
    setTimeout(function () {
      setTimeout(function () {
        Module['setStatus']('')
      }, 1)
      doRun()
    }, 1)
  } else {
    doRun()
  }
  checkStackCookie()
}
Module['run'] = run
function checkUnflushedContent() {
  var oldOut = out
  var oldErr = err
  var has = false
  out = err = function (x) {
    has = true
  }
  try {
    var flush = Module['_fflush']
    if (flush) flush(0)
    ;['stdout', 'stderr'].forEach(function (name) {
      var info = FS.analyzePath('/dev/' + name)
      if (!info) return
      var stream = info.object
      var rdev = stream.rdev
      var tty = TTY.ttys[rdev]
      if (tty && tty.output && tty.output.length) {
        has = true
      }
    })
  } catch (e) {}
  out = oldOut
  err = oldErr
  if (has) {
    warnOnce(
      'stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.'
    )
  }
}
function exit(status, implicit) {
  checkUnflushedContent()
  if (implicit && noExitRuntime && status === 0) {
    return
  }
  if (!implicit) {
    if (ENVIRONMENT_IS_PTHREAD) {
      err(
        'Pthread 0x' +
          _pthread_self().toString(16) +
          ' called exit(), posting exitProcess.'
      )
      postMessage({ cmd: 'exitProcess', returnCode: status })
      throw new ExitStatus(status)
    } else {
      err('main thead called exit: noExitRuntime=' + noExitRuntime)
    }
  }
  if (noExitRuntime) {
    if (!implicit) {
      var msg =
        'program exited (with status: ' +
        status +
        '), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)'
      err(msg)
    }
  } else {
    PThread.terminateAllThreads()
    EXITSTATUS = status
    exitRuntime()
    if (Module['onExit']) Module['onExit'](status)
    ABORT = true
  }
  quit_(status, new ExitStatus(status))
}
if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function')
    Module['preInit'] = [Module['preInit']]
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()()
  }
}
if (ENVIRONMENT_IS_PTHREAD) {
  noExitRuntime = false
  PThread.initWorker()
}
run()

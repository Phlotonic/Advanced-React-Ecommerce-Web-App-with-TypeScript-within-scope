import { ReadableStream, WritableStream, TransformStream } from 'web-streams-polyfill/ponyfill';

if (!(globalThis as any).ReadableStream) {
  (globalThis as any).ReadableStream = ReadableStream;
}
if (!(globalThis as any).WritableStream) {
  (globalThis as any).WritableStream = WritableStream;
}
if (!(globalThis as any).TransformStream) {
  (globalThis as any).TransformStream = TransformStream;
}

import { TextEncoder, TextDecoder } from 'util';

if (!(global as any).TextEncoder) {
    (global as any).TextEncoder = TextEncoder;
}
if (!(global as any).TextDecoder) {
    (global as any).TextDecoder = TextDecoder;
}

import fetch, { Headers, Request, Response } from 'undici';

if (!(global as any).fetch) {
    (global as any).fetch = fetch;
    (global as any).Headers = Headers;
    (global as any).Request = Request;
    (global as any).Response = Response;
}
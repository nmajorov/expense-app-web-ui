export enum HTTP_VERBS {
    DELETE = 'DELETE',
    GET = 'get',
    PATCH = 'patch',
    POST = 'post',
    PUT = 'put'
};


export const HTTP_CODES = {
    OK: 200,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    REQUEST_FAILED: 422,
    INTERNAL_SERVER: 500,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504
};


export const MILLISECONDS = 1000;


export type TimeInMilliseconds = number;
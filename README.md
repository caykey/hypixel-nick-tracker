# Unofficial Hypixel API by CactiveNetwork

This is an implementation of the API in node.js, however you're welcome to request data directly.

The method of collecting data is **private**, hence why a key system is required.

This API is written in TypeScript, and as such contains full type declarations for all endpoints, and includes optional object fields for sensitive data not provided on standard API keys.

### Disclaimer:

- We are not associated nor should we be considered affiliated with Hypixel.
- A valid API key is required to successfully request player, nickname, ban and other data from this API. You can request an API key running `-ticket open` [in this discord](https://discord.gg/NeqVuSy) providing you meet criteria.
- You are not under any circumstances guaranteed an API key, and we may revoke your application and its API key for any reason, including but not limited to the following; you are directly linked to administration of Hypixel or not information is provided in your background check, you use data for malicious purposes that harm other players, your application does not need this API for its intended purpose, your application has security flaws that take away the integrity of your key, your application is unsafely public, etc.

---

## Error Types

In the case that your request is invalid, maintenance is done on the API, or the tunnel collecting data is blocked or locked out, you will receive an error, which you should look out for.

This wrapper adds an `internal` field to the object in your array of errors, which will be `true` if the error is internal to your device (unable to send request or parse JSON), otherwise false.

- `no-authentication` - You didn't provide the relevant authentication information (key field).
- `no-identifier` - You didn't provide the relevant username, id, or such required identification field.
- `no-filter` - You didn't provide the relevant filter field to your request.
- `invalid-authentication` - The authentication information provided in the request was invalid.
- `invalid-filter` - The filter provided in the request was invalid.
- `invalid-endpoint` - The endpoint provided in the request was invalid.
- `tunnel-blocked` - Unable to interface with the required relevant request data.
- `hypixel-maintenance` - Unable to complete because one of the data sources are offline. 
- `rate-limit-blocked` - You are being rate limited for sending too many valid requests.
- `failed-api-request` **NODE CLIENT** - The client failed to send a valid request to the server.
- `unexpected-error` - An unexpected error occurred on the API server.

---

## Rate Limits

- Standard requests are limited to `10 requests per minute`.
- Smart-cached requests (semi-accurate data) are limited to `30 request per minute`.

You are expected to respect these limits, and if you do not, you will be blocked from the API.

---

## Endpoints

To use any implementation code block, you must create a declaration to a new API client.

You also must ensure that you run your code inside an asyncronous code block when using the `await` keyword.

```js
import { Client } from "@cakier/hypixel";
const client = new Client({
    key: "MY_API_KEY", // replace this field.
    cache: false
});
```

---

### Nickname History:
**URL**: https://hypixel.cactive.network/api/v3/nickname-history

**Method:** `GET`

**Required URL Parameters:**
- `key`: String - CactiveNetwork API key (**Required**)
- `nickname`: String - Lookup nickname (**Required**)
- `cache`: Boolean - Not fetch new data

**JavaScript Implementation:**

```js
try {
    const { data } = await client.nickname_history("nickname");
    console.log(data);
    /* [
        {
            "uuid": "eea2d4fda8b8413b9439f06faaf7e109",
            "nickname": "angry_and_free",
            "active": false,
            "created_at": "2022-04-11T09:00:27.933Z",
            "voided_at": "1970-01-01T00:00:00.000Z"
        }
    ] */
} catch ({ errors }) {
    console.error(errors);
    /* [
        {
            "type": "no-identifier",
            "code": 400,
            "message": "You didn't provide a 'nickname' parameter in your request"
        }
    ] */
}
```
---
### Player Data

**URL**: https://hypixel.cactive.network/api/v3/player-data

**Method:** `GET`

**Required URL Parameters:**
- `key`: String - CactiveNetwork API key (**Required**)
- `uuid`: String - Player uuid (**Required**)
- `cache`: Boolean - Not fetch new data

**JavaScript Implementation:**

```js
try {
    const { data } = await client.player_data("uuid");
    console.log(data);
    /* {
        "uuid": "eea2d4fda8b8413b9439f06faaf7e109",
        "nickname_history": [
            {
                "nickname": "angry_and_free",
                "active": false,
                "created_at": "2022-04-11T09:00:27.933Z",
                "voided_at": "1970-01-01T00:00:00.000Z"
            }
            ...
        ],
        "infractions": [],
        "tracker": {
            "server": null,
            "map": null,
            "proxy": null,
            "last_login": "2022-04-11T09:13:06.113Z"
        },
    } */
} catch ({ errors }) {
    console.error(errors);
    /* [
        {
            "type": "no-identifier",
            "code": 400,
            "message": "You didn't provide a 'uuid' parameter in your request"
        }
    ] */
}
```
---
### Staff Tracker

**URL**: https://hypixel.cactive.network/api/v3/staff-tracker

**Method:** `GET`

**Required URL Parameters:**
- `key`: String - CactiveNetwork API key (**Required**)
- `filter`: String - `all`, `online`, or `offline` (**Required**)
- `cache`: Boolean - Not fetch new data

**JavaScript Implementation:**

```js
try {
    const { data } = await client.staff_tracker("online");
    console.log(data);
    /* [
        {
            "uuid": "20934ef9488c465180a78f861586b4cf",
            "rank": "ADMINISTRATOR"
            "online": false
        },
        ...
    ] */
} catch ({ errors }) {
    console.error(errors);
    /* [
        {
            "type": "invalid-filter",
            "code": 400,
            "message": "You need to provide a filter out of the options, 'all', 'online', 'offline'"
        }
    ] */
}
```
---
### Punishment Data

**URL**: https://hypixel.cactive.network/api/v3/punishment-data

**Method:** `GET`

**Required URL Parameters:**
- `key`: String - CactiveNetwork API key (**Required**)
- `id`: String - Punishment ID (Ban ID) (**Required**)
- `cache`: Boolean - Not fetch new data
- 
**JavaScript Implementation:**

```js
try {
    const { data } = await client.punishment_data("ID");
    console.log(data);
    /* {
        "id": "C256D602",
        "punishment_type": "ban",
        "uuid": "eea2d4fda8b8413b9439f06faaf7e109",
        "executor": null,
        "reason": "Cheating through the use of unfair game advantages.",
        "length": 2592000000
    } */
} catch ({ errors }) {
    console.error(errors);
    /* [
        {
            "type": "no-identifier",
            "code": 400,
            "message": "You didn't provide a 'id' parameter in your request"
        }
    ] */
}
```
---
### Key

**URL**: https://hypixel.cactive.network/api/v3/key

**Method:** `GET`

**Required URL Parameters:**
- `key`: String - CactiveNetwork API key (**Required**)

**JavaScript Implementation:**
```js
try {
    const { data } = await client.key_data("key");
    console.log(data);
    /* {
        "key": "demo",
        "valid": false,
        "active": false,
        "created_at": "1970-01-01T00:00:00.000Z",
        "expires_at": "1970-01-01T00:00:00.000Z",
        "owner_cactiveconnections_id": null,
        "endpoints": [
            {
                "id": "nickname-history",
                "version": 3,
                "status": false
            },
            ...
        ]
    } */
} catch ({ errors }) {
    console.error(errors);
    /* [] */
}
```
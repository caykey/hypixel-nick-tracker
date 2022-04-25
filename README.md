# Unofficial Hypixel API by CactiveNetwork

This is an implementation of the API in node.js, however you're welcome to request data directly.

The method of collecting data is **private**, hence why a key system is required.

### Disclaimer:

- We are not associated nor should we be considered affiliated with Hypixel.
- A valid API key is required to successfully request player, nickname, ban and other data from this API. You can request an API key running `-ticket open` [in this discord](https://discord.gg/NeqVuSy) providing you meet criteria.

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
} catch (errors) {
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
} catch (errors) {
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
} catch (errors) {
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
} catch (errors) {
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
} catch (errors) {
    console.error(errors);
    /* [] */
}
```
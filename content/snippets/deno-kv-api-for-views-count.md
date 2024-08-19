---
id: 4962b0f5-580e-4ece-b1d4-2307f5c51b89
title: Making Deno Key Value Database API for Views Count
created: 2024-08-10T00:00:00
updated: 2024-08-10T00:00:00
---

[Deno KV](https://deno.land/x/kv) is a simple key-value database for Deno. It is a good choice for small projects where you need to store some data. In this article, we will create a simple API for views count using Deno KV.

## Prerequisites

Deno installed on your machine. [Install Docs](https://docs.deno.com/deploy/manual/)

```bash
curl -fsSL https://deno.land/install.sh | sh

// optional Deno deploy ctl for deploy project from command line
deno install -A jsr:@deno/deployctl
deployctl --help
```

- Create a new Deno fresh project with this [github repo](https://github.com/denoland/kv_api) or use mine [existing template](https://github.com/heykapil/deno-kv-api)

- Clone the repo, install the dependencies and run the project

```bash
git clone https://github.com/heykapil/deno-kv-api.git
cd deno-kv-api
deno task install
deno task build && deno task start
```

- Test the api in the local environment.

- Deploy this project to Deno Deploy (Must be logged in and setup the Deno KB account there)

```bash
deployctl deploy
```

- Make sure you protect the API with some kind of authentication/authorization mechanism to limit the access.


## Deno KV API in action

```bash
POST https://kv.kapil.app/kv?key=key&state=some-random-state-value
body: { value }
headers: { Authorization : Bearer <token> }
```
creates the key value pair to the KV store.

```bash
DELETE https://kv.kapil.app/kv?key=key&state=some-random-state-value
headers: { Authorization : Bearer <token }
```
deletes the key value pair from the KV store.

```bash
POST https://kv.kapil.app/kv/sum?key=key&value=some-number&state=some-random-state-value
headers: { Authorization: Bearer <token> }
```
mutates sum (creates the record with key or update the record, same like upsert) the key value in the KV store.
When the optional `value` query parameter is not sent, it sums 1 to the key value.

```bash
GET https://kv.kapil.app/kv/list
```
returns the list of all the key value pairs present in the KV store.


```bash
GET https://kv.kapil.app/kv?key=pageviews,snippet,deno-kv-api-for-views-count
```
returns the key value pair of specific key (for eq. this snippet post pageviews) present in the KV store, `filter` query can be used to filter the results.

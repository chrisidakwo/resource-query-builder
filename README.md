# Resource Query Builder

## A beautiful and elegant way to build urls for your REST API

<a href="https://www.npmjs.com/package/laravel-query-builder">
  <img src="https://img.shields.io/npm/v/laravel-query-builder.svg" />
</a> 
<a href="https://travis-ci.org/chrisidakwo/resource-query-builder">
  <img src="https://travis-ci.org/chrisidakwo/resource-query-builder.svg?branch=master" />
</a>

This package helps you to quickly build urls for a REST API, using fluent syntax.

🔥 If you use [Laravel](https://github.com/laravel/laravel) - the defaults of this package will work with [spatie/laravel-query-builder](https://github.com/spatie/laravel-query-builder).

# Basic usage

Make a url by calling the functions you need in a beautiful and elegant way:

```js
// Import
import Query from 'resource-query-builder';

// If custom configuration is required, see the Additional Configuration section
const query = new Query();

// /posts?filter[name]=Bob&include=posts,comments&orderBy=-created_at
const url = query
  .for('posts') // the model you're selecting
  .where('name', 'Bob') // where the models `name` is 'Bob'
  .includes('posts', 'comments') // include the models related relationships: posts and comments
  .orderBy('-created_at') // order by -created_at desc
  .get(); // generate the url and pass it into fetch!
```

# Installation

## Npm

```js
npm i resource-query-builder
```

## Yarn

```js
yarn add resource-query-builder
```

# Additional Configuration

## Base Url

You can optionally set the `base_url` property when instantiating the class to automatically preprend the url to all urls:

```js
import Query from 'resource-query-builder';

const query = new Query({
  base_url: 'http://api.example.com'
});

// http://api.example.com/users?filter[name]=Bob
const url = query.for('users').where('name', 'Bob').url(); // or .get();
```

# Available Methods

## for()

You can optionally set the `model` on the query object using the `for()` method. It is not required:

```js
import Query from 'resource-query-builder';

const query = new Query({
  base_url: 'http://api.example.com',
});

// http://api.example.com/users
const url = query.for('users').where('name', 'Bob').url(); // or .get();
```

## where()

```js
// http://api.example.com/users?filter[name]=Bob
const url = query.for('users').where('name', 'Bob').url(); // or .get();
```

## whereIn()

```js
// http://api.example.com/users?filter[name]=bob,jerry
const url = query.for('users').whereIn('name', ['bob', 'jerry']).url(); // or .get();
```

## select()

```js
// http://api.example.com/users?fields=name,age,date_of_birth
const url = query.for('users').select('name', 'age', 'date_of_birth').url(); // or .get();
```

## includes()

```js
// http://api.example.com/users?include=posts
const url = query.for('users').includes('posts').url(); // or .get();
```

## appends()

```js
// http://api.example.com/users?append=full_name,age
const url = query.for('users').appends('full_name', 'age').url(); // or .get();
```

## limit()

```js
// http://api.example.com/users?limit=5
const url = query.for('users').limit(5).url(); // or .get();
```

## limit() | Pagination

```js
// http://api.example.com/users?page=2&limit=5
const url = query.for('users').limit(5).page(2).url(); // or .get();
```

## sort()

```js
// http://api.example.com/users?sort=-name,age
const url = query.for('users').sort('-name', 'age').url(); // or .get();
```

## Custom parameters

If required, you can also append your own custom parameters to the url by passing an object to the `params()` function.

```js
// http://api.example.com/users?format=admin
const url = query.for('users').params({ format: 'admin' }).url(); // or .get();
```

# Customizing Query Parameters

If you need to change the default values for the query parameters, you can optionally pass in a configuration object when initializing your query object.

```js
import Query from 'resource-query-builder';

const query = new Query({
  base_url: null,
  queryParameters: {
    include: 'include_custom',
    filters: 'filter_custom',
    sort: 'sort_custom',
    fields: 'fields_custom',
    append: 'append_custom',
    page: 'page_custom',
    limit: 'limit_custom'
  }
});
```

# Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

# Contributors

This package is a Typescript implementation and extension of [cogent-js](https://github.com/joelwmale/cogent-js)

[@chrisidakwo](https://twitter.com/chrisidakwo)

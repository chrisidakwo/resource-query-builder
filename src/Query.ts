import Parser from './Parser';

export interface QueryConfigParameters {
  includes: string;
  filters: string;
  sort: string;
  fields: string;
  appends: string;
  page: string;
  limit: string;
}

export interface QueryConfigOptions {
  base_url?: string;
  queryParameters?: QueryConfigParameters
}

export default class Query {
  public include: string[];
  public model: string | null;
  private base_url: string | null;
  public queryParameters: QueryConfigParameters;
  public append: string[];
  public sorts: string[];
  public fields: string | Record<string, string>;
  public filters: Record<string, any>;
  public pageValue: number | null;
  public limitValue: number | null;
  public paramsObj: Record<string, any> | null;
  private parser: Parser;

  constructor(options: Partial<QueryConfigOptions> = {}) {
    // @TODO validate options is an object
    // if (options && typeof(options) !== Object) {
    //   throw new Error('Please pass in an options object to the constructor.');
    // }

    // the model to execute the query against
    // set by calling .for(model)
    this.model = null;

    // will use base_url if passed in
    this.base_url = options.base_url ?? null;

    // default filter names
    const defaultFilterNames = {
      filters: 'filter',
      fields: 'fields',
      includes: 'include',
      appends: 'append',
      page: 'page',
      limit: 'limit',
      sort: 'sort'
    };

    this.queryParameters = options.queryParameters ? {
      ...defaultFilterNames,
      ...options.queryParameters
    } : defaultFilterNames;

    // initialise variables to hold
    // the urls data
    this.include = [];
    this.append = [];
    this.sorts = [];
    this.fields = {};
    this.filters = {};
    this.pageValue = null;
    this.limitValue = null;
    this.paramsObj = null;

    this.parser = new Parser(this);
  }

  /**
   * Set the model for the query
   *
   * @param {string} model
   */
  public for(model: string): Query {
    this.model = model;

    return this;
  }

  /**
   * Return the parsed url
   */
  public get(): string {
    // generate the url
    const url = this.base_url ? this.base_url + this.parseQuery() : this.parseQuery();

    // reset the url so the query object can be re-used
    this.reset();

    return url;
  }

  public url(): string {
    return this.get();
  }

  private reset(): void {
    // reset the uri
    this.parser.uri = '';
  }

  private parseQuery(): string {
    if (this.model) {
      return `/${this.model}${this.parser.parse()}`;
    }

    return `${this.parser.parse()}`;
  }

  /**
   * Query builder
   */
  public includes(...include: string[]): Query {
    if (! include.length) {
      throw new Error(`The ${this.queryParameters.includes}s() function takes at least one argument.`);
    }

    this.include = include;

    return this;
  }

  public appends(...append: string[]): Query {
    if (!append.length) {
      throw new Error(`The ${this.queryParameters.appends}s() function takes at least one argument.`);
    }

    this.append = append;

    return this;
  }

  public select(fields: string[] | Record<string, string[]>): Query {
    if (! fields.length) {
      throw new Error(`The ${this.queryParameters.fields}() function takes a single argument of a valid array.`);
    }

    // single entity .fields(['age', 'firstname'])
    if (Array.isArray(fields)) {
      this.fields = (fields).join(',');
    } else {
      // related entities .fields({ posts: ['title', 'content'], user: ['age', 'firstname']} )
      Object.entries(fields).forEach(([key, value]) => {
        this.fields = { ...this.fields as Record<string, string>, [key]: value.join(',') };
      });
    }

    return this;
  }

  public where(key: string, value: string): Query {
    if (value == undefined)
      throw new Error('The where() function takes 2 arguments both of string values.');

    if (Array.isArray(value))
      throw new Error('The second argument to the where() function must be a string. Use whereIn() if you need to pass in an array.');

    this.filters[key] = value;

    return this;
  }

  public whereIn(key: string, array: string[]): Query {
    if (!key || !array) {
      throw new Error('The whereIn() function takes 2 arguments of (string, array).');
    }

    if (!key && Array.isArray(key) || typeof key === 'object') {
      throw new Error('The first argument for the whereIn() function must be a string or integer.');
    }

    if (!Array.isArray(array)) {
      throw new Error('The second argument for the whereIn() function must be an array.');
    }

    this.filters[key] = array.join(',');

    return this;
  }

  public sort(...args: string[]): Query {
    this.sorts = args;

    return this;
  }

  public page(value: number): Query {
    if (!Number.isInteger(value)) {
      throw new Error('The page() function takes a single argument of a number');
    }

    this.pageValue = value;

    return this;
  }

  public limit(value: number): Query {
    if (! Number.isInteger(value)) {
      throw new Error('The limit() function takes a single argument of a number.');
    }

    this.limitValue = value;

    return this;
  }

  public params(params: Record<string, any>): Query {
    if (params.constructor !== Object) {
      throw new Error('The params() function takes a single argument of an object.');
    }

    this.paramsObj = params;

    return this;
  }
}

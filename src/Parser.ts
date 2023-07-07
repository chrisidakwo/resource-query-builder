import qs from 'qs';

export default class Parser {
  private query: any;
  public uri: string;

  constructor(query: any) {
    this.query = query;
    this.uri = '';
  }

  // parse the final query string
  public parse(): string {
    this.includes();
    this.appends();
    this.fields();
    this.filters();
    this.sorts();
    this.page();
    this.limit();
    this.params();

    return this.uri;
  }

  private prepend(): string {
    return this.uri === '' ? '?' : '&';
  }

  /**
   * Parsers
   */
  private includes(): void {
    if (! (this.query.include.length > 0)) {
      return;
    }

    this.uri += `${this.prepend() + this.query.queryParameters.includes}=${this.query.include}`;
  }

  private appends(): void {
    if (! (this.query.append.length > 0)) {
      return;
    }

    this.uri += `${this.prepend() + this.query.queryParameters.appends}=${this.query.append}`;
  }

  private fields(): void {
    if (! (Object.keys(this.query.fields).length > 0)) {
      return;
    }

    const fields = { [`${this.query.queryParameters.fields}[${this.query.model}]`]: this.query.fields };
    this.uri += this.prepend() + qs.stringify(fields, { encode: false });
  }

  private filters(): void {
    if (! (Object.keys(this.query.filters).length > 0)) {
      return;
    }

    const filters = { [this.query.queryParameters.filters]: this.query.filters };
    this.uri += this.prepend() + qs.stringify(filters, { encode: false });
  }

  private sorts(): void {
    if (! (this.query.sorts.length > 0)) {
      return;
    }

    this.uri += `${this.prepend() + this.query.queryParameters.sort}=${this.query.sorts}`;
  }

  private page(): void {
    if (this.query.pageValue === null) {
      return;
    }

    this.uri += `${this.prepend() + this.query.queryParameters.page}=${this.query.pageValue}`;
  }

  private limit(): void {
    if (this.query.limitValue === null) {
      return;
    }

    this.uri += `${this.prepend() + this.query.queryParameters.limit}=${this.query.limitValue}`;
  }

  private params(): void {
    if (this.query.paramsObj === null) {
      return;
    }

    this.uri += this.prepend() + qs.stringify(this.query.paramsObj, { encode: false });
  }
}

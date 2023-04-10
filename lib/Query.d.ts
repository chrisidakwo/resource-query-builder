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
    queryParameters?: QueryConfigParameters;
}
export default class Query {
    include: string[];
    model: string | null;
    private base_url;
    queryParameters: QueryConfigParameters;
    append: string[];
    sorts: string[];
    fields: string | Record<string, string>;
    filters: Record<string, any>;
    pageValue: number | null;
    limitValue: number | null;
    paramsObj: Record<string, any> | null;
    private parser;
    constructor(options?: Partial<QueryConfigOptions>);
    /**
     * Set the model for the query
     *
     * @param {string} model
     */
    for(model: string): Query;
    /**
     * Return the parsed url
     */
    get(): string;
    url(): string;
    private reset;
    private parseQuery;
    /**
     * Query builder
     */
    includes(...include: string[]): Query;
    appends(...append: string[]): Query;
    select(fields: string[] | Record<string, string[]>): Query;
    where(key: string, value: string): Query;
    whereIn(key: string, array: string[]): Query;
    sort(...args: string[]): Query;
    page(value: number): Query;
    limit(value: number): Query;
    params(params: Record<string, any>): Query;
}

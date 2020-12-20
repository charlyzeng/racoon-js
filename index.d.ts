export interface CustomRestrictCallback<T> {
  (value: T): any;
}

export interface DefaultCallback<T> {
  (value: T): any;
}

export interface ErrorCallback {
  (message: string): string;
}

export interface FormatCallback<T> {
  (value: T): any;
}

export interface SilentResult {
  error?: Error;
  value?: any;
}

export interface SchemaBase<T> {
  required(strict?: boolean): this;

  custom(restrictFn: CustomRestrictCallback<T>, ctx?: any): this;

  default(value: DefaultCallback<any> | any, strict?: boolean, ctx?: any): this;

  error(message: string | ErrorCallback, ctx?: any): this;

  errorForAll(message: string | ErrorCallback, ctx?: any): this;

  format(callback: FormatCallback<T>, ctx?: any): this;

  validate(value: any): any;

  validateSilent(value: any): SilentResult;
}

export type ArrayConfig = SchemaBase<any>;

export interface ObjectConfig {
  [x: string]: any;
}

export interface SchemaAny extends SchemaBase<any> {
  enum(...values: any[]): this;
}

export interface SchemaArray extends SchemaBase<any[]> {
  min(min: number, strict?: boolean): this;

  max(max: number, strict?: boolean): this;
}

export interface SchemaBoolean extends SchemaBase<boolean> {
  default(value: DefaultCallback<boolean> | any, ctx?: any);
  
  required(): this;

  enum(...values: boolean[]): this;
}

export interface SchemaNumber extends SchemaBase<number> {
  default(value: DefaultCallback<number> | any, ctx?: any);

  required(): this;

  enum(...values: number[]): this;

  min(min: number, strict?: boolean): this;

  max(max: number, strict?: boolean): this;

  int(): this;

  allowNaN(): this;

  allowInfinity(): this;

  allowString(): this;
}

export interface SchemaObject extends SchemaBase<object> {
  allowUnknown(): this;

  stripUnknown(): this;
}

export interface SchemaString extends SchemaBase<string> {
  enum(...values: string[]): this;

  min(min: number, strict?: boolean): this;

  max(max: number, strict?: boolean): this;

  pattern(pattern: RegExp): this;
}

export function any(): SchemaAny;

export function array(config?: ArrayConfig): SchemaArray;

export function boolean(): SchemaBoolean;

export function number(): SchemaNumber;

export function object(config?: ObjectConfig): SchemaObject;

export function string(): SchemaString;

export type Schema = SchemaAny | SchemaArray | SchemaBoolean | SchemaNumber | SchemaObject | SchemaString;

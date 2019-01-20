import { Subscription } from 'rxjs';

const typeCache: { [label: string]: boolean } = {};
/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }
  typeCache[<string>label] = true;
  return <T>label;
}

export const cloneObj = (obj: any) => {
  if (!obj) { return null; }
  if (typeof(obj) !== 'object') {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
};

export const unsubscribeSubscriptions = (subscriptions: Subscription[]): void => {
  for (const sub of subscriptions) {
    sub.unsubscribe();
  }
};

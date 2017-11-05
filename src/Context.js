/* @flow */
import type Store from '@ushiboy/observable-store';
import type { AppStore, UseCase, AppContext, Locator } from './type.js';

export default function Context(store: AppStore, locator: Locator): AppContext {
  return {
    usecase: {
      execute(usecase: UseCase): void {
        usecase(store, locator);
      }
    }
  };
}

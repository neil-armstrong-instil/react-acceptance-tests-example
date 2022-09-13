import type {BaseEnvironment} from "@src/dsl/shared/environments/BaseEnvironment";
import type {KeyboardKeys} from "@src/dsl/shared/dsl/types/KeyboardKeys";
import type {MouseCursor} from "./types/MouseCursor";

export abstract class BaseDsl<DslEnvironment extends BaseEnvironment> {
  protected constructor(protected environment: DslEnvironment) {
  }

  abstract navigateToPage(): Promise<void>;

  async typeKeyboardKey(key: KeyboardKeys): Promise<void> {
    await this.environment.typeKeyboardKey(key);
  }

  async mouseCursor(): Promise<MouseCursor> {
    return this.environment.mouseCursor();
  }

  // Put helpers you want on all dsl objects here
}

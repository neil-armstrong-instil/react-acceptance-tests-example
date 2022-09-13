import type {KeyboardKeys} from "@src/dsl/shared/dsl/types/KeyboardKeys";
import type {MouseCursor} from "@src/dsl/shared/dsl/types/MouseCursor";

export interface BaseEnvironment {
  asyncConstructor(): Promise<void>;

  typeKeyboardKey(key: KeyboardKeys): Promise<void>;
  mouseCursor(): Promise<MouseCursor>;
  finishDragging(): Promise<void>;

  // Put helpers that you want available on all environments here
}

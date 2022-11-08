import type {BaseEnvironment} from "@src/dsl/shared/environments/BaseEnvironment";
import type {ApiConfig} from "@src/dsl/shared/drivers/api/types/ApiConfig";
import {unimplementedMethodError} from "@src/dsl/shared/errors/UnimplementedMethodError";
import {ApiClient} from "@src/dsl/shared/drivers/api/client/ApiClient";
import {emptyPromise} from "@src/dsl/shared/drivers/api/utils/EmptyPromise";

export abstract class BaseApiDriver implements BaseEnvironment {
  driver: ApiClient;

  protected constructor(protected config: ApiConfig) {
    this.driver = new ApiClient(this.config);
  }

  selectFile = unimplementedMethodError;
  mouseCursor = unimplementedMethodError;

  asyncConstructor(): Promise<void> {
    return Promise.resolve();
  }

  finishDragging = emptyPromise;
  openSystemMenu = emptyPromise;
  selectSystemMenuItem = emptyPromise;
  typeKeyboardKey = emptyPromise;
}

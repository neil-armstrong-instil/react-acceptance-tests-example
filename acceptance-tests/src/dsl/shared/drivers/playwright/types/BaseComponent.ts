import type {Page} from "playwright-core";
import type {Position} from "@src/dsl/shared/types/Position";
import type {Locator} from "@playwright/test";
import {isPosition} from "@src/dsl/shared/types/Position";

export abstract class BaseComponent {
  protected constructor(public driver: Page) {
  }

  async startDragging(startDraggingFrom: Position): Promise<Position> {
    const amountToMoveSoDragStarts = 10;

    await this.driver.mouse.move(startDraggingFrom.x, startDraggingFrom.y);
    await this.driver.mouse.down({
      button: "left"
    });
    await this.driver.mouse.move(startDraggingFrom.x, startDraggingFrom.y + amountToMoveSoDragStarts);

    return {
      x: startDraggingFrom.x,
      y: startDraggingFrom.y + amountToMoveSoDragStarts
    };
  }

  async dragTo(to: Position): Promise<Position>;
  async dragTo(to: Locator): Promise<Position>;
  async dragTo(to: Position | Locator): Promise<Position> {
    if (isPosition(to)) {
      await this.driver.mouse.move(to.x, to.y);
      return to;
    }

    const boundingBox = await to.boundingBox();
    if (!boundingBox) throw new Error(`Could not find element to drag to ${to}`);

    return this.dragTo(boundingBox);
  }

  async finishDragging(): Promise<void> {
    await this.driver.mouse.up({
      button: "left"
    });
  }
  // Put helpers that you want available on all components here
}

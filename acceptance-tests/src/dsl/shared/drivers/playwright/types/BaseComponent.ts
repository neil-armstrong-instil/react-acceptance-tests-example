import type {Page} from "playwright-core";
import type {Position} from "@src/dsl/shared/types/Position";
import {isPosition} from "@src/dsl/shared/types/Position";
import type {Locator} from "@playwright/test";

export abstract class BaseComponent {
  protected constructor(public driver: Page) {
  }

  async dragAndDrop(from: Locator, to: Locator): Promise<void> {
    const fromBoundingBox = await from.boundingBox();
    const toBoundingBox = await to.boundingBox();
    if (!fromBoundingBox) throw Error("Could not find bounding box for 'drag from'");
    if (!toBoundingBox) throw Error("Could not find bounding box for 'drag to'");

    await this.startDragging({
      x: fromBoundingBox.x,
      y: fromBoundingBox.y
    });

    const dropOffset: Position = {
      x: toBoundingBox.width / 2,
      y: toBoundingBox.height * 0.5
    };
    const positionToDragTo: Position = {
      x: toBoundingBox.x + dropOffset.x,
      y: toBoundingBox.y + dropOffset.y
    };
    await this.moveCurrentlyDraggedElementTo(positionToDragTo);

    // Add a little movement at the end to ensure react is fully up to date
    await this.moveCurrentlyDraggedElementTo({
      x: positionToDragTo.x + 1,
      y: positionToDragTo.y + 1
    });

    await this.finishDragging();
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

  async moveCurrentlyDraggedElementTo(to: Position): Promise<Position>;
  async moveCurrentlyDraggedElementTo(to: Locator): Promise<Position>;
  async moveCurrentlyDraggedElementTo(to: Position | Locator): Promise<Position> {
    if (isPosition(to)) {
      await this.driver.mouse.move(to.x, to.y, {
        steps: 20
      });
      return to;
    }

    const boundingBox = await to.boundingBox();
    if (!boundingBox) throw new Error(`Could not find element to drag to ${to}`);

    return this.moveCurrentlyDraggedElementTo({
      x: boundingBox.x + (boundingBox.width / 2),
      y: boundingBox.y + (boundingBox.height / 2)
    });
  }

  async finishDragging(): Promise<void> {
    await this.driver.mouse.up({
      button: "left"
    });
  }
  // Put helpers that you want available on all components here
}

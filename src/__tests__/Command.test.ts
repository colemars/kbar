import { ActionImpl } from "..";
import { Action } from "../types";
import { createAction } from "../utils";
import { Command } from "../action/Command";
import { history } from "../action/HistoryImpl";

const negate = jest.fn();
const perform = jest.fn().mockReturnValue(negate);
const baseAction: Action = createAction({
  name: "Test action",
  perform,
});

const anotherAction: Action = createAction({
  name: "Test action 2",
  perform,
});

const store = {};

describe("Command", () => {
  let actionImpl: ActionImpl;
  let actionImpl2: ActionImpl;

  beforeEach(() => {
    [actionImpl, actionImpl2] = [baseAction, anotherAction].map((action) =>
      ActionImpl.create(createAction(action), {
        store,
        history,
      })
    );
  });

  it("should create an instance of Command", () => {
    expect(actionImpl.command instanceof Command).toBe(true);
    expect(actionImpl2.command instanceof Command).toBe(true);
  });

  describe("History", () => {
    afterEach(() => {
      history.reset();
    });
    it("should properly interface with History", async () => {
      expect(history.undoStack.length).toEqual(0);
      await actionImpl.command?.perform();
      expect(history.undoStack.length).toEqual(1);
      actionImpl.command?.history?.undo();
      actionImpl.command?.history?.undo();
      actionImpl.command?.history?.undo();
      actionImpl.command?.history?.undo();
      expect(history.undoStack.length).toEqual(0);
      expect(history.redoStack.length).toEqual(1);
    });
    it("should only register a single history record for each action", async () => {
      await actionImpl.command?.perform();
      await actionImpl.command?.perform();
      await actionImpl2.command?.perform();
      await actionImpl2.command?.perform();
      expect(history.undoStack.length).toEqual(2);
    });
    it("should undo/redo specific actions, not just at the top of the history stack", async () => {
      expect(history.undoStack.length).toEqual(0);
      await actionImpl.command?.perform();
      await actionImpl2.command?.perform();

      actionImpl.command?.history?.undo();
      // @ts-ignore historyItem is private, but using for purposes of testing equality
      expect(history.undoStack[0]).toEqual(actionImpl2.command?.historyItem);
      // @ts-ignore
      expect(history.redoStack[0]).toEqual(actionImpl.command?.historyItem);
    });
    it("should place redo actions back in the undo stack if action was re-perform", async () => {
      await actionImpl.command?.perform();
      actionImpl.command?.history?.undo();
      expect(history.undoStack.length).toEqual(0);
      actionImpl.command?.history?.redo();
      expect(history.undoStack.length).toEqual(1);
      expect(history.redoStack.length).toEqual(0);
    });
    it("should await async commands before registering history", async () => {
      const asyncNegate = jest.fn();
      const asyncPerform = jest.fn().mockResolvedValue(asyncNegate);
      const asyncAction = ActionImpl.create(
        createAction({
          name: "Async action",
          perform: asyncPerform,
        }),
        {
          store,
          history,
        }
      );

      const pending = asyncAction.command?.perform();
      expect(history.undoStack.length).toEqual(0);

      await pending;

      expect(asyncPerform).toHaveBeenCalledTimes(1);
      expect(history.undoStack.length).toEqual(1);
    });
  });
});

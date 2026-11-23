import { describe, expect, it } from "vitest";
import {
  keepRootComposeParentThread,
  readRootComposeParentThreadId,
  rootComposeParentThreadFields,
  withoutRootComposeParentThread,
} from "./root-compose-parent-thread";

const NEW_CHILD_THREAD_STATE = {
  focusPrompt: true,
  initialPrompt: "",
  placement: { sectionId: null, pinned: false },
  reuseEnvironmentId: "env_parent",
  parentThreadId: "thr_parent",
};

describe("readRootComposeParentThreadId", () => {
  it("reads the parent a New child thread navigation carries", () => {
    expect(readRootComposeParentThreadId(NEW_CHILD_THREAD_STATE)).toBe(
      "thr_parent",
    );
  });

  it("finds no parent in plain New thread navigation", () => {
    expect(readRootComposeParentThreadId({ focusPrompt: true })).toBeNull();
    expect(readRootComposeParentThreadId(null)).toBeNull();
  });

  it("ignores a blank or non-string parent", () => {
    expect(readRootComposeParentThreadId({ parentThreadId: "  " })).toBeNull();
    expect(readRootComposeParentThreadId({ parentThreadId: 42 })).toBeNull();
  });
});

describe("keepRootComposeParentThread", () => {
  it("keeps the parent when compose clears its single-use targets", () => {
    expect(keepRootComposeParentThread(NEW_CHILD_THREAD_STATE, null)).toEqual({
      parentThreadId: "thr_parent",
    });
  });

  it("keeps the parent when compose replaces a seeded prompt with focus", () => {
    expect(
      keepRootComposeParentThread(
        { initialPrompt: "Review", parentThreadId: "thr_parent" },
        { focusPrompt: true },
      ),
    ).toEqual({ focusPrompt: true, parentThreadId: "thr_parent" });
  });

  it("adds nothing when the screen has no parent", () => {
    expect(keepRootComposeParentThread({ sectionId: "sec_a" }, null)).toBe(
      null,
    );
  });
});

describe("withoutRootComposeParentThread", () => {
  it("drops only the parent", () => {
    expect(
      withoutRootComposeParentThread({
        focusPrompt: true,
        parentThreadId: "thr_parent",
      }),
    ).toEqual({ focusPrompt: true });
  });

  it("clears state that held only the parent", () => {
    expect(
      withoutRootComposeParentThread({ parentThreadId: "thr_parent" }),
    ).toBeNull();
  });
});

describe("rootComposeParentThreadFields", () => {
  it("creates the child with parent notifications off", () => {
    expect(rootComposeParentThreadFields("thr_parent")).toEqual({
      parentThreadId: "thr_parent",
      parentNotifications: "off",
    });
  });

  it("adds no fields for a top-level thread", () => {
    expect(rootComposeParentThreadFields(null)).toEqual({});
  });
});

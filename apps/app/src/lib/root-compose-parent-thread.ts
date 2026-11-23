import type { CreateThreadRequest } from "@bb/server-contract";

export function readRootComposeParentThreadId(state: unknown): string | null {
  if (typeof state !== "object" || state === null) return null;
  if (!("parentThreadId" in state)) return null;
  const parentThreadId = state.parentThreadId;
  return typeof parentThreadId === "string" && parentThreadId.trim().length > 0
    ? parentThreadId.trim()
    : null;
}

export function rootComposeParentThreadFields(
  parentThreadId: string | null,
): Pick<CreateThreadRequest, "parentThreadId" | "parentNotifications"> {
  return parentThreadId === null
    ? {}
    : { parentThreadId, parentNotifications: "off" };
}

export function keepRootComposeParentThread(
  previousState: unknown,
  nextState: Record<string, unknown> | null,
): Record<string, unknown> | null {
  const parentThreadId = readRootComposeParentThreadId(previousState);
  if (parentThreadId === null) return nextState;
  return { ...nextState, parentThreadId };
}

export function withoutRootComposeParentThread(
  state: unknown,
): Record<string, unknown> | null {
  if (typeof state !== "object" || state === null) return null;
  const entries = Object.entries(state).filter(
    ([key]) => key !== "parentThreadId",
  );
  return entries.length === 0 ? null : Object.fromEntries(entries);
}

import { Icon } from "@bb/shared-ui/icon";
import { PromptStackCard } from "@/components/promptbox/banner/PromptStackCard";
import {
  ThreadTitle,
  useThreadTitleDisplayText,
} from "@/components/thread/ThreadTitleMentions";
import { useThread } from "@/hooks/queries/thread-queries";
import { getThreadDisplayTitle } from "@/lib/thread-title";

interface ComposeParentThreadCardProps {
  parentThreadId: string;
  onRemove: () => void;
}

export function ComposeParentThreadCard({
  parentThreadId,
  onRemove,
}: ComposeParentThreadCardProps) {
  const { data: parentThread } = useThread(parentThreadId);
  const parentTitle =
    parentThread === undefined
      ? parentThreadId
      : getThreadDisplayTitle(parentThread);
  const parentTitleText = useThreadTitleDisplayText(parentTitle);
  return (
    <PromptStackCard ariaLabel="Parent thread" className="overflow-hidden">
      <div className="flex min-h-8 items-center gap-1.5 px-3 py-1.5 text-xs">
        <Icon
          name="ChildThread"
          className="size-3.5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <span className="shrink-0 font-medium text-foreground">
          Child thread of
        </span>
        <span
          className="min-w-0 flex-1 truncate text-muted-foreground"
          title={parentTitleText}
        >
          <ThreadTitle title={parentTitle} inline />
        </span>
        <button
          type="button"
          aria-label="Remove parent thread"
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:bg-state-hover hover:text-foreground"
          onClick={onRemove}
        >
          <Icon name="X" className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </PromptStackCard>
  );
}

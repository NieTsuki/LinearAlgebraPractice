<script lang="ts">
    import type { Snippet } from "svelte";
    import * as Sheet from "$lib/components/ui/sheet";
    import { buttonVariants } from "$lib/components/ui/button/index.js";

    interface Props {
        title: string;
        top?: string;
        contentClass?: string;
        onOpen?: () => void;
        onClose?: () => void;
        children: Snippet<[]>;
    }

    let {
        title,
        top = "80px",
        contentClass,
        onOpen,
        onClose,
        children
    }: Props = $props();

    // svelte-ignore non_reactive_update
    let cc = "p-8 bg-background/[0.8] overflow-auto border-none ";

    if (contentClass !== undefined) {
        cc += contentClass;
    } else {
        cc += "sm:max-w-sm";
    }
</script>

<Sheet.Root onOpenChange={(isOpen: boolean) => {
    if (isOpen) {
        if (onOpen) onOpen();
    } else {
        if (onClose) onClose();
    }
}}>
    <div class={`absolute right-0 px-4`} style:top={top}>
        <Sheet.Trigger class={`${buttonVariants({ variant: "default" })} text-xs px-2 h-6`}>
            {title}
        </Sheet.Trigger>
    </div>

    <Sheet.Content class={cc}>
        {@render children()}
    </Sheet.Content>
</Sheet.Root>

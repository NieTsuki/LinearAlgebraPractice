<script lang="ts">
    import type { Snippet } from "svelte";
    import * as Sheet from "$lib/components/ui/sheet";
    import { buttonVariants } from "$lib/components/ui/button/index.js";

    interface Props {
        title: string;
        top?: string;
        children: Snippet<[]>;
    }

    let { title, top = "80px", children }: Props = $props();
</script>

<Sheet.Root>
    <div class={`absolute right-0 px-4`} style:top={top}>
        <Sheet.Trigger class={`${buttonVariants({ variant: "default" })} text-xs px-2 h-6`}>
            {title}
        </Sheet.Trigger>
    </div>

    <Sheet.Content>
        {@render children()}
    </Sheet.Content>
</Sheet.Root>

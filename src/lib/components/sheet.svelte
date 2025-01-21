<script lang="ts">
    import * as Sheet from "$lib/components/ui/sheet";
    import { Button } from "$lib/components/ui/button";

    export let title: string;
    export let top = "80px";
</script>

<Sheet.Root>
    <div class={`absolute top-[${top}] right-0 px-4`}>
        <Sheet.Trigger>
            <Button size="sm" class="text-xs px-2 h-6">{title}</Button>
        </Sheet.Trigger>
    </div>

    <Sheet.Content>
        <slot />
    </Sheet.Content>
</Sheet.Root>

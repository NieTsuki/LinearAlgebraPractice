<script lang="ts">
    import P5 from "p5-svelte";
    import type { p5 } from "p5-svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import { setup, draw, mouseClicked } from "./sketch";

    let sketchParent: HTMLDivElement;

    function sketch(p5: p5) {
        p5.setup = () => setup(p5, sketchParent);
        p5.draw = () => draw(p5);
        p5.mouseClicked = (event: PointerEvent) => mouseClicked(p5, event);
    }
</script>

<Tabs.Root>
    <div class="flex justify-center absolute w-full p-4">
        <Tabs.List class="bg-foreground">
            <Tabs.Trigger value="2D" class="font-bold">2D</Tabs.Trigger>
            <Tabs.Trigger value="3D" class="font-bold">3D</Tabs.Trigger>
        </Tabs.List>
    </div>

    <div bind:this={sketchParent} class="w-screen h-screen">
        <Tabs.Content value="2D" class="m-0">
            <P5 {sketch} />
        </Tabs.Content>

        <Tabs.Content value="3D" class="m-0">
            <P5 {sketch} />
        </Tabs.Content>
    </div>
</Tabs.Root>

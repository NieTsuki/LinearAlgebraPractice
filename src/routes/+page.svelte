<script lang="ts">
    import { onMount } from "svelte";
    import P5 from "p5-svelte";
    import type { p5 } from "p5-svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import LocalStorage from "$lib/data";
    import Graph2D from "./graph2D";
    import Graph3D from "./graph3D";
    import type { Graph2DData } from "./graph2D";
    import type { Graph3DData } from "./graph3D";

    let sketchParent: HTMLDivElement;
    let graph2DData: Graph2DData;
    let graph3DData: Graph3DData;

    onMount(() => {
        graph2DData = LocalStorage.getGraph2DData();
        graph3DData = LocalStorage.getGraph3DData();
    });
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
            <P5 sketch={(p5: p5) => new Graph2D(p5, sketchParent, graph2DData)} />
        </Tabs.Content>

        <Tabs.Content value="3D" class="m-0">
            <P5 sketch={(p5: p5) => new Graph3D(p5, sketchParent, graph3DData)} />
        </Tabs.Content>
    </div>
</Tabs.Root>

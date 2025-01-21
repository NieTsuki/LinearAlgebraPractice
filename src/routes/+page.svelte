<script lang="ts">
    import { onMount } from "svelte";
    import P5 from "p5-svelte";
    import type { p5 } from "p5-svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import { Button } from "$lib/components/ui/button";
    import LocalStorage from "$lib/data";
    import Graph2D from "./graph2D";
    import Graph3D from "./graph3D";
    import type { Graph2DData } from "./graph2D";
    import type { Graph3DData } from "./graph3D";

    let container: HTMLDivElement;
    let graph2D: Graph2D;
    let graph3D: Graph3D;
    let graph2DData: Graph2DData | undefined = $state();
    let graph3DData: Graph3DData | undefined = $state();

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

    <div bind:this={container} class="w-screen h-screen">
        <Tabs.Content value="2D" class="m-0">
            {#if graph2DData !== undefined}
                {@const data = graph2DData}

                <P5
                    sketch={(p5: p5) => {
                        graph2D = new Graph2D(
                            p5,
                            container.clientWidth,
                            container.clientHeight,
                            data
                        );
                    }}
                />

                <div class="absolute top-0 right-0 p-4">
                    <Button
                        variant="outline"
                        size="sm"
                        on:click={() => {
                            LocalStorage.setGraph2DData(null);
                            graph2DData = LocalStorage.getGraph2DData();
                            graph2D.data = graph2DData;
                        }}
                    >Reset</Button>
                </div>
            {/if}
        </Tabs.Content>

        <Tabs.Content value="3D" class="m-0">
            {#if graph3DData !== undefined}
                {@const data = graph3DData}

                <P5
                    sketch={(p5: p5) => {
                        graph3D = new Graph3D(
                            p5,
                            container.clientWidth,
                            container.clientHeight,
                            data
                        );
                    }}
                />

                <div class="absolute top-0 right-0 p-4">
                    <Button
                        variant="outline"
                        size="sm"
                        on:click={() => {
                            LocalStorage.setGraph3DData(null);
                            graph3DData = LocalStorage.getGraph3DData();
                            graph3D.data = graph3DData;
                        }}
                    >Reset</Button>
                </div>
            {/if}
        </Tabs.Content>
    </div>
</Tabs.Root>

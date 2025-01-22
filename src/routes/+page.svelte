<script lang="ts">
    import P5 from "p5-svelte";
    import type { p5 } from "p5-svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import { Button } from "$lib/components/ui/button";
    import SideSheet from "$lib/components/sheet.svelte";
    import LocalStorage from "$lib/data";
    import Graph2D from "./graph2D";
    import Graph3D from "./graph3D";
    import CommonOptions from "./commonOptions.svelte";
    import VectorsEditor from "./vectorsEditor.svelte";

    let container: HTMLDivElement;
    let graph2D: Graph2D | undefined;
    let graph3D: Graph3D | undefined;
</script>

<Tabs.Root value="2D">
    <div class="flex justify-center absolute w-full p-4">
        <Tabs.List>
            <Tabs.Trigger value="2D" class="font-bold">2D</Tabs.Trigger>
            <Tabs.Trigger value="3D" class="font-bold">3D</Tabs.Trigger>
        </Tabs.List>
    </div>

    <div bind:this={container} class="w-screen h-screen">
        <Tabs.Content value="2D" class="m-0">
            <P5
                sketch={(p5: p5) => {
                    graph2D = new Graph2D(
                        p5,
                        container.clientWidth,
                        container.clientHeight,
                    );
                }}
            />

            {#if graph2D !== undefined}
                {@const graph = graph2D}

                <div class="absolute top-0 right-0 p-4">
                    <Button
                        size="sm"
                        onclick={() => {
                            LocalStorage.setGraph2DData(null);
                            graph.data = LocalStorage.getGraph2DData();
                        }}
                    >Reset</Button>
                </div>

                <SideSheet title="Options" onClose={() => {
                    LocalStorage.setGraph2DData(graph.data);
                }}>
                    <CommonOptions
                        bind:size={graph2D.data.size}
                        bind:gridLines={graph2D.data.gridLines}
                        bind:vectorStyle={graph2D.data.vectorStyle}
                    />
                </SideSheet>

                <VectorsEditor
                    is3D={false}
                    bind:vectors={graph2D.data.vectors}
                    onEdit={() => {
                        LocalStorage.setGraph2DData(graph.data);
                    }}
                />
            {/if}
        </Tabs.Content>

        <Tabs.Content value="3D" class="m-0">
            <P5
                sketch={(p5: p5) => {
                    graph3D = new Graph3D(
                        p5,
                        container.clientWidth,
                        container.clientHeight,
                    );
                }}
            />

            {#if graph3D !== undefined}
                {@const graph = graph3D}

                <div class="absolute top-0 right-0 p-4">
                    <Button
                        size="sm"
                        onclick={() => {
                            LocalStorage.setGraph3DData(null);
                            graph.data = LocalStorage.getGraph3DData();
                        }}
                    >Reset</Button>
                </div>

                <SideSheet title="Options" onClose={() => {
                    LocalStorage.setGraph3DData(graph.data);
                }}>
                    <CommonOptions
                        bind:size={graph3D.data.size}
                        bind:gridLines={graph3D.data.gridLines}
                        bind:vectorStyle={graph3D.data.vectorStyle}
                    />
                </SideSheet>

                <VectorsEditor
                    is3D={true}
                    bind:vectors={graph3D.data.vectors}
                    onEdit={() => {
                        LocalStorage.setGraph3DData(graph.data);
                    }}
                />
            {/if}
        </Tabs.Content>
    </div>
</Tabs.Root>

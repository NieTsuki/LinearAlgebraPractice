<script lang="ts">
    import P5 from "p5-svelte";
    import type { p5 } from "p5-svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import * as Sheet from "$lib/components/ui/sheet";
    import { Button } from "$lib/components/ui/button";
    import { Slider } from "$lib/components/ui/slider";
    import SideSheet from "$lib/components/sheet.svelte";
    import LocalStorage from "$lib/data";
    import Graph2D from "./graph2D";
    import Graph3D from "./graph3D";

    let container: HTMLDivElement;
    let graph2D: Graph2D;
    let graph3D: Graph3D;
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

            <div class="absolute top-0 right-0 p-4">
                <Button
                    size="sm"
                    onclick={() => {
                        LocalStorage.setGraph2DData(null);
                        graph2D.data = LocalStorage.getGraph2DData();
                    }}
                >Reset</Button>
            </div>

            <SideSheet title="Options">
                <div>
                    <Sheet.Title>Size ({graph2D.data.size})</Sheet.Title>
                    <Slider type="single" min={2} max={100} step={2} bind:value={graph2D.data.size} />
                </div>
            </SideSheet>
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

            <div class="absolute top-0 right-0 p-4">
                <Button
                    size="sm"
                    onclick={() => {
                        LocalStorage.setGraph3DData(null);
                        graph3D.data = LocalStorage.getGraph3DData();
                    }}
                >Reset</Button>
            </div>

            <SideSheet title="Options">
                <div>
                    <Sheet.Title>Size ({graph3D.data.size})</Sheet.Title>
                    <Slider type="single" min={2} max={100} step={2} bind:value={graph3D.data.size} />
                </div>
            </SideSheet>
        </Tabs.Content>
    </div>
</Tabs.Root>

<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import * as Sheet from "$lib/components/ui/sheet";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import SideSheet from "$lib/components/sheet.svelte";

    type Vector = [number, number] | [number, number, number];

    interface Props {
        is3D: boolean;
        vectors: {[name: string]: Vector};
        onEdit?: () => void;
    }

    let { is3D, vectors = $bindable(), onEdit }: Props = $props();

    let currentEdit: string | null = $state(null);
    let editValues = $state({
        name: "",
        x: "0",
        y: "0",
        z: "0",
    });
    let origValues = {
        name: "",
        x: "0",
        y: "0",
        z: "0",
    };

    function edit(name: string, vector: Vector) {
        currentEdit = name;
        editValues = {
            name: name,
            x: vector[0].toString(),
            y: vector[1].toString(),
            z: (vector[2] || 0).toString(),
        };
        origValues = {...editValues};
    }
</script>

<SideSheet title="Vectors" top="120px" contentClass="w-2/3">
    <Sheet.Title>Vectors</Sheet.Title>

    <Table.Root>
        <Table.Header>
            <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>x</Table.Head>
                <Table.Head>y</Table.Head>

                {#if is3D}
                    <Table.Head>z</Table.Head>
                {/if}

                <Table.Head>Actions</Table.Head>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {#each Object.entries(vectors).sort() as [name, vector]}
                <Table.Row>
                    <Table.Cell class={is3D ? "w-1/5" : "w-1/4"}>
                        {#if currentEdit !== name}
                            {name}
                        {:else}
                            <Input class="h-6" bind:value={editValues.name} />
                        {/if}
                    </Table.Cell>

                    <Table.Cell class={is3D ? "w-1/5" : "w-1/4"}>
                        {#if currentEdit !== name}
                            {vector[0].toFixed(2)}
                        {:else}
                            <Input class="h-6" bind:value={editValues.x} />
                        {/if}
                    </Table.Cell>

                    <Table.Cell class={is3D ? "w-1/5" : "w-1/4"}>
                        {#if currentEdit !== name}
                            {vector[1].toFixed(2)}
                        {:else}
                            <Input class="h-6" bind:value={editValues.y} />
                        {/if}
                    </Table.Cell>

                    {#if is3D}
                        <Table.Cell class={is3D ? "w-1/5" : "w-1/4"}>
                            {#if currentEdit !== name}
                                {vector[2]?.toFixed(2)}
                            {:else}
                                <Input class="h-6" bind:value={editValues.z} />
                            {/if}
                        </Table.Cell>
                    {/if}

                    <Table.Cell>
                        {#if currentEdit !== name}
                            <Button
                                class="text-xs px-2 h-6"
                                onclick={() => {
                                    edit(name, vector);
                                }}
                            >Edit</Button>
                        {:else}
                            <Button
                                class="text-xs px-2 h-6"
                                onclick={() => {
                                    delete vectors[origValues.name];

                                    vectors[editValues.name] = is3D ? [
                                        Number(editValues.x),
                                        Number(editValues.y),
                                        Number(editValues.z),
                                    ] : [
                                        Number(editValues.x),
                                        Number(editValues.y),
                                    ];

                                    currentEdit = null;

                                    if (onEdit) onEdit();
                                }}
                            >Done</Button>
                        {/if}

                        <Button
                            class="text-xs px-2 h-6"
                            onclick={() => {
                                delete vectors[name];
                                vectors = vectors;

                                if (onEdit) onEdit();
                            }}
                        >Delete</Button>
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>

        <Table.Caption>
            <Button
                class="text-sm px-3 h-7"
                onclick={() => {
                    const name = "~~new~~";
                    const vector: Vector = is3D ? [0, 0, 0] : [0, 0];

                    vectors[name] = vector;
                    edit(name, vector);
                }}
            >Add</Button>
        </Table.Caption>
    </Table.Root>
</SideSheet>

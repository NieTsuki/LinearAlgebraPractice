<script lang="ts">
    import { Slider } from "$lib/components/ui/slider";
    import * as Sheet from "$lib/components/ui/sheet";
    import * as RadioGroup from "$lib/components/ui/radio-group";

    interface Props {
        size: number;
        gridLines: "hidden" | "minimal" | "full";
    }

    let {
        size = $bindable(),
        gridLines = $bindable()
    }: Props = $props();
</script>

<div>
    <Sheet.Title>Size ({size})</Sheet.Title>
    <Slider type="single" min={2} max={100} step={2} bind:value={size} />
</div>

<div class="mt-10">
    <Sheet.Title>Grid Lines</Sheet.Title>
    <RadioGroup.Root bind:value={gridLines}>
        <div class="flex items-center space-x-2">
            <RadioGroup.Item value="hidden" />
            <span>Hidden</span>
        </div>

        <div class="flex items-center space-x-2">
            <RadioGroup.Item value="minimal" />
            <span>Minimal</span>
        </div>

        <div class="flex items-center space-x-2">
            <RadioGroup.Item value="full" />
            <span>Full</span>
        </div>
    </RadioGroup.Root>
</div>

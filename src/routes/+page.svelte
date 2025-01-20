<script lang="ts">
    import P5 from "p5-svelte";
    import type { p5 } from "p5-svelte";
    import { setup, draw, mouseClicked } from "./sketch";

    let sketchParent: HTMLDivElement;

    function sketch(p5: p5) {
        p5.setup = () => setup(p5, sketchParent);
        p5.draw = () => draw(p5);
        p5.mouseClicked = mouseClicked;
    }
</script>

<div bind:this={sketchParent} class="w-screen h-screen">
    <P5 {sketch} />
</div>

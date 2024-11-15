<template>
    <div class="background-colors">
        <div class="color-blob blob-1"></div>
        <div class="color-blob blob-2"></div>
        <div class="color-blob blob-3"></div>
        <div class="color-blob blob-4"></div>
        <div class="color-blob blob-5"></div>
        <div class="color-blob blob-6"></div>
        <div class="color-blob blob-7"></div>
        <div class="color-blob blob-8"></div>
    </div>
</template>

<script>
    export default {
        name: "BackgroundColors",
    }
</script>

<style>
    .background-colors {
        position: absolute;
        top: 0;
        left: 50%;
        width: 0;
        height: 0;
        z-index: var(--z-background-colors);
    }

    .color-blob {
        border-radius: 50%; 
        aspect-ratio: 1;
        position: absolute;
        filter: blur(2000px);
    }

    /* Blobs spread out over 1000px width */
    .blob-1 {
        top: 20px;
        left: -150px;
        height: 300px;
        width: 300px;
        background-color: var(--color-primary);
        opacity: 0.7;
    }

    .blob-2 {
        top: 50px;
        left: 100px;
        height: 250px;
        width: 250px;
        background-color: var(--color-accent);
        opacity: 0.6;
    }

    .blob-3 {
        top: 30px;
        left: 300px;
        height: 350px;
        width: 350px;
        background-color: var(--color-secondary);
        opacity: 0.5;
    }

    .blob-4 {
        top: 100px;
        left: -200px;
        height: 400px;
        width: 400px;
        background-color: var(--color-primary);
        opacity: 0.5;
    }

    .blob-5 {
        top: 120px;
        left: 150px;
        height: 280px;
        width: 280px;
        background-color: var(--color-quaternary);
        opacity: 0.4;
    }

    .blob-6 {
        top: 160px;
        left: -100px;
        height: 320px;
        width: 320px;
        background-color: var(--color-tertiary);
        opacity: 0.35;
    }

    .blob-7 {
        top: 180px;
        left: 450px;
        height: 220px;
        width: 220px;
        background-color: var(--color-primary);
        opacity: 0.3;
    }

    .blob-8 {
        top: 220px;
        left: 250px;
        height: 300px;
        width: 300px;
        background-color: var(--color-accent);
        opacity: 0.25;
    }
</style>

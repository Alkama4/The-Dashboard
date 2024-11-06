<!-- src/components/SeededLoremIpsum.vue -->
<template>
    <p class="lorem-ipsum">{{ loremText }}</p>
</template>

<script>
    export default {
        name: "LoremIpsum",
        props: {
            seed: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                words: [
                    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
                    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
                    "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
                    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "commodo",
                    "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "voluptate",
                    "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur"
                ]
            };
        },
        computed: {
            loremText() {
                return this.generateLoremText(this.seed);
            }
        },
        methods: {
            seededRandom(seed) {
                const x = Math.sin(seed) * 10000;
                return x - Math.floor(x);
            },
            generateLoremText(seed) {
                const wordCount = 30 + Math.floor(this.seededRandom(seed) * 50); // randomize length between 30-80 words
                let text = [];
                for (let i = 0; i < wordCount; i++) {
                    const randomIndex = Math.floor(this.seededRandom(seed + i) * this.words.length);
                    text.push(this.words[randomIndex]);
                }
            return text.join(" ") + ".";
            }
        }
    };
</script>

<style scoped>
    .lorem-ipsum {
        max-width: 50ch;
    }
</style>

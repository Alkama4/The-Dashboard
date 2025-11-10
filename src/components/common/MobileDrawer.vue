<template>
    <div class="mobile-drawer">
        <transition name="fade">
            <div 
                v-if="backdropVisible"
                class="backdrop"
                @click.self="close"
            ></div>
        </transition>
        <div 
            v-if="drawerOnDom"
            class="drawer"
            :class="{ 'snap': !dragging }"
            :style="{ 'height': drawerHeight + 'vh', 'opacity': drawerOpacity }"
            ref="drawer"
            @mousedown="startDrag"
            @touchstart="startDrag"
        >
            <div class="handle">
                <div class="marker"></div>
            </div>
            <div 
                class="content" 
                :class="{ 'scroll': drawerHeight >= snapPoints[2] }"
                ref="content"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MobileDrawer',
    data() {
        return {
            backdropVisible: false,
            drawerOnDom: false,
            drawerHeight: 0,
            drawerOpacity: 0,
            startY: 0,
            startHeight: 0,
            dragging: false,
            snapPoints: [0, 50, 90],
            touchStartY: 0
        }
    },
    methods: {
        open() {
            document.documentElement.classList.add('no-scroll')
            this.backdropVisible = true;
            this.drawerOnDom = true;
            setTimeout(() => {
                this.drawerHeight = this.snapPoints[1];
                this.drawerOpacity = 1;
            }, 1);
        },
        close() {
            this.drawerHeight = 0;
            this.drawerOpacity = 0;
            this.backdropVisible = false;

            setTimeout(() => {
                this.drawerOnDom = false;
                document.documentElement.classList.remove('no-scroll')
            }, 200);
        },
        startDrag(e) {
            const content = this.$refs.content

            // if at max height and not scrolled, block pull-to-refresh
            if (
                this.drawerHeight === this.snapPoints[2] &&
                content.scrollTop === 0
            ) {
                this.touchStartY = e.touches ? e.touches[0].clientY : e.clientY
            } else if (content.scrollTop !== 0) {
                return // allow normal scrolling
            }

            this.dragging = true
            this.startY = e.touches ? e.touches[0].clientY : e.clientY
            this.startHeight = this.drawerHeight

            window.addEventListener('mousemove', this.onDrag, { passive: false })
            window.addEventListener('mouseup', this.stopDrag)
            window.addEventListener('touchmove', this.onDrag, { passive: false })
            window.addEventListener('touchend', this.stopDrag)
        },
        onDrag(e) {
            if (!this.dragging) return
            const currentY = e.touches ? e.touches[0].clientY : e.clientY
            const diffY = this.startY - currentY
            const vhDiff = (diffY / window.innerHeight) * 100
            let newHeight = this.startHeight + vhDiff

            if (newHeight < 0) newHeight = 0
            if (newHeight > this.snapPoints[2]) newHeight = this.snapPoints[2]

            // prevent pull-to-refresh
            if (
                this.drawerHeight === this.snapPoints[2] &&
                this.$refs.content.scrollTop === 0 &&
                currentY > this.touchStartY
            ) {
                e.preventDefault()
            }

            this.drawerHeight = newHeight
        },
        stopDrag() {
            this.dragging = false
            
            window.removeEventListener('mousemove', this.onDrag)
            window.removeEventListener('mouseup', this.stopDrag)
            window.removeEventListener('touchmove', this.onDrag)
            window.removeEventListener('touchend', this.stopDrag)

            // snap to nearest
            let nearest = this.snapPoints.reduce((prev, curr) =>
                Math.abs(curr - this.drawerHeight) < Math.abs(prev - this.drawerHeight) ? curr : prev
            )

            if (nearest === 0) {
                this.close()
            } else {
                this.drawerHeight = nearest
            }
        }
    }
}
</script>



<style scoped>
.backdrop {
    z-index: var(--z-modal);
}
.drawer {
    width: 100%;
    border-top-left-radius: var(--border-radius-lg);
    border-top-right-radius: var(--border-radius-lg);
    border: 1px solid var(--color-border);
    background-color: var(--color-background-card);
    z-index: var(--z-modal);
    position: fixed;
    left: 0;
    bottom: 0;
    overflow: hidden;
    cursor: grab;
    box-sizing: border-box;
}

.drawer.snap {
    transition: height 0.2s var(--cubic-1), opacity 0.2s ease-out;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.handle {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.1s ease-out;
}
.pointer-device .handle:hover {
    background-color: var(--color-background-card-hover);
}
.handle .marker {
    height: 6px;
    margin: 10px 0;
    width: 42px;
    border-radius: 100px;
    background-color: var(--color-border);
}
.pointer-device .handle:hover .marker {
    background-color: var(--color-border-hover);
}

.content {
    padding-inline: var(--spacing-md);
    height: 100%;
}
.content.scroll {
    overflow: scroll;
}

</style>

<template>
  <div
    class="relative border border-gray-100 w-1/2 sm:w-2/6 md:w-1/6 xl:w-1/10 xxl:w-1/12 h-40 overflow-y-hidden cursor-move"
    @mouseover="show_actions = true"
    @mouseleave="show_actions = false"
  >
    <div v-if="show_actions" class="absolute inset-0 z-50 hover-bg-dim">
      <ul class="opacity-100 flex items-center justify-center h-full">
        <li
          class="px-2 py-1 bg-transparent border border-gray-500 text-white shadow cursor-pointer rounded text-black mr-1"
        >
          <a @click.prevent="rotate">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </a>
        </li>
        <li
          class="px-2 py-1 bg-transparent border border-gray-500 text-white shadow cursor-pointer rounded text-black mr-1"
        >
          <a @click.prevent="deleteItem">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </a>
        </li>
        <li
          class="px-2 py-1 bg-transparent border border-gray-500 text-white shadow cursor-pointer rounded text-black mr-1"
        >
          <a @click.prevent="show">
            <i class="fa fa-expand" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>

    <picture>
      <source media="(max-width: 480px)" :srcset="createImageUrl(item, 'xsmall')" />
      <source media="(max-width: 640px)" :srcset="createImageUrl(item, 'small')" />
      <source media="(max-width: 768px)" :srcset="createImageUrl(item, 'medium')" />
      <source media="(max-width: 1024px)" :srcset="createImageUrl(item, 'large')" />
      <source media="(max-width: 1280px)" :srcset="createImageUrl(item, 'xlarge')" />
      <img
        :src="createImageUrl(item, 'small')"
        :alt="item.title"
        @error="noImage"
        class="object-cover z-10 w-full h-full"
        :style="rotationObject"
      />
    </picture>
  </div>
</template>

<script src="./CImage.js">
</script>

<style lang="css" scoped>
.hover-bg-dim:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
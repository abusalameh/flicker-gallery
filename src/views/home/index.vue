<template>
  <div class="container-fluid bg-gray-900 min-h-screen">
    <h1 class="text-center text-4xl text-white pt-6">Flicker Images Gallery</h1>
    <div class="w-2/3 sm:w-11/12 md:w-2/3 xl:w-1/3 mx-auto py-8">
      <form @submit.prevent="search">
        <input
          class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Search..."
          v-model="search_term"
        />
      </form>
    </div>

    <div
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <draggable v-model="imagesList">
        <transition-group
          name="fade"
          class="flex w-full flex-wrap justify-start scrollable-list"
          tag="div"
        >
          <c-image
            v-for="(photo, index) in imagesList"
            :key="photo.id"
            :item="photo"
            :index="index"
            class="border border-gray-100 w-4/12 sm:w-2/6 md:w-1/6 xl:w-1/10 xxl:w-1/12 cursor-move"
            @delete-image="deleteImage"
            @show-image="showImage"
          />
        </transition-group>
      </draggable>
    </div>
    <div class="flex justify-center align-center pt-6">
      <div v-if="loading" id="loading"></div>
    </div>
    <c-modal :showing="showLightBox" @close="showLightBox = false">
      <div class="bg-black w-full">
        <a
          @click.prevent="previous"
          class="absolute text-white text-5xl rounded-full left-arrow disabled:opacity-75 cursor-pointer"
          :disabled="this.activeImage.index < 1"
          :class="{'cursor-not-allowed': this.activeImage.index < 1}"
        >
          <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
        </a>
        <img
          v-if="showLightBox"
          :src="this.activeImage.url"
          :alt="this.imagesList[this.activeImage.index].title"
          class="object-cover w-full"
        />

        <a
          @click.prevent="next"
          class="absolute text-white text-5xl rounded-full right-arrow cursor-pointer"
        >
          <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
        </a>
      </div>
    </c-modal>
  </div>
</template>

<script src="./home.js">
</script>
<style lang="css" scoped src="./home.css">
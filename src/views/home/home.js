const CImage = () => import("@/components/CImage");
const CModal = () => import("@/components/CModal");
const draggable = () => import("vuedraggable");


const components = {
  CImage,
  CModal,
  draggable
}

const methods = {
  /**
   * Store some string to localStorage
   * @param {String} key 
   * @param {String} value 
   */
  setToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  },

  /**
   * Get value from localStorage by key
   * @param {String} key 
   */
  getFromLocalStorage(key) {
    return localStorage.getItem(key) || "";
  },

  /**
   * Generate URL for the image
   * @param {Number} index 
   */
  generateUrl(index) {
    let image = this.imagesList[index];
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
  },
  /**
   * Move to next image
   */
  next() {
    this.activeImage.index += 1;
    this.activeImage.url = this.generateUrl(this.activeImage.index);
  },
  /**
   * Move to previous image
   */
  previous() {
    if (this.activeImage.index == 0) return;
    this.activeImage.index += 1;
    this.activeImage.url = this.generateUrl(this.activeImage.index);
  },

  /**
   * Load More images 
   */
  loadMore() {

    this.page += 1;
    const params = {
      tags: this.search_term,
      tag_mode: "all",
      page: this.page,
      per_page: this.size
    };

    this.loading = true;
    this.$store.dispatch("images/loadMore", params).then(() => {
      this.loading = false;
    });
  },
  /**
   * Initial Image load
   */
  loadImages() {
    const params = {
      tags: this.search_term,
      tag_mode: "all",
      per_page: this.size,
      page: this.page
    };
    this.loading = true;
    this.$store.dispatch("images/load", params).then(() => {
      this.loading = false;
    });
  },
  /**
   * Delete image by index
   * @param {Number} index 
   */
  deleteImage(index) {
    this.$store.dispatch("images/deleteImage", index);
  },

  /**
   * Show image on click
   * @param {Object} data 
   */
  showImage(data) {
    this.activeImage = data;
    this.showLightBox = true;
  },

  /**
   * Search for an image
   */
  search() {
    const term = this.search_term;
    this.setToLocalStorage("search_term", term);
    this.page = 1;
    this.loadImages();
  },

  keyboardHandler(e) {
    if (!this.showLightBox) return;
    const { key } = e;
    if (key == 'ArrowRight') {
      this.next();
    }
    if (key == 'ArrowLeft') {
      this.previous();
    }
  }
}
const computed = {
  /**
   * Image list from the store
   */
  imagesList: {
    get() {
      return _.cloneDeep(this.$store.state.images.cached);
    },
    set(value) {
      this.$store.dispatch("images/drag", value);
    }
  }
}




const data = () => {
  return {
    page: 1,
    size: 100,
    loading: false,
    showLightBox: false,
    activeImage: {
      index: null,
      url: null
    },
    search_term: ""

  };
};

export default {
  name: 'home',
  components,
  computed,
  methods,
  data,
  mounted() {
    this.search_term = this.getFromLocalStorage("search_term");

    if (this.search_term !== '') {

      this.loadImages();
    }

    window.addEventListener("keydown", this.keyboardHandler);
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyboardHandler);
  },
}
const components = {

}

const methods = {
  /**
   * Set a no-image placeholder when the image doesn't exist on server 
   * @param {event} event 
   */
  noImage(event) {
    event.target.src = "no_image.jpg";
  },

  /**
   * Map friendly size names to flicker sizes
   * @param {String} size 
   */
  mapSizes(size) {
    return this.sizes[size] || sizes["small"];
  },

  /**
   * Create an image url from flicker image object
   * @param {Object} image 
   * @param {String} size 
   */
  createImageUrl(image, size = "small") {
    size = this.mapSizes(size);

    if (size === 'o') {
      return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
    }
    return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_${size}.jpg`;
  },

  /**
   * Rotate the image by 90 Degree
   */
  rotate() {
    this.rotation = (this.rotation + 90) % 360

  },
  /**
   * Delete the image from the list 
   */
  deleteItem() {
    this.$emit('delete-image', this.index);
    this.show_actions = false;
  },

  show() {
    this.$emit('show-image', {
      index: this.index,
      url: this.createImageUrl(this.item, 'original')
    })
    this.show_actions = false;
  }
}
const computed = {
  /**
   * Computed style object for image rotation operation
   */
  rotationObject() {

    return {
      'transform': `rotate(${this.rotation}deg)`
    };
  }
}

const filters = {

}

const created = () => {

}
const mounted = () => {

}


const data = () => {
  return {
    sizes: {
      xsmall: 't',
      small: "q",
      medium: "n",
      large: "z",
      xlarge: "b",
      original: 'o'
    },
    show_actions: false,
    rotation: 0,

  };
};

const props = {
  item: {
    type: Object,
    required: true,
    default: () => { }
  },
  index: {
    type: Number,
    required: true,
  }
}
export default {
  name: 'CImage',
  props,
  components,
  computed,
  filters,
  methods,
  data,
  created,
  mounted,
}
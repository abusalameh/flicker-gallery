
const methods = {

  close() {
    this.$emit('close');
  },
  handleEscapeKey(e) {
    const { key } = e;
    console.log(e);
    if (key === 'Escape') {
      this.close();
    }
  }

}

const watch = {
  showing(value) {
    if (value) {
      return document.querySelector('body').classList.add('overflow-hidden');
    }

    document.querySelector('body').classList.remove('overflow-hidden');
  }
};
const data = () => {
  return {
  };
};

const props = {
  showing: {
    required: true,
    type: Boolean
  }
}
export default {
  name: 'CModal',
  props,
  watch,
  methods,
  data,
  mounted() {
    window.addEventListener("keydown", this.handleEscapeKey);
  },
  destroyed() {
    window.addEventListener("keydown", this.handleEscapeKey);
  }
}
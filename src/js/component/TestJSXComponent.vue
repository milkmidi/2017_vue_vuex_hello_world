<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
class InnerComponent extends Vue {
  time = '';
  mounted() {
    this.time = '123456';
  }
  click() {
    this.time = Date.now().toString();
    console.log(123);
  }
  render() {
    return (
      <div class="inner-component">
        <p>InnerComponent</p>
        <p>{this.time}</p>
        <button class="btn btn-primary" onClick={this.click}>InnerComponent Button</button>
      </div>
    );
  }
}

export default {
  functional: true,
  data: () => ({
    myVar: 'TestJSXScene',
  }),
  methods: {
    clickHandler() {
      this.myVar = Date.now().toString();
    },
  },
  components: {
    InnerComponent,
  },
  render(h, context) {
    console.log(context);
    return (
      <div class="test-jsx-root">
        <h1>Hi JSX</h1>
        <button >JSXClick</button>
        <p>myVar:{context.data.myVar}</p>
        <InnerComponent />
      </div>
    );
  },
};
</script>

<style lang="stylus">
  .test-jsx-root
    background-color red
  
  .inner-component
    background-color white
    border 2px solid black
</style>

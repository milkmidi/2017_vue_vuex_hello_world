<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
class InnerComponent extends Vue {
  time = "";
  mounted(){
    this.time = "123456";
  }
  click(){
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
  data() {
    return {
      myVar: 'TestJSXScene',
    };
  },
  methods: {
    clickHandler() {
      this.myVar = Date.now().toString();
    },
  },
  components: {
    InnerComponent,
  },
  render() {
    return (
      <div class="test-jsx-root">
        <h1>Hi JSX</h1>
        <button onClick={this.clickHandler}>JSXClick</button>
        <p>{this.myVar}</p>
        <InnerComponent></InnerComponent>
      </div>
    );
  },
};
</script>

<style lang="stylus">
  .test-jsx-root
    background-color red
</style>

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

const Foo = ({ props }) => <div class='foo'>props:{JSON.stringify(props)}</div>;

export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    myVar: 'TestJSXScene',
  }),

  methods: {
    clickHandler() {
      this.myVar = Date.now().toString();
    },
  },
  mounted() {
    console.log('mounted');
  },
  components: {
    InnerComponent,
    Foo,
  },
  render() {
    if (!this.show) {
      return null;
    }
    const f = {
      props: {
        name: 'milkmidi',
        age: 18,
      },
    };
    // not work
    const b = {
      name: 'fff',
      age: 99,
    };
    // .box(v-demo:foo.a.b="message") box
    const directives = [
      {
        name: 'demo', value: '我是directives', arg: 1, modifiers: { a: true, b: true },
      },
    ];
    return (
      <div class="test-jsx-root">
        <h1>Hi JSX</h1>
        <button >JSXClick</button>
        <div {...{ directives }}></div>
        <p>myVar:{this.myVar}</p>
        <InnerComponent />
        <Foo {...{ props: b }}/>
      </div>
    );
  },
};
</script>

<style lang="stylus" scoped>
  .test-jsx-root
    background-color alpha(red,0.4)
    border 2px solid black
  
  .inner-component
    background-color white
    border 2px solid black
  .foo
    background-color #aabbcc
</style>

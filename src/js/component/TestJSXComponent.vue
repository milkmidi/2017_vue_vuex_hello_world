<script>

const AComponent = () => <h1>Hello World</h1>;
const BComponent = ({ props, listeners }) => <div onClick={listeners.click}>{props.msg}<AComponent /></div>;

export default {
  functional: true,
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
    BComponent,
  },
  render() {
    return (
      <div class="test-jsx-root">
        <h1>Hi JSX</h1>
        <h2>1</h2>
        <button >JSXClick</button>
        <p>myVar:{this.myVar}</p>
        <AComponent msg={'message'} />
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

import Vue from 'vue';
import Spinner from '~/components/Common/Spinner';

const Index = {
  install(Vue, options) {
    const Component = Vue.extend({
      render: h => h(Spinner, {
        props: {
          options,
        },
        ref: 'Spinner',
      }),
    });
    const Node = new Component().$mount();
    document.body.appendChild(Node.$el);
    Vue.prototype.$spinner = Node.$refs.Spinner;
    Vue.$spinner = Vue.prototype.$spinner;
  },
};

Vue.use(Index);

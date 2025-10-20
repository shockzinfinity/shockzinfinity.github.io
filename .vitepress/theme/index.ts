// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'viewerjs/dist/viewer.min.css';
import imageViewer from 'vitepress-plugin-image-viewer';
import vImageViewer from 'vitepress-plugin-image-viewer/lib/vImageViewer.vue';
import { useRoute } from 'vitepress';
import googleAnalytics from 'vitepress-plugin-google-analytics';
import VueKonva from 'vue-konva';

// Import components
import Disqus from './components/Disqus.vue';
import TagList from './components/TagList.vue';
import TagLinks from './components/TagLinks.vue';
import RecentPosts from './components/RecentPosts.vue';
import DateDisplay from './components/DateDisplay.vue';
import DemoComponent from './components/demo-component.vue';
import OtherComponent from './components/OtherComponent.vue';
import FooBar from './components/Foo/Bar.vue';
import KonvaTest from './components/KonvaTest.vue';
import KonvaTest2 from './components/KonvaTest2.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => h(DateDisplay),
      'doc-after': () => h(Disqus)
    })
  },
  enhanceApp(ctx) {
    // extends: DefaultTheme을 사용하므로 DefaultTheme.enhanceApp 호출 불필요

    // Register VueKonva plugin
    ctx.app.use(VueKonva);

    // Register global components
    ctx.app.component('vImageViewer', vImageViewer);
    ctx.app.component('TagList', TagList);
    ctx.app.component('TagLinks', TagLinks);
    ctx.app.component('RecentPosts', RecentPosts);
    ctx.app.component('DateDisplay', DateDisplay);
    ctx.app.component('DemoComponent', DemoComponent);
    ctx.app.component('demo-component', DemoComponent);
    ctx.app.component('OtherComponent', OtherComponent);
    ctx.app.component('FooBar', FooBar);
    ctx.app.component('Foo-Bar', FooBar);
    ctx.app.component('KonvaTest', KonvaTest);
    ctx.app.component('KonvaTest2', KonvaTest2);

    // Initialize Google Analytics
    googleAnalytics({
      id: 'G-MM4TDVZJ85'
    });
  },
  setup() {
    const route = useRoute();
    imageViewer(route);
  }
} satisfies Theme

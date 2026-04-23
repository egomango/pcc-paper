import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';

function remarkDecomposition() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && node.name === 'decomposition') {
        node.data ||= {};
        node.data.hName = 'div';
        node.data.hProperties = {
          class: 'decomposition',
          role: 'note',
          'aria-label': 'Switching cost decomposition',
        };
      }
    });
  };
}

export default defineConfig({
  site: 'https://pcc-paper.prozensky.com',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  markdown: {
    remarkPlugins: [remarkDirective, remarkDecomposition],
  },
});

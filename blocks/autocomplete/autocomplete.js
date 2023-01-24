import { createOptimizedPicture } from '../../scripts/lib-franklin.js';
import  '../../scripts/lib-algoliasearch.js';
import '../../scripts/lib-autocomplete.js';

export default function decorate(block) {
  const algoliasearch = window['algoliasearch'];
  const { autocomplete, getAlgoliaResults } = window['@algolia/autocomplete-js'];
  const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
  );
  const autocompleteSearch = autocomplete({
    container: block,
    getSources() {
      return [
        {
          sourceId: 'querySuggestions',
          getItemInputValue: ({ item }) => item.query,
          getItems({ query }) {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'instant_search_demo_query_suggestions',
                  query,
                  params: {
                    hitsPerPage: 4,
                  },
                },
              ],
            });
          },
          templates: {
            item({ item, components }) {
              return components.ReverseHighlight({ hit: item, attribute: 'query' });
            },
          },
        },
      ];
    },
  });
}

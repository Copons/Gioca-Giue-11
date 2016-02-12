import { qs } from '../utilities/helpers';
import modal from '../utilities/modal';

const article = qs('.gg-article');

// Binds a modal to links contained in the article (where applicable).
modal('a', article);

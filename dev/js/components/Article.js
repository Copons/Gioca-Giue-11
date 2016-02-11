import { qs, qsa, listen, delegate } from '../utilities/helpers';
import modal from '../utilities/modal';

export default class Article {

  constructor() {
    this.article = qs('.gg-article');

    modal('a', this.article);
  }

}

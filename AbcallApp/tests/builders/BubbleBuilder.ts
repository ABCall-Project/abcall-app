import {Bubble} from '@components/Chat/Messages/Message';
import BaseBuilder from './BaseBuilder';

class BubbleBuilder extends BaseBuilder<Bubble> {
  constructor() {
    super();
    this.element.id = 'e8b8a5d2-0f71-4e4d-b6e3-9c9d64f9cdda';
    this.element.request = false;
    this.element.response = true;
    this.element.message = 'Hello, how can I help you?';
  }
}

export default BubbleBuilder;

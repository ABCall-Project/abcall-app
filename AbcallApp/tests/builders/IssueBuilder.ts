import BaseBuilder from './BaseBuilder';
import {Issue} from '@models/Issue';
import { Status } from '@utils/constants/Status';

class IssueBuilder extends BaseBuilder<Issue> {
  constructor() {
    super();
    this.element.id = 'e8b8a5d2-0f71-4e4d-b6e3-9c9d64f9cdda';
    this.element.authUserId= 'e8b8a5d2-0f71-4e4d-b6e3-9c9d64f9cdda';
    this.element.status = Status.CREATED;
    this.element.subject = 'Test subject';
    this.element.description = 'Test description';
    this.element.createdAt = '2021-01-01T00:00:00Z';
    this.element.closedAt = '2021-01-01T00:00:00Z';
    this.element.channelPlanId = 'e8b8a5d2-0f71-4e4d-b6e3-9c9d64f9cdda';
  }
}

export default IssueBuilder;

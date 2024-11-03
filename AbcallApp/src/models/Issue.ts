import {Status} from '@utils/constants/Status';

class Issue {
  id: string;
  authUserId: string;
  status: Status;
  subject: string;
  description: string;
  createdAt: string;
  closedAt: string;
  channelPlanId: string;

  constructor(
    id: string,
    authUserId: string,
    status: Status,
    subject: string,
    description: string,
    createdAt: string,
    closedAt: string,
    channelPlanId: string,
  ) {
    this.id = id;
    this.authUserId = authUserId;
    this.status = status;
    this.subject = subject;
    this.description = description;
    this.createdAt = createdAt;
    this.closedAt = closedAt;
    this.channelPlanId = channelPlanId;
  }
}

export {Issue};

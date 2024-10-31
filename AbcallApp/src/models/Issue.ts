import {Status} from '@utils/constants/Status';

class Issue {
  constructor(
    public id: string,
    public authUserId: string,
    public status: Status,
    public subject: string,
    public description: string,
    public createdAt: string,
    public closedAt: string,
    public channelPlanId: string,
  ) {}
}

export {Issue};

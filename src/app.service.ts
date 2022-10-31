import { Injectable } from '@nestjs/common';
import {Cron, SchedulerRegistry} from "@nestjs/schedule";
import {CronJob} from "cron";

@Injectable()
export class AppService {

  constructor(private scheduler: SchedulerRegistry) {
    this.createCronjobManually();
  }

  @Cron('* * * * * *')
  cronErrorCatched() {
    throw new Error('This error is catched by nestjs since fix in commit: https://github.com/nestjs/schedule/commit/0cdfe8fa0a8b9b5132ecf32692ffe58fa7f229b6')
  }

  cronErrorUncatched() {
    throw new Error('Not catched...');
  }

  private createCronjobManually() {
    const job = new CronJob('* * * * * *', this.cronErrorUncatched.bind(this));
    this.scheduler.addCronJob('notCatchedJob', job);
    job.start();
  }
}

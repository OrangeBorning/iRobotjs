
/**
 * name: Robot
 * @class Robot
 */
const chalk = require('chalk')
const schedule = require('node-schedule');
const request = require("request");

class Robot {
  constructor(name, schedule) {
    this.name = name || Robot.name
    this.schedule = schedule || []
  }

  when(time) {
    this.time = time
    return this
  }

  do(something) {
    this.schedule.push({
      time: this.time,
      task: something
    })
    return this
  }

  setWebHook(webhook){
    this.webhook = webhook
  }

  start() {
    const url = this.webhook
    if(!this.webhook) {
      console.log(chalk.red(`🤖️ ${this.name} need webhook \n`))
      return
    }
    console.log(chalk.green(`🤖️ ${this.name} start \n`))
    this.schedule.forEach(item => {
      schedule.scheduleJob(
        item.time,
        () => {
          request({
            url: url,
            method: "POST",
            json: true,
            headers: {
              "content-type": "application/json",
            },
            body: item.task
          }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.dir(body)
            }
          });
        }
      );
    })
  }

}


exports.default = Robot
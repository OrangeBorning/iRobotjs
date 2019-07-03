const Robot = require('../index').default;

const moment = require('moment');
function momentFormat(time, template) {
  return moment(time).format(template || 'YYYY年MM月DD日 HH:mm:ss')
}

const Atom = new Robot('Atom')
Atom.setWebHook('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=*********')
Atom
  .when({ hour: 18, minute: 05, dayOfWeek: [0, 1, 2, 3, 4] })
  .do(
    {
      msgtype: "text",
      text: {
        content: `随便写写`
      }
    }
  )
  .start()


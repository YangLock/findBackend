const model = require('./model');
let findGood = model.findGood;
let findPerson = model.findPerson;
let userInfo = model.userInfo;
let goodCom = model.goodCom;
let personCom = model.personCom;
/**
 * 将实现接口需要的逻辑单独写成了几个函数，在接口文件中直接调用应该就可以
 */
module.exports = {
  deleteRecordFromGood: (id) => {
    (async() => {
      var find_goods = await findGood.findAll({
        where: {
          good_id: id
        }
      });
      await find_goods.destroy();
    })();
  },
  deleteRecordFromPerson: (id) => {
    (async() => {
      var find_people = await findPerson.findAll({
        where: {
          good_id: id
        }
      });
      await find_people.destroy();
    })();
  },
  confirmRecordFromGood: (id) => {
    (async() => {
      var find_goods = await findGood.findAll({
        where: {
          good_id: id
        }
      });
      find_goods.stateof = 'found';
      await find_goods.save();
    })();
    return find_goods;
  },
  confirmRecordFromPerson: (id) => {
    (async() => {
      var find_people = await findPerson.findAll({
        where: {
          good_id: id
        }
      });
      find_people.stateof = 'claimed';
      await find_people.save();
    })();
    return find_people;
  },
  reeditRecordFromGood: (id) => {
    (async() => {
      var find_goods = await findGood.findAll({
        where: {
          good_id: id
        }
      });
      var user = await userInfo.findAll({
        where: {
          user_id: find_people.deliver
        }
      });
      const {
        pictures,
        title,
        type,
        who,
        place,
        describe,
        tel,
        wechat,
        qq
      } = ctx.request.body;
      find_goods.good_title = title;
      find_goods.find_place = place;
      find_goods.detail = describe;
      find_goods.typeof = type;
      find_goods.deliver_time = new Date();
      find_goods.p1 = pictures[0];
      find_goods.p2 = pictures[1];
      find_goods.p3 = pictures[2];
      find_goods.p4 = pictures[3];
      find_goods.p5 = pictures[4];
      find_goods.p6 = pictures[5];
      find_goods.p7 = pictures[6];
      find_goods.p8 = pictures[7];

      user.user_name = who;
      user.tel_num = tel;
      user.wechat_num = wechat;
      user.qq_num = qq;
      await find_people.save();
      await user.save();
    })();
    return {
      find_goods,
      user
    };
  },
  reeditRecordFromPerson: (id) => {
    (async() => {
      var find_people = await findPerson.findAll({
        where: {
          good_id: id
        }
      });
      var user = await userInfo.findAll({
        where: {
          user_id: find_people.deliver
        }
      });
      const {
        pictures,
        title,
        type,
        who,
        place,
        describe,
        tel,
        wechat,
        qq
      } = ctx.request.body;
      find_people.good_title = title;
      find_people.find_place = place;
      find_people.detail = describe;
      find_people.typeof = type;
      find_people.deliver_time = new Date();
      find_people.p1 = pictures[0];
      find_people.p2 = pictures[1];
      find_people.p3 = pictures[2];
      find_people.p4 = pictures[3];
      find_people.p5 = pictures[4];
      find_people.p6 = pictures[5];
      find_people.p7 = pictures[6];
      find_people.p8 = pictures[7];

      user.user_name = who;
      user.tel_num = tel;
      user.wechat_num = wechat;
      user.qq_num = qq;
      await find_people.save();
      await user.save();
    })();
    return {
      find_people,
      user
    };
  },
  editUserInfo: (id) => {
    (async() => {
      var userinfo = await userInfo.findAll({
        where: {
          user_id: id
        }
      });
      const {
        avatar,
        userID,
        userName,
        wechat,
        tel,
        qq
      } = ctx.request.body;
      userinfo.user_avatar = avatar;
      userinfo.user_id = userID;
      userinfo.user_name = userName;
      userinfo.wechat_num = wechat;
      userinfo.tel_num = tel;
      userinfo.qq_num = qq;
      await userinfo.save();
    })();
    return userinfo;
  },
  refreshFromGood: (id) => {
    (async() => {
      var find_goods = await find_goods.findAll({
        where: {
          good_id: id
        }
      });
      find_goods.deliver_time = new Date();
      await find_goods.save();
    })();
    return find_goods;
  },
  refreshFromPerson: (id) => {
    (async() => {
      var find_people = await find_people.findAll({
        where: {
          good_id: id
        }
      });
      find_people.deliver_time = new Date();
      await find_people.save();
    })();
    return find_people;
  },
  releaseGoods: (user_id) => {
    (async() => {
      const {
        deliver,
        good_id,
        pictures,
        title,
        type,
        who,
        place,
        describe,
        tel,
        wechat,
        qq
      } = ctx.request.body;
      var find_good = await userInfor.findAll({
        where: {
          user_id: user_id
        }
      });
      if (tel==''){
        tel = find_good[0].tel;
      }
      if (qq == '') {
        qq = find_good[0].qq;
      }
      if (wechat == '') {
        wechat = find_good[0].wechat;
      }

      var time = new Date();
      var good = await findGood.create({
        good_id: good_id,
        deliver: deliver,
        good_title: title,
        find_place: place,
        detail: describe,
        typeof: type,
        deliver_time: time,
        p1: pictures[0],
        p2: pictures[1],
        p3: pictures[2],
        p4: pictures[3],
        p5: pictures[4],
        p6: pictures[5],
        p7: pictures[6],
        p8: pictures[7],
        createdAt: now,
        updatedAt: now,
        version: 0
      });
      console.log('created: ' + JSON.stringify(good));
    })();
  },
  releasePersons: (user_id) => {
    (async() => {
      const {
        deliver,
        good_id,
        pictures,
        title,
        type,
        who,
        place,
        describe,
        tel,
        wechat,
        qq
      } = ctx.request.body;

      var find_people = await userInfor.findAll({
        where: {
          user_id: user_id
        }
      });
      if (tel == '') {
        tel = find_people[0].tel;
      }
      if (qq == '') {
        qq = find_people[0].qq;
      }
      if (wechat == '') {
        wechat = find_people[0].wechat;
      }
      var time = new Date();
      var good = await findPerson.create({
        good_id: good_id,
        deliver: deliver,
        good_title: title,
        find_place: place,
        detail: describe,
        typeof: type,
        deliver_time: time,
        p1: pictures[0],
        p2: pictures[1],
        p3: pictures[2],
        p4: pictures[3],
        p5: pictures[4],
        p6: pictures[5],
        p7: pictures[6],
        p8: pictures[7],
        createdAt: now,
        updatedAt: now,
        version: 0
      });
      console.log('created: ' + JSON.stringify(good));
    })();
  },
  releasemessages: () => {
    (async() => {
      const {
        com_id,
        com_time,
        com_detail,
        com_deliver,
        good_id,
      } = ctx.request.body;
      var time = new Date();
      var good = await findPerson.create({
        com_id: com_id,
        deliver: deliver,
        com_detail: com_detail,
        com_deliver: com_deliver,
        good_id: good_id,
        createdAt: now,
        updatedAt: now,
        version: 0
      });
      console.log('created: ' + JSON.stringify(good));
    })();
  },
  getfindgoods: (kind) => {
    (async() => {
      if (kind == "all") {
        findGood.findAll()
          .then(function(goods) {
            for (let good in goods) {
              console.log(JSON.stringify(good));
            }
          }).catch(function(err) {
            console.log(error);
          });
      } else {
        var goods = await findGood.findAll({
          where: {
            typeof: kind
          }
        });
        console.log(`find ${goods.length} goods:`);
        for (let good of goods) {
          console.log(JSON.stringify(good));
        }
      }
      return goods;
    })();
  },
  getfindpersons: (kind) => {
    (async() => {
      if (kind == "all") {
        var goods = await findPerson.findAll()
          .then(function(goods) {
            for (let good in goods) {
              console.log(JSON.stringify(good));
            }
          }).catch(function(err) {
            console.log(error);
          });
      } else {
        var goods = await findPerson.findAll({
          where: {
            typeof: kind
          }
        });
        console.log(`find ${goods.length} goods:`);
        for (let good of goods) {
          console.log(JSON.stringify(good));
        }
      }
      return goods;
    })();
  },
  getsearchgoods: (keyword) => {
    var string = keyword.split("");
    var arr = [];
    (async() => {
      var goods = await findGood.findAll()
        .then(function(goods) {
          for (let good in goods) {
            console.log(JSON.stringify(good));
          }
        }).catch(function(err) {
          console.log(error);
        });
      for (let good in goods) {
        if (compare(string, good.title.split(""))) {
          arr = arr.concat(good);
        }
      }
      return arr;
    })();
  },
  compare: function(string1, string2) {
    var len1 = string1.length;
    var len2 = string2.length;
    for (m in string2) {
      for (n in string1) {
        if (m == n) {
          return true;
        }
      }
    }
    return false;
  },
  getsearchpersons: (keyword) => {
    var string = keyword.split("");
    var arr = [];
    (async () => {
      var goods = await findPerson.findAll()
        .then(function (goods) {
          for (let good in goods) {
            console.log(JSON.stringify(good));
          }
        }).catch(function (err) {
          console.log(error);
        });
      for (let good in goods) {
        if (compare(string, good.title.split(""))) {
          arr = arr.concat(good);
        }
      }
      return arr;
    })();
  }

};
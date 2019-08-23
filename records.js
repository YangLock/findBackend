const model = require('./model');
let findGood = model.findGood;
let findPerson = model.findPerson;
let userInfor = model.userInfor;
let goodCom = model.goodCom;
let personCom = model.personCom;
let goodTemporary = model.goodTemporary;
let personTemporary = model.personTemporary;
/**
 * 将实现接口需要的逻辑单独写成了几个函数，在接口文件中直接调用应该就可以
 */
module.exports = {
  getuserinfor: (id) => {
    return (async () => {
      var get = await userInfor.findAll({
        where: {
          user_id: id
        }
      });
      //console.log(get);
      return get;
    })();
  },
  getuserfindgoods: (id) => {
    return (async () => {
      var get = await findGood.findAll({
        where: {
          deliver: id
        }
      });
      return get;
    })()
  },
  getuserfindperson: (id) => {
    return (async () => {
      var get = await findPerson.findAll({
        where: {
          deliver: id
        }
      });
      return get;
    })()
  },
  getmessage: (user_id) => {
    return (async () => {
      var findgood = await findGood.findAll({
        where: {
          deliver: user_id
        }
      });
      var findgoodid = new Array(findgood.length);
      var l = 0;
      for (l = 0; l < findgood.length; l++) {
        findgoodid[l] = findgood[l].good_id;
      }
      var findperson = await findPerson.findAll({
        where: {
          deliver: user_id
        }
      });
      var findpersonid = new Array(findperson.length);
      for (l = 0; l < findperson.length; l++) {
        findpersonid[l] = findperson[l].good_id;
      }
      var good_comment = await goodCom.findAll({
        where: {
          good_id: findgoodid
        }
      });
      var person_comment = await personCom.findAll({
        where: {
          good_id: findpersonid
        }
      });
      var com = new Array(good_comment.length + person_comment.length);
      var i = 0;
      for (i = 0; i < good_comment.length; i++) {
        com[i] = good_comment[i];
      }
      for (i = 0; i < person_comment.length; i++) {
        com[good_comment.length + i] = person_comment[i];
      }
      return com;
    })();
  },
  deleteRecordFromGood: (id) => {
    (async () => {
      var find_goods = await findGood.findAll({
        where: {
          good_id: id
        }
      });
      await find_goods.destroy();
    })();
  },
  deleteRecordFromPerson: (id) => {
    (async () => {
      var find_people = await findPerson.findAll({
        where: {
          good_id: id
        }
      });
      await find_people.destroy();
    })();
  },
  confirmRecordFromGood: (id) => {
    (async () => {
      var find_goods = await findGood.findAll({
        where: {
          good_id: id
        }
      });
      var now = Date.now();
      find_goods.stateof = 'true';
      find_goods.updatedAt = now;
      find_goods.version++;
      await find_goods.save();
    })();
    return find_goods;
  },
  confirmRecordFromPerson: (id) => {
    (async () => {
      var find_people = await findPerson.findAll({
        where: {
          good_id: id
        }
      });
      var now = Date.now();
      find_people.stateof = 'true';
      find_people.updatedAt = now;
      find_people.version++;
      await find_people.save();
    })();
    return find_people;
  },
  reeditRecordFromGood: (id) => {
    (async () => {
      var find_goods = await findGood.findAll({
        where: {
          good_id: id
        }
      });
      var good_temporary = await goodTemporary.findAll({
        where: {
          good_id: id
        }
      });
      var now = Date.now();
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
      find_goods.createdAt = now;
      find_goods.updatedAt = now;
      find_goods.version++;

      good_temporary.contacter = who;
      good_temporary.wechat_num = wechat;
      good_temporary.qq_num = qq;
      good_temporary.tel_num = tel;
      good_temporary.createdAt = now;
      good_temporary.updatedAt = now;
      good_temporary.version++;
      await find_people.save();
      await good_temporary.save();
    })();
    return {
      find_goods,
      good_temporary
    };
  },
  reeditRecordFromPerson: (id) => {
    (async () => {
      var find_people = await findPerson.findAll({
        where: {
          good_id: id
        }
      });
      var person_temporary = await personTemporary.findAll({
        where: {
          good_id: id
        }
      });
      var now = Date.now();
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
      find_people.createdAt = now;
      find_people.updatedAt = now;
      find_people.version++;

      person_temporary.contacter = who;
      person_temporary.wechat_num = wechat;
      person_temporary.qq_num = qq;
      person_temporary.tel_num = tel;
      person_temporary.createdAt = now;
      person_temporary.updatedAt = now;
      person_temporary.version++;
      await find_people.save();
      await person_temporary.save();
    })();
    return {
      find_people,
      person_temporary
    };
  },
  editUserInfo: (id) => {
    (async () => {
      var userinfo = await userInfor.findAll({
        where: {
          user_id: id
        }
      });
      var now = Date.now();
      const {
        userID,
        userAvatar,
        userName,
        wechat,
        tel,
        qq
      } = ctx.request.body;
      userinfo.user_id = userID;
      userinfo.user_avatar = userAvatar;
      userinfo.user_name = userName;
      userinfo.wechat_num = wechat;
      userinfo.tel_num = tel;
      userinfo.qq_num = qq;
      user.createdAt = now;
      user.updatedAt = now;
      user.version++;
      await userinfo.save();
    })();
    return userinfo;
  },
  refreshFromGood: (id) => {
    (async () => {
      var find_goods = await find_goods.findAll({
        where: {
          good_id: id
        }
      });
      var now = Date.now();
      find_goods.deliver_time = new Date();
      find_goods.updatedAt = now;
      await find_goods.save();
    })();
    return find_goods;
  },
  refreshFromPerson: (id) => {
    (async () => {
      var find_people = await find_people.findAll({
        where: {
          good_id: id
        }
      });
      var now = Date.now();
      find_people.deliver_time = new Date();
      find_people.updatedAt = now;
      await find_people.save();
    })();
    return find_people;
  },
  releaseGoods: () => {
    (async () => {
      var {
        deliver,
        good_id,
        pictures,
        title,
        type,
        place,
        describe,
        tel,
        wechat,
        qq,
        contacter
      } = ctx.request.body;

      var time = new Date();
      var now = Date.now();

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

      if (contacter || qq || tel || wechat) {
        var goodTemp = await goodTemporary.create({
          good_id: good_id,
          contacter: contacter,
          wechat_num: wechat,
          qq_num: qq,
          tel_num: tel,
          createdAt: now,
          updatedAt: now,
          version: 0
        });
        console.log('created: ' + JSON.stringify(goodTemp));
      }
    })();
  },
  releasePersons: () => {
    (async () => {
      var {
        deliver,
        good_id,
        pictures,
        title,
        type,
        place,
        describe,
        tel,
        wechat,
        qq,
        contacter
      } = ctx.request.body;

      var time = new Date();
      var now = Date.now();

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

      if (contacter || qq || tel || wechat) {
        var personTemp = await goodTemporary.create({
          good_id: good_id,
          contacter: contacter,
          wechat_num: wechat,
          qq_num: qq,
          tel_num: tel,
          createdAt: now,
          updatedAt: now,
          version: 0
        });
        console.log('created: ' + JSON.stringify(personTemp));
      }
    })();
  },
  releaseGoodmessages: () => {
    (async () => {
      var {
        com_id,
        com_detail,
        com_deliver,
        good_id,
      } = ctx.request.body;
      var time = new Date();
      var now = Date.now();
      var good = await goodCom.create({
        com_id: com_id,
        com_detail: com_detail,
        com_deliver: com_deliver,
        com_time: time,
        good_id: good_id,
        createdAt: now,
        updatedAt: now,
        version: 0
      });
      console.log('created: ' + JSON.stringify(good));
    })();
  },
  releasePersonmessages: () => {
    (async () => {
      var {
        com_id,
        com_detail,
        com_deliver,
        good_id,
      } = ctx.request.body;
      var time = new Date();
      var now = Date.now();
      var good = await personCom.create({
        com_id: com_id,
        com_detail: com_detail,
        com_deliver: com_deliver,
        com_time: time,
        good_id: good_id,
        createdAt: now,
        updatedAt: now,
        version: 0
      });
      console.log('created: ' + JSON.stringify(good));
    })();
  },
  getfindgoods: (kind) => {
    (async () => {
      if (kind == "all") {
       var goods= await findGood.findAll({
        where: {
          stateof:"false"
        }
       })
          .then(function (goods) {
            for (let good in goods) {
              console.log(JSON.stringify(good));
            }
          }).catch(function (err) {
            console.log(error);
          });
      } else {
        var goods = await findGood.findAll({
          where: {
            typeof: kind,
            stateof:"false"
          }
        });
        console.log(`find ${goods.length} goods:`);
        for (let good of goods) {
          console.log(JSON.stringify(good));
        }
      }
      for (g in goods) {
        var good_id = g.good_id;
        var deliver = g.deliver;
        var good1 = await goodTemporary.findAll({
          where: {
            good_id: good_id
          }
        });
        var good2 = await userInfor.findAll({
          where: {
            deliver: deliver
          }
        });
        if (good1[0].contacter == null) {
          g.user_name = good2[0].user_name;
        } else {
          g.user_name = contacter;
        }

        if (good1[0].wechat_num == null) {
          g.wechat_num = good2[0].wechat_num;
        } else {
          g.wechat_num = wechat_num;
        }

        if (good1[0].qq_num == null) {
          g.qq_num = good2[0].qq_num;
        } else {
          g.qq_num = qq_num;
        }

        if (good1[0].tel_num == null) {
          g.tel_num = good2[0].tel_num;
        } else {
          g.tel_num = tel_num;
        }

      }
      return goods;
    })();
  },
  getfindpersons: (kind) => {
    (async () => {
      if (kind == "all") {
        var goods = await findPerson.findAll({
          where: {
            stateof:"false"
          }
        })
          .then(function (goods) {
            for (let good in goods) {
              console.log(JSON.stringify(good));
            }
          }).catch(function (err) {
            console.log(error);
          });
      } else {
        var goods = await findPerson.findAll({
          where: {
            typeof: kind,
            stateof:"false"
          }
        });
        console.log(`find ${goods.length} goods:`);
        for (let good of goods) {
          console.log(JSON.stringify(good));
        }
      }

      for (g in goods) {
        var good_id = g.good_id;
        var deliver = g.deliver;
        var good1 = await goodTemporary.findAll({
          where: {
            good_id: good_id
          }
        });
        var good2 = await userInfor.findAll({
          where: {
            deliver: deliver
          }
        });
        if (good1[0].contacter == null) {
          g.user_name = good2[0].user_name;
        } else {
          g.user_name = contacter;
        }

        if (good1[0].wechat_num == null) {
          g.wechat_num = good2[0].wechat_num;
        } else {
          g.wechat_num = wechat_num;
        }

        if (good1[0].qq_num == null) {
          g.qq_num = good2[0].qq_num;
        } else {
          g.qq_num = qq_num;
        }

        if (good1[0].tel_num == null) {
          g.tel_num = good2[0].tel_num;
        } else {
          g.tel_num = tel_num;
        }

      }
      return goods;
    })();
  },
  getsearchgoods: (keyword) => {
    var string = keyword.split("");
    var arr = [];
    (async () => {
      var goods = await findGood.findAll({
        where: {
          stateof:"false"
        }
      })
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
      var goods = arr;
      for (g in goods) {
        var good_id = g.good_id;
        var deliver = g.deliver;
        var good1 = await goodTemporary.findAll({
          where: {
            good_id: good_id
          }
        });
        var good2 = await userInfor.findAll({
          where: {
            deliver: deliver
          }
        });
        if (good1[0].contacter == null) {
          g.user_name = good2[0].user_name;
        } else {
          g.user_name = contacter;
        }

        if (good1[0].wechat_num == null) {
          g.wechat_num = good2[0].wechat_num;
        } else {
          g.wechat_num = wechat_num;
        }

        if (good1[0].qq_num == null) {
          g.qq_num = good2[0].qq_num;
        } else {
          g.qq_num = qq_num;
        }

        if (good1[0].tel_num == null) {
          g.tel_num = good2[0].tel_num;
        } else {
          g.tel_num = tel_num;
        }

      }
      return goods;
    })();
  },
  compare: function (string1, string2) {
    //var len1 = string1.length;
    //var len2 = string2.length;
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
      var goods = await findPerson.findAll({
        where: {
          stateof:"false"
        }
      })
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
      var goods = arr;
      for (g in goods) {
        var good_id = g.good_id;
        var deliver = g.deliver;
        var good1 = await goodTemporary.findAll({
          where: {
            good_id: good_id
          }
        });
        var good2 = await userInfor.findAll({
          where: {
            deliver: deliver
          }
        });
        if (good1[0].contacter == null) {
          g.user_name = good2[0].user_name;
        } else {
          g.user_name = contacter;
        }

        if (good1[0].wechat_num == null) {
          g.wechat_num = good2[0].wechat_num;
        } else {
          g.wechat_num = wechat_num;
        }

        if (good1[0].qq_num == null) {
          g.qq_num = good2[0].qq_num;
        } else {
          g.qq_num = qq_num;
        }

        if (good1[0].tel_num == null) {
          g.tel_num = good2[0].tel_num;
        } else {
          g.tel_num = tel_num;
        }

      }
      return goods;
    })();
  },

  checkuser: (user_id, user_name, user_avatar) => {
    (async () => {
      var exist = await userInfor.findAll({
        where: {
          user_id: user_id
        }
      });
      if (exist.length == 0) {
        var newone = await userInfor.create({
          user_id: user_id,
          user_avatar: user_avatar,
          user_name: user_name,
          wechat_num: null,
          qq_num: null,
          tel_num: null
        })
      }
    })();
  }

};
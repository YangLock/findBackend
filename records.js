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
var compare=function(string1, string2) {
  var len1 = string1.length;
  var len2 = string2.length;
  for (m of string2) {
    for (n of string1) {
      if (m == n) {
        return true;
      }
    }
  }
  return false;
}
module.exports = {
  getuserinfor: (id) => {
    return (async () => {
      var get = await userInfor.findOne({
        where: {
          user_id: id
        }
      });
      //console.log(get);
      return get;
    })();
  },
  getuserfindgoods: (id) => {
    return (async() => {
      var goods=null;
        goods=await findGood.findAll({
          where:{
            deliver:id
          },
          order:[
            [
              'deliver_time', 'DESC'
            ]
          ]
        })
        .catch(function(err) {
          console.log(error);
        });
      var result=new Array();
        console.log(`find ${goods.length} goods:`);
        console.log(goods);
        for (let j in goods) {
          var goodcontact=await goodTemporary.findOne({
            where:{
              good_id:goods[j].good_id
            }
          })
          console.log(goodcontact);
          result[j]={
            createdAt: goods[j].createdAt,
            deliver: goods[j].deliver,
            deliver_time: goods[j].deliver_time,
            detail: goods[j].detail,
            good_id: goods[j].good_id,
            good_title: goods[j].good_title,
            lost_place: goods[j].lost_place,
            p1: goods[j].p1,
            p2: goods[j].p2,
            p3: goods[j].p3,
            p4: goods[j].p4,
            p5: goods[j].p5,
            p6: goods[j].p6,
            p7: goods[j].p7,
            p8: goods[j].p8,
            stateof: goods[j].stateof,
            typeof: goods[j].typeof,
            updatedAt: goods[j].updatedAt,
            version: goods[j].version,
            contacter:goodcontact.contacter
          }
        }
        console.log(result)
      return result;
    })();
  },
  getuserfindperson: (id) => {
    return (async() => {
      var goods=null;
        goods=await findPerson.findAll({
          where:{
            deliver:id
          },
          order:[
            [
              'deliver_time', 'DESC'
            ]
          ]
        })
        .catch(function(err) {
          console.log(error);
        });
      var result=new Array();
        console.log(`find ${goods.length} goods:`);
        for (let j in goods) {
          var goodcontact=await personTemporary.findOne({
            where:{
              good_id:goods[j].good_id
            }
          })
          result[j]={
            createdAt: goods[j].createdAt,
            deliver: goods[j].deliver,
            deliver_time: goods[j].deliver_time,
            detail: goods[j].detail,
            good_id: goods[j].good_id,
            good_title: goods[j].good_title,
            find_place: goods[j].find_place,
            p1: goods[j].p1,
            p2: goods[j].p2,
            p3: goods[j].p3,
            p4: goods[j].p4,
            p5: goods[j].p5,
            p6: goods[j].p6,
            p7: goods[j].p7,
            p8: goods[j].p8,
            stateof: goods[j].stateof,
            typeof: goods[j].typeof,
            updatedAt: goods[j].updatedAt,
            version: goods[j].version,
            contacter:goodcontact.contacter
          }
        }
        console.log(result)
      return result;
    })();
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
      var j=0;
      for (i = 0; i < good_comment.length; i++) {
        com[i] = good_comment[i];
      }
      for (i = 0; i < person_comment.length; i++) {
        com[good_comment.length + i] = person_comment[i];
      }
      var result=new Array();
      if(com.length!=0){
        for(i=0;i<com.length;i++){
          for(j=0;j<i;j++){
            console.log(com[i].createdAt);
            if(com[i].createdAt>com[j].createdAt){
              var tem=com[i];
              com[i]=com[j];
              com[j]=tem;
            }
          }
        }
      }
      for(let k in com){
        var deli=await userInfor.findOne({
          where:{
            user_id:com[k].com_deliver
          }
        })
        console.log(deli);
          result[k]={
          good_id:com[k].good_id,
          com_id:com[k].com_id,
          com_time: com[k].com_time,
          com_detail: com[k].com_detail,
          com_deliver: com[k].com_deliver,
          deliver_ava:deli.user_avatar,
          deliver_name:deli.user_name
        }
      }
      return result;
    })();
  },
  deleteRecordFromGood: (id) => {
    (async () => {
      var good_tem = await goodTemporary.findOne({
        where: {
          good_id: id
        }
      });
      var find_goods = await findGood.findOne({
        where: {
          good_id: id
        }
      });
      good_tem.destroy().then(find_goods.destroy());
    })();
  },
  deleteRecordFromPerson: (id) => {
    (async () => {
      var good_tem = await personTemporary.findOne({
        where: {
          good_id: id
        }
      });
      var find_people = await findPerson.findOne({
        where: {
          good_id: id
        }
      });
      good_tem.destroy().then(find_people.destroy());
    })();
  },
  confirmRecordFromGood: (id) => {
    return (async () => {
      var find_goods=await findGood.findOne({
        where:{
          good_id:id
        }
      });
      console.log(find_goods);
      var now = Date.now();
      find_goods.stateof = true;
      find_goods.updatedAt = now;
      find_goods.version++;
      await find_goods.save();
      return find_goods;
    })();
  },
  confirmRecordFromPerson: (id) => {
    return (async () => {
      var find_people=await findPerson.findOne({
        where:{
          good_id:id
        }
      });
      var now = Date.now();
      find_people.stateof = true;
      find_people.updatedAt = now;
      find_people.version++;
      await find_people.save();
      return find_people;
    })();
  },
  reeditRecordFromGood: (id,ctx) => {
    return (async () => {
      var find_goods = await findGood.findOne({
        where: {
          good_id: id
        }
      });
      var good_temporary = await goodTemporary.findOne({
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
      console.log(ctx.request.body);
      find_goods.good_title = title;
      find_goods.lost_place = place;
      find_goods.detail = describe;
      find_goods.typeof = type;
      find_goods.deliver_time = new Date();
      find_goods.p1 = pictures[0].path_server;
      find_goods.p2 = pictures[1].path_server;
      find_goods.p3 = pictures[2].path_server;
      find_goods.p4 = pictures[3].path_server;
      find_goods.p5 = pictures[4].path_server;
      find_goods.p6 = pictures[5].path_server;
      find_goods.p7 = pictures[6].path_server;
      find_goods.p8 = pictures[7].path_server;
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
      await find_goods.save();
      await good_temporary.save();
      return {
        find_goods,
        good_temporary
      };
    })();
  },
  reeditRecordFromPerson: (id,ctx) => {
    return (async () => {
      var find_people = await findPerson.findOne({
        where: {
          good_id: id
        }
      });
      var person_temporary = await personTemporary.findOne({
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
      find_people.p1 = pictures[0].path_server;
      find_people.p2 = pictures[1].path_server;
      find_people.p3 = pictures[2].path_server;
      find_people.p4 = pictures[3].path_server;
      find_people.p5 = pictures[4].path_server;
      find_people.p6 = pictures[5].path_server;
      find_people.p7 = pictures[6].path_server;
      find_people.p8 = pictures[7].path_server;
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
      return {
        find_people,
        person_temporary
      };
    })();
  },
  editUserInfo: (id,ctx) => {
    return (async () => {
      var userinfo = await userInfor.findOne({
        where: {
          user_id: id
        }
      });
      var now = Date.now();
      const {
        userID,
        userAva,
        userName,
        weChat,
        telNum,
        qqNum
      } = ctx.request.body;
      userinfo.user_id = userID;
      userinfo.user_avatar = userAva;
      userinfo.user_name = userName;
      userinfo.wechat_num = weChat;
      userinfo.tel_num = telNum;
      userinfo.qq_num = qqNum;
      userinfo.createdAt = now;
      userinfo.updatedAt = now;
      userinfo.version++;
      await userinfo.save();
      return userinfo;
    })();
  },
  refreshFromGood: (id) => {
    return (async () => {
      var find_goods = await findGood.findOne({
        where: {
          good_id: id
        }
      });
      var now = Date.now();
      find_goods.deliver_time = new Date();
      find_goods.updatedAt = now;
      await find_goods.save();
      return find_goods;
    })();
  },
  refreshFromPerson: (id) => {
    return (async () => {
      var find_people = await findPerson.findOne({
        where: {
          good_id: id
        }
      });
      var now = Date.now();
      find_people.deliver_time = new Date();
      find_people.updatedAt = now;
      await find_people.save();
      return find_people;
    })();
  },
  releaseGoods: (good) => {
    (async() => {
      console.log(good);
      var good1 = await findGood.create({
        good_id: good.good_id,
        deliver: good.deliver,
        good_title: good.title, 
        lost_place: good.place,
        detail: good.describe,
        typeof: good.type,
        stateof:false,
        deliver_time: good.time,
        p1: good.pictures[0].path_server,
        p2: good.pictures[1].path_server,
        p3: good.pictures[2].path_server,
        p4: good.pictures[3].path_server,
        p5: good.pictures[4].path_server,
        p6: good.pictures[5].path_server,
        p7: good.pictures[6].path_server,
        p8: good.pictures[7].path_server
      });
      console.log('created: ' + JSON.stringify(good1));
      var good2=await goodTemporary.create({
        good_id: good.good_id,
      contacter: good.who,
      wechat_num: good.wechat,
      qq_num:  good.qq,
      tel_num: good.tel,
      })
      console.log('created: ' + JSON.stringify(good2));
    })();
  },
  releasePersons: (good) => {
    (async() => {
      var good1 = await findPerson.create({
        good_id: good.good_id,
        deliver: good.deliver,
        good_title: good.title, 
        find_place: good.place,
        detail: good.describe,
        typeof: good.type,
        deliver_time: good.time,
        stateof:false,
        p1: good.pictures[0].path_server,
        p2: good.pictures[1].path_server,
        p3: good.pictures[2].path_server,
        p4: good.pictures[3].path_server,
        p5: good.pictures[4].path_server,
        p6: good.pictures[5].path_server,
        p7: good.pictures[6].path_server,
        p8: good.pictures[7].path_server
      });
      console.log('created: ' + JSON.stringify(good1));
      var good2=await personTemporary.create({
      good_id: good.good_id,
      contacter: good.who,
      wechat_num: good.wechat,
      qq_num:  good.qq,
      tel_num: good.tel,
      })
      console.log('created: ' + JSON.stringify(good2));
    })();
  },
  releaseGoodmessages: (ctx) => {
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
  releasePersonmessages: (ctx) => {
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

  getgoodCom: (good_id) => {
    return (async () => {
      var mes = [];
      console.log('------------------sadsad-------------')
      console.log(good_id)
      mes = await goodCom.findAll({
      where: {
      good_id: good_id
      },
      order: [
      [
      'com_time', 'DESC'
      ]
      ]
      })
      .catch(function (err) {
      console.log(err);
      });
      // console.log('------------------sadsad-------------')
      // console.log(mes)
      var photo = [];
      let result = [];
      for (let m of mes) {
      let obj = m.get({ plain: true });
      result.push(obj);
      photo = await userInfor.findAll({
      where: {
      user_id: m.com_deliver
      }
      })
      obj['userPhoto'] = photo[0].user_avatar;
      obj['user_name'] = photo[0].user_name;
      console.log('--------------------'+obj.userPhoto)
      console.log('--------------------'+photo[0].user_name)
      // console.log('------------------sa-------------')
      // console.log(photo)
      // console.log('------------------ssad-------------')
      // console.log(m)
      }
      console.log(result)
      return result;
      })();
  },

  getpersonCom: (good_id) => {
    return (async () => {
      var mes = [];
      console.log('------------------sadsad-------------')
      console.log(good_id)
      mes = await personCom.findAll({
      where: {
      good_id: good_id
      },
      order: [
      [
      'com_time', 'DESC'
      ]
      ]
      })
      .catch(function (err) {
      console.log(err);
      });
      // console.log('------------------sadsad-------------')
      // console.log(mes)
      var photo = [];
      let result = [];
      for (let m of mes) {
      let obj = m.get({ plain: true });
      result.push(obj);
      photo = await userInfor.findAll({
      where: {
      user_id: m.com_deliver
      }
      })
      obj['userPhoto'] = photo[0].user_avatar;
      obj['user_name'] = photo[0].user_name;
      console.log('--------------------'+obj.userPhoto)
      console.log('--------------------'+photo[0].user_name)
      // console.log('------------------sa-------------')
      // console.log(photo)
      // console.log('------------------ssad-------------')
      // console.log(m)
      }
      console.log(result)
      return result;
      })();
  },



  getfindgoods: (kind) => {
    return (async() => {
      var goods=null;
      if (kind == "all") {
        goods=await findGood.findAll({
          where:{
            stateof:false
          },
          order:[
            [
              'deliver_time', 'DESC'
            ]
          ]
        })
        .catch(function(err) {
          console.log(error);
        });
      } else {
        goods = await findGood.findAll({
          where: {
            typeof: kind,
            stateof:false
          },
          order:[
            [
              'deliver_time', 'DESC'
            ]
          ]
        });
      }
      var result=new Array();
        console.log(`find ${goods.length} goods:`);
        for (let j in goods) {
          var goodcontact=await goodTemporary.findOne({
            where:{
              good_id:goods[j].good_id
            }
          })
          result[j]={
            createdAt: goods[j].createdAt,
            deliver: goods[j].deliver,
            deliver_time: goods[j].deliver_time,
            detail: goods[j].detail,
            good_id: goods[j].good_id,
            good_title: goods[j].good_title,
            lost_place: goods[j].lost_place,
            p1: goods[j].p1,
            p2: goods[j].p2,
            p3: goods[j].p3,
            p4: goods[j].p4,
            p5: goods[j].p5,
            p6: goods[j].p6,
            p7: goods[j].p7,
            p8: goods[j].p8,
            stateof: goods[j].stateof,
            typeof: goods[j].typeof,
            updatedAt: goods[j].updatedAt,
            version: goods[j].version,
            contacter:goodcontact.contacter
          }
        }
        console.log(result)
      return result;
    })();
  },
  getfindpersons: (kind) => {
    return (async() => {
      var goods=null;
      if (kind == "all") {
        goods=await findPerson.findAll({
          where:{
            stateof:false
          },
          order:[
            [
              'deliver_time', 'DESC'
            ]
          ]
        })
        .catch(function(err) {
          console.log(error);
        });
      } else {
        goods = await findPerson.findAll({
          where: {
            typeof: kind,
            stateof:false
          },
          order:[
            [
              'deliver_time', 'DESC'
            ]
          ]
        });
      }
      var result=new Array();
        console.log(`find ${goods.length} goods:`);
        for (let j in goods) {
          var goodcontact=await personTemporary.findOne({
            where:{
              good_id:goods[j].good_id
            }
          })
          result[j]={
            createdAt: goods[j].createdAt,
            deliver: goods[j].deliver,
            deliver_time: goods[j].deliver_time,
            detail: goods[j].detail,
            good_id: goods[j].good_id,
            good_title: goods[j].good_title,
            find_place: goods[j].find_place,
            p1: goods[j].p1,
            p2: goods[j].p2,
            p3: goods[j].p3,
            p4: goods[j].p4,
            p5: goods[j].p5,
            p6: goods[j].p6,
            p7: goods[j].p7,
            p8: goods[j].p8,
            stateof: goods[j].stateof,
            typeof: goods[j].typeof,
            updatedAt: goods[j].updatedAt,
            version: goods[j].version,
            contacter:goodcontact.contacter
          }
        }
        console.log(result)
      return result;
    })();
  },
  getsearchgoods: (keyword) => {
    var string = keyword.split("");
    var arr = [];
    return (async() => {
      var goods = await findGood.findAll({
          where: {
            stateof:false
          },
          order:[
            [
              'deliver_time', 'DESC'
            ]
          ]})
      .catch(function(err) {
        console.log(error);
      });
      for (let good of goods) {
        console.log(good.good_title);
        if(good.good_title!=null){
        var string2=good.good_title.split("");
        if (compare(string,string2)) {
          arr = arr.concat(good);
        }
      }
      }
      return arr;
    })();
  },
  compare: compare,
  getsearchpersons: (keyword) => {
    var string = keyword.split("");
    var arr = [];
    return (async() => {
      var goods = await findPerson.findAll({
          where: {
            stateof:false
          },
          order:[
            [
              'deliver_time', 'DESC'
            ]
          ]})
      .catch(function(err) {
        console.log(error);
      });
      for (let good of goods) {
        console.log(good.good_title);
        if(good.good_title!=null){
        var string2=good.good_title.split("");
        if (compare(string,string2)) {
          arr = arr.concat(good);
        }
      }
      }
      return arr;
    })();
  },
  getonegood:(good_id)=>{
    return (async()=>{
      var good=await findGood.findAll({
        where:{
          good_id:good_id
        }
      });
      return good;
    })();
  },
  getonegood:(good_id)=>{
    return (async()=>{
      var good=await findGood.findAll({
        where:{
          good_id:good_id
        }
      });
      var goodcontact=await goodTemporary.findAll({
        where:{
        good_id:good_id
        }
      })
      var pic=new Array();
      if(good[0].p1!=null){
        pic[0]=good[0].p1
      };
      if(good[0].p2!=null){
        pic[1]=good[0].p2
      };
      if(good[0].p3!=null){
        pic[2]=good[0].p3
      };
      if(good[0].p4!=null){
        pic[3]=good[0].p4
      };
      if(good[0].p5!=null){
        pic[4]=good[0].p5
      };
      if(good[0].p6!=null){
        pic[5]=good[0].p6
      };
      if(good[0].p7!=null){
        pic[6]=good[0].p7
      };
      if(good[0].p8!=null){
        pic[7]=good[0].p8
      };
      var result={          
        good_id: good[0].good_id,
        //deliver: '',
        good_title: good[0].good_title,
        place: good[0].lost_place,
        detail: good[0].detail,
        //deliver_time: '',
        contacter: goodcontact[0].contacter,
        tel: goodcontact[0].tel_num,
        wechat: goodcontact[0].wechat_num,
        qq: goodcontact[0].qq_num,
        imgUrls: pic}
        return result;
    })();
  },
  getoneperson:(good_id)=>{
    return (async()=>{
      var good=await findPerson.findAll({
        where:{
          good_id:good_id
        }
      });
      var goodcontact=await personTemporary.findAll({
        where:{
        good_id:good_id
        }
      })
      var pic=new Array();
      if(good[0].p1!=null){
        pic[0]=good[0].p1
      };
      if(good[0].p2!=null){
        pic[1]=good[0].p2
      };
      if(good[0].p3!=null){
        pic[2]=good[0].p3
      };
      if(good[0].p4!=null){
        pic[3]=good[0].p4
      };
      if(good[0].p5!=null){
        pic[4]=good[0].p5
      };
      if(good[0].p6!=null){
        pic[5]=good[0].p6
      };
      if(good[0].p7!=null){
        pic[6]=good[0].p7
      };
      if(good[0].p8!=null){
        pic[7]=good[0].p8
      };
      console.log(pic);
      var result={          
        good_id: good[0].good_id,
        //deliver: '',
        good_title: good[0].good_title,
        place: good[0].find_place,
        detail: good[0].detail,
        //deliver_time: '',
        contacter: goodcontact[0].contacter,
        tel: goodcontact[0].tel_num,
        wechat: goodcontact[0].wechat_num,
        qq: goodcontact[0].qq_num,
        imgUrls: pic}
        return result;
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
/**
 * api/releasefindgoods✅
 * api/releasemessages✅
 * api/releasefindpersons✅
 * apigetfindpersons✅
 * api/getfindgoods✅
 * api/getsearchgoods✅
 *  api/getsearchpersons✅
 *  api/getuserfindgoods ✅
 *  api/getuserfindperson✅
 *  api/getuserinfor     ✅
 *  api/getmessage       ✅
 *  api/be found ✅
 *  api/reedit   ✅
 *  api/refresh  ✅
 *  api/delete   ✅
 *  api/edit info我的界面 ✅
 */
const APIError = require('../rest').APIError;
const records = require('../records');

module.exports = {
  'DELETE /api/delete/findGood/:id': async(ctx, next) => {
    console.log('delete record ${ctx.params.id}...');
    records.deleteRecordFromGood(ctx.params.id);
  },
  'GET /getuserfindgoods/:user_id': async(ctx, next) => {
    var user_id = ctx.params.user_id;
    var found = await find_good.findAll({
      where: {
        deliver: user_id
      }
    });
    //console.log(`find ${userInfor.length} user:`);
    for (let p of found) {
      console.log(JSON.stringify(p));
    }
    ctx.response.body = found;
  },
  'GET /getuserfindperson/:user_id': async(ctx, next) => {
    var user_id = ctx.params.user_id;
    var found = await find_person.findAll({
      where: {
        deliver: user_id
      }
    });
    //console.log(`find ${found.length} user:`);
    for (let p of found) {
      console.log(JSON.stringify(p));
    }
    ctx.response.body = found;
  },
  'GET /getuserinfor/:user_id': async(ctx, next) => {
    var user_id = ctx.params.user_id;
    var get = await userInfor.findAll({
      where: {
        user_id: user_id
      }
    });
    //console.log(`find ${get.length} user:`);
    for (let p of get) {
      console.log(JSON.stringify(p));
    }
    ctx.response.body = get;
  },
  'Get /getmessage/:user_id': async(ctx, next) => {
    var user_id = ctx.params.user_id;
    var findgood = await find_good.findAll({
      where: {
        deliver: user_id
      }
    });
    var findgoodid = new Array(findgood.length);
    var l = 0;
    for (l = 0; l < findgood.length; l++) {
      findgoodid[l] = findgood[l].good_id;
    }
    var findperson = await find_person.findAll({
      where: {
        deliver: user_id
      }
    });
    var findpersonid = new Array(findperson.length);
    for (l = 0; l < findperson.length; l++) {
      findpersonid[l] = findperson[l].good_id;
    }
    var good_comment = await good_com.findAll({
      where: {
        good_id: findgoodid
      }
    });
    var person_comment = await person_com.findAll({
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
    console.log(com);
    ctx.response.body = com;
    /*console.log(`find ${userInfor.length} user:`);
    for (let p of userInfor) {
        console.log(JSON.stringify(p));
    }*/
  },
  'DELETE /api/delete/findGood/:id': async(ctx, next) => {
    console.log('delete record ${ctx.params.id}...');
    records.deleteRecordFromGood(ctx.params.id);
  },
  'DELETE /api/delete/findPerson/:id': async(ctx, next) => {
    console.log('delete record ${ctx.params.id}...');
    records.deleteRecordFromPerson(ctx.params.id);
  },
  'PUT /api/foundConfirm/:id': async(ctx, next) => {
    console.log('confirm record ${ctx.params.id}...');
    var record = records.confirmRecordFromGood(ctx.params.id);
    if (record) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/claimConfirm/:id': async(ctx, next) => {
    console.log('confirm record ${ctx.params.id}...');
    var record = records.confirmRecordFromPerson(ctx.params.id);
    if (record) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/reEdit/findGood/:id': async(ctx, next) => {
    console.log('reedit record ${ctx.params.id}...');
    var record = records.reeditRecordFromGood(ctx.params.id);
    if (record[0] && record[1]) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/reEdit/findPerson/:id': async(ctx, next) => {
    console.log('reedit record ${ctx.params.id}...');
    var record = records.reeditRecordFromPerson(ctx.params.id);
    if (record[0] && record[1]) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/editMyInfo/:id': async(ctx, next) => {
    console.log('edit user ${ctx.params.id} own information');
    var record = records.editUserInfo(ctx.params.id);
    if (record) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/refresh/findGood/:id': async(ctx, next) => {
    console.log('refresh record ${ctx.params.id}...');
    var record = records.refreshFromGood(ctx.params.id);
    if (record) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/refresh/findPerson/:id': async(ctx, next) => {
    console.log('refresh record ${ctx.params.id}...');
    var record = records.reeditRecordFromPerson(ctx.params.id);
    if (record) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'POST /api/release/findPerson': async(ctx, next) => {
    console.log('release a good（pick up）');
    records.releasePersons();
    // 检验机制先不写
  },
  'POST /api/release/findGood': async(ctx, next) => {
    console.log('release a good(lost)');
    records.releaseGoods();
    // 检验机制先不写
  },
  'POST /api/release/goodCom': async(ctx, next) => {
    console.log('release a message');
    records.releasemessages();
    // 检验机制先不写
  },
  'GET /api/get/findGood/:kind': async(ctx, next) => {
    var kind = ctx.params.kind;
    var result = records.getfindgoods(kind);
    ctx.response.body = result;
  },
  'GET /api/get/findPerson/:kind': async(ctx, next) => {
    var kind = ctx.params.kind;
    var result = records.getfindpersons(kind);
    ctx.response.body = result;
  },
  'GET /api/get/searchGood/:keyword': async(ctx, next) => {
    var keyword = ctx.params.keyword;
    var result = records.getsearchgoods(keyword);
    ctx.response.body = result;
  },
  'GET /api/get/searchPerson/:keyword': async(ctx, next) => {
    var keyword = ctx.params.keyword;
    var result = records.getsearchpersons(keyword);
    ctx.response.body = result;
  }
};
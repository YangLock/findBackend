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
var querystring = require('querystring');


module.exports = {
  'GET /getuserfindgoods/:user_id': async(ctx, next) => {
    var user_id = ctx.params.user_id;
    var found = await records.getuserfindgoods(user_id);
    //console.log(`find ${userInfor.length} user:`);
    for (let p of found) {
      console.log(JSON.stringify(p));
    }
    ctx.response.body = found;
  },
  'GET /getuserfindperson/:user_id': async(ctx, next) => {
    var user_id = ctx.params.user_id;
    var found = await records.getuserfindperson(user_id);
    //console.log(`find ${found.length} user:`);
    for (let p of found) {
      console.log(JSON.stringify(p));
    }
    ctx.response.body = found;
  },
  'GET /getuserinfor/:user_id': async(ctx, next) => {
    var user_id = ctx.params.user_id;
    var get=await records.getuserinfor(user_id);
    //console.log(`find ${get.length} user:`);
    for (let p of get) {
      console.log(JSON.stringify(p));
    }
    //console.log(get);
    ctx.response.body = get;
  },
  'GET /getmessage/:user_id': async(ctx, next) => {
    var user_id = ctx.params.user_id;
    var com=await records.getmessage(user_id);
    // console.log(`find ${userInfor.length} user:`);
    for (let p of com) {
        console.log(JSON.stringify(p));
    }
    ctx.response.body = com;
  },
  'DELETE /api/delete/findGood/:id': async(ctx, next) => {
    console.log(`delete record ${ctx.params.id}...`);
    records.deleteRecordFromGood(ctx.params.id);
  },
  'DELETE /api/delete/findPerson/:id': async(ctx, next) => {
    console.log(`delete record ${ctx.params.id}...`);
    records.deleteRecordFromPerson(ctx.params.id);
  },
  'PUT /api/foundConfirm/:id': async(ctx, next) => {
    console.log(`confirm record ${ctx.params.id}...`);
    var record = await records.confirmRecordFromGood(ctx.params.id);
    if (record) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/claimConfirm/:id': async(ctx, next) => {
    console.log(`confirm record ${ctx.params.id}...`);
    var record = await records.confirmRecordFromPerson(ctx.params.id);
    if (record) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/reEdit/findGood/:id': async(ctx, next) => {
    console.log(`reedit record ${ctx.params.id}...`);
    var record = records.reeditRecordFromGood(ctx.params.id,ctx);
    if (record[0] && record[1]) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/reEdit/findPerson/:id': async(ctx, next) => {
    console.log(`reedit record ${ctx.params.id}...`);
    var record = records.reeditRecordFromPerson(ctx.params.id,ctx);
    if (record[0] && record[1]) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/editMyInfo/:id': async(ctx, next) => {
    console.log(`edit user ${ctx.params.id} own information`);
    var record = await records.editUserInfo(ctx.params.id,ctx);
    if (record) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/refresh/findGood/:id': async(ctx, next) => {
    console.log(`refresh record ${ctx.params.id}...`);
    var record = await records.refreshFromGood(ctx.params.id);
    if (record) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'PUT /api/refresh/findPerson/:id': async(ctx, next) => {
    console.log(`refresh record ${ctx.params.id}...`);
    var record = await records.reeditRecordFromPerson(ctx.params.id);
    if (record) {
      ctx.rest(record);
    } else {
      throw new APIError('record:not_found', 'record not found by id');
    }
  },
  'POST /api/release/findPerson': async(ctx, next) => {
    var good=ctx.request.body;
    console.log(good);
    console.log('release a good（pick up）');
    records.releasePersons(good);
    ctx.response.body={good_id:good.good_id};
    // 检验机制先不写
  },
  'POST /api/release/findGood': async(ctx, next) => {
    var good=ctx.request.body;
    console.log(good);
    console.log('release a good(lost)');
    records.releaseGoods(good);
    ctx.response.body={good_id:good.good_id};
    // 检验机制先不写
  },
  'POST /api/release/goodCom': async(ctx, next) => {
    console.log('release a message');
    records.releasemessages(ctx);
    // 检验机制先不写
  },
  'POST /api/release/personCom': async (ctx, next) => {
    console.log('release a message p');
    records.releasePersonmessages(ctx);
    // 检验机制先不写
    },
    'GET /api/get/goodCom': async(ctx, next) => {
      var good_id = ctx.request.body.good_id;
      var result = await records.getgoodCom(good_id);
      ctx.response.body = result;
    },
    'GET /api/get/personCom': async(ctx, next) => {
      var good_id = ctx.request.body.good_id;
      var result = await records.getpersonCom(good_id);
      ctx.response.body = result;
    },

  'GET /api/get/findGood/:kind': async(ctx, next) => {
    var kind = ctx.params.kind;
    var result = await records.getfindgoods(kind);
    ctx.response.body = result;
  },
  'GET /api/get/findPerson/:kind': async(ctx, next) => {
    var kind = ctx.params.kind;
    var result = await records.getfindpersons(kind);
    ctx.response.body = result;
  },
  'GET /api/get/searchGood/:keyword': async(ctx, next) => {
    var keyword = ctx.params.keyword;
    var result = await records.getsearchgoods(keyword);
    ctx.response.body = result;
  },
  'GET /api/get/searchPerson/:keyword': async(ctx, next) => {
    var keyword = ctx.params.keyword;
    var result = await records.getsearchpersons(keyword);
    ctx.response.body = result;
  },
  'GET /api/get/onegood/:goodid': async(ctx, next) => {
    var good_id = ctx.params.goodid;
    var result = await records.getonegood(good_id);
    ctx.response.body = result;
  },
  'GET /api/get/oneperson/:goodid': async(ctx, next) => {
    var good_id = ctx.params.goodid;
    var result = await records.getoneperson(good_id);
    ctx.response.body = result;
  },
  'GET /api/get/checkuser':async(ctx,next)=>{
    var params = querystring.parse(ctx.req._parsedUrl.query);
    var user_id=params.user_id;
    var user_name=params.user_name;
    var user_avatar=params.user_avatar;
    records.checkuser(user_id,user_name,user_avatar);
    ctx.response.body=('checked');
  }
};
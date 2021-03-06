const Episode7 = require('episode-7');
const fetchHeroku = require('./fetch-heroku')

function* fetchAllAppInfo(appName, herokuAuthToken) {
  //get heroku app info
  let appInfo = yield Episode7.call(
    fetchHeroku,
    `apps/${appName}`,
    herokuAuthToken
  );

  //get app config vars
  let appConfigVars = yield Episode7.call(
    fetchHeroku,
    `apps/${appName}/config-vars`,
    herokuAuthToken
  );

  //get app build list
  let appBuildList = yield Episode7.call(
    fetchHeroku,
    `apps/${appName}/builds`,
    herokuAuthToken
  );

  let appBuildId = appBuildList[0].id;

  //get app build info
  let appBuildInfo = yield Episode7.call(
    fetchHeroku,
    `apps/${appName}/builds/${appBuildId}`,
    herokuAuthToken
  );

  //get slug info
  let appSlugInfo = yield Episode7.call(
    fetchHeroku,
    `apps/${appName}/slugs/${appBuildInfo.slug.id}`,
    herokuAuthToken
  );

  //get app add-on list
  let appAddonList = yield Episode7.call(
    fetchHeroku,
    `apps/${appName}/addons`,
    herokuAuthToken
  );

  //get app formation
  let appFormationList = yield Episode7.call(
    fetchHeroku,
    `apps/${appName}/formation`,
    herokuAuthToken
  );

  let appFormationId = appFormationList[0].id;

  //get app formation
  let appFormationInfo = yield Episode7.call(
    fetchHeroku,
    `apps/${appName}/formation/${appFormationId}`,
    herokuAuthToken
  );
  const privateSpaceName = process.env.SPACE_TO_CREATE_APP;
  const spaceName = privateSpaceName ? privateSpaceName : appInfo.space;
  let spaceInfo = undefined;
  if (spaceName) {
    //get space info
    spaceInfo = yield Episode7.call(
      fetchHeroku,
      `spaces/${spaceName}`,
      herokuAuthToken
    );  
  }

  return {
    appInfo: appInfo,
    appConfigVars: appConfigVars,
    appBuildInfo: appBuildInfo,
    appAddonList : appAddonList,
    appSlugInfo : appSlugInfo,
    appFormationInfo : appFormationInfo,
    spaceInfo : spaceInfo
  }
}

module.exports = fetchAllAppInfo;

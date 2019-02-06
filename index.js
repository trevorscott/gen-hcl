const Episode7     = require('episode-7');
const fetchAllAppInfo = require('./fetch-all-app-info');
const hclApp       = require('./hcl-app');
const hclSlug      = require('./hcl-slug');
const hclRelease   = require('./hcl-release');
const hclFormation = require('./hcl-formation');
const hclAddon     = require('./hcl-addon');

const fs = require('fs');
require('dotenv').config();

const appNames         = process.env.HEROKU_APP_NAMES;
const newAppPrefix     = process.env.NEW_HEROKU_APPS_PREFIX;
const herokuAuthToken  = process.env.HEROKU_AUTH_TOKEN;
const privateSpaceName = process.env.SPACE_TO_CREATE_APP;


const appNameArr = appNames.split(",");


appNameArr.forEach(appName => {
  // Gather all of the necessary info from the heroku API
  Episode7.run(fetchAllAppInfo, appName, herokuAuthToken)
  .then((allInfo) => {
    const newHerokuAppName = `${newAppPrefix}-${appName}`;
    const newHCLAppName = newHerokuAppName.replace(/-/g, '_');

    //generate HCL
    const appHCL       = hclApp(newHerokuAppName,
                                newHCLAppName,
                                allInfo.appInfo,
                                allInfo.appConfigVars,
                                allInfo.appBuildInfo,
                                allInfo.appAddonList,
                                allInfo.spaceInfo);
    const addonHCL     = hclAddon(newHCLAppName, allInfo.appAddonList, appName);
    const slugHCL      = hclSlug(newHCLAppName, allInfo.appSlugInfo);
    const releaseHCL   = hclRelease(newHCLAppName);
    const formationHCL = hclFormation(newHCLAppName, allInfo.appFormationInfo, allInfo.spaceInfo);
    //write HCL file to system
    fs.writeFile(`${newHerokuAppName}.tf`, `${appHCL}${addonHCL}${slugHCL}${releaseHCL}${formationHCL}`, 'utf8', (err)=>{
      if (err) throw err;
      console.log(`Successfully generated HCL for Heroku App: ${appName}`);
    });
  })
  .catch(error => {
    console.log(`Application failure: ${error.stack}`);
    process.exit(1);
  });
});


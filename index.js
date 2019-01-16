const Episode7     = require('episode-7');
const fetchAllAppInfo = require('./fetch-all-app-info');
const hclApp       = require('./hcl-app');
const hclSlug      = require('./hcl-slug');
const hclRelease   = require('./hcl-release');
const hclFormation = require('./hcl-formation');
const hclAddon     = require('./hcl-addon');

const fs = require('fs');
require('dotenv').config();

const appName          = process.env.HEROKU_APP_NAME;
const herokuAuthToken  = process.env.HEROKU_AUTH_TOKEN;
const newHerokuAppName = process.env.NEW_HEROKU_APP_NAME;
const newHCLAppName    = process.env.NEW_HCL_APP_NAME;


// Gather all of the necessary info from the heroku API
Episode7.run(fetchAllAppInfo, appName, herokuAuthToken)
.then((allInfo) => {
  
  //generate HCL
  const appHCL       = hclApp(newHerokuAppName, 
                              newHCLAppName,
                              allInfo.appInfo,
                              allInfo.appConfigVars,
                              allInfo.appBuildInfo,
                              allInfo.appAddonList);
  const addonHCL     = hclAddon(newHCLAppName, allInfo.appAddonList);
  const slugHCL      = hclSlug(newHCLAppName, allInfo.appSlugInfo);
  const releaseHCL   = hclRelease(newHCLAppName);
  const formationHCL = hclFormation(newHCLAppName, allInfo.appFormationInfo);
  
  //write HCL file to system
  fs.writeFile(`${newHerokuAppName}.tf`, `${appHCL}${addonHCL}${slugHCL}${releaseHCL}${formationHCL}`, 'utf8', (err)=>{
    if (err) throw err;
    console.log('App HCL file generated!');
  });

  console.log(`successfully fetched all relevant Heroku App Info for app: ${appName}`)
})
.catch(error => {
  console.log(`Application failure: ${error.stack}`);
  process.exit(1);
});

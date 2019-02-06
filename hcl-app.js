
function appHCL(newHerokuAppName, 
                newHCLAppName,
                app,
                configVars,
                buildInfo,
                addOnList,
                space) {
  const resourceName    = newHCLAppName;
  const appName = newHerokuAppName;
  // const space   = (privateSpaceName ? privateSpaceName : app.space);
  const region  = space ? space.region.name : app.region.name;
  const stack   = (app.stack && app.stack.name) ? app.stack.name : 'heroku-18';;
  const git_url = app.git_url;
  const web_url = app.web_url;
  const acm     = app.acm;
  const internal_routing = app.internal_routing;
  const organization     = app.organization ? app.organization : (space ? space.organization.name : '');
  const userConfigVars = getConfigVars(configVars, addOnList)
  const buildpacks = buildInfo.buildpacks.map(b => `"${b.url}"`);

  // ${acm              ? `acm = "${acm}"` : ''}
  return `resource "heroku_app" "${resourceName}" {
    name = "${newHerokuAppName}"
    region = "${region}"

    ${userConfigVars   ? `config_vars { 
      ${userConfigVars}
    }` : ''}
    
    buildpacks = [
      ${buildpacks}
    ]

    ${space            ? `space = "${space.name}"` : ''}
    ${stack            ? `stack = "${stack}"` : '' }
    ${internal_routing ? `internal_routing = "${internal_routing}"` : ''}
    ${organization     ? `organization { 
      name = "${organization}" 
    }` : ''}
    
  } \n`;
}


function getConfigVars(appConfigVars, addOnList) {
  let addonConfigArr = [];
  addOnList.forEach((a,i) => {
    addonConfigArr = addonConfigArr.concat(a.config_vars)
  });

  addonConfigArr.forEach(aCV => {
    delete appConfigVars[aCV]
  })

  if (appConfigVars) {
    
    let finalConfigVarsArray = Object.entries(appConfigVars).map(tuple => {
      return `${tuple[0]} = "${tuple[1]}"`
    }).join('\n')
    
    return finalConfigVarsArray
  }else {
    return null;
  }
}

module.exports = appHCL;

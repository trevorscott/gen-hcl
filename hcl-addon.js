// # Create a database, and configure the app to use it
// resource "heroku_addon" "database" {
//   app  = "${heroku_app.default.name}"
//   plan = "heroku-postgresql:hobby-basic"
// }

function addonHCL(newHCLAppName, appAddonList, originalAppName) {
  let addonsHCL = '';
  appAddonList.forEach((addOn, i) => {
    addonsHCL = addonsHCL.concat(getSingleAddonHCL(newHCLAppName, addOn, i, originalAppName))
  })
  return addonsHCL;
}


function getSingleAddonHCL(name, addonInfo, index, originalAppName) {
  let addonHCLString;
  // check to see if the addon is an attached addon
  const addonHCLName = addonInfo.name.replace(/-/g, '_');
  if (originalAppName != addonInfo.app.name) {
    addonHCLString = `resource "heroku_addon_attachment" "${name}_${index}" {
  app_id = "$\{heroku_app.${name}.id\}"

  addon_id = "$\{local.orig_addon_${addonHCLName}\}"
    
} \n`;
  } else {
    addonHCLString = `resource "heroku_addon" "${name}_${index}" {
  app = "$\{heroku_app.${name}.name\}"

  plan = "${addonInfo.plan.name}"
    
}

locals {
  orig_addon_${addonHCLName} = "$\{heroku_addon.${name}_${index}.id\}"
} 
`;  
  }
  return addonHCLString;
}

module.exports = addonHCL;
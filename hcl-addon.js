// # Create a database, and configure the app to use it
// resource "heroku_addon" "database" {
//   app  = "${heroku_app.default.name}"
//   plan = "heroku-postgresql:hobby-basic"
// }

function addonHCL(newHCLAppName, appAddonList) {
  let addonsHCL = '';
  appAddonList.forEach((addOn,i) => {
    addonsHCL= addonsHCL.concat(getSingleAddonHCL(newHCLAppName,addOn,i))
  })
  return addonsHCL;
}


function getSingleAddonHCL(name, addonInfo,index) {
  return `resource "heroku_addon" "${name}_${index}" {
    app = "$\{heroku_app.${name}.name\}"

    plan = "${addonInfo.plan.name}"
    
  } \n`;
}

module.exports = addonHCL;
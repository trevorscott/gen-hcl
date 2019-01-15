// # Create a database, and configure the app to use it
// resource "heroku_addon" "database" {
//   app  = "${heroku_app.default.name}"
//   plan = "heroku-postgresql:hobby-basic"
// }

function addonHCL(newHCLAppName, appAddonList) {
  let addonsHCL = '';
  appAddonList.forEach(addOn => {
    addonsHCL= addonsHCL.concat(getSingleAddonHCL(newHCLAppName,addOn))
  })
  return addonsHCL;
}


function getSingleAddonHCL(name, addonInfo) {
  return `resource "heroku_addon" "${name}" {
    app = "$\{heroku_app.${name}.id\}"

    plan = "${addonInfo.plan.name}"
    
  } \n`;
}

module.exports = addonHCL;
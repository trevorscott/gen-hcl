// # Launch the app's web process by scaling-up
// resource "heroku_formation" "foobar" {
//   app        = "${heroku_app.foobar.id}"
//   type       = "web"
//   quantity   = 1
//   size       = "Standard-1x"
//   depends_on = ["heroku_app_release.foobar"]
// }

function formationHCL(newHCLAppName, formationInfo) {
  const name    = newHCLAppName;

  return `resource "heroku_formation" "${name}" {
    app = "$\{heroku_app.${name}.name\}"

    type     = "${formationInfo.type}"
    quantity = "${formationInfo.quantity}"
    size     = "${formationInfo.size}"
    depends_on = ["heroku_app_release.${name}"]
    
  } \n`;
}

function getProcessTypes(processTypesObject) {
  Object.entries(processTypesObject).map(tuple => {
      return `${tuple[0]} = "${tuple[1]}"`
    }).join('\n')
}

module.exports = formationHCL;

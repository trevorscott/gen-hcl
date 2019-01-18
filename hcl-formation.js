// # Launch the app's web process by scaling-up
// resource "heroku_formation" "foobar" {
//   app        = "${heroku_app.foobar.id}"
//   type       = "web"
//   quantity   = 1
//   size       = "Standard-1x"
//   depends_on = ["heroku_app_release.foobar"]
// }

function formationHCL(newHCLAppName, formationInfo, spaceInfo) {
  const name    = newHCLAppName;
  // const space   = (privateSpaceName ? privateSpaceName : app.space);

  return `resource "heroku_formation" "${name}" {
    app = "$\{heroku_app.${name}.name\}"
    
    type     = "${formationInfo.type}"
    quantity = "${formationInfo.quantity}"
    
    ${spaceInfo ? `size = "${getPrivateSpaceDynoSize(formationInfo.size)}"` 
                : `size = "${formationInfo.size}"`}
    
    depends_on = ["heroku_app_release.${name}"]
    
  } \n`;
}

function getProcessTypes(processTypesObject) {
  Object.entries(processTypesObject).map(tuple => {
      return `${tuple[0]} = "${tuple[1]}"`
    }).join('\n')
}

function getPrivateSpaceDynoSize(size){
  const _size = size.toLowerCase()
  let newSize = ''
  
  switch (_size) {
    case "free" :
      newSize = "private-s"
    case "hobby" :  
      newSize = "private-s"
    case "standard-1x" : 
      newSize = "private-s"
    case "standard-2x" : 
      newSize = "private-s"
    case "performance-m" :  
      newSize = "private-m"
    case "performance-l" : 
      newSize = "private-l"
    default : 
      newSize = "private-s"
  }

  return newSize
}

module.exports = formationHCL;

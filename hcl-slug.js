
function slugHCL(newHCLAppName, slugInfo) {

  const name    = newHCLAppName;
  const slugUrl = slugInfo.blob.url;
  const processTypes = getProcessTypes(slugInfo.process_types)

  return `resource "heroku_slug" "${name}" {
    app = "$\{heroku_app.${name}.name\}"

    file_url = "${slugUrl}"

    process_types {
      ${processTypes}
    }
    
  } \n`;
}


function getProcessTypes(processTypesObject) {
  return Object.entries(processTypesObject).map(tuple => {
    return `${tuple[0]} = "${tuple[1]}"`
  })
}

module.exports = slugHCL;

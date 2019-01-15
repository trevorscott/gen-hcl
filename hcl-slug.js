
function slugHCL(newHCLAppName, slugInfo) {
  // console.log(slugInfo.blob);

  const name    = newHCLAppName;
  const slugUrl = slugInfo.blob.url;
  const processTypes = getProcessTypes(slugInfo.process_types)

  return `resource "heroku_slug" "${name}" {
    app = "$\{heroku_app.${name}.id\}"

    file_url = "${slugUrl}"

    process_types {
      ${processTypes}
    }
    
  } \n`;
}


function getProcessTypes(processTypesObject) {
  console.log(processTypesObject)
  return Object.entries(processTypesObject).map(tuple => {
    return `${tuple[0]} = "${tuple[1]}"`
  })
}

module.exports = slugHCL;

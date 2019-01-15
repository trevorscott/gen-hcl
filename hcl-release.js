function releaseHCL(newHCLAppName) {
  return `resource "heroku_app_release" "${newHCLAppName}" {
    app = "$\{heroku_app.${newHCLAppName}.id\}"
    slug_id = "$\{heroku_slug.${newHCLAppName}.id\}"
  } \n`;
}

module.exports = releaseHCL;
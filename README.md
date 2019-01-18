# gen-hcl

Generate Terraform HCL code that represents existing Heroku assets. The generated HCL config can be used to duplicate Heroku apps, addons, slugs, formations and config vars.

⚠️ **Warning: This is a highly experimental project that is currently under development** ⚠️

# Requirements

1. Heroku Account
1. Heroku App you want to duplicate
1. [Terraform](https://www.terraform.io/downloads.html)
1. Node version 10.x

# Setup

```
git clone git@github.com:trevorscott/gen-hcl.git
cd gen-hcl
npm install
```

### Enviornment Vars

create a `.env` file in the project root with the following config:

```
HEROKU_APP_NAME="existing-heroku-app-name"
HEROKU_AUTH_TOKEN="aaaa-bbbb-cccc-dddd"

NEW_HEROKU_APP_NAME="name-of-new-heroku-app"
NEW_HCL_APP_NAME="name_of_hcl_resources"
```

# Generate HCL Config

start the tool from the project root:

```
node index.js
```

# Output

Running `node index.js` will create an `new-app-name.tf` file your current working directory. 

# Run Terraform to Generate Heroku Resources

```
terraform init
terraform fmt
terraform apply
```

# Clone Common Runtime App to Private Spaces

In order to duplicate an app and all its deps from the common runtime to private spaces add the name of the space as config to your `.env` file:

```
SPACE_TO_CREATE_APP="existing-private-space-name"
```


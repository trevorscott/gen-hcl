# gen-hcl

Generate Terraform HCL code based off of existing Heroku assets.

⚠️ **Warning: This is a highly experimental project that is currently under development** ⚠️

# setup

```
git clone git@github.com:trevorscott/gen-hcl.git
cd gen-hcl
npm install
```

## config

create a `.env` file with the following config:

```
HEROKU_APP_NAME="existing-heroku-app-name"
HEROKU_AUTH_TOKEN="aaaa-bbbb-cccc-dddd"

NEW_HEROKU_APP_NAME="name-of-new-heroku-app"
NEW_HCL_APP_NAME="name_of_hcl_resources"
```

# Run

```
node index.js
```

# output

Running `node index.js` will create an `new-app-name.tf` file your current working directory. 

# Run Terraform to generate Heroku Resources

```
terraform init
terraform fmt
terraform apply
```

# Clone Common Runtime App to Private Spaces

You can use this tool to clone an existing common runtime app into private spaces. To do so you add the name of the space as config to your `.env` file:

```
SPACE_TO_CREATE_APP="8th-wonder"
```


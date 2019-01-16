# gen-hcl

Generate Terraform HCL code based off of existing Heroku assets.

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

Running `node index.js` will create an `new-app-name.tf` file. 

# Run Terraform

```
terraform init
terraform fmt
terraform apply
```


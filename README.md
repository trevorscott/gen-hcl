# gen-hcl

⚠️ **Warning: This is a highly experimental project that is currently under development** ⚠️

This proof of concept implmentation takes an existing heroku app name as an input and generates Terraform HCL / config for:

1. the heroku app itself
1. all addons attached to the app
1. all app config vars 
1. the app's most recent slug
1. an app release
1. the app's formation

The resulting HCL can be used to duplicate an app and its critical dependencies by running `terraform apply`. The tool also gives users the option to duplicate common runtime applications into a private space.

# Requirements

1. Heroku Account
1. Heroku App you want to duplicate
1. [Terraform](https://www.terraform.io/downloads.html)
1. Node.js version 10.x & npm
1. [A heroku auth token](https://devcenter.heroku.com/articles/platform-api-quickstart#authentication)

# Setup

```
git clone git@github.com:trevorscott/gen-hcl.git
cd gen-hcl
npm install
```

## Enviornment Vars

create a `.env` file in the project root with the following config 

```
HEROKU_APP_NAME="existing-heroku-app-name"
HEROKU_AUTH_TOKEN="aaaa-bbbb-cccc-dddd"
```

See [here](https://devcenter.heroku.com/articles/platform-api-quickstart#authentication) to generate a Heroku auth token.

You need to specify the names of the new assets you will be creating. Use hyphens and underscores for the following enviornment variables as indicated below: 

```
NEW_HEROKU_APP_NAME="name-of-new-heroku-app"
NEW_HCL_APP_NAME="name_of_hcl_resources"
```

### Clone Common Runtime App to Private Spaces

In order to duplicate an app and all its dependencies from the common runtime to private spaces add the name of the space as config to your `.env` file:

```
SPACE_TO_CREATE_APP="existing-private-space-name"
```


# Generate HCL Config

start the tool from the project root:

```
node index.js
```

### Output

Running `node index.js` will create an `new-app-name.tf` file your current working directory. 

# Run Terraform to Generate Heroku Resources

```
terraform init
terraform fmt
terraform apply
```

Be sure to clean up when you're done experimenting:

```
terraform destroy
```

And any delete unwanted `.tf` files.




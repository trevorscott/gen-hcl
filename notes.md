# Heroku API Get App

## Curl
```
## Request
curl "https://api.heroku.com/apps/prodigal-api" \
     -H 'Authorization: Bearer $token' \
     -H 'Accept: application/vnd.heroku+json; version=3'

```

## Response
```
{
  "acm": true,
  "archived_at": null,
  "build_stack": {
    "id": "ee582d3c-717d-4a57-ba5f-8b3a39f3a817",
    "name": "heroku-16"
  },
  "buildpack_provided_description": "Node.js",
  "created_at": "2018-09-11T22:43:37Z",
  "git_url": "https://git.heroku.com/prodigal-api.git",
  "id": "5e7f5222-d601-47d3-9c38-6c104cd05692",
  "internal_routing": null,
  "maintenance": false,
  "name": "prodigal-api",
  "organization": null,
  "owner": {
    "email": "tscott@heroku.com",
    "id": "da1a95dc-c599-488b-885a-83e18577342e"
  },
  "region": {
    "id": "59accabd-516d-4f0e-83e6-6e3757701145",
    "name": "us"
  },
  "released_at": "2018-09-14T21:41:24Z",
  "repo_size": 8286,
  "slug_size": 18793677,
  "space": null,
  "stack": {
    "id": "ee582d3c-717d-4a57-ba5f-8b3a39f3a817",
    "name": "heroku-16"
  },
  "team": null,
  "updated_at": "2018-09-14T21:42:24Z",
  "web_url": "https://prodigal-api.herokuapp.com/"
}
```

## HCL to Create APP

```

# Configure the Heroku provider
provider "heroku" {
  email   = "ops@company.com"
  api_key = "${var.heroku_api_key}"
}

# Create a new application
resource "heroku_app" "prodigal-api" {
  name   = "my-cool-app"
  region = "us"

  config_vars {
    FOOBAR = "baz"
  }

  buildpacks = [
    "heroku/go"
  ]
}
```
resource "heroku_app" "new_prodigal_api" {
  name   = "new-prodigal-api"
  region = "us"

  config_vars {
    TEST  = "test"
    TEST2 = "test2"
  }

  buildpacks = [
    "https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/nodejs.tgz",
  ]

  stack = "heroku-16"
}

resource "heroku_addon" "new_prodigal_api" {
  app = "${heroku_app.new_prodigal_api.id}"

  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_slug" "new_prodigal_api" {
  app = "${heroku_app.new_prodigal_api.id}"

  file_url = "https://s3-external-1.amazonaws.com/heroku-slugs-us/aaec/aaecb345-202f-42ab-beeb-9bae46093aee.tar.gz?AWSAccessKeyId=AKIAIO4SD3DCRO7W6IJQ&Signature=ILU2iJH2N1BgDeNVkyFZmhhPfGk%3D&Expires=1547514225"

  process_types {
    web = "npm start"
  }
}

resource "heroku_app_release" "new_prodigal_api" {
  app     = "${heroku_app.new_prodigal_api.id}"
  slug_id = "${heroku_slug.new_prodigal_api.id}"
}

resource "heroku_formation" "new_prodigal_api" {
  app = "${heroku_app.new_prodigal_api.id}"

  type       = "web"
  quantity   = "1"
  size       = "Hobby"
  depends_on = ["heroku_app_release.new_prodigal_api"]
}

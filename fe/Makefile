.PHONY: *

include ../.makefiles/Makefile.base.mk
include ../.makefiles/Makefile.aws.mk

# config vars
ENV ?= stg
CONFIG_FILE = ../config.json

define HELP_SCREEN
  test - test frontend
  build - build frontend
  deploy - deploy frontend
endef

# extract config vars from config file
CONFIG_VALUES := $(shell jq -rc '[\
	.projectName // false \
	, .$(ENV).s3bucket // false \
	, .$(ENV).cloudfrontId // false \
	, .$(ENV).domain.name // .default.domain.name // false \
] | @tsv' $(CONFIG_FILE))

# extract vars from config file
read_config_var = $(word $(1), $(CONFIG_VALUES))
PROJECT_NAME := $(call read_config_var,1)
S3_BUCKET := $(call read_config_var,2)
CLOUDFRONT_ID := $(call read_config_var,3)
DOMAIN := $(call read_config_var,4)

deploy: \
	assert-PROJECT_NAME \
	assert-ENV \
	assert-S3_BUCKET \
	assert-CLOUDFRONT_ID \
	require-aws
	$(call _announce_target, $@)
	@aws s3 sync ./dist s3://$(S3_BUCKET) --delete
	@aws cloudfront create-invalidation --distribution-id $(CLOUDFRONT_ID) --paths "/*"

build: \
	assert-PROJECT_NAME \
	assert-ENV \
	assert-DOMAIN \
	require-envsubst \
	require-mkdir \
	require-cp \
	clean
	$(call _announce_target, $@)
	@mkdir -p ./dist
	@ENV=$(ENV) DOMAIN=$(DOMAIN) envsubst < ./src/index.html.tpl > ./dist/index.html
	@cp src/404.html dist/404.html
	@cp src/robots.txt dist/robots.txt

clean: \
	require-envsubst
	$(call _announce_target, $@)
	@rm -rf ./dist

test:
	$(call _announce_target, $@)
	@echo "TODO: Run tests..."

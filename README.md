# tpl-aws-website

> [!IMPORTANT]
> Template monorepo with a AWS-hosted static website infrastructure and automations.

## Monorepo sub-projects

- `fe/` - Frontend
- `infra/` - Infrastructure

## Usage

> [!IMPORTANT]
> Make sure to provision ACM certificate and GitHub OIDC before deploying infrastructure
> by running `make infra-deploy-certificate` and `make infra-deploy-github-oidc`.

```
$ make
'''
Available targets:
  deploy - build & deploy infra and frontend
  fe-% - fe targets
  infra-% - infra targets
'''
```

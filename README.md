# tpl-aws-website

Template monorepo with an AWS-hosted static website infrastructure and CI/CD automations.

## CICD Setup

Set the following Environments and Environment Variables in GitHub repository settings to enable deployment workflow.

- Environments:
  - `prd` - Production
  - `stg` - Staging
- Environment variables:
  - `REGION` - AWS region environment is deployed to
  - `AWS_CI_ROLE` - Deployment AWS Role ARN

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

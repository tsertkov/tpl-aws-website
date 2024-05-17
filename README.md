# tpl-aws-website

Template monorepo with an AWS-hosted static website infrastructure and CI/CD automations.

## Monorepo layout

- `fe/` - Frontend project
- `infra/` - Infrastructure project
- `config.json` - config file
- `Makefile` - task automations

## CICD Setup

Set the following Environments and Environment Variables in GitHub repository settings to enable deployment workflow.

- Environments:
  - `prd` - Production
  - `stg` - Staging
- Environment variables:
  - `REGION` - AWS region environment is deployed to
  - `AWS_CI_ROLE` - CICD AWS Role ARN

## Infrastructure and Flow Diagram

![Infrastructure](https://raw.githubusercontent.com/tsertkov/tpl-aws-website/main/docs/tpl-aws-website.svg)

**0. Common AWS Resources**

- (0.1) IAM OIDCProvider for GitHub.
- (0.2) Route53 DNS zone for creating DNS records.
- (0.3) ACM certificate for CloudFont.

**1. Developer Flow**

- (1.1) Developer pushes updates to a GitHub repository.
- (1.2) GitHub actions triggers the `deploy` workflow when code update conditions are met.
- (1.3) GitHub workflow uploads website files to an S3 bucket with CICD Role.
- (1.4) GitHub workflow triggers cache invalidation in CloudFront with CICD Role.

**2. User Flow**

- (2.1) User requests IP address for a DNS name.
- (2.2) Route53 resolves the IP address from an alias record for CloudFront distribution.
- (2.3) User sends an HTTP request to CloudFront using the resolved IP address.

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

[![](docs/use-this-template-btn.png)](https://github.com/new?template_name=tpl-aws-website&template_owner=tsertkov)

# tpl-aws-website

A monorepo template for an AWS-hosted static website, complete with infrastructure code and CI/CD automations.

## Table of Contents

- [Monorepo Layout](#monorepo-layout)
- [CI/CD Setup](#cicd-setup)
- [Infrastructure and Flow Diagram](#infrastructure-and-flow-diagram)
- [Usage](#usage)

## Monorepo Layout

- `fe/` - Frontend project
- `infra/` - Infrastructure project
- `config.json` - config file
- `Makefile` - task automations

## CI/CD Setup

To enable the deployment workflow, configure the following Environments and Environment Variables in your GitHub repository settings:

- **Environments:**
  - `prd` - Production
  - `stg` - Staging
- **Environment variables:**
  - `AWS_REGION` - AWS region environment is deployed to
  - `AWS_ROLE` - AWS CI/CD Role ARN

## Infrastructure and Flow Diagram

![Infrastructure Diagram](https://raw.githubusercontent.com/tsertkov/tpl-aws-website/main/docs/tpl-aws-website.svg)

### 0. Common AWS Resources

1. IAM OIDCProvider for GitHub.
2. Route53 DNS zone for creating DNS records.
3. ACM certificate for CloudFront.

### 1. Developer Flow

1. Developer pushes updates to a GitHub repository.
2. GitHub Actions triggers the `deploy` workflow when code update conditions are met.
3. GitHub workflow uploads website files to an S3 Web Bucket using the CI/CD Role.
4. GitHub workflow triggers cache invalidation in CloudFront using the CI/CD Role.

### 2. User Flow

1. User requests an IP address for a DNS name.
2. Route53 resolves the IP address from an alias record for the CloudFront distribution.
3. User sends an HTTP request to CloudFront using the resolved IP address.
4. CloudFront calls ViewerRequestFunction handling auth and basic redirects for static site urls.
5. CloudFront forwards request to upstream S3 Web Bucket if requested file is not found in the cache.
6. CloudFront logs request to S3 Logs Bucket.

## Usage

> **⚠️ Important**
>
> Make sure to provision the ACM certificate and GitHub OIDC before deploying the infrastructure by running:
>
> ```sh
> make infra-deploy-certificate
> make infra-deploy-github-oidc
> ```

### Available Commands

To get started, run `make` in your terminal. Here are the available targets:

```sh
make
# Available targets:
#   deploy - Build & deploy infrastructure and frontend
#   fe-%   - Frontend (fe) targets
#   infra% - Infrastructure (infra) targets
```

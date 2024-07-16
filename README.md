This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## How to make use of it for my gitlab account

Add below env variables

```bash
PASSWORD={ANY_PASSWORD_OR_PHRASE_OF_YOUR_CHOICE}
WEBHOOK_URL=https://gitlab.com/api/v4/projects/{project_id}/trigger/pipeline?token={api_token_with_write_permission}&ref={DESIRED_BRANCH_TO_TRIGGER_PIPELINE_FOR}
PRIVATE_TOKEN={GITLAB_TOKEN_WITH_READ_PERMISSIONS}
LATEST_PIPELINE_API_URL=https://gitlab.com/api/v4/projects/{project_id}/pipelines/latest
```

and deploy the project to vercel. You will be able to do following things with the deployed app.

1. You will be able to trigger pipeline for the desired pipeline
2. You will be able to see latest pipeline status for the desired project and desired branch


## Want to extend the use of GitLab REST APIs?

We have only covered base cases as per our requirements, the GitLab REST APIs are much more rich in nature, and gives you flexibility of creating almost similar platform
as of the gitlabs itself for all the operations. Don't believe me? [Visit the documentation of GitLab REST APIs here](https://docs.gitlab.com/ee/api/rest)
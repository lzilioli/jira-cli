
## Installation

**requires node version 10**

```bash
git clone git@bitbucket.org:lzilioli/jira-cli.git
cd jira-cli
npm link .
```

## Setup

```
export JIRA_HOST="my-jira-host.net"
export JIRA_USERNAME="<my jira email>"
export JIRA_TOKEN="<my jira token>"
# if JIRA_TOKEN not set, will fall back to JIRA_AUTH instead
```

- Replace `<my jira email>` with the email you use to log into the jira instance at `JIRA_HOST`.
- Replace `<my jira token>` NOT with you password, but  with an API token you generate for yourself
[here, in jira settings](https://id.atlassian.com/manage-profile/security/api-tokens)

## Usage

```
$ jira find PROJ-XXXX
Summary : Issue Summary
Status  : TODO
Assignee: Unassigned
URL     : https://my-jira-host.net/browse/PROJ-XXXX
# see full ticket details
$ DEBUG=jira-cli jira find PROJ-XXXX
```

## Via NPM

```typescript
import * as JiraCli from 'jira-cli';
// docs for jira-client here: https://jira-node.github.io/class/src/jira.js~JiraApi.html
// docs for Jira REST API here: https://developer.atlassian.com/cloud/jira/platform/rest/v3/
export const { jira, getIssueUrl } = JiraCli();
const ticket = await jira.findIssue('PROJ-XXXX');
const ticketURL = getIssueUrl('PROJ-XXXX');
```


## Installation

**requires node version 10**

```bash
git clone git@bitbucket.org:lzilioli/jira-cli.git
cd jira-cli
npm link .
```

## Setup

```bash
touch `~/.jira.json`
```

```json
{
  "host": "my-jira-host.net",
  "username": "<jira username>",
  "password": "<jira password>"
}
```

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

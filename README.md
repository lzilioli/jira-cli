
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
jira find PROJ-XXXX
```

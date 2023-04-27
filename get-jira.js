const JiraApi = require('jira-client');
const path = require('path');

module.exports = function getJiraApi(){
	const host = process.env.JIRA_HOST;
	if(!host) {
		throw new Error('process.env.JIRA_HOST not set!');
	}
	const username = process.env.JIRA_USERNAME;
	if(!username) {
		throw new Error('process.env.JIRA_USERNAME not set!');
	}
	const password = process.env.JIRA_TOKEN || process.env.JIRA_AUTH;
	if(!password) {
		throw new Error('process.env.JIRA_TOKEN and process.env.JIRA_AUTH not set!');
	}
	if (password.startsWith('op://')) {
		throw new Error('Did you preface the command with `op run --`?');
	}
	const jira = new JiraApi({
		protocol: 'https',
		apiVersion: '2',
		strictSSL: true,
		host: host,
		username: username,
		password: password,
	});
	const getIssueUrl = (issue)=>{
		return `https://${host}/browse/${issue}`
	};
	return {jira, getIssueUrl};
};

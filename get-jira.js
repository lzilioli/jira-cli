const JiraApi = require('jira-client');
const path = require('path');

module.exports = function getJiraApi(){
	const jiraAuth = require(path.join(process.env.HOME, '.jira.json'));
	if(!jiraAuth.username) {
		throw new Error('~/.jira.json must contain `username` property');
	}
	if(!jiraAuth.password) {
		throw new Error('~/.jira.json must contain `password` property');
	}
	if(!jiraAuth.host) {
		throw new Error('~/.jira.json must contain `host` property');
	}
	const jira = new JiraApi({
		protocol: 'https',
		apiVersion: '2',
		strictSSL: true,
		host: jiraAuth.host,
		username: jiraAuth.username,
		password: jiraAuth.password
	});
	const getIssueUrl = (issue)=>{
		return `https://${jiraAuth.host}/browse/${issue}`
	};
	return {jira,getIssueUrl};
};

require('dotenv').config();
var basic = require('basic-authorization-header');

kubeApp.constant('constants', {
	KUBERNETES_NAMESPACE: '/namespace',
	KUBERNETES_REPLICATION_CONTROLLER: '/replicationcontreller',
	KUBERNETES_DEPLOYMENT: '/deployment',
	KUBERNETES_POD: '/pod',
	KUBERNETES_SERVICE: '/service',
	KUBERNETES_JOB: '/job',
	KUBERNETES_LOG: '/log',
	KUBERNETES_DAEMONSET: '/daemonset',

	getUrl: function(endpoint) {
	    return process.env.KUBERNETES_DASHBOARD_URL + '/api/v1' + endpoint;
	},

	getCredentials: function() {
	    var username = process.env.KUBERNETES_USERNAME;
	    var password = process.env.KUBERNETES_PASSWORD;

	    return basic(username, password)	   
	}
});
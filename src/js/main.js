require('dotenv').config();

var exec = require('child_process').exec;
var rp = require('request-promise');
var basic = require('basic-authorization-header');

const KUBERNETES_DASHBOARD_URL = process.env.KUBERNETES_DASHBOARD_URL;
const KUBERNETES_API = '/api/v1';
const KUBERNETES_NAMESPACE = '/namespace';
const KUBERNETES_REPLICATION_CONTROLLER = '/replicationcontreller';
const KUBERNETES_DEPLOYMENT = '/deployment';
const KUBERNETES_POD = '/pod';
const KUBERNETES_SERVICE = '/service';
const KUBERNETES_JOB = '/job';
const KUBERNETES_DAEMONSET = '/daemonset';


function getUrl(endpoint) {
    return KUBERNETES_DASHBOARD_URL + KUBERNETES_API + endpoint;
};

function getCredentials() {
    var username = process.env.KUBERNETES_USERNAME;
    var password = process.env.KUBERNETES_PASSWORD;

    return {
        'Authorization': basic(username, password),
    };
}

function getData(url) {

    var options = {
        url: url,
        headers: getCredentials(),
        method: 'GET'
    };

    return rp(options)
        .then(function(response) {
            return JSON.parse(response);
        })
        .catch(function(error) {
            if (error) {
                console.log(error);
                alert(error);
                return null;
            }
        });
}

function getPodList() {

    // Get pod list here
    var url = getUrl(KUBERNETES_POD);
    var data = getData(url);

    return data.then(function(data) {

            // Create the list element:
            var list = document.createElement('ul');

            for (var i = 0; i < data.pods.length; i++) {

                if (data.pods[i].objectMeta.labels === undefined || data.pods[i].objectMeta.labels.app === undefined)
                    continue;

                var namespace = data.pods[i].objectMeta.namespace;
                var pod_name = data.pods[i].objectMeta.name;
                var container_name = data.pods[i].objectMeta.labels.app;

                // Create the list item:
                var item = document.createElement('li');
                item.className = "list-group-item";
                item.id = "item-" + i;

                var namespace_item = document.createElement('STRONG');
                namespace_item.appendChild(document.createTextNode('NS: ' + namespace));

                var pod_name_item = document.createElement('P');
                pod_name_item.appendChild(document.createTextNode('P: ' + pod_name));

                var container_item = document.createElement('P');
                container_item.appendChild(document.createTextNode('C: ' + container_name));

                var cmd = `kubectl logs -f --namespace=${namespace} ${pod_name} -c ${container_name}`;

                item.appendChild(namespace_item);
                item.appendChild(pod_name_item);
                item.appendChild(container_item);

                item.addEventListener('click', function(e) {
                    document.getElementById("pod-log").value = '';
                    exec(cmd, function(error, stdout, stderr) {
                        // textarea here
                        document.getElementById("pod-log").value = stdout;
                    });
                }, false);                

                // Add it to the list:
                list.appendChild(item);
            }

            // Finally, return the constructed list:            
            return list;
        })
        .catch(function(error) {
            return null;
        });
};

var pods = getPodList();
pods.then(function(list) {
    document.getElementById('pod-list').appendChild(list);
})
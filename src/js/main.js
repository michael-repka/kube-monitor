require('dotenv').config();

var $ = require('jquery');
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
const KUBERNETES_LOG = '/log';
const KUBERNETES_DAEMONSET = '/daemonset';

// global variables for logs
var namespace = null;
var container = null;
var pod = null;
var id = null;
var textarea = null;


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
                return null;
            }
        });
}

function getLogs() {
    var endpoint = KUBERNETES_POD + '/' + namespace + '/' + '/' + pod + KUBERNETES_LOG + '?follow=true';
    var url = getUrl(endpoint);
    return getData(url)
        .then(function(data) {
            if (data == null)
                return "";
            return data.logs.join("\n");
        })
        .catch(function(error) {
            console.log(error);
        });
}

function getPodList() {

    // Get pod list here
    var url = getUrl(KUBERNETES_POD);
    var data = getData(url);

    return data.then(function(data) {

            // Create the list element:
            var list = document.getElementById("pod-list");

            for (var i = 0; i < data.pods.length; i++) {

                if (data.pods[i].objectMeta.labels === undefined || data.pods[i].objectMeta.labels.app === undefined)
                    continue;

                var ns = data.pods[i].objectMeta.namespace;
                var pod_name = data.pods[i].objectMeta.name;
                var container_name = data.pods[i].objectMeta.labels.app;

                // Create the list item:
                var item = document.createElement('li');
                item.className = "list-group-item";
                item.id = "pod-" + i;

                //<img class="img-circle media-object pull-left" src="/assets/img/avatar.jpg" width="32" height="32">
                var pic = document.createElement('img');
                pic.className = "img-circle media-object pull-left";
                pic.src = __dirname + "/../assets/images/sloth.png";
                pic.width = "32"; 
                pic.height = "32";                

                var div = document.createElement('div');
                div.className = "media-body";

                var namespace_item = document.createElement('STRONG');
                namespace_item.id = "namespace-" + i;
                namespace_item.title = ns;
                namespace_item.appendChild(document.createTextNode('NS: ' + ns));

                var pod_name_item = document.createElement('P');
                pod_name_item.id = "pod-name-" + i;
                pod_name_item.title = pod_name;
                pod_name_item.appendChild(document.createTextNode('P: ' + pod_name));

                var container_item = document.createElement('P');
                container_item.id = "container-" + i;
                container_item.title = container_name;
                container_item.appendChild(document.createTextNode('C: ' + container_name));

                div.appendChild(namespace_item);
                div.appendChild(pod_name_item);
                div.appendChild(container_item);

                item.appendChild(pic);
                item.appendChild(div);

                $(item).click(function() {
                    // remove background old
                    if (id != null){
                        var oldItem = document.getElementById("pod-" + id);
                        oldItem.style.backgroundColor = "transparent";
                    }

                    // set background current
                    id = (this.id).replace("pod-", '');
                    var newItem = document.getElementById("pod-" + id);
                    newItem.style.backgroundColor = "yellow";
                    
                    namespace = document.getElementById("namespace-" + id).title;
                    pod = document.getElementById("pod-name-" + id).title;
                    container = document.getElementById("container-" + id).title;
                    textarea = document.getElementById("pod-log");
                    textarea.value = '';

                    setInterval(function(){
                        var logs = getLogs();
                        logs.then(function(lines) {
                            textarea.value = '';
                            textarea.value = lines;
                        });
                    }, 5000);
                });

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

getPodList();
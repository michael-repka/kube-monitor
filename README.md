# kube-monitor
Simple Desktop app for monitoring the pods in kubernetes

## How to use
Create a *.env* file with the following parameters:

```bash
KUBERNETES_DASHBOARD_URL=https://dashboard.fancy.domain
KUBERNETES_USERNAME=charlie
KUBERNETES_PASSWORD=candy_mountain
```

To run the application you need to install the dependencies with ```npm install``` and then run ```npm start```. I will create a standalone application as soon as the code will be stable.


# TODO
- [x] Make call to get pod infos
- [x] Use AngularJS
- [ ] Investigate timeout when calling Kubernetes apis
- [x] Create Pod-Info (HTML)
- [ ] Create standalone application
- [ ] Add tests
- [ ] Add coverage
- [ ] Add Travis

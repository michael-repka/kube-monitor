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
- [ ] Make call to get pod infos
- [ ] Use Angular 2
- [ ] Investigate timeout when calling Kubernetes apis
- [ ] Create Pod-Info tab (HTML)
- [ ] Create standalone application
- [ ] Add tests
- [ ] Add coverage
- [ ] Add Travis

Here a screenshot of the current version: ![Alt text](http://imageshack.com/a/img922/9810/Rk6Lpn.png)
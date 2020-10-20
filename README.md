# zhaaaa7.github.io
website

### Details on `yarn serve --remote`
- If you get an error, try `sudo vi /etc/hosts`, and edit in vim (press i)
``   127.0.0.1       localhost
    255.255.255.255 broadcasthost
    ::1             localhost
    127.0.0.1 plugin-localhost.intuitcdn.net
    127.0.0.1 rfmportal-qa.intuit.com
    127.0.0.1 localhost.intuit.com
    127.0.0.1 dev.mint.com` and then exit vim (shift + z+ z). ``
- When you run successfully, you will see and config.json file
- Go to <a href="https://e2e.mint.intuit.com/save.event?task=personalloans">ece site</a> and log in
- Right click to inspect the page, click Application tab and add one record in Storage - Local Storage: `key:mint.local1, val:34212`. Then refresh the page
